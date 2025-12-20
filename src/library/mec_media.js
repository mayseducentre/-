import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import Iframe from "./iframe";
import { useEffect, useState } from "react";
import MediaGallery from "../component/media";

var path = process.env.REACT_APP_LIBRARY_API;

// --- Open Image (your old viewer preserved)
function handleIframe(web) {
  document.getElementById("imgdisplay").src = `${web.url}`;
  document.getElementById("event_name").innerHTML = web.name;
  document.getElementById("iframe").style.display = "block";
  document.getElementById("bookmain").style.display = "none";
}

function MecMedia() {

  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState("new");

  // --- Categorize Images New/Old by 30 days difference
  function categorizeImages(images) {
    const today = new Date();
    return images.map(img => {
      const uploaded = new Date(img.uploaded || img.date || img.createdAt || today);
      const days = Math.floor((today - uploaded) / (1000 * 60 * 60 * 24));

      return {
        ...img,
        category: days <= 30 ? "new" : "old"
      };
    });
  }

  useEffect(() => {
    fetch(`${path}/library`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const processed = categorizeImages(data[0].mecmedia);
          setFeatured(processed);
          setLoading(true);
        }
      })
      .catch(err => console.log("Error fetching data", err));
  }, []);

  // --- Filter images by category
  const filteredImages = featured.filter(img => 
    activeCategory === "all" || img.category === activeCategory
  );

  return (
    <>
      <Header />

      <div id="bookmain">
        <Breadcrumb title="Library - Media Hub" image="https://lh3.googleusercontent.com/pw/AP1GczMCbPwvfxUD6yYl5JSD6Q9qpXN8dLh_8v0M1oy2Ezij0M-dIEa2YIR8HYZfn7JKZhL36NhMbwa5-uQSFTDaBk4HKwiiVa9vmSrvkdZoWo8nOWfgzDo" />
        <br/><br/><br/><br/>

        <MediaGallery />
        <br/>

        {/* ---------------- CATEGORY FILTER BUTTONS ---------------- */}
        <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
          {["new", "old", "all"].map(cat => (
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
                transition: "0.3s"
              }}
            >
              {cat === "new" && "New Uploads"}
              {cat === "old" && "Old Uploads"}
              {cat === "all" && "All"}
            </button>
          ))}
        </div>

        {/* ---------------- LOADING ---------------- */}
        <center>
          {loading ? <a></a> : <a><div className="loadery"></div></a>}
        </center>

        {/* ---------------- HORIZONTAL SCROLL SECTION (unchanged) ---------------- */}
        <h5 style={{ color: "black", textTransform: "none", marginLeft: "20px" }}>
          MEC Media
        </h5>

        <div
          className="scroll-container"
          id="scroll1"
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            padding: "10px",
            scrollBehavior: "smooth"
          }}
        >
          {featured.map(web => (
            <div
              className="scroll-item"
              key={web.id}
              onClick={() => handleIframe(web)}
              style={{
                minWidth: "180px",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              <img
                src={web.url}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  transition: "0.3s",
                }}
                onMouseOver={e => (e.target.style.transform = "scale(1.04)")}
                onMouseOut={e => (e.target.style.transform = "scale(1)")}
              />
              <textarea value={web.name} readOnly></textarea>
            </div>
          ))}
        </div>

        <br/><br/>

        {/* ---------------- PINTEREST/MASONRY STYLE GALLERY ---------------- */}
        <div
          style={{
            columnCount: 3,
            columnGap: "15px",
            padding: "15px"
          }}
        >
          {filteredImages.map(web => (
            <img
              key={web.id}
              src={web.url}
              onClick={() => handleIframe(web)}
              style={{
                width: "100%",
                marginBottom: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                cursor: "pointer",
                opacity: 0,
                transition: "opacity 0.5s, transform 0.3s",
              }}
              onLoad={e => (e.target.style.opacity = 1)}
              onMouseOver={e => (e.target.style.transform = "scale(1.03)")}
              onMouseOut={e => (e.target.style.transform = "scale(1)")}
            />
          ))}
        </div>

        {/* ---------------- YOUR STATIC IMAGES (KEPT EXACTLY AS THEY ARE) ---------------- */}
        <div className="imgrow">

          {/* COLUMN 1 */}
          <div className="imgcolumn">
<img src={require("../img/pic1.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic14.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic3.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic4.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic5.jpg")} style={{ width:"100%" }}/>
  <img src={require("../img/pic6.jpg")} style={{ width:"100%" }}/>
<img src={require("../img/pic10.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic11.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic12.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic13.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic7.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic8.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic9.jpg")} style={{ width:"100%" }}/>
</div>

        <div className="imgcolumn">
<img src={require("../img/pic21.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic22.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic23.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic24.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic25.jpg")} style={{ width:"100%" }}/>
  <img src={require("../img/pic26.jpg")} style={{ width:"100%" }}/>
<img src={require("../img/pic27.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic28.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic29.jpg")} style={{ width:"100%" }}/>
            
</div>

<div className="imgcolumn">
            <img src={require("../img/mays/pool.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/bask.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/cadet.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/k.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/ground.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/present.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/mohammed.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/sheriffa.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/wildlife.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/gra.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/pic2.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/sh.png")} style={{ width:"100%" }}/>
            <img src={require("../img/mg.jpg")} style={{ width:"100%" }}/>
          </div>

          {/* COLUMN 2 */}
          <div className="imgcolumn">
            <img src={require("../img/mays/fish.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/game.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/kids.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/play.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/ply.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/um.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/arts.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/mec4.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/redcross.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/study.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/j2.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/la3.jpg")} style={{ width:"100%" }}/>
          </div>

          {/* COLUMN 3 */}
          <div className="imgcolumn">
            <img src={require("../img/mays/pol.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/speech.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/jump.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/cert.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/build.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/jhs1.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/m4.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/lyi.png")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/akz.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/davis.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/ach.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/acc.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/2w.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/1n.jpg")} style={{ width:"100%" }}/>
          </div>

          {/* COLUMN 4 */}
          <div className="imgcolumn">
            <img src={require("../img/mays/stu.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/lib.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/lab.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/lab1.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/j1.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/ly.png")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/conf.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/drone_v.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/mays/lego.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/davis.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/gobe.jpg")} style={{ width:"100%" }}/>
            <img src={require("../img/1w.png")} style={{ width:"100%" }}/>
          </div>

        </div>

        <ScrollToTop smooth className="scrolly" />
        <Footer />
      </div>



      {/* ---------------- FULLSCREEN VIEWER (unchanged) ---------------- */}
      <div id="iframe" style={{
        display: "none",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        zIndex: 9999,
        paddingTop: "70px",
        textAlign: "center",
        transition: "0.3s"
      }}>
        <div style={{
          width: "100%",
          background: "cornsilk",
          padding: "10px 12px",
          position: "fixed",
          top: "60px"
        }}>
          <a onClick={() => { window.location.reload() }}>Library </a>
          <i className="fa fa-arrow-right"></i>
          <a id="event_name"></a>
        </div>

        <br/><br/>
        <center>
          <img 
            id="imgdisplay" 
            src={require("../img/about.jpg")} 
            style={{
              maxWidth:"90%",
              maxHeight:"85%",
              borderRadius:"10px",
              boxShadow:"0 10px 30px rgba(0,0,0,0.3)",
              transition:"0.3s"
            }} 
          />
        </center>
      </div>
    </>
  );
}

export default MecMedia;