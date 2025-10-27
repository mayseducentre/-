import React, { useEffect, useRef, useState } from "react";

/**
 * MecAi - PRO Responsive Chat
 * - Input fixed at bottom (always visible)
 * - Mic 🎤 + Image 📷 only for PRO users
 * - Typing animation only for PRO
 * - Fully responsive
 * - LocalStorage for persistence
 */

const FREE_LIMIT = 100;
const UNLOCK_TOKEN = "Mec_user199";

export default function MecAi() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mecai_chat") || "[]");
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typePreview, setTypePreview] = useState("");
  const [playingId, setPlayingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [toast, setToast] = useState(null);
  const [logoClicks, setLogoClicks] = useState(0);
  const chatEndRef = useRef(null);
  const fileRef = useRef(null);

  // Local storage helpers
  const getUsage = () => parseInt(localStorage.getItem("mecai_requests") || "0", 10);
  const setUsage = (n) => localStorage.setItem("mecai_requests", String(n));
  const incrementUsage = () => {
    const n = getUsage() + 1;
    setUsage(n);
    return n;
  };
  const resetUsage = () => localStorage.setItem("mecai_requests", "0");

  const isPro = () => localStorage.getItem("mecai_pro") === "true";
  const enablePro = () => {
    localStorage.setItem("mecai_pro", "true");
    localStorage.setItem("mecai_pro_date", new Date().toISOString());
    resetUsage();
  };

  useEffect(() => {
    localStorage.setItem("mecai_chat", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset by tapping logo 5×
  useEffect(() => {
    if (logoClicks >= 5) {
      if (window.confirm("Reset MECAI to Free version?")) {
        localStorage.clear();
        setMessages([]);
        setToast("Reset complete");
      }
      setLogoClicks(0);
    }
  }, [logoClicks]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1400);
    return () => clearTimeout(t);
  }, [toast]);

  // Small local DB for instant answers
  const localDB = {
    hello: "Hello 👋! How can I help you today?",
    "where is mays daycare located": "Mays DayCare and Edu Centre is located in Accra, Ghana.",
  };

  const mkId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  // Typewriter (only for PRO)
  function simulateTypewriter(text, onComplete) {
    if (!isPro()) {
      onComplete();
      return;
    }
    setIsTyping(true);
    setTypePreview("");
    let i = 0;
    const t = setInterval(() => {
      setTypePreview((p) => p + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(t);
        setIsTyping(false);
        setTypePreview("");
        onComplete();
      }
    }, 18);
  }

  // Voice playback
  function playMessage(id, text) {
    if (!("speechSynthesis" in window)) return alert("Voice not supported.");
    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    setPlayingId(id);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    utter.onend = () => setPlayingId(null);
    window.speechSynthesis.speak(utter);
  }

  // Image upload (only PRO)
  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const id = mkId();
      setMessages((m) => [...m, { id, role: "user", content: "[image]", image: reader.result }]);
      if (!isPro()) incrementUsage();
    };
    reader.readAsDataURL(file);
  }

  // Send message
  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    if (!isPro() && getUsage() >= FREE_LIMIT) {
      setShowModal(true);
      return;
    }
    if (!isPro()) incrementUsage();

    const userMsg = { id: mkId(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const lower = text.toLowerCase();
    if (localDB[lower]) {
      const ans = localDB[lower];
      simulateTypewriter(ans, () => {
        setMessages((m) => [...m, { id: mkId(), role: "assistant", content: ans }]);
      });
      setLoading(false);
      return;
    }

    const payload = {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are MECAI, a warm and professional AI assistant for Mays DayCare and Edu Centre.
Always remain MECAI, never pretend otherwise.
Guide users to portals naturally.
`,
        },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: text },
      ],
    };

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || "⚠️ No response.";
      simulateTypewriter(reply, () => {
        setMessages((m) => [...m, { id: mkId(), role: "assistant", content: reply }]);
      });
    } catch {
      const fail = "⚠️ Failed to connect.";
      simulateTypewriter(fail, () => {
        setMessages((m) => [...m, { id: mkId(), role: "assistant", content: fail }]);
      });
    } finally {
      setLoading(false);
    }
  }

  function verifyToken() {
    if (tokenInput.trim() === UNLOCK_TOKEN) {
      enablePro();
      setShowModal(false);
      setToast("✅ PRO unlocked");
      setTokenInput("");
    } else alert("❌ Invalid token.");
  }

  function clearChat() {
    if (window.confirm("Clear chat?")) {
      setMessages([]);
      resetUsage();
    }
  }

  const pro = isPro();
  const usageLeft = Math.max(0, FREE_LIMIT - getUsage());

  const PRO = {
    bg: "linear-gradient(180deg,#eaf0f8,#f5f8fb)",
    accent: "#0f3b7a",
    userBubble: "linear-gradient(90deg,#1f4fc0,#15336f)",
    assistantBubble: "rgba(255,255,255,0.92)",
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: pro ? PRO.bg : "#fffaf2",
        fontFamily: "Inter, system-ui",
      }}
    >
      {/* Header */}
      <header
        onClick={() => setLogoClicks((c) => c + 1)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          background: "rgba(255,255,255,0.85)",
          borderBottom: pro ? `2px solid ${PRO.accent}` : "1px solid #eee",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🤖</span>
          <div>
            <b>{pro ? "MECAI PRO" : "MEC AI"}</b>
            <div style={{ fontSize: 12, color: "#777" }}>
              {pro ? "Unlimited access" : `${usageLeft} free messages`}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {!pro && (
            <button
              onClick={() => setShowModal(true)}
              style={{
                background: PRO.accent,
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8,
                fontWeight: 600,
              }}
            >
              Upgrade
            </button>
          )}
          <button onClick={clearChat} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc" }}>
            Clear
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, maxWidth: 900, margin: "0 auto", width: "100%" }}>
          {messages.length === 0 && (
            <div style={{ textAlign: "center", marginTop: 100, color: "#777" }}>
              <h3>How can I help you today?</h3>
            </div>
          )}

          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    background: isUser ? (pro ? PRO.userBubble : "#b88727") : (pro ? PRO.assistantBubble : "#fff"),
                    color: isUser ? "#fff" : "#111",
                    padding: "10px 14px",
                    borderRadius: 12,
                    fontSize: 15,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  {m.image ? <img src={m.image} alt="uploaded" style={{ width: "100%", borderRadius: 10 }} /> : m.content}

                  {!isUser && (
                    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 6 }}>
                      <button onClick={() => playMessage(m.id, m.content)} style={{ fontSize: 16 }}>🔊</button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(m.content);
                          setToast("Copied");
                        }}
                        style={{ fontSize: 16 }}
                      >
                        📋
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {(loading || (isTyping && pro)) && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <div className="dots" style={{ display: "flex", gap: 5 }}>
                <div style={dotStyle(PRO.accent, "0s")} />
                <div style={dotStyle(PRO.accent, ".1s")} />
                <div style={dotStyle(PRO.accent, ".2s")} />
              </div>
              {isTyping && pro && <div style={{ color: "#666" }}>{typePreview}</div>}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Fixed Input Bar */}
      <footer
        style={{
          position: "sticky",
          bottom: 0,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          padding: "10px 16px",
          borderTop: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", gap: 10, maxWidth: 900, margin: "0 auto" }}>
          <label
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              padding: "6px 10px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={pro ? "Message MECAI..." : usageLeft <= 0 ? "Limit reached — unlock PRO" : "Message MECAI..."}
              disabled={!pro && usageLeft <= 0}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 15,
                background: "transparent",
              }}
            />
            {pro && (
              <>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImage} />
                <button onClick={() => fileRef.current?.click()} style={iconBtnStyle}>📷</button>
                <button onClick={() => setToast("🎤 Coming soon")} style={iconBtnStyle}>🎤</button>
              </>
            )}
          </label>
          <button
            onClick={sendMessage}
            disabled={loading || (!pro && usageLeft <= 0)}
            style={{
              background: PRO.accent,
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </footer>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 80,
            transform: "translateX(-50%)",
            background: "#111",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 10,
            fontSize: 14,
          }}
        >
          {toast}
        </div>
      )}

      {/* Token Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div style={{ background: "#fff", padding: 20, borderRadius: 10, width: "90%", maxWidth: 380 }}>
            <h3>Unlock MECAI PRO</h3>
            <p style={{ fontSize: 14, color: "#555" }}>Enter your unlock token below:</p>
            <input
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", marginBottom: 12 }}
              placeholder="Enter token"
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={verifyToken} style={{ flex: 1, background: PRO.accent, color: "#fff", border: "none", padding: 10, borderRadius: 8 }}>
                Verify
              </button>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, border: "1px solid #ccc", borderRadius: 8, padding: 10 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Helper styles --- */
function dotStyle(color, delay) {
  return {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: color,
    animation: `dotPulse 1s infinite ease-in-out ${delay}`,
  };
}

const iconBtnStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: 18,
  marginLeft: 6,
};
