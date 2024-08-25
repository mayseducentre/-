import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";

export default function Contact(){
    return(
        <>
        <Header />
        <br/>
        
        <Breadcrumb title="CONTACT" />
          <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0122995605693!2d-0.2688714250147729!3d5.56519339441531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf982bdbbf89ed%3A0xa2821cf64b470603!2sMay&#39;s%20Educational%20Centre!5e0!3m2!1sen!2sgh!4v1715443769259!5m2!1sen!2sgh" height="500" style={{border:"0"}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
    </div>
    <section className="contact spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="contact__text">
                        <div className="section-title">
                            <span>Information</span>
                            <h2>Contact Us</h2>
                            <p>As you might expect of a school that began as a high-end interiors contractor, we pay
                                strict attention.</p>
                        </div>
                        <ul>
                            <li>
                                <h4>Ghana</h4>
                                <p>Accra<br /><a href="tel:0244370801">+233 244370801</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="contact__form">
                        <form action="https://formspree.io/f/xbjbobwv" method="POST">
                            <div className="row">
                                <div className="col-lg-6">
                                    <input type="text" name="Name" placeholder="Name" required/>
                                </div>
                                <div className="col-lg-6">
                                    <input type="text" name="Email" placeholder="Email" required/>
                                </div>
                                <div className="col-lg-12">
                                    <textarea placeholder="Message" name="Message" required></textarea>
                                    <button type="submit" className="site-btn">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <ScrollToTop smooth className="scrolly" />
    <Footer />
        </>
    )
}