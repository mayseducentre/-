import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Studentsidebar from "../portal_sidebar/student_sidebar";

function StudentPortal(){
   return(
    <>
    <div id="main">
    <Breadcrumb title="Student Portal" />
    <Studentsidebar />
    <Footer />
    </div>
    </>
   )
}
export default StudentPortal;