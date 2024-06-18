import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Parentsidebar from "../portal_sidebar/parent_sidebar";

function ParentPortal(){
   return(
    <>
    <div id="main">
    <Breadcrumb title="Parent Portal" />
    <Parentsidebar />
    <Footer />
    </div>
    </>
   )
}
export default ParentPortal;