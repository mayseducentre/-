import React, { useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function LNote() {
  const [school, setSchool] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [lessonText, setLessonText] = useState("");

  // Generate powerful GES lesson note prompt
  const generatePrompt = () => {
    return `
Create a detailed, teacher-friendly GES-standard lesson note with the following details:
School: ${school}
Class: ${classLevel}
Subject: ${subject}
Topic: ${topic}
Duration: ${duration}

The lesson note should include all these sections clearly labeled:
- Learning Objectives
- Materials / Resources
- Introduction
- Lesson Development
- Conclusion
- Assessment
- References (if applicable)
- Notes for Teacher

Make it professional, well-structured, and easy to teach from. Include examples, step-by-step instructions, and any suggested activities.
`;
  };

  // Download as DOCX
  const downloadDocx = async () => {
    const title = `${subject || "Subject"}_${topic || "Topic"}_LessonNote`
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    const paragraphs = lessonText
      .split(/\n+/)
      .filter((line) => line.trim() !== "")
      .map(
        (line) =>
          new Paragraph({
            children: [new TextRun(line)],
          })
      );

    const doc = new Document({ sections: [{ children: paragraphs }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title}.docx`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>GES Lesson Note Generator & Editor</h2>

      {/* Metadata Inputs */}
      <div style={styles.formGroup}>
        <input
          style={styles.input}
          placeholder="School"
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

      {/* Prompt Generator */}
      <div style={styles.promptBox}>
        <p style={{ marginBottom: 6, fontWeight: 600 }}>Copy this prompt to generate your lesson note using any AI:</p>
        <textarea
          style={styles.textareaPrompt}
          value={generatePrompt()}
          readOnly
          onFocus={(e) => e.target.select()}
        />
      </div>

      {/* Lesson Editor */}
      <div style={{ marginTop: 20 }}>
        <p style={{ marginBottom: 6, fontWeight: 600 }}>Paste your AI-generated lesson note below and edit:</p>
        <textarea
          style={styles.textarea}
          value={lessonText}
          onChange={(e) => setLessonText(e.target.value)}
          placeholder="Paste AI output here..."
        />
      </div>

      <button style={styles.downloadButton} onClick={downloadDocx}>
        Download as DOCX
      </button>
    </div>
  );
}

// --- Styles ---
const styles = {
  container: { maxWidth: 900, margin: "30px auto", padding: 20, fontFamily: "Inter, sans-serif", background: "#f4f6f8", borderRadius: 12 },
  header: { fontSize: 26, fontWeight: 700, color: "#1d4ed8", marginBottom: 20, textAlign: "center" },
  formGroup: { display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 20 },
  input: { padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 15, outline: "none", flex: "1 1 150px" },
  promptBox: { marginBottom: 20, background: "#eef2ff", padding: 12, borderRadius: 8 },
  textareaPrompt: { width: "100%", minHeight: 150, padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14, resize: "vertical", fontFamily: "Inter, sans-serif" },
  textarea: { width: "100%", minHeight: 400, padding: 14, borderRadius: 8, border: "1px solid #ccc", fontSize: 15, fontFamily: "Inter, sans-serif", resize: "vertical" },
  downloadButton: { padding: "14px 0", background: "#16a34a", color: "#fff", fontSize: 16, fontWeight: 700, border: "none", borderRadius: 8, cursor: "pointer", marginTop: 12 },
};