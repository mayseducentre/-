import { useEffect, useState } from "react";

export default function Banner(){
  // const imgarray=[process.env.PUBLIC_URL+"/img/mays/speech.jpg",
  //   process.env.PUBLIC_URL+"/img/mays/play.jpg",
  //   process.env.PUBLIC_URL+"/img/mays/pol.jpg",
  //   process.env.PUBLIC_URL+"/img/mays/cert.jpg",
  //   process.env.PUBLIC_URL+"/img/mays/fish.jpg",
  //   process.env.PUBLIC_URL+"/img/mays/build.jpg"];
    
  //   const textarray=["May's Daycare and Educational Centre","Learning today, leading tomorrow","MEC Portal","Why MDCEC for my child","Create an account now","Unparalleled Educational Experience","Technical Skills for all","Get in touch"]

    
  // const [currentindex, setCurrentindex]=useState(0);
  // const [textindex, setTextindex]=useState(0);
  // useEffect(()=>{
  //   const updateimg= ()=>{
  //     setCurrentindex((prevIndex) => (prevIndex + 1) % imgarray.length);
      
  //     setTextindex((prevIndex) => (prevIndex + 1) % textarray.length);
  //   }

  //   const intervalid= setInterval(updateimg, 7000);

  //   return ()=> clearInterval(intervalid)
  // },[imgarray.length]);
  return(
        <>
    {/* <section id="hero" className="d-flex justify-content-center align-items-center">
    
    <div className="container position-relative animate__animated animate__fadeInLeft">
      <h1 id="ban_txt" style={{opacity:"9", zIndex:"999"}}>MAYS</h1>
      <h2>{process.env.REACT_APP_BRAND_SHORT}, Quality education with love and affection</h2>
      <a href="#/admissions" className="btn-get-started">Enroll Now</a>
    </div>
  </section> */}

<video src={require("/workspaces/-/src/video/mec.mp4")} style={{width:"100%"}} muted autoPlay loop></video>
     
        </>
    )
}