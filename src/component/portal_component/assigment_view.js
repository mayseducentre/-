import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";



var path=process.env.REACT_APP_API_LOCAL;


function AdjustC(){
    
    var content=document.getElementById("worksheet");

content.style.height="1px"
content.style.height=(content.scrollHeight)+"px";
}

function Chose(){
     fetch(`${path}/engassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   
   fetch(`${path}/sciassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   
   fetch(`${path}/mathassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   
   fetch(`${path}/socassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${path}/compassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${path}/artassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))
}

function displayAssign(data){
    var choose=document.getElementById("choose");
    var stuclass=document.getElementById("stu_class");
    var nothing=document.getElementById("nothing");
    var assignhub=document.getElementById("assignhub");
  
   

for(var i= 0; i < data.length; i++){
    
   
if(choose.value === data[i].subject && stuclass.value === data[i].level){
    var div=document.createElement("div");
   assignhub.innerHTML=`
   <h5>Assignment</h5>
   <small>End of submision: ${data[i].end_subm}</small>
   <br>
   <small>Reference: ${data[i].reference}</small>
   <center>
   <h4><u>${data[i].topic}</u></h4>
   </center>
   <small>Posted by Sir/Madam ${data[i].name} on ${data[i].time}</small>
   <br>
   <br>
   <textarea style="height:300px;border:none" readonly>${data[i].content}</textarea>
   `
   nothing.style.display="none";
   assignhub.style.display="block"
  
   
}
else{
    nothing.style.display="block";
    assignhub.style.display="none"
}
}

}

export default function AssignView(){
    
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
 <option value={courses.course}>{courses.course}</option>
      ))}
           
        </select>
        <input type="text" id="stu_class" style={{display:"none"}} readOnly/>
        </div>
        </div>

        <div id="nothing">
            <center>
                <h4>Nothing to show</h4>
            </center>
        </div>

        <div id="assignhub" style={{padding:"10px 12px",display:"none"}}>
        </div>
        <br/>
        <br/>
        
        <div id="submitassign">
            <form>
            <h6>Your worksheet</h6>
      <small>You can upload an image or type your answer</small>
        <textarea id="worksheet" onKeyUp={AdjustC}></textarea>
      <center>
        <button className="site-btn" type="submit">Submit Answer</button>
        </center>
        
                
        </form>
        </div>
        </>
    )
}