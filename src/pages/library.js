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
        <div style={{width:"100%"}}>
            
       <div className="row div-row" style={{width:"100%",overflowY:"hidden"}}>

      
       <div className="col-lg-4">
       <Link to="/librarybooks">
            <div className=" list">
                <img src={require('../img/v.png')} className="list-img align-items-center" alt="image" />
                <br/>
                <h5>&emsp;&emsp;&emsp;&emsp;Books</h5>
            </div>
        </Link>
        </div>


        <div className="col-lg-4">
       <Link to="/libraryvideos">
            <div className=" list">
                <img src={require('../img/v.png')} className="list-img align-items-center" alt="image" />
                <br/>
                <h5>&emsp;&emsp;&emsp;&emsp;Videos</h5>
            </div>
            </Link>
        </div>


        <div className="col-lg-4">
            <div className=" list">
                <img src={require('../img/v.png')} className="list-img align-items-center" alt="image" />
                <br/>
                <h5>&emsp;&emsp;&emsp;&emsp;Audios</h5>
            </div>
        </div>

        <div className="col-lg-4">
            <div className=" list">
                <img src={require('../img/v.png')} className="list-img align-items-center" alt="image" />
                <br/>
                <h5>&emsp;&emsp;&emsp;&emsp;MAPS</h5>
            </div>
        </div>





    <div className="col-lg-4">
            <div className=" list">
                <img src={require('../img/v.png')} className="list-img align-items-center" alt="image" />
                <br/>
                <h5>&emsp;&emsp;&emsp;&emsp;WEBSITES</h5>
            </div>
        </div>


        <div className="col-lg-4">
            <div className=" list">
                <img src={require('../img/v.png')} className="list-img align-items-center" alt="image" />
                <br/>
                <h5>&emsp;&emsp;&emsp;&emsp;CALENDAR</h5>
            </div>
        </div>

        

    </div>


        </div>

        <iframe sr></iframe>
        <ScrollToTop smooth className="scrolly"/>
        <Footer />
        </>
    )
}

