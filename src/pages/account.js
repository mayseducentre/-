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
        <Breadcrumb title="Account" image="https://lh3.googleusercontent.com/pw/AP1GczPQGOKEU8vsI_m9AbosnfoxCrLM_a2kgCphO6x_1SOhxHHw0o87A8ZAUg1aUoGr-8NQrTZK0T41ZaZsibhQhDVNMJDdy9SggXHiTtmeWT9pnKrq1P0"/>
        {/* <Notify /> */}
        <Accountform />
        <ScrollToTop smooth className="scrolly" />
        <Footer />
        </>
    )
}
