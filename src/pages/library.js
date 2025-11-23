import { Link } from "react-router-dom";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";
import ScrollToTop from "react-scroll-to-top";

export default function Library() {
  const itemStyle = {
    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "18px",
    padding: "18px",
    margin: "12px auto",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    transition: "all 0.28s ease",
    cursor: "pointer",
  };

  const hoverStyle = {
    transform: "scale(1.04)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.16)",
  };

  const titleStyle = {
    fontWeight: "700",
    fontSize: "17px",
    marginLeft: "14px",
    color: "#1a1a1a",
  };

  const imgStyle = {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    objectFit: "cover",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "0px 15px",
  };

  const handleHover = (e, enter) => {
    Object.assign(e.target.style, enter ? hoverStyle : { transform: "scale(1)", boxShadow: itemStyle.boxShadow });
  };

  return (
    <>
      <Header />
      <Breadcrumb
        title="MEC Library"
        image="https://lh3.googleusercontent.com/pw/AP1GczOLuaSAk2KiISxj5S5fJDNCC0SdLqZku5jF616Cal3lu6SYR97_weCaaVDl3mGeSqBJFgkK_qVxre-XoazyZZOOn4m9xViZXc06Lcxb-7SFQkenb-o"
      />

      <br />

      <div style={gridStyle}>

        {/* Books */}
        <Link to="/librarybooks" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/book.jpg")} alt="Books" style={imgStyle} />
            <span style={titleStyle}>Books</span>
          </div>
        </Link>

        {/* Videos */}
        <Link to="/libraryvideos" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/vid.jpg")} alt="Videos" style={imgStyle} />
            <span style={titleStyle}>Videos</span>
          </div>
        </Link>

        {/* MEC Media */}
        <Link to="/librarymedia" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/media.png")} alt="MEC Media" style={imgStyle} />
            <span style={titleStyle}>MEC Media</span>
          </div>
        </Link>

        {/* VR Tour */}
        <Link to="/vrtour" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/vr.jpg")} alt="VR Tour" style={imgStyle} />
            <span style={titleStyle}>MEC VR Tour</span>
          </div>
        </Link>

        {/* Drive */}
        <Link to="/upload_file" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/drive.png")} alt="Drive" style={imgStyle} />
            <span style={titleStyle}>MEC Drive</span>
          </div>
        </Link>

        {/* Websites */}
        <Link to="/librarywebsites" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/web.jpg")} alt="Websites" style={imgStyle} />
            <span style={titleStyle}>Websites</span>
          </div>
        </Link>

        {/* Student Projects */}
        <Link to="/projects" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/stu.jpg")} alt="Projects" style={imgStyle} />
            <span style={titleStyle}>Students Projects</span>
          </div>
        </Link>

<Link to="/vr_lab" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/vr-lab2.jpeg")} alt="VL" style={imgStyle} />
            <span style={titleStyle}>Virtual Lab</span>
          </div>
        </Link>

        {/* Assessment */}
        <Link to="/assign" style={{ textDecoration: "none" }}>
          <div
            style={itemStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            <img src={require("../img/stu.jpg")} alt="Assessment" style={imgStyle} />
            <span style={titleStyle}>Assessment</span>
          </div>
        </Link>

      </div>

      <br />
      <ScrollToTop smooth className="scrolly" />
      <Footer />
    </>
  );
}
