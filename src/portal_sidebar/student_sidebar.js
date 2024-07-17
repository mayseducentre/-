import { Link } from "react-router-dom";
import "../style.css";

function AssignV(){
  document.getElementById("assignview").style.display="block"
  document.getElementById("courseview").style.display="none"
  document.getElementById("resourceview").style.display="none"
  document.getElementById("extraactview").style.display="none"
}
function ExtraAct(){
  document.getElementById("assignview").style.display="none"
  document.getElementById("courseview").style.display="none"
  document.getElementById("resourceview").style.display="none"
  document.getElementById("extraactview").style.display="block"
}


function CourseV(){
  document.getElementById("assignview").style.display="none"
  document.getElementById("courseview").style.display="block"
  document.getElementById("resourceview").style.display="none"
  document.getElementById("extraactview").style.display="none"
}

function Studentsidebar(){
  


    return(
      <>
       <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="#/" className="logo">
                    <img src={require("../img/v.png")} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
                    <div>
                    <a href="#/user_setting" id="studentusername" style={{textTransform:"uppercase",color:"whitesmoke"}}>
                      </a>&nbsp;
                      <img id="stuheadimg" style={{width:"40px",height:"40px",borderRadius:"50%",zIndex:"9"}} />
                  
                    </div>
            </div>
        </header>
       
        <aside id="sidebar" className="sidebar">
        
    <ul className="sidebar-nav" id="sidebar-nav">
    
     <Link to="/user_setting">
      <li className="nav-item" style={{cursor:"pointer"}}>
        <a className="nav-link">
        <img id="stuimgport" style={{width:"50px",height:"50px",borderRadius:"50%",zIndex:"9"}} />
     &nbsp;<span style={{textTransform:"uppercase",color:"whitesmoke"}}>STUDENT
                      </span>
        </a>
      </li>
     </Link> 

   
      <li className="nav-item" style={{cursor:"pointer"}} onClick={CourseV}>
        <a className="nav-link">
          <i className="fa fa-grid"></i>
          <span>Dashboard</span>
        </a>
      </li> 


      
      <li className="nav-item" style={{cursor:"pointer"}} onClick={AssignV}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Classes and assignments</span>
        </a>
      </li>
      
      <Link to="/">
      <li className="nav-item" style={{cursor:"pointer"}}>
        <a className="nav-link collapsed">
          <i className="fa fa-file-earmark"></i>
          <span>Grades</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item" style={{cursor:"pointer"}}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Messages and Notifications</span>
        </a>
      </li>
      </Link>
      

      
      <Link to="/">
      <li className="nav-item" style={{cursor:"pointer"}}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Calendar</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item" style={{cursor:"pointer"}}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Attendance</span>
        </a>
      </li>
      </Link>

      <li className="nav-item" style={{cursor:"pointer"}} onClick={ExtraAct}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Extracurricular activities</span>
        </a>
      </li>

      <Link to="/">
      <li className="nav-item" style={{cursor:"pointer"}}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Support</span>
        </a>
      </li>

      </Link> <Link to="/user_setting">
      <li className="nav-item" style={{cursor:"pointer"}}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>My Profile</span>
        </a>
      </li>
      </Link>
      
      <li className="nav-item" style={{cursor:"pointer"}} onClick={()=>{window.location.reload()}}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Sign out</span>
        </a>
      </li>
     
    </ul>

  </aside>
  <div className="bottom-nav animate__animated animate__fadeInUp">
  <a className="fa fa-dashboard" onClick={CourseV}><br /><small className="smaller">Dashboard</small></a>
  <a className="fa fa-bar-chart-o" onClick={AssignV}><br /><small className="smaller">Assignments</small></a>
  <a className="fa fa-graduation-cap"><br /><small className="smaller">Grades</small></a>
  <a className="fa fa-bullhorn"><br /><small className="smaller">Announcements</small></a>
  <a className="fa fa-calendar-o"><br /><small className="smaller">Calender</small></a>
  <a className="fa fa-gamepad" onClick={ExtraAct}><br /><small className="smaller">Extra Activities</small></a>
  <a className="fa fa-user-o" href="#/user_setting"><br /><small className="smaller">My Profile</small></a>
  <a className="fa fa-shield"><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default Studentsidebar;