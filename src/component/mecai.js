import React, { useState, useRef, useEffect } from "react";

export default function MecAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🧠 Local knowledge base
  const localDB = {
    "who created you": "I was created by Paa Kwasi — a visionary developer who built MECAI using Groq AI.",
    "what is drive management": "Drive management is about organizing, monitoring, and optimizing storage systems for performance and reliability.",
    "what is mecai": "MECAI is a hybrid AI assistant that combines local knowledge and Groq's intelligence for faster, smarter responses.",
    "how are you": "I'm doing great, thank you for asking! 😊 How can I help you today?",
    "hello": "Hello there! 👋 I'm MECAI, your professional AI companion. How may I assist you?"
  };

  // 🔹 Hybrid message handling
  async function sendMessage() {
    if (!input.trim() && !image) return;

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    const userInput = input.toLowerCase().trim();
    const localResponse = localDB[userInput];

    // 💾 If found in localDB → respond instantly
    if (localResponse) {
      setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
      setLoading(false);
      return;
    }

    // 🌐 Else fetch from Groq API
    try {
      const body = {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are MECAI — a professional, friendly AI assistant built by Paa Kwasi. 
            - Be concise, confident, and clear.
            - Use polite and human-like tone.
            - When unsure, provide helpful reasoning or guidance.`,
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
        background: "#f5f7fa",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "700px",
          height: "85vh",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#111827",
            color: "#fff",
            padding: "16px 20px",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          🤖 MECAI — Professional Hybrid AI
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background: "#fafafa",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  background:
                    msg.role === "user" ? "#2563eb" : "#e5e7eb",
                  color: msg.role === "user" ? "#fff" : "#111827",
                  padding: "12px 16px",
                  borderRadius:
                    msg.role === "user"
                      ? "16px 16px 0 16px"
                      : "16px 16px 16px 0",
                  maxWidth: "75%",
                  fontSize: "15px",
                  lineHeight: 1.4,
                  boxShadow:
                    msg.role === "user"
                      ? "0 2px 6px rgba(37,99,235,0.2)"
                      : "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="upload"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <p style={{ textAlign: "center", color: "#888" }}>Thinking...</p>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Bar */}
        <div
          style={{
            display: "flex",
            padding: "10px 12px",
            borderTop: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
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
              background: "#f3f4f6",
              border: "none",
              borderRadius: "12px",
              padding: "10px 12px",
              marginLeft: "8px",
              cursor: "pointer",
            }}
          >
            📷
          </button>
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
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
