import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";

export default function Aboutp(){
    return(
        <>
        <Header />
        <Breadcrumb title="About MEC"/>
         <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2">
            <img src={require("../img/nj.jpg")} className="img-fluid" alt=""/>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>About MEC</h3>
            <p className="fst-italic">
              At MEC, our mission is to cultivate a dynamic and inclusive learning environment where every student is empowered to reach their full potential.
            </p>
            <ul>
              <li><i className="bi bi-check-circle"></i> We maintain high standards in academic and extracurricular activities, encouraging students to strive for their best.</li>
              <li><i className="bi bi-check-circle"></i> We foster a sense of belonging and partnership among students,parents and staff.</li>
              <li><i className="bi bi-check-circle"></i> We embrace new ideas and technologies to enhance learning and teaching.</li>
            </ul>
            <p>
              From early childhood education to advanced placement courses, our curriculum is designed to challenge and inspire.
            </p>

          </div>
        </div>

      </div>
    </section>
<br/>
<br/>


<div className="container">


<h4>Our Values</h4>

  <ul>
  <li><b>Excellence</b> : We maintain high standards in academic and extracurricular activities, encouraging students to strive for their best.</li>
<li><b>Integrity</b> : We promote honesty, respect and ethical behaviour in all aspect of school life.</li>
<li><b>Diversity </b> : We celebrate and respect individual differences, creating an inclusive environment for all.</li>
<li><b>Innovation</b> : We embrace new  ideas and technologies to enhance learning and teaching.</li>
</ul>

<br/>
<h4>Our History</h4>
<p>MDCEC has a rich history of academic achievement and community involvement. Over the years, we have grown and evolved, continually adapting to the needs of our students and the demands of the modern world. Our dedeicated and supportive community have been the backbone of our success.</p>

<br/>
<h4>Our Facilities</h4>
<p>Our state-of-the-art Facilities provide a safe and stimulating environment for learning. With modern classrooms, science and computer labs, a well-stocked library, and extensive sports and arts facilities, our students have the resources they need to excel.</p>
<br/>

</div>
  <Footer />
     </>
    )
}