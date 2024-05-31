import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Form from "../component/form";
import Header from "../component/header";

export default function Register(){
    return(
        <>
        <Header />
        <br/>
        <Breadcrumb title="Register" />
        <Form />
        <ScrollToTop smooth className="scrolly"/>
        <Footer />
        </>
    )
}