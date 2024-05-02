import Header from "../component/header";
import "../style.css";
import "../bootstrap.css"
import Banner from "../component/banner";
import About from "../component/about";
import Footer from "../component/footer";

function loadP(){
    setTimeout(()=>{
        const imgarray=["hero-bg.jpg","course-details.jpg","course-3.jpg","events-2.jpg"];

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
        <Banner />
        <br/>
        <br/>
        <About />
        <Footer />
           </main>
    )
}