import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Header from "../component/header";
import Breadcrumb from "../component/breadcrumb";
import Iframe from "./iframe";
import { useEffect, useState } from "react";


   var path=process.env.REACT_APP_API_URL;
function ScrollContainer(event){
  
  event.preventDefault()

    var scroll1=document.getElementById("scroll1");
    var scroll2=document.getElementById("scroll2");
    var scroll3=document.getElementById("scroll3");

    if(event.deltaY > 0){
        scroll1.scrollLeft += 100;
        scroll2.scrollLeft += 100;
        scroll3.scrollLeft += 100;
       }
       else{
        scroll1.scrollLeft -=100;
        scroll2.scrollLeft -=100;
        scroll3.scrollLeft -=100;
       }
       
}



function handleIframe(book){
    document.getElementById("frame").src=book.url;
    document.getElementById("iframe_name").value=book.name
    document.getElementById("view").innerHTML=book.name
    document.getElementById("iframe").style.display="block";
    document.getElementById("bookmain").style.display="none";

}

function LibraryBooks() {
     const [dict, setDict]=useState([]);
     const [story, setStory]=useState([]);
     const [featured, setFeatured]=useState([]);
     
const [loading, setLoading]=useState(false);

       

     useEffect(()=>{

      fetch(`${path}/library`)
      .then(res => res.json())
      .then(data => {
        if(data.length > 0){
          setFeatured(data[0].featuredbooks)
          setLoading(true)
        }
      })
      .catch(err => console.log("Error fetching data", err))


       
      fetch(`${path}/library`)
      .then(res => res.json())
      .then(data => {
        if(data.length > 0){
          setStory(data[0].storybooks)
          setLoading(true)
        }
      })
      .catch(err => console.log("Error fetching data", err))



       
      fetch(`${path}/library`)
      .then(res => res.json())
      .then(data => {
        if(data.length > 0){
          setDict(data[0].dictionary)
          setLoading(true)
        }
      })
      .catch(err => console.log("Error fetching data", err))
     }, [])
    return (
        <>
<Header />

<div id="bookmain">
  <Breadcrumb title="Library - Books"/>
    <br/>
    <br/>
    <br/>
    <br/>


    <div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Featured Books</h5>
        

        <center>{loading ? <a></a> : <a>Loading<i className="fa fa-spinner fa-spin"></i></a>}</center>
<div className="scroll-container" id="scroll1" onWheel={ScrollContainer}>

<Link to="/computing_abbrev">
<div className="scroll-item">
 <img src={require("../img/load.gif")} />
<textarea readOnly>Computing Abbreviations Finder</textarea>
</div>
</Link>


{featured.map(book => (
 <div className="scroll-item" onClick={()=>handleIframe(book)}>
 <img src={require(`${web.poster}`)} />
<textarea value={book.name} readOnly></textarea>
    </div>
))} 

    
</div>

</div>


<div>
<h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Story Books</h5>
<center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
<div className="scroll-container" id="scroll2" onWheel={ScrollContainer}>

{story.map(book => (
 <div className="scroll-item" onClick={()=>handleIframe(book)}>
 <img src={require("../img/load.gif")} />
<textarea value={book.name} readOnly></textarea>
    </div>
))} 

</div>
</div>

<div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Dictionary</h5>
        
<center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
<div className="scroll-container" id="scroll3" onWheel={ScrollContainer}>
{dict.map(book => (
 <div className="scroll-item" onClick={()=>handleIframe(book)}>
 <img src={require("../img/dict.jpg")} />
<textarea value={book.name} readOnly></textarea>
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


  

  export default LibraryBooks;

 
