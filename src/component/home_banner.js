import React from "react";

export default function HomeBanner() {
  const banner = {
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo",
    tag: "AKWAABA",
    title: "Welcome to Mays Educational Centre",
    subtitle:
      "A private luxury learning environment built on excellence, discipline and future-ready skills.",
    button: "Learn More",
  };

  const wrapper = {
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
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
  };

  const card = {
    width: "92%",
    maxWidth: "760px",
    margin: "auto",
    backgroundColor: "rgba(15, 16, 20, 0.92)", // dark card
    padding: "26px",
    borderRadius: "10px",
    boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
    marginTop: "-48px", // sits on image
    position: "relative",
  };

  const tag = {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#cbd5e1",
    marginBottom: "6px",
    letterSpacing: "1px",
  };

  const title = {
    fontSize: "clamp(1.3rem, 4vw, 2rem)",
    fontWeight: "700",
    lineHeight: "1.3em",
    marginBottom: "10px",
  };

  const subtitle = {
    fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
    lineHeight: "1.7em",
    color: "#e2e8f0",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#2563eb",
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
      {/* IMAGE */}
      <div style={imageBox}>
        <img src={banner.image} style={imageStyle} alt="School Banner" />
      </div>

      {/* DARK CARD OVER IMAGE */}
      <div style={card}>
        <div style={tag}>{banner.tag}</div>
        <div style={title}>{banner.title}</div>
        <div style={subtitle}>{banner.subtitle}</div>
        <button style={buttonStyle}>{banner.button}</button>
      </div>
    </div>
  );
}