
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Headline from "../component/headlines";
import AssignView from "../component/portal_component/assigment_view";
import CourseView from "../component/portal_component/course_view";
import ExtraActView from "../component/portal_component/extraactive";
import MeetST from "../component/portal_component/meet_students";
import Studentsidebar from "../portal_sidebar/student_sidebar";
import MeetT from "../component/portal_component/meet_teachers";

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
    <MeetT />
    </div>
    <div id="assignview" style={{display:"none"}}>
    <AssignView />
    </div>
    <div id="extraactview" style={{display:"none"}}>
    <ExtraActView />
    </div>

    <br/>
    <br/>
    
<ScrollToTop smooth className="scrolly"/>
    <Footer />
    </div>
    </>
   )
}
export default StudentPortal;