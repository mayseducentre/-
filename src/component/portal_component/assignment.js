import React, { useState } from "react";

export default function AssignmentHub() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // 🔹 ONLY MS WORD ASSIGNMENT
  const assignment = {
    title: "Microsoft Excel",
    steps: "If A1 is greater than 50, return Pass, otherwise Fail.
      If B1 is less than 0, return Loss, otherwise Profit.
      If C1 is equal to 100, return Correct, otherwise Wrong.
      If D1 is not equal to 0, return Valid, otherwise Invalid.
      If E1 is greater than or equal to 18, return Adult, otherwise Minor.
      If F1 is less than 40, return Below Average, otherwise Average.
      If G1 is 0, return Empty, otherwise Not Empty.
      If H1 is above 1000, return 10% bonus, otherwise 5% bonus.
      If I1 contains a value greater than 75, return Excellent. Otherwise return Good.
      If J1 is less than or equal to 30, return Low, otherwise High."
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

<a>Make sure to do this assignment in your exercise and submit on Wednesday 25th 2025.</a>


          <button style={styles.button} onClick={submitAssignment}>
            Submit Assignment
          </button>
        </>
      )}
    </div>
  );
}