import { Link } from "react-router-dom";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";
import ScrollToTop from "react-scroll-to-top";

export default function Library(){
    return(
        <>
        <Header />
        <Breadcrumb title="MEC Library"/>
        <br/>
        <br/>
        <div style={{width:"auto"}}>
            
       <div className="row div-row">

      
       <div className="col-lg-4">
       <Link to="/librarybooks">
            <div className=" list">
                <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} className="list-img align-items-center" alt="image" />
                <br/>
                <h5 style={{fontWeight:"700",fontSize:"20px"}}>&emsp;&emsp;&emsp;Books</h5>
            </div>
        </Link>
        </div>


        <div className="col-lg-4">
       <Link to="/libraryvideos">
            <div className=" list">
                <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} className="list-img align-items-center" alt="image" />
                <br/>
                <h5 style={{fontWeight:"700",fontSize:"20px"}}>&emsp;&emsp;&emsp;Videos</h5>
            </div>
            </Link>
        </div>


        <div className="col-lg-4">
       <Link to="/libraryevent">
            <div className=" list">
                <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} className="list-img align-items-center" alt="i" />
                <br/>
                <h5 style={{fontWeight:"700",fontSize:"20px"}}>&emsp;&emsp;&emsp;Event Media</h5>
            </div>
            </Link>
        </div>

        <div className="col-lg-4">
            <div className=" list">
                <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} className="list-img align-items-center" alt="image" />
                <br/>
                <h5 style={{fontWeight:"700",fontSize:"20px"}}>&emsp;&emsp;&emsp;MAPS</h5>
            </div>
        </div>





    <div className="col-lg-4">
       <Link to="/librarywebsites">
            <div className=" list">
                <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} className="list-img align-items-center" alt="image" />
                <br/>
                <h5 style={{fontWeight:"700",fontSize:"20px"}}>&emsp;&emsp;&emsp;WEBSITES</h5>
            </div>
            </Link>
        </div>


        <div className="col-lg-4">
            <div className=" list">
                <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} className="list-img align-items-center" alt="image" />
                <br/>
                <h5 style={{fontWeight:"700",fontSize:"20px"}}>&emsp;&emsp;&emsp;CALENDAR</h5>
            </div>
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

