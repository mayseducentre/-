import { useEffect, useState } from "react"



export default function Headline(){
    // const [update,setUpdate]=useState([]);

    // useEffect(()=>{
    //     fetch("https://tarry-hail-koala.glitch.me/update")
    //     .then(res=> res.json())
    //     .then(data=> setUpdate(data))
    //     .catch(err => console.log(err))
    // })
    
    return(
        <>
    
        <div className="headline animate__animated animate__fadeInLeft">
            <p><span style={{fontFamily:"cursive",fontWeight:"700",color:"white",background:"#994500",padding:"10px 12px",textTransform:"uppercase"}}>Annoucement:</span> Install the MEC app now. <a href="#/ins_guide">Installation guide</a></p>
            </div>

            
        </>
    )
}