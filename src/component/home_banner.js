import React, { useEffect, useState } from "react";

export default function HomeBanner() {
  // editable inline JSON content
  const content = {
    title: "Welcome to",
    schoolName: "Mays Educational Centre",
    tagline: "Excellence • Character • Leadership",
    description:
      "Cultivating confident, curious learners with a tradition of academic excellence and personal integrity.",
    ctaText: "Discover Our Programs",
    // your provided image (use a high-res school photo or replace this URL)
    image:
      "https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo",
    imageAlt: "Students at Mays Educational Centre",
  };

  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 180);
    return () => clearTimeout(t);
  }, []);

  // layout container
  const container = {
    width: "100%",
    minHeight: "68vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, serif",
    backgroundColor: "#071028", // fallback
  };

  // background image with dark overlay and subtle vignette
  const bgImage = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scale(1.03)",
    filter: "brightness(0.48) contrast(1.03)",
    zIndex: 1,
    pointerEvents: "none",
  };

  // elegant gold accent bar (left)
  const goldAccent = {
    position: "absolute",
    left: 32,
    top: "25%",
    width: 6,
    height: "45%",
    background: "linear-gradient(180deg,#f5c243,#c98f00)",
    borderRadius: 6,
    zIndex: 3,
    boxShadow: "0 6px 20px rgba(201,143,0,0.25)",
  };

  // content card
  const card = {
    position: "relative",
    zIndex: 4,
    maxWidth: 1100,
    width: "92%",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: 28,
    alignItems: "center",
    padding: "48px 40px",
    background: "linear-gradient(180deg, rgba(3,10,26,0.36), rgba(3,10,26,0.22))",
    borderRadius: 14,
    boxShadow: "0 10px 40px rgba(2,8,20,0.6)",
    transform: visible ? "translateY(0)" : "translateY(30px)",
    opacity: visible ? 1 : 0,
    transition: "all 600ms cubic-bezier(.2,.9,.26,1)",
    backdropFilter: "blur(6px)",
  };

  // responsive adjustments for small screens
  const cardMobile = {
    gridTemplateColumns: "1fr",
    padding: "34px 20px",
  };

  const titleStyle = {
    margin: 0,
    fontSize: 20,
    letterSpacing: "1px",
    fontWeight: 600,
    color: "#dbeafe", // soft bluish
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
  };

  const schoolStyle = {
    marginTop: 8,
    fontSize: 42,
    lineHeight: 1.02,
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.5px",
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    textShadow: "0 6px 18px rgba(2,6,23,0.6)",
  };

  const tagline = {
    marginTop: 8,
    fontSize: 14,
    color: "#f5d88b",
    fontWeight: 600,
    letterSpacing: "0.6px",
  };

  const desc = {
    marginTop: 18,
    fontSize: 16,
    color: "rgba(255,255,255,0.88)",
    lineHeight: 1.7,
    maxWidth: 620,
    fontWeight: 300,
  };

  const ctaBase = {
    marginTop: 22,
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 20px",
    background: hover ? "#f5d88b" : "transparent",
    color: hover ? "#071028" : "#f5d88b",
    border: hover ? "none" : "1px solid rgba(245,216,139,0.9)",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: hover ? "0 10px 30px rgba(245,216,139,0.18)" : "none",
    transition: "all 180ms ease",
  };

  // photo pane (right)
  const photoPane = {
    width: "100%",
    height: 320,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(2,8,23,0.55)",
    border: "1px solid rgba(255,255,255,0.06)",
    backgroundColor: "#0b1220",
  };

  const photoImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  // small responsive tweaks using JS — apply conditional style
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 820 : false;
  const finalCardStyle = Object.assign({}, card, isMobile ? cardMobile : {});

  return (
    <header style={container} aria-label="Mays Educational Centre banner">
      <img src={content.image} alt={content.imageAlt || "School image"} style={bgImage} />
      <div style={goldAccent} aria-hidden="true" />

      <main style={finalCardStyle}>
        {/* left column: text */}
        <div>
          <p style={titleStyle}>{content.title}</p>
          <h2 style={schoolStyle}>{content.schoolName}</h2>
          <div style={tagline}>{content.tagline}</div>
          <p style={desc}>{content.description}</p>

          <button
            type="button"
            style={ctaBase}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
              // safe action: if JS environment present, scroll to next section
              if (typeof window !== "undefined") {
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
              }
            }}
            aria-label={content.ctaText}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 12h18" stroke={hover ? "#071028" : "#f5d88b"} strokeWidth="2" strokeLinecap="round" />
              <path d="M15 6l6 6-6 6" stroke={hover ? "#071028" : "#f5d88b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {content.ctaText}
          </button>
        </div>

        {/* right column: photo */}
        <figure style={photoPane} aria-hidden="false">
          <img src={content.image} alt={content.imageAlt || "Students at school"} style={photoImg} />
        </figure>
      </main>

      {/* subtle decorative bottom wave (low-contrast) */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 2 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        aria-hidden="true"
      >
        <path fill="#061224" d="M0,64L120,58.7C240,53,480,43,720,45.3C960,48,1200,64,1320,72.0L1440,80V120H0Z"></path>
      </svg>
    </header>
  );
}