import Breadcrumb from "./breadcrumb";
import Footer from "./footer";
import Header from "./header";

export default function InsGuide(){
    return(
        <>
        <Header />
        <Breadcrumb title="Installation Guide" />
        
                <br/>
                <button onClick={()=>document.location.href="https://drive.google.com/file/d/1tVRy5u816IYH_hGuD80Wbj-1HYc0975h/view?usp=drivesdk"} style={{padding: "10px 12px", background:"orange", color:"white", width:"50%", fontSize:"13px"}}>Download Base APK </button>
       <br/>
        <Footer />
        </>
    )
}
