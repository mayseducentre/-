import Breadcrumb from "../component/breadcrumb";
import Header from "../component/header";

export default function VRTour() {
  return (
    <>
      <Header />
      <Breadcrumb title="IMMERSIVE LEARNING" />

      <div style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}>
        <h1 style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "700",
          color: "#ff6600",
          marginBottom: "10px"
        }}>Explore MEC in Immersive VR</h1>

        <p style={{
          textAlign: "center",
          fontSize: "1rem",
          lineHeight: "1.6",
          marginBottom: "30px"
        }}>
          Dive into a fully immersive learning experience. Use a VR headset for the best results.
          Please be patient if the VR Tour takes a while to load. Reload the page if necessary.
        </p>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#ff6600",
              color: "#fff",
              border: "none",
              padding: "12px 40px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#e65500"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#ff6600"}
          >
            Reload VR Tour
          </button>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <iframe
            width="100%"
            height="500"
            style={{
              maxWidth: "900px",
              borderRadius: "12px",
              border: "2px solid #ff6600",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
            }}
            src="https://www.artsteps.com/embed/672ce86e350c3accd3d41f8e/560/315"
            frameBorder="0"
            allowFullScreen
            title="MEC VR Tour"
          ></iframe>
        </div>

        <p style={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "0.9rem",
          color: "#666"
        }}>
          Tip: For best experience, use a VR headset or a full-screen mode on desktop.
        </p>
      </div>
    </>
  );
}