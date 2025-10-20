// MecAiProGroq.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * MecAiProGroq.jsx
 * ChatGPT-style clean UI + typewriter effect + Groq (Llama 3) backend.
 *
 * Paste into src/ and import into your app:
 *   import MecAiProGroq from "./MecAiProGroq";
 *   <MecAiProGroq />
 *
 * Default Groq key is pre-filled from user input. Replace or remove as needed.
 */

export default function MecAiProGroq() {
  /* ---------------------- Theme / Inline styles (clean ChatGPT-like) ---------------------- */
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
    rightPanel: {
      width: 280,
      borderLeft: "1px solid #eef2f7",
      padding: 14,
      background: "#fafafa",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    label: { fontSize: 13, color: THEME.muted, marginBottom: 6 },
    inputSmall: { padding: 8, borderRadius: 8, border: "1px solid #e6e9ee", fontSize: 14 },
    previewImg: { maxWidth: 220, borderRadius: 8, marginTop: 8, border: "1px solid #e6e9ee" },
  };

  /* ---------------------- Storage keys ---------------------- */
  const STORAGE_KEY = "mecai_chat_history";

  /* ---------------------- Local KB ---------------------- */
  const KB = [
    { q: "hello", a: "Hello 👋! How can MEC AI help you today?" },
    { q: "what is html", a: "HTML is the language that structures content on web pages." },
    { q: "what is css", a: "CSS controls how web pages look — colors, layout, and style." },
    { q: "what is javascript", a: "JavaScript adds behavior and interactivity to web pages." },
    { q: "who is kwame nkrumah", a: "Kwame Nkrumah was Ghana’s first president and independence leader." },
    { q: "ghana independence", a: "Ghana gained independence on March 6, 1957." },
    { q: "teamwork", a: "Teamwork is working together to reach a shared goal." },
    { q: "discipline", a: "Discipline helps you build good habits and stay focused in class." },
    { q: "tell me a joke", a: "Why did the computer show up at school? It had a byte to eat! 😄" },
    { q: "tell me a riddle", a: "Riddle: I have keys but no locks. What am I? — A piano." },
    { q: "math help", a: "Type 'solve 12 + 5' or 'solve 7 * 8' and I will show step-by-step." },
    // add more as needed...
  ];

  const FALLBACKS = [
    "I’m not sure about that yet, but I’ll learn it soon 😊.",
    "Hmm — try asking about school subjects or computing.",
  ];

  /* ---------------------- Safety filter ---------------------- */
  const SAFETY_PATTERNS = [
    /sex|porn|nsfw|explicit/i,
    /kill|murder|bomb|explode|shoot|suicide|self[-\s]*harm/i,
    /password|ssn|social security|credit card|bank account|pin/i,
    /how to hack|crack password|break into/i,
    /\bfuck\b|\bshit\b|\bbitch\b/i,
  ];

  function isUnsafe(text) {
    if (!text) return false;
    for (const p of SAFETY_PATTERNS) if (p.test(text)) return true;
    return false;
  }

  /* ---------------------- State & refs ---------------------- */
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [processing, setProcessing] = useState(false);
  const scrollRef = useRef(null);
  const fileRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [allowOnline, setAllowOnline] = useState(true);

  // User-provided Groq key (pre-filled with the key you gave)
  const [groqKey, setGroqKey] = useState(`${process.env.REACT_APP_GROQ}`);

  // simple session storage for games (number guessing, riddles)
  const [session, setSession] = useState(() => ({ games: {} }));

  /* ---------------------- Effects ---------------------- */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
    // scroll
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 40);
  }, [messages]);

  /* ---------------------- Helpers ---------------------- */
  function uid(prefix = "m") {
    return prefix + "-" + Math.random().toString(36).slice(2, 9);
  }
  function now() {
    return new Date().toISOString();
  }
  function nowTime(ts) {
    try {
      return new Date(ts).toLocaleTimeString();
    } catch {
      return "";
    }
  }
  function normalize(s) {
    return (s || "").toLowerCase().trim();
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pushMessage(role, text, meta = null) {
    const m = { id: uid("m"), role, text, meta, ts: now() };
    setMessages((prev) => [...prev, m]);
    return m;
  }

  function findKB(q) {
    if (!q) return null;
    const t = normalize(q).replace(/^(what is|who is|tell me about|explain)\s+/, "");
    let best = null;
    for (const e of KB) {
      const key = normalize(e.q);
      if (!key) continue;
      if (t.includes(key) || new RegExp("\\b" + key + "\\b").test(t)) {
        if (!best || key.length > normalize(best.q).length) best = e;
      }
    }
    return best;
  }

  /* ---------------------- Commands: games + solve ---------------------- */
  function detectCommand(text) {
    if (!text) return null;
    const t = normalize(text);
    if (t.startsWith("solve ") || /-?\d+\s*[+\-*/x×÷]\s*-?\d+/.test(t)) return "solve";
    if (t.startsWith("play number") || t === "play number game") return "play-number";
    if (t.startsWith("play riddle") || t === "play riddle game") return "play-riddle";
    if (t.startsWith("draw ") || t.startsWith("ascii ")) return "draw";
    return null;
  }

  // number game
  function startNumberGame(min = 1, max = 20) {
    const secret = Math.floor(Math.random() * (max - min + 1)) + min;
    setSession((s) => ({ ...s, games: { ...(s.games || {}), number: { active: true, secret, attempts: 0, min, max } } }));
    pushMessage("ai", `I picked a number between ${min} and ${max}. Guess it!`);
  }
  function guessNumber(text) {
    const g = session.games?.number;
    if (!g || !g.active) {
      pushMessage("ai", "No active number game. Type 'play number game' to start.");
      return;
    }
    const n = parseInt(text, 10);
    if (Number.isNaN(n)) {
      pushMessage("ai", "Please send a number (e.g., 7).");
      return;
    }
    g.attempts = (g.attempts || 0) + 1;
    setSession((s) => ({ ...s, games: { ...(s.games || {}), number: g } }));
    if (n === g.secret) {
      g.active = false;
      pushMessage("ai", `🎉 Correct! The number was ${g.secret}. Attempts: ${g.attempts}.`);
    } else if (n < g.secret) pushMessage("ai", "Too low — try a higher number.");
    else pushMessage("ai", "Too high — try a lower number.");
  }

  // riddles
  const RIDDLES = [
    { q: "I have keys but open no locks. What am I?", a: "A piano." },
    { q: "What has hands but cannot clap?", a: "A clock." },
  ];
  function playRiddle() {
    const r = pick(RIDDLES);
    setSession((s) => ({ ...s, games: { ...(s.games || {}), riddle: { active: true, current: r } } }));
    pushMessage("ai", `Riddle: ${r.q} (Type your answer)`);
  }
  function answerRiddle(text) {
    const r = session.games?.riddle;
    if (!r || !r.active) {
      pushMessage("ai", "No active riddle. Type 'play riddle game' to start.");
      return;
    }
    if (normalize(text).includes(normalize(r.current.a))) {
      r.active = false;
      pushMessage("ai", `Correct! ✅ Answer: ${r.current.a}`);
      setSession((s) => ({ ...s, games: { ...(s.games || {}), riddle: r } }));
    } else pushMessage("ai", "Not quite — try again or type 'give up'.");
  }

  /* ---------------------- Math solver (simple) ---------------------- */
  function solveSimple(expr) {
    const s = expr.replace(/×/g, "*").replace(/x/gi, "*").replace(/÷/g, "/");
    const m = s.match(/(-?\d+)\s*([+\-*/])\s*(-?\d+)/);
    if (!m) return null;
    const a = parseInt(m[1], 10),
      op = m[2],
      b = parseInt(m[3], 10);
    if (op === "+") return `${a} + ${b} = ${a + b}`;
    if (op === "-") return `${a} - ${b} = ${a - b}`;
    if (op === "*") return `${a} × ${b} = ${a * b}`;
    if (op === "/") {
      if (b === 0) return "Division by zero is undefined.";
      return `${a} ÷ ${b} = ${a / b}`;
    }
    return null;
  }

  /* ---------------------- Image attach ---------------------- */
  function onAttach() {
    if (fileRef.current) fileRef.current.click();
  }
  function onFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return alert("Only images allowed");
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  }

  /* ---------------------- Groq API call ---------------------- */
  async function callGroq(prompt) {
    // Using the OpenAI-compatible endpoint that Groq exposes
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const body = {
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Groq API error");
    }
    const data = await res.json();
    // read assistant text
    const reply = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || JSON.stringify(data);
    return reply;
  }

  /* ---------------------- Typewriter effect ---------------------- */
  const typingRef = useRef(null);
  function typewriter(text, speed = 18) {
    // add placeholder AI message
    const placeholder = { id: uid("ai"), role: "ai", text: "", ts: now() };
    setMessages((prev) => [...prev, placeholder]);
    let i = 0;
    function step() {
      i++;
      setMessages((prev) => {
        const copy = prev.slice();
        const idx = copy.findIndex((m) => m.id === placeholder.id);
        if (idx === -1) return prev;
        copy[idx] = { ...copy[idx], text: text.slice(0, i), ts: now() };
        return copy;
      });
      if (i < text.length) {
        typingRef.current = setTimeout(step, speed + Math.round(Math.random() * 10 - 5));
      } else {
        typingRef.current = null;
      }
    }
    // small initial delay
    typingRef.current = setTimeout(step, 160);
  }

  /* ---------------------- Main send flow ---------------------- */
  async function onSend() {
    if (processing) return;
    const raw = (input || "").trim();
    const hasImage = !!preview;
    if (!raw && !hasImage) return;

    if (raw) pushMessage("user", raw);
    if (hasImage) {
      pushMessage("user", "[image]", { image: preview });
      setPreview("");
      if (fileRef.current) fileRef.current.value = "";
    }
    setInput("");
    setProcessing(true);

    // short delay
    await new Promise((r) => setTimeout(r, 200));

    // command handling
    if (raw) {
      const cmd = detectCommand(raw);
      if (cmd === "play-number") {
        startNumberGame(1, 20);
        setProcessing(false);
        return;
      }
      if (/^\s*\d+\s*$/.test(raw) && session.games?.number?.active) {
        guessNumber(raw);
        setProcessing(false);
        return;
      }
      if (cmd === "play-riddle") {
        playRiddle();
        setProcessing(false);
        return;
      }
      if (cmd === "solve") {
        const expr = raw.replace(/^solve\s*/i, "");
        const res = solveSimple(expr) || "I couldn't parse that expression.";
        pushMessage("ai", res);
        setProcessing(false);
        return;
      }
      if (cmd === "draw") {
        const t = normalize(raw).split(/\s+/)[1] || "";
        const art = { cat: " /\\_/\\\n( o.o )\n > ^ <", tree: " /\\n/  \\\n/____\\\n ||" }[t];
        pushMessage("ai", art || "Try: draw cat, draw tree");
        setProcessing(false);
        return;
      }
    }

    // KB check
    if (raw) {
      const kb = findKB(raw);
      if (kb) {
        typewriter(kb.a);
        setProcessing(false);
        return;
      }
    }

    // safety
    if (isUnsafe(raw)) {
      typewriter("Let's keep our chat about school and learning 😊.");
      setProcessing(false);
      return;
    }

    // online Groq path
    if (!allowOnline || !groqKey) {
      typewriter(pick(FALLBACKS));
      setProcessing(false);
      return;
    }

    // call Groq and typewriter the response
    setIsTyping(true);
    try {
      const reply = await callGroq(raw);
      // ensure reply is a string
      const textReply = typeof reply === "string" ? reply : JSON.stringify(reply);
      typewriter(textReply);
    } catch (err) {
      console.warn("Groq call failed:", err);
      typewriter("The online AI service is currently unavailable. Try again later.");
    } finally {
      setIsTyping(false);
      setProcessing(false);
    }
  }

  /* ---------------------- Export / Reset ---------------------- */
  function onExport() {
    try {
      const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `mecai-convo-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      alert("Export failed");
    }
  }
  function onReset() {
    if (!confirm("Clear conversation?")) return;
    setMessages([]);
    setSession({ games: {} });
    localStorage.removeItem(STORAGE_KEY);
  }

  /* ---------------------- Init welcome ---------------------- */
  useEffect(() => {
    if (!messages || messages.length === 0) {
      pushMessage("ai", "Hello — I'm MEC AI. Ask about school topics, or try: 'solve 12 + 5', 'play number game', 'draw cat'.");
    }
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------- Render helpers ---------------------- */
  function renderMsg(m) {
    const isAI = m.role === "ai";
    return (
      <div key={m.id} style={styles.msgRow(isAI)}>
        {isAI && <div style={{ width: 36, height: 36, borderRadius: 8, background: "#111827", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>M</div>}
        <div style={styles.bubble(isAI)}>
          <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
          <div style={styles.time}>{nowTime(m.ts)}</div>
        </div>
        {!isAI && <div style={{ width: 36, height: 36, borderRadius: 8, background: "#e6f0ff", color: "#111827", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>Y</div>}
      </div>
    );
  }

  /* ---------------------- UI ---------------------- */
  return (
    <div style={styles.page}>
      <div style={styles.container} role="application" aria-label="MEC AI chat">
        <header style={styles.header}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={styles.title}>MEC AI</div>
            <div style={styles.subtitle}>MEC Junior High — Your learning assistant</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <button style={styles.smallBtn} onClick={onExport}>Export</button>
            <button style={styles.smallBtn} onClick={onReset}>Reset</button>
          </div>
        </header>

        <div style={styles.main}>
          <section style={styles.chatPanel}>
            <div style={styles.messages} ref={scrollRef} aria-live="polite">
              {messages.map(renderMsg)}
              {isTyping && (
                <div style={styles.msgRow(true)}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#111827", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>M</div>
                  <div style={{ ...styles.bubble(true), opacity: 0.8 }}>MEC AI is typing…</div>
                </div>
              )}
            </div>

            <div style={styles.composer}>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFileChange} />
              <button style={styles.smallBtn} onClick={onAttach}>📎</button>
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }} placeholder="Type a message (e.g., 'solve 12 + 5')" style={styles.input} />
              <button style={styles.sendBtn} onClick={onSend} disabled={processing}>{processing ? "…" : "Send"}</button>
            </div>
            {preview && <img src={preview} alt="preview" style={styles.previewImg} />}
          </section>

          <aside style={styles.rightPanel}>
            <div>
              <div style={styles.label}>Groq API Key</div>
              <input style={styles.inputSmall} value={groqKey} onChange={(e) => setGroqKey(e.target.value.trim())} placeholder="gsk_..." />
              <div style={{ fontSize: 12, color: THEME.muted, marginTop: 8 }}>
                This key is used to call Groq Cloud (Llama 3). Keep it private. For production, use a server proxy.
              </div>
            </div>

            <div>
              <div style={styles.label}>Online AI</div>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={allowOnline} onChange={(e) => setAllowOnline(e.target.checked)} />
                <span style={{ fontSize: 13 }}>Enable Groq online calls</span>
              </label>
            </div>

            <div>
              <div style={styles.label}>Quick commands</div>
              <div style={{ fontSize: 13, color: THEME.muted }}>
                <div>• <code>solve 12 + 5</code></div>
                <div>• <code>play number game</code></div>
                <div>• <code>play riddle game</code></div>
                <div>• <code>draw cat</code></div>
              </div>
            </div>

            <div>
              <div style={styles.label}>About</div>
              <div style={{ fontSize: 13, color: THEME.muted }}>
                MEC AI — simple ChatGPT-style UI, local KB first, Groq (Llama 3) for reasoning.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
