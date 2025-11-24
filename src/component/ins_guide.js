import Breadcrumb from "./breadcrumb";
import Footer from "./footer";
import Header from "./header";

export default function InsGuide() {
  return (
    <>
      <Header />
      <Breadcrumb title="Install MEC App" />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            borderRadius: "16px",
            padding: "40px 30px",
            width: "90%",
            maxWidth: "500px",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <h2 style={{ color: "#1e293b", marginBottom: "10px" }}>
            Installation Guide
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              marginBottom: "30px",
              lineHeight: "1.6",
            }}
          >
            Download the base APK file and follow the instructions to install it
            on your device.
          </p>

          {/* Animated Button */}
          <button
            onClick={() =>
              (document.location.href =
                "https://drive.google.com/file/d/1tVRy5u816IYH_hGuD80Wbj-1HYc0975h/view?usp=drivesdk")
            }
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "14px 20px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
              border: "none",
              borderRadius: "10px",
              width: "100%",
              cursor: "pointer",
              background:
                "linear-gradient(270deg, #f97316, #fb923c, #f97316)",
              backgroundSize: "400% 400%",
              animation: "gradientMove 5s ease infinite",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              boxShadow: "0 4px 10px rgba(249, 115, 22, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.04)";
              e.target.style.boxShadow = "0 8px 20px rgba(249, 115, 22, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 10px rgba(249, 115, 22, 0.3)";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1.04)";
            }}
          >
            🚀 Download Base APK
          </button>
        </div>
      </div>

      <Footer />

      {/* Inline keyframes for gradient animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </>
  );
}
