import { Link } from "react-router-dom";
import "../style.css";



function Parentsidebar(){
  



    return(
      <>
       <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="#/" className="logo">
                    <img src={require("../img/v.png")} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
                    <div>
                    <a href="#/user_setting" id="parentusername" style={{textTransform:"uppercase",color:"whitesmoke"}}>
                      </a>&nbsp;
                      <img src={localStorage.getItem('topimgport')} style={{width:"40px",height:"40px",borderRadius:"50%",zIndex:"9"}} />
                  
                    </div>
            </div>
        </header>
       
        <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">
    <Link to="/user_setting">
      <li className="nav-item">
        <a className="nav-link">
        <img src={localStorage.getItem('topimgport')} style={{width:"50px",height:"50px",borderRadius:"50%",zIndex:"9"}} />
     &nbsp;<span style={{textTransform:"uppercase",color:"whitesmoke"}}>PARENT
                      </span>
        </a>
      </li>
     </Link> 

<Link to="/">
      <li className="nav-item">
        <a className="nav-link">
          <i className="fa fa-PARENT"></i>
          <span>Dashboard</span>
        </a>
      </li>
     </Link> 


      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Completed assignments</span>
        </a>
      </li>
      </Link>
      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Messages and Annoucement</span>
        </a>
      </li>
      </Link>
      

      <Link to="/user_setting">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>My Profile</span>
        </a>
      </li>
      </Link>

      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Payments and fees</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Attendance tracking</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Student Grades</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Calendar</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Student behavior</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Help Desk</span>
        </a>
      </li>
      </Link>
      
      <li className="nav-item" onClick={()=>{window.location.reload()}}>
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Sign out</span>
        </a>
      </li>
     
    </ul>

  </aside>
 
  <div className="bottom-nav animate__animated animate__fadeInUp">
  <a className="fa fa-home" href="#/"><br /><small className="smaller">Dashboard</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Assignments</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Student Grades</small></a>
  <a className="fa fa-phone" href="#/"><br /><small className="smaller">Behaviour</small></a>
  <a className="fa fa-credit-card" href="#/"><br /><small className="smaller">Announcements</small></a>
  <a className="fa fa-graduation-cap" href="#/"><br /><small className="smaller">Calender</small></a>
  <a className="fa fa-user-o" href="#/user_setting"><br /><small className="smaller">My Profile</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Payments & Fees</small></a>
  <a className="fa fa-shield" href="#/"><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default Parentsidebar;