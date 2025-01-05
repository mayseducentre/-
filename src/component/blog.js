import { useEffect, useState } from "react"


const path=process.env.REACT_APP_BLOG_API;
export default function Blog(){
  const [blog, setBlog]=useState([]);

  const [loading, setLoading]=useState(false);
  useEffect(()=>{
    fetch(`${path}/blog`)
    .then(res =>res.json())
    .then(data => {setBlog(data)
      setLoading(true)
    })
    .catch(err=> console.log(err))
  },[])
    return(
        <>
         <section id="recent-posts" className="recent-posts sections-bg">
      <div className="container" data-aos="fade-up">

        <div className="section-header">
          <h2>News and Updates</h2>
          <p>Find out the most exciting and interesting information from our blog.</p>
        </div>

        <div className="row gy-4">
        <center>{loading ? <a></a> : <a><div className="loadery"></div></a>}</center>
{blog.slice(0, 4).map(blogger=>(

 <div className="col-xl-4 col-md-6" onClick={()=>{window.location.href="#/news_updates"}} key={blogger.id}>
 <article>

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
        </>
    )
}