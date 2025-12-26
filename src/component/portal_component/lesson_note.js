import React, { useState } from "react";

export default function LessonNoteGenerator() {
  // Lesson note fields
  const [school, setSchool] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [objectives, setObjectives] = useState("");
  const [materials, setMaterials] = useState("");
  const [intro, setIntro] = useState("");
  const [development, setDevelopment] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [assessment, setAssessment] = useState("");
  const [loading, setLoading] = useState(false);

  // GROQ AI generation
  async function generateWithGROQ() {
    if (!topic || !subject) {
      alert("Please fill in Subject and Topic first.");
      return;
    }

    setLoading(true);
    const prompt = `
Create a detailed GES‑style lesson note with these details:
School: ${school}
Class: ${classLevel}
Subject: ${subject}
Topic: ${topic}
Duration: ${duration}

Include sections with clear headings:
- Learning Objectives
- Materials / Resources
- Introduction
- Lesson Development
- Conclusion
- Assessment

Make it teacher‑friendly and professional.
`;

    try {
      const res = await fetch("https://api.groq.ai/v1/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "groq2o-mini", // or a better model if you have access
          prompt: prompt,
          max_tokens: 600,
        }),
      });

      const data = await res.json();
      const text = data.output_text || "";

      // Simple parser (split by headings)
      const splitBy = (label) =>
        (text.split(label + ":")[1] || "")
          .split("\n\n")[0]
          .trim();

      setObjectives(splitBy("Learning Objectives"));
      setMaterials(splitBy("Materials"));
      setIntro(splitBy("Introduction"));
      setDevelopment(splitBy("Lesson Development"));
      setConclusion(splitBy("Conclusion"));
      setAssessment(splitBy("Assessment"));
    } catch (err) {
      console.error(err);
      alert("AI generation failed.");
    } finally {
      setLoading(false);
    }
  }

  // Download as TXT
  function downloadTXT() {
    const content = `
School: ${school}
Class: ${classLevel}
Subject: ${subject}
Topic: ${topic}
Duration: ${duration}

Learning Objectives:
${objectives}

Materials:
${materials}

Introduction:
${intro}

Lesson Development:
${development}

Conclusion:
${conclusion}

Assessment:
${assessment}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject}_${topic}_LessonNote.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Lesson Note Generator (GROQ AI)</h2>

      {/* Basic Info */}
      <div style={styles.formGroup}>
        <input
          style={styles.input}
          placeholder="School Name"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Class / Grade"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Duration (e.g., 40 mins)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <button
        style={styles.aiButton}
        onClick={generateWithGROQ}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      {/* Editable Sections */}
      <div style={styles.formGroup}>
        <textarea
          style={styles.textarea}
          placeholder="Learning Objectives"
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Materials / Resources"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Introduction"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Lesson Development"
          value={development}
          onChange={(e) => setDevelopment(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Conclusion"
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Assessment"
          value={assessment}
          onChange={(e) => setAssessment(e.target.value)}
        />
      </div>

      <button style={styles.downloadButton} onClick={downloadTXT}>
        Download Lesson Note
      </button>
    </div>
  );
}

// 🧨 INLINE STYLES (PRO UI)
const styles = {
  container: {
    maxWidth: 900,
    margin: "30px auto",
    padding: 20,
    fontFamily: "Inter, sans-serif",
    background: "#f4f6f8",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  header: {
    fontSize: 26,
    fontWeight: 700,
    color: "#2563eb",
    marginBottom: 18,
    textAlign: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 15,
    outline: "none",
  },
  textarea: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 15,
    minHeight: 80,
    resize: "vertical",
  },
  aiButton: {
    padding: "14px 0",
    background: "#7a5018",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 20,
  },
  downloadButton: {
    padding: "14px 0",
    background: "#16a34a",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 10,
  },
};