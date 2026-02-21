import React, { useState } from "react";

export default function AssignmentHub() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // 🔹 SIMPLE JSON WITH ASSIGNMENT CONTENT (STRING)
  const assignment = {
    title: "Microsoft Excel - IF Function Practice",
    content:
      "If A1 is greater than 50, return Pass, otherwise Fail.\n" +
      "If B1 is less than 0, return Loss, otherwise Profit.\n" +
      "If C1 is equal to 100, return Correct, otherwise Wrong.\n" +
      "If D1 is not equal to 0, return Valid, otherwise Invalid.\n" +
      "If E1 is greater than or equal to 18, return Adult, otherwise Minor.\n" +
      "If F1 is less than 40, return Below Average, otherwise Average.\n" +
      "If G1 is equal to 0, return Empty, otherwise Not Empty.\n" +
      "If H1 is greater than 1000, return 10% bonus, otherwise 5% bonus.\n" +
      "If I1 is greater than 75, return Excellent, otherwise Good.\n" +
      "If J1 is less than or equal to 30, return Low, otherwise High."
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
    const body =
      "Sir, I have completed my MS Excel assignment. Attached is my work.";

    window.location.href = `mailto:kwasyamzi@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // 🔹 STYLES
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
    contentBox: {
      background: "#fafafa",
      padding: "12px",
      borderRadius: "8px",
      borderLeft: "4px solid #ff7a00",
      fontSize: "15px",
      whiteSpace: "pre-line"
    },
    note: {
      marginTop: "15px",
      fontStyle: "italic",
      fontSize: "14px"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Assignment Hub</h2>

      {/* PIN LOGIN */}
      {!unlocked && (
        <div style={styles.pinBox}>
          <p>Please enter the PIN to view assignment</p>
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

          <div style={styles.contentBox}>{assignment.content}</div>

          <p style={styles.note}>
            Make sure to complete and submit your assignment on time.
          </p>

          <button style={styles.button} onClick={submitAssignment}>
            Submit Assignment
          </button>
        </>
      )}
    </div>
  );
}