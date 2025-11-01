import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import { useEffect, useState } from "react";

function ScrollContainer(event) {
  event.preventDefault();
  const scroll1 = document.getElementById("scroll1");
  const scroll2 = document.getElementById("scroll2");

  if (event.deltaY > 0) {
    scroll1.scrollLeft += 100;
    scroll2.scrollLeft += 100;
  } else {
    scroll1.scrollLeft -= 100;
    scroll2.scrollLeft -= 100;
  }
}

function LibraryVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load video data from local JSON instead of API
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const libraryData = data.library?.[0];
        if (libraryData) {
          setVideos(libraryData.featuredvideos || []);
          setLoading(true);
        }
      })
      .catch((err) => console.error("Error loading local JSON:", err));
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb title="Library - Videos" />

      <br />
      <br />
      <br />
      <br />

      {/* ===== Featured Videos Section ===== */}
      <div>
        <h5
          style={{
            color: "black",
            textTransform: "none",
            marginLeft: "20px",
          }}
        >
          Featured Videos
        </h5>

        <center>
          {loading ? <a></a> : <a><div className="loadery"></div></a>}
        </center>

        <div className="scroll-container" id="scroll1" onWheel={ScrollContainer}>
          {/* Local static intro videos */}
          <div className="scroll-item">
            <video
              src="https://drive.google.com/file/d/1YL5_2bMGsPw5aH9CV9EV-DoWuE0wvVRW/view?usp=drivesdk"
              controls
            ></video>
            <textarea readOnly>Welcome to May's Edu Centre</textarea>
          </div>

          <div className="scroll-item">
            <iframe
              src="https://www.youtube.com/embed/dxECczwpirE?si=Q5HT5DoTbrJFWK9Q"
              title="May's Educational Centre Graduation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <textarea readOnly>MEC Graduation 2020</textarea>
          </div>

          {/* Dynamic videos from db.json */}
          {videos.map((video, i) => (
            <div className="scroll-item" key={i}>
              <iframe
                src={video.url}
                title={video.name}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <textarea value={video.name} readOnly></textarea>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Songs Section ===== */}
      <div>
        <h5
          style={{
            color: "black",
            textTransform: "none",
            marginLeft: "20px",
          }}
        >
          Songs
        </h5>

        <center>
          {loading ? <a></a> : <a><div className="loadery"></div></a>}
        </center>

        <div className="scroll-container" id="scroll2" onWheel={ScrollContainer}>
          <div className="scroll-item">
            <video poster={require(`../img/${process.env.REACT_APP_LOGO}`)}></video>
            <textarea readOnly></textarea>
          </div>
        </div>
      </div>

      <ScrollToTop smooth className="scrolly" />
      <Footer />
    </>
  );
}

export default LibraryVideos;
