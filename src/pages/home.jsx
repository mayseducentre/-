import Header from "../component/header";
import "../style.css";
import "../animate.css";
import "../bootstrap.css";
import "../bootstrap-icon.css";
import Banner from "../component/banner";
import About from "../component/about";
import Footer from "../component/footer";
import ScrollToTop from "react-scroll-to-top";
import Category from "../component/category";
import Blog from "../component/blog";
import Noties from "../notification/noties";
import NotificationPermission from "../notification/noties_permission";
import Headline from "../component/headlines";
import Imgsec from "../component/imgsec";
import Skeleton from "react-loading-skeleton"
import SecretIpPush from "../component/secret"
import "react-loading-skeleton/dist/skeleton.css"


// function loadP(){
//     setTimeout(()=>{
//         const imgarray=["mays/speech.jpg","mays/play.jpg","mays/pol.jpg","mays/cert.jpg","mays/fish.jpg"];
//         const textarray=["May's Daycare and Educational Centre","Learning today, leading tomorrow","MEC Portal","Why MDCEC for my child","Create an account now","Unparalleled Educational Experience","Technical Skills for all","Get in touch"]

//         var imgrandom=Math.floor(Math.random()* imgarray.length);
//         var textrandom=Math.floor(Math.random()* textarray.length);

//         document.getElementById("hero").style.background=`url(${require('../img/'+ imgarray[imgrandom])}) top center`
//     document.getElementById("ban_txt").innerHTML=textarray[textrandom];
//         document.getElementById("hero").style.backgroundSize= "cover";
//         document.getElementById("hero").style.backgroundRepeat= "no-repeat";
//     },1000)
// }
function Loadit(){
setTimeout(()=>{
    document.getElementById("skeleton").style.display="none";
    document.getElementById("mainc").style.display="block"
}, 3000)
}
export default function Home(){
    return(
        <main onLoad={Loadit}>
            <div id="skeleton" style={{position:"fixed",top:"0",left:"0",width:"100%", height:"100vh",backgroundColor:"white",zIndex:"9999"}}>
                <br/>
            
                <Skeleton width={400} height={250}/>
                <Skeleton count={3} width={200} />
                <Skeleton width={30} height={30}/>
                <Skeleton count={2}/>
                <Skeleton width={400} count={3}/>
                <Skeleton width={500} />

            </div>
           <div id="mainc" style={{display:"none"}}> 
        <Header />
        <Headline />
        <SecretIpPush />
        <br/>
        <br/>
        <Banner />
        <br/>
        <br/>
        <About />
        <Category />
        {/* <Noties />
        <NotificationPermission /> */}
        <Blog />
        <Imgsec />
        <ScrollToTop smooth className="scrolly"/>
        <Footer />
        </div>
           </main>
    )
}