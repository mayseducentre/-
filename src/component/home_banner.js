import React from "react";

const bannerData = {
  type: "image", // change to "video" anytime
  src: "https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo",
  title: "Excellence in Learning",
  subtitle: "Inspiring the next generation"
};

export default function HomeBanner() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        overflow: "hidden",
      }}
    >
      
      {/* IMAGE OR VIDEO */}
      {bannerData.type === "image" ? (
        <img
          src={bannerData.src}
          alt="Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(75%)",
            animation: "zoomInOut 12s ease-in-out infinite",
          }}
        />
      ) : (
        <video
          src={bannerData.src}
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(75%)",
            animation: "zoomInOut 12s ease-in-out infinite",
          }}
        />
      )}

      {/* DARK OVERLAY CARD */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.55)",
          padding: "20px 30px",
          borderRadius: "16px",
          backdropFilter: "blur(6px)",
          color: "white",
          textAlign: "center",
          width: "85%",
          maxWidth: "550px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          animation: "fadeUp 1.5s ease",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          {bannerData.title}
        </h2>

        <p
          style={{
            marginTop: "10px",
            fontSize: "16px",
            opacity: 0.9,
          }}
        >
          {bannerData.subtitle}
        </p>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes zoomInOut {
            0% { transform: scale(1); }
            50% { transform: scale(1.06); }
            100% { transform: scale(1); }
          }

          @keyframes fadeUp {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            100% { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </div>
  );
}