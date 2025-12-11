import React from "react";

export default function HomeBanner() {
  // INLINE JSON DATA
  const banner = {
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo",
    title: "Akwaaba to Mays Educational Centre",
    subtitle:
      "A private luxury school that inspires excellence, confidence, and great futures.",
    button: "Discover Mays",
  };

  // STYLES
  const wrapper = {
    width: "100%",
    position: "relative",
    fontFamily: "Segoe UI, sans-serif",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    display: "block",
  };

  const gradientOverlay = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "340px",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.65))",
  };

  const card = {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "92%",
    maxWidth: "720px",
    backgroundColor: "#2d2d2de6",
    color: "white",
    padding: "22px",
    borderRadius: "8px",
    backdropFilter: "blur(6px)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    animation: "fadeIn 1s ease-out",
  };

  const welcomeText = {
    fontSize: "0.85rem",
    fontWeight: "600",
    opacity: 0.85,
    marginBottom: "6px",
  };

  const title = {
    fontSize: "clamp(1.3rem, 4vw, 2rem)",
    fontWeight: "700",
    lineHeight: "1.3em",
    marginBottom: "10px",
  };

  const subtitle = {
    fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
    lineHeight: "1.5em",
    opacity: 0.9,
    marginBottom: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#4A90E2",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={wrapper}>
      {/* Banner Image */}
      <img src={banner.image} alt="Banner" style={imageStyle} />

      {/* Gradient */}
      <div style={gradientOverlay}></div>

      {/* Text Card */}
      <div style={card}>
        <div style={welcomeText}>WELCOME</div>

        <div style={title}>{banner.title}</div>

        <div style={subtitle}>{banner.subtitle}</div>

        <button style={buttonStyle}>{banner.button}</button>
      </div>
    </div>
  );
}