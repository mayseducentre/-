
import MiniBread from "../component/mini_breadcrumb"

const Rf= () =>{
    window.location.reload()
}
export default function Iframe(){
    return(
        <>
<MiniBread main="Library" event={Rf}/>
<input id="iframe_name" style={{display:"none"}} readOnly/>
        <div>
        <iframe id="frame" style={{width:"100%", height:"100vh"}}  frameBorder="0" allowFullScreen></iframe>
   
        </div>
        </>
    )
}