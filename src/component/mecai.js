import React, { useEffect, useRef, useState } from "react";

export default function MecAiProAI() {
  /* ---------------------- Theme ---------------------- */
  const THEME = {
    bg: "#f7f7f8",
    card: "#ffffff",
    userBubble: "#dbeafe",
    aiBubble: "#f3f4f6",
    text: "#111827",
    muted: "#6b7280",
    accent: "#2563eb",
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
      maxWidth: 800,
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      borderRadius: 16,
      overflow: "hidden",
      background: THEME.card,
      boxShadow: THEME.shadow,
    },
    header: {
      padding: "14px 18px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#fff",
    },
    title: { fontWeight: 700, fontSize: 17 },
    subtitle: { color: THEME.muted, fontSize: 13 },
    messages: {
      flex: 1,
      overflowY: "auto",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      background: "#fff",
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
      borderTop: "1px solid #e5e7eb",
      padding: 10,
      display: "flex",
      gap: 8,
      alignItems: "center",
      background: "#fff",
      position: "sticky",
      bottom: 0,
    },
    input: {
      flex: 1,
      padding: "12px 14px",
      borderRadius: 10,
      border: "1px solid #d1d5db",
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
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  /* ---------------------- Effects ---------------------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      pushAI(
        "👋 Welcome to MEC AI — your smart school assistant! I can explain computing concepts, solve simple problems, or tell you something fun. Try asking: 'What is HTML?' or 'Who is Kwame Nkrumah?'"
      );
    }
  }, []);

  /* ---------------------- Helpers ---------------------- */
  const uid = () => "m-" + Math.random().toString(36).slice(2, 9);
  const now = () => new Date().toISOString();
  const nowTime = (ts) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const normalize = (s) => (s || "").toLowerCase().trim();
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const pushUser = (text) =>
    setMessages((prev) => [...prev, { id: uid(), role: "user", text, ts: now() }]);
  const pushAI = (text) =>
    setMessages((prev) => [...prev, { id: uid(), role: "ai", text, ts: now() }]);

  const findKB = (q) => {
    const t = normalize(q);
    return KB.find((e) => t.includes(normalize(e.q))) || null;
  };

  /* ---------------------- Hugging Face API ---------------------- */
  async function callHuggingFace(prompt) {
    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      const data = await res.json();
      if (data.error) {
        return pick(FALLBACKS);
      }
      return data[0]?.generated_text || pick(FALLBACKS);
    } catch (err) {
      console.error(err);
      return "⚠️ Couldn’t reach the AI service. Try again later.";
    }
  }

  /* ---------------------- Handle Send ---------------------- */
  async function handleSend() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    pushUser(q);

    const local = findKB(q);
    if (local) return pushAI(local.a);

    setIsTyping(true);
    const reply = await callHuggingFace(q);
    pushAI(reply);
    setIsTyping(false);
  }

  /* ---------------------- UI ---------------------- */
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <div style={styles.title}>MEC AI</div>
            <div style={styles.subtitle}>Powered by Hugging Face</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={styles.sendBtn}
              onClick={() => {
                setMessages([]);
                localStorage.removeItem(STORAGE_KEY);
              }}
            >
              Reset
            </button>
          </div>
        </header>

        <div style={styles.messages} ref={scrollRef}>
          {messages.map((m) => (
            <div key={m.id} style={styles.msgRow(m.role === "ai")}>
              {m.role === "ai" && (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: THEME.accent,
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
                    background: THEME.userBubble,
                    color: THEME.text,
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
                  background: THEME.accent,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                M
              </div>
              <div style={{ ...styles.bubble(true), opacity: 0.8 }}>MEC AI is typing…</div>
            </div>
          )}
        </div>

        <div style={styles.composer}>
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
      </div>
    </div>
  );
}
