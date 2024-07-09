import { Link } from "react-router-dom";
import "../style.css";



function AdminSidebar(){
  



    return(
      <>
       <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="#/" className="logo">
                    <img src={require("../img/v.png")} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
                
            </div>
        </header>
       
        <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

<Link to="/">
      <li className="nav-item">
        <a className="nav-link">
          <i className="fa fa-grid"></i>
          <span>Home</span>
        </a>
      </li>
     </Link> 


      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Manage Students</span>
        </a>
      </li>
      </Link>
      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-file-earmark"></i>
          <span>Manage Teachers</span>
        </a>
      </li>
      </Link>
      
      <Link to="/user_setting">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Manage Parents</span>
        </a>
      </li>
      </Link>


      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Accessibility</span>
        </a>
      </li>
      </Link>
      

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Server</span>
        </a>
      </li>
      </Link>

      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Tracking</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Performance</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Calendar and Scheduling</span>
        </a>
      </li>
      </Link>

     
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Announcement Hub</span>
        </a>
      </li>
      </Link>
      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Sign out</span>
        </a>
      </li>
      </Link>
     
    </ul>

  </aside>
 
  <div className="bottom-nav animate__animated animate__fadeInUp">
  <a className="fa fa-home" href="#/"><br /><small className="smaller">Home</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Assignments</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Gradebook</small></a>
  <a className="fa fa-phone" href="#/"><br /><small className="smaller">Annoucement</small></a>
  <a className="fa fa-credit-card" href="#/"><br /><small className="smaller">Assessments Result</small></a>
  <a className="fa fa-graduation-cap" href="#/"><br /><small className="smaller">Calender</small></a>
  <a className="fa fa-graduation-cap" href="#/"><br /><small className="smaller">Attendance</small></a>
  <a className="fa fa-user-o" href="#/user_setting"><br /><small className="smaller">My Profile</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Student Performance</small></a>
  <a className="fa fa-user-o" href="#/"><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default AdminSidebar;