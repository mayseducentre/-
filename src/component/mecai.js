import React, { useEffect, useRef, useState } from "react";

/**
 * MecAi (Modern Glass UI) - Single File Component
 *
 * Behavior:
 * - 100 free messages total (localStorage: 'mecai_requests')
 * - After 100, show unlock modal (token entry). Token: 'Mec_user199'
 * - If token valid → set 'mecai_pro' = true (permanent), switch to PRO theme
 * - Upgrade button available anytime
 * - Clear chat resets messages + usage count (does not revoke PRO)
 * - Hidden admin UI (click v1 five times) to add tokens to shared list (localStorage 'mecai_valid_tokens')
 *
 * Note: Change process.env.REACT_APP_GROQ_API_KEY in your environment for API access.
 */

const FREE_LIMIT = 100;
const UNLOCK_TOKEN = "Mec_user199"; // <- official token you provided
const MOMO_NUMBER = "0549548274";

export default function MecAi() {
  // Chat state
  const [messages, setMessages] = useState(() => {
    const raw = localStorage.getItem("mecai_chat");
    return raw ? JSON.parse(raw) : [];
  });
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Usage + pro + UI
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTokenValue, setAdminTokenValue] = useState("");

  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  // Helpers for usage and pro status
  const getUsage = () => parseInt(localStorage.getItem("mecai_requests") || "0", 10);
  const setUsage = (n) => localStorage.setItem("mecai_requests", String(n));
  const incrementUsage = () => {
    const n = getUsage() + 1;
    setUsage(n);
    return n;
  };
  const resetUsage = () => {
    localStorage.setItem("mecai_requests", "0");
  };

  const isPro = () => localStorage.getItem("mecai_pro") === "true";
  const setPro = (flag = true) => {
    if (flag) {
      localStorage.setItem("mecai_pro", "true");
      localStorage.setItem("mecai_pro_date", new Date().toISOString());
    } else {
      localStorage.removeItem("mecai_pro");
      localStorage.removeItem("mecai_pro_date");
    }
  };

  // Persist chat to localStorage
  useEffect(() => {
    localStorage.setItem("mecai_chat", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Local quick DB (unchanged system answers)
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
    "how are you": "I'm doing great, thank you for asking! 😊 How can I help you today?",
    hello: "Hello there! 👋 How may I assist you today?",
  };

  // Add image handler
  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  // Clear chat (reset messages and usage; keep PRO)
  function clearChat() {
    localStorage.removeItem("mecai_chat");
    setMessages([]);
    resetUsage();
  }

  // Admin tokens list helpers (optional shared tokens)
  function getValidTokens() {
    try {
      const raw = localStorage.getItem("mecai_valid_tokens");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  function addTokenAdmin(newToken) {
    if (!newToken || !newToken.trim()) return alert("Enter token");
    const list = getValidTokens();
    list.push(newToken.trim());
    localStorage.setItem("mecai_valid_tokens", JSON.stringify(list));
    setAdminTokenValue("");
    alert("Token saved to shared list.");
  }
  function consumeSharedToken(token) {
    try {
      const list = getValidTokens().filter((t) => t !== token);
      localStorage.setItem("mecai_valid_tokens", JSON.stringify(list));
    } catch {}
  }

  // Verify token and make PRO
  function verifyToken() {
    const entered = (tokenInput || "").trim();
    if (!entered) {
      alert("Please enter the unlock token.");
      return;
    }
    if (entered === UNLOCK_TOKEN) {
      setPro(true);
      resetUsage();
      setShowUnlockModal(false);
      setTokenInput("");
      alert("✅ Token accepted — MECAI PRO unlocked permanently.");
      return;
    }
    // check shared tokens
    const shared = getValidTokens();
    if (Array.isArray(shared) && shared.includes(entered)) {
      setPro(true);
      consumeSharedToken(entered);
      resetUsage();
      setShowUnlockModal(false);
      setTokenInput("");
      alert("✅ Token accepted — MECAI PRO unlocked permanently.");
      return;
    }
    alert("❌ Invalid token. Please check and try again.");
  }

  // Send message — preserves original system prompt, anti-jailbreak, local responses, and GROQ call
  async function sendMessage() {
    if (!input.trim() && !image) return;

    // If not PRO, block when over limit
    if (!isPro()) {
      const current = getUsage();
      if (current >= FREE_LIMIT) {
        setShowUnlockModal(true);
        return;
      }
      // increment use
      incrementUsage();
    }

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    const userInput = (input || "").toLowerCase().trim();

    // local quick reply
    const localResponse = localDB[userInput];
    if (localResponse) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
        setLoading(false);
      }, 500);
      return;
    }

    // anti-jailbreak check (unchanged)
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

    // call GROQ API (preserve original system message exactly)
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

  // admin reveal
  useEffect(() => {
    if (adminClicks >= 5) setShowAdmin(true);
  }, [adminClicks]);

  // Theme (glass/pro look for PRO, warm original for free)
  const pro = isPro();
  const THEME = pro
    ? {
        bg: "linear-gradient(180deg,#eef6ff 0%, #eaf2ff 100%)",
        card: "rgba(255,255,255,0.66)",
        header: "linear-gradient(90deg,#0f3b8a,#1b63b3)",
        accent: "#7fa7db",
        userBubble: "linear-gradient(180deg,#2551a8,#1e3a8a)",
        aiBubble: "rgba(219,233,255,0.9)",
        textHeader: "#fff",
        text: "#072034",
      }
    : {
        bg: "linear-gradient(180deg,#fffdf7 0%, #fff9e6 100%)",
        card: "rgba(255,255,255,0.9)",
        header: "linear-gradient(90deg,#d6a33e,#b88523)",
        accent: "#f1d48b",
        userBubble: "#b88523",
        aiBubble: "#f8e5b6",
        textHeader: "#fffdf7",
        text: "#3e2b00",
      };

  // small helpers for styling
  const usageCount = getUsage();
  const usageLeft = Math.max(0, FREE_LIMIT - usageCount);

  // Render
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        background: THEME.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 980,
          height: "90vh",
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 18,
          alignItems: "stretch",
        }}
      >
        {/* Left: Chat area */}
        <div
          style={{
            borderRadius: 16,
            padding: 16,
            background: THEME.card,
            boxShadow: "0 8px 30px rgba(12,18,30,0.12)",
            backdropFilter: "blur(8px) saturate(120%)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: pro ? "#ffffff33" : "#fff8ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 -4px 10px rgba(255,255,255,0.35)",
                  fontWeight: 700,
                  color: pro ? "#0b3b7a" : "#b56913",
                  fontSize: 20,
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: pro ? "#072034" : "#3e2b00" }}>
                  {pro ? "MECAI PRO" : "MEC AI"}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  {pro ? "Premium access — unlimited" : `${usageLeft} free messages left`}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {!pro && (
                <button
                  onClick={() => setShowUnlockModal(true)}
                  style={{
                    background: "linear-gradient(90deg,#143a8a,#1b63b3)",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 6px 18px rgba(20,58,138,0.18)",
                    transition: "transform .12s ease",
                  }}
                >
                  Upgrade PRO
                </button>
              )}

              <button
                onClick={clearChat}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(0,0,0,0.06)",
                  padding: "8px 10px",
                  borderRadius: 10,
                  color: pro ? "#072034" : "#3e2b00",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "6px 8px",
              borderRadius: 12,
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                  fontWeight: 700,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>How can I help you today?</div>
                  <div style={{ fontSize: 13, color: "#9aa3ad" }}>Ask about the school, portals, or schedules.</div>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    marginBottom: 12,
                    paddingLeft: isUser ? 40 : 0,
                    paddingRight: isUser ? 0 : 40,
                  }}
                >
                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "12px 16px",
                      borderRadius: 14,
                      background: isUser ? (pro ? "linear-gradient(180deg,#2b59b8,#1e3a8a)" : THEME.userBubble) : THEME.aiBubble,
                      color: isUser ? "#fff" : THEME.text,
                      boxShadow: isUser ? "0 8px 20px rgba(20,58,138,0.12)" : "0 6px 18px rgba(0,0,0,0.04)",
                      lineHeight: 1.45,
                      fontSize: 15,
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="upload"
                        style={{ width: "100%", borderRadius: 10, marginBottom: 8 }}
                      />
                    )}
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              paddingTop: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                gap: 10,
                alignItems: "center",
                background: "rgba(255,255,255,0.6)",
                padding: "10px",
                borderRadius: 14,
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                alignItems: "center",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Message MECAI..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 15,
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
                title="Upload image"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              >
                📷
              </button>
            </div>

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: pro ? "linear-gradient(90deg,#143a8a,#1b63b3)" : "linear-gradient(90deg,#d6a33e,#b88523)",
                color: "#fff",
                fontSize: 20,
                boxShadow: "0 12px 30px rgba(16,24,40,0.12)",
              }}
            >
              ➤
            </button>
          </div>
        </div>

        {/* Right: Info / PRO panel */}
        <div
          style={{
            borderRadius: 16,
            padding: 18,
            background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.45))",
            boxShadow: "0 8px 30px rgba(12,18,30,0.08)",
            backdropFilter: "blur(8px) saturate(120%)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: pro ? "#ffffff60" : "#fff8ee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: THEME.text }}>
                {pro ? "MECAI PRO" : "MecAi — Free"}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {pro ? "Thank you for supporting MECAI!" : "100 free messages. Upgrade for unlimited."}
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13, color: "#334155" }}>
            <strong>What's included</strong>
            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
              <li>Conversational help about the school</li>
              <li>Portal & login guidance</li>
              <li>{pro ? "Unlimited messages, premium theme" : "100 messages total"}</li>
            </ul>
          </div>

          {!pro && (
            <div style={{ marginTop: "auto" }}>
              <div style={{ fontSize: 13, color: "#334155", marginBottom: 8 }}>Got a token?</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Enter unlock token"
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid #e6eef9",
                    outline: "none",
                  }}
                />
                <button
                  onClick={verifyToken}
                  style={{
                    background: "linear-gradient(90deg,#143a8a,#1b63b3)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 12px",
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Verify
                </button>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
                If you don't have a token, contact the admin. (No payment required in this UI.)
              </div>

              <div style={{ marginTop: 14 }}>
                <button
                  onClick={() => setShowUnlockModal(true)}
                  style={{
                    width: "100%",
                    background: "linear-gradient(90deg,#0f3b8a,#1b63b3)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 12px",
                    borderRadius: 10,
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(16,24,40,0.08)",
                  }}
                >
                  Open Unlock Modal
                </button>
              </div>
            </div>
          )}

          {pro && (
            <div style={{ marginTop: "auto" }}>
              <div style={{ fontSize: 13, color: "#334155", marginBottom: 8 }}>Pro perks</div>
              <div style={{ fontSize: 13, color: "#334155" }}>
                • Unlimited messages<br />• Premium look and feel<br />• Priority replies
              </div>
            </div>
          )}

          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 10 }}>
            <div>Contact / Admin: {MOMO_NUMBER}</div>
            <div style={{ marginTop: 6 }}>
              <small>Version v1 • click bottom-right to reveal admin token tool</small>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock modal (same as right-panel entry) */}
      {showUnlockModal && !pro && (
        <div
          onClick={() => setShowUnlockModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2,6,23,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 420,
              background: "rgba(255,255,255,0.98)",
              borderRadius: 12,
              padding: 18,
              boxShadow: "0 18px 50px rgba(2,6,23,0.32)",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 18, color: "#072034", marginBottom: 6 }}>
              Unlock MECAI PRO
            </div>
            <div style={{ fontSize: 13, color: "#475569", marginBottom: 12 }}>
              You have used your {FREE_LIMIT} free messages. Enter your unlock token to upgrade to MECAI PRO (permanent).
            </div>

            <input
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter unlock token"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #e6eef9",
                marginBottom: 12,
                outline: "none",
                fontSize: 15,
              }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => verifyToken()}
                style={{
                  flex: 1,
                  background: "linear-gradient(90deg,#143a8a,#1b63b3)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontWeight: 800,
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
                  flex: 1,
                  background: "#fff",
                  border: "1px solid #e6eef9",
                  padding: "10px 12px",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
              If you do not have a token, contact the admin to receive one.
            </div>
          </div>
        </div>
      )}

      {/* version text (click 5x to reveal admin UI) */}
      <div
        onClick={() => setAdminClicks((c) => c + 1)}
        style={{
          position: "fixed",
          right: 12,
          bottom: 8,
          fontSize: 11,
          color: pro ? "#143a8a" : "#b88523",
          opacity: 0.95,
          cursor: "pointer",
          userSelect: "none",
          padding: 6,
          zIndex: 1400,
        }}
      >
        v1
      </div>

      {/* Admin panel */}
      {showAdmin && (
        <div
          style={{
            position: "fixed",
            right: 12,
            bottom: 44,
            width: 320,
            background: "rgba(255,255,255,0.98)",
            borderRadius: 10,
            padding: 12,
            boxShadow: "0 12px 36px rgba(2,6,23,0.16)",
            zIndex: 1500,
          }}
        >
          <div style={{ fontWeight: 800, color: "#334155", marginBottom: 8 }}>Admin — add token</div>
          <input
            value={adminTokenValue}
            onChange={(e) => setAdminTokenValue(e.target.value)}
            placeholder="New token (e.g. Mec_user199)"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6eef9", marginBottom: 8 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => addTokenAdmin(adminTokenValue)}
              style={{
                flex: 1,
                background: "linear-gradient(90deg,#143a8a,#1b63b3)",
                color: "#fff",
                border: "none",
                padding: 10,
                borderRadius: 8,
                fontWeight: 800,
                cursor: "pointer",
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
                flex: 1,
                background: "#fff",
                border: "1px solid #e6eef9",
                padding: 10,
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>

          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
            Tip: to add tokens for multiple users via console:
            <pre style={{ background: "#f8fafc", padding: 8, borderRadius: 6, marginTop: 8 }}>
localStorage.setItem('mecai_valid_tokens', JSON.stringify(['Mec_user199', 'PRO-001']))
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
