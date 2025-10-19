import React, { useState } from "react";

const MecAIBanner = () => {
  const [open, setOpen] = useState(false);

  const styles = {
    button: {
      position: "fixed",
      bottom: "30px",
      right: "25px",
      background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
      color: "white",
      border: "none",
      borderRadius: "50px",
      padding: "14px 24px",
      fontSize: "17px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
      animation: "bounce 2s infinite",
      transition: "transform 0.3s ease",
      zIndex: "1000",
    },
    buttonHover: {
      transform: "scale(1.1)",
    },
    overlay: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(3px)",
      zIndex: "999",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "18px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
      overflow: "hidden",
      width: "90%",
      maxWidth: "420px",
      zIndex: "1001",
      animation: "fadeIn 0.4s ease",
    },
    banner: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "rgba(255,255,255,0.8)",
      border: "none",
      borderRadius: "50%",
      padding: "6px 10px",
      cursor: "pointer",
      fontSize: "16px",
    },
    content: {
      padding: "20px",
      textAlign: "center",
    },
    heading: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#333",
    },
    text: {
      color: "#666",
      marginTop: "10px",
      fontSize: "15px",
      lineHeight: "1.5",
    },
    learnBtn: {
      background: "linear-gradient(90deg, #6366f1, #a855f7)",
      color: "white",
      border: "none",
      borderRadius: "30px",
      padding: "10px 20px",
      fontSize: "15px",
      marginTop: "15px",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      transition: "opacity 0.3s ease",
    },
  };

  return (
    <>
      {/* Floating Button */}
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={() => setOpen(true)}
      >
        🚀 Explore MEC AI
      </button>

      {/* Modal */}
      {open && (
        <>
          <div style={styles.overlay} onClick={() => setOpen(false)}></div>
          <div style={styles.modal}>
            <div style={{ position: "relative" }}>
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczNermM-f3HxJvCB44F3AmU131KhZi9RnwZ5jY7fG_vMz1BwGlW4fv5WgXghGkbtjwzKToC9gxuUeSx5SiojyaK0osv_jxJ0A74GsfoK21G1F_P2Aww"
                alt="MEC AI Banner"
                style={styles.banner}
              />
              <button style={styles.closeBtn} onClick={() => setOpen(false)}>
                ✖
              </button>
            </div>
            <div style={styles.content}>
              <h2 style={styles.heading}>Meet MEC AI 🤖</h2>
              <p style={styles.text}>
                Discover the power of smart technology designed to make learning
                and innovation easier for everyone.
              </p>
              <button
                style={styles.learnBtn}
                onClick={() => document.location.href="/mecai"}
              >
                Explore
              </button>
            </div>
          </div>
        </>
      )}

      {/* Keyframe Animations */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
          }
          @keyframes fadeIn {
            from {opacity: 0; transform: translate(-50%, -45%);}
            to {opacity: 1; transform: translate(-50%, -50%);}
          }
        `}
      </style>
    </>
  );
};

export default MecAIBanner;
