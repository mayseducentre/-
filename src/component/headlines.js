import { useEffect, useState } from "react";


var path=process.env.REACT_APP_API_URL;

export default function Headline(){

    const [upd,setUpd]=useState([]);

    useEffect(()=>{
        fetch(`${path}/update/maysupd`)
        .then(res => res.json())
        .then(data => setUpd(data))
        .catch(err => console.log(err))
        
    },[])
    return(
        <>
        <div className="headline animate__animated animate__fadeInLeft">
           
    <p>
    <span style={{fontFamily:"cursive",fontWeight:"700",color:"white",background:"#994500",padding:"10px 12px",textTransform:"uppercase"}}>Annoucement:</span>
<a style={{color:`${upd.color}`}}>&emsp; {upd.info}</a>
  &emsp;  <a href="#/ins_guide">Installation guide</a>
    </p>
           
            
            
            
            </div>
     
        </>
    )
}