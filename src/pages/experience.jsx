import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";

export default function Experience(){
    return(
        <>
        <Header />
        <Breadcrumb title="MEC Experiences"/>
         <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        
          <h2>Students Life</h2>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Prefects</h5>
            <p className="fst-italic">
             Our Prefects serve as a monitoring body and are elected by their peers after a campaign period.
                </p>

          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Publications</h5>
            <p className="fst-italic">
             The Yearbook published once a year towards the end of the third term, serves as a chronicle of the years events and contains pictures of students.
                </p>

          </div>
          

          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Graduation Ceremonies</h5>
            <p className="fst-italic">
           This event is an opportunity to celebrate and reward achievement of all students.
                </p>
                <img src={require("../img/mays/cert.jpg")} style={{width:"400px",height:"auto"}}/>

          </div>

          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Sports Day</h5>
            <p className="fst-italic">
             Students are to engage in the sport activities in order to cheer on their clubs. This sports activities include basketball, football, volleyball, high jump, marathon,  tennis and many more. Parents and alumni are invited as spectators.   </p>

          </div>

<br/><br/>

        
          <h2>Facilities</h2>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Sporting Facilities</h5>
            <p className="fst-italic">
             The school has facilities for soccer,basketball,tennis,volleyball,handball and many more. This facilities are there to help both students and staff be physically active and improve their health and well being.   </p>

          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Classroom</h5>
            <p className="fst-italic">
           All classes are well ventilated with interactive boards fitted in all subject classrooms. Every class has a water dispenser. However, children advised to bring enough water to school.   </p>

          </div>
          

          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Library</h5>
            <p className="fst-italic">
           Our modernised library has all the necessary resources for teaching and learning to help both staff and students fully equiped.     </p>

          </div>

          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>ART Centre</h5>
            <p className="fst-italic">
           Our Art centre is well designed to enhance our students interest in creating, modelling and publishing their artworks. With all the necessary tools and materials that enhances their interest in art.
         </p>

         
          </div>

          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h5>Computer Lab</h5>
            <p className="fst-italic">
           All the tools and materials in the computer lab are available and are functioning well. The room is spacious enough to contain of about 50 students. The computers are well functioning and secured. Each student to a computer enhances their interest in computing.   </p>

         
          </div>


       



      </div>
    </section>
<br/>
<br/>

<ScrollToTop smooth/>
  <Footer />
     </>
    )
}