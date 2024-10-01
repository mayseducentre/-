import { Link } from "react-router-dom";
import "../style.css";




function AssignC(){
  document.getElementById("assigncreate").style.display="block"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="block"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="none"
}
function staffDash(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="block"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="block"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="none"
}


function Assess(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="block"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="block"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="none"
}



function Register(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="none"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("register").style.display="block"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("messageme").style.display="none"
}

function StudentPerf(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="block"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="block"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="none"
}

function StaffChatroom(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="block"
  document.getElementById("footerport").style.display="none"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="none"
}


function Lesson(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="none"
  document.getElementById("teachersnote").style.display="block"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="none"
}


function MeetOnline(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="none"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("meetonline").style.display="block"
  document.getElementById("register").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="none"
}


function viewCal(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="none"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("calendarviewing").style.display="block"
  document.getElementById("messageme").style.display="none"
}


function Message(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="none"
  document.getElementById("assessment").style.display="none"
  document.getElementById("studentperformance").style.display="none"
  document.getElementById("staffchatroom").style.display="none"
  document.getElementById("footerport").style.display="none"
  document.getElementById("teachersnote").style.display="none"
  document.getElementById("meetonline").style.display="none"
  document.getElementById("register").style.display="none"
  document.getElementById("calendarviewing").style.display="none"
  document.getElementById("messageme").style.display="block"
}


function Teachersidebar(){
  

  

    return(
      <>
       <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="#/" className="logo">
                    <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
                    <div>
                    <a href="#/user_setting" id="teacherusername" style={{textTransform:"uppercase",color:"whitesmoke"}}>
                      </a>&nbsp;
                      <img id="teachheadimg" style={{width:"40px",height:"40px",borderRadius:"50%",zIndex:"9"}} />
                  
                    </div>
                    
                     </div>
        </header>
       
        <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">
    <Link to="/user_setting">
      <li className="nav-item">
        <a className="nav-link">
        <img id="teachimgport" style={{width:"50px",height:"50px",borderRadius:"50%",zIndex:"9"}} />
     &nbsp;<span style={{textTransform:"uppercase",color:"whitesmoke"}}>TEACHER
                      </span>
        </a>
      </li>
     </Link> 

      <li className="nav-item" onClick={staffDash}>
        <a className="nav-link">
          <i className="fa fa-grid"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <li className="nav-item" onClick={AssignC}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Assignments</span>
        </a>
      </li>
      <li className="nav-item" onClick={Lesson}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Note</span>
        </a>
      </li>
      
      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-file-earmark"></i>
          <span>Gradebook</span>
        </a>
      </li>
      

      
      <li className="nav-item" onClick={Message}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Messages and Annoucements</span>
        </a>
      </li>
      
      

      
      <li className="nav-item" onClick={Assess}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Assessments Result</span>
        </a>
      </li>
  
      <li className="nav-item" onClick={Register}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Register Book</span>
        </a>
      </li>

      <li className="nav-item" onClick={StaffChatroom}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Staff Chat Room</span>
        </a>
      </li>

      <li className="nav-item" onClick={MeetOnline}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Virtual Classroom</span>
        </a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Examination</span>
        </a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Attendance</span>
        </a>
      </li>
      

   
      <li className="nav-item" onClick={StudentPerf}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Student Performance</span>
        </a>
      </li>

      
      <li className="nav-item" onClick={viewCal}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Calendar and Scheduling</span>
        </a>
      </li>
      

      <Link to="/user_setting">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>My Profile</span>
        </a>
      </li>
      </Link>

      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Help and Support</span>
        </a>
      </li>
      
      
      <li className="nav-item" onClick={()=>{window.location.reload()}}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Sign out</span>
        </a>
      </li>
     
    </ul>

  </aside>
 
  <div className="bottom-nav animate__animated animate__fadeInUp">
  <a className="fa fa-dashboard" onClick={staffDash}><br /><small className="smaller">Dashboard</small></a>
  <a className="fa fa-bar-chart" onClick={AssignC}><br /><small className="smaller">Assignments</small></a>
  <a className="fa fa-book" href="#/"><br /><small className="smaller">Gradebook</small></a>
  <a className="fa fa-bullhorn" href="#/" onClick={Message}><br /><small className="smaller">Annoucement</small></a>
  <a className="fa fa-filter" onClick={Assess}><br /><small className="smaller">Result</small></a>
  <a className="fa fa-file" onClick={Register}><br /><small className="smaller">Register</small></a>
  <a className="fa fa-comments-o" title="Staff Chat Room" onClick={StaffChatroom}><br /><small className="smaller">ChatRoom</small></a>
  <a className="fa fa-calendar-o" onClick={viewCal} href="#/"><br /><small className="smaller">Calender</small></a>
  <a className="fa fa-group" href="#/"><br /><small className="smaller">Attendance</small></a>
  <a className="fa fa-laptop" href="#/" title="Virtual Classroom" onClick={MeetOnline}><br /><small className="smaller">VR Class</small></a>
  <a className="fa fa-paper" href="#/" title="Examination"><br /><small className="smaller">Exams</small></a>
  <a className="fa fa-book" onClick={Lesson}><br /><small className="smaller">Notes</small></a>
  <a className="fa fa-user-o" href="#/user_setting"><br /><small className="smaller">Profile</small></a>
  <a className="fa fa-child" onClick={StudentPerf}><br /><small className="smaller">Performance</small></a>
  <a className="fa fa-shield" href="#/"><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default Teachersidebar;