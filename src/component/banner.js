export default function Banner(){
    return(
        <>
    <section id="hero" className="d-flex justify-content-center align-items-center">
    <div className="container position-relative animate__animated animate__fadeInLeft">
      <h1 id="ban_txt"></h1>
      <h2>{process.env.REACT_APP_BRAND_SHORT}, Quality education with love and affection</h2>
      <a href="#/admissions" className="btn-get-started">Enroll Now</a>
    </div>
  </section>
        </>
    )
}