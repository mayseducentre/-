import { Link } from "react-router-dom";
import "../style.css";


function Payfee(){
  document.getElementById("parentdash").style.display="none"
  document.getElementById("payfees").style.display="block"
  document.getElementById("mychild").style.display="none"
}


function PDash(){
  document.getElementById("parentdash").style.display="block"
  document.getElementById("payfees").style.display="none"
  document.getElementById("mychild").style.display="none"
}

function ChildS(){
  document.getElementById("parentdash").style.display="none"
  document.getElementById("mychild").style.display="block"
  document.getElementById("payfees").style.display="none"
}


function Parentsidebar(){
  



    return(
      <>
       <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a href="#/" className="logo">
                    <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
                    <div>
                    <a href="#/user_setting" id="parentusername" style={{textTransform:"uppercase",color:"whitesmoke"}}>
                      </a>&nbsp;
                      <img id="parentheadimg" style={{width:"40px",height:"40px",borderRadius:"50%",zIndex:"9"}} />
                  
                    </div>
            </div>
        </header>
       
        <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">
    <Link to="/user_setting">
      <li className="nav-item">
        <a className="nav-link">
        <img id="parentimgport" style={{width:"50px",height:"50px",borderRadius:"50%",zIndex:"9"}} />
     &nbsp;<span style={{textTransform:"uppercase",color:"whitesmoke"}}>PARENT
                      </span>
        </a>
      </li>
     </Link> 


      <li className="nav-item" onClick={PDash}>
        <a className="nav-link">
          <i className="fa fa-PARENT"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <li className="nav-item" onClick={ChildS}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>My Child</span>
        </a>
      </li>

      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Completed assignments</span>
        </a>
      </li>
      
      
      
      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Messages and Annoucement</span>
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

      
      
      <li className="nav-item" onClick={Payfee}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Payments and fees</span>
        </a>
      </li>

      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Attendance tracking</span>
        </a>
      </li>

      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Child Grades</span>
        </a>
      </li>

      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>School Calendar</span>
        </a>
      </li>

      
      
      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Help Desk</span>
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
  <a className="fa fa-dashboard" onClick={PDash}><br /><small className="smaller">Dashboard</small></a>
  <a className="fa fa-flag" title="Completed Assignments" href="#/"><br /><small className="smaller">CAS</small></a>
  <a className="fa fa-book" href="#/"><br /><small className="smaller">Stu_Grades</small></a>
  <a className="fa fa-child" href="#/" title="Student Behaviour"><br /><small className="smaller">My_Child</small></a>
  <a className="fa fa-calendar-o" href="#/" title="Student Behaviour"><br /><small className="smaller">Time Table</small></a>
  <a className="fa fa-bullhorn" href="#/"><br /><small className="smaller">Announcements</small></a>
  <a className="fa fa-calendar-o" href="#/"><br /><small className="smaller">Calender</small></a>
  <a className="fa fa-user-o" href="#/user_setting"><br /><small className="smaller">Profile</small></a>
  <a className="fa fa-money" onClick={Payfee}><br /><small className="smaller">Payments_Fees</small></a>
  <a className="fa fa-shield" href="#/"><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default Parentsidebar;