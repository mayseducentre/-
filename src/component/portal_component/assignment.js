import React, { useEffect, useRef, useState } from "react";

export default function WordLearningApp({
  passcode = "1234",
  storageKey = "word_learning_app_v1",
}) {
  // --------------------
  // Helper functions
  // --------------------
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function mapFontSizeToCommand(sz) {
    if (sz <= 10) return "1";
    if (sz <= 12) return "2";
    if (sz <= 14) return "3";
    if (sz <= 16) return "4";
    if (sz <= 18) return "5";
    if (sz <= 24) return "6";
    return "7";
  }

  // --------------------
  // Static banks
  // --------------------
  const mcqBank = [
    { id: "mq1", q: "Keyboard shortcut for Bold?", choices: ["Ctrl + B", "Ctrl + I", "Ctrl + U", "Ctrl + S"], a: 0, explain: "Ctrl + B toggles bold." },
    { id: "mq2", q: "Page Orientation is in?", choices: ["Home", "Insert", "Layout / Page Layout", "References"], a: 2, explain: "Layout (Page Layout) tab." },
    { id: "mq3", q: "Which feature creates bullets?", choices: ["Insert Table", "Bullets", "Track Changes", "Header & Footer"], a: 1, explain: "Bullets toggles bullet list." },
  ];

  const fillBlankBank = [
    { id: "fb1", q: "The main workspace in Word is called the _____.", a: "Document" },
    { id: "fb2", q: "To save a file press Ctrl + _____.", a: "S" },
  ];

  const matchPairs = [
    { id: "m1", left: "Ribbon", right: "Contains tabs and groups" },
    { id: "m2", left: "Status Bar", right: "Shows page and word count" },
    { id: "m3", left: "Font", right: "Text style/appearance" },
  ];

  const assignmentList = [
    { id: 1, title: "What is Microsoft Word?", prompt: "Define Microsoft Word and list three uses." },
    { id: 2, title: "Formatting steps", prompt: "Explain how to make text bold, italic, and underlined." },
    { id: 3, title: "Alignment", prompt: "Describe how to align text left, center, and justify." },
    { id: 4, title: "Short paragraph", prompt: "Write a paragraph about your favourite subject and format it." },
    { id: 5, title: "Toolbar sketch", prompt: "Draw & label the toolbar showing Bold, Italic, Underline, Alignment, Bullets." },
  ];

  // --------------------
  // State
  // --------------------
  const [codeInput, setCodeInput] = useState("");
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey + "_unlocked")) || false;
    } catch { return false; }
  });

  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey + "_theme") || "light");
  const editorRef = useRef(null);
  const [editorHTML, setEditorHTML] = useState(() => localStorage.getItem(storageKey + "_editorHTML") || `<h2>Your practice document</h2><p>Type here and use the toolbar to learn MS Word features.</p>`);
  const [title, setTitle] = useState(() => localStorage.getItem(storageKey + "_docTitle") || "My Document");
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem(storageKey + "_fontSize")) || 16);

  const [xp, setXp] = useState(() => Number(localStorage.getItem(storageKey + "_xp")) || 0);
  const [badges, setBadges] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey + "_badges")) || []; } catch { return []; }
  });

  const [tracker, setTracker] = useState(() => {
    const raw = localStorage.getItem(storageKey + "_tracker");
    return raw ? JSON.parse(raw) : assignmentList.map((a) => ({ id: a.id, status: "Not Done" }));
  });

  const [mcqQuestions, setMcqQuestions] = useState(() => shuffleArray(mcqBank));
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqAnswer, setMcqAnswer] = useState(null);
  const [mcqFeedback, setMcqFeedback] = useState(null);

  const [fillBlanks, setFillBlanks] = useState(() => fillBlankBank.map(f => ({ ...f, user: "" })));
  const [fillFeedback, setFillFeedback] = useState(null);

  const [challengeActive, setChallengeActive] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState(0);
  const challengeDuration = 20;

  // Persist localStorage
  useEffect(() => {
    localStorage.setItem(storageKey + "_editorHTML", editorHTML);
    localStorage.setItem(storageKey + "_docTitle", title);
    localStorage.setItem(storageKey + "_fontSize", String(fontSize));
    localStorage.setItem(storageKey + "_xp", String(xp));
    localStorage.setItem(storageKey + "_badges", JSON.stringify(badges));
    localStorage.setItem(storageKey + "_tracker", JSON.stringify(tracker));
    localStorage.setItem(storageKey + "_theme", theme);
    localStorage.setItem(storageKey + "_unlocked", JSON.stringify(unlocked));
  }, [editorHTML, title, fontSize, xp, badges, tracker, theme, unlocked, storageKey]);

  useEffect(() => {
    if (!challengeActive) { setChallengeTimer(0); return; }
    setChallengeTimer(challengeDuration);
    const id = setInterval(() => {
      setChallengeTimer(t => {
        if (t <= 1) { clearInterval(id); setChallengeActive(false); awardXp(5); awardBadge("Challenge Completed"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [challengeActive]);

  // --------------------
  // Utilities
  // --------------------
  function awardXp(amount) { setXp(prev => prev + amount); }
  function awardBadge(name) { setBadges(prev => prev.includes(name) ? prev : [...prev, name]); }
  function exec(cmd, value = null) { if (!editorRef.current) return; editorRef.current.focus(); document.execCommand(cmd, false, value); setTimeout(() => setEditorHTML(editorRef.current.innerHTML), 50); }

  function handleUnlockSubmit(e) {
    e && e.preventDefault();
    if (codeInput.trim() === passcode) { setUnlocked(true); localStorage.setItem(storageKey + "_unlocked", JSON.stringify(true)); awardXp(10); awardBadge("Unlocked"); }
    else alert("Incorrect passcode. Ask your teacher.");
  }

  function submitMcqAnswer(i) {
    const q = mcqQuestions[mcqIndex];
    setMcqAnswer(i);
    if (i === q.a) { setMcqFeedback({ correct: true, explain: q.explain }); awardXp(5);
      setTimeout(() => { if (mcqIndex < mcqQuestions.length - 1) { setMcqIndex(mcqIndex + 1); setMcqAnswer(null); setMcqFeedback(null); } else awardBadge("MCQ Master"); }, 800);
    } else setMcqFeedback({ correct: false, explain: q.explain });
  }

  function submitFillBlanks() {
    const results = fillBlanks.map(f => ({ ok: f.user.trim().toLowerCase() === String(f.a).trim().toLowerCase() }));
    const correct = results.filter(r => r.ok).length;
    setFillFeedback({ correct, total: results.length });
    awardXp(correct * 3);
    if (correct === results.length) awardBadge("Fill-in Champ");
  }

  function setTrackerStatus(id, status) { setTracker(prev => prev.map(t => t.id === id ? { ...t, status } : t)); if (status === "Done") { awardXp(5); awardBadge("Assignment Done"); } }

  function startChallenge() { setChallengeActive(true); setChallengeTimer(challengeDuration); }

  function downloadHTML() { 
    const blob = new Blob([`<html><body>${editorRef.current?.innerHTML || ""}</body></html>`], { type: "text/html" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "demo-document.html"; a.click(); URL.revokeObjectURL(url); awardXp(2);
  }

  // --------------------
  // Styles
  // --------------------
  const styles = {
    app: { fontFamily: "'Inter', sans-serif", background: theme === "dark" ? "#0b1220" : "#f5f7fb", color: theme === "dark" ? "#e6eef8" : "#0f172a", minHeight: "100vh", padding: 20 },
    card: { padding: 16, borderRadius: 12, background: theme === "dark" ? "#07101a" : "#fff", boxShadow: "0 6px 18px rgba(14, 30, 37, 0.06)", border: "1px solid #e2e8f0", marginBottom: 12 },
    input: { padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db" },
    primaryBtn: { padding: "9px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700 },
    ghostBtn: { padding: "8px 10px", background: "transparent", border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer" },
    toolbarWrap: { padding: 8, borderRadius: 10, background: theme === "dark" ? "#071225" : "#f8fafc", marginBottom: 8 },
    toolbarBtn: { padding: "6px 10px", borderRadius: 6, border: "1px solid #e6edf3", background: "#fff", cursor: "pointer", fontWeight: 700 },
    select: { padding: "6px 10px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" },
    choiceBtn: { display: "block", width: "100%", textAlign: "left", padding: "6px 10px", borderRadius: 6, border: "1px solid #e6eef8", background: "#fff", cursor: "pointer", marginBottom: 4 }
  };

  // --------------------
  // Render
  // --------------------
  if (!unlocked) return (
    <div style={styles.app}>
      <div style={styles.card}>
        <h2>Student Assignment — MS Word Learning</h2>
        <form onSubmit={handleUnlockSubmit} style={{ display: "flex", gap: 8 }}>
          <input value={codeInput} onChange={(e) => setCodeInput(e.target.value)} type="password" placeholder="Passcode" style={styles.input} />
          <button type="submit" style={styles.primaryBtn}>Unlock</button>
        </form>
        <p>Default passcode: <code>{passcode}</code></p>
      </div>
    </div>
  );

  return (
    <div style={styles.app}>
      {/* Toolbar + editor */}
      <div style={styles.card}>
        <h3>Interactive MS Word Demo</h3>
        <div style={styles.toolbarWrap}>
          <button style={styles.toolbarBtn} onClick={() => exec("bold")}>B</button>
          <button style={styles.toolbarBtn} onClick={() => exec("italic")}>I</button>
          <button style={styles.toolbarBtn} onClick={() => exec("underline")}>U</button>
          <select style={styles.select} value={fontSize} onChange={(e) => { const val = Number(e.target.value); setFontSize(val); exec("fontSize", mapFontSizeToCommand(val)); }}>
            {[10,12,14,16,18,24,32].map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <button style={styles.toolbarBtn} onClick={downloadHTML}>Save Demo</button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={() => setEditorHTML(editorRef.current.innerHTML)}
          dangerouslySetInnerHTML={{ __html: editorHTML }}
          style={{ minHeight: 200, padding: 12, border: "1px solid #d1d5db", borderRadius: 8, marginTop: 8, background: theme === "dark" ? "#121318" : "#fff", color: theme === "dark" ? "#eee" : "#111", fontSize, lineHeight: 1.5 }}
        />
      </div>

      {/* Assignments */}
      <div style={styles.card}>
        <h3>Assignments — Write answers in your exercise book</h3>
        <ol>
          {assignmentList.map(a => {
            const t = tracker.find(x => x.id === a.id) || { status: "Not Done" };
            return (
              <li key={a.id} style={{ marginBottom: 8 }}>
                <div>{a.title}: {a.prompt}</div>
                <select value={t.status} onChange={(e) => setTrackerStatus(a.id, e.target.value)} style={styles.select}>
                  <option>Not Done</option><option>In Progress</option><option>Done</option>
                </select>
              </li>
            );
          })}
        </ol>
      </div>

      {/* MCQ Quiz */}
      <div style={styles.card}>
        <h3>MCQ Quiz</h3>
        <div>{mcqQuestions[mcqIndex].q}</div>
        {mcqQuestions[mcqIndex].choices.map((c,i) => (
          <button key={i} style={styles.choiceBtn} onClick={() => submitMcqAnswer(i)}>{c}</button>
        ))}
        {mcqFeedback && <div style={{ color: mcqFeedback.correct ? "green" : "red" }}>{mcqFeedback.explain}</div>}
      </div>

      {/* Fill in blank */}
      <div style={styles.card}>
        <h3>Fill-in-the-blank</h3>
        {fillBlanks.map(f => (
          <div key={f.id} style={{ marginBottom: 6 }}>
            <div>{f.q}</div>
            <input value={f.user} onChange={e => setFillBlanks(fillBlanks.map(x => x.id===f.id?{...x,user:e.target.value}:x))} style={styles.input} />
          </div>
        ))}
        <button style={styles.primaryBtn} onClick={submitFillBlanks}>Submit</button>
        {fillFeedback && <div>{fillFeedback.correct}/{fillFeedback.total} correct</div>}
      </div>

      {/* Timed challenge */}
      <div style={styles.card}>
        <h3>Timed Challenge</h3>
        {!challengeActive ? <button style={styles.primaryBtn} onClick={startChallenge}>Start 20s Challenge</button> : <div>{challengeTimer}s left</div>}
      </div>

      {/* XP & badges */}
      <div style={styles.card}>
        <h3>XP & Badges</h3>
        <div>XP: {xp}</div>
        <div>Badges: {badges.join(", ") || "None"}</div>
      </div>
    </div>
  );
}