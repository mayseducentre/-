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
        <Breadcrumb title="Admissions" />

        <br/>
        <br/>
        <p>Thank you for your interest in May's Daycare and Eductaional Centre.</p>
        <p>Our curriculum is holistic, focusing on the whole child and connecting their development.</p>

        <h4>The Process</h4>
        <b>Stage 1: Completion of Forms (Application Forms)</b>
        <ul>
            <li>These forms are available in the school's Office of admissions and must be completed and submitted to the Office.</li>
            <li>The registration fee can be paid at the school's administration office. The school is unable to proceed with an application without evidence of successful completion of all requirements.</li>
        </ul>
        <b>Stage 2: Entrance Assesments (if necessary)</b>
        <br/>
        <b>Stage 3: Submission of documentation and Payments of Fees</b>
        <Form />
        <ScrollToTop smooth className="scrolly"/>
        <Footer />
        </>
    )
}