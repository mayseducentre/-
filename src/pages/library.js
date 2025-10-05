import { Link } from "react-router-dom";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";
import ScrollToTop from "react-scroll-to-top";

export default function Library(){
    return(
        <>
        <Header />
        <Breadcrumb title="MEC Library" image="./img/farm.jpg"/>
        <br/>
        <br/>
        <div style={{width:"auto"}}>
            
       <div className="row div-row">

      
       <div className="col-lg-4" style={{textDecoration:"none !important"}}>
       <Link to="/librarybooks" className="nounderline">
            <div className=" list">
                <img src={require("../img/book.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px"}}>&emsp;&emsp;&emsp;Books</a>
            </div>
        </Link>
        </div>


        <div className="col-lg-4">
       <Link to="/libraryvideos" className="nounderline">
            <div className=" list">
                <img src={require("../img/vid.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px"}}>&emsp;&emsp;&emsp;Videos</a>
            </div>
            </Link>
        </div>


        <div className="col-lg-4">
       <Link to="/librarymedia" className="nounderline">
            <div className=" list">
                <img src={require("../img/media.png")} className="list-img align-items-center" alt="i" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px"}}>&emsp;&emsp;&emsp;MEC Media</a>
            </div>
            </Link>
        </div>
        <div className="col-lg-4">
       <Link to="/vrtour" className="nounderline">
            <div className=" list">
                <img src={require("../img/vr.jpg")} className="list-img align-items-center" alt="i" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px"}}>&emsp;&emsp;&emsp;MEC VR Tour</a>
            </div>
            </Link>
        </div>
        <div className="col-lg-4">
            <div className=" list">
                <img src={require("../img/drive.png")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px"}}>&emsp;&emsp;&emsp;MEC Drive</a>
            </div>
        </div>


    <div className="col-lg-4">
       <Link to="/librarywebsites" className="nounderline">
            <div className=" list">
                <img src={require("../img/web.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px"}}>&emsp;&emsp;&emsp;Websites</a>
            </div>
            </Link>
        </div>


        <div className="col-lg-4">
            <Link to="/projects" className="nounderline">
            <div className=" list">
                <img src={require("../img/stu.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px"}}>&emsp;&emsp;&emsp;Students Projects</a>
            </div>
            </Link>
        </div>

        

    </div>


        </div>

<br/>
<br/>
        
        <ScrollToTop smooth className="scrolly"/>
        <Footer />
        </>
    )
}

