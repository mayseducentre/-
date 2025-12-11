import React, { useEffect, useState } from "react";

export default function HomeBanner() {
  // Inline JSON content
  const content = {
    greeting: "Akwaaba",
    announcement:
      ".",
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo",
  };

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Styles
  const container = {
    width: "100%",
    minHeight: "65vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    backgroundColor: "#071028",
  };

  const bgImage = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.45) contrast(1.05)",
    transform: "scale(1.03)",
    zIndex: 1,
  };

  const goldAccent = {
    position: "absolute",
    left: 30,
    top: "24%",
    width: 6,
    height: "48%",
    background: "linear-gradient(180deg,#f5c243,#c98f00)",
    borderRadius: 6,
    zIndex: 3,
    boxShadow: "0 6px 20px rgba(201,143,0,0.25)",
  };

  const card = {
    position: "relative",
    zIndex: 4,
    maxWidth: 1100,
    width: "92%",
    padding: "48px 40px",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(6px)",
    background: "rgba(6,12,28,0.45)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
    transform: visible ? "translateY(0)" : "translateY(30px)",
    opacity: visible ? 1 : 0,
    transition: "all 650ms cubic-bezier(.2,.9,.26,1)",
  };

  const greetingStyle = {
    fontSize: 62,
    fontWeight: 800,
    margin: 0,
    letterSpacing: "1px",
    textShadow: "0 6px 20px rgba(0,0,0,0.7)",
    fontFamily: "Georgia, 'Times New Roman', serif",
  };

  const announcementStyle = {
    marginTop: 20,
    fontSize: 20,
    color: "#f5d88b",
    fontWeight: 500,
    lineHeight: 1.5,
    maxWidth: 800,
  };

  return (
    <header style={container}>
      <img src={content.image} alt="banner" style={bgImage} />
      <div style={goldAccent} />
      <section style={card}>
        <h1 style={greetingStyle}>{content.greeting}</h1>
        {content.announcement && (
          <p style={announcementStyle}>{content.announcement}</p>
        )}
      </section>
    </header>
  );
}