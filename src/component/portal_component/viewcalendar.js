import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";



function handleIframe(table){
    document.getElementById("imgdisplay").src=`${table.img}`;
    document.getElementById("event_name").innerHTML=table.timetable_level;
    document.getElementById("iframe").style.display="block";
    document.getElementById("calv").style.display="none";

}

function Back(){
    document.getElementById("iframe").style.display="none";
    document.getElementById("calv").style.display="block";
}


export default function ViewCalendar(){
    const [featured, setFeatured]=useState([]);
     
const [loading, setLoading]=useState(false);

       var tablepath=process.env.REACT_APP_ASSIGN_API;

     useEffect(()=>{

      fetch(`${tablepath}/mectimetable`)
      .then(res => res.json())
      .then(data => {
        
          setFeatured(data)
          setLoading(true)
        
      })
      .catch(err => console.log("Error fetching data", err))


       
     }, [])
    return(
        <>

<Breadcrumb title="View Calendar" />
        <div id="calv">

        
    <div>
        <h5 style={{color:"black",textTransform:"none",marginLeft:"20px"}}>Timetable</h5>
        

        <center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
<div className="scroll-container" id="scroll1">


{featured.map(table => (
 <div className="scroll-item" key={table.id} onClick={()=>handleIframe(table)}>
 <img src={table.img}/>
<textarea value={table.timetable_level} readOnly></textarea>
    </div>
))} 

    
</div>

</div>
</div>

<div id="iframe" style={{display:"none"}}>
  <div style={{width:"100%",background:"cornsilk",padding:"10px 12px",position:"fixed",top:"60px"}}>
    <a onClick={Back}>Calendar </a>
    <i className="fa fa-arrow-right"></i>
    <a id="event_name"></a>
  </div>
  <br/>
  <br/>
<center>

<img id="imgdisplay" style={{width:"auto",height:"auto"}} />
</center>

<button style={{padding:"10px 20px", background:"none", border:"1px solid orange"}} onClick={Back}>Back</button>
</div>
        </>
    )
}