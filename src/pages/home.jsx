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

function loadP(){
    setTimeout(()=>{
        const imgarray=["h.jpg","i.jpg","course-3.jpg","events-2.jpg"];

        var random=Math.floor(Math.random()* imgarray.length);

        document.getElementById("hero").style.background=`url(${require('../img/'+ imgarray[random])}) top center`
    
        document.getElementById("hero").style.backgroundSize= "cover";
        document.getElementById("hero").style.backgroundRepeat= "no-repeat";
    },1000)
}

export default function Home(){
    return(
        <main onLoad={loadP()}>
        <Header />
        <br/>
        <br/>
        <Banner />
        <br/>
        <br/>
        <About />
        <Category />
        <Noties />
        <NotificationPermission />
        <Blog />
        <ScrollToTop smooth className="scrolly"/>
        <Footer />
           </main>
    )
}