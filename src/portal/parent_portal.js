import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Headline from "../component/headlines";
import MeetP from "../component/portal_component/meet_parent";
import MeetST from "../component/portal_component/meet_students";
import MeetT from "../component/portal_component/meet_teachers";
import Parentsidebar from "../portal_sidebar/parent_sidebar";
import Payfees from "../component/portal_component/payfees";

function ParentPortal(){
   return(
    <>
    <div id="main">
    <input type="text" id="parentid" style={{display:"none"}} readOnly/>
        <input type="text" id="childId" style={{display:"none"}} readOnly/>
    <Parentsidebar />
    <Headline />
    <br/>
            <br/>
            <br/>
    <div id="parentdash">
    <MeetT />
    <MeetST />
    <MeetP />
    </div>

    <div id="payfees" style={{display:"none"}}>
      <Payfees />
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