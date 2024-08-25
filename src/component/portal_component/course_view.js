import { useEffect, useState } from "react";

export default function CourseView(){
    
var path=process.env.REACT_APP_API_URL;
const [course, setCourse]=useState([]);

const fetching= ()=>{
    fetch(`${path}/courses`)
    .then(res => res.json())
    .then(data =>{
        setCourse(data)
    })
    .catch(err => console.log(err))
    
}


useEffect(()=>{
        fetching()
},[])
    return(
        <>
        <br/>
        <br/>
       <div style={{padding:"10px 12px",background:"white"}}><i className="bi bi-grid-3x3-gap"></i><h5>Recent Subjects</h5></div>
        <section id="recent-posts" className="recent-posts sections-bg">
      <div className="container" data-aos="fade-up">

      

        <div className="row gy-4">
        {course.map((courselist)=>(
          <div className="col-xl-4 col-md-6" key={courselist.id}>
            <article>

              <div className="post-img">
                <img src={require("/./Users/USER/posty/src/img/course-3.jpg")} alt="" className="img-fluid"/>
              </div>

              <p className="post-category">Subject</p>

              <h2 className="title">
                <a href="#/">{courselist.course}</a>
              </h2>

              <div className="d-flex align-items-center">
                <img src={require(`/./Users/USER/posty/src/img/${process.env.REACT_APP_LOGO}`)} alt="" className="img-fluid post-author-img flex-shrink-0"/>
                <div className="post-meta">
                  <p className="post-author">Staff</p>
                  
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