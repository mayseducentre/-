
import Footer from "../component/footer";
import Headline from "../component/headlines";
import AssignCreate from "../component/portal_component/assignment_create";
import MeetST from "../component/portal_component/meet_students";
import MeetT from "../component/portal_component/meet_teachers";
import TeacherDash from "../component/portal_component/teacherdash";
import Teachersidebar from "../portal_sidebar/teachers_sidebar";

function TeachersPortal(){
    
    fetch(`${process.env.REACT_APP_API_LOCAL}/studentaccount`)
    .then(res => res.json())
    .then(data => studentTotal(data))
    .catch(err => console.log(err))
  
    // function fetchAll(){
    //     var subject=document.getElementById("subject_owner").value;
      
    //       if(subject == "English"){
    //         var path=`${process.env.REACT_APP_API_LOCAL}/engassign`;
    //     }
    //     if(subject == "Science"){
    //         var path=`${process.env.REACT_APP_API_LOCAL}/sciassign`;
    //     }
    //     if(subject == "Social Studies"){
    //         var path=`${process.env.REACT_APP_API_LOCAL}/socassign`;
    //     }
    //     if(subject == "Mathematics"){
    //         var path=`${process.env.REACT_APP_API_LOCAL}/mathassign`;
    //     }
    //     if(subject == "Computing"){
    //         var path=`${process.env.REACT_APP_API_LOCAL}/compassign`;
    //     }
    //     if(subject == "Creative Art"){
    //         var path=`${process.env.REACT_APP_API_LOCAL}/artassign`;
    //     }
    //       fetch(path)
    //       .then(res => res.json())
    //       .then(data => fetchTotal(data))
    //       .catch(err => console.log(err))
      
      
    //     }
      
      
    //     function fetchTotal(data){
    //       for(var i=0; i<data.length; i++){
    //         document.getElementById("assign_posted").innerHTML=data.length;
    //       }
    //     }
      
      
        function studentTotal(data){
          var studenttotal=document.getElementById("stu_total");
          for(var i=0; i<data.length; i++){
            studenttotal.innerHTML=data.length;
          }
        }
   return(
    <>
    <div id="main">
        <input type="text" id="teacherid" style={{display:"none"}} readOnly/>
        
        <input type="text" id="subject_owner" style={{display:"none"}} readOnly/>
    <Teachersidebar />
    <Headline />
            <br/>
            <br/>
            <br/>
<div id="staffdash">
    <TeacherDash />
    <MeetT />
    <MeetST />
    </div>

<div id="assigncreate" style={{display:"none"}}>
    <AssignCreate />
    </div>
    <Footer />
    </div>
    </>
   )
}
export default TeachersPortal;