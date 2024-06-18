import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Teachersidebar from "../portal_sidebar/teachers_sidebar";

function TeachersPortal(){
   return(
    <>
    <div id="main">
    <Breadcrumb title="Teachers Portal" />
    <Teachersidebar />
    <Footer />
    </div>
    </>
   )
}
export default TeachersPortal;