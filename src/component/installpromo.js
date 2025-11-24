import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function InstallPromo() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // trigger fade-in effect when component mounts
  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        background: "linear-gradient(to bottom right, #fff7ed, #fef3c7)",
      }}
    >
      <div
        onClick={() => document.location.href="#/ins_guide"}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
          padding: "40px 30px",
          textAlign: "center",
          maxWidth: "480px",
          width: "100%",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.08)";
        }}
      >
        {/* Floating rocket icon */}
        <div
          style={{
            fontSize: "40px",
            animation: "float 3s ease-in-out infinite",
            marginBottom: "10px",
          }}
        >
          🚀
        </div>

        <h2 style={{ color: "#1e293b", marginBottom: "10px" }}>
          Ready to Launch?
        </h2>
        <p
          style={{
            color: "#64748b",
            fontSize: "15px",
            marginBottom: "25px",
            lineHeight: "1.6",
          }}
        >
          Follow our step-by-step Installation Guide to get MecApp set up in
          minutes.
        </p>

        <button
          style={{
            padding: "12px 20px",
            background: "linear-gradient(90deg, #f97316, #fb923c, #f97316)",
            backgroundSize: "400% 400%",
            color: "white",
            fontWeight: "600",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            animation: "gradientMove 6s ease infinite",
            width: "100%",
            maxWidth: "260px",
          }}
        >
         Install the webapp →
        </button>

        {/* Animated glowing background */}
        <div
          style={{
            content: '""',
            position: "absolute",
            top: "-20%",
            left: "-20%",
            width: "140%",
            height: "140%",
            background:
              "radial-gradient(circle at center, rgba(249,115,22,0.12), transparent 70%)",
            animation: "pulseGlow 5s ease-in-out infinite",
            zIndex: 0,
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
        `}
      </style>
    </div>
  );
}
