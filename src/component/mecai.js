import React, { useState, useRef, useEffect } from "react";

/**
 * MecAi.js
 *
 * - 100 free messages total (tracked in localStorage as "mecai_requests")
 * - When limit exceeded, modal asks for unlock token
 * - If token matches UNLOCK_TOKEN, user becomes MECAI PRO permanently (stored as "mecai_pro")
 * - PRO theme = elegant blue & silver
 * - Clear Chat clears stored messages and resets message count (but does not revoke PRO)
 *
 * NOTE: Replace UNLOCK_TOKEN with your chosen token (e.g., "Mec_user199") before distributing,
 * or keep this one and change later.
 */

const UNLOCK_TOKEN = "ASSIST-PRO-8F3D"; // <- change this to your token (e.g., "Mec_user199")
const FREE_LIMIT = 100;
const MOMO_NUMBER = "0549548274"; // used for display only (no payment enforced)

export default function MecAi() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("mecai_chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTokenValue, setAdminTokenValue] = useState("");

  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  // usage helpers
  function getUsage() {
    return parseInt(localStorage.getItem("mecai_requests") || "0", 10);
  }
  function setUsage(n) {
    localStorage.setItem("mecai_requests", String(n));
  }
  function incrementUsage() {
    const n = getUsage() + 1;
    setUsage(n);
    return n;
  }

  // PRO helpers
  function isPro() {
    return localStorage.getItem("mecai_pro") === "true";
  }
  function setPro(flag = true) {
    if (flag) {
      localStorage.setItem("mecai_pro", "true");
      localStorage.setItem("mecai_pro_date", new Date().toISOString());
    } else {
      localStorage.removeItem("mecai_pro");
      localStorage.removeItem("mecai_pro_date");
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("mecai_chat", JSON.stringify(messages));
  }, [messages]);

  /* ---------------- Local quick DB (unchanged) ---------------- */
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

  /* ---------------- Send Message ---------------- */
  async function sendMessage() {
    // Basic guard
    if (!input.trim() && !image) return;

    // If not PRO, check usage
    if (!isPro()) {
      const current = getUsage();
      if (current >= FREE_LIMIT) {
        setShowUnlockModal(true);
        return; // block until token entered
      }
      // increment usage now (we count this attempt)
      incrementUsage();
    }

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    const userInput = (input || "").toLowerCase().trim();

    // local quick replies
    const localResponse = localDB[userInput];
    if (localResponse) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
        setLoading(false);
      }, 500);
      return;
    }

    // anti-jailbreak (preserved)
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

    // call GROQ API (same as original)
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
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- Image Handler ---------------- */
  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  /* ---------------- Clear Chat (resets count too) ---------------- */
  function clearChat() {
    localStorage.removeItem("mecai_chat");
    localStorage.removeItem("mecai_requests");
    setMessages([]);
    setUsage(0);
    // do not change PRO status
  }

  /* ---------------- Token verify ---------------- */
  function verifyToken() {
    const entered = (tokenInput || "").trim();
    if (entered === "") {
      alert("Enter the unlock token.");
      return;
    }
    // Check against UNLOCK_TOKEN first
    if (entered === UNLOCK_TOKEN) {
      setPro(true);
      // reset usage so they can continue immediately
      setUsage(0);
      setShowUnlockModal(false);
      setTokenInput("");
      alert("✅ Token valid — MECAI PRO unlocked permanently.");
      return;
    }

    // Also allow tokens present in shared list (optional)
    // If you want to support a list of issued tokens, you can store them in localStorage as 'mecai_valid_tokens'
    const listRaw = localStorage.getItem("mecai_valid_tokens");
    if (listRaw) {
      try {
        const list = JSON.parse(listRaw);
        if (Array.isArray(list) && list.includes(entered)) {
          // make pro and remove token so it can't be reused
          setPro(true);
          const newList = list.filter((t) => t !== entered);
          localStorage.setItem("mecai_valid_tokens", JSON.stringify(newList));
          setUsage(0);
          setShowUnlockModal(false);
          setTokenInput("");
          alert("✅ Token verified. MECAI PRO unlocked permanently.");
          return;
        }
      } catch {}
    }

    alert("❌ Invalid token. Please check the code and try again.");
  }

  /* ---------------- Admin add token UI (hidden) ---------------- */
  useEffect(() => {
    if (adminClicks >= 5) setShowAdmin(true);
  }, [adminClicks]);

  function addTokenAdmin(newToken) {
    if (!newToken || !newToken.trim()) return alert("Enter token");
    const raw = localStorage.getItem("mecai_valid_tokens");
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(newToken.trim());
    localStorage.setItem("mecai_valid_tokens", JSON.stringify(arr));
    setAdminTokenValue("");
    alert("Token added to shared list.");
  }

  /* ---------------- Theme selection ---------------- */
  const pro = isPro();
  const THEME = pro
    ? {
        bg: "#eaf2ff",
        card: "#f6f9ff",
        header: "#143a8a",
        accent: "#9fb4d9",
        userBubble: "#1e3a8a",
        aiBubble: "#dbe9ff",
        textOnHeader: "#ffffff",
        text: "#0b1726",
      }
    : {
        bg: "#fff9e6",
        card: "#fffdf7",
        header: "#d6a33e",
        accent: "#f1d48b",
        userBubble: "#b88523",
        aiBubble: "#f8e5b6",
        textOnHeader: "#fffdf7",
        text: "#3e2b00",
      };

  const usageCount = getUsage();
  const usageLeft = Math.max(0, FREE_LIMIT - usageCount);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: THEME.bg,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "880px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: THEME.card,
          borderLeft: `1px solid ${THEME.accent}`,
          borderRight: `1px solid ${THEME.accent}`,
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: THEME.header,
            color: THEME.textOnHeader,
            padding: "14px 20px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "18px",
            borderBottom: `2px solid ${THEME.accent}`,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 20 }}>{pro ? "🤖 MECAI PRO" : "🤖 MEC AI"}</div>
            {pro && (
              <div
                style={{
                  background: THEME.accent,
                  color: THEME.textOnHeader,
                  padding: "6px 10px",
                  borderRadius: 14,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                PRO
              </div>
            )}
          </div>

          <div style={{ position: "absolute", right: 12, top: 12 }}>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                style={{
                  background: THEME.card,
                  color: THEME.header,
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                Clear
              </button>
            )}
          </div>

          <div style={{ position: "absolute", left: 12, top: 12, fontSize: 12, color: THEME.textOnHeader }}>
            {pro ? "Unlimited access" : `${usageLeft} free messages left`}
          </div>
        </div>

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            background: THEME.bg,
            position: "relative",
          }}
        >
          {messages.length === 0 && !loading && (
            <div
              style={{
                textAlign: "center",
                color: THEME.text,
                fontWeight: 700,
                fontSize: "20px",
                marginTop: "30%",
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
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  background: msg.role === "user" ? THEME.userBubble : THEME.aiBubble,
                  color: msg.role === "user" ? THEME.textOnHeader : THEME.text,
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  maxWidth: "80%",
                  fontSize: "15px",
                  lineHeight: 1.5,
                  boxShadow: msg.role === "user" ? "0 3px 6px rgba(0,0,0,0.12)" : "0 3px 5px rgba(0,0,0,0.03)",
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
                    background: pro ? THEME.userBubble : THEME.userBubble,
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
            background: THEME.card,
            borderTop: `2px solid ${THEME.accent}`,
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
              border: `1px solid ${THEME.accent}`,
              background: THEME.card,
              outline: "none",
              fontSize: "15px",
              color: THEME.text,
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
              background: THEME.card,
              border: `1px solid ${THEME.accent}`,
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
              background: loading ? THEME.accent : THEME.userBubble,
              color: THEME.textOnHeader,
              border: "none",
              borderRadius: "10px",
              padding: "10px 16px",
              marginLeft: "8px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ➤
          </button>
        </div>

        {/* Unlock Modal */}
        {showUnlockModal && !pro && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                background: "#ffffff",
                padding: "24px 20px",
                borderRadius: "12px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                textAlign: "center",
                width: 360,
              }}
            >
              <h3 style={{ color: "#143a8a", marginBottom: 8 }}>Unlock MECAI PRO</h3>
              <p style={{ color: "#0b1726", marginBottom: 10 }}>
                You have used your {FREE_LIMIT} free messages. To unlock MECAI PRO, enter your unlock token below.
              </p>
              <input
                type="text"
                placeholder="Enter unlock token"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #d1d7e0",
                  marginBottom: 10,
                }}
              />

              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button
                  onClick={verifyToken}
                  style={{
                    background: "#143a8a",
                    color: "#fff",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  🔓 Verify Token
                </button>

                <button
                  onClick={() => {
                    setShowUnlockModal(false);
                    setTokenInput("");
                  }}
                  style={{
                    background: "#fff",
                    border: "1px solid #d1d7e0",
                    padding: "10px 14px",
                    borderRadius: 8,
                    color: "#143a8a",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>

              <p style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>
                If you do not have a token, contact the admin to receive one.
              </p>
            </div>
          </div>
        )}

        {/* version text (click 5x to show admin token adder) */}
        <div
          onClick={() => setAdminClicks((c) => c + 1)}
          style={{
            position: "absolute",
            right: 10,
            bottom: 8,
            fontSize: 11,
            color: pro ? "#143a8a" : "#b88523",
            opacity: 0.95,
            cursor: "pointer",
            userSelect: "none",
            padding: 4,
          }}
        >
          v1
        </div>

        {/* Admin UI */}
        {showAdmin && (
          <div
            style={{
              position: "absolute",
              right: 10,
              bottom: 36,
              background: THEME.card,
              border: `1px solid ${THEME.accent}`,
              padding: 12,
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              zIndex: 1200,
              width: 280,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: pro ? "#143a8a" : "#b88523", marginBottom: 8 }}>
              Admin: Add Token
            </div>
            <input
              type="text"
              placeholder="Token (e.g. MEC-user-001)"
              value={adminTokenValue}
              onChange={(e) => setAdminTokenValue(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: `1px solid ${THEME.accent}`,
                marginBottom: 8,
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  if (!adminTokenValue.trim()) return alert("Enter token value");
                  addTokenAdmin(adminTokenValue.trim());
                }}
                style={{
                  flex: 1,
                  background: pro ? "#143a8a" : "#b88523",
                  color: "#fff",
                  border: "none",
                  padding: 8,
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAdmin(false);
                  setAdminClicks(0);
                }}
                style={{
                  background: "#fff",
                  border: `1px solid ${THEME.accent}`,
                  padding: 8,
                  borderRadius: 6,
                  color: pro ? "#143a8a" : "#b88523",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Close
              </button>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "#6b7280" }}>
              Tip: you can also add tokens via console:
              <pre style={{ background: "#f7f9fc", padding: 6, borderRadius: 4, marginTop: 6 }}>
                localStorage.setItem('mecai_valid_tokens', JSON.stringify(['Mec_user199']))
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
