import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";
import CreateAnnounce from "./create_announce";

var assignpath=process.env.REACT_APP_ASSIGN_API;


export default function AnnounceHubView(){
    const [ann, setAnn]=useState([]);

    useEffect(()=>{
        fetch(`${assignpath}/mail`)
        .then(res=>res.json())
        .then(data=> setAnn(data))
        .catch(err=> console.log(err))
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




     
        </>
    )
}