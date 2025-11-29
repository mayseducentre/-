import React, { useState } from "react";

export default function AssignmentHub() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // 🔹 ONLY MS WORD ASSIGNMENT
  const assignment = {
    title: "MS Word Professional Project",
    steps: [
      "Open Microsoft Word and create a new blank document.",
      "Go to Layout → Margins → Select 'Normal'. Then set the paper size to A4.",
      "Create a professional title page. Insert WordArt for the main title and type your full name, class, and date below.",
      "Insert three section headings: Introduction, Main Content, and Conclusion using the Heading 1 style.",
      "Under each heading, type 2–3 well-structured paragraphs using justified alignment and 1.5 line spacing.",
      "Insert a relevant picture. Resize it neatly, center it, and add a caption using References → Insert Caption.",
      "Insert a table with at least 2–3 columns. Add sample data and apply a table design style.",
      "Insert page numbers from Insert → Page Number → Bottom of Page. Make sure numbering starts from page 2.",
      "Insert a footer that contains your full name and project title.",
      "Proofread using Review → Spelling & Grammar. Then File → Save As → Choose PDF and save your final document."
    ]
  };

  // 🔹 PIN UNLOCK
  const unlock = () => {
    if (pin === "1234") {
      setUnlocked(true);
    } else {
      alert("Incorrect PIN");
    }
  };

  // 🔹 EMAIL SUBMISSION
  const submitAssignment = () => {
    const subject = "Student Assignment Submission";
    const body = "Sir, I have completed my MS Word professional project. Attached is my PDF.";
    window.location.href = `mailto:kwasyamzi@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // 🔹 PRO UI STYLES
  const styles = {
    container: {
      maxWidth: "650px",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif"
    },
    title: {
      textAlign: "center",
      fontSize: "30px",
      color: "#ff7a00",
      fontWeight: "bold",
      marginBottom: "15px"
    },
    pinBox: {
      textAlign: "center",
      marginTop: "20px"
    },
    pinInput: {
      padding: "12px",
      width: "60%",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "10px",
      textAlign: "center",
      fontSize: "16px"
    },
    button: {
      width: "100%",
      padding: "15px",
      background: "#ff7a00",
      border: "none",
      color: "#fff",
      fontSize: "18px",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "10px"
    },
    stepCard: {
      background: "#fafafa",
      padding: "12px",
      marginBottom: "8px",
      borderRadius: "8px",
      borderLeft: "4px solid #ff7a00",
      fontSize: "15px"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>MS Word Assignment</h2>

      {/* PIN LOGIN */}
      {!unlocked && (
        <div style={styles.pinBox}>
          <p>Please enter the PIN to view the assignment</p>
          <input
            type="password"
            placeholder="Enter PIN"
            style={styles.pinInput}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button style={styles.button} onClick={unlock}>
            Unlock
          </button>
        </div>
      )}

      {/* ASSIGNMENT CONTENT */}
      {unlocked && (
        <>
          <h3 style={{ marginBottom: "12px" }}>{assignment.title}</h3>

          {assignment.steps.map((step, i) => (
            <div key={i} style={styles.stepCard}>
              <strong>Step {i + 1}:</strong> {step}
            </div>
          ))}

<a>Note that the projects that was given to make non-computer based works have been recorded. A few student submitted their work. The remaining have a pending status. Thanks for your contribution to do projects given to you.</a>


          <button style={styles.button} onClick={submitAssignment}>
            Submit Assignment
          </button>
        </>
      )}
    </div>
  );
}