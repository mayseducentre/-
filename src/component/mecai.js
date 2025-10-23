import React, { useState, useRef, useEffect } from "react";

export default function MecAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Local DB
  const localDB = {
    "who created you": "I was created by Paa Kwasi — a visionary developer who built MECAI using Groq AI.",
    "what is drive management": "Drive management is about organizing, monitoring, and optimizing storage systems for performance and reliability.",
    "what is mecai": "MECAI is a hybrid AI assistant that combines local knowledge and Groq's intelligence for faster, smarter responses.",
    "how are you": "I'm doing great, thank you for asking! 😊 How can I help you today?",
    "hello": "Hello there! 👋 I'm MECAI, your professional AI companion. How may I assist you?",
  };

  // Send message
  async function sendMessage() {
    if (!input.trim() && !image) return;

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    const userInput = input.toLowerCase().trim();
    const localResponse = localDB[userInput];

    // Local fetch
    if (localResponse) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
        setLoading(false);
      }, 700);
      return;
    }

    // Groq fetch
    try {
      const body = {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are MECAI — a professional, friendly AI assistant built by Paa Kwasi.
            - Be concise, confident, and clear.
            - Use polite and human-like tone.`,
          },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: input },
        ],
      };

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || "⚠️ No response.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Groq API Error:", err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "⚠️ Failed to connect to MECAI service." },
      ]);
    }

    setLoading(false);
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#ffffff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          borderLeft: "1px solid #e5e7eb",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#f9fafb",
            color: "#111827",
            padding: "14px 20px",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "17px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          🤖 MECAI — Your Hybrid AI
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background: "#ffffff",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  background:
                    msg.role === "user" ? "#2563eb" : "#f3f4f6",
                  color: msg.role === "user" ? "#ffffff" : "#111827",
                  padding: "12px 16px",
                  borderRadius:
                    msg.role === "user"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                  maxWidth: "80%",
                  fontSize: "15px",
                  lineHeight: 1.5,
                  boxShadow:
                    msg.role === "user"
                      ? "0 2px 6px rgba(37,99,235,0.25)"
                      : "0 2px 5px rgba(0,0,0,0.05)",
                  wordWrap: "break-word",
                  transition: "0.3s",
                }}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="upload"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      marginBottom: "8px",
                    }}
                  />
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 0",
                marginLeft: "10px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#9ca3af",
                  animation: "dotPulse 1s infinite ease-in-out",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#9ca3af",
                  animation: "dotPulse 1s infinite ease-in-out 0.2s",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#9ca3af",
                  animation: "dotPulse 1s infinite ease-in-out 0.4s",
                }}
              ></div>

              {/* Inline CSS animation */}
              <style>
                {`
                  @keyframes dotPulse {
                    0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
                    40% { transform: scale(1); opacity: 1; }
                  }
                `}
              </style>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderTop: "1px solid #e5e7eb",
            background: "#f9fafb",
          }}
        >
          <input
            type="text"
            placeholder="Message MECAI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              outline: "none",
              fontSize: "15px",
            }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleImage}
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileRef.current.click()}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "10px 12px",
              marginLeft: "8px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            📷
          </button>
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              background: loading ? "#93c5fd" : "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 16px",
              marginLeft: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
