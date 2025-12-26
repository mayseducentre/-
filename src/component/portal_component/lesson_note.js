import React, { useRef, useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function LessonNoteEditor() {
  const SCHOOL_NAME = "Mays Educational Centre";

  const [classLevel, setClassLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("50 min");

  const editorRef = useRef(null);

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

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const downloadDocx = async () => {
    const html = editorRef.current.innerHTML;
    if (!html) return alert("Editor is empty!");

    const container = document.createElement("div");
    container.innerHTML = html;

    const paragraphs = [];

    const traverseNodes = (nodes) => {
      nodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: node.textContent,
                  bold: node.parentElement?.tagName === "B" || node.parentElement?.style.fontWeight === "bold",
                  italics: node.parentElement?.tagName === "I" || node.parentElement?.style.fontStyle === "italic",
                  underline: node.parentElement?.tagName === "U" || node.parentElement?.style.textDecoration === "underline" ? {} : undefined,
                }),
              ],
            })
          );
        } else {
          traverseNodes(node.childNodes);
        }
      });
    };

    traverseNodes(container.childNodes);

    const doc = new Document({ sections: [{ children: paragraphs }] });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${subject || "Subject"}_${topic || "Topic"}_LessonNote.docx`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Lesson Note Editor</h2>

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

      {/* Copy Prompt */}
      <button style={{ ...styles.button, marginBottom: 10 }} onClick={copyPrompt}>
        Copy AI Prompt
      </button>

      {/* Word-style formatting toolbar */}
      <div style={styles.toolbar}>
        <button onClick={() => formatText("bold")} style={styles.toolbarButton}>
          <b>B</b>
        </button>
        <button onClick={() => formatText("italic")} style={styles.toolbarButton}>
          <i>I</i>
        </button>
        <button onClick={() => formatText("underline")} style={styles.toolbarButton}>
          <u>U</u>
        </button>
        <select
          onChange={(e) => formatText("formatBlock", e.target.value)}
          style={{ ...styles.toolbarButton, minWidth: 80 }}
        >
          <option value="">Paragraph</option>
          <option value="H1">Heading 1</option>
          <option value="H2">Heading 2</option>
          <option value="H3">Heading 3</option>
        </select>
        <button onClick={() => formatText("justifyLeft")} style={styles.toolbarButton}>
          L
        </button>
        <button onClick={() => formatText("justifyCenter")} style={styles.toolbarButton}>
          C
        </button>
        <button onClick={() => formatText("justifyRight")} style={styles.toolbarButton}>
          R
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        style={styles.editor}
        placeholder="Paste AI-generated lesson note here and edit..."
      ></div>

      <button style={{ ...styles.button, marginTop: 10 }} onClick={downloadDocx}>
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
    background: "#7a5018",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
  toolbar: {
    display: "flex",
    gap: 4,
    marginBottom: 10,
    flexWrap: "wrap",
    border: "1px solid #ccc",
    padding: 4,
    borderRadius: 6,
    background: "#e0e0e0",
  },
  toolbarButton: {
    padding: "4px 8px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 600,
  },
  editor: {
    minHeight: 350,
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 12,
    background: "#fff",
    overflowY: "auto",
  },
};