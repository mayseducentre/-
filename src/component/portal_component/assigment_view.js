import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";



var path=process.env.REACT_APP_API_URL;
var assignpath=process.env.REACT_APP_ASSIGN_API;


function AdjustC(){
    
    var content=document.getElementById("worksheet");

content.style.height="1px"
content.style.height=(content.scrollHeight)+"px";
}

function Chose(){
     fetch(`${assignpath}/engassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   
   fetch(`${assignpath}/sciassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   
   fetch(`${assignpath}/mathassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   
   fetch(`${assignpath}/socassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${assignpath}/compassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${assignpath}/artassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${assignpath}/gaassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${assignpath}/frenchassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${assignpath}/careertechassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))

   fetch(`${assignpath}/rmeassign`)
   .then(res => res.json())
   .then(data => displayAssign(data))
   .catch(err => console.log(err))
}

function displayAssign(data){
    var choose=document.getElementById("choose");
    var stuclass=document.getElementById("stu_class");
    var nothing=document.getElementById("nothing");
    var assignhub=document.getElementById("assignhub");
    var assignpost=document.getElementById("submitassign");
  
   

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
   assignpost.innerHTML=`
   <p>Please send your ${data[i].subject} assignment through this email <a href="mailto:${data[i].email}">${data[i].email}</a>. You can do the work in an exercise book and take a picture of it. Then attach that picture or file and send it to <a href="mailto:${data[i].email}">${data[i].email}</a></p>
   <br/>
   
   `
   nothing.style.display="none";
   document.getElementById("pstbtn").style.display="block"
   assignhub.style.display="block"
   assignpost.style.display="block"
  
   
}
else{
    nothing.style.display="block";
    assignhub.style.display="none"
}
}

}


function PstAssign(){
    fetch(`${assignpath}/engassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  
  fetch(`${assignpath}/sciassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  
  fetch(`${assignpath}/mathassign`)  .then(res => res.json())
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  
  fetch(`${assignpath}/socassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  fetch(`${assignpath}/compassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  fetch(`${assignpath}/artassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  fetch(`${assignpath}/gaassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  fetch(`${assignpath}/frenchassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  fetch(`${assignpath}/careertechassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))

  fetch(`${assignpath}/rmeassign`)
  .then(res => res.json())
  .then(data => Viewassign(data))
  .catch(err => console.log(err))
}

function Viewassign(data){
   var choose=document.getElementById("choose");
   var stuclass=document.getElementById("stu_class");
   var nothing=document.getElementById("nothing");
   var assignpast=document.getElementById("pastassign");
   
  

for(var i= 0; i < data.length; i++){
   
  
if(choose.value === data[i].subject && stuclass.value === data[i].level){
   
  assignpast.innerHTML +=`
  <h5>Past Assignment</h5>
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
  document.getElementById("pstbtn").style.display="none"
  assignpast.style.display="block"
  
}
else{
   nothing.style.display="block";
   assignpast.style.display="none"
}
}

}

export default function AssignView({user}){
    
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
        <input type="text" value={user.class} id="stu_class" style={{display:"none"}} readOnly/>
        </div>
        </div>

        <div id="nothing">
            <center>
                <h4>Nothing posted yet</h4>
            </center>
        </div>

        <div id="assignhub" style={{padding:"10px 12px",display:"none"}}>
        </div>
        <button id="pstbtn" style={{padding:"10px 12px", background:"orange",display:"none"}} onClick={PstAssign}>Past Assignments</button>
    
        <br/>
        <br/>
        
        <div id="submitassign" style={{display:"none"}}>
           
        </div>
        <br/>
        <br/>
        <div id="pastassign" style={{display:"none"}}>
    
        </div>

        <br />
        <br />
        </>
    )
}