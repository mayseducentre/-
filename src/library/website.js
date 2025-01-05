import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import Iframe from "./iframe";
import { useEffect, useState } from "react";


   var path=process.env.REACT_APP_LIBRARY_API;
function ScrollContainer(event){
  
  event.preventDefault()

    var scroll1=document.getElementById("scroll1");

    if(event.deltaY > 0){
        scroll1.scrollLeft += 100;
       }
       else{
        scroll1.scrollLeft -=100;
       }
       
}



function handleIframe(web){
    document.getElementById("frame").src=web.url;
    document.getElementById("iframe_name").value=web.name
    document.getElementById("view").innerHTML=web.name
    document.getElementById("iframe").style.display="block";
    document.getElementById("bookmain").style.display="none";

}

function LibraryWebsites() {
     const [featured, setFeatured]=useState([]);
     
const [loading, setLoading]=useState(false);

       

     useEffect(()=>{

      fetch(`${path}/library`)
      .then(res => res.json())
      .then(data => {
        if(data.length > 0){
          setFeatured(data[0].featuredwebsites)
          setLoading(true)
        }
      })
      .catch(err => console.log("Error fetching data", err))

     }, [])
    return (
        <>
<Header />

<div id="bookmain">
  <Breadcrumb title="Library - Websites"/>
    <br/>
    <br/>
    <br/>
    <br/>


    <div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Featured Websites</h5>
        

        <center>{loading ? <a></a> : <a><div className="loadery"></div></a>}</center>
<div className="scroll-container" id="scroll1" onWheel={ScrollContainer}>


{featured.map(web => (
 <div className="scroll-item" onClick={()=>handleIframe(web)}>
 <img src={require("../img/course-3.jpg")} />
<textarea value={web.name} readOnly></textarea>
    </div>
))} 

    
</div>


</div>

</div>


<div id="iframe" style={{display:"none"}}>
    <Iframe />
</div>
<ScrollToTop smooth className="scrolly"/>
       
<Footer />

      </>
    )
  };


  

  export default LibraryWebsites;

 
