import Breadcrumb from "../component/breadcrumb";
import Header from "../component/header";

export default function VRTour(){
    return(
        <>
        <Header />
        <Breadcrumb title="MEC VR TOUR" />
<br/>
<p>Explore MEC. You can use a VR headset to explore MEC VR Tour. NB: Please be patient if VR Tour keeps long to load. You can reload the page if it refuse to load.</p>


<button style={{border:"none",padding:"10px 50px", borderRadius:"10px"}} onClick={()=>{window.location.reload()}}>Reload</button>
        <center>
           
        <div style={{width:"100%"}}>
            <iframe width="560" height="315" src="https://www.artsteps.com/embed/672ce86e350c3accd3d41f8e/560/315" frameBorder='0' allowFullScreen></iframe>
        </div> 
        </center>

        <br/>
        <br/>
        </>
    )
}