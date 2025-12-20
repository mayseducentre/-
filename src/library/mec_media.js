import { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import MediaGallery from "../component/media";

/* =========================================================
   AUTO LOAD ONLY PUBLIC GALLERY IMAGES
   Folder: src/img/gallery/*
   ========================================================= */
const imageContext = require.context(
  "../img/mays",
  true,
  /\.(jpg|jpeg|png|webp)$/i
);

/* ---- OPTIONAL: MARK RECENT IMAGES BY FILE NAME ---- */
const RECENT_IMAGES = [
  "pic1.jpg",
  "pic3.jpg",
  "pic4.jpg",
  "pic5.jpg"
];

/* ---- BUILD IMAGES ARRAY AUTOMATICALLY ---- */
const IMAGES = imageContext.keys().map((path, index) => {
  const fileName = path.split("/").pop();

  return {
    id: index,
    src: imageContext(path), // ONLY from img/mays
    title: fileName.replace(/\.(jpg|jpeg|png|webp)$/i, ""),
    recent: RECENT_IMAGES.includes(fileName)
  };
});

/* =========================================================
   COMPONENT
   ========================================================= */
function MecMedia() {
  const [filter, setFilter] = useState("all");
  const [activeImage, setActiveImage] = useState(null);
  const [likes, setLikes] = useState({});

  const filteredImages =
    filter === "all"
      ? IMAGES
      : IMAGES.filter(img =>
          filter === "recent" ? img.recent : !img.recent
        );

  const toggleLike = id =>
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <Header />

      <Breadcrumb
        title="Library – Media Hub"
        image="https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo"
      />

      <MediaGallery />

      {/* ================= FILTER BAR ================= */}
      <div style={styles.filterBar}>
        {["recent", "old", "all"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              background: filter === f ? "#ff6600" : "#eee",
              color: filter === f ? "#fff" : "#000"
            }}
          >
            {f === "recent" && "✨ Recent"}
            {f === "old" && "📁 Older"}
            {f === "all" && "📸 All"}
          </button>
        ))}

        <span style={{ marginLeft: "auto", fontWeight: 600 }}>
          {filteredImages.length} photos
        </span>
      </div>

      {/* ================= GALLERY GRID ================= */}
      <div style={styles.grid}>
        {filteredImages.map(img => (
          <div key={img.id} style={styles.card}>
            <img
              src={img.src}
              alt={img.title}
              style={styles.image}
              onClick={() => setActiveImage(img)}
            />

            <div style={styles.caption}>
              <span>{img.title}</span>
              <span
                style={styles.like}
                onClick={() => toggleLike(img.id)}
              >
                {likes[img.id] ? "❤️" : "🤍"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FULLSCREEN ZOOM ================= */}
      {activeImage && (
        <div
          style={styles.overlay}
          onClick={() => setActiveImage(null)}
        >
          <img src={activeImage.src} style={styles.zoomed} />
          <p style={{ color: "#fff", marginTop: 10 }}>
            {activeImage.title}
          </p>
        </div>
      )}

      <ScrollToTop smooth />
      <Footer />
    </>
  );
}

/* =========================================================
   STYLES
   ========================================================= */
const styles = {
  filterBar: {
    display: "flex",
    gap: 10,
    padding: 15,
    alignItems: "center",
    flexWrap: "wrap"
  },
  filterBtn: {
    border: "none",
    padding: "8px 16px",
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: 600
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 15,
    padding: 15
  },
  card: {
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    background: "#fff"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    cursor: "zoom-in",
    transition: "0.3s"
  },
  caption: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 12px",
    fontSize: 14
  },
  like: {
    cursor: "pointer"
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
  zoomed: {
    maxWidth: "90%",
    maxHeight: "85%",
    borderRadius: 12
  }
};

export default MecMedia;