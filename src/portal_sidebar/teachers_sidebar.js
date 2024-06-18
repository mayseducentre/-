import { Link } from "react-router-dom";
import "../style.css";



function Teachersidebar(){
  



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
          <i className="bi bi-grid"></i>
          <span>Home</span>
        </a>
      </li>
     </Link> 


      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Classes and assignments</span>
        </a>
      </li>
      </Link>
      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-file-earmark"></i>
          <span>Grades</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Messages and Notifications</span>
        </a>
      </li>
      </Link>
      

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Resources</span>
        </a>
      </li>
      </Link>

      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Calendar</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Attendance</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Extracurricular activities</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Support</span>
        </a>
      </li>
      </Link>
      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="bi bi-dash-circle"></i>
          <span>Blank</span>
        </a>
      </li>
      </Link>
     
    </ul>

  </aside>
 
  <div className="bottom-nav animate__animated animate__fadeInUp">
  <a className="fa fa-home" href="#/"><br /><small className="smaller">Home</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Assignments</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Grades</small></a>
  <a className="fa fa-phone" href="#/"><br /><small className="smaller">Grades</small></a>
  <a className="fa fa-credit-card" href="#/"><br /><small className="smaller">Notifications</small></a>
  <a className="fa fa-graduation-cap" href="#/"><br /><small className="smaller">Calender</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Resources</small></a>
  <a className="fa fa-user-o" href="#/"><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default Teachersidebar;