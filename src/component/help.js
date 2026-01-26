import { useState } from "react";

export default function HelpFAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  const styles = {
    page: {
      padding: "16px",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      background: "#f4f6f8",
      minHeight: "100vh",
    },
    header: {
      background: "#1565c0",
      color: "#fff",
      padding: "22px",
      borderRadius: "12px",
      marginBottom: "18px",
    },
    title: {
      margin: 0,
      fontSize: "22px",
    },
    subtitle: {
      marginTop: "8px",
      fontSize: "14px",
      opacity: 0.95,
    },
    faq: {
      background: "#fff",
      borderRadius: "12px",
      padding: "16px",
      marginBottom: "14px",
      boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
      cursor: "pointer",
    },
    question: {
      fontSize: "15px",
      fontWeight: "bold",
      color: "#333",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    answer: {
      marginTop: "12px",
      fontSize: "14px",
      color: "#555",
      lineHeight: 1.6,
    },
    warning: {
      background: "#fff3cd",
      borderLeft: "5px solid #ff9800",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "12px",
      fontSize: "13px",
    },
    video: {
      width: "100%",
      height: "220px",
      borderRadius: "10px",
      marginTop: "12px",
      border: "none",
    },
    contact: {
      background: "#fff",
      borderRadius: "12px",
      padding: "18px",
      marginTop: "24px",
      boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Help & Frequently Asked Questions</h2>
        <p style={styles.subtitle}>
          Clear answers and video guides to help you work confidently — online or offline.
        </p>
      </div>

      {/* FAQ 1 */}
      <div style={styles.faq} onClick={() => toggle(1)}>
        <div style={styles.question}>
          <span>How do I use the offline assessment DOCX file?</span>
          <span>{open === 1 ? "−" : "+"}</span>
        </div>
        {open === 1 && (
          <div style={styles.answer}>
            <ol>
              <li>Download the assessment DOCX file.</li>
              <li>Open it using Microsoft Word or any compatible app.</li>
              <li>Enter student scores carefully.</li>
              <li>Save the file on your device.</li>
            </ol>
            <div style={styles.warning}>
              ⚠️ This assessment docx file is <b>NOT the real system</b>. It is only for offline preparation.
            </div>
            <iframe
              style={styles.video}
              src="VIDEO_URL_HERE"
              title="Offline Assessment Guide"
            />
          </div>
        )}
      </div>

      {/* FAQ 2 */}
      <div style={styles.faq} onClick={() => toggle(2)}>
        <div style={styles.question}>
          <span>How can I copy and paste values into the real assessment system?</span>
          <span>{open === 2 ? "−" : "+"}</span>
        </div>
        {open === 2 && (
          <div style={styles.answer}>
            <ol>
              <li>Open the completed DOCX assessment file.</li>
              <li>Select and copy the required scores.</li>
              <li>Open the real Excel assessment system.</li>
              <li>Paste the values into the correct cells.</li>
            </ol>
            <iframe
              style={styles.video}
              src="VIDEO_URL_HERE"
              title="Copy Paste Assessment"
            />
          </div>
        )}
      </div>

      {/* FAQ 3 */}
      <div style={styles.faq} onClick={() => toggle(3)}>
        <div style={styles.question}>
          <span>How do I use the offline class register Excel file?</span>
          <span>{open === 3 ? "−" : "+"}</span>
        </div>
        {open === 3 && (
          <div style={styles.answer}>
            <ol>
              <li>Download and open the register Excel file.</li>
              <li>Mark students as Present or Absent.</li>
              <li>Save the file after marking attendance.</li>
            </ol>
            <div style={styles.warning}>
              ✅ This register file is the <b>ACTUAL register needed for student reports</b>.
            </div>
            <iframe
              style={styles.video}
              src="VIDEO_URL_HERE"
              title="Offline Register Guide"
            />
          </div>
        )}
      </div>

      {/* FAQ 4 */}
      <div style={styles.faq} onClick={() => toggle(4)}>
        <div style={styles.question}>
          <span>What if I select my class and subject but nothing loads?</span>
          <span>{open === 4 ? "−" : "+"}</span>
        </div>
        {open === 4 && (
          <div style={styles.answer}>
            <p>
              This usually happens when:
            </p>
            <ul>
              <li>Internet connection is weak</li>
              <li>The class or subject is not assigned to you</li>
            </ul>
            <p>
              Please refresh the page and try again. If the issue continues, contact support.
            </p>
          </div>
        )}
      </div>

      {/* FAQ 5 */}
      <div style={styles.faq} onClick={() => toggle(5)}>
        <div style={styles.question}>
          <span>Can I use the real Google Sheet assessment offline?</span>
          <span>{open === 5 ? "−" : "+"}</span>
        </div>
        {open === 5 && (
          <div style={styles.answer}>
            <p>
              No. Google Sheets require internet access.
              That is why the offline DOCX assessment file is provided.
            </p>
          </div>
        )}
      </div>

      {/* FAQ 6 */}
      <div style={styles.faq} onClick={() => toggle(6)}>
        <div style={styles.question}>
          <span>Why does Google Sheet say “Request Access”?</span>
          <span>{open === 6 ? "−" : "+"}</span>
        </div>
        {open === 6 && (
          <div style={styles.answer}>
            <p>
              This means your email does not yet have permission.
              Please request access or contact the administrator to grant you access.
            </p>
          </div>
        )}
      </div>

      {/* FAQ 7 */}
      <div style={styles.faq} onClick={() => toggle(7)}>
        <div style={styles.question}>
          <span>Does the webapp consume a lot of data?</span>
          <span>{open === 7 ? "−" : "+"}</span>
        </div>
        {open === 7 && (
          <div style={styles.answer}>
            <p>
              No. The webapp is optimized to use very little data.
              Most pages load once and reuse cached data.
            </p>
          </div>
        )}
      </div>

      {/* FAQ 8 */}
      <div style={styles.faq} onClick={() => toggle(8)}>
        <div style={styles.question}>
          <span>What range of data is needed to use the webapp?</span>
          <span>{open === 8 ? "−" : "+"}</span>
        </div>
        {open === 8 && (
          <div style={styles.answer}>
            <p>
              Normal usage requires only a small amount of data (a few MBs).
              Uploading videos or files may use more data.
            </p>
          </div>
        )}
      </div>

      {/* Contact */}
      <div style={styles.contact}>
        <h3>📞 Still Need Help?</h3>
        <p>
          Phone: <b>0544066735 / 0549271528</b><br />
          Email: <b>ogyiribaah98@gmail.com / kwasyamzi@gmail.com</b>
        </p>
        <p>
          We are always ready to assist you.
        </p>
      </div>
    </div>
  );
}