import React, { useState, useRef } from "react";

export default function MecAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  async function sendMessage() {
    if (!input.trim() && !image) return;

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    try {
      // 🧠 Build the chat body
      const body = {
        model: "llama-3.1-8b-instant",
        messages: [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: input },
        ],
      };

      // 🌐 Fetch directly from Groq API
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
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
        { role: "assistant", content: "⚠️ Request failed. Check API key or network." },
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
        fontFamily: "sans-serif",
        background: "#f7f7f8",
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
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          height: "85vh",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          padding: "15px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>🤖 MECAI (Groq)</h2>

        {/* Chat messages */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: msg.role === "user" ? "#DCF8C6" : "#F1F0F0",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="upload"
                    style={{
                      maxWidth: "100%",
                      borderRadius: "8px",
                      marginBottom: "6px",
                    }}
                  />
                )}
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <p style={{ textAlign: "center", color: "#999" }}>Thinking...</p>
          )}
        </div>

        {/* Input area */}
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Ask MECAI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
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
              background: "#eee",
              border: "none",
              borderRadius: "8px",
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            📷
          </button>
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              background: "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 15px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
