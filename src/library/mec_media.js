import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import { useEffect, useState } from "react";
import MediaGallery from "../component/media";

var path = process.env.REACT_APP_LIBRARY_API;

function handleIframe(web) {
  document.getElementById("imgdisplay").src = `${web.url}`;
  document.getElementById("event_name").innerHTML = web.name;
  document.getElementById("iframe").style.display = "block";
  document.getElementById("bookmain").style.display = "none";
}

function MecMedia() {
  const [featured, setFeatured] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  // Categorize images using upload date
  function categorizeImages(images) {
    const today = new Date();
    return images.map((img) => {
      const uploaded = img.uploaded ? new Date(img.uploaded) : today;
      const diffDays = Math.floor((today - uploaded) / (1000 * 60 * 60 * 24));
      return {
        ...img,
        category: diffDays <= 30 ? "new" : "old",
      };
    });
  }

  useEffect(() => {
    fetch(`${path}/library`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const categorized = categorizeImages(data[0].mecmedia);
          setFeatured(categorized);
          setLoading(true);
        }
      })
      .catch((err) => console.log("Error fetching data", err));
  }, []);

  const filteredImages = featured.filter(
    (img) => activeCategory === "all" || img.category === activeCategory
  );

  return (
    <>
      <Header />

      <div id="bookmain">
        <Breadcrumb title="Library - Media Hub" image="../img/lyi.png" />
        <br />
        <br />
        <br />
        <br />

        <MediaGallery />
        <br />

        {/* CATEGORY FILTER BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "20px",
            justifyContent: "center",
          }}
        >
          {["new", "old", "all"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 15px",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                background: activeCategory === cat ? "#ff6600" : "#ddd",
                color: activeCategory === cat ? "#fff" : "#000",
                fontSize: "14px",
                fontWeight: "600",
                transition: "0.3s",
              }}
            >
              {cat === "new" && "New Uploads"}
              {cat === "old" && "Old Uploads"}
              {cat === "all" && "All"}
            </button>
          ))}
        </div>

        <center>
          {loading ? <a></a> : <a><div className="loadery"></div></a>}
        </center>

        {/* GALLERY — Masonry Layout */}
        <div
          style={{
            columnCount: 3,
            columnGap: "15px",
            padding: "15px",
          }}
        >
          {filteredImages.map((web) => (
            <div
              key={web.id}
              style={{
                breakInside: "avoid",
                marginBottom: "15px",
                cursor: "pointer",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "0.3s",
              }}
              onClick={() => handleIframe(web)}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={web.url}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  opacity: 0,
                  transition: "opacity 0.5s",
                }}
                onLoad={(e) => (e.target.style.opacity = 1)}
              />
              <textarea
                value={web.name}
                readOnly
                style={{
                  width: "100%",
                  border: "none",
                  resize: "none",
                  padding: "10px",
                  fontSize: "13px",
                  color: "#333",
                  background: "#f7f7f7",
                  textAlign: "center",
                  borderRadius: "0 0 12px 12px",
                }}
              ></textarea>
            </div>
          ))}
        </div>

        {/* ------- YOUR STATIC IMAGES (UNCHANGED) ------- */}
        <div className="imgrow">
          <div className="imgcolumn">
            <img src={require("../img/mays/pool.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/bask.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/cadet.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/k.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/ground.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/present.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/mohammed.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/sheriffa.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/wildlife.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/gra.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/pic2.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/sh.png")} style={{ width: "100%" }} />
            <img src={require("../img/mg.jpg")} style={{ width: "100%" }} />
          </div>

          <div className="imgcolumn">
            <img src={require("../img/mays/fish.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/game.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/kids.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/play.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/ply.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/um.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/arts.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/mec4.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/redcross.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/study.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/j2.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/la3.jpg")} style={{ width: "100%" }} />
          </div>

          <div className="imgcolumn">
            <img src={require("../img/mays/pol.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/speech.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/jump.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/cert.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/build.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/jhs1.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/m4.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/lyi.png")} style={{ width: "100%" }} />
            <img src={require("../img/mays/akz.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/davis.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/ach.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/acc.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/2w.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/1n.jpg")} style={{ width: "100%" }} />
          </div>

          <div className="imgcolumn">
            <img src={require("../img/mays/stu.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/lib.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/lab.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/lab1.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/j1.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/ly.png")} style={{ width: "100%" }} />
            <img src={require("../img/mays/conf.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/drone_v.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/mays/lego.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/davis.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/gobe.jpg")} style={{ width: "100%" }} />
            <img src={require("../img/1w.png")} style={{ width: "100%" }} />
          </div>
        </div>

        <br />
        <ScrollToTop smooth className="scrolly" />
        <Footer />
      </div>

      {/* FULLSCREEN IMAGE VIEWER */}
      <div
        id="iframe"
        style={{
          display: "none",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          zIndex: "9999",
          paddingTop: "70px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "cornsilk",
            padding: "10px 12px",
            position: "fixed",
            top: "60px",
          }}
        >
          <a onClick={() => window.location.reload()}>Library </a>
          <i className="fa fa-arrow-right"></i>
          <a id="event_name"></a>
        </div>

        <br />
        <br />

        <center>
          <img
            id="imgdisplay"
            src={require("../img/about.jpg")}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "10px",
              boxShadow: "0 5px 25px rgba(0,0,0,0.4)",
            }}
          />
        </center>
      </div>
    </>
  );
}

export default MecMedia;