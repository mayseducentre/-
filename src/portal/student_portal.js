
import Footer from "../component/footer";
import Headline from "../component/headlines";
import AssignView from "../component/portal_component/assigment_view";
import CourseView from "../component/portal_component/course_view";
import MeetST from "../component/portal_component/meet_students";
import Studentsidebar from "../portal_sidebar/student_sidebar";

function StudentPortal(){
   return(
    <>
    <div id="main">
      
    <input type="text" id="studentid" style={{display:"none"}} readOnly/>
      <Headline />
    <Studentsidebar />
    <br/>
    <br/>
    <div id="courseview">
    <CourseView />
    <MeetST />
    </div>
    <div id="assignview" style={{display:"none"}}>
    <AssignView />
    </div>
    <br/>
    <br/>
    <Footer />
    </div>
    </>
   )
}
export default StudentPortal;