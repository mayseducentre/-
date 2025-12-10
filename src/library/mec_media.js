import React, { useState, useEffect } from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import Breadcrumb from "../component/breadcrumb";
import ScrollToTop from "react-scroll-to-top";
import MediaGallery from "../component/media";
import mediaData from "../data/mec_media.json";

function MecMedia() {
  const [media, setMedia] = useState([]);
  const [activeCategory, setActiveCategory] = useState("new");
  const [zoomImg, setZoomImg] = useState(null);

  // Determine new/old (30 days)
  function categorize(list) {
    const today = new Date();
    return list.map(item => {
      const d = new Date(item.uploaded);
      const days = Math.floor((today - d) / (86400000));
      return { ...item, category: days <= 30 ? "new" : "old" };
    });
  }

  useEffect(() => {
    setMedia(categorize(mediaData));
  }, []);

  const filtered = media.filter(
    img => activeCategory === "all" || img.category === activeCategory
  );

  return (
    <>
      <Header />
      <Breadcrumb title="Library - Media Hub" image="../img/lyi.png" />
      <MediaGallery />

      {/* CATEGORY BUTTONS */}
      <div style={{
        display: "flex",
        gap: "12px",
        marginTop: "25px",
        justifyContent: "center"
      }}>
        {["new", "old", "all"].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "20px",
              background: activeCategory === cat ? "#ff6600" : "#ddd",
              color: activeCategory === cat ? "#fff" : "#000",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s"
            }}
          >
            {cat === "new" ? "New Uploads" :
             cat === "old" ? "Old Uploads" : "All"}
          </button>
        ))}
      </div>

      {/* MASONRY LAYOUT */}
      <div style={{
        columnCount: 3,
        columnGap: "15px",
        padding: "20px"
      }}>
        {filtered.map(img => (
          <img
            key={img.id}
            src={img.url}
            alt={img.name}
            onClick={() => setZoomImg(img.url)}
            style={{
              width: "100%",
              marginBottom: "15px",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              opacity: 0,
              animation: "fadeIn 0.6s forwards",
              transition: "0.3s"
            }}
            onMouseOver={e => (e.target.style.transform = "scale(1.04)")}
            onMouseOut={e => (e.target.style.transform = "scale(1)")}
          />
        ))}
      </div>

      {/* FULLSCREEN VIEW */}
      {zoomImg && (
        <div
          onClick={() => setZoomImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            zIndex: 99999,
            animation: "fadeIn 0.4s"
          }}
        >
          <img
            src={zoomImg}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              animation: "zoomIn 0.3s",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes zoomIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <ScrollToTop smooth className="scrolly" />
      <Footer />
    </>
  );
}

export default MecMedia;