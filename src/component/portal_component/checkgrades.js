import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";



var path=process.env.REACT_APP_API_URL;
var assignpath=process.env.REACT_APP_ASSIGN_API;



function Chose(){
     fetch(`${assignpath}/grades`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   
}

function displayAssign(data){
    var choose=document.getElementById("choose");
    var stuclass=document.getElementById("stu_classgrade");
    var nothing=document.getElementById("nothing");
    var gradeshub=document.getElementById("gradeshub");
  
   

for(var i= 0; i < data.length; i++){
    
   
if(choose.value === data[i].subject && stuclass.value === data[i].level){
    var div=document.createElement("div");
   gradeshub.innerHTML=`
   <h5>Grades</h5>
   <br>
   <center>
   <h4><u>${data[i].topic}</u></h4>
   </center>
   <small>Posted by Sir/Madam ${data[i].name} on ${data[i].time}</small>
   <br>
   <br>
   <textarea style="height:300px;border:none" readonly>${data[i].content}</textarea>
   `
   nothing.style.display="none";
   gradeshub.style.display="block"
  
   
}
else{
    nothing.style.display="block";
    gradeshub.style.display="none"
}
}

}


function PstAssign(){
    fetch(`${assignpath}/grades`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  
}

function Viewassign(data){
   var choose=document.getElementById("choose");
   var stuclass=document.getElementById("stu_classgrade");
   var nothing=document.getElementById("nothing");
   var assignpast=document.getElementById("pastgrades");
   
  

for(var i= 0; i < data.length; i++){
   
  
if(choose.value === data[i].subject && stuclass.value === data[i].level){
   
  assignpast.innerHTML +=`
  <h5>Past Grades</h5>
  <br>
  <center>
  <h4><u>${data[i].topic}</u></h4>
  </center>
  <small>Posted by Sir/Madam ${data[i].name} on ${data[i].time}</small>
  <br>
  <br>
  <textarea style="height:300px;border:none" readonly>${data[i].content}</textarea>
  `
  nothing.style.display="none";
  assignpast.style.display="block"
  
}
else{
   nothing.style.display="block";
   assignpast.style.display="none"
}
}

}

export default function CheckGrades(){
    
    const [course, setCourse]=useState([]);
useEffect(()=>{
    fetch(`${path}/courses`)
    .then(res => res.json())
    .then(data => setCourse(data))
    .catch(err => console.log(err));

}, [])
    
    return(
        <>
        <Breadcrumb title="Classes and Assignments" />
        <div className="row">
        <div className="col-lg-3 col-md-auto mb-4">
        <select className="choose" id="choose" onChange={Chose}>
            <option value="none">Choose a subject</option>
      {course.map((courses)=>(
 <option key={courses.id} value={courses.course}>{courses.course}</option>
      ))}
           
        </select>
        <input type="text" id="stu_classgrade" style={{display:"none"}} readOnly/>
        </div>
        </div>

        <div id="nothing">
            <center>
                <h4>Not graded yet</h4>
            </center>
        </div>

        <div id="gradeshub" style={{padding:"10px 12px",display:"none"}}>
            
        <button onClick={PstAssign} style={{padding:"10px 50px", borderRadius:"10px"}}>View Past Assignment</button>
        </div>
        <br/>
        <br/>
        
        
        <br/>
        <br/>

        <div id="pastgrades" style={{display:"none"}}>

        </div>
        </>
    )
}