import React, { useState, useRef, useEffect } from "react";

/**
 * MecAi (PRO-ready) component
 *
 * Changes requested:
 * - Keeps original system message exactly as in your original file.
 * - Free usage: 100 messages total (not per day). Once user exceeds 100, paywall appears.
 * - After paying and entering a valid token (which you issue), user is upgraded to MECAI PRO permanently.
 * - MECAI PRO has an "elegant blue & silver" UI theme, PRO badge, and unlimited usage.
 * - Pay button opens phone app to: 0549548274
 * - Admin can add tokens via hidden admin UI (click "v1" five times).
 * - Clear chat button clears local storage chat.
 *
 * Notes:
 * - Token issuance / verification is frontend-only here: add tokens via console or the admin UI.
 * - For production, move token issuance/verification to a backend.
 */

export default function MecAi() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("mecai_chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [adminClicks, setAdminClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTokenValue, setAdminTokenValue] = useState("");

  const fileRef = useRef(null);
  const chatEndRef = useRef(null);

  const FREE_LIMIT = 100; // changed from 50 to 100 and not daily — cumulative until exceeded
  const MOMO_NUMBER = "0549548274";

  /* -------------------- Helpers -------------------- */
  function getUsageCount() {
    return parseInt(localStorage.getItem("mecai_requests") || "0", 10);
  }

  function setUsageCount(n) {
    localStorage.setItem("mecai_requests", String(n));
  }

  function incrementUsage() {
    const c = getUsageCount() + 1;
    setUsageCount(c);
    return c;
  }

  function isPro() {
    return localStorage.getItem("mecai_pro") === "true";
  }

  function setPro(flag = true) {
    localStorage.setItem("mecai_pro", flag ? "true" : "false");
    if (flag) localStorage.setItem("mecai_pro_date", new Date().toISOString());
    else {
      localStorage.removeItem("mecai_pro_date");
    }
  }

  /* -------------------- Scroll & Persist -------------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("mecai_chat", JSON.stringify(messages));
  }, [messages]);

  /* -------------------- Local DB (unchanged prompts) -------------------- */
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

  /* -------------------- Token storage helpers -------------------- */
  function getValidTokens() {
    try {
      const raw = localStorage.getItem("mecai_valid_tokens");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function removeUsedToken(token) {
    try {
      const tokens = getValidTokens().filter((t) => t !== token);
      localStorage.setItem("mecai_valid_tokens", JSON.stringify(tokens));
    } catch {}
  }

  function verifyTokenAndMakePro(tokenStr) {
    const tokens = getValidTokens();
    if (!tokenStr || tokenStr.trim() === "") {
      alert("Please enter the token you received.");
      return false;
    }
    const normalized = tokenStr.trim();
    if (tokens.includes(normalized)) {
      // Upgrade to PRO permanently
      setPro(true);
      // Optionally remove token so it can't be reused
      removeUsedToken(normalized);
      setShowPaywall(false);
      setTokenInput("");
      alert("✅ Token verified. Your account has been upgraded to MECAI PRO. Thank you!");
      return true;
    } else {
      alert("❌ Invalid token. Please check the code and try again.");
      return false;
    }
  }

  function addTokenAdmin(newToken) {
    if (!newToken || newToken.trim() === "") return;
    const tokens = getValidTokens();
    tokens.push(newToken.trim());
    localStorage.setItem("mecai_valid_tokens", JSON.stringify(tokens));
    alert(`Token added: ${newToken}`);
  }

  /* -------------------- Send message -------------------- */
  async function sendMessage() {
    if (!input.trim() && !image) return;

    // If user is PRO, no usage counting and no paywall
    if (!isPro()) {
      const current = incrementUsage();
      if (current > FREE_LIMIT) {
        // usage exceeded — show paywall and do not send this message
        setShowPaywall(true);
        // revert the increment because we didn't actually send the message
        setUsageCount(current - 1);
        return;
      }
    }

    const userMsg = { role: "user", content: input, image };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    const userInput = input.toLowerCase().trim();

    // Local quick replies
    const localResponse = localDB[userInput];
    if (localResponse) {
      setTimeout(() => {
        setMessages((m) => [...m, { role: "assistant", content: localResponse }]);
        setLoading(false);
      }, 600);
      return;
    }

    // Anti-jailbreak (preserve original behavior)
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
      // Preserve original system message exactly
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

  /* -------------------- Image handler -------------------- */
  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  }

  /* -------------------- Clear chat (local storage) -------------------- */
  function clearChat() {
    localStorage.removeItem("mecai_chat");
    setMessages([]);
  }

  /* -------------------- Admin reveal -------------------- */
  useEffect(() => {
    if (adminClicks >= 5) setShowAdmin(true);
  }, [adminClicks]);

  /* -------------------- UI theme selection -------------------- */
  const pro = isPro();
  // Elegant blue & silver for PRO
  const THEME = pro
    ? {
        bg: "#eaf2ff",
        card: "#f6f9ff",
        header: "#143a8a", // deep elegant blue
        accent: "#9fb4d9", // silver-blue accent
        userBubble: "#1e3a8a", // user bubble dark blue
        aiBubble: "#dbe9ff", // assistant bubble light
        textOnHeader: "#ffffff",
        text: "#0b1726",
      }
    : {
        // original warm theme for free users (kept similar to original)
        bg: "#fff9e6",
        card: "#fffdf7",
        header: "#d6a33e",
        accent: "#f1d48b",
        userBubble: "#b88523",
        aiBubble: "#f8e5b6",
        textOnHeader: "#fffdf7",
        text: "#3e2b00",
      };

  const usageCount = getUsageCount();
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

        {/* Chat area */}
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

        {/* Input bar */}
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

        {/* Paywall Modal (shown when usage exceeded and user is not PRO) */}
        {showPaywall && !pro && (
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
                padding: "26px 22px",
                borderRadius: "14px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
                textAlign: "center",
                maxWidth: "380px",
              }}
            >
              <h3 style={{ color: "#143a8a", marginBottom: "8px" }}>You've reached your free limit</h3>
              <p style={{ color: "#0b1726", fontSize: "14px", marginBottom: "10px" }}>
                You’ve used your {FREE_LIMIT} free messages.
              </p>

              <p style={{ color: "#0b1726", fontSize: "14px", marginBottom: "14px" }}>
                To unlock <strong>MECAI PRO</strong> (permanent upgrade) send ₵1 via MoMo to:
                <br />
                <b style={{ color: "#143a8a" }}>{MOMO_NUMBER} (MECAI)</b>
              </p>

              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
                <a
                  href={`tel:${MOMO_NUMBER}`}
                  style={{
                    textDecoration: "none",
                    background: "#143a8a",
                    color: "#fff",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    display: "inline-block",
                  }}
                >
                  📞 Open Phone
                </a>

                <button
                  onClick={() => {
                    // focus token input
                    const el = document.getElementById("mecai-token-input");
                    if (el) el.focus();
                  }}
                  style={{
                    background: "#fff",
                    border: "1px solid #143a8a",
                    color: "#143a8a",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  I have paid
                </button>
              </div>

              <div style={{ marginTop: 6 }}>
                <input
                  id="mecai-token-input"
                  type="text"
                  placeholder="Enter unlock code"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d1d7e0",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                  <button
                    onClick={() => verifyTokenAndMakePro(tokenInput)}
                    style={{
                      background: "#143a8a",
                      color: "#fff",
                      border: "none",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    🔓 Verify Token
                  </button>

                  <button
                    onClick={() => {
                      setShowPaywall(false);
                      setTokenInput("");
                    }}
                    style={{
                      background: "#fff",
                      border: "1px solid #d1d7e0",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      color: "#143a8a",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>

              <p style={{ fontSize: "12px", color: "#6b7280", marginTop: 12 }}>
                After you pay ₵1 to {MOMO_NUMBER}, I will send you a code (SMS/WhatsApp) to unlock MECAI PRO.
              </p>
            </div>
          </div>
        )}

        {/* Version text (click 5x to reveal admin UI) */}
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
            padding: "4px",
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
              placeholder="Token (e.g. MECAI-ABC123)"
              value={adminTokenValue}
              onChange={(e) => setAdminTokenValue(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: `1px solid ${THEME.accent}`,
                marginBottom: 8,
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  if (adminTokenValue.trim() === "") return alert("Enter token value");
                  addTokenAdmin(adminTokenValue.trim());
                  setAdminTokenValue("");
                }}
                style={{
                  flex: 1,
                  background: pro ? "#143a8a" : "#b88523",
                  color: "#fff",
                  border: "none",
                  padding: "8px",
                  borderRadius: "6px",
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
                  padding: "8px",
                  borderRadius: "6px",
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
                localStorage.setItem('mecai_valid_tokens', JSON.stringify(['MECAI-123','MECAI-456']));
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
