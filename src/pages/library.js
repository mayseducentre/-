import { Link } from "react-router-dom";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";
import ScrollToTop from "react-scroll-to-top";

export default function Library(){
    return(
        <>
        <Header />
        <Breadcrumb title="MEC Library" image="https://lh3.googleusercontent.com/pw/AP1GczOLuaSAk2KiISxj5S5fJDNCC0SdLqZku5jF616Cal3lu6SYR97_weCaaVDl3mGeSqBJFgkK_qVxre-XoazyZZOOn4m9xViZXc06Lcxb-7SFQkenb-o"/>
        <br/>
        <br/>
        <div style={{width:"auto"}}>
            
       <div className="row div-row">

      
       <div className="col-lg-4" style={{textDecoration:"none !important"}}>
       <Link to="/librarybooks" className="nounderline">
            <div className=" list">
                <img src={require("../img/book.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;Books</a>
            </div>
        </Link>
        </div>


        <div className="col-lg-4">
       <Link to="/libraryvideos" className="nounderline">
            <div className=" list">
                <img src={require("../img/vid.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;Videos</a>
            </div>
            </Link>
        </div>


        <div className="col-lg-4">
       <Link to="/librarymedia" className="nounderline">
            <div className=" list">
                <img src={require("../img/media.png")} className="list-img align-items-center" alt="i" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;MEC Media</a>
            </div>
            </Link>
        </div>
        <div className="col-lg-4">
       <Link to="/vrtour" className="nounderline">
            <div className=" list">
                <img src={require("../img/vr.jpg")} className="list-img align-items-center" alt="i" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;MEC VR Tour</a>
            </div>
            </Link>
        </div>
        <div className="col-lg-4">
    <Link to="/upload_file" className="nounderline" >
            <div className=" list">
                <img src={require("../img/drive.png")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;MEC Drive</a>
            </div>
    </Link>
        </div>


    <div className="col-lg-4">
       <Link to="/librarywebsites" className="nounderline">
            <div className=" list">
                <img src={require("../img/web.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;Websites</a>
            </div>
            </Link>
        </div>


        <div className="col-lg-4">
            <Link to="/projects" className="nounderline">
            <div className=" list">
                <img src={require("../img/stu.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;Students Projects</a>
            </div>
            </Link>
        </div>

   <div className="col-lg-4">
            <Link to="/assign" className="nounderline">
            <div className=" list">
                <img src={require("../img/stu.jpg")} className="list-img align-items-center" alt="image" />
                <br/>
                <a style={{fontWeight:"700",fontSize:"15px",paddingLeft:"20px"}}>&emsp;&emsp;&emsp;Assessment</a>
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

