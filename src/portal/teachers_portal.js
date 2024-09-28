
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Headline from "../component/headlines";
import Assessment from "../component/portal_component/assessment";
import AssignCreate from "../component/portal_component/assignment_create";
import MeetST from "../component/portal_component/meet_students";
import MeetT from "../component/portal_component/meet_teachers";
import StaffChatRoom from "../component/portal_component/staffchatroom";
import StudentPerform from "../component/portal_component/student_performance";
import TeacherDash from "../component/portal_component/teacherdash";
import Teachersidebar from "../portal_sidebar/teachers_sidebar";
import MeetP from "../component/portal_component/meet_parent";
import LNote from "../component/portal_component/lesson_note";
import Meet from "../component/portal_component/meet_online";
import RegisterBook from "../component/portal_component/registerbook";
import ViewCalendar from "../component/portal_component/viewcalendar";

function TeachersPortal(){
    
    fetch(`${process.env.REACT_APP_ACCOUNT_API}/studentaccount`)
    .then(res => res.json())
    .then(data => studentTotal(data))
    .catch(err => console.log(err))


    fetch(`${process.env.REACT_APP_API_URL}/courses`)
    .then(res => res.json())
    .then(data => subjectTotal(data))
    .catch(err => console.log(err))

    
    // function fetchAll(){
    //     var subject=document.getElementById("subject_owner").value;
      
    //       if(subject == "English"){
    //         var path=`${process.env.REACT_APP_API_URL}/engassign`;
    //     }
    //     if(subject == "Science"){
    //         var path=`${process.env.REACT_APP_API_URL}/sciassign`;
    //     }
    //     if(subject == "Social Studies"){
    //         var path=`${process.env.REACT_APP_API_URL}/socassign`;
    //     }
    //     if(subject == "Mathematics"){
    //         var path=`${process.env.REACT_APP_API_URL}/mathassign`;
    //     }
    //     if(subject == "Computing"){
    //         var path=`${process.env.REACT_APP_API_URL}/compassign`;
    //     }
    //     if(subject == "Creative Art"){
    //         var path=`${process.env.REACT_APP_API_URL}/artassign`;
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

       
        function subjectTotal(data){
          var subjtotal=document.getElementById("subj_total");
          for(var i=0; i<data.length; i++){
            subjtotal.innerHTML=data.length;
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
    <MeetP />
    </div>

<div id="assigncreate" style={{display:"none"}}>
    <AssignCreate />
    </div>
    <div id="assessment" style={{display:"none"}}>
    <Assessment />
    </div>
    
    <div id="studentperformance" style={{display:"none"}}>
    <StudentPerform />
    </div>
    <div id="staffchatroom" style={{display:"none"}}>
    <StaffChatRoom />
    </div>
    <div id="teachersnote" style={{display:"none"}}>
    <LNote />
    </div>
    <div id="meetonline" style={{display:"none"}}>
    <Meet />
    </div>
    <div id="register" style={{display:"none"}}>
    <RegisterBook />
    </div>
    <div id="calendar" style={{display:"none"}}>
    <ViewCalendar />
    </div>
    <div id="footerport">
    <Footer />
    </div>
    </div>
    
<ScrollToTop smooth className="scrolly"/>
    </>
   )
}
export default TeachersPortal;