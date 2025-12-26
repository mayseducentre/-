import React, { useRef, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function LNote() {
  const SCHOOL_NAME = "Mays Educational Centre";

  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("50 min");

  const editorRef = useRef(null);

  // Generate AI prompt
  const generatePrompt = () => `
Create a detailed, teacher-friendly GES-standard lesson note:

School: ${SCHOOL_NAME}
Class: ${classLevel}
Subject: ${subject}
Topic: ${topic}
Duration: ${duration}

Include all sections:
- Learning Objectives
- Materials / Resources
- Introduction
- Lesson Development
- Conclusion
- Assessment
- References / Notes for Teacher

Write it in plain text, professional, structured, ready for teaching. Avoid Markdown symbols or asterisks in headings.
`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatePrompt());
    alert("Prompt copied to clipboard!");
  };

  // Simple formatting function
  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  // Download editor content as DOCX
  const downloadDocx = async () => {
    const html = editorRef.current.innerHTML;
    if (!html) return alert("Editor is empty!");

    const parseHtml = (htmlString) => {
      const container = document.createElement("div");
      container.innerHTML = htmlString;
      const paragraphs = [];

      container.childNodes.forEach((node) => {
        const children = [];
        node.childNodes.forEach((child) => {
          children.push(
            new TextRun({
              text: child.textContent,
              bold: child.tagName === "B" || child.style.fontWeight === "bold",
              italics: child.tagName === "I" || child.style.fontStyle === "italic",
              underline: child.tagName === "U" || child.style.textDecoration === "underline" ? {} : undefined,
            })
          );
        });
        paragraphs.push(new Paragraph({ children }));
      });
      return paragraphs;
    };

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: parseHtml(html),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${subject || "Subject"}_${topic || "Topic"}_LessonNote.docx`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Lesson Note Generator</h2>

      {/* Basic Info */}
      <div style={styles.formGroup}>
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
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <button onClick={copyPrompt} style={styles.button}>
          Copy AI Prompt
        </button>
      </div>

      {/* Formatting toolbar */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => formatText("bold")} style={styles.button}>
          Bold
        </button>
        <button onClick={() => formatText("italic")} style={styles.button}>
          Italic
        </button>
        <button onClick={() => formatText("underline")} style={styles.button}>
          Underline
        </button>
        <button
          onClick={() => formatText("formatBlock", "<H1>")}
          style={styles.button}
        >
          H1
        </button>
        <button
          onClick={() => formatText("formatBlock", "<H2>")}
          style={styles.button}
        >
          H2
        </button>
        <button
          onClick={() => formatText("formatBlock", "<P>")}
          style={styles.button}
        >
          Paragraph
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        style={styles.editor}
        placeholder="Paste AI-generated lesson note here and edit..."
      ></div>

      <button onClick={downloadDocx} style={{ ...styles.button, marginTop: 10 }}>
        Download as DOCX
      </button>
    </div>
  );
}

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
  button: {
    padding: "8px 14px",
    marginRight: 6,
    marginBottom: 6,
    background: "#7a5018",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  editor: {
    minHeight: 300,
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 12,
    background: "#fff",
    overflowY: "auto",
  },
};