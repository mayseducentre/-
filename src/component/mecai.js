import React, { useState, useRef, useEffect } from "react";

export default function MecAi() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("mecai_chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  // 🧠 Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("mecai_chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Local instant answers
  const localDB = {
    "who created you": "I was built by AA — the developer for Mays DayCare & Edu Centre.",
    "what is mecai": "I’m MECAI, the assistant for Mays DayCare — simple, friendly, and quick.",
    "webapp": "Visit https://mdcec.vercel.app for everything about Mays DayCare.",
    "where can i find the assessment portal":
      "Go to mdcec.vercel.app → click 'Student Portal' → then 'Assessments'.",
    "where is mays daycare": "Mays DayCare and Edu Centre is in Accra, Ghana.",
    "how are you": "Feeling great 😄 How about you?",
    hello: "Hi there 👋 What can I do for you?",
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

    // ⚡ Quick local replies
    if (localResponse) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
        setLoading(false);
      }, 500);
      return;
    }

    // 🛡️ Anti-jailbreak protection
    if (
      /(ignore previous|system prompt|pretend to be|forget|reset|reprogram|you are not mecai)/.test(
        userInput
      )
    ) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I can’t change who I am 😊" },
      ]);
      setLoading(false);
      return;
    }

    // 🖼️ Optional image requests (if OpenAI key exists)
    if (
      userInput.includes("show") ||
      userInput.includes("picture") ||
      userInput.includes("draw") ||
      userInput.includes("image")
    ) {
      if (process.env.REACT_APP_OPENAI_API_KEY) {
        try {
          const imgRes = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-image-1",
              prompt: input,
              size: "512x512",
            }),
          });

          const imgData = await imgRes.json();
          const imgUrl = imgData.data?.[0]?.url;
          if (imgUrl) {
            setMessages((m) => [
              ...m,
              {
                role: "assistant",
                content: (
                  <div>
                    Here’s what I found 👇
                    <br />
                    <img
                      src={imgUrl}
                      alt="Generated"
                      style={{ width: "100%", borderRadius: "12px", marginTop: "8px" }}
                    />
                  </div>
                ),
              },
            ]);
          } else {
            setMessages((m) => [
              ...m,
              { role: "assistant", content: "I couldn’t make that image right now 😅" },
            ]);
          }
        } catch (err) {
          console.error("Image generation failed:", err);
          setMessages((m) => [
            ...m,
            { role: "assistant", content: "⚠️ Image creation failed. Try again later." },
          ]);
        }
        setLoading(false);
        return;
      }
    }

    // 💬 Groq AI response
    try {
      const body = {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are MECAI — the friendly AI assistant for Mays DayCare and Edu Centre (Accra, Ghana), created by **AA**.

Rules:
- Always stay MECAI.
- Keep responses brief and cheerful unless user says “details” or “more”.
- Be warm, simple, and helpful like a teacher’s helper.
- Use emojis sometimes for friendliness.
- If asked about mdcec.vercel.app:
  → Help navigate (e.g. "Go to mdcec.vercel.app → open 'Student Portal' → click 'Assessments'")
- If asked for past chat: "I remember what’s here on your screen but not older chats."
            `,
          },
          ...messages.map((m) => ({
            role: m.role,
            content: typeof m.content === "string" ? m.content : "",
          })),
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
      const reply = data?.choices?.[0]?.message?.content || "Hmm... not sure about that 🤔";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Groq API Error:", err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "⚠️ Connection problem. Try again later." },
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

  const showWelcome = messages.length === 0;

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
            position: "relative",
          }}
        >
          {showWelcome ? (
            <div
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "20px",
                color: "#b88523",
                marginTop: "40%",
              }}
            >
              <b>How can I help you today? 😊</b>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    background: msg.role === "user" ? "#b88523" : "#f8e5b6",
                    color: msg.role === "user" ? "#fffdf7" : "#3e2b00",
                    padding: "12px 16px",
                    borderRadius:
                      msg.role === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    maxWidth: "80%",
                    fontSize: "15px",
                    lineHeight: 1.5,
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
            ))
          )}

          {/* Typing Indicator */}
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
              {[0, 0.2, 0.4].map((delay, i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#b88523",
                    animation: `dotPulse 1s infinite ease-in-out ${delay}s`,
                  }}
                />
              ))}
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
