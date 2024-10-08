import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Headline from "../component/headlines";
import Accessibility from "../component/portal_component/access";
import DaycareStaff from "../component/portal_component/adm_account";
import AdminDash from "../component/portal_component/admindash";
import AnnounceHub from "../component/portal_component/annnouncement_hub";
import Calendar from "../component/portal_component/calendar";
import ManageP from "../component/portal_component/manage_parent";
import ManageT from "../component/portal_component/manage_staff";
import ManageST from "../component/portal_component/manage_stu";
import AdminSidebar from "../portal_sidebar/admin_sidebar";

function AdminPortal(){
   fetch(`${process.env.REACT_APP_ACCOUNT_API}/studentaccount`)
   .then(res => res.json())
   .then(data => studentTotal(data))
   .catch(err => console.log(err))
   
   fetch(`${process.env.REACT_APP_ACCOUNT_API}/staffaccount`)
   .then(res => res.json())
   .then(data => staffTotal(data))
   .catch(err => console.log(err))
   
   fetch(`${process.env.REACT_APP_ACCOUNT_API}/parentaccount`)
   .then(res => res.json())
   .then(data => parentTotal(data))
   .catch(err => console.log(err))


   fetch(`${process.env.REACT_APP_API_URL}/courses`)
   .then(res => res.json())
   .then(data => subjectTotal(data))
   .catch(err => console.log(err))

   
   // function fetchAll(){
   //     var subject=document.getElementById("subject_owner").value;
     
   //       if(subject == "English"){
   //         var path=`${process.env.REACT_APP_API_URL}/engassign`;
   //     }
   //     if(subject == "Science"){
   //         var path=`${process.env.REACT_APP_API_URL}/sciassign`;
   //     }
   //     if(subject == "Social Studies"){
   //         var path=`${process.env.REACT_APP_API_URL}/socassign`;
   //     }
   //     if(subject == "Mathematics"){
   //         var path=`${process.env.REACT_APP_API_URL}/mathassign`;
   //     }
   //     if(subject == "Computing"){
   //         var path=`${process.env.REACT_APP_API_URL}/compassign`;
   //     }
   //     if(subject == "Creative Art"){
   //         var path=`${process.env.REACT_APP_API_URL}/artassign`;
   //     }
   //       fetch(path)
   //       .then(res => res.json())
   //       .then(data => fetchTotal(data))
   //       .catch(err => console.log(err))
     
     
   //     }
     
     
   //     function fetchTotal(data){
   //       for(var i=0; i<data.length; i++){
   //         document.getElementById("assign_posted").innerHTML=data.length;
   //       }
   //     }
     
     
       function studentTotal(data){
         var total=document.getElementById("student_total");
         
        var stuadm= document.getElementById("stuadm");
         for(var i=0; i<data.length; i++){
           total.innerHTML=data.length;
           stuadm.innerHTML=data.length;
         }
       }

       function staffTotal(data){
         var total=document.getElementById("staff_total");
         for(var i=0; i<data.length; i++){
           total.innerHTML=data.length;
         }
       }
       function parentTotal(data){
         var total=document.getElementById("parent_total");
         for(var i=0; i<data.length; i++){
           total.innerHTML=data.length;
         }
       }
      
       function subjectTotal(data){
         var subjtotal=document.getElementById("subject_total");
         for(var i=0; i<data.length; i++){
           subjtotal.innerHTML=data.length;
         }
       }
   return(
    <>
    <div id="main">
    <AdminSidebar />
    <Headline />
            <br/>
            <br/>
            <br/>
<div id="admindash">
    <AdminDash />
    </div>

    <div id="mng_stu" style={{display:"none"}}>
      <ManageST />
    </div>
    <div id="mng_staff" style={{display:"none"}}>
      <ManageT />
    </div>
    <div id="mng_parent" style={{display:"none"}}>
      <ManageP />
    </div>
    <div id="accessibility" style={{display:"none"}}>
      <Accessibility />
    </div>
    <div id="calendar" style={{display:"none"}}>
      <Calendar />
    </div>

    <div id="announcehub" style={{display:"none"}}>
      <AnnounceHub />
    </div>
    
    <div id="account" style={{display:"none"}}>
      <DaycareStaff />
    </div>

    <Footer />
    </div>
    </>
   )
}
export default AdminPortal;