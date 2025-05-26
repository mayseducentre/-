export default function About(){
    return(
        <>
         {/* <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2">
            <img src={require("../img/mays/pool.jpg")} className="img-fluid" alt=""/>
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
    </section> */}
<br/>
<br/>
<section id="about" className="about section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row gy-4 align-items-center justify-content-between">

          <div className="col-xl-5" data-aos="fade-up" data-aos-delay="200">
            <span className="about-meta">MORE ABOUT US</span>
            <h2 className="about-title">May's DayCare and Educational Centre</h2>
            <p className="about-description">At MDCEC, our mission is to cultivate a dynamic and inclusive learning environment where every student is empowered to reach their full potential.</p>

            <div className="row feature-list-wrapper">
              <div className="col-md-6">
                <ul className="feature-list">
                  <li><i className="fa fa-check-circle"></i> High standards in academic performance</li>
                  <li><i className="fa fa-check-circle"></i> Embracing new ideas and technologies</li>
                  <li><i className="fa fa-check-circle"></i> Inspire students to strive hard</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list">
                  <li><i className="fa fa-check-circle"></i> Inclusive learning environment</li>
                  <li><i className="fa fa-check-circle"></i> 24/7 security</li>
                  <li><i className="fa fa-check-circle"></i> Well trained staff</li>
                </ul>
              </div>
            </div>

            <div className="info-wrapper">
              <div className="row gy-4">
                <div className="col-lg-5">
                  <div className="profile d-flex align-items-center gap-3">
                    <div>
                      <h4 className="profile-name">MRS KBL</h4>
                      <p className="profile-position">Director</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="contact-info d-flex align-items-center gap-2">
                    <i className="fa fa-phone"></i>
                    <div>
                      <p className="contact-label">Call us anytime</p>
                      <p className="contact-number">024 437 0801</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6" data-aos="fade-up" data-aos-delay="300">
            <div className="image-wrapper">
              <div className="images position-relative" data-aos="zoom-out" data-aos-delay="400">
                <img src={require("../img/mays/mec.jpg")} alt="Business Meeting" className="img-fluid main-image rounded-4" />
                <img src={require("../img/mays/play.jpg")} alt="Team Discussion" className="img-fluid small-image rounded-4" />
              </div>
              <div className="experience-badge floating">
                <h3>30+ <span>Years</span></h3>
                <p>Of experience</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

<div>
  <img src={require("../img/mecclip.png")} style={{width:"100%"}} />
  </div>

    <section id="counts" className="counts section-bg">
      <div className="container">

        <div className="row counters">

          <div className="col-lg-3 col-6 text-center">
            <span className="purecounter">200+</span>
            <p>Students</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span className="purecounter">100%</span>
            <p>Discipline</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
            <span className="purecounter">20</span>
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
              <h3>Why Choose {process.env.REACT_APP_BRAND_SHORT} for your child?</h3>
              <p>
              We understand that making decisions for your child’s education can be challenging. {process.env.REACT_APP_BRAND} is proud to offer an unparalleled educational experience that will inspire your child to reach their full life potential. With the vision to train and nurture the Ghanaian child through quality education with love and affection enabling them to excel in life.</p>
              <div className="text-center">
                <a href="#" className="more-btn">Learn More <i className="fa fa-chevron-right"></i></a>
              </div>
            </div>
          </div>
          <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div className="icon-boxes d-flex flex-column justify-content-center">
              <div className="row">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="fa fa-graduation-cap"></i>
                    <h4>Global Awareness</h4>
                    <p>Students experience a purposeful exchange of world views and interaction with other cultures.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="fa fa-book"></i>
                    <h4>Standard-Based Learning</h4>
                    <p>Our curriculum is positioned so students are successful wherever the future of their education may take them.</p>
                  </div>
                </div>
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box mt-4 mt-xl-0">
                    <i className="fa fa-paper-plane"></i>
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
    <section className="cta-section section-padding section-bg">
                <div className="container">
                    <div className="row justify-content-center align-items-center">

                        <div className="col-lg-5 col-12 ms-auto">
                            <h2 className="mb-0">MEC <br/> Get the best.</h2>
                        </div>

                        <div className="col-lg-5 col-12">

                            <a href="#/admissions" className="custom-btn  smoothscroll">Enroll Now</a>
                        </div>

                    </div>
                </div>
            </section>
            <br/>
            <br/>
<center>
    <iframe style={{width:"100%", height:"300px"}}  src="https://www.youtube.com/embed/dxECczwpirE?si=Q5HT5DoTbrJFWK9Q" title="{process.env.REACT_APP_BRAND}" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </center> 
    </>
    )
}