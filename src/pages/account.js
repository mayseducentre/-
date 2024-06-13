import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";
import Accountform from "../component/accountform";
// import Notify from "../component/notification";

export default function Account(){
    return(
        <>
        <Header />
        <br/>
        <Breadcrumb title="Account" />
        {/* <Notify /> */}
        <Accountform />
        <ScrollToTop smooth className="scrolly" />
        <Footer />
        </>
    )
}