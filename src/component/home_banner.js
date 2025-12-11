import React, { useEffect, useRef, useState } from "react";

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

  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // If image was cached and already complete, trigger animation
    const img = imgRef.current;
    if (!img) return;

    if (img.complete && img.naturalWidth !== 0) {
      // run in next tick so transition has effect
      const t = setTimeout(() => setLoaded(true), 30);
      return () => clearTimeout(t);
    }

    // otherwise attach handler
    const onLoad = () => {
      // small delay so transition occurs smoothly
      const t = setTimeout(() => setLoaded(true), 30);
      // cleanup timeout if needed
      img.removeEventListener("load", onLoad);
      return () => clearTimeout(t);
    };
    img.addEventListener("load", onLoad);

    // cleanup if component unmounts
    return () => img.removeEventListener("load", onLoad);
  }, []);

  const wrapper = {
    width: "100%",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
    overflow: "hidden",
  };

  const imageBox = {
    width: "100%",
    height: 260,
    overflow: "hidden",
    position: "relative",
  };

  // Animated image: starts zoomed-in and slightly offset, then eases to final subtle zoom+pan
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    willChange: "transform, opacity",
    opacity: loaded ? 1 : 0,
    // final transform includes a tiny pan (translateX) + small zoom
    transform: loaded ? "scale(1.03) translateX(0)" : "scale(1.12) translateX(-3%)",
    transition: "opacity 600ms ease, transform 7.5s cubic-bezier(.2,.8,.2,.99)",
    transformOrigin: "center center",
  };

  const card = {
    width: "92%",
    maxWidth: "760px",
    margin: "auto",
    backgroundColor: "rgba(15, 16, 20, 0.92)",
    padding: "26px",
    borderRadius: "10px",
    boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
    marginTop: "-48px",
    position: "relative",
    color: "#fff",
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
      <div style={imageBox}>
        <img
          ref={imgRef}
          src={banner.image}
          style={imageStyle}
          alt="School Banner"
          // keep onLoad as fallback (useful in some browsers)
          onLoad={() => {
            // ensure we trigger loaded if for some reason the effect didn't
            if (!loaded) setTimeout(() => setLoaded(true), 20);
          }}
        />
      </div>

      <div style={card}>
        <div style={tag}>{banner.tag}</div>
        <div style={title}>{banner.title}</div>
        <div style={subtitle}>{banner.subtitle}</div>
        <button style={buttonStyle}>{banner.button}</button>
      </div>
    </div>
  );
}