import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";


   
function ScrollContainer(event){
    var scroll1=document.getElementById("scroll1");
    var scroll2=document.getElementById("scroll2");

    event.preventDefault()
    if(event.deltaY > 0){
        scroll1.scrollLeft += 100;
        scroll2.scrollLeft += 100;
       }
       else{
        scroll1.scrollLeft -=100;
        scroll2.scrollLeft -=100;
       }
       
}

function LibraryVideos() {
     
    return (
        <>
  <Breadcrumb title="Library - Videos"/>
<Header />
    <br/>
    <br/>
    <br/>
    <br/>
    <div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Featured Videos</h5>
<div className="scroll-container" id="scroll1" onWheel={ScrollContainer}>
    <Link to="/">
    <div className="scroll-item">
        <video poster={require("../img/v.png")}></video>
      <textarea readOnly></textarea>
    </div>
    </Link>
</div>
</div>


<div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Songs</h5>
<div className="scroll-container" id="scroll2" onWheel={ScrollContainer}>
    <div className="scroll-item">
        <video poster={require("../img/v.png")}></video>
      <textarea readOnly></textarea>
    </div>
    
</div>
</div>


<ScrollToTop smooth className="scrolly"/>
       
<Footer />

      </>
    )
  };


  

  export default LibraryVideos;

 
