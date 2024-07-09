import { Link } from "react-router-dom";
import "../style.css";




function AssignC(){
  document.getElementById("assigncreate").style.display="block"
  document.getElementById("staffdash").style.display="none"
}
function staffDash(){
  document.getElementById("assigncreate").style.display="none"
  document.getElementById("staffdash").style.display="block"
}

function Teachersidebar(){
  

  

    return(
      <>
       <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="#/" className="logo">
                    <img src={require("../img/v.png")} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
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
          <i className="fa fa-dash-circle"></i>
          <span>Assignments</span>
        </a>
      </li>
      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-file-earmark"></i>
          <span>Gradebook</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Messages and Annoucements</span>
        </a>
      </li>
      </Link>
      

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Assessments Result</span>
        </a>
      </li>
      </Link>

      
      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Attendance</span>
        </a>
      </li>
      </Link>

      <Link to="/">
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-dash-circle"></i>
          <span>Student Performance</span>
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
          <span>Help and Support</span>
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
  <a className="fa fa-exclamation-circle" onClick={AssignC}><br /><small className="smaller">Assignments</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Gradebook</small></a>
  <a className="fa fa-phone" href="#/"><br /><small className="smaller">Annoucement</small></a>
  <a className="fa fa-credit-card" href="#/"><br /><small className="smaller">Result</small></a>
  <a className="fa fa-graduation-cap" href="#/"><br /><small className="smaller">Calender</small></a>
  <a className="fa fa-graduation-cap" href="#/"><br /><small className="smaller">Attendance</small></a>
  <a className="fa fa-user-o" href="#/user_setting"><br /><small className="smaller">Profile</small></a>
  <a className="fa fa-exclamation-circle" href="#/"><br /><small className="smaller">Performance</small></a>
  <a className="fa fa-user-o" href="#/"><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default Teachersidebar;