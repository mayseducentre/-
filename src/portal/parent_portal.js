import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Headline from "../component/headlines";
import Parentsidebar from "../portal_sidebar/parent_sidebar";

function ParentPortal(){
   return(
    <>
    <div id="main">
    <input type="text" id="parentid" style={{display:"none"}} readOnly/>
    <Parentsidebar />
    <Headline />
    <br/>
    <br/>
    <Footer />
    </div>
    </>
   )
}
export default ParentPortal;