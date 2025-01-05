import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import NewsInfo from "../component/news_info";


var path=process.env.REACT_APP_BLOG_API;
export default function News(){

  function handleInfo(blogger){
    document.getElementById("newsinfo").style.display="block"
    document.getElementById("recent-posts").style.display="none";

    
    document.getElementById("newscategory").innerHTML=blogger.news_category;
    document.getElementById("newscontent").value=blogger.news_content;
    document.getElementById("newsheader").innerHTML=blogger.news_heading;
    document.getElementById("newsdate").innerHTML=blogger.date;
    document.getElementById("newsimg").src=blogger.news_img;
    
    
  }

  const [blog, setBlog]=useState([]);
  const [loading, setLoading]=useState(false)

  useEffect(()=>{
fetch(`${path}/blog`)
.then(res => res.json())
.then(data => {setBlog(data)
  setLoading(true)
})
.catch(err => console.log(err))
  },[])
    return(
        <>
        <Header />
        <Breadcrumb title="News and Updates" />
      <br/>
<br/>


<section id="recent-posts" className="recent-posts sections-bg">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
          <h2>News and Updates</h2>
          <p>Find out the most exciting and interesting information from our blog.</p>
        </div>
        <center>{loading ? <a></a> : <a>
       <div>
       <Skeleton width={300} height={30}/>
       <Skeleton width={300}/>
       <Skeleton count={3}/>
        </div> 
        </a>}</center>

        <div className="row gy-4">
        {blog.map(blogger=>(

 <div className="col-xl-4 col-md-6" key={blogger.id}>
 <article onClick={()=>{handleInfo(blogger)}}>

   <div className="post-img">
     <img src={blogger.news_img} alt="" className="img-fluid"/>
   </div>

   <p className="post-category">{blogger.news_category}</p>

   <h2 className="title">
     <a href="#/">{blogger.news_heading}</a>
   </h2>
   <p>Find out ...</p>
   <div className="d-flex align-items-center">
     <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} alt="" className="img-fluid post-author-img flex-shrink-0"/>
     <div className="post-meta">
     <a>Read More</a>
     <br/>
     <a>{blogger.date}</a>
     </div>
   </div>

 </article>
</div>
))}
         

         
        </div>
      </div>
    </section>
 

<div id="newsinfo" style={{display:"none"}}>
<NewsInfo />
</div>
<ScrollToTop smooth/>
  <Footer />
     </>
    )
}