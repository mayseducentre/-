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
    var scroll2=document.getElementById("scroll2");

    if(event.deltaY > 0){
        scroll1.scrollLeft += 100;
        scroll2.scrollLeft += 100;
       }
       else{
        scroll1.scrollLeft -=100;
        scroll2.scrollLeft -=100;
       }
       
}



function handleIframe(web){
    document.getElementById("imgdisplay").src=`${web.url}`;
    document.getElementById("event_name").innerHTML=web.name;
    document.getElementById("iframe").style.display="block";
    document.getElementById("bookmain").style.display="none";

}


function graduateFrame(gr){
  document.getElementById("imgdisplay").src=gr.url;
  document.getElementById("event_name").innerHTML=gr.name;
  document.getElementById("iframe").style.display="block";
  document.getElementById("bookmain").style.display="none";

}

function LibraryEvents() {
     const [graduate, setGraduation]=useState([]);

     const [featured, setFeatured]=useState([]);
     
const [loading, setLoading]=useState(false);

       

     useEffect(()=>{

      fetch(`${path}/library`)
      .then(res => res.json())
      .then(data => {
        if(data.length > 0){
          setFeatured(data[0].featuredexhibit)
          setLoading(true)
        }
      })
      .catch(err => console.log("Error fetching data", err))


       
      fetch(`${path}/library`)
      .then(res => res.json())
      .then(data => {
        if(data.length > 0){
          setGraduation(data[0].featuredgraduation)
          setLoading(true)
        }
      })
      .catch(err => console.log("Error fetching data", err))



       
     
     }, [])
    return (
        <>
<Header />

<div id="bookmain">
  <Breadcrumb title="Library - Event Media"/>
    <br/>
    <br/>
    <br/>
    <br/>


    <div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Featured Exhibitions</h5>
        

        <center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
<div className="scroll-container" id="scroll1" onWheel={ScrollContainer}>


{featured.map(web => (
 <div className="scroll-item" key={web.id} onClick={()=>handleIframe(web)}>
 <img src={web.url} />
<textarea value={web.name} readOnly></textarea>
    </div>
))} 

    
</div>

</div>

<div>
<h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>2024 Graduation Pics</h5>
<center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
<div className="scroll-container" id="scroll2" onWheel={ScrollContainer}>
{graduate.map(gr =>(
  <div className="scroll-item" key={gr.id} onClick={()=>graduateFrame(gr)}>
  <img src={gr.url} />
 <textarea value={gr.name} readOnly></textarea>
     </div>
))}

</div>
</div>




</div>


<div id="iframe" style={{display:"none"}}>
  <div style={{width:"100%",background:"cornsilk",padding:"10px 12px",position:"fixed",top:"60px"}}>
    <a onClick={()=>{window.location.reload()}}>Library </a>
    <i className="fa fa-arrow-right"></i>
    <a id="event_name"></a>
  </div>
  <br/>
  <br/>
<center>

<img id="imgdisplay" src={require("../img/about.jpg")} style={{width:"auto",height:"auto"}} />
</center>
</div>
<ScrollToTop smooth className="scrolly"/>
       
<Footer />

      </>
    )
  };


  

  export default LibraryEvents;

 
