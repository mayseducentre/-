import React, { useState } from "react";

export default function AssignmentHub() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // 🔹 PROFESSIONAL PRACTICAL PROJECT
  const assignment = {
    title: "COMPUTER PRACTICAL PROJECT – MICROSOFT EXCEL (50 MARKS)",
    content:
      "PROJECT TITLE: SCHOOL ADMINISTRATION MANAGEMENT SYSTEM\n\n" +

      "You are required to use Microsoft Excel on a computer (PC) to design a professional spreadsheet for managing student academic and financial records.\n\n" +

      "=============================================\n" +
      "PART A: STUDENT ACADEMIC RECORD (20 MARKS)\n" +
      "=============================================\n\n" +

      "1. Create the following column headings:\n" +
      "Student Name | English | Mathematics | Science | Social Studies | Total | Average | Grade | Remark | Position\n\n" +

      "2. Enter records for 10 students.\n\n" +

      "3. Use appropriate formulas to:\n" +
      "   a) Calculate Total (SUM function).\n" +
      "   b) Calculate Average (AVERAGE function).\n" +
      "   c) Assign Grade using IF function:\n" +
      "      80–100 = A\n" +
      "      70–79 = B\n" +
      "      60–69 = C\n" +
      "      50–59 = D\n" +
      "      Below 50 = F\n\n" +

      "4. Use IF function to generate Remark:\n" +
      "   - If Average >= 50 → 'Pass'\n" +
      "   - Otherwise → 'Fail'\n\n" +

      "5. Use RANK function to determine student Position based on Average.\n\n" +

      "6. Apply Conditional Formatting:\n" +
      "   - Highlight Fail students in red.\n" +
      "   - Highlight highest Average in green.\n\n" +

      "7. Insert a Column Chart showing student averages.\n\n" +

      "=============================================\n" +
      "PART B: SCHOOL FEES MANAGEMENT (15 MARKS)\n" +
      "=============================================\n\n" +

      "1. Create a new worksheet named 'Fees'.\n\n" +

      "2. Create the following columns:\n" +
      "Student Name | Class | Total Fees (GHS) | Amount Paid (GHS) | Balance | Payment Status\n\n" +

      "3. Enter 8 students with realistic fee values.\n\n" +

      "4. Calculate Balance using formula:\n" +
      "   Balance = Total Fees - Amount Paid\n\n" +

      "5. Use IF function to determine Payment Status:\n" +
      "   - If Balance = 0 → 'Fully Paid'\n" +
      "   - If Balance > 0 → 'Owing'\n\n" +

      "6. Use SUM function to calculate:\n" +
      "   - Total Fees Collected\n" +
      "   - Total Outstanding Balance\n\n" +

      "7. Apply currency formatting (GHS).\n\n" +

      "8. Insert a Pie Chart showing distribution of Amount Paid.\n\n" +

      "=============================================\n" +
      "PART C: DATA FORMATTING & PROFESSIONAL DESIGN (10 MARKS)\n" +
      "=============================================\n\n" +

      "1. Merge and center a suitable title for each worksheet.\n" +
      "2. Bold all headings.\n" +
      "3. Apply borders to tables.\n" +
      "4. Adjust column widths properly.\n" +
      "5. Use proper number formatting.\n" +
      "6. Apply Table formatting style.\n\n" +

      "=============================================\n" +
      "PART D: ADVANCED FEATURES (5 MARKS)\n" +
      "=============================================\n\n" +

      "1. Use Data Validation to restrict marks between 0 and 100.\n" +
      "2. Freeze top row.\n" +
      "3. Sort students from highest to lowest Average.\n" +
      "4. Rename worksheets appropriately.\n\n" +

      "=============================================\n" +
      "SUBMISSION INSTRUCTIONS\n" +
      "=============================================\n\n" +

      "• Save your file as: School_Management_System.xlsx\n" +
      "• Ensure all formulas are working correctly.\n" +
      "• Do not type answers manually — use formulas.\n" +
      "• Submit the softcopy before the deadline.\n\n" +

      "TOTAL MARKS: 50"
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
    const subject = "Excel Practical Project Submission";
    const body =
      "Sir, I have completed the Excel Practical Project. Please find my attached file.";

    window.location.href = `mailto:kwasyamzi@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // 🔹 STYLES
  const styles = {
    container: {
      maxWidth: "900px",
      margin: "20px auto",
      padding: "25px",
      background: "#ffffff",
      borderRadius: "15px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif"
    },
    title: {
      textAlign: "center",
      fontSize: "26px",
      color: "#003366",
      fontWeight: "bold",
      marginBottom: "15px"
    },
    pinBox: {
      textAlign: "center",
      marginTop: "20px"
    },
    pinInput: {
      padding: "12px",
      width: "50%",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "10px",
      textAlign: "center",
      fontSize: "16px"
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "#003366",
      border: "none",
      color: "#fff",
      fontSize: "16px",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px"
    },
    contentBox: {
      background: "#f4f7fa",
      padding: "20px",
      borderRadius: "10px",
      borderLeft: "6px solid #003366",
      fontSize: "14px",
      whiteSpace: "pre-line"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>MS Excel Practical Examination Portal</h2>

      {!unlocked && (
        <div style={styles.pinBox}>
          <p>Enter Examination PIN to Access Project</p>
          <input
            type="password"
            placeholder="Enter PIN"
            style={styles.pinInput}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button style={styles.button} onClick={unlock}>
            Unlock Examination
          </button>
        </div>
      )}

      {unlocked && (
        <>
          <h3>{assignment.title}</h3>
          <div style={styles.contentBox}>{assignment.content}</div>

          <button style={styles.button} onClick={submitAssignment}>
            Submit Practical Project
          </button>
        </>
      )}
    </div>
  );
}