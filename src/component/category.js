import { useEffect, useState } from "react"


var path=process.env.REACT_APP_API_URL;
export default function Category(){
    const [courses,setCourses]=useState([]);
    const [clubs,setClubs]=useState([]);
    
const [loading, setLoading]=useState(false);


    useEffect(()=>{
fetch(`${path}/courses`)
.then(res => res.json())
.then(data => {setCourses(data)
    setLoading(true)
})
.catch(err=> console.log(err))


fetch(`${path}/clubs`)
.then(res => res.json())
.then(data => {setClubs(data)
    setLoading(true)
})
.catch(err=> console.log(err))
    },[])
    return(
        <>
         <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
            <div className="text-center mb-5">
                <h1>Explore Top Subjects</h1>
                
<center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
            </div>
            <div className="row">
                {courses.map(course=>(
                 <div className="col-lg-3 col-md-6 mb-4" key={course.id}>
                 <div className="cat-item position-relative overflow-hidden rounded mb-2">
                     <img className="img-fluid" src={require("../img/course-3.jpg")} alt=""/>
                     <a className="cat-overlay text-white text-decoration-none" href="">
                         <h4 className="text-white font-weight-medium">{course.course}</h4>
                         <span>Learn more</span>
                     </a>
                 </div>
             </div>
                
                ))}
                
            </div>
        </div>
    </div>


    <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
            <div className="text-center mb-5">
                <h1>Explore {process.env.REACT_APP_BRAND_SHORT} CLUBS</h1>
                
<center>{loading ? <a></a> : <a><i className="fa fa-spinner fa-spin"></i> Loading</a>}</center>
            </div>
            <div className="row">
                {clubs.map(club=>(
                 <div className="col-lg-3 col-md-6 mb-4" key={club.id}>
                 <div className="cat-item position-relative overflow-hidden rounded mb-2">
                     <img className="img-fluid" src={require("../img/ui.jpg")} alt=""/>
                     <a className="cat-overlay text-white text-decoration-none" href="">
                         <h4 className="text-white font-weight-medium">{club.club}</h4>
                         <span>Learn more</span>
                     </a>
                 </div>
             </div>
                
                ))}
                
            </div>
        </div>
    </div>
        </>
    )
}