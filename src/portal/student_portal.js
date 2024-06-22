
import Footer from "../component/footer";
import Headline from "../component/headlines";
import Studentsidebar from "../portal_sidebar/student_sidebar";

function StudentPortal(){
   return(
    <>
    <div id="main">
      <Headline />
    <Studentsidebar />
    <Footer />
    </div>
    </>
   )
}
export default StudentPortal;