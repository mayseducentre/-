export default function Footer(){
  return(
        <>
        
        <footer id="footer">

    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6 footer-contact">
           <img src={require(`../img/${process.env.REACT_APP_LOGO}`)} style={{width:"50px",height:"50px"}}/>&ensp;<a title="May's Daycare and Educational Centre" style={{fontSize:"30px",fontWeight:"bold"}}>{process.env.REACT_APP_BRAND_SHORT}</a> 
            <p>
              Dansoman <br/>
              Ghana<br/><br/>
              <strong>Phone:</strong> 0244370801<br/>
              <strong>Email:</strong> info@example.com<br/>
            </p>
          </div>

          <div className="col-lg-2 col-md-6 footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><i className="fa fa-chevron-right"></i> <a href="#">Home</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#/about">About us</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#/mec_experience">Student Life</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#/admissions">Admissions</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#/portal">Portal</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Extracurriculum activities</h4>
            <ul>
              <li><i className="fa fa-chevron-right"></i> <a href="#">Sports</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#">Clubs</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#">Arts</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#">Programming</a></li>
              <li><i className="fa fa-chevron-right"></i> <a href="#">Reading</a></li>
            </ul>
          </div>

          

        </div>
      </div>
    </div>

    <div className="container d-md-flex py-4">

      <div className="me-md-auto text-center text-md-start">
        <div className="copyright">
          &copy; Copyright <strong><span>{process.env.REACT_APP_BRAND_SHORT}</span></strong>. All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://amzi-kwasi.github.io/al-app">AL</a>
        </div>
      </div>
      <div className="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
        <a href="https://web.facebook.com/MDCEC/?_rdc=1&_rdr" className="facebook"><i className="fa fa-facebook"></i></a>
        <a href="https://www.instagram.com/proudlyofmays/" className="instagram"><i className="fa fa-instagram"></i></a>
        <a href="#" className="google-plus"><i className="fa fa-skype"></i></a>
        <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
      </div>
    </div>
  </footer>
  </>
    )
}