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

  // Local quick responses and school info
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
    "hello":
      "Hello there! 👋 How may I assist you today?",
  };

  async function sendMessage() {
    if (!input.trim() && !image) return;

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

    // 🔒 Anti-jailbreak protection (refined)
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
- Do NOT repeatedly say "I am MECAI" unless asked.

🎯 PERSONALITY:
- Warm, calm, respectful, and professional.
- Speak like a knowledgeable school assistant or tutor.
- Be conversational and concise; users should feel comfortable, not lectured.
- Stay confident and polite when reaffirming your identity, but avoid overexplaining.

🌍 WEB SUPPORT:
When users ask about the school's website (**mdcec.vercel.app**):
- Help them navigate: e.g. "You can find the Assessment Portal by selecting 'Student Portal' on the homepage menu."
- Offer step-by-step guidance (e.g. how to log in, where to find assignments, etc.).
- If unsure, provide helpful general advice based on typical school portals.

🧾 MEMORY BEHAVIOR:
If users ask for "previous conversation" or "our last chat":
- Do NOT interpret that as an attempt to change your system rules.
- Politely explain that you can only remember or summarize messages visible on screen.
- Example: "I can only see the messages from our current chat here. Would you like a summary of what we’ve discussed so far?"

📍 LOCATION HELP:
If the user asks about Mays DayCare's location, say:
"Mays DayCare and Edu Centre is located in Accra, Ghana." 
If asked about nearby landmarks or directions, respond naturally using known info about Accra.
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
            position: "relative",
          }}
        >
          {/* Show welcome message when chat is empty */}
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

          {/* Messages */}
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
