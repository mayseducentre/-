import React, { useEffect, useState } from "react";

export default function HomeBanner() {

  // Inline JSON content
  const content = {
    title: "Welcome to",
    schoolName: "Mays Educational Centre",
    description:
      "A centre of excellence where young minds grow, explore, and achieve their greatest potential. We inspire creativity, discipline and innovation in every learner.",
    buttonText: "Explore Mays",
    image:
      "https://images.unsplash.com/photo-1600880292085-45e25e67ad6d?auto=format&fit=crop&w=1200&q=80",
  };

  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const container = {
    width: "100%",
    height: "80vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: "#0ea5e9",
    color: "white",
    fontFamily: "system-ui, sans-serif",
    textAlign: "center",
  };

  const bgImage = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.35,
    pointerEvents: "none",
  };

  const box = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: "all 0.9s ease",
    zIndex: 10,
    padding: "0 20px",
    maxWidth: "900px",
  };

  const title = {
    fontSize: 46,
    fontWeight: 700,
    margin: 0,
    textShadow: "0 4px 12px rgba(0,0,0,0.45)",
  };

  const schoolName = {
    display: "block",
    marginTop: 8,
    color: "#facc15",
    fontSize: 48,
  };

  const desc = {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 300,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.92)",
  };

  const button = {
    marginTop: 28,
    padding: "14px 28px",
    background: hover ? "#facc15" : "white",
    color: hover ? "black" : "#1e40af",
    border: "none",
    fontWeight: 700,
    fontSize: 16,
    borderRadius: 18,
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
    transition: "0.3s",
  };

  return (
    <section style={container}>
      <img src={content.image} alt="banner" style={bgImage} />

      <div style={box}>
        <h1 style={title}>
          {content.title}
          <span style={schoolName}>{content.schoolName}</span>
        </h1>

        <p style={desc}>{content.description}</p>

        <button
          style={button}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {content.buttonText}
        </button>
      </div>

      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 8,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          d="M0,224L80,202.7C160,181,320,139,480,149.3C640,160,800,224,960,240C1120,256,1280,224,1360,208L1440,192V320H0Z"
        ></path>
      </svg>
    </section>
  );
}