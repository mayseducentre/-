import ScrollToTop from "react-scroll-to-top";
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
            <h3>About {process.env.REACT_APP_BRAND_SHORT}</h3>
            <p className="fst-italic">
              At {process.env.REACT_APP_BRAND_SHORT}, our mission is to cultivate a dynamic and inclusive learning environment where every student is empowered to reach their full potential.
            </p>
            <ul>
              <li><i className="fa fa-check-circle"></i> We maintain high standards in academic and extracurricular activities, encouraging students to strive for their best.</li>
              <li><i className="fa fa-check-circle"></i> We foster a sense of belonging and partnership among students,parents and staff.</li>
              <li><i className="fa fa-check-circle"></i> We embrace new ideas and technologies to enhance learning and teaching.</li>
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
<p>MDCEC has a rich history of academic achievement and community involvement. Over the years, we have grown and evolved, continually adapting to the needs of our students and the demands of the modern world. Our dedicated and supportive community have been the backbone of our success.</p>

<br/>
<h4>Our Facilities</h4>
<p>Our state-of-the-art Facilities provide a safe and stimulating environment for learning. With modern classrooms, science and computer labs, a well-stocked library, and extensive sports and arts facilities, our students have the resources they need to excel.</p>
<br/>

</div>

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

<ScrollToTop smooth/>
  <Footer />
     </>
    )
}


// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1">
// <style>
// * {box-sizing: border-box;}
// body {font-family: Verdana, sans-serif;}
// .mySlides {display: none;}
// img {vertical-align: middle;}

// /* Slideshow container */
// .slideshow-container {
//   max-width: 1000px;
//   position: relative;
//   margin: auto;
// }

// /* Caption text */
// .text {
//   color: #f2f2f2;
//   font-size: 15px;
//   padding: 8px 12px;
//   position: absolute;
//   bottom: 8px;
//   width: 100%;
//   text-align: center;
// }

// /* Number text (1/3 etc) */
// .numbertext {
//   color: #f2f2f2;
//   font-size: 12px;
//   padding: 8px 12px;
//   position: absolute;
//   top: 0;
// }

// /* The dots/bullets/indicators */
// .dot {
//   height: 15px;
//   width: 15px;
//   margin: 0 2px;
//   background-color: #bbb;
//   border-radius: 50%;
//   display: inline-block;
//   transition: background-color 0.6s ease;
// }

// .active {
//   background-color: #717171;
// }

// /* Fading animation */
// .fade {
//   animation-name: fade;
//   animation-duration: 1.5s;
// }

// @keyframes fade {
//   from {opacity: .4} 
//   to {opacity: 1}
// }

// /* On smaller screens, decrease text size */
// @media only screen and (max-width: 300px) {
//   .text {font-size: 11px}
// }
// </style>
// </head>
// <body>

// <h2>Automatic Slideshow</h2>
// <p>Change image every 2 seconds:</p>

// <div class="slideshow-container">

// <div class="mySlides fade">
//   <div class="numbertext">1 / 3</div>
//   <img src="img_nature_wide.jpg" style="width:100%">
//   <div class="text">Caption Text</div>
// </div>

// <div class="mySlides fade">
//   <div class="numbertext">2 / 3</div>
//   <img src="img_snow_wide.jpg" style="width:100%">
//   <div class="text">Caption Two</div>
// </div>

// <div class="mySlides fade">
//   <div class="numbertext">3 / 3</div>
//   <img src="img_mountains_wide.jpg" style="width:100%">
//   <div class="text">Caption Three</div>
// </div>

// </div>
// <br>

// <div style="text-align:center">
//   <span class="dot"></span> 
//   <span class="dot"></span> 
//   <span class="dot"></span> 
// </div>

// <script>
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }
// </script>

// </body>
// </html> 


// logodiffusion.com for logos
// klingai for image to video