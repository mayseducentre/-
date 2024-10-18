import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";
import CreateAnnounce from "./create_announce";

var assignpath=process.env.REACT_APP_ASSIGN_API;
function Announce(){
    document.getElementById("announce_create").style.display="block";
    document.getElementById("compose").style.display="none";
    document.getElementById("mail").style.display="block";
    document.getElementById("announce_view").style.display="none";
}


function AnnounceV(){
    document.getElementById("announce_create").style.display="none";
    document.getElementById("mail").style.display="none";
    document.getElementById("compose").style.display="block";
    document.getElementById("announce_view").style.display="block";
}
export default function AnnounceHub(){
    const [ann, setAnn]=useState([]);
const refm=()=>{
    
    fetch(`${assignpath}/mail`)
    .then(res=>res.json())
    .then(data=> setAnn(data))
    .catch(err=> console.log(err))
}
    useEffect(()=>{
        refm()
    },[])
    return(
        <>
        <Breadcrumb title="Announcement Hub" />

        <div id="announce_view" style={{paddingLeft:"10px", paddingRight:"10px"}}>
            <br/>
            <center>
                    <input type="text" placeholder="Search in mails" style={{padding:"10px 12px", width:"90%", borderRadius:"20px"}}/>
                </center>
                <br/>
                
<a onClick={()=>{refm()}} className="pointer">Refresh</a>
<br/>
<br/>
                <small>Primary</small>
                <br/>
                <br/>
                <br/>
            {ann.map(mail=>(
 <div key={mail.id}>
 <img src={require("/./Users/USER/posty/src/img/google.png")} style={{width:"30px",height:"30px",borderRadius:"50%", position:"absolute"}}/>
    <div style={{paddingLeft:"50px"}}>
     <a><b>{mail.subject}</b></a> <small style={{position:"absolute",right:"10px"}}>{mail.date}</small>
     <p>{mail.body}</p>
 </div>
 </div>

            ))}
           
            
        </div>




     <div id="announce_create" style={{display:"none"}}>
        <CreateAnnounce />
        </div>   
        <button onClick={Announce} id="compose" style={{padding:"10px 20px", background:"skyblue", border:"none",borderRadius:"10px",position:"fixed", bottom:"70px",color:"white",right:"10px"}}>Compose</button>
        <button onClick={AnnounceV} id="mail" style={{display:"none",padding:"10px 20px", background:"skyblue", border:"none",borderRadius:"10px",position:"fixed", bottom:"70px",color:"white",right:"10px"}}>Mails</button>
    
     
        </>
    )
}