import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";

export default function Contact() {
  return (
    <>
      <Header />
      <br />

      <Breadcrumb
        title="CONTACT"
        image="https://lh3.googleusercontent.com/pw/AP1GczP0ONd1nsm_n8SHpnNuYhDDh2WPlsNGjD14GKp4CSMLb-dqgdkDQl7fiPJ1JzCueZQj9hFZbsV-4nqjuFWzp-dVJH1l9o0cJupTt3ra2tauzFNuQHI"
      />

      {/* Responsive Map */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            marginBottom: "30px",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0122995605693!2d-0.2688714250147729!3d5.56519339441531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf982bdbbf89ed%3A0xa2821cf64b470603!2sMay&#39;s%20Educational%20Centre!5e0!3m2!1sen!2sgh!4v1715443769259!5m2!1sen!2sgh"
            style={{
              border: "0",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>

      {/* Contact Section */}
      <section
        className="contact spad"
        style={{
          background: "#f8f9fb",
          padding: "60px 0",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              alignItems: "stretch",
            }}
          >
            {/* Information */}
            <div
              className="col-lg-6 col-md-6"
              style={{
                flex: "1 1 450px",
              }}
            >
              <div
                className="contact__text"
                style={{
                  background: "#fff",
                  padding: "30px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                <div className="section-title">
                  <span style={{ color: "#ff6b6b" }}>Information</span>
                  <h2 style={{ marginTop: "10px" }}>Contact Us</h2>
                  <p style={{ color: "#6c7a89" }}>
                    As you might expect of a school that began as a high-end
                    interiors contractor, we pay strict attention.
                  </p>
                </div>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  <li>
                    <h4>Ghana</h4>
                    <p>
                      Accra
                      <br />
                      <a href="tel:0244370801">+233 244370801</a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="col-lg-6 col-md-6"
              style={{
                flex: "1 1 450px",
              }}
            >
              <div
                className="contact__form"
                style={{
                  background: "#fff",
                  padding: "30px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              >
                <form action="https://formspree.io/f/xbjbobwv" method="POST">
                  <div className="row" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    <div className="col-lg-6" style={{ flex: "1 1 200px" }}>
                      <input
                        type="text"
                        name="Name"
                        placeholder="Name"
                        required
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div className="col-lg-6" style={{ flex: "1 1 200px" }}>
                      <input
                        type="text"
                        name="Email"
                        placeholder="Email"
                        required
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div className="col-lg-12" style={{ flex: "1 1 100%" }}>
                      <textarea
                        placeholder="Message"
                        name="Message"
                        required
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                          minHeight: "140px",
                          resize: "vertical",
                          boxSizing: "border-box",
                        }}
                      ></textarea>

                      <button
                        type="submit"
                        className="site-btn"
                        style={{
                          marginTop: "14px",
                          width: "100%",
                          padding: "14px 16px",
                          borderRadius: "10px",
                          border: "none",
                          background: "#ff6b6b",
                          color: "#fff",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd Responsive Map */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1728159603136!6m8!1m7!1slFmycjwEkpPlEXhlOcdl-g!2m2!1d5.564983967022078!2d-0.2659501365222267!3f301.87363!4f0!5f0.7820865974627469"
            style={{
              border: "0",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <ScrollToTop smooth className="scrolly" />
      <Footer />
    </>
  );
}