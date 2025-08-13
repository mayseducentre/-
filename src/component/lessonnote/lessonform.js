import React, { useEffect, useState } from "react";

const BLANK = {
  id: "",
  class: "",
  subject: "",
  term: "",
  week: "",
  topic: "",
  subtopic: "",
  objectives: "",
  materials: "",
  introduction: "",
  activities: "",
  conclusion: "",
  assessment: "",
  homework: ""
};

export default function LessonForm({ initialNote, onCancel, onSave }) {
  const [note, setNote] = useState(BLANK);

  useEffect(() => {
    setNote(initialNote ? { ...initialNote } : { ...BLANK, id: `user-${Date.now()}` });
  }, [initialNote]);

  const update = (key, val) => setNote((n) => ({ ...n, [key]: val }));

  const handleSave = () => {
    // Minimal validation for GES fields
    const required = ["class", "subject", "term", "week", "topic"];
    const missing = required.filter((k) => !String(note[k] || "").trim());
    if (missing.length) {
      alert(`Please fill: ${missing.join(", ")}`);
      return;
    }
    onSave(note);
  };

  return (
    <div className="card">
      <h2>{initialNote ? "Edit Lesson Note" : "Create Lesson Note"}</h2>

      <div className="grid-4">
        <div>
          <label>Class</label>
          <input
            value={note.class}
            onChange={(e) => update("class", e.target.value)}
            placeholder="e.g., B3, JHS 1"
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            value={note.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder="e.g., Science, ICT"
          />
        </div>
        <div>
          <label>Term</label>
          <input
            value={note.term}
            onChange={(e) => update("term", e.target.value)}
            placeholder="e.g., Term 1"
          />
        </div>
        <div>
          <label>Week</label>
          <input
            value={note.week}
            onChange={(e) => update("week", e.target.value)}
            placeholder="e.g., Week 3"
          />
        </div>
      </div>

      <div>
        <label>Topic</label>
        <input
          value={note.topic}
          onChange={(e) => update("topic", e.target.value)}
          placeholder="e.g., Photosynthesis"
        />
      </div>

      <div>
        <label>Subtopic</label>
        <input
          value={note.subtopic}
          onChange={(e) => update("subtopic", e.target.value)}
          placeholder="e.g., Conditions for photosynthesis"
        />
      </div>

      <div>
        <label>Objectives (KPIs / Core Competencies)</label>
        <textarea
          value={note.objectives}
          onChange={(e) => update("objectives", e.target.value)}
          placeholder="By the end of the lesson, learners should be able to..."
        />
      </div>

      <div>
        <label>Materials Needed</label>
        <textarea
          value={note.materials}
          onChange={(e) => update("materials", e.target.value)}
          placeholder="Charts, markers, real objects..."
        />
      </div>

      <div>
        <label>Introduction</label>
        <textarea
          value={note.introduction}
          onChange={(e) => update("introduction", e.target.value)}
          placeholder="Starter to activate prior knowledge..."
        />
      </div>

      <div>
        <label>Teaching & Learning Activities (Main Activities)</label>
        <textarea
          value={note.activities}
          onChange={(e) => update("activities", e.target.value)}
          placeholder="Step-by-step activities, group work, demonstrations..."
        />
      </div>

      <div>
        <label>Conclusion</label>
        <textarea
          value={note.conclusion}
          onChange={(e) => update("conclusion", e.target.value)}
          placeholder="Wrap-up, summary, reflection..."
        />
      </div>

      <div>
        <label>Assessment / Evaluation</label>
        <textarea
          value={note.assessment}
          onChange={(e) => update("assessment", e.target.value)}
          placeholder="Quiz, oral questions, exit ticket..."
        />
      </div>

      <div>
        <label>Homework</label>
        <textarea
          value={note.homework}
          onChange={(e) => update("homework", e.target.value)}
          placeholder="Practice exercises to do at home..."
        />
      </div>

      <div>
        <button className="notebtn primary" onClick={handleSave}>
          Save Note
        </button>
        <button className="notebtn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}