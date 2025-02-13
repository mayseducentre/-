import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";



var path=process.env.REACT_APP_API_URL;
var assignpath=process.env.REACT_APP_ASSIGN_API;



function Chose(){
     fetch(`${assignpath}/grades`)
        .then(res => res.json())
           .then(data => displayGrade(data))
              .catch(err => console.log(err))

                 
                 }

                 function displayGrade(data){
                     var choose=document.getElementById("choose");
                         var stuclass=document.getElementById("stu_classgrade");
                             var nothing=document.getElementById("nothing");
                                 var gradeshub=document.getElementById("gradeshub");
                                   
                                      

                                      for(var i= 0; i < data.length; i++){
                                          
                                             
                                             if(data[i].subject === "Computing"){
                                                
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


                                                                                                     function PstGrade(){
                                                                                                         fetch(`${assignpath}/grades`)
                                                                                                           .then(res => res.json())
                                                                                                             .then(data => ViewGrade(data))
                                                                                                               .catch(err => console.log(err))

                                                                                                                 
                                                                                                                 }

                                                                                                                 function ViewGrade(data){
                                                                                                                    var choose=document.getElementById("choose");
                                                                                                                       var stuclass=document.getElementById("stu_classgrade");
                                                                                                                          var nothing=document.getElementById("nothing");
                                                                                                                             var gradepast=document.getElementById("pastgrades");
                                                                                                                                
                                                                                                                                  

                                                                                                                                  for(var i= 0; i < data.length; i++){
                                                                                                                                     
                                                                                                                                       
                                                                                                                                       if(choose.value === data[i].subject){
                                                                                                                                          
                                                                                                                                            gradepast.innerHTML +=`
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
                                                                                                                                                                    gradepast.style.display="block"
                                                                                                                                                                      
                                                                                                                                                                      }
                                                                                                                                                                      else{
                                                                                                                                                                         nothing.style.display="block";
                                                                                                                                                                            gradepast.style.display="none"
                                                                                                                                                                            }
                                                                                                                                                                            }

                                                                                                                                                                            }

                                                                                                                                                                            export default function GradeSys(){
                                                                                                                                                                                
                                                                                                                                                                                    const [course, setCourse]=useState([]);
                                                                                                                                                                                    useEffect(()=>{
                                                                                                                                                                                        fetch(`${path}/courses`)
                                                                                                                                                                                            .then(res => res.json())
                                                                                                                                                                                                .then(data => setCourse(data))
                                                                                                                                                                                                    .catch(err => console.log(err));

                                                                                                                                                                                                    }, [])
                                                                                                                                                                                                        
                                                                                                                                                                                                            return(
                                                                                                                                                                                                                    <>
                                                                                                                                                                                                                            <Breadcrumb title="Grades" />
                                                                                                                                                                                                                                    <div className="row">
                                                                                                                                                                                                                                            <div className="col-lg-3 col-md-auto mb-4">
                                                                                                                                                                                                                                                    <select className="choose" id="choose" onChange={Chose}>
                                                                                                                                                                                                                                                                <option value="none">Choose a subject</option>
                                                                                                                                                                                                                                                                      {course.map((courses)=>(
                                                                                                                                                                                                                                                                       <option key={courses.id} value={courses.course}>{courses.course}</option>
                                                                                                                                                                                                                                                                             ))}
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                </select>
                                                                                                                                                                                                                                                                                                        <input type="text" id="stuclassgrade" style={{display:"none"}} readOnly/>
                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                <div id="nothing">
                                                                                                                                                                                                                                                                                                                                            <center>
                                                                                                                                                                                                                                                                                                                                                            <h4>Not graded yet</h4>
                                                                                                                                                                                                                                                                                                                                                                        </center>
                                                                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                                                                        <div id="gradeshub" style={{padding:"10px 12px",display:"none"}}>
                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                            <button onClick={PstGrade} style={{padding:"10px 50px", borderRadius:"10px"}}>View Past Grade</button>
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