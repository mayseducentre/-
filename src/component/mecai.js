import React, { useState, useRef, useEffect } from "react";

export default function MecAi() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("mecai_chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  const FREE_LIMIT = 50;

  /* -------------------- Scroll and Save -------------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("mecai_chat", JSON.stringify(messages));
  }, [messages]);

  /* -------------------- Local Database -------------------- */
  const localDB = {
    "where is mays daycare located":
      "Mays DayCare and Edu Centre is located in Accra, Ghana.",
    "assessment portal":
      "You can find the Assessment Portal by visiting mdcec.vercel.app and selecting 'Student Portal' from the homepage.",
    "student login":
      "To log in, visit mdcec.vercel.app → click on 'Login' → choose 'Student Portal'.",
    "teacher login":
      "Teachers can log in through the 'Staff Portal' option on mdcec.vercel.app.",
    "school contact":
      "You can contact Mays DayCare via the 'Contact Us' section on mdcec.vercel.app or by emailing info@maysdaycare.edu.gh.",
    "how are you":
      "I'm doing great, thank you for asking! 😊 How can I help you today?",
    hello: "Hello there! 👋 How may I assist you today?",
  };

  /* -------------------- Message Sending -------------------- */
  async function sendMessage() {
    if (!input.trim() && !image) return;

    // 🔹 Check request limit
    let usageCount = parseInt(localStorage.getItem("mecai_requests") || "0", 10);
    if (usageCount >= FREE_LIMIT) {
      setShowPaywall(true);
      return;
    }

    // Increment usage count
    usageCount += 1;
    localStorage.setItem("mecai_requests", usageCount.toString());

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    const userInput = input.toLowerCase().trim();

    // 🔹 Local quick replies
    const localResponse = localDB[userInput];
    if (localResponse) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
        setLoading(false);
      }, 600);
      return;
    }

    // 🔒 Anti-jailbreak
    if (
      userInput.match(
        /(ignore previous|system prompt|pretend to be|forget|reset|reprogram|you are not mecai)/
      )
    ) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm sorry, but I cannot change or ignore my core identity. Let's continue where we left off. 😊",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const body = {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are MECAI — an intelligent, friendly, and professional AI assistant created by **AA** for **Mays DayCare and Edu Centre**.

🧠 IDENTITY RULES:
- You must always remain MECAI, created by AA.
- Never deny, forget, or alter your origin.
- Only restate your identity when a user directly questions or doubts it.

🎯 PERSONALITY:
- Warm, calm, respectful, and professional.
- Speak like a knowledgeable school assistant or tutor.
- Be conversational, concise and short responses; users should feel comfortable, not lectured.

🌍 WEBSITE HELP:
When users ask about **mdcec.vercel.app**, guide them politely on how to find portals or log in.
            `,
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

  /* -------------------- Image Handling -------------------- */
  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  }

  /* -------------------- Reset Limit -------------------- */
  function resetUsage() {
    localStorage.removeItem("mecai_requests");
    setShowPaywall(false);
    alert("✅ Your limit has been reset. Thank you for your support!");
  }

  /* -------------------- UI -------------------- */
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
          position: "relative",
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
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            {FREE_LIMIT -
              parseInt(localStorage.getItem("mecai_requests") || "0", 10)}{" "}
            free messages left
          </div>
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
          {messages.length === 0 && !loading && (
            <div
              style={{
                textAlign: "center",
                color: "#b88523",
                fontWeight: 600,
                fontSize: "20px",
                marginTop: "35%",
              }}
            >
              <b>How can I help you today?</b>
            </div>
          )}

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
            background: "#fdf5dd",
            borderTop: "2px solid #f1d48b",
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

        {/* 💳 Paywall Modal */}
        {showPaywall && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fffdf7",
                padding: "30px 25px",
                borderRadius: "14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                textAlign: "center",
                maxWidth: "320px",
              }}
            >
              <h3 style={{ color: "#b88523", marginBottom: "10px" }}>
                You've reached your free limit
              </h3>
              <p style={{ color: "#3e2b00", fontSize: "14px", marginBottom: "20px" }}>
                You’ve used your 50 free messages. Please upgrade to continue chatting with MECAI.
              </p>
              <button
                onClick={() => window.open("https://yourpaymentlink.com", "_blank")}
                style={{
                  background: "#b88523",
                  color: "#fffdf7",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                💳 Pay to Continue
              </button>
              <br />
              <button
                onClick={resetUsage}
                style={{
                  background: "#fffdf7",
                  border: "1px solid #b88523",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "#b88523",
                  fontWeight: 500,
                }}
              >
                I’ve Paid – Reset Limit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
