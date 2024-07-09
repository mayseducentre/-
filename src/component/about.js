export default function About(){
    return(
        <>
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

    <section id="counts" className="counts section-bg">
      <div className="container">

        <div className="row counters">

          <div className="col-lg-3 col-6 text-center">
            <span className="purecounter">1234</span>
            <p>Students</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span className="purecounter">100%</span>
            <p>Discipline</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span className="purecounter">40</span>
            <p>Staff</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span className="purecounter">5</span>
            <p>Awards</p>
          </div>

        </div>

      </div>
    </section>
    <br/>
    <br/>

    <section id="why-us" className="why-us">
      <div className="container" data-aos="fade-up">

        <div className="row">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="content">
              <h3>Why Choose MEC for your child?</h3>
              <p>
              We understand that making decisions for your child’s education can be challenging. May's Educational Centre is proud to offer an unparalleled educational experience that will inspire your child to reach their full life potential. With the vision to train and nurture the Ghanaian child through quality education with love and affection enabling them to excel in life.</p>
              <div className="text-center">
                <a href="#" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="row">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="bx bx-receipt"></i>
                    <h4>Global Awareness</h4>
                    <p>Students experience a purposeful exchange of world views and interaction with other cultures.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="bx bx-cube-alt"></i>
                    <h4>Standard-Based Learning</h4>
                    <p>Our curriculum is positioned so students are successful wherever the future of their education may take them.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="bx bx-images"></i>
                    <h4>Balanced and Robust Education</h4>
                    <p>We culivate well rounded, confident students across our curriculum and co-curricular activities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <br/>
    <br/>
<center>
    <iframe style={{width:"100%", height:"300px"}}  src="https://www.youtube.com/embed/dxECczwpirE?si=Q5HT5DoTbrJFWK9Q" title="May's Educational Centre" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </center> 
    </>
    )
}