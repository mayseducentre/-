import React, { useEffect, useRef, useState } from "react";

/**
 * WordLearningApp.jsx
 * Single-file React component with inline CSS (Pro UI) and many interactive features.
 *
 * Usage:
 *  import WordLearningApp from "./WordLearningApp";
 *  <WordLearningApp />
 *
 * Default passcode: "learnMSW"
 */

export default function MSWordProAssignment({
  passcode = "1234",
  storageKey = "word_learning_app_v1",
}) {
  // --------------------
  // STATE: Auth + Theme
  // --------------------
  const [codeInput, setCodeInput] = useState("");
  const [unlocked, setUnlocked] = useState(
    () => JSON.parse(localStorage.getItem(storageKey + "_unlocked")) || false
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey + "_theme") || "light"
  );

  // --------------------
  // STATE: Editor / Demo
  // --------------------
  const editorRef = useRef(null);
  const [editorHTML, setEditorHTML] = useState(
    () => localStorage.getItem(storageKey + "_editorHTML") || `<h2>Your practice document</h2><p>Type here and use the toolbar to learn MS Word features.</p>`
  );
  const [title, setTitle] = useState(
    () => localStorage.getItem(storageKey + "_docTitle") || "My Document"
  );
  const [fontSize, setFontSize] = useState(
    () => Number(localStorage.getItem(storageKey + "_fontSize")) || 16
  );
  const [xp, setXp] = useState(() => Number(localStorage.getItem(storageKey + "_xp")) || 0);
  const [badges, setBadges] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey + "_badges")) || [];
    } catch (e) {
      return [];
    }
  });

  // --------------------
  // STATE: Assignments + Tracker
  // --------------------
  const assignmentList = [
    {
      id: 1,
      title: "What is Microsoft Word?",
      prompt: "Define Microsoft Word and list three uses of the application.",
    },
    {
      id: 2,
      title: "Formatting steps",
      prompt: "Explain the steps to make text bold, italic, and underlined.",
    },
    {
      id: 3,
      title: "Alignment",
      prompt: "Describe how to align text left, center, and justify.",
    },
    {
      id: 4,
      title: "Short formatted paragraph",
      prompt: "Write a paragraph about your favourite subject and format it.",
    },
    {
      id: 5,
      title: "Toolbar sketch",
      prompt: "Draw and label the toolbar showing Bold, Italic, Underline, Alignment, Bullets.",
    },
  ];
  const [tracker, setTracker] = useState(() => {
    const raw = localStorage.getItem(storageKey + "_tracker");
    return raw ? JSON.parse(raw) : assignmentList.map((a) => ({ id: a.id, status: "Not Done" }));
  });

  // --------------------
  // STATE: Quizzes
  // --------------------
  const mcqBank = [
    {
      id: "mq1",
      q: "What is the keyboard shortcut for Bold?",
      choices: ["Ctrl + B", "Ctrl + I", "Ctrl + U", "Ctrl + S"],
      a: 0,
      explain: "Ctrl + B toggles bold formatting.",
    },
    {
      id: "mq2",
      q: "Which menu contains Page Orientation?",
      choices: ["Home", "Insert", "Layout / Page Layout", "References"],
      a: 2,
      explain: "Page Orientation is in Layout (Page Layout) tab.",
    },
    {
      id: "mq3",
      q: "Which feature helps create a list with bullets?",
      choices: ["Insert Table", "Bullets", "Track Changes", "Header & Footer"],
      a: 1,
      explain: "Bullets toggles bullet list formatting.",
    },
  ];
  const fillBlankBank = [
    { id: "fb1", q: "The main workspace in Word is called the _____.", a: "Document" },
    { id: "fb2", q: "To save a file you press Ctrl + _____.", a: "S" },
  ];

  // Matching pairs for match-terms exercise
  const matchPairs = [
    { id: "m1", left: "Ribbon", right: "Contains tabs and groups" },
    { id: "m2", left: "Status Bar", right: "Shows page and word count" },
    { id: "m3", left: "Font", right: "Text style/appearance" },
  ];

  // quiz states
  const [mcqQuestions, setMcqQuestions] = useState(shuffleArray(mcqBank));
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqAnswer, setMcqAnswer] = useState(null);
  const [mcqFeedback, setMcqFeedback] = useState(null);

  const [fillBlanks, setFillBlanks] = useState(
    () => fillBlankBank.map((f) => ({ ...f, user: "" }))
  );
  const [fillFeedback, setFillFeedback] = useState(null);

  // matching state
  const [leftItems, setLeftItems] = useState(() => shuffleArray(matchPairs.map((p) => p.left)));
  const [rightSlots, setRightSlots] = useState(() => shuffleArray(matchPairs.map((p) => p.right)));
  const [matches, setMatches] = useState({}); // left -> right mapping
  const [matchFeedback, setMatchFeedback] = useState(null);

  // Timed challenge state
  const [challengeActive, setChallengeActive] = useState(false);
  const [challengeTimer, setChallengeTimer] = useState(0);
  const challengeDuration = 20; // seconds

  // Drag-and-drop labels for interface labeling
  const labelPoolInit = [
    { id: "l1", text: "Ribbon" },
    { id: "l2", text: "Quick Access Toolbar" },
    { id: "l3", text: "Status Bar" },
    { id: "l4", text: "Document Area" },
    { id: "l5", text: "Tabs" },
  ];
  const [labelPool, setLabelPool] = useState(() => labelPoolInit);
  const [droppedLabels, setDroppedLabels] = useState(() => ({})); // dropZoneId -> label

  // teacher feedback (read-only for students)
  const [teacherFeedback] = useState(() => {
    return (
      localStorage.getItem(storageKey + "_teacherFeedback") ||
      "Remember: show your exercise book in class. Practice formatting daily."
    );
  });

  // theme styles
  const styles = getStyles(theme);

  // --------------------
  // EFFECTS: persist to localStorage
  // --------------------
  useEffect(() => {
    localStorage.setItem(storageKey + "_editorHTML", editorHTML);
    localStorage.setItem(storageKey + "_docTitle", title);
    localStorage.setItem(storageKey + "_fontSize", String(fontSize));
    localStorage.setItem(storageKey + "_xp", String(xp));
    localStorage.setItem(storageKey + "_badges", JSON.stringify(badges));
    localStorage.setItem(storageKey + "_tracker", JSON.stringify(tracker));
    localStorage.setItem(storageKey + "_theme", theme);
    localStorage.setItem(storageKey + "_unlocked", JSON.stringify(unlocked));
  }, [editorHTML, title, fontSize, xp, badges, tracker, theme, unlocked]);

  // challenge timer effect
  useEffect(() => {
    if (!challengeActive) {
      setChallengeTimer(0);
      return;
    }
    setChallengeTimer(challengeDuration);
    const id = setInterval(() => {
      setChallengeTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          setChallengeActive(false);
          awardXp(5);
          awardBadge("Challenge Completed");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [challengeActive]);

  // --------------------
  // Helpers
  // --------------------
  function awardXp(amount) {
    setXp((prev) => {
      const n = prev + amount;
      return n;
    });
  }

  function awardBadge(name) {
    setBadges((prev) => {
      if (prev.includes(name)) return prev;
      return [...prev, name];
    });
  }

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function handleUnlock(e) {
    e.preventDefault();
    if (codeInput.trim() === passcode) {
      setUnlocked(true);
      localStorage.setItem(storageKey + "_unlocked", JSON.stringify(true));
      awardXp(10);
      awardBadge("Unlocked");
    } else {
      alert("Incorrect passcode. Ask your teacher.");
    }
  }

  // Editor formatting helper
  function exec(cmd, value = null) {
    if (!editorRef.current) return;
    editorRef.current.focus();
    try {
      document.execCommand(cmd, false, value);
      // update stored html
      setTimeout(() => {
        setEditorHTML(editorRef.current.innerHTML);
      }, 50);
    } catch (e) {
      console.warn("execCommand failed:", cmd, e);
    }
  }

  // Insert image from file
  function handleImageInsert(file) {
    if (!file || !editorRef.current) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = document.createElement("img");
      img.src = ev.target.result;
      img.style.maxWidth = "100%";
      img.alt = file.name;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        sel.getRangeAt(0).insertNode(img);
      } else {
        editorRef.current.appendChild(img);
      }
      setEditorHTML(editorRef.current.innerHTML);
      awardXp(2);
    };
    reader.readAsDataURL(file);
  }

  // insert table
  function insertTable(rows = 2, cols = 3) {
    if (!editorRef.current) return;
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    for (let r = 0; r < rows; r++) {
      const tr = document.createElement("tr");
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement(r === 0 ? "th" : "td");
        cell.style.border = "1px solid #bbb";
        cell.style.padding = "6px";
        cell.textContent = r === 0 ? ["Name", "Class", "Score"][c] || `H${c+1}` : `Sample`;
        tr.appendChild(cell);
      }
      table.appendChild(tr);
    }
    editorRef.current.appendChild(table);
    setEditorHTML(editorRef.current.innerHTML);
    awardXp(3);
  }

  function downloadHTML() {
    const blob = new Blob([`<html><body>${editorRef.current?.innerHTML || ""}</body></html>`], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "demo-document.html";
    a.click();
    URL.revokeObjectURL(url);
    awardXp(2);
  }

  // --------------------
  // MCQ handling
  // --------------------
  function submitMcqAnswer(choiceIndex) {
    const q = mcqQuestions[mcqIndex];
    setMcqAnswer(choiceIndex);
    if (choiceIndex === q.a) {
      setMcqFeedback({ correct: true, explain: q.explain });
      awardXp(5);
      // next question after small delay
      setTimeout(() => {
        if (mcqIndex < mcqQuestions.length - 1) {
          setMcqIndex((i) => i + 1);
          setMcqAnswer(null);
          setMcqFeedback(null);
        } else {
          // finished
          awardBadge("MCQ Master");
        }
      }, 900);
    } else {
      setMcqFeedback({ correct: false, explain: q.explain });
    }
  }

  // --------------------
  // Fill blanks handling
  // --------------------
  function submitFillBlanks() {
    const results = fillBlanks.map((f) => ({ id: f.id, ok: f.user.trim().toLowerCase() === String(f.a).trim().toLowerCase() }));
    const correct = results.filter((r) => r.ok).length;
    setFillFeedback({ correct, total: results.length });
    awardXp(correct * 3);
    if (correct === results.length) awardBadge("Fill-in Champ");
  }

  // --------------------
  // Matching functions
  // --------------------
  function onDragStartLabel(e, labelId) {
    e.dataTransfer.setData("text/plain", labelId);
  }

  function onDropZone(e, zoneId) {
    e.preventDefault();
    const labelId = e.dataTransfer.getData("text/plain");
    if (!labelId) return;
    const label = labelPool.find((l) => l.id === labelId);
    if (!label) return;
    setDroppedLabels((prev) => ({ ...prev, [zoneId]: label }));
    setLabelPool((prev) => prev.filter((l) => l.id !== labelId));
  }

  function onAllowDrop(e) {
    e.preventDefault();
  }

  function resetLabeling() {
    setLabelPool(labelPoolInit);
    setDroppedLabels({});
    setXp((x) => x + 2);
  }

  function checkLabels() {
    // naive check by matching text; teacher could provide mappings
    let correct = 0;
    const mapping = {
      zone1: "Ribbon",
      zone2: "Quick Access Toolbar",
      zone3: "Status Bar",
      zone4: "Document Area",
      zone5: "Tabs",
    };
    for (const zone in mapping) {
      if (droppedLabels[zone] && droppedLabels[zone].text === mapping[zone]) correct++;
    }
    awardXp(correct * 4);
    if (correct >= 4) awardBadge("Label Pro");
    alert(`You got ${correct} / 5 correct. XP awarded.`);
  }

  // --------------------
  // Match terms evaluation
  // --------------------
  function submitMatch() {
    // create mapping from left->right using matches
    let correct = 0;
    matchPairs.forEach((p) => {
      if (matches[p.left] === p.right) correct++;
    });
    setMatchFeedback({ correct, total: matchPairs.length });
    awardXp(correct * 4);
    if (correct === matchPairs.length) awardBadge("Matching Master");
  }

  // --------------------
  // Timed challenge start
  // --------------------
  function startChallenge() {
    setChallengeActive(true);
    setChallengeTimer(challengeDuration);
  }

  // --------------------
  // Assignment Tracker
  // --------------------
  function setTrackerStatus(id, status) {
    setTracker((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    if (status === "Done") {
      awardXp(5);
      awardBadge("Assignment Done");
    }
  }

  // --------------------
  // Matching drag events (match-terms)
  // --------------------
  function onDragStartMatch(e, leftText) {
    e.dataTransfer.setData("text/plain", leftText);
  }
  function onDropMatch(e, rightText) {
    e.preventDefault();
    const leftText = e.dataTransfer.getData("text/plain");
    if (!leftText) return;
    setMatches((prev) => ({ ...prev, [leftText]: rightText }));
  }

  // --------------------
  // UI: small components / render helpers
  // --------------------
  function renderToolbar() {
    return (
      <div style={styles.toolbarWrap}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button style={styles.toolbarBtn} onClick={() => exec("bold")}>B</button>
          <button style={styles.toolbarBtn} onClick={() => exec("italic")}>I</button>
          <button style={styles.toolbarBtn} onClick={() => exec("underline")}>U</button>
          <button style={styles.toolbarBtn} onClick={() => exec("justifyLeft")}>Left</button>
          <button style={styles.toolbarBtn} onClick={() => exec("justifyCenter")}>Center</button>
          <button style={styles.toolbarBtn} onClick={() => exec("justifyRight")}>Right</button>
          <button style={styles.toolbarBtn} onClick={() => exec("insertUnorderedList")}>• List</button>
          <button style={styles.toolbarBtn} onClick={() => exec("insertOrderedList")}>1. List</button>
          <select
            style={styles.select}
            value={fontSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              setFontSize(val);
              exec("fontSize", mapFontSizeToCommand(val));
            }}
          >
            <option value={10}>10</option>
            <option value={12}>12</option>
            <option value={14}>14</option>
            <option value={16}>16</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
            <option value={32}>32</option>
          </select>

          <label style={{ ...styles.toolbarBtn, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            Insert Image
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageInsert(e.target.files[0])}
            />
          </label>

          <button style={styles.toolbarBtn} onClick={() => { insertTable(2, 3); }}>Insert 2x3 Table</button>

          <button style={{ ...styles.toolbarBtn, background: "#2ecc71", color: "#fff", marginLeft: "auto" }} onClick={downloadHTML}>
            Save demo
          </button>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: styles.muted.color }}>Tip: Select text then use toolbar. Your progress is saved offline.</div>
      </div>
    );
  }

  // maps visible fontSize to execCommand sizes 1-7 (approx)
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
  // MAIN RENDER
  // --------------------
  if (!unlocked) {
    return (
      <div style={{ ...styles.app, padding: 24 }}>
        <div style={styles.container}>
          <h1 style={styles.title}>Student Assignment — MS Word Learning</h1>
          <p style={styles.subtitle}>Enter passcode to open the assignment & interactive demo</p>

          <div style={styles.card}>
            <form onSubmit={handleUnlock} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                type="password"
                placeholder="Passcode"
                style={styles.input}
              />
              <button onClick={handleUnlock} type="button" style={styles.primaryBtn}>Unlock</button>
              <button onClick={() => { setTheme(theme === "light" ? "dark" : "light"); }} style={styles.ghostBtn}>
                Toggle Theme
              </button>
            </form>
            <p style={{ marginTop: 10, color: "#777", fontSize: 13 }}>
              Hint: default passcode is <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4 }}>{passcode}</code> (teacher may change).
            </p>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ ...styles.card, flex: 1 }}>
              <h3 style={styles.cardTitle}>Teacher Notes</h3>
              <div style={{ color: "#444" }}>{teacherFeedback}</div>
            </div>
            <div style={{ ...styles.card, width: 260 }}>
              <h3 style={styles.cardTitle}>App Tips</h3>
              <ul style={{ marginTop: 8, color: "#444" }}>
                <li>Try the interactive demo: format text, insert table, add image.</li>
                <li>Try quizzes to get XP and badges.</li>
                <li>Work offline — progress saves automatically.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // unlocked view
  return (
    <div style={{ ...styles.app, padding: 20 }}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>MS Word Learning — Classroom Edition</h1>
          <div style={styles.subtitleRow}>
            <span style={styles.subtitle}>Interactive demo & assignments</span>
            <span style={styles.badgeInfo}>XP: <strong>{xp}</strong></span>
            <span style={styles.badgeInfo}>Badges: <strong>{badges.length}</strong></span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} style={styles.select}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="school">School Blue</option>
          </select>
          <button style={styles.ghostBtn} onClick={() => { setUnlocked(false); localStorage.setItem(storageKey + "_unlocked", JSON.stringify(false)); }}>
            Lock
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginTop: 18 }}>
        {/* LEFT: Demo + assignments */}
        <div>
          <div style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={styles.cardTitle}>Interactive MS Word Demo</h2>
                <div style={{ color: "#666", marginTop: 6 }}>Practice formatting, tables, images, and basic layout.</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#666" }}>Document Title</div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ ...styles.input, width: 220 }} />
              </div>
            </div>

            {/* Toolbar */}
            <div style={{ marginTop: 14 }}>{renderToolbar()}</div>

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={() => setEditorHTML(editorRef.current.innerHTML)}
              dangerouslySetInnerHTML={{ __html: editorHTML }}
              style={{
                marginTop: 14,
                padding: 18,
                minHeight: 260,
                borderRadius: 10,
                background: theme === "dark" ? "#121318" : "#fff",
                color: theme === "dark" ? "#ddd" : "#111",
                border: "1px solid #e2e8f0",
                fontSize: fontSize,
                lineHeight: 1.6,
              }}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={styles.primaryBtn} onClick={() => { setEditorHTML("<h3>Practice document</h3><p>Start typing here...</p>"); editorRef.current.innerHTML = "<h3>Practice document</h3><p>Start typing here...</p>"; }}>
                Reset Demo
              </button>
              <button style={styles.ghostBtn} onClick={downloadHTML}>Export HTML</button>
              <button style={styles.ghostBtn} onClick={() => { awardXp(2); awardBadge("Tried Save"); alert("XP + Badge (if new) awarded."); }}>Claim XP</button>
            </div>
          </div>

          {/* Assignment list */}
          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={styles.cardTitle}>Assignment — Write answers in your exercise book</h3>
            <ol style={{ marginTop: 10 }}>
              {assignmentList.map((a) => {
                const t = tracker.find((x) => x.id === a.id) || { status: "Not Done" };
                return (
                  <li key={a.id} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{a.title}</div>
                        <div style={{ color: "#444" }}>{a.prompt}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ marginBottom: 6 }}>
                          <select value={t.status} onChange={(e) => setTrackerStatus(a.id, e.target.value)} style={styles.select}>
                            <option>Not Done</option>
                            <option>In Progress</option>
                            <option>Done</option>
                          </select>
                        </div>
                        <div style={{ fontSize: 12, color: "#666" }}>{t.status}</div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
              <button style={styles.primaryBtn} onClick={() => { setTracker(tracker.map(t => ({ ...t, status: "Not Done" }))); alert("Reset tracker"); }}>
                Reset Tracker
              </button>
              <button style={styles.ghostBtn} onClick={() => { awardXp(5); alert("XP awarded to the class"); }}>
                Award Class XP
              </button>
            </div>
          </div>

          {/* Tutorials + timed challenge */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <div style={{ ...styles.card, flex: 1 }}>
              <h3 style={styles.cardTitle}>Mini Video Tutorials</h3>
              <div style={{ color: "#666" }}>Short step-by-step guides (placeholders).</div>
              <div style={{ marginTop: 10 }}>
                {/* placeholder if embedding YouTube or local video later */}
                <div style={{ borderRadius: 8, overflow: "hidden", background: "#000", height: 160 }}>
                  <div style={{ color: "#fff", padding: 14 }}>Tutorial video placeholder — insert a YouTube iframe or local video here.</div>
                </div>
              </div>
            </div>

            <div style={{ ...styles.card, width: 320 }}>
              <h3 style={styles.cardTitle}>Timed Challenge</h3>
              <div style={{ color: "#666" }}>Complete the challenge before time runs out to earn XP & badges.</div>
              <div style={{ marginTop: 12 }}>
                <p><strong>Task:</strong> Bold the first heading and center it, then insert a 2x3 table.</p>
                {!challengeActive ? (
                  <button style={styles.primaryBtn} onClick={() => startChallenge()}>Start 20s Challenge</button>
                ) : (
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{challengeTimer}s</div>
                    <div style={{ marginTop: 8 }}>
                      <button style={styles.ghostBtn} onClick={() => { setChallengeActive(false); }}>Stop</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Drag-and-drop labeling */}
          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={styles.cardTitle}>Drag & Drop: Label the Interface</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ border: "1px solid #e6e6e6", padding: 12, borderRadius: 8 }}>
                  <div style={{ background: theme === "dark" ? "#0f1720" : "#f8fafc", padding: 12, borderRadius: 6 }}>
                    <div style={{ height: 36, background: "#fff", borderRadius: 6, display: "flex", alignItems: "center", padding: "4px 8px" }}>
                      <strong>Ribbon</strong>
                    </div>
                    <div style={{ marginTop: 8, height: 140, background: "#fff", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div>Document Area (drop labels)</div>
                    </div>
                    <div style={{ marginTop: 8, height: 30, background: "#fff", borderRadius: 6 }} />
                  </div>
                </div>
              </div>

              <div style={{ width: 300 }}>
                <div style={{ marginBottom: 8, color: "#444" }}>Drag labels into the correct drop zones below:</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  {labelPool.map((l) => (
                    <div
                      key={l.id}
                      draggable
                      onDragStart={(e) => onDragStartLabel(e, l.id)}
                      style={{ padding: "8px 10px", background: "#fff", borderRadius: 8, border: "1px solid #ddd", cursor: "grab" }}
                    >
                      {l.text}
                    </div>
                  ))}
                </div>

                <div>
                  {["zone1", "zone2", "zone3", "zone4", "zone5"].map((z, i) => (
                    <div
                      key={z}
                      onDrop={(e) => onDropZone(e, z)}
                      onDragOver={onAllowDrop}
                      style={{ padding: 10, minHeight: 40, border: "1px dashed #cbd5e1", borderRadius: 8, marginBottom: 8, background: "#fff" }}
                    >
                      <div style={{ fontSize: 12, color: "#666" }}>Drop zone {i + 1}</div>
                      <div style={{ marginTop: 6, fontWeight: 600 }}>{droppedLabels[z] ? droppedLabels[z].text : <span style={{ color: "#9aa" }}>-- empty --</span>}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button style={styles.primaryBtn} onClick={checkLabels}>Check</button>
                  <button style={styles.ghostBtn} onClick={resetLabeling}>Reset</button>
                </div>
              </div>
            </div>
          </div>

          {/* Match terms */}
          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={styles.cardTitle}>Match Terms</h3>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#666", marginBottom: 8 }}>Drag the left item onto the matching right item.</div>
                <div>
                  {leftItems.map((l) => (
                    <div key={l} draggable onDragStart={(e) => onDragStartMatch(e, l)} style={{ padding: 8, border: "1px solid #e2e8f0", borderRadius: 6, marginBottom: 8, background: "#fff", cursor: "grab" }}>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: 300 }}>
                <div>
                  {rightSlots.map((r) => (
                    <div key={r} onDrop={(e) => onDropMatch(e, r)} onDragOver={onAllowDrop} style={{ padding: 10, border: "1px dashed #cbd5e1", borderRadius: 6, marginBottom: 8, minHeight: 46, background: "#fff" }}>
                      <div style={{ fontSize: 12, color: "#666" }}>{r}</div>
                      <div style={{ marginTop: 6, fontWeight: 600 }}>{Object.entries(matches).find(([left, right]) => right === r)?.[0] || <span style={{ color: "#9aa" }}>Drop match here</span>}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={styles.primaryBtn} onClick={submitMatch}>Submit Match</button>
                  <button style={styles.ghostBtn} onClick={() => { setMatches({}); setMatchFeedback(null); }}>Reset</button>
                </div>
                {matchFeedback && <div style={{ marginTop: 8 }}>{matchFeedback.correct} / {matchFeedback.total} correct</div>}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Dashboard, quizzes, badges */}
        <div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Progress & Badges</h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, background: "#f0f9ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {xp}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{badges.length} Badges</div>
                <div style={{ color: "#666" }}>{badges.join(", ") || "No badges yet — earn them by completing tasks!"}</div>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <button style={styles.primaryBtn} onClick={() => { awardXp(10); alert("10 XP awarded"); }}>+10 XP</button>
            </div>
          </div>

          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={styles.cardTitle}>MCQ Quiz</h3>
            <div style={{ color: "#666" }}>{mcqQuestions[mcqIndex].q}</div>
            <div style={{ marginTop: 8 }}>
              {mcqQuestions[mcqIndex].choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => submitMcqAnswer(i)}
                  style={{ ...styles.choiceBtn, marginBottom: 6, background: mcqAnswer === i ? "#e6f7ff" : undefined }}
                >
                  {c}
                </button>
              ))}
            </div>
            {mcqFeedback && (
              <div style={{ marginTop: 8, color: mcqFeedback.correct ? "#059669" : "#b91c1c" }}>
                {mcqFeedback.correct ? "Correct! " : "Incorrect. "} {mcqFeedback.explain}
              </div>
            )}
          </div>

          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={styles.cardTitle}>Fill-in-the-blank</h3>
            <div>
              {fillBlanks.map((f) => (
                <div key={f.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 13 }}>{f.q}</div>
                  <input value={f.user} onChange={(e) => setFillBlanks(fillBlanks.map(x => x.id === f.id ? { ...x, user: e.target.value } : x))} style={{ ...styles.input, marginTop: 6 }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={styles.primaryBtn} onClick={submitFillBlanks}>Submit</button>
              <button style={styles.ghostBtn} onClick={() => { setFillBlanks(fillBlankBank.map(f => ({ ...f, user: "" }))); setFillFeedback(null); }}>Reset</button>
            </div>
            {fillFeedback && <div style={{ marginTop: 8 }}>You answered {fillFeedback.correct} / {fillFeedback.total} correctly.</div>}
          </div>

          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={styles.cardTitle}>Teacher Feedback</h3>
            <div style={{ color: "#444" }}>{teacherFeedback}</div>
          </div>

          <div style={{ ...styles.card, marginTop: 12 }}>
            <h3 style={styles.cardTitle}>Quick Actions</h3>
            <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
              <button style={styles.ghostBtn} onClick={() => { setEditorHTML(editorRef.current?.innerHTML || ""); alert("Saved current demo to localStorage"); }}>Save Demo</button>
              <button style={styles.ghostBtn} onClick={() => { localStorage.clear(); location.reload(); }}>Clear All (DEV)</button>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: 18, textAlign: "center", color: "#666", fontSize: 13 }}>
        Built for classroom practice. Use responsibly — this is a teaching demo, not a full MS Word replacement.
      </footer>
    </div>
  );
}

// --------------------
// UI Styles generator
// --------------------
function getStyles(theme) {
  const base = {
    app: {
      fontFamily: "'Inter', 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif",
      background: theme === "dark" ? "#0b1220" : theme === "school" ? "#eef6ff" : "#f5f7fb",
      color: theme === "dark" ? "#e6eef8" : "#0f172a",
      minHeight: "100vh",
    },
    container: {
      maxWidth: 1100,
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      margin: 0,
    },
    subtitle: {
      color: theme === "dark" ? "#9aa4b2" : "#556",
      fontSize: 13,
    },
    subtitleRow: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginTop: 6,
    },
    card: {
      padding: 16,
      borderRadius: 12,
      background: theme === "dark" ? "#07101a" : "#fff",
      boxShadow: "0 6px 18px rgba(14, 30, 37, 0.06)",
      border: "1px solid " + (theme === "dark" ? "#0e1724" : "#eef2f7"),
    },
    cardTitle: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
    },
    input: {
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid #d1d5db",
    },
    primaryBtn: {
      padding: "9px 12px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 700,
    },
    ghostBtn: {
      padding: "8px 10px",
      background: "transparent",
      border: "1px solid #d1d5db",
      borderRadius: 8,
      cursor: "pointer",
    },
    toolbarWrap: {
      padding: 8,
      borderRadius: 10,
      background: theme === "dark" ? "#071225" : "#f8fafc",
    },
    toolbarBtn: {
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid #e6edf3",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 700,
    },
    select: {
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid #d1d5db",
      background: "#fff",
      cursor: "pointer",
    },
    choiceBtn: {
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "8px 10px",
      borderRadius: 8,
      border: "1px solid #e6eef8",
      background: "#fff",
      cursor: "pointer",
    },
    badgeInfo: {
      fontSize: 13,
      color: theme === "dark" ? "#9aa4b2" : "#334155",
      marginLeft: 10,
    },
    muted: {
      color: theme === "dark" ? "#94a3b8" : "#6b7280",
    },
  };

  // copy into result to allow use as styles.primaryBtn etc.
  return {
    ...base,
    app: { ...base.app },
    container: { ...base.container },
    header: { ...base.header },
    title: { ...base.title },
    subtitle: { ...base.subtitle },
    subtitleRow: { ...base.subtitleRow },
    card: { ...base.card },
    cardTitle: { ...base.cardTitle },
    input: { ...base.input },
    primaryBtn: { ...base.primaryBtn },
    ghostBtn: { ...base.ghostBtn },
    toolbarWrap: { ...base.toolbarWrap },
    toolbarBtn: { ...base.toolbarBtn },
    select: { ...base.select },
    choiceBtn: { ...base.choiceBtn },
    badgeInfo: { ...base.badgeInfo },
    muted: { ...base.muted },
  };
}