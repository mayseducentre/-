import React, { useEffect, useRef, useState } from "react";

export default function MecAiProGemini() {
  /* ---------------------- Theme ---------------------- */
  const THEME = {
    bg: "#f7f7f8",
    card: "#ffffff",
    userBubble: "#e6f0ff",
    aiBubble: "#f6f6f6",
    text: "#111827",
    muted: "#6b7280",
    accent: "#111827",
    shadow: "0 8px 30px rgba(16,24,40,0.06)",
  };

  /* ---------------------- Styles ---------------------- */
  const styles = {
    page: {
      minHeight: "100vh",
      background: THEME.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      color: THEME.text,
    },
    container: {
      width: "100%",
      maxWidth: 900,
      height: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      borderRadius: 14,
      overflow: "hidden",
      background: THEME.card,
      boxShadow: THEME.shadow,
    },
    header: {
      padding: "14px 18px",
      borderBottom: "1px solid #eef2f7",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      background: "#fff",
      gap: 10,
    },
    title: { fontWeight: 700, fontSize: 16 },
    subtitle: { color: THEME.muted, fontSize: 13 },
    messages: {
      flex: 1,
      overflowY: "auto",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      background: "#fff",
      scrollBehavior: "smooth",
    },
    msgRow: (isAI) => ({
      display: "flex",
      gap: 10,
      alignItems: "flex-end",
      justifyContent: isAI ? "flex-start" : "flex-end",
      wordBreak: "break-word",
    }),
    bubble: (isAI) => ({
      maxWidth: "80%",
      padding: "10px 13px",
      borderRadius: 12,
      background: isAI ? THEME.aiBubble : THEME.userBubble,
      color: THEME.text,
      whiteSpace: "pre-wrap",
      lineHeight: 1.5,
    }),
    time: { fontSize: 11, color: THEME.muted, marginTop: 6 },
    composer: {
      borderTop: "1px solid #eef2f7",
      padding: 10,
      display: "flex",
      gap: 8,
      alignItems: "center",
      background: "#fff",
    },
    input: {
      flex: 1,
      padding: "12px 14px",
      borderRadius: 10,
      border: "1px solid #e6e9ee",
      outline: "none",
      fontSize: 15,
      background: "#fff",
    },
    sendBtn: {
      background: THEME.accent,
      color: "#fff",
      border: "none",
      padding: "10px 16px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 600,
    },
    smallBtn: {
      border: "1px solid #e6e9ee",
      background: "#fff",
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
    },
    previewImg: {
      maxWidth: 240,
      borderRadius: 10,
      margin: "8px auto",
      border: "1px solid #e6e9ee",
      display: "block",
    },
  };

  /* ---------------------- Local Knowledge ---------------------- */
  const KB = [
    { q: "hello", a: "Hello 👋! How can I support you today?" },
    { q: "what is html", a: "HTML is the markup language used to structure content on web pages." },
    { q: "what is css", a: "CSS controls how web pages look — colors, layout, and design." },
    { q: "what is javascript", a: "JavaScript adds logic and interactivity to web pages." },
    { q: "kwame nkrumah", a: "Kwame Nkrumah was Ghana’s first president and independence leader." },
    { q: "ghana independence", a: "Ghana gained independence on March 6, 1957." },
    { q: "teamwork", a: "Teamwork means working together to achieve shared goals." },
    { q: "discipline", a: "Discipline is about consistency and self-control in achieving success." },
    { q: "tell me a joke", a: "Why did the computer go to art school? Because it wanted to learn how to draw attention! 😄" },
  ];

  const FALLBACKS = [
    "Hmm, I don’t have that yet — but I’ll learn it soon 😊.",
    "Try asking about computing, Ghana, or teamwork.",
  ];

  const SAFETY_PATTERNS = [
    /sex|porn|nsfw|explicit/i,
    /kill|murder|bomb|explode|shoot|suicide|self[-\s]*harm/i,
    /password|credit card|bank account|pin/i,
    /\bfuck\b|\bshit\b|\bbitch\b/i,
  ];

  const isUnsafe = (text) => SAFETY_PATTERNS.some((p) => p.test(text));

  /* ---------------------- State ---------------------- */
  const STORAGE_KEY = "mecai_chat_history";
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const fileRef = useRef(null);

  const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;

  /* ---------------------- Effects ---------------------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      typewriter(
        "👋 Welcome to MEC AI — your smart school assistant powered by Gemini! I can explain computing concepts, solve simple problems, or even compliment your uploaded pictures. Try asking: 'What is HTML?' or 'Solve 12 + 5'."
      );
    }
  }, []);

  /* ---------------------- Helpers ---------------------- */
  const uid = () => "m-" + Math.random().toString(36).slice(2, 9);
  const now = () => new Date().toISOString();
  const nowTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const normalize = (s) => (s || "").toLowerCase().trim();

  const pushMessage = (role, text) => {
    const msg = { id: uid(), role, text, ts: now() };
    setMessages((prev) => [...prev, msg]);
    return msg;
  };

  const findKB = (q) => {
    const t = normalize(q);
    return KB.find((e) => t.includes(normalize(e.q))) || null;
  };

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const solveSimple = (expr) => {
    const s = expr.replace(/×/g, "*").replace(/÷/g, "/");
    const m = s.match(/(-?\d+(\.\d+)?)\s*([+\-*/])\s*(-?\d+(\.\d+)?)/);
    if (!m) return null;
    const a = parseFloat(m[1]),
      op = m[3],
      b = parseFloat(m[4]);
    if (op === "+") return `${a} + ${b} = ${a + b}`;
    if (op === "-") return `${a} - ${b} = ${a - b}`;
    if (op === "*") return `${a} × ${b} = ${a * b}`;
    if (op === "/") return b === 0 ? "Division by zero is undefined." : `${a} ÷ ${b} = ${a / b}`;
    return null;
  };

  /* ---------------------- Gemini API ---------------------- */
  async function callGemini(prompt) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || pick(FALLBACKS);
    } catch {
      return "⚠️ Unable to connect to Gemini service.";
    }
  }

  /* ---------------------- Typewriter ---------------------- */
  function typewriter(text) {
    setIsTyping(true);
    const id = uid();
    const msg = { id, role: "ai", text: "", ts: now() };
    setMessages((prev) => [...prev, msg]);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, text: text.slice(0, i) } : m))
      );
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
  }

  /* ---------------------- Image Upload ---------------------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      pushMessage("user", "📷 Uploaded a picture!");
      setTimeout(() => {
        typewriter("Wow! That’s a great picture — it looks vibrant and full of life! 🌟");
      }, 700);
    }
  };

  /* ---------------------- Handle Send ---------------------- */
  async function handleSend() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    pushMessage("user", q);

    if (isUnsafe(q)) {
      return typewriter("⚠️ Sorry, I can’t discuss that topic.");
    }

    const math = solveSimple(q);
    if (math) return typewriter(math);

    const local = findKB(q);
    if (local) return typewriter(local.a);

    const thinkingId = uid();
    setMessages((prev) => [...prev, { id: thinkingId, role: "ai", text: "Thinking...", ts: now() }]);

    const reply = await callGemini(q);
    setMessages((prev) =>
      prev.map((m) => (m.id === thinkingId ? { ...m, text: reply } : m))
    );
  }

  /* ---------------------- UI ---------------------- */
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <div style={styles.title}>MEC AI</div>
            <div style={styles.subtitle}>Powered by Google Gemini</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={styles.smallBtn}
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(messages, null, 2))
              }
            >
              Export
            </button>
            <button
              style={styles.smallBtn}
              onClick={() => {
                setMessages([]);
                localStorage.removeItem(STORAGE_KEY);
              }}
            >
              Reset
            </button>
          </div>
        </header>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={styles.messages} ref={scrollRef}>
            {messages.map((m) => (
              <div key={m.id} style={styles.msgRow(m.role === "ai")}>
                {m.role === "ai" && (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#111827",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    M
                  </div>
                )}
                <div style={styles.bubble(m.role === "ai")}>
                  <div>{m.text}</div>
                  <div style={styles.time}>{nowTime(m.ts)}</div>
                </div>
                {m.role === "user" && (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#e6f0ff",
                      color: "#111827",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    Y
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={styles.msgRow(true)}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#111827",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  M
                </div>
                <div style={{ ...styles.bubble(true), opacity: 0.8 }}>
                  MEC AI is typing…
                </div>
              </div>
            )}
          </div>

          <div style={styles.composer}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <button style={styles.smallBtn} onClick={() => fileRef.current.click()}>
              📷
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              style={styles.input}
            />
            <button style={styles.sendBtn} onClick={handleSend}>
              Send
            </button>
          </div>

          {preview && <img src={preview} alt="preview" style={styles.previewImg} />}
        </div>
      </div>
    </div>
  );
    }
        
