// HOME BANNER WITH INLINE JSON CONTENT + IMAGE SUPPORT (INLINE CSS ONLY) import { useEffect, useState } from "react";

export default function HomeBanner() { // Inline JSON content for easy editing 

const content = { title: "Welcome to", schoolName: "Mays Educational Centre", description: "A centre of excellence where young minds grow, explore, and achieve their greatest potential. We inspire creativity, discipline and innovation in every learner.", buttonText: "Explore Mays", image: "https://images.unsplash.com/photo-1600880292085-45e25e67ad6d?auto=format&fit=crop&w=1200&q=80", // Replace with your school banner image };

const [show, setShow] = useState(false); useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

const containerStyle = { width: "100%", height: "80vh", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", background: "#0ea5e9", color: "white", };

const bgImage = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, };

const fadeIn = { opacity: show ? 1 : 0, transform: show ? "translateY(0px)" : "translateY(40px)", transition: "all 1s ease", textAlign: "center", position: "relative", zIndex: 10, padding: "0 20px", maxWidth: "850px", };

const buttonStyle = { marginTop: "28px", padding: "14px 28px", background: "white", color: "#1e40af", fontWeight: 600, borderRadius: "18px", border: "none", cursor: "pointer", fontSize: "16px", boxShadow: "0 6px 18px rgba(0,0,0,0.25)", transition: "0.3s ease", };

const buttonHover = { background: "#facc15", color: "black", };

return ( <section style={containerStyle}> {/* Background Image */} <img src={content.image} alt="banner" style={bgImage} />

<div style={fadeIn}>
    <h1
      style={{
        fontSize: "46px",
        fontWeight: "bold",
        textShadow: "0 4px 12px rgba(0,0,0,0.45)",
      }}
    >
      {content.title}
      <span style={{ color: "#facc15", display: "block", marginTop: "8px" }}>
        {content.schoolName}
      </span>
    </h1>

    <p
      style={{
        marginTop: "14px",
        fontSize: "20px",
        fontWeight: 300,
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.92)",
      }}
    >
      {content.description}
    </p>

    <button
      style={buttonStyle}
      onMouseEnter={(e) => Object.assign(e.target.style, buttonHover)}
      onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
    >
      {content.buttonText}
    </button>
  </div>

  {/* Bottom wave */}
  <svg
    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 9 }}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="#ffffff"
      fillOpacity="1"
      d="M0,224L80,202.7C160,181,320,139,480,149.3C640,160,800,224,960,240C1120,256,1280,224,1360,208L1440,192V320H0Z"
    ></path>
  </svg>
</section>

); }