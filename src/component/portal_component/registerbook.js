import React from "react";

// Excel register download link (replace with your real file path)
const EXCEL_URL = "/ClassRegister.xlsx";
const ADMIN_EMAIL = "educationalcentremays@gmail.com";
const WHATSAPP_NUMBER = "233549271528"; // replace with admin WhatsApp number

export default function AttendanceRegister() {
  const downloadExcel = () => {
    window.open(EXCEL_URL, "_blank");
  };

  const sendEmail = () => {
    const subject = "Completed Attendance Register";
    const body = `Dear Admin,\n\nPlease find attached the completed attendance register.\n\nThank you.`;
    window.open(`mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const sendWhatsApp = () => {
    const message = "Dear Admin, I have completed the attendance register. Please check your email or contact me for the file.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.header}>Attendance Register</h2>

        <p style={styles.intro}>
          Download the Excel register, fill it offline, and submit to the admin.
        </p>

        <button onClick={downloadExcel} style={styles.primaryButton}>
          Download Excel Register
        </button>

        <button onClick={sendEmail} style={styles.secondaryButton}>
          Send via Email
        </button>

        <button onClick={sendWhatsApp} style={styles.secondaryButton}>
          Send via WhatsApp
        </button>

        <div style={styles.notice}>
          ⚠ Remember to attach the completed Excel file when sending via email or WhatsApp.
        </div>
      </div>

      {/* FAQ Section */}
      <div style={styles.faqBox}>
        <h3 style={styles.faqHeader}>Frequently Asked Questions (FAQ)</h3>

        <p>
          <strong>Q1: How do I use the Excel register?</strong><br />
          Click "Download Excel Register", open it on your device, fill attendance offline, and save your changes.
        </p>

        <p>
          <strong>Q2: How do I submit the completed register?</strong><br />
          Use the "Send via Email" button to open your email client and attach the file. Or use the "Send via WhatsApp" button to notify the admin. Always attach the Excel file.
        </p>

        <p>
          <strong>Q3: Can I work offline?</strong><br />
          Yes. Once downloaded, the Excel file can be used offline. Internet is only needed for sending the file via email or WhatsApp.
        </p>

        <p>
          <strong>Q4: Can multiple teachers edit the same register?</strong><br />
          No. Each class should have a single teacher responsible to prevent conflicts.
        </p>

        <p>
          <strong>Q5: What if I make a mistake in the Excel file?</strong><br />
          Correct the file offline, save it, and submit the updated version.
        </p>

        <p>
          <strong>Q6: How do I prepare for inspection?</strong><br />
          Keep a backup of the completed Excel file. Submit the same file to the admin for archiving or inspection.
        </p>

        <p>
          <strong>Q7: What if I forget to attach the file?</strong><br />
          Double-check before sending. The admin cannot process attendance without the Excel file.
        </p>

        <p>
          <strong>Q8: Is internet required to download the Excel file?</strong><br />
          Yes, the initial download requires internet. After that, you can work offline completely.
        </p>

        <p>
          <strong>Q9: How do I protect the formulas in the Excel register?</strong><br />
          1. The Excel register is pre-configured so all formula cells are <strong>locked and protected</strong>. You can only edit the attendance cells (where you mark / for present and - for absent).<br />
          2. Do <strong>not try to delete or edit formula cells</strong>, as this may break automatic calculations for totals, percentages, and attendance scores.<br />
          3. Always use the designated cells for entering attendance to ensure formulas remain intact.
        </p>

        <p>
          <strong>Q10: What if I accidentally change a formula?</strong><br />
          1. Close the file without saving changes if possible, then reopen the original downloaded file.<br />
          2. If changes were saved, download a fresh copy of the Excel register from the portal and continue marking attendance.<br />
          3. Always keep a backup of the original Excel file before editing.
        </p>

        <p>
          <strong>Q11: Can I add new rows or columns?</strong><br />
          Avoid adding rows or columns in the middle of the register, as formulas may not automatically extend to new cells. If you need to add students, request an updated Excel file from the admin.
        </p>

        <p>
          <strong>Q12: How do I know which cells are safe to edit?</strong><br />
          Editable cells are usually <strong>highlighted with a light fill color</strong> (e.g., light yellow). All other cells contain formulas and are locked. Only mark attendance in the highlighted cells.
        </p>
      </div>
    </div>
  );
}

// Inline CSS
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2f4f7",
    padding: 20,
    fontFamily: "Segoe UI, Calibri, sans-serif"
  },
  card: {
    maxWidth: 580,
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: 14,
    padding: 28,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  header: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 22
  },
  intro: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginBottom: 20
  },
  primaryButton: {
    width: "100%",
    padding: 16,
    fontSize: 16,
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    marginBottom: 12
  },
  secondaryButton: {
    width: "100%",
    padding: 14,
    fontSize: 14,
    background: "#f8f9fa",
    color: "#1a73e8",
    border: "1px solid #1a73e8",
    borderRadius: 10,
    cursor: "pointer",
    marginBottom: 12
  },
  notice: {
    marginTop: 12,
    fontSize: 12,
    color: "#a00",
    textAlign: "center"
  },
  faqBox: {
    maxWidth: 740,
    margin: "40px auto 0",
    background: "#ffffff",
    padding: 28,
    borderRadius: 14
  },
  faqHeader: {
    marginBottom: 16,
    fontSize: 20
  }
};