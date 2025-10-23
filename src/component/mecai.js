import React, { useState, useRef, useEffect } from "react";

export default function MecAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const localDB = {
    "who created you": "I was created by Amzi — a visionary developer who built MECAI using Groq AI.",
    "what is drive management": "Drive management is about organizing, monitoring, and optimizing storage systems for performance and reliability.",
    "what is mecai": "MECAI is a hybrid AI assistant.",
    "how are you": "I'm doing great, thank you for asking! 😊 How can I help you today?",
    "hello": "Hello there! 👋 I'm MECAI, your professional AI companion. How may I assist you?",
  };

  async function sendMessage() {
    if (!input.trim() && !image) return;

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    const userInput = input.toLowerCase().trim();
    const localResponse = localDB[userInput];

    if (localResponse) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
        setLoading(false);
      }, 700);
      return;
    }

    try {
      const body = {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are MEC AI — a professional, warm, and friendly AI assistant created by Amzi for Mays DayCare and Edu Centre.
            Use a calm, clear tone, and when possible, be helpful and polite.`,
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
        background: "#fff9e6",
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
          background: "#fffdf7",
          borderLeft: "1px solid #f1d48b",
          borderRight: "1px solid #f1d48b",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#d6a33e",
            color: "#fffdf7",
            padding: "14px 20px",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "17px",
            borderBottom: "2px solid #b88523",
            boxShadow: "0 2px 6px rgba(107,59,0,0.15)",
          }}
        >
          🤖 MEC AI
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background: "#fff9e6",
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
                    msg.role === "user" ? "#b88523" : "#f8e5b6",
                  color: msg.role === "user" ? "#fffdf7" : "#3e2b00",
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
                      ? "0 3px 6px rgba(107,59,0,0.25)"
                      : "0 3px 5px rgba(0,0,0,0.05)",
                  wordWrap: "break-word",
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
                  background: "#b88523",
                  animation: "dotPulse 1s infinite ease-in-out",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#b88523",
                  animation: "dotPulse 1s infinite ease-in-out 0.2s",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#b88523",
                  animation: "dotPulse 1s infinite ease-in-out 0.4s",
                }}
              ></div>

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
            borderTop: "2px solid #f1d48b",
            background: "#fdf5dd",
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
              border: "1px solid #e8c873",
              background: "#fffdf7",
              outline: "none",
              fontSize: "15px",
              color: "#3e2b00",
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
              background: "#fffdf7",
              border: "1px solid #e8c873",
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
              background: loading ? "#e8c873" : "#b88523",
              color: "#fffdf7",
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
