import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import Iframe from "./iframe";
import { useEffect, useState } from "react";

function ScrollContainer(event) {
  event.preventDefault();

  const scroll1 = document.getElementById("scroll1");
  const scroll2 = document.getElementById("scroll2");
  const scroll3 = document.getElementById("scroll3");

  if (event.deltaY > 0) {
    scroll1.scrollLeft += 100;
    scroll2.scrollLeft += 100;
    scroll3.scrollLeft += 100;
  } else {
    scroll1.scrollLeft -= 100;
    scroll2.scrollLeft -= 100;
    scroll3.scrollLeft -= 100;
  }
}

function handleIframe(book) {
  document.getElementById("frame").src = book.url;
  document.getElementById("iframe_name").value = book.name;
  document.getElementById("view").innerHTML = book.name;
  document.getElementById("iframe").style.display = "block";
  document.getElementById("bookmain").style.display = "none";
}

function LibraryBooks() {
  const [dict, setDict] = useState([]);
  const [story, setStory] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load local JSON file from public/db.json
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const libraryData = data.library[0];
        if (libraryData) {
          setFeatured(libraryData.featuredbooks || []);
          setStory(libraryData.storybooks || []);
          setDict(libraryData.dictionary || []);
          setLoading(true);
        }
      })
      .catch((err) => console.error("Error loading local JSON:", err));
  }, []);

  return (
    <>
      <Header />
      <div id="bookmain">
        <Breadcrumb title="Library - Books" />
        <br /><br /><br /><br />

        <div>
          <h5 style={{ color: "black", textTransform: "none", marginLeft: "20px" }}>Featured Books</h5>
          <center>{loading ? <a></a> : <a><div className="loadery"></div></a>}</center>
          <div className="scroll-container" id="scroll1" onWheel={ScrollContainer}>
            <Link to="/computing_abbrev">
              <div className="scroll-item">
                <img src={require("../img/load.gif")} alt="loading" />
                <textarea readOnly>Computing Abbreviations Finder</textarea>
              </div>
            </Link>

            {featured.map((book, i) => (
              <div className="scroll-item" key={i} onClick={() => handleIframe(book)}>
                <img src={require("../img/l.gif")} alt="featured" />
                <textarea value={book.name} readOnly></textarea>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 style={{ color: "black", textTransform: "none", marginLeft: "20px" }}>Story Books</h5>
          <center>{loading ? <a></a> : <a><div className="loadery"></div></a>}</center>
          <div className="scroll-container" id="scroll2" onWheel={ScrollContainer}>
            {story.map((book, i) => (
              <div className="scroll-item" key={i} onClick={() => handleIframe(book)}>
                <img src={require("../img/events-2.jpg")} alt="story" />
                <textarea value={book.name} readOnly></textarea>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 style={{ color: "black", textTransform: "none", marginLeft: "20px" }}>Dictionary</h5>
          <center>{loading ? <a></a> : <a><div className="loadery"></div></a>}</center>
          <div className="scroll-container" id="scroll3" onWheel={ScrollContainer}>
            {dict.map((book, i) => (
              <div className="scroll-item" key={i} onClick={() => handleIframe(book)}>
                <img src={require("../img/dict.jpg")} alt="dictionary" />
                <textarea value={book.name} readOnly></textarea>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="iframe" style={{ display: "none" }}>
        <Iframe />
      </div>
      <ScrollToTop smooth className="scrolly" />
      <Footer />
    </>
  );
}

export default LibraryBooks;
