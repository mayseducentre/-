import React, { useState, useEffect } from "react";

export default function LNote() {
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
  const [typePreview, setTypePreview] = useState("");

  // ---------------- TYPEWRITER ----------------
  function simulateTypewriter(text, setter) {
    let i = 0;
    setter("");
    const interval = setInterval(() => {
      setter((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15);
  }

  async function generateWithGROQ() {
    if (!topic || !subject) {
      alert("Please fill in Subject and Topic first.");
      return;
    }

    setLoading(true);
    setTypePreview("Generating lesson note...");

    const prompt = `
Create a detailed GES-style lesson note with these details:
School: ${school}
Class: ${classLevel}
Subject: ${subject}
Topic: ${topic}
Duration: ${duration}

Include sections with clear headings:
Learning Objectives
Materials / Resources
Introduction
Lesson Development
Conclusion
Assessment

Return as plain text, teacher-friendly.
`;

    try {
      const res = await fetch("https://api.groq.com/v1/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "groq2o-mini",
          input: prompt,
          max_output_tokens: 800,
        }),
      });

      const data = await res.json();
      const text = data?.output_text || "";

      // Safely parse sections
      const getSection = (label) => {
        const regex = new RegExp(`${label}[:\\n]([\\s\\S]*?)(?=(\\n\\w|$))`, "i");
        const match = text.match(regex);
        return match ? match[1].trim() : "";
      };

      simulateTypewriter(text, setTypePreview);

      setObjectives(getSection("Learning Objectives"));
      setMaterials(getSection("Materials"));
      setIntro(getSection("Introduction"));
      setDevelopment(getSection("Lesson Development"));
      setConclusion(getSection("Conclusion"));
      setAssessment(getSection("Assessment"));
    } catch (err) {
      console.error(err);
      alert("AI generation failed.");
    } finally {
      setLoading(false);
    }
  }

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

      <div style={styles.formGroup}>
        <input placeholder="School Name" value={school} onChange={(e) => setSchool(e.target.value)} style={styles.input} />
        <input placeholder="Class / Grade" value={classLevel} onChange={(e) => setClassLevel(e.target.value)} style={styles.input} />
        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input} />
        <input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} style={styles.input} />
        <input placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} style={styles.input} />
      </div>

      <button onClick={generateWithGROQ} disabled={loading} style={styles.aiButton}>
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      {typePreview && (
        <div style={{ padding: 12, background: "#fef9f0", borderRadius: 8, marginBottom: 15, fontStyle: "italic", whiteSpace: "pre-wrap" }}>
          {typePreview}
        </div>
      )}

      <div style={styles.formGroup}>
        <textarea placeholder="Learning Objectives" value={objectives} onChange={(e) => setObjectives(e.target.value)} style={styles.textarea} />
        <textarea placeholder="Materials / Resources" value={materials} onChange={(e) => setMaterials(e.target.value)} style={styles.textarea} />
        <textarea placeholder="Introduction" value={intro} onChange={(e) => setIntro(e.target.value)} style={styles.textarea} />
        <textarea placeholder="Lesson Development" value={development} onChange={(e) => setDevelopment(e.target.value)} style={styles.textarea} />
        <textarea placeholder="Conclusion" value={conclusion} onChange={(e) => setConclusion(e.target.value)} style={styles.textarea} />
        <textarea placeholder="Assessment" value={assessment} onChange={(e) => setAssessment(e.target.value)} style={styles.textarea} />
      </div>

      <button onClick={downloadTXT} style={styles.downloadButton}>Download Lesson Note</button>
    </div>
  );
}

// STYLES
const styles = {
  container: { maxWidth: 900, margin: "30px auto", padding: 20, fontFamily: "Inter, sans-serif", background: "#f4f6f8", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
  header: { fontSize: 26, fontWeight: 700, color: "#2563eb", marginBottom: 18, textAlign: "center" },
  formGroup: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  input: { padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 15, outline: "none" },
  textarea: { padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 15, minHeight: 80, resize: "vertical" },
  aiButton: { padding: "14px 0", background: "#7a5018", color: "#fff", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 20 },
  downloadButton: { padding: "14px 0", background: "#16a34a", color: "#fff", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", marginTop: 10 },
};