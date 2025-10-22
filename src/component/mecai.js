// MecAiProGroq.jsx
import React, { useEffect, useRef, useState } from "react";

export default function MecAiProGroq() {
  /* ---------------------- Theme ---------------------- */
  const THEME = {
    bg: "#f7f7f8",
    card: "#ffffff",
    userBubble: "#e6f0ff",
    aiBubble: "#f6f6f6",
    text: "#111827",
    muted: "#6b7280",
    accent: "#111827",
    radius: 12,
    shadow: "0 8px 30px rgba(16,24,40,0.06)",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: THEME.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      color: THEME.text,
    },
    container: {
      width: "100%",
      maxWidth: 900,
      height: "calc(100vh - 48px)",
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
      gap: 12,
      background: "#fff",
    },
    title: { fontWeight: 700, fontSize: 16 },
    subtitle: { color: THEME.muted, fontSize: 13 },
    main: { display: "flex", flex: 1, minHeight: 0 },
    chatPanel: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
    messages: {
      flex: 1,
      overflow: "auto",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      background: "#fff",
    },
    msgRow: (isAI) => ({
      display: "flex",
      gap: 12,
      alignItems: "flex-end",
      justifyContent: isAI ? "flex-start" : "flex-end",
    }),
    bubble: (isAI) => ({
      maxWidth: "78%",
      padding: "12px 14px",
      borderRadius: 12,
      background: isAI ? THEME.aiBubble : THEME.userBubble,
      color: THEME.text,
      whiteSpace: "pre-wrap",
      lineHeight: 1.5,
      boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
    }),
    time: { fontSize: 11, color: THEME.muted, marginTop: 6, textAlign: "right" },
    composer: {
      borderTop: "1px solid #eef2f7",
      padding: 12,
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
      padding: "10px 14px",
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
    previewImg: { maxWidth: 220, borderRadius: 8, marginTop: 8, border: "1px solid #e6e9ee" },
  };

  /* ---------------------- Local KB ---------------------- */
  const KB = [
    { q: "hello", a: "Hello 👋! How can MEC AI help you today?" },
    { q: "what is html", a: "HTML is the language that structures content on web pages." },
    { q: "what is css", a: "CSS controls how web pages look — colors, layout, and style." },
    { q: "what is javascript", a: "JavaScript adds behavior and interactivity to web pages." },
    { q: "who is kwame nkrumah", a: "Kwame Nkrumah was Ghana’s first president and independence leader." },
    { q: "ghana independence", a: "Ghana gained independence on March 6, 1957." },
    { q: "teamwork", a: "Teamwork means working together to achieve a common goal." },
    { q: "discipline", a: "Discipline helps you stay consistent and responsible in your work." },
    { q: "tell me a joke", a: "Why did the computer show up at school? It had a byte to eat! 😄" },
  ];

  const FALLBACKS = [
    "I’m not sure about that yet, but I’ll learn it soon 😊.",
    "Hmm — try asking about school subjects or computing.",
  ];

  /* ---------------------- Safety filter ---------------------- */
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

  const GROQ_KEY = process.env.REACT_APP_GROQ; // hidden from UI

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      pushMessage("ai", "Hello — I'm MEC AI. Ask me about school topics or try: 'solve 12 + 5'.");
    }
  }, []);

  /* ---------------------- Helpers ---------------------- */
  const uid = () => "m-" + Math.random().toString(36).slice(2, 9);
  const now = () => new Date().toISOString();
  const nowTime = (ts) => new Date(ts).toLocaleTimeString();
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

  /* ---------------------- Groq API ---------------------- */
  async function callGroq(prompt) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 700,
        }),
      });
      const data = await res.json();
      return (
        data?.choices?.[0]?.message?.content ||
        "I couldn’t get a proper response right now."
      );
    } catch (err) {
      return "⚠️ Could not connect to AI server. Try again later.";
    }
  }

  /* ---------------------- Typewriter ---------------------- */
  function typewriter(text) {
    setIsTyping(true);
    const placeholder = { id: uid(), role: "ai", text: "", ts: now() };
    setMessages((prev) => [...prev, placeholder]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholder.id ? { ...m, text: text.slice(0, i) } : m
        )
      );
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
  }

  /* ---------------------- Handle Send ---------------------- */
  async function handleSend() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    pushMessage("user", q);

    if (isUnsafe(q)) {
      typewriter("⚠️ Sorry, I can’t discuss that topic.");
      return;
    }

    const math = solveSimple(q);
    if (math) {
      typewriter(math);
      return;
    }

    const local = findKB(q);
    if (local) {
      typewriter(local.a);
      return;
    }

    typewriter("Thinking…");
    const reply = await callGroq(q);
    setMessages((prev) => [...prev.slice(0, -1), { id: uid(), role: "ai", text: reply, ts: now() }]);
  }

  /* ---------------------- UI ---------------------- */
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <div style={styles.title}>MEC AI</div>
            <div style={styles.subtitle}>AI Assist</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
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

        <div style={styles.main}>
          <section style={styles.chatPanel}>
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
                style={{ display: "none" }}
              />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message (e.g., 'solve 12 + 5')"
                style={styles.input}
              />
              <button style={styles.sendBtn} onClick={handleSend}>
                Send
              </button>
            </div>

            {preview && (
              <img src={preview} alt="preview" style={styles.previewImg} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
