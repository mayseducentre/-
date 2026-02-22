import React, { useState } from "react";

export default function AssignmentHub() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // 🔹 ASSIGNMENT JSON (STRING CONTENT)
  const assignment = {
    title: "Microsoft Excel - IF Function Practice",
    content:
      "Write the correct IF formula for each of the following conditions:\n\n" +
      "1. If A1 is greater than 50, return Pass, otherwise Fail.\n" +
      "2. If B1 is less than 0, return Loss, otherwise Profit.\n" +
      "3. If C1 is equal to 100, return Correct, otherwise Wrong.\n" +
      "4. If D1 is not equal to 0, return Valid, otherwise Invalid.\n" +
      "5. If E1 is greater than or equal to 18, return Adult, otherwise Minor.\n" +
      "6. If F1 is less than 40, return Below Average, otherwise Average.\n" +
      "7. If G1 is equal to 0, return Empty, otherwise Not Empty.\n" +
      "8. If H1 is greater than 1000, return 10% bonus, otherwise 5% bonus.\n" +
      "9. If I1 is greater than 75, return Excellent, otherwise Good.\n" +
      "10. If J1 is less than or equal to 30, return Low, otherwise High."
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
      "Sir, I have completed my MS Excel IF Function assignment. Attached is my work.";

    window.location.href = `mailto:kwasyamzi@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // 🔹 STYLES
  const styles = {
    container: {
      maxWidth: "700px",
      margin: "20px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif"
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      color: "#ff7a00",
      fontWeight: "bold",
      marginBottom: "10px"
    },
    instructionBox: {
      background: "#fff3e6",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px",
      fontSize: "14px",
      borderLeft: "4px solid #ff7a00"
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
      fontSize: "16px",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "10px"
    },
    contentBox: {
      background: "#fafafa",
      padding: "15px",
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
      <h2 style={styles.title}>MS Excel Assignment</h2>

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

      {unlocked && (
        <>
          <div style={styles.instructionBox}>
            <strong>Instructions:</strong>
            <br />
            1. Write all answers in your ICT exercise book.
            <br />
            2. Write the full IF formula for each question.
            <br />
            3. Do not write only the answer — write the complete formula.
            <br />
            4. Submit your work on Wednesday 25th February 2026.
          </div>

          <h3>{assignment.title}</h3>

          <div style={styles.contentBox}>{assignment.content}</div>

          <p style={styles.note}>
            Make sure your work is neat and properly written in your exercise
            book before submission.
          </p>

          <button style={styles.button} onClick={submitAssignment}>
            Submit Assignment
          </button>
        </>
      )}
    </div>
  );
}