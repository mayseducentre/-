import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Headline from "../component/headlines";
import MeetP from "../component/portal_component/meet_parent";
import MeetT from "../component/portal_component/meet_teachers";
import Parentsidebar from "../portal_sidebar/parent_sidebar";
import Payfees from "../component/portal_component/payfees";
import MyChild from "../component/portal_component/mychild";

const path=process.env.REACT_APP_ACCOUNT_API;

function ParentPortal(){


fetch(`${path}/studentaccount`)
.then(res => res.json())
.then(data => stuStatus(data))
.catch(err => console.log(err))


function stuStatus(data){
  for(var i=0; i< data.length;i++){
    document.getElementById("childstatid").innerHTML=data[i].id;
    document.getElementById("childstatname").innerHTML=data[i].name;
    document.getElementById("childstatgender").innerHTML=data[i].gender;
    document.getElementById("childstatbirth").innerHTML=data[i].birth_date;
    document.getElementById("childstatcountry").innerHTML=data[i].country;
    document.getElementById("childstatperform").innerHTML=data[i].performance;
    document.getElementById("childstatclass").innerHTML=data[i].class;
    document.getElementById("childstatemail").innerHTML=data[i].email;
    document.getElementById("childstatstatus").innerHTML=data[i].status;
    document.getElementById("childstatreport").innerHTML=data[i].report;
    
  }
}
   return(
    <>
    <div id="main">
    <input type="text" id="parentid" style={{display:"none"}} readOnly/>
    <Parentsidebar />
    <Headline />
    <br/>
            <br/>
            <br/>
    <div id="parentdash">
    <MeetT />
    <MeetP />
    </div>

    <div id="payfees" style={{display:"none"}}>
      <Payfees />
    </div>
    <div id="mychild" style={{display:"none"}}>
      <MyChild /> 
    </div>

    <br/>
    <br/>
    
<ScrollToTop smooth className="scrolly"/>
    <Footer />
    </div>
    </>
   )
}
export default ParentPortal;