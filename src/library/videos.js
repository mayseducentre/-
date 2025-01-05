import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import { useEffect, useState } from "react";


   
var path=process.env.REACT_APP_LIBRARY_API;
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
  const [videos, setVideos]=useState([]);
     
  const [loading, setLoading]=useState(false);
  
         
  
       useEffect(()=>{
  
        fetch(`${path}/library`)
        .then(res => res.json())
        .then(data => {
          if(data.length > 0){
            setVideos(data[0].featuredvideos)
            setLoading(true)
          }
        })
        .catch(err => console.log("Error fetching data", err))
      }, [])
  
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
        
<center>{loading ? <a></a> : <a><div className="loadery"></div></a>}</center>
<div className="scroll-container" id="scroll1" onWheel={ScrollContainer}>
    
    <div className="scroll-item">
        <video src={require("/workspaces/-/src/video/maysedu.mp4")} controls></video>
      <textarea readOnly>Welcome to May's Edu Centre</textarea>
    </div>

    <div className="scroll-item">
    <iframe  src="https://www.youtube.com/embed/dxECczwpirE?si=Q5HT5DoTbrJFWK9Q" title="May's Educational Centre Graduation" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    <textarea readOnly>MEC Graduation 2020</textarea>
    </div>  
    
{videos.map(video => (
 <div className="scroll-item">
    <iframe src={video.url}  title="May's Educational Centre" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
<textarea value={video.name} readOnly></textarea>
    </div>
))} 

</div>
</div>


<div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Songs</h5>
        
<center>{loading ? <a></a> : <a><div className="loadery"></div></a>}</center>
<div className="scroll-container" id="scroll2" onWheel={ScrollContainer}>
    <div className="scroll-item">
        <video poster={require(`../img/${process.env.REACT_APP_LOGO}`)}></video>
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

 
