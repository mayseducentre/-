import React, { useState, useRef } from "react";

export default function MSWordProAssignment() {
  const PASSCODE = "1234";
  const [inputCode, setInputCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // MS Word demo
  const editorRef = useRef(null);

  const toolbarBtn = {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #d0d0d0",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.2s",
  };

  const card = {
    padding: 20,
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    marginTop: 20,
  };

  const format = (cmd) => {
    editorRef.current.focus();
    document.execCommand(cmd, false, null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 30,
        background: "#f5f7fb",
        fontFamily: "Segoe UI, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 950 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Student Assignment</h1>
        <p style={{ color: "#666" }}>MS Word Interactive Practice + Written Questions</p>

        {/* PASSCODE */}
        {!unlocked ? (
          <div style={card}>
            <h3 style={{ marginBottom: 10 }}>Enter Passcode</h3>
            <input
              type="password"
              placeholder="Passcode"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              style={{
                width: "60%",
                padding: 10,
                fontSize: 18,
                borderRadius: 10,
                border: "1px solid #ccc",
              }}
            />

            <button
              onClick={() => {
                if (inputCode === PASSCODE) setUnlocked(true);
                else alert("Incorrect passcode");
              }}
              style={{
                ...toolbarBtn,
                marginLeft: 10,
                background: "#4b7bec",
                color: "white",
                border: "none",
              }}
            >
              Unlock
            </button>
          </div>
        ) : (
          <>
            {/* INTERACTIVE MS WORD DEMO */}
            <div style={card}>
              <h2 style={{ marginBottom: 10 }}>MS Word Interactive Demo</h2>

              {/* Toolbar */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 15,
                  background: "#f2f3f5",
                  padding: 12,
                  borderRadius: 12,
                }}
              >
                <button onClick={() => format("bold")} style={toolbarBtn}>
                  B
                </button>
                <button onClick={() => format("italic")} style={toolbarBtn}>
                  I
                </button>
                <button onClick={() => format("underline")} style={toolbarBtn}>
                  U
                </button>
                <button onClick={() => format("justifyLeft")} style={toolbarBtn}>
                  Left
                </button>
                <button onClick={() => format("justifyCenter")} style={toolbarBtn}>
                  Center
                </button>
                <button onClick={() => format("justifyRight")} style={toolbarBtn}>
                  Right
                </button>
                <button onClick={() => format("insertUnorderedList")} style={toolbarBtn}>
                  • Bullet List
                </button>
                <button onClick={() => format("insertOrderedList")} style={toolbarBtn}>
                  1. Number List
                </button>
              </div>

              {/* Editor */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                style={{
                  minHeight: 200,
                  background: "white",
                  padding: 20,
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  fontSize: 16,
                  lineHeight: "1.6",
                }}
              >
                Type your practice text here…
              </div>
            </div>

            {/* ASSIGNMENT QUESTIONS */}
            <div style={card}>
              <h2>Assignment (Write answers in your exercise book)</h2>

              <ol style={{ marginTop: 15, lineHeight: "1.8", fontSize: 17 }}>
                <li>
                  Define Microsoft Word and write three uses of the application.
                </li>
                <li>
                  Explain the steps used to make text bold, italic, or underlined.
                </li>
                <li>
                  Describe how to align a paragraph to left, right, and center.
                </li>
                <li>
                  Write a paragraph about your favourite subject and format it using
                  bold, italic, and alignment styles.
                </li>
                <li>
                  Draw the toolbar of MS Word and label: Bold, Italic, Underline,
                  Alignment, Bullets.
                </li>
              </ol>

              <p style={{ marginTop: 18, color: "#777" }}>
                Submit by showing your exercise book to the teacher.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}