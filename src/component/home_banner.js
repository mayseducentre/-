import React, { useEffect, useRef, useState } from "react";

export default function HomeBanner() {
  // JSON config for media
  const banner = {
    media: {
      type: "image", // "image" or "video"
      src: "https://lh3.googleusercontent.com/pw/AP1GczOFnAZ5EIPXnWjw8G3-Yq1BBB8YalFVf6uL3YkcdolW6sSKa-i9xA-bX_xqPFN2c-meb6hsp9mru9-3NRF_DPpNJLRRlLs7BSzbTWMmjZe1sZuvCPg",
      poster:
        "https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo",
    },
    tag: "AKWAABA",
    title: "Welcome to Mays Educational Centre",
    subtitle:
      "A private luxury learning environment built on excellence, discipline and future-ready skills.",
    button: "Learn More",
    link:"/#about"
  };

  const mediaRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    if (banner.media.type === "image") {
      if (media.complete && media.naturalWidth !== 0) {
        const t = setTimeout(() => setLoaded(true), 30);
        return () => clearTimeout(t);
      }
      const onLoad = () => {
        const t = setTimeout(() => setLoaded(true), 30);
        media.removeEventListener("load", onLoad);
        return () => clearTimeout(t);
      };
      media.addEventListener("load", onLoad);
      return () => media.removeEventListener("load", onLoad);
    } else if (banner.media.type === "video") {
      const onCanPlay = () => {
        const t = setTimeout(() => setLoaded(true), 30);
        media.removeEventListener("canplay", onCanPlay);
        return () => clearTimeout(t);
      };
      media.addEventListener("canplay", onCanPlay);
      return () => media.removeEventListener("canplay", onCanPlay);
    }
  }, [banner.media.type]);

  const wrapper = {
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
    overflow: "hidden",
    position: "relative",
  };

  const mediaBox = {
    width: "100%",
    height: 280,
    overflow: "hidden",
    position: "relative",
  };

  const mediaStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    willChange: "transform, opacity",
    opacity: loaded ? 1 : 0,
    transform: loaded ? "scale(1.03) translateX(0)" : "scale(1.12) translateX(-3%)",
    transition: "opacity 600ms ease, transform 8s cubic-bezier(.2,.8,.2,.99)",
    transformOrigin: "center center",
  };

  const overlay = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35))",
    pointerEvents: "none",
  };

  const card = {
    width: "92%",
    maxWidth: "760px",
    margin: "auto",
    backgroundColor: "rgba(15, 16, 20, 0.92)",
    padding: "26px",
    borderRadius: "10px",
    boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
    marginTop: "-60px",
    position: "relative",
    color: "#fff",
    zIndex: 2,
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
      <div style={mediaBox}>
        {banner.media.type === "image" ? (
          <img
            ref={mediaRef}
            src={banner.media.src}
            alt="Banner"
            style={mediaStyle}
          />
        ) : (
          <video
            ref={mediaRef}
            src={banner.media.src}
            poster={banner.media.poster}
            style={mediaStyle}
            autoPlay
            muted
            loop
          />
        )}
        <div style={overlay}></div>
      </div>

      <div style={card}>
        <div style={tag}>{banner.tag}</div>
        <div style={title}>{banner.title}</div>
        <div style={subtitle}>{banner.subtitle}</div>
        <button style={buttonStyle}><a href={banner.link} style={{color:"white"}}>{banner.button}</a></button>
      </div>
    </div>
  );
}