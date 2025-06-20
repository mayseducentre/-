
import ScrollToTop from "react-scroll-to-top";
import Footer from "../component/footer";
import Headline from "../component/headlines";
import AssignView from "../component/portal_component/assigment_view";
import CourseView from "../component/portal_component/course_view";
import ProjectUpload from "../component/portal_component/projectupload";
import MeetST from "../component/portal_component/meet_students";
import Studentsidebar from "../portal_sidebar/student_sidebar";
import MeetT from "../component/portal_component/meet_teachers";
import AnnounceHubView from "../component/portal_component/viewannounce";
import ViewCalendar from "../component/portal_component/viewcalendar";
import Meet from "../component/portal_component/meet_online";
import GradeSys from "../component/portal_component/checkgrades";

function StudentPortal({user}){
   return(
    <>
    <div id="main">
      
    <input type="text" id="studentid" style={{display:"none"}} readOnly/>
      <Headline />
    <Studentsidebar user={user}/>
    <br/>
    <br/>
    <div id="courseview">
    <CourseView />
    <MeetST />
    <MeetT />
    </div>
    <div id="assignview" style={{display:"none"}}>
    <AssignView user={user}/>
  
    </div>
    <div id="projectupload" style={{display:"none"}}>
    <ProjectUpload />
    </div>
    <div id="calendarviewer" style={{display:"none"}}>
    <ViewCalendar />
    </div>
    <div id="announcem" style={{display:"none"}}>
    <AnnounceHubView />
    </div>
    
    <div id="meetme" style={{display:"none"}}>
    <Meet />
    </div>
    <div id="checkmygrade" style={{display:"none"}}>
    <GradeSys user={user}/>
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