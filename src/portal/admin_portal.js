import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import AdminSidebar from "../portal_sidebar/admin_sidebar";

function AdminPortal(){
   return(
    <>
    <div id="main">
    <AdminSidebar />
    <Footer />
    </div>
    </>
   )
}
export default AdminPortal;