import React from "react";

export default function HomeBanner() {
  // INLINE JSON DATA
  const banner = {
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo",
    title: "Akwaaba to Mays Educational Centre",
    subtitle:
      "A private luxury school inspiring excellence, confidence, and a bright future.",
    button: "Explore More",
  };

  // STYLES
  const wrapper = {
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    color: "#1a1a1a",
  };

  const imageBox = {
    width: "100%",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    display: "block",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  };

  const card = {
    width: "92%",
    maxWidth: "750px",
    margin: "auto",
    marginTop: "-40px", // Lifts card upward like JW.org
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  };

  const tag = {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "6px",
  };

  const title = {
    fontSize: "clamp(1.3rem, 4vw, 2rem)",
    fontWeight: "700",
    lineHeight: "1.3em",
    marginBottom: "10px",
  };

  const subtitle = {
    fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
    lineHeight: "1.6em",
    color: "#4b5563",
    marginBottom: "18px",
  };

  const buttonStyle = {
    backgroundColor: "#1e3a8a",
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
      {/* IMAGE SECTION */}
      <div style={imageBox}>
        <img src={banner.image} alt="Banner" style={imageStyle} />
      </div>

      {/* CARD CONTENT BELOW IMAGE */}
      <div style={card}>
        <div style={tag}>WELCOME</div>

        <div style={title}>{banner.title}</div>

        <div style={subtitle}>{banner.subtitle}</div>

        <button style={buttonStyle}>{banner.button}</button>
      </div>
    </div>
  );
}