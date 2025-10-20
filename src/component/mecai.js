// MecAiPro.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * MecAiPro.jsx
 *
 * Professional hybrid (local-KB-first, online GPT-only) chat assistant for MEC Junior High.
 * - Theme: Gold/White (MEC)
 * - Personality: Tutor (friendly, educational)
 * - Header: Compact bar (logo + MEC AI title)
 * - Typewriter effect for AI replies
 * - Local KB fallback first; if no KB match -> call OpenAI GPT-4o-mini
 * - Safety filter blocks inappropriate/personal queries
 * - localStorage persistence under "mecai_chat_history"
 *
 * IMPORTANT: Replace "YOUR_OPENAI_KEY_HERE" in settings UI or paste a key in the settings input.
 *
 * Usage: Drop this file into your React app (Create React App / Vite) and import <MecAiPro />.
 */

export default function MecAiPro() {
  /* ----------------------------- Theme & Inline Styles ----------------------------- */
  const THEME = {
    bg: "#fffdf8",
    panel: "#fffaf3",
    accent: "#d4a017",
    accent2: "#c49a6c",
    aiBubble: "#fff6e6",
    userBubble: "#f6f5f3",
    muted: "#6b5b4a",
    text: "#241f1a",
    radius: 12,
    shadow: "0 18px 50px rgba(18,16,12,0.06)",
    cardBg: "#ffffff",
  };

  const S = {
    page: {
      minHeight: "100vh",
      background: THEME.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      color: THEME.text,
    },
    card: {
      width: "100%",
      maxWidth: 1100,
      height: "calc(100vh - 40px)",
      display: "flex",
      flexDirection: "column",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: THEME.shadow,
      background: THEME.cardBg,
    },
    header: {
      display: "flex",
      alignItems: "center",
      padding: "14px 18px",
      background: THEME.panel,
      borderBottom: "1px solid rgba(0,0,0,0.04)",
    },
    logoBox: {
      width: 56,
      height: 56,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "#fff",
      flexShrink: 0,
    },
    logoImg: { width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 },
    titleBox: { marginLeft: 12 },
    title: { fontSize: 18, fontWeight: 800, color: THEME.accent2 },
    subtitle: { fontSize: 13, color: THEME.muted },
    headerRight: { marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" },

    main: { display: "flex", flex: 1, minHeight: 0 },
    left: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
    chatArea: {
      flex: 1,
      overflow: "auto",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      background: "linear-gradient(180deg,#fffaf7,#fff)",
    },
    rowBase: { display: "flex", gap: 12, alignItems: "flex-end", maxWidth: "100%" },

    avatar: (role) => ({
      width: 44,
      height: 44,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      color: role === "ai" ? "#fff" : THEME.text,
      background: role === "ai" ? `linear-gradient(180deg, ${THEME.accent}, ${THEME.accent2})` : "#efeae0",
      flexShrink: 0,
    }),
    bubble: (role) => ({
      maxWidth: "78%",
      padding: "12px 14px",
      borderRadius: 12,
      lineHeight: 1.5,
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
      boxShadow: "0 1px 0 rgba(12,10,8,0.02)",
      background: role === "ai" ? THEME.aiBubble : THEME.userBubble,
      borderLeft: role === "ai" ? `4px solid ${THEME.accent2}` : undefined,
      borderRight: role === "user" ? "3px solid rgba(0,0,0,0.03)" : undefined,
    }),
    time: { color: THEME.muted, fontSize: 12, marginTop: 8 },

    composerWrap: { borderTop: "1px solid #f2ebe1", padding: 12, background: "#fff" },
    composer: { display: "flex", gap: 8, alignItems: "center" },
    textInput: {
      flex: 1,
      padding: 12,
      borderRadius: 12,
      border: "1px solid #efe6dc",
      fontSize: 15,
      outline: "none",
      background: "#fff",
    },
    fileInput: { display: "none" },
    attachBtn: {
      border: "1px solid rgba(0,0,0,0.06)",
      background: "#fff",
      padding: "8px 10px",
      borderRadius: 10,
      cursor: "pointer",
      fontSize: 16,
    },
    sendBtn: {
      background: `linear-gradient(90deg, ${THEME.accent}, ${THEME.accent2})`,
      color: "#fff",
      border: 0,
      padding: "8px 14px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 700,
    },
    previewImg: { maxWidth: 220, borderRadius: 10, marginTop: 8, border: "1px solid #efe6dc" },

    rightPanel: {
      width: 320,
      borderLeft: "1px solid rgba(0,0,0,0.04)",
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      background: "rgba(255,255,255,0.98)",
    },
    smallInput: { padding: 8, borderRadius: 8, border: "1px solid #efe6dc", fontSize: 14 },
    label: { fontSize: 13, color: THEME.muted, marginBottom: 6 },

    footerNote: { color: THEME.muted, fontSize: 13, marginTop: 8 },
  };

  /* ----------------------------- Utilities ----------------------------- */
  const STORAGE_KEY = "mecai_chat_history";
  function uid(prefix = "m") {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  }
  function nowISO() {
    return new Date().toISOString();
  }
  function nowTimeString(ts) {
    try {
      return new Date(ts).toLocaleTimeString();
    } catch {
      return "";
    }
  }
  function normalize(s) {
    return (s || "").toString().toLowerCase().trim();
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ----------------------------- KB (local first) -----------------------------
     Include the core KB from your original file. Expand as needed.
  --------------------------------------------------------------------------- */
  const KB = [
    { q: "hello", a: "Hello 👋! Nice to see you — how can I help today?" },
    { q: "hi", a: "Hi there! 😊 What would you like to chat about?" },
    { q: "good morning", a: "Good morning! ☀️ Hope you have a lovely day." },
    { q: "good afternoon", a: "Good afternoon! 🌤️ How's your day going so far?" },
    { q: "good evening", a: "Good evening 🌙. Time to relax and unwind." },
    { q: "what's your name", a: "I’m MEC AI — your friendly school assistant and tutor 🤖" },
    { q: "what is html", a: "HTML (HyperText Markup Language) structures content on the web." },
    { q: "what is css", a: "CSS (Cascading Style Sheets) controls how elements look on a page." },
    { q: "what is javascript", a: "JavaScript adds interactivity and behavior to webpages." },
    { q: "teamwork", a: "Teamwork helps everyone achieve more together — share ideas and listen." },
    { q: "discipline", a: "Discipline builds good habits and shows respect to others." },
    { q: "who is kwame nkrumah", a: "Kwame Nkrumah was Ghana’s first president and a leader of independence." },
    { q: "ghana independence", a: "Ghana gained independence on March 6, 1957 — a historic day." },
    { q: "capital of ghana", a: "Accra is the capital city of Ghana — lively and coastal." },
    { q: "tell me a joke", a: "Why did the computer get cold? It left its Windows open! 😂" },
    { q: "tell me a riddle", a: "Riddle: I have keys but no locks. What am I? — A piano 🎹" },
    { q: "say a proverb", a: "Proverb: 'If you want to go fast, go alone. If you want to go far, go together.'" },
    { q: "math help", a: "Tell me the math question and I’ll help step by step — we can solve it together." },
    { q: "homework", a: "Type 'homework' followed by your question and I'll guide you through it." },
    { q: "help", a: "Type 'homework' or 'solve' or 'explain topic' and I will help step-by-step." },
    // Add more as needed...
  ];

  const FALLBACKS = [
    "Hmm 🤔 I’m not sure about that yet.",
    "That’s interesting! Try asking about school subjects or computing.",
    "I’ll learn that soon 😊.",
    "Not sure, but let’s try a riddle or a fun fact!",
  ];

  /* ----------------------------- Safety Filter ----------------------------- */
  const SAFETY_PATTERNS = [
    /sex|porn|nsfw|explicit/i,
    /kill|murder|bomb|explode|shoot|suicide|self[-\s]*harm/i,
    /password|ssn|social security|credit card|bank account|pin/i,
    /date me|marry me|i love you|hook up/i,
    /how to hack|crack password|break into/i,
    /\bfuck\b|\bshit\b|\bbitch\b/i,
  ];
  function isUnsafe(text) {
    if (!text) return false;
    for (const p of SAFETY_PATTERNS) if (p.test(text)) return true;
    return false;
  }

  /* ----------------------------- State & Refs ----------------------------- */
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [preview, setPreview] = useState("");
  const fileRef = useRef(null);
  const scrollRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Settings / teacher options
  const [openAIKey, setOpenAIKey] = useState(""); // set via UI
  const [allowOpenAI, setAllowOpenAI] = useState(true); // you said online only -> default true

  // Small games/session store
  const [session, setSession] = useState(() => ({ lastTopic: null, games: {} }));

  // Typewriter control
  const typingRef = useRef({ currentTimer: null });

  /* ----------------------------- Persistence Effects ----------------------------- */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
    // autoscroll
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 40);
  }, [messages]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mecai_session");
      if (raw) setSession(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("mecai_session", JSON.stringify(session));
    } catch {}
  }, [session]);

  /* ----------------------------- Helper Functions ----------------------------- */

  function pushMessage(role, text, meta) {
    const m = { id: uid("m"), role, text: text || "", meta: meta || null, ts: nowISO() };
    setMessages((prev) => [...prev, m]);
    return m;
  }

  function replaceLastAIMessageWithText(text) {
    setMessages((prev) => {
      const lastIdx = [...prev].reverse().findIndex((x) => x.role === "ai");
      if (lastIdx === -1) return [...prev, { id: uid("m"), role: "ai", text, ts: nowISO() }];
      const idx = prev.length - 1 - lastIdx;
      const next = prev.slice();
      next[idx] = { ...next[idx], text, ts: nowISO() };
      return next;
    });
  }

  function findKB(query) {
    if (!query) return null;
    let q = normalize(query);
    if (!q) return null;
    // strip common prefixes
    q = q.replace(/^(what is|what's|who is|tell me about|explain)\s+/i, "").trim();
    let best = null;
    for (const e of KB) {
      const key = normalize(e.q);
      if (!key) continue;
      const regex = new RegExp("\\b" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
      if (regex.test(q) || q.includes(key)) {
        if (!best || key.length > normalize(best.q).length) best = e;
      }
    }
    return best;
  }

  /* ----------------------------- Simple Command Detection ----------------------------- */
  function detectCommand(text) {
    if (!text) return null;
    const t = normalize(text);
    if (t.startsWith("solve ") || t.startsWith("calculate ") || /-?\d+\s*[+\-*/x×÷]\s*-?\d+/.test(t)) return "solve";
    if (t === "play number game" || t.startsWith("play number")) return "play-number";
    if (t === "play riddle game" || t.startsWith("play riddle")) return "play-riddle";
    if (t.startsWith("draw ") || t.startsWith("ascii ")) return "draw";
    if (t.startsWith("homework") || t.startsWith("hw ") || t.startsWith("help with")) return "homework";
    if (t === "give up") return "give-up";
    if (/^\s*-?\d+\s*$/.test(t) && session.games && session.games.number && session.games.number.active) return "guess";
    return null;
  }

  /* ----------------------------- Small Game Implementations ----------------------------- */

  function startNumberGame(min = 1, max = 20) {
    const secret = Math.floor(Math.random() * (max - min + 1)) + min;
    const games = { ...(session.games || {}) };
    games.number = { active: true, secret, min, max, attempts: 0 };
    setSession((s) => ({ ...s, games }));
    pushMessage("ai", `I picked a number between ${min} and ${max}. Try to guess it (type a number).`);
  }

  function handleGuessNumber(input) {
    const g = session.games?.number;
    if (!g || !g.active) {
      pushMessage("ai", "No active number game. Type 'play number game' to start.");
      return;
    }
    const num = parseInt(input, 10);
    if (Number.isNaN(num)) {
      pushMessage("ai", "Please send a number (e.g., 7).");
      return;
    }
    g.attempts = (g.attempts || 0) + 1;
    setSession((s) => ({ ...s, games: { ...(s.games || {}), number: g } }));
    if (num === g.secret) {
      pushMessage("ai", `🎉 Correct! The number was ${g.secret}. You guessed it in ${g.attempts} attempts. Type 'play number game' to play again.`);
      g.active = false;
      setSession((s) => ({ ...s, games: { ...(s.games || {}), number: g } }));
    } else if (num < g.secret) {
      pushMessage("ai", "Too low — try a higher number.");
    } else {
      pushMessage("ai", "Too high — try a lower number.");
    }
  }

  const RIDDLES = [
    { q: "I have keys but open no locks. What am I?", a: "A piano or a keyboard." },
    { q: "What has hands but cannot clap?", a: "A clock." },
    { q: "What gets wetter as it dries?", a: "A towel." },
  ];

  function startRiddle() {
    const r = pick(RIDDLES);
    const games = { ...(session.games || {}), riddle: { active: true, current: r } };
    setSession((s) => ({ ...s, games }));
    pushMessage("ai", `Riddle: ${r.q} (Type your answer)`);
  }

  function answerRiddle(ans) {
    const r = session.games?.riddle;
    if (!r || !r.active) {
      pushMessage("ai", "No active riddle. Type 'play riddle game' to start.");
      return;
    }
    const correct = normalize(r.current.a);
    if (normalize(ans).includes(correct) || correct.includes(normalize(ans))) {
      pushMessage("ai", `Correct! ✅ Answer: ${r.current.a}`);
      r.active = false;
      setSession((s) => ({ ...s, games: { ...(s.games || {}), riddle: r } }));
    } else {
      pushMessage("ai", "Not quite — try again or type 'give up' to see the answer.");
    }
  }

  /* ----------------------------- Math Solver ----------------------------- */
  function solveExpressionRaw(expr) {
    const s = expr.replace(/×/g, "*").replace(/x\b/gi, "*").replace(/÷/g, "/");
    const m = s.match(/(-?\d+)\s*([+\-*/])\s*(-?\d+)/);
    if (!m) return null;
    const a = parseInt(m[1], 10);
    const op = m[2];
    const b = parseInt(m[3], 10);
    let result;
    const steps = [];
    if (op === "+") {
      result = a + b;
      steps.push(`${a} + ${b} = ${result}`);
    } else if (op === "-") {
      result = a - b;
      steps.push(`${a} - ${b} = ${result}`);
    } else if (op === "*") {
      result = a * b;
      steps.push(`${a} × ${b} = ${result}`);
    } else if (op === "/") {
      if (b === 0) {
        steps.push("Division by zero is undefined.");
        result = null;
      } else {
        const q = Math.floor(a / b);
        const r = a % b;
        result = a / b;
        steps.push(`${a} ÷ ${b} = ${q} remainder ${r}`);
      }
    }
    return { a, op, b, result, steps };
  }

  function handleSolve(cmd) {
    let expr = cmd;
    const t = normalize(cmd);
    if (t.startsWith("solve ")) expr = cmd.slice(6).trim();
    else if (t.startsWith("calculate ")) expr = cmd.slice(10).trim();
    else {
      const found = expr.match(/-?\d+\s*[+\-*/x×÷]\s*-?\d+/);
      if (found) expr = found[0];
    }
    const res = solveExpressionRaw(expr);
    if (!res) {
      pushMessage("ai", "I couldn't parse that expression. Try 'solve 12 + 5' or 'solve 7*8'.");
      return;
    }
    pushMessage("ai", `Let's solve: ${res.a} ${res.op} ${res.b}\n\nStep-by-step:\n- ${res.steps.join("\n- ")}\n\nAnswer: ${res.result}`);
  }

  /* ----------------------------- ASCII Draw ----------------------------- */
  const ASCII = {
    cat: " /\\_/\\\n( o.o )\n > ^ <",
    tree: "   /\\\n  /  \\\n /____\\\n   ||\n   ||",
    house: "   /\\\n  /  \\\n /____\\\n | _  |\n ||_| |\n |____|",
    rocket: "   /\\\n  /  \\\n /____\\\n |    |\n/|----|\\\n  /\\\n  \\/",
  };

  function handleDraw(cmd) {
    const t = normalize(cmd).replace(":", " ");
    const parts = t.split(/\s+/);
    const target = parts[1] || parts[2] || "";
    if (!target) {
      pushMessage("ai", "Tell me what to draw, e.g. 'draw cat' or 'draw tree'.");
      return;
    }
    const art = ASCII[target] || null;
    if (art) pushMessage("ai", art);
    else pushMessage("ai", `I don't have ASCII art for "${target}" yet. Try: cat, tree, house, rocket.`);
  }

  /* ----------------------------- Image Attach ----------------------------- */
  function handleAttachClick() {
    if (fileRef.current) fileRef.current.click();
  }
  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Only image files are supported for preview.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(f);
  }

  /* ----------------------------- OpenAI call (online only) ----------------------------- */
  async function callOpenAI(promptText) {
    if (!allowOpenAI) throw new Error("OpenAI disabled in settings");
    if (!openAIKey) throw new Error("No OpenAI key provided in settings");
    // Build chat completion request for GPT-4o-mini
    const body = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: promptText }],
      max_tokens: 700,
    };
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "OpenAI error");
    }
    const data = await res.json();
    // Support typical shape: choices[0].message.content
    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      (typeof data === "string" ? data : JSON.stringify(data));
    return reply;
  }

  /* ----------------------------- Typewriter Effect -----------------------------
     We add an AI placeholder message "MEC AI is typing..." then replace it with a typed string.
  --------------------------------------------------------------------------- */
  function startTypewriterEffect(fullText, onComplete) {
    // Ensure previous timer cleared
    if (typingRef.current.currentTimer) {
      clearTimeout(typingRef.current.currentTimer);
      typingRef.current.currentTimer = null;
    }
    // Create placeholder AI message with empty text
    const placeholder = { id: uid("ai"), role: "ai", text: "", ts: nowISO() };
    setMessages((prev) => [...prev, placeholder]);

    let i = 0;
    const speedBase = Math.max(8, Math.min(28, Math.round(fullText.length / 4))); // dynamic speed
    function step() {
      i++;
      const nextText = fullText.slice(0, i);
      // update last AI message (the placeholder) with nextText
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === placeholder.id);
        if (idx === -1) return prev;
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], text: nextText, ts: nowISO() };
        return copy;
      });
      if (i < fullText.length) {
        const jitter = Math.round(Math.random() * 12 - 6);
        typingRef.current.currentTimer = setTimeout(step, Math.max(6, speedBase + jitter));
      } else {
        typingRef.current.currentTimer = null;
        if (onComplete) onComplete();
      }
    }
    // small initial delay to feel natural
    typingRef.current.currentTimer = setTimeout(step, 200);
  }

  /* ----------------------------- Send handler (main flow) ----------------------------- */
  async function handleSend() {
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

    // quick UX delay
    await new Promise((r) => setTimeout(r, 250));

    // Command processing prioritized before LLM
    if (raw) {
      const cmd = detectCommand(raw);
      if (cmd === "play-number") {
        startNumberGame(1, 20);
        setProcessing(false);
        return;
      }
      if (cmd === "guess") {
        handleGuessNumber(raw);
        setProcessing(false);
        return;
      }
      if (cmd === "play-riddle") {
        startRiddle();
        setProcessing(false);
        return;
      }
      if (cmd === "solve") {
        handleSolve(raw);
        setProcessing(false);
        return;
      }
      if (cmd === "draw") {
        handleDraw(raw);
        setProcessing(false);
        return;
      }
      if (cmd === "homework") {
        // reused from earlier behavior
        const q = raw.replace(/^homework\s*/i, "").trim();
        if (!q) pushMessage("ai", "What homework question would you like help with? e.g., 'homework what is binary'");
        else {
          // if math inside, solve
          if (/-?\d+\s*[+\-*/x×÷]\s*-?\d+/.test(q) || /\bsolve\b/i.test(q)) {
            pushMessage("ai", `Homework: I'll help solve "${q}" step-by-step.`);
            handleSolve(q);
          } else {
            const kb = findKB(q);
            if (kb) pushMessage("ai", `Homework help — ${kb.a}\n\nDo you want an example or a step-by-step?`);
            else pushMessage("ai", `Homework helper — rephrasing: "${q}". I can explain simply and give an example.`);
          }
        }
        setProcessing(false);
        return;
      }
      if (cmd === "give-up") {
        if (session.games?.riddle?.active) {
          pushMessage("ai", `Answer: ${session.games.riddle.current.a}`);
          setSession((s) => ({ ...s, games: { ...(s.games || {}), riddle: { ...(s.games.riddle || {}), active: false } } }));
        } else pushMessage("ai", "No active puzzle to give up on.");
        setProcessing(false);
        return;
      }
      if (cmd === "guess") {
        handleGuessNumber(raw);
        setProcessing(false);
        return;
      }
    } else {
      // image only: simple reply
      pushMessage("ai", pick(["Nice picture 📷!", "That looks cool 😎.", "Thanks for sharing 🙌."]));
      setProcessing(false);
      return;
    }

    // 1. Local KB check
    if (raw) {
      const kb = findKB(raw);
      if (kb) {
        // typewriter effect for KB answers too (feels nice)
        startTypewriterEffect(kb.a);
        setProcessing(false);
        return;
      }
    }

    // 2. Safety check before sending anywhere online
    if (isUnsafe(raw)) {
      startTypewriterEffect("Let’s keep our chat about school, learning, or positive topics 😊.");
      setProcessing(false);
      return;
    }

    // 3. Online GPT path (OpenAI only)
    if (!allowOpenAI || !openAIKey) {
      // cannot reach an LLM: reply fallback
      startTypewriterEffect("I’m not sure about that yet, but I’ll learn it soon 😊.");
      setProcessing(false);
      return;
    }

    // show typing placeholder handled by typewriter
    setIsTyping(true);
    try {
      const reply = await callOpenAI(raw);
      // Use typewriter for the reply
      startTypewriterEffect(reply, () => {
        setIsTyping(false);
      });
    } catch (err) {
      console.warn("OpenAI call failed:", err);
      startTypewriterEffect("I’m not sure about that right now — the AI service is unavailable. Try again later.");
      setIsTyping(false);
    } finally {
      setProcessing(false);
    }
  } // end handleSend

  /* ----------------------------- Export / Reset ----------------------------- */
  function handleExport() {
    try {
      const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `mecai-conversation-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      alert("Export failed: " + e.message);
    }
  }
  function handleReset() {
    if (!window.confirm("Clear conversation and reset session?")) return;
    setMessages([]);
    setSession({ lastTopic: null, games: {} });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("mecai_session");
    // push fresh welcome
    pushWelcome();
  }

  function pushWelcome() {
    const last = session.lastTopic;
    if (last) pushMessage("ai", `Welcome back! Last time we talked about "${last}". Want to continue or try something new?`);
    else
      pushMessage(
        "ai",
        "Hello 👋 I'm MEC AI (Tutor). I can help with schoolwork, play games, draw ASCII art, solve math step-by-step, and more. Try: 'play number game', 'draw cat', 'solve 12+5', or 'homework <your question>'."
      );
  }

  /* ----------------------------- Keyboard handler ----------------------------- */
  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /* ----------------------------- Lifecycle ----------------------------- */
  useEffect(() => {
    if (!messages || messages.length === 0) {
      pushWelcome();
    }
    // cleanup typing timer on unmount
    return () => {
      if (typingRef.current.currentTimer) clearTimeout(typingRef.current.currentTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----------------------------- Render helpers ----------------------------- */
  function renderMessage(m) {
    const isAI = m.role === "ai";
    return (
      <div
        key={m.id}
        style={{
          ...S.rowBase,
          justifyContent: isAI ? "flex-start" : "flex-end",
        }}
      >
        {isAI && <div style={S.avatar("ai")}>M</div>}
        <article style={S.bubble(isAI ? "ai" : "user")}>
          <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
          {m.meta && m.meta.image && (
            <img src={m.meta.image} alt="upload" style={{ maxWidth: 420, borderRadius: 10, marginTop: 8, display: "block" }} />
          )}
          <div style={S.time}>{nowTimeString(m.ts)}</div>
        </article>
        {!isAI && <div style={S.avatar("user")}>Y</div>}
      </div>
    );
  }

  /* ----------------------------- UI ----------------------------- */
  return (
    <div style={S.page}>
      <div style={S.card} role="application" aria-label="MEC AI Tutor">
        <header style={S.header}>
          <div style={S.logoBox}>
            <img
              src="https://drive.google.com/uc?id=1VeIhTO9YeHkt7-gl8sxAiK1XNxZnr_y4"
              alt="MEC Logo"
              style={S.logoImg}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div style={S.titleBox}>
            <div style={S.title}>MEC AI</div>
            <div style={S.subtitle}>MEC Junior High — Your Smart Learning Buddy</div>
          </div>

          <div style={S.headerRight}>
            <button style={{ ...S.attachBtn }} onClick={() => handleExport()}>
              Export
            </button>
            <button style={{ ...S.attachBtn }} onClick={() => handleReset()}>
              Reset
            </button>
            {/* Settings compact */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: 13, color: THEME.muted }}>OpenAI</label>
              <input
                type="checkbox"
                checked={allowOpenAI}
                onChange={(e) => setAllowOpenAI(e.target.checked)}
                aria-label="Enable OpenAI"
                title="Allow online GPT (requires key below)"
              />
            </div>
          </div>
        </header>

        <main style={S.main}>
          <section style={S.left}>
            <div style={S.chatArea} ref={scrollRef} tabIndex={0} aria-live="polite">
              {messages.length ? messages.map(renderMessage) : null}
            </div>

            <div style={S.composerWrap}>
              <div style={S.composer}>
                <input ref={fileRef} type="file" accept="image/*" style={S.fileInput} onChange={handleFileChange} />
                <button style={S.attachBtn} onClick={() => handleAttachClick()}>
                  📎
                </button>

                <input
                  placeholder="Type a message (e.g., 'solve 12 + 5', 'play number game', 'homework photosynthesis')"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  style={S.textInput}
                />

                <button style={S.sendBtn} onClick={handleSend} aria-label="Send">
                  Send
                </button>
              </div>

              {preview && <img src={preview} alt="preview" style={S.previewImg} />}

              <div style={S.footerNote}>
                Privacy: This chat stores messages locally in your browser. Don’t enter sensitive personal info. MEC AI may make mistakes.
              </div>
            </div>
          </section>

          <aside style={S.rightPanel}>
            <div>
              <div style={S.label}>OpenAI API Key (paste here)</div>
              <input
                type="password"
                placeholder="sk-..."
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value.trim())}
                style={S.smallInput}
                aria-label="OpenAI API Key"
              />
              <div style={{ marginTop: 8, fontSize: 13, color: THEME.muted }}>
                Allow OpenAI toggle must be enabled to use the key. The key is kept in browser storage only.
              </div>
            </div>

            <div>
              <div style={S.label}>Personality</div>
              <div style={{ fontSize: 14 }}>
                <strong>Tutor</strong> — encouraging, educational tone for ages 10–15.
              </div>
            </div>

            <div>
              <div style={S.label}>Quick Tips</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Try: <code>solve 12 + 5</code></li>
                <li>Try: <code>play number game</code></li>
                <li>Try: <code>draw cat</code> for ASCII art</li>
                <li>Type <code>homework &lt;question&gt;</code> for guided help</li>
              </ul>
            </div>

            <div>
              <div style={S.label}>Teacher Controls</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  style={{ ...S.attachBtn, padding: "8px 12px" }}
                  onClick={() => {
                    setMessages([]);
                    pushWelcome();
                  }}
                >
                  Clear Chat
                </button>
                <button
                  style={{ ...S.attachBtn, padding: "8px 12px" }}
                  onClick={() => {
                    const txt = JSON.stringify(messages, null, 2).slice(0, 4000);
                    navigator.clipboard?.writeText(txt).then(() => alert("Preview copied to clipboard (truncated)."));
                  }}
                >
                  Copy Preview
                </button>
              </div>
            </div>

            <div>
              <div style={S.label}>About</div>
              <div style={{ fontSize: 13, color: THEME.muted }}>
                MEC AI Tutor — Hybrid local KB + OpenAI (online). Designed for classroom safety and clarity.
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );

  /* ----------------------------- End Component ----------------------------- */
}
