import { Link } from "react-router-dom";
import "../style.css";

function AdminD(){
  document.getElementById("admindash").style.display="block";
  document.getElementById("mng_parent").style.display="none";
  document.getElementById("mng_staff").style.display="none";
  document.getElementById("mng_stu").style.display="none";
  document.getElementById("announcehub").style.display="none"
  document.getElementById("accessibility").style.display="none"
  document.getElementById("calendar").style.display="none"
  document.getElementById("account").style.display="none"
}

function MngSt(){
  document.getElementById("admindash").style.display="none";
  document.getElementById("mng_parent").style.display="none";
  document.getElementById("mng_staff").style.display="none";
  document.getElementById("mng_stu").style.display="block";
  document.getElementById("announcehub").style.display="none"
  document.getElementById("accessibility").style.display="none"
  document.getElementById("calendar").style.display="none"
  document.getElementById("account").style.display="none"
}


function Access(){
  document.getElementById("admindash").style.display="none";
  document.getElementById("mng_parent").style.display="none";
  document.getElementById("mng_staff").style.display="none";
  document.getElementById("mng_stu").style.display="none";
  document.getElementById("announcehub").style.display="none"
  document.getElementById("accessibility").style.display="block"
  document.getElementById("calendar").style.display="none"
  document.getElementById("account").style.display="none"
}

function MngT(){
  document.getElementById("admindash").style.display="none";
  document.getElementById("mng_parent").style.display="none";
  document.getElementById("mng_staff").style.display="block";
  document.getElementById("mng_stu").style.display="none";
  document.getElementById("announcehub").style.display="none"
  document.getElementById("accessibility").style.display="none"
  document.getElementById("calendar").style.display="none"
  document.getElementById("account").style.display="none"
}

function MngP(){
  document.getElementById("admindash").style.display="none";
  document.getElementById("mng_parent").style.display="block";
  document.getElementById("mng_staff").style.display="none";
  document.getElementById("mng_stu").style.display="none";
  document.getElementById("announcehub").style.display="none"
  document.getElementById("accessibility").style.display="none"
  document.getElementById("calendar").style.display="none"
  document.getElementById("account").style.display="none"
}


function Announcement(){
  document.getElementById("admindash").style.display="none";
  document.getElementById("mng_parent").style.display="none";
  document.getElementById("mng_staff").style.display="none";
  document.getElementById("mng_stu").style.display="none";
  document.getElementById("announcehub").style.display="block"
  document.getElementById("accessibility").style.display="none"
  document.getElementById("calendar").style.display="none"
  document.getElementById("account").style.display="none"
}

function CreateCalendar(){
  document.getElementById("admindash").style.display="none";
  document.getElementById("mng_parent").style.display="none";
  document.getElementById("mng_staff").style.display="none";
  document.getElementById("mng_stu").style.display="none";
  document.getElementById("announcehub").style.display="none"
  document.getElementById("accessibility").style.display="none"
  document.getElementById("calendar").style.display="block"
  document.getElementById("account").style.display="none"
}


function AccountD(){
  document.getElementById("admindash").style.display="none";
  document.getElementById("mng_parent").style.display="none";
  document.getElementById("mng_staff").style.display="none";
  document.getElementById("mng_stu").style.display="none";
  document.getElementById("announcehub").style.display="none"
  document.getElementById("accessibility").style.display="none"
  document.getElementById("calendar").style.display="none"
  document.getElementById("account").style.display="block"
}

function AdminSidebar(){
  



    return(
      <>
       <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
       
                <a  className="logo">
                    <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} alt="" className="img-fluid animate__animated animate__zoomIn"/></a>
                
            </div>
        </header>
       
        <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">


      <li className="nav-item" onClick={AdminD}>
        <a className="nav-link">
          <i className="fa fa-grid"></i>
          <span>Dashboard</span>
        </a>
      </li>
      


      
      <li className="nav-item" onClick={MngSt}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Manage Students</span>
        </a>
      </li>
      
      
      
      <li className="nav-item" onClick={MngT}>
        <a className="nav-link collapsed">
          <i className="fa fa-file-earmark"></i>
          <span>Manage Teachers</span>
        </a>
      </li>
      
                                            
      <li className="nav-item" onClick={MngP}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Manage Parents</span>
        </a>
      </li>
      

      <li className="nav-item" onClick={AccountD}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Daycare Account</span>
        </a>
      </li>

      
      <li className="nav-item" onClick={Access}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Accessibility</span>
        </a>
      </li>
      
      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Virtual Meeting</span>
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
          <span>Server</span>
        </a>
      </li>

      
      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Tracking</span>
        </a>
      </li>
      

      
      <li className="nav-item">
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Performance</span>
        </a>
      </li>
      

      
      <li className="nav-item" onClick={CreateCalendar}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Calendar and Scheduling</span>
        </a>
      </li>
      

     
      
      <li className="nav-item" onClick={Announcement}>
        <a className="nav-link collapsed">
          <i className="fa fa-diamond"></i>
          <span>Announcement Hub</span>
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
  <a className="fa fa-dashboard" ><br /><small className="smaller">Dashboard</small></a>
  <a className="fa fa-group"  onClick={MngSt}><br /><small className="smaller">Mng_Stu</small></a>
  <a className="fa fa-group" onClick={MngT}><br /><small className="smaller">Mng_Staff</small></a>
  <a className="fa fa-group" onClick={MngP}><br /><small className="smaller">Mng_Parent</small></a>
  <a className="fa fa-group" onClick={AccountD}><br /><small className="smaller">Account</small></a>
  <a className="fa fa-database" ><br /><small className="smaller">Server</small></a>
  <a className="fa fa-flash" ><br /><small className="smaller">Tracking</small></a>
  <a className="fa fa-laptop" title="Virtual Meeting"><br /><small className="smaller">VR Meet</small></a>
  <a className="fa fa-calendar-o" onClick={CreateCalendar}><br /><small className="smaller">Calendar</small></a>
  <a className="fa fa-bullhorn" onClick={Announcement}><br /><small className="smaller">Announce_Hub</small></a>
  <a className="fa fa-cog" onClick={Access}><br /><small className="smaller">Accessibility</small></a>
  <a className="fa fa-shield" ><br /><small className="smaller">Support</small></a>
</div>
</>
    )
}

export default AdminSidebar;