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

export default function Home(){
    return(
        <main>
            
        <Header />
        <Headline />
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
           </main>
    )
}