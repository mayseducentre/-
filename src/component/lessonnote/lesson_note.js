import React, { useEffect, useMemo, useRef, useState } from "react";
import "./lesstyle.css";
import LessonForm from "./lessonform";
import LessonList from "./lessonlist";
import gesLessons from "./ges_lesson.json";
import { useReactToPrint } from "react-to-print";

/* Printable component (nice GES layout) */
const PrintableNote = React.forwardRef(({ note }, ref) => {
  if (!note) return null;
  return (
    <div ref={ref} className="printable">
      <h1>GES Lesson Note</h1>
      <div className="separator"></div>
      <p><strong>Class:</strong> {note.class} &nbsp;&nbsp;
         <strong>Subject:</strong> {note.subject} &nbsp;&nbsp;
         <strong>Term:</strong> {note.term} &nbsp;&nbsp;
         <strong>Week:</strong> {note.week}</p>

      <h3>Topic</h3>
      <p>{note.topic}</p>

      <h3>Subtopic</h3>
      <p>{note.subtopic}</p>

      <h3>Objectives (KPIs / Core Competencies)</h3>
      <p>{note.objectives}</p>

      <h3>Materials Needed</h3>
      <p>{note.materials}</p>

      <h3>Introduction</h3>
      <p>{note.introduction}</p>

      <h3>Teaching & Learning Activities (Main Activities)</h3>
      <p>{note.activities}</p>

      <h3>Conclusion</h3>
      <p>{note.conclusion}</p>

      <h3>Assessment / Evaluation</h3>
      <p>{note.assessment}</p>

      <h3>Homework</h3>
      <p>{note.homework}</p>
    </div>
  );
});

export default function NoteSys() {
  const [tab, setTab] = useState("generate"); // generate | add | my
  const [filters, setFilters] = useState({ class: "", subject: "", term: "" });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [userNotes, setUserNotes] = useState([]);

  // Load saved notes from localStorage at startup
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userLessonNotes") || "[]");
    setUserNotes(saved);
  }, []);

  // Persist user notes
  useEffect(() => {
    localStorage.setItem("userLessonNotes", JSON.stringify(userNotes));
  }, [userNotes]);

  const allNotes = useMemo(() => [...gesLessons, ...userNotes], [userNotes]);

  // List filtered & searched notes
  const visibleNotes = useMemo(() => {
    const f = (n) =>
      (!filters.class || n.class.toLowerCase().includes(filters.class.toLowerCase())) &&
      (!filters.subject || n.subject.toLowerCase().includes(filters.subject.toLowerCase())) &&
      (!filters.term || n.term.toLowerCase().includes(filters.term.toLowerCase())) &&
      (!search ||
        (n.topic && n.topic.toLowerCase().includes(search.toLowerCase())) ||
        (n.week && n.week.toLowerCase().includes(search.toLowerCase())));
    return allNotes.filter(f);
  }, [allNotes, filters, search]);

  // For "Generate" tab: pick first match as the generated note (simple UX)
  const generated = useMemo(() => visibleNotes[0] || null, [visibleNotes]);

  // Save or update a user note
  const handleSaveNote = (note) => {
    setUserNotes((prev) => {
      const exists = prev.some((n) => n.id === note.id);
      if (exists) return prev.map((n) => (n.id === note.id ? note : n));
      return [...prev, note];
    });
    setEditing(null);
    setTab("my");
  };

  const handleDeleteNote = (id) => {
    if (!window.confirm("Delete this note?")) return;
    setUserNotes((prev) => prev.filter((n) => n.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  /* Printing */
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });

  return (
    <>
      <headerx className="headerx">
        <div className="headerx-inner">
          <div className="title">GES Lesson Note Builder (No Login)</div>
          <div className="tabs">
            <button
              className={`tab-notebtn ${tab === "generate" ? "active" : ""}`}
              onClick={() => setTab("generate")}
            >
              Generate
            </button>
            <button
              className={`tab-notebtn ${tab === "add" ? "active" : ""}`}
              onClick={() => setTab("add")}
            >
              Add / Edit
            </button>
            <button
              className={`tab-notebtn ${tab === "my" ? "active" : ""}`}
              onClick={() => setTab("my")}
            >
              My Notes
            </button>
          </div>
        </div>
      </headerx>

      <main className="container">
        {/* Generate tab: quick filters + preview first matching note */}
        {tab === "generate" && (
          <>
            <div className="card">
              <h2>Generate Lesson Note (Filter & Preview)</h2>
              <div className="grid-4">
                <div>
                  <label>Class</label>
                  <input
                    value={filters.class}
                    onChange={(e) => setFilters({ ...filters, class: e.target.value })}
                    placeholder="e.g., B3, JHS 1"
                  />
                </div>
                <div>
                  <label>Subject</label>
                  <input
                    value={filters.subject}
                    onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                    placeholder="e.g., Science"
                  />
                </div>
                <div>
                  <label>Term</label>
                  <input
                    value={filters.term}
                    onChange={(e) => setFilters({ ...filters, term: e.target.value })}
                    placeholder="e.g., Term 1"
                  />
                </div>
                <div>
                  <label>Search Topic/Week</label>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g., Fractions or Week 4"
                  />
                </div>
              </div>

              <p className="section-notetitle">Preview</p>
              {generated ? (
                <div className="card" style={{ background: "#fafbfc" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div>
                      <strong>{generated.topic}</strong>{" "}
                      <span className="badge">{generated.subject}</span>
                      <div className="meta">
                        {generated.class} • {generated.term} • {generated.week}
                      </div>
                    </div>
                    <div>
                      <button className="notebtn" onClick={() => setSelected(generated)}>View</button>
                      <button className="notebtn" onClick={() => { setEditing({ ...generated, id: `user-copy-${Date.now()}` }); setTab("add"); }}>
                        Customize & Save
                      </button>
                      <button className="notebtn" onClick={() => { setSelected(generated); setTimeout(handlePrint, 10); }}>
                        Print / PDF
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No match yet. Adjust filters or go to “Add / Edit” to create your own note.</p>
              )}
            </div>
          </>
        )}

        {/* Add / Edit tab */}
        {tab === "add" && (
          <LessonForm
            initialNote={editing}
            onCancel={() => setEditing(null)}
            onSave={handleSaveNote}
          />
        )}

        {/* My Notes tab */}
        {tab === "my" && (
          <LessonList
            notes={visibleNotes}
            filters={filters}
            onChangeFilters={setFilters}
            search={search}
            onChangeSearch={setSearch}
            onEdit={(n) => { setEditing(n); setTab("add"); }}
            onView={(n) => setSelected(n)}
            onDelete={handleDeleteNote}
            onExport={(n) => { setSelected(n); setTimeout(handlePrint, 10); }}
          />
        )}
      </main>

      {/* Hidden printable area */}
      <div style={{ position: "fixed", left: -9999, top: 0 }}>
        <PrintableNote ref={printRef} note={selected} />
      </div>
    </>
  );
}