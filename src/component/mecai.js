// MecAiApp.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * MecAiApp — Single-file React component (inline CSS)
 * Hybrid behavior:
 *  - Local KB answers first
 *  - If no KB answer, attempt local LLM at configured host (no API key)
 *  - If local LLM fails and teacher provided OpenAI key, calls OpenAI GPT-4o-mini
 *  - Otherwise returns friendly fallback
 *
 * Storage: localStorage key "mecai_chat_history"
 *
 * UI: inline styles only
 */

export default function MecAiApp() {
  /* ----------------------------- Inline styles ----------------------------- */
  const COLORS = {
    bg: "#fffdf8",
    panel: "#fffaf3",
    accent: "#d4a017",
    accent2: "#c49a6c",
    aiBubble: "#fff6e6",
    userBubble: "#f6f5f3",
    muted: "#6b5b4a",
    text: "#241f1a",
  };

  const styles = {
    appWrap: {
      fontFamily:
        'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      minHeight: "100vh",
      background: COLORS.bg,
      color: COLORS.text,
      display: "flex",
      justifyContent: "center",
      padding: 18,
    },
    appCard: {
      maxWidth: 1100,
      width: "100%",
      height: "calc(100vh - 36px)",
      display: "flex",
      flexDirection: "column",
      borderRadius: 14,
      boxShadow: "0 18px 50px rgba(18,16,12,0.06)",
      overflow: "hidden",
      background: "#fff",
    },
    header: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      borderBottom: "1px solid rgba(0,0,0,0.04)",
      background: COLORS.panel,
    },
    logo: {
      width: 56,
      height: 56,
      borderRadius: 10,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
      flexShrink: 0,
    },
    logoText: {
      fontWeight: 800,
      color: COLORS.accent2,
      fontSize: 18,
    },
    brand: { marginLeft: 12 },
    title: { fontSize: "1.15rem", fontWeight: 700, color: COLORS.accent2 },
    subtitle: { fontSize: "0.85rem", color: COLORS.muted },
    topActions: { marginLeft: "auto", display: "flex", gap: 8 },
    btn: {
      border: "1px solid rgba(0,0,0,0.06)",
      background: "#fff",
      padding: "8px 10px",
      borderRadius: 8,
      cursor: "pointer",
      fontSize: "0.95rem",
      color: COLORS.text,
    },
    btnPrimary: {
      background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
      color: "#fff",
      border: 0,
      padding: "8px 12px",
      borderRadius: 8,
      cursor: "pointer",
    },
    main: { display: "flex", flex: 1, minHeight: 0 },
    chatPanel: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
    chatScroll: {
      flex: 1,
      overflow: "auto",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      background: "linear-gradient(180deg,#fffaf7,#fff)",
    },
    msgRowBase: { display: "flex", gap: 12, alignItems: "flex-end", maxWidth: "100%" },
    avatar: (role) => ({
      width: 40,
      height: 40,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      background:
        role === "ai"
          ? `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.accent2})`
          : "#efeae0",
      color: role === "ai" ? "#fff" : COLORS.text,
      flexShrink: 0,
    }),
    bubble: (role) => ({
      maxWidth: "78%",
      padding: "12px 14px",
      borderRadius: 12,
      lineHeight: 1.45,
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
      boxShadow: "0 1px 0 rgba(12,10,8,0.02)",
      background: role === "ai" ? COLORS.aiBubble : COLORS.userBubble,
      borderLeft: role === "ai" ? `4px solid ${COLORS.accent2}` : undefined,
      borderRight: role === "user" ? "3px solid rgba(0,0,0,0.03)" : undefined,
    }),
    time: { fontSize: "0.75rem", color: COLORS.muted, marginTop: 8 },
    inputArea: { borderTop: "1px solid #f2ebe1", padding: 12, background: "#fff" },
    composer: { display: "flex", gap: 8, alignItems: "center" },
    textInput: {
      flex: 1,
      padding: 12,
      borderRadius: 12,
      border: "1px solid #efe6dc",
      background: "#fff",
      fontSize: "1rem",
      outline: "none",
    },
    imgPreview: {
      maxWidth: 220,
      borderRadius: 10,
      marginTop: 8,
      border: "1px solid #efe6dc",
      display: "block",
    },
    muted: { color: COLORS.muted, fontSize: "0.85rem", marginTop: 8 },
    settingsPanel: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginLeft: 12,
      paddingLeft: 8,
      borderLeft: "1px dashed rgba(0,0,0,0.04)",
    },
    smallInput: {
      padding: 8,
      borderRadius: 8,
      border: "1px solid #efe6dc",
      fontSize: 14,
      width: 220,
    },
    label: { fontSize: 13, color: COLORS.muted, marginRight: 8 },
    exportBtn: { ...this?.btn, marginLeft: 8 },
  };

  /* ----------------------------- Utilities ----------------------------- */
  function uid(prefix = "m") {
    return prefix + "-" + Math.random().toString(36).slice(2, 9);
  }
  function nowISO() {
    return new Date().toISOString();
  }
  function normalize(s) {
    return (s || "").toString().toLowerCase().trim();
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ----------------------------- Local Storage Keys ----------------------------- */
  const STORAGE_KEY = "mecai_chat_history";
  const SESSION_KEY = "mecai_session"; // stores lastTopic + games + settings optional

  /* ----------------------------- Knowledge Base ----------------------------- */
  // (Copied from your mecai.html KB — truncated comments removed for brevity)
  const KB = [
    { id: "kb-001", question: "hello", answer: "Hello 👋! Nice to see you — how can I help today?" },
    { id: "kb-002", question: "hi", answer: "Hi there! 😊 What would you like to chat about?" },
    { id: "kb-003", question: "good morning", answer: "Good morning! ☀️ Hope you have a lovely day." },
    { id: "kb-004", question: "good afternoon", answer: "Good afternoon! 🌤️ How's your day going so far?" },
    { id: "kb-005", question: "good evening", answer: "Good evening 🌙. Time to relax and unwind." },
    { id: "kb-006", question: "how are you", answer: "I’m doing well, thanks! Ready to help — how are you?" },
    { id: "kb-007", question: "what's your name", answer: "I’m MEC AI — your friendly daycare & learning assistant 🤖" },
    { id: "kb-008", question: "thank you", answer: "You’re very welcome! Always happy to help 🙌" },
    { id: "kb-009", question: "you're welcome", answer: "Anytime! 😊" },
    { id: "kb-010", question: "bye", answer: "Goodbye! 👋 Come back anytime." },
    { id: "kb-041", question: "html", answer: "HTML is the skeleton of a webpage — it structures the content 📄." },
    { id: "kb-042", question: "what is html", answer: "HTML (HyperText Markup Language) structures content on the web." },
    { id: "kb-043", question: "css", answer: "CSS styles the webpage — think of it as clothing and colors for content 🎨." },
    { id: "kb-044", question: "what is css", answer: "CSS (Cascading Style Sheets) controls how elements look on a page." },
    { id: "kb-045", question: "javascript", answer: "JavaScript makes webpages interactive and dynamic 🚀." },
    { id: "kb-046", question: "what is javascript", answer: "JavaScript is a programming language that adds behavior to websites." },
    { id: "kb-066", question: "ghana", answer: "Ghana is a West African country 🇬🇭 known for culture, cocoa, and music." },
    { id: "kb-067", question: "capital of ghana", answer: "Accra is the capital city of Ghana — lively and coastal 🏙️." },
    { id: "kb-068", question: "kwame nkrumah", answer: "Kwame Nkrumah was Ghana’s first president and a leader of independence." },
    { id: "kb-069", question: "ghana independence", answer: "Ghana gained independence on March 6, 1957 — a historic day." },
    { id: "kb-031", question: "tell me a joke", answer: "Why did the computer get cold? It left its Windows open! 😂" },
    { id: "kb-032", question: "tell me a riddle", answer: "Riddle: I have keys but no locks. What am I? — A piano 🎹" },
    { id: "kb-035", question: "say a proverb", answer: "Proverb: 'If you want to go fast, go alone. If you want to go far, go together.'" },
    { id: "kb-051", question: "math help", answer: "Tell me the math question and I’ll help step by step — we can solve it together." },
    { id: "kb-053", question: "homework", answer: "Type 'homework' followed by your question and I'll guide you through it." },
    { id: "kb-061", question: "discipline", answer: "Discipline builds good habits and shows respect to others." },
    { id: "kb-063", question: "teamwork", answer: "Teamwork helps everyone achieve more together." },
    // ... (include rest of the KB from the HTML file if desired)
  ];

  const FALLBACKS = [
    "Hmm 🤔 I’m not sure about that yet.",
    "That’s interesting! Can you ask me about school or computing?",
    "I’ll learn about that soon 😊.",
    "Not sure, but let’s try a riddle or a fun fact!",
    "I really want to learn that too.",
  ];
  const IMAGE_REPLIES = [
    "Nice picture 📷!",
    "That is nice. Would you need any edit?",
    "That looks cool 😎.",
    "Thanks for sharing 🙌.",
    "Lovely photo — thanks for showing me!",
  ];

  const ASCII = {
    cat: " /\\_/\\\n( o.o )\n > ^ <",
    tree: "   /\\\n  /  \\\n /____\\\n   ||\n   ||",
    house:
      "   /\\\n  /  \\\n /____\\\n | _  |\n ||_| |\n |____|",
    rocket:
      "   /\\\n  /  \\\n /____\\\n |    |\n/|----|\\\n  /\\\n  \\/",
  };

  /* ----------------------------- State & refs ----------------------------- */
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [sessionState, setSessionState] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw
        ? JSON.parse(raw)
        : { lastTopic: null, games: {}, settings: { useLocalLLM: true, localHost: "http://localhost:11434", allowOpenAI: false, openAIKey: "" } };
    } catch (e) {
      return { lastTopic: null, games: {}, settings: { useLocalLLM: true, localHost: "http://localhost:11434", allowOpenAI: false, openAIKey: "" } };
    }
  });

  const [inputText, setInputText] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");
  const fileRef = useRef(null);
  const scrollRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    // auto-scroll when messages change
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 60);
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionState));
  }, [sessionState]);

  /* ----------------------------- Helpers ----------------------------- */

  function pushMessage(role, text, meta = {}) {
    const msg = { id: uid("m"), role, text: text || "", meta, ts: nowISO() };
    setMessages((m) => [...m, msg]);
    return msg;
  }

  function saveSessionUpdater(updater) {
    setSessionState((s) => {
      const next = typeof updater === "function" ? updater(s) : { ...s, ...updater };
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      return next;
    });
  }

  function findKBEntryForQuery(text) {
    if (!text) return null;
    let q = normalize(text);
    if (!q) return null;

    q = q.replace(/^(what is|who is|tell me about|explain|define|what's|what are|what's the)\s+/i, "").trim();
    if (!q) return null;

    let best = null;
    for (const entry of KB) {
      const key = normalize(entry.question);
      if (!key || key.length < 3) continue;
      const regex = new RegExp("\\b" + key.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&") + "\\b");
      if (regex.test(q) || q.includes(key)) {
        if (!best) best = entry;
        else if (key.length > normalize(best.question).length) best = entry;
      }
    }
    return best;
  }

  function isCommand(text) {
    if (!text) return null;
    const t = normalize(text);
    if (t.startsWith("solve ") || t.startsWith("calculate ") || /-?\d+\s*[+\-*/x×÷]\s*-?\d+/.test(t)) return "solve";
    if (t.startsWith("play number") || t === "play number game") return "play-number";
    if (t.startsWith("play riddle") || t === "play riddle game") return "play-riddle";
    if (t.startsWith("draw ") || t.startsWith("ascii ")) return "draw";
    if (t.startsWith("homework") || t.startsWith("hw ") || t.startsWith("help with")) return "homework";
    if (t.startsWith("guess ") || (/^\s*-?\d+\s*$/.test(t) && sessionState.games && sessionState.games.number && sessionState.games.number.active)) return "guess";
    if (t === "give up") return "give-up";
    return null;
  }

  /* ----------------------------- Games & Helpers (copied & adapted) ----------------------------- */

  function startNumberGame(min = 1, max = 20) {
    const secret = Math.floor(Math.random() * (max - min + 1)) + min;
    const games = { ...(sessionState.games || {}) };
    games.number = { active: true, secret, min, max, attempts: 0 };
    saveSessionUpdater({ ...sessionState, games });
    pushMessage("ai", `I picked a number between ${min} and ${max}. Try to guess it! (type a number or 'guess X')`);
  }

  function handleNumberGuess(input) {
    const g = sessionState.games && sessionState.games.number;
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
    const games = { ...(sessionState.games || {}), number: g };
    saveSessionUpdater({ ...sessionState, games });
    if (num === g.secret) {
      pushMessage("ai", `🎉 Correct! The number was ${g.secret}. You guessed it in ${g.attempts} attempts. Want to play again? Type 'play number game'.`);
      g.active = false;
      saveSessionUpdater({ ...sessionState, games });
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
    const games = { ...(sessionState.games || {}), riddle: { active: true, current: r } };
    saveSessionUpdater({ ...sessionState, games });
    pushMessage("ai", `Riddle: ${r.q} (Type your answer)`);
  }

  function checkRiddleAnswer(ans) {
    const s = sessionState.games && sessionState.games.riddle;
    if (!s || !s.active) {
      pushMessage("ai", "No active riddle. Type 'play riddle game' to start.");
      return;
    }
    const correct = normalize(s.current.a);
    if (normalize(ans).includes(correct) || correct.includes(normalize(ans))) {
      pushMessage("ai", `Correct! ✅ Answer: ${s.current.a}`);
      s.active = false;
      saveSessionUpdater({ ...sessionState, games: { ...(sessionState.games || {}), riddle: s } });
    } else {
      pushMessage("ai", "Not quite — try again or type 'give up' to see the answer.");
    }
  }

  function handleDraw(command) {
    const t = normalize(command).replace(":", " ");
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

  /* ----------------------------- Math solver ----------------------------- */
  function solveExpressionRaw(expr) {
    const s = expr.replace(/×/g, "*").replace(/x\b/gi, "*").replace(/÷/g, "/");
    const m = s.match(/(-?\d+)\s*([+\-*/])\s*(-?\d+)/);
    if (!m) return null;
    const a = parseInt(m[1], 10);
    const op = m[2];
    const b = parseInt(m[3], 10);
    let result,
      steps = [];
    if (op === "+") {
      result = a + b;
      steps.push(`${a} + ${b} = ${result} (added)`);
    } else if (op === "-") {
      result = a - b;
      steps.push(`${a} - ${b} = ${result} (subtracted)`);
    } else if (op === "*") {
      result = a * b;
      steps.push(`${a} × ${b} = ${result} (multiplied)`);
    } else if (op === "/") {
      if (b === 0) {
        steps.push("Division by zero is undefined.");
        result = null;
      } else {
        const q = Math.floor(a / b);
        const r = a % b;
        result = a / b;
        steps.push(`${a} ÷ ${b} = ${q} remainder ${r}.`);
      }
    }
    return { a, op, b, result, steps };
  }

  function handleSolve(command) {
    let expr = command;
    const t = normalize(command);
    if (t.startsWith("solve ")) expr = command.slice(6).trim();
    else if (t.startsWith("calculate ")) expr = command.slice(10).trim();
    else {
      const found = expr.match(/-?\d+\s*[+\-*/x×÷]\s*-?\d+/);
      if (found) expr = found[0];
    }
    const res = solveExpressionRaw(expr);
    if (!res) {
      pushMessage("ai", "I couldn't parse that expression. Try 'solve 12 + 5' or 'solve 7*8'.");
      return;
    }
    pushMessage(
      "ai",
      `Let's solve: ${res.a} ${res.op} ${res.b}\n\nStep-by-step:\n- ${res.steps.join("\n- ")}\n\nAnswer: ${res.result}`
    );
  }

  /* ----------------------------- Homework helper ----------------------------- */
  function handleHomework(command) {
    const lower = normalize(command);
    let question = command;
    if (lower.startsWith("homework")) question = command.slice(8).trim();
    else if (lower.startsWith("hw ")) question = command.slice(3).trim();
    else if (lower.startsWith("help with")) question = command.slice(9).trim();
    if (!question) {
      pushMessage("ai", "What homework question would you like help with? e.g. 'homework what is binary'");
      return;
    }
    if (/-?\d+\s*[+\-*/x×÷]\s*-?\d+/.test(question) || /\bsolve\b/i.test(question)) {
      pushMessage("ai", `Homework: I'll help solve "${question}" step-by-step.`);
      handleSolve(question);
      pushMessage("ai", "Now try a similar one and tell me your answer — I'll check it.");
      return;
    }
    const kb = findKBEntryForQuery(question);
    if (kb) {
      pushMessage("ai", `Homework help — ${kb.answer}\n\nDo you want an example or a step-by-step?`);
      return;
    }
    pushMessage("ai", `Homework helper — rephrasing: "${question}".\nExplanation: I'll explain simply and give an example. Tell me which part to start with.`);
  }

  /* ----------------------------- Image handling ----------------------------- */
  function onAttachClick() {
    if (fileRef.current) fileRef.current.click();
  }

  function onFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Only image files are supported for preview.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewSrc(ev.target.result);
    };
    reader.readAsDataURL(f);
  }

  /* ----------------------------- Safety filter ----------------------------- */
  // Basic blocklist + pattern checks. Expand as needed.
  const SAFETY_PATTERNS = [
    /sex|porn|sexual|nsfw|explicit/i,
    /kill|murder|bomb|explode|shoot|suicide|self[-\s]*harm/i,
    /address|phone|social security|ssn|password|credit card|bank account/i,
    /date me|marry me|i love you/i,
    /hack(ed|ing)?|break into|crack password/i,
  ];

  function isUnsafe(text) {
    if (!text) return false;
    for (const p of SAFETY_PATTERNS) {
      if (p.test(text)) return true;
    }
    // also block direct insults strongly
    if (/\bfuck\b|\bshit\b|\bbitch\b/i.test(text)) return true;
    return false;
  }

  /* ----------------------------- Local LLM & OpenAI callers ----------------------------- */

  async function callLocalLLM(prompt, host) {
    // host e.g. http://localhost:11434 or http://teacher-pc:5000
    // Attempt a POST with a simple body — the local server should accept and return { response: "..." } or plain text
    try {
      const res = await fetch(host.replace(/\/$/, "") + "/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("local llm not ok");
      const data = await res.json();
      // support different shapes
      if (typeof data === "string") return data;
      if (data.response) return data.response;
      if (data.output) return data.output;
      if (data.choices && data.choices[0] && data.choices[0].text) return data.choices[0].text;
      return JSON.stringify(data);
    } catch (e) {
      console.warn("Local LLM error:", e);
      throw e;
    }
  }

  async function callOpenAI(prompt, key) {
    // Only call when teacher provides the key (optional)
    if (!key) throw new Error("No OpenAI key provided");
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 600,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "OpenAI error");
      }
      const data = await res.json();
      // best effort: find assistant reply text
      const msg = data.choices && data.choices[0] && (data.choices[0].message?.content || data.choices[0].text);
      return msg || JSON.stringify(data);
    } catch (e) {
      console.warn("OpenAI error:", e);
      throw e;
    }
  }

  /* ----------------------------- Main send flow ----------------------------- */

  async function handleSend() {
    if (isProcessing) return;
    const raw = inputText || "";
    const text = raw.trim();
    const hasPreview = previewSrc && previewSrc.length > 0;
    if (!text && !hasPreview) return;

    // Add user's message
    if (text) pushMessage("user", text);
    if (hasPreview) {
      pushMessage("user", "[image]", { image: previewSrc, alt: "User uploaded image" });
      setPreviewSrc("");
      if (fileRef.current) fileRef.current.value = "";
    }

    // update lastTopic if text matches KB
    if (text) {
      const maybeTopic = findKBEntryForQuery(text);
      if (maybeTopic) {
        saveSessionUpdater((s) => ({ ...s, lastTopic: maybeTopic.question }));
      }
    }

    // clear input
    setInputText("");
    // now produce reply
    setIsProcessing(true);

    // short delay for UX
    await new Promise((r) => setTimeout(r, 360));

    // handle commands & local features
    if (text) {
      const cmd = isCommand(text);
      if (cmd === "play-number") {
        startNumberGame(1, 20);
        setIsProcessing(false);
        return;
      }
      if (cmd === "guess") {
        const rest = text.replace(/guess\s+/i, "").trim();
        handleNumberGuess(rest);
        setIsProcessing(false);
        return;
      }
      if (cmd === "play-riddle") {
        startRiddle();
        setIsProcessing(false);
        return;
      }
      if (cmd === "draw") {
        handleDraw(text);
        setIsProcessing(false);
        return;
      }
      if (cmd === "solve") {
        handleSolve(text);
        setIsProcessing(false);
        return;
      }
      if (cmd === "homework") {
        handleHomework(text);
        setIsProcessing(false);
        return;
      }
      if (cmd === "give-up") {
        if (sessionState.games && sessionState.games.riddle && sessionState.games.riddle.active) {
          pushMessage("ai", `Answer: ${sessionState.games.riddle.current.a}`);
          const games = { ...(sessionState.games || {}), riddle: { ...(sessionState.games.riddle || {}), active: false } };
          saveSessionUpdater({ ...sessionState, games });
        }
        setIsProcessing(false);
        return;
      }
      // if active riddle expecting an answer
      if (sessionState.games && sessionState.games.riddle && sessionState.games.riddle.active) {
        checkRiddleAnswer(text);
        setIsProcessing(false);
        return;
      }
      // if number game active and user typed a plain number
      if (sessionState.games && sessionState.games.number && sessionState.games.number.active && /^\s*-?\d+\s*$/.test(text)) {
        handleNumberGuess(text.trim());
        setIsProcessing(false);
        return;
      }

      // local KB match
      const kb = findKBEntryForQuery(text);
      if (kb) {
        pushMessage("ai", kb.answer + pick(["", " 😊", " — hope that helps!"]));
        setIsProcessing(false);
        return;
      }
    } else {
      // only image sent
      pushMessage("ai", pick(IMAGE_REPLIES));
      setIsProcessing(false);
      return;
    }

    // If we get here: no local KB, not a local command -> attempt LLM(s)
    // Safety filter first
    if (isUnsafe(text)) {
      pushMessage("ai", "Let’s keep our chat about school, learning, or positive topics 😊.");
      setIsProcessing(false);
      return;
    }

    // show typing indicator
    setIsTyping(true);
    pushMessage("ai", "MEC AI is thinking...");

    let answered = false;

    // Attempt local LLM if enabled
    if (sessionState.settings?.useLocalLLM) {
      const host = sessionState.settings.localHost || "http://localhost:11434";
      try {
        const reply = await callLocalLLM(text, host);
        // remove the "thinking..." placeholder (the last AI message)
        setMessages((m) => {
          const withoutThinking = m.filter((x) => !(x.role === "ai" && x.text === "MEC AI is thinking..."));
          return [...withoutThinking, { id: uid("m"), role: "ai", text: reply, ts: nowISO() }];
        });
        answered = true;
      } catch (e) {
        // local LLM not reachable — continue to OpenAI (if allowed)
        setMessages((m) => m.filter((x) => !(x.role === "ai" && x.text === "MEC AI is thinking...")));
      }
    }

    // If not answered and teacher allowed OpenAI and provided key, call it
    if (!answered && sessionState.settings?.allowOpenAI && sessionState.settings.openAIKey) {
      try {
        // show a small delay
        await new Promise((r) => setTimeout(r, 350));
        const reply = await callOpenAI(text, sessionState.settings.openAIKey);
        setMessages((m) => [...m, { id: uid("m"), role: "ai", text: reply, ts: nowISO() }]);
        answered = true;
      } catch (e) {
        // OpenAI failed
        console.warn("OpenAI failed:", e);
      }
    }

    // Final fallback
    if (!answered) {
      pushMessage("ai", "I’m not sure about that yet, but I’ll learn it soon 😊.");
    }

    setIsTyping(false);
    setIsProcessing(false);
  } // end handleSend

  /* ----------------------------- Export & Reset ----------------------------- */

  function handleExport() {
    try {
      const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "mecai-conversation-" + new Date().toISOString().slice(0, 10) + ".json";
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
    const s = { lastTopic: null, games: {}, settings: sessionState.settings || { useLocalLLM: true, localHost: "http://localhost:11434", allowOpenAI: false, openAIKey: "" } };
    setSessionState(s);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
    pushWelcome(s);
  }

  function pushWelcome(s = sessionState) {
    if (s && s.lastTopic) {
      pushMessage("ai", `Welcome back! Last time we talked about "${s.lastTopic}". Want to continue or try something new?`);
    } else {
      pushMessage(
        "ai",
        "Hello 👋 I'm MEC AI. I can help with schoolwork, play games, draw ASCII art, solve math step-by-step, and more. Try: 'play number game', 'draw cat', 'solve 12+5', or 'homework <your question>'."
      );
    }
  }

  /* ----------------------------- Init on mount ----------------------------- */
  useEffect(() => {
    if (!messages || messages.length === 0) {
      pushWelcome();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----------------------------- UI render helpers ----------------------------- */

  function renderMessage(m) {
    const role = m.role;
    const isAI = role === "ai";
    const avatarLetter = isAI ? "M" : "Y";
    return (
      <div
        key={m.id}
        style={{
          ...styles.msgRowBase,
          justifyContent: isAI ? "flex-start" : "flex-end",
        }}
      >
        {isAI && <div style={styles.avatar("ai")}>{avatarLetter}</div>}
        <article style={styles.bubble(role)}>
          <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
          {m.meta && m.meta.image && (
            <img src={m.meta.image} alt={m.meta.alt || "Image"} style={{ maxWidth: 420, borderRadius: 10, marginTop: 8, display: "block" }} />
          )}
          <div style={styles.time}>{new Date(m.ts || nowISO()).toLocaleTimeString()}</div>
        </article>
        {!isAI && <div style={styles.avatar("user")}>{avatarLetter}</div>}
      </div>
    );
  }

  /* ----------------------------- Settings UI handlers ----------------------------- */
  function toggleLocalLLM() {
    saveSessionUpdater((s) => ({ ...s, settings: { ...(s.settings || {}), useLocalLLM: !(s.settings?.useLocalLLM) } }));
  }
  function toggleAllowOpenAI() {
    saveSessionUpdater((s) => ({ ...s, settings: { ...(s.settings || {}), allowOpenAI: !(s.settings?.allowOpenAI) } }));
  }
  function updateLocalHost(val) {
    saveSessionUpdater((s) => ({ ...s, settings: { ...(s.settings || {}), localHost: val } }));
  }
  function updateOpenAIKey(val) {
    saveSessionUpdater((s) => ({ ...s, settings: { ...(s.settings || {}), openAIKey: val } }));
  }

  /* ----------------------------- keyboard handler ----------------------------- */
  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /* ----------------------------- component UI ----------------------------- */
  return (
    <div style={styles.appWrap}>
      <div style={styles.appCard} role="application" aria-label="MEC AI chat application">
        <header style={styles.header}>
          <div style={styles.logo} aria-hidden>
            {/* Keep your MEC logo URL if available; fallback to initials */}
            <img
              src="https://drive.google.com/uc?id=1VeIhTO9YeHkt7-gl8sxAiK1XNxZnr_y4"
              alt="MEC Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div style={{ display: "none", ...styles.logoText }}>MEC</div>
          </div>

          <div style={styles.brand}>
            <div style={styles.title}>MEC AI</div>
            <div style={styles.subtitle}>MEC Junior High — Your Smart Learning Buddy</div>
          </div>

          <div style={styles.topActions} role="toolbar" aria-label="Top actions">
            <button style={styles.btn} onClick={handleExport} aria-label="Export conversation">
              Export Chat
            </button>
            <button style={styles.btn} onClick={handleReset} aria-label="Reset conversation">
              Reset Chat
            </button>

            {/* Settings inline */}
            <div style={styles.settingsPanel} title="Teacher settings">
              <label style={styles.label}>Local LLM</label>
              <input
                type="checkbox"
                checked={!!sessionState.settings?.useLocalLLM}
                onChange={toggleLocalLLM}
                aria-label="Use local LLM"
              />
              <input
                style={{ ...styles.smallInput, marginLeft: 8 }}
                value={sessionState.settings?.localHost || "http://localhost:11434"}
                onChange={(e) => updateLocalHost(e.target.value)}
                placeholder="Local LLM host"
                aria-label="Local LLM host"
              />
              <label style={{ ...styles.label, marginLeft: 8 }}>Allow OpenAI</label>
              <input type="checkbox" checked={!!sessionState.settings?.allowOpenAI} onChange={toggleAllowOpenAI} aria-label="Allow OpenAI" />
              {sessionState.settings?.allowOpenAI && (
                <input
                  style={{ ...styles.smallInput, marginLeft: 8 }}
                  value={sessionState.settings?.openAIKey || ""}
                  onChange={(e) => updateOpenAIKey(e.target.value)}
                  placeholder="Paste OpenAI key (optional)"
                  aria-label="OpenAI API Key"
                />
              )}
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <section style={styles.chatPanel} aria-label="Chat panel">
            <div id="chatScroll" style={styles.chatScroll} ref={scrollRef} tabIndex={0} aria-live="polite" aria-atomic="false">
              {messages && messages.length ? messages.map(renderMessage) : null}
            </div>

            <div style={styles.inputArea} role="region" aria-label="Message composer">
              <div style={styles.composer} role="group" aria-label="Composer controls">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onFileChange}
                />
                <button style={styles.btn} onClick={onAttachClick} title="Attach image" aria-label="Attach image">
                  📎
                </button>

                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type a message or command (e.g. 'play number game', 'draw cat', 'solve 12+5', 'homework ...')"
                  aria-label="Message input"
                  style={styles.textInput}
                />

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button style={styles.btnPrimary} onClick={handleSend} aria-label="Send message">
                    Send
                  </button>
                </div>
              </div>

              {previewSrc && <img id="previewImg" src={previewSrc} alt="Image preview" style={styles.imgPreview} />}

              <div style={styles.muted}>
                Privacy: This chat runs in your browser. Don’t enter sensitive personal info. MEC AI can make mistakes.
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
