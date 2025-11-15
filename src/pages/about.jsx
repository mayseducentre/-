import React from "react";
import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";

/**
 * Aboutp - Updated modern inline-CSS About page for MEC
 * - Inline CSS only
 * - Preserves Font Awesome icons (ensure FA is loaded globally)
 * - Keep Header, Breadcrumb, Footer, ScrollToTop as before
 */

export default function Aboutp() {
  const styles = {
    page: {
      margin: 0,
      padding: 0,
      background: "#f3f6fb",
      fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
      color: "#12263a",
      WebkitFontSmoothing: "antialiased",
    },
    sectionContainer: { maxWidth: 1200, margin: "40px auto", padding: "0 20px" },
    hero: {
      width: "100%",
      padding: "56px 20px",
      background: "linear-gradient(135deg,#2463f0 0%,#6ea0ff 100%)",
      color: "white",
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      boxShadow: "0 12px 30px rgba(34,50,99,0.18)",
      textAlign: "center",
    },
    heroTitle: { fontSize: 34, margin: 0, fontWeight: 700, lineHeight: 1.05 },
    heroSubtitle: { marginTop: 12, maxWidth: 900, marginLeft: "auto", marginRight: "auto", opacity: 0.95 },

    // About block
    aboutRow: { display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", marginTop: 28 },
    aboutLeft: { flex: "1 1 480px", minWidth: 300 },
    aboutRight: { flex: "1 1 480px", minWidth: 300, position: "relative" },
    aboutImageMain: { width: "100%", borderRadius: 16, boxShadow: "0 10px 30px rgba(17,24,39,0.12)" },
    aboutImageSmall: {
      width: "42%",
      borderRadius: 12,
      position: "absolute",
      right: -20,
      bottom: -24,
      boxShadow: "0 12px 30px rgba(17,24,39,0.16)",
      transform: "rotate(-2deg)",
      background: "#fff",
    },
    badge: {
      position: "absolute",
      top: 18,
      left: 18,
      background: "linear-gradient(180deg,#ffdd57,#ffb347)",
      color: "#0f1724",
      padding: "12px 18px",
      borderRadius: 12,
      fontWeight: 700,
      boxShadow: "0 10px 25px rgba(17,24,39,0.14)",
    },

    // lists and profile
    featureList: { listStyle: "none", padding: 0, marginTop: 14, lineHeight: 1.8 },
    checkIcon: { color: "#2463f0", marginRight: 10 },

    profileCard: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "#ffffff",
      padding: 14,
      borderRadius: 12,
      boxShadow: "0 8px 22px rgba(17,24,39,0.06)",
      marginTop: 18,
      maxWidth: 520,
    },

    // Feature grid
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 18,
      marginTop: 30,
    },
    featureCard: {
      background: "white",
      padding: 18,
      borderRadius: 14,
      boxShadow: "0 8px 20px rgba(17,24,39,0.06)",
      transition: "transform .22s ease, box-shadow .22s ease",
      textAlign: "left",
    },

    // counters
    countersRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: 18,
      flexWrap: "wrap",
      marginTop: 30,
      alignItems: "center",
    },
    counterCircle: {
      width: 110,
      height: 110,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: 800,
      fontSize: 20,
      boxShadow: "0 10px 30px rgba(17,24,39,0.12)",
    },

    // sections
    sectionHeader: { fontSize: 22, fontWeight: 700, margin: "12px 0 8px 0" },
    subTextItalic: { fontStyle: "italic", color: "#374151" },

    // Media
    videoWrap: {
      width: "100%",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 12px 30px rgba(17,24,39,0.12)",
      marginTop: 20,
    },

    // CTA
    cta: {
      background: "linear-gradient(90deg,#2463f0,#6ea0ff)",
      color: "white",
      padding: "28px",
      borderRadius: 14,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      marginTop: 36,
      boxShadow: "0 12px 30px rgba(34,50,99,0.12)",
      flexWrap: "wrap",
    },
    ctaButton: {
      background: "#fff",
      color: "#1f3db3",
      padding: "12px 18px",
      borderRadius: 10,
      fontWeight: 700,
      textDecoration: "none",
      boxShadow: "0 6px 18px rgba(17,24,39,0.08)",
    },

    // responsive tweaks
    smallNote: { fontSize: 13, color: "#6b7280", marginTop: 8 },
  };

  // helper to get badge number text for counters (keeps them short)
  const counters = [
    { label: "Students", value: "200+" },
    { label: "Discipline", value: "100%" },
    { label: "Staff", value: "20" },
    { label: "Awards", value: "5" },
  ];

  return (
    <div style={styles.page}>
      <Header />

      <Breadcrumb
        title="About MEC"
        image="https://lh3.googleusercontent.com/pw/AP1GczPApu1-BSP7uKEwljTQj6zuAlJD5swwUdsc_SX9r_q0-SDlFC3hoPOWdGX_EQZpDRjGdEVp-xszLdNBt1UlSIdCraWZmsWMym6GxdoOtG0q9LHD0gU"
      />

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>May's DayCare & Educational Centre</h1>
        <p style={styles.heroSubtitle}>
          A warm, modern and secure learning environment where we combine academic excellence with character development.
        </p>
      </section>

      <div style={styles.sectionContainer}>
        {/* ABOUT ROW */}
        <div style={styles.aboutRow}>
          <div style={styles.aboutLeft}>
            <span style={{ color: "#2463f0", fontWeight: 700, fontSize: 13 }}>MORE ABOUT US</span>
            <h2 style={{ marginTop: 8, fontSize: 28 }}>About {process.env.REACT_APP_BRAND_SHORT}</h2>
            <p style={{ color: "#334155" }}>
              At {process.env.REACT_APP_BRAND_SHORT}, our mission is to cultivate a dynamic and inclusive learning
              environment where every student is empowered to reach their full potential.
            </p>

            <div style={{ display: "flex", gap: 18, marginTop: 16 }}>
              <ul style={styles.featureList}>
                <li>
                  <i className="fa fa-check-circle" style={styles.checkIcon}></i> High standards in academic performance
                </li>
                <li>
                  <i className="fa fa-check-circle" style={styles.checkIcon}></i> Embracing new ideas and technologies
                </li>
                <li>
                  <i className="fa fa-check-circle" style={styles.checkIcon}></i> Inspire students to strive hard
                </li>
              </ul>

              <ul style={styles.featureList}>
                <li>
                  <i className="fa fa-check-circle" style={styles.checkIcon}></i> Inclusive learning environment
                </li>
                <li>
                  <i className="fa fa-check-circle" style={styles.checkIcon}></i> 24/7 security
                </li>
                <li>
                  <i className="fa fa-check-circle" style={styles.checkIcon}></i> Well trained staff
                </li>
              </ul>
            </div>

            <div style={styles.profileCard}>
              <div>
                <h4 style={{ margin: 0 }}>MRS KBL</h4>
                <p style={{ margin: 0, color: "#475569" }}>Director</p>
              </div>

              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                  <i className="fa fa-phone" style={{ color: "#2463f0", fontSize: 18 }}></i>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>Call us anytime</div>
                    <div style={{ fontWeight: 700 }}>024 437 0801</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.aboutRight}>
            <img
              src={require("../img/nj.jpg")}
              alt="MEC Campus"
              style={styles.aboutImageMain}
            />
            <img
              src={require("../img/mays/play.jpg")}
              alt="Students playing"
              style={styles.aboutImageSmall}
            />
            <div style={styles.badge}>
              <div style={{ fontSize: 20 }}>30+</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Years</div>
            </div>
          </div>
        </div>

        {/* FEATURE GRID */}
        <div style={styles.featuresGrid}>
          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <i className="fa fa-graduation-cap" style={{ fontSize: 22, color: "#2463f0" }}></i>
              <div>
                <div style={{ fontWeight: 700 }}>Global Awareness</div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>Cross-cultural exposure & worldview formation.</div>
              </div>
            </div>
          </div>

          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <i className="fa fa-book" style={{ fontSize: 22, color: "#2463f0" }}></i>
              <div>
                <div style={{ fontWeight: 700 }}>Standard-Based Learning</div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>Curriculum designed for local & global success.</div>
              </div>
            </div>
          </div>

          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <i className="fa fa-paper-plane" style={{ fontSize: 22, color: "#2463f0" }}></i>
              <div>
                <div style={{ fontWeight: 700 }}>Balanced & Robust</div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>Academic and co-curricular development.</div>
              </div>
            </div>
          </div>

          <div
            style={styles.featureCard}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <i className="fa fa-laptop" style={{ fontSize: 22, color: "#2463f0" }}></i>
              <div>
                <div style={{ fontWeight: 700 }}>Digital Learning</div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>Computer lab & interactive boards.</div>
              </div>
            </div>
          </div>
        </div>

        {/* COUNTERS */}
        <div style={styles.countersRow}>
          {counters.map((c, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 120 }}>
              <div style={{ ...styles.counterCircle, background: "#2463f0" }}>{c.value}</div>
              <div style={{ marginTop: 10, color: "#475569", fontWeight: 600 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Values / History / Facilities */}
        <div style={{ marginTop: 36, background: "#fff", padding: 22, borderRadius: 12, boxShadow: "0 8px 30px rgba(17,24,39,0.05)" }}>
          <h3 style={styles.sectionHeader}>Our Values</h3>
          <ul style={{ margin: 0, paddingLeft: 14 }}>
            <li style={{ marginBottom: 8 }}>
              <b>Excellence</b>: High standards in academic and extracurricular activities.
            </li>
            <li style={{ marginBottom: 8 }}>
              <b>Integrity</b>: Promoting honesty, respect and ethical behaviour.
            </li>
            <li style={{ marginBottom: 8 }}>
              <b>Diversity</b>: Respecting and celebrating individual differences.
            </li>
            <li style={{ marginBottom: 8 }}>
              <b>Innovation</b>: Embracing new ideas and technologies.
            </li>
          </ul>

          <h3 style={{ ...styles.sectionHeader, marginTop: 18 }}>Our History</h3>
          <p style={{ marginTop: 6 }}>
            MDCEC has built a legacy of community engagement and academic achievement for more than 30 years — continually
            evolving to meet modern educational demands.
          </p>

          <h3 style={{ ...styles.sectionHeader, marginTop: 18 }}>Our Facilities</h3>
          <p style={{ marginTop: 6 }}>
            Modern classrooms, science & computer labs, library, art centre and sports facilities — all designed to support well-rounded learning.
          </p>
        </div>

        {/* Student Life / Facilities - two column like blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 26 }}>
          <div style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 20px rgba(17,24,39,0.05)" }}>
            <h4 style={{ marginTop: 0 }}>Prefects</h4>
            <p style={styles.subTextItalic}>Prefects are elected by their peers and serve as a leadership body.</p>

            <h4>Publications</h4>
            <p style={styles.subTextItalic}>Annual Yearbook chronicling the year's events and featuring student photos.</p>
          </div>

          <div style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 20px rgba(17,24,39,0.05)" }}>
            <h4 style={{ marginTop: 0 }}>Graduation Ceremonies</h4>
            <p style={styles.subTextItalic}>A celebration of achievement across the school community.</p>

            <h4>Sports Day</h4>
            <p style={styles.subTextItalic}>
              Inter-house events including football, basketball, athletics and more. Parents and alumni welcome.
            </p>
          </div>

          <div style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 20px rgba(17,24,39,0.05)" }}>
            <h4 style={{ marginTop: 0 }}>Library & Classrooms</h4>
            <p style={styles.subTextItalic}>Interactive boards, water dispensers and a well-stocked library to support learning.</p>
          </div>

          <div style={{ background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 8px 20px rgba(17,24,39,0.05)" }}>
            <h4 style={{ marginTop: 0 }}>Art Centre & Computer Lab</h4>
            <p style={styles.subTextItalic}>Dedicated creative spaces and a secure computer lab with modern equipment.</p>
          </div>
        </div>

        {/* Certificate image */}
        <div style={{ marginTop: 20 }}>
          <img src={require("../img/mays/cert.jpg")} alt="Certificate" style={{ width: 420, maxWidth: "100%", borderRadius: 12, boxShadow: "0 10px 30px rgba(17,24,39,0.12)" }} />
        </div>

        {/* Video + CTA */}
        <div style={{ marginTop: 28 }}>
          <h3 style={styles.sectionHeader}>Watch Our School Documentary</h3>
          <div style={styles.videoWrap}>
            <iframe
              width="100%"
              height="420"
              src="https://www.youtube.com/embed/dxECczwpirE?si=Q5HT5DoTbrJFWK9Q"
              title={process.env.REACT_APP_BRAND_SHORT || "MEC Video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ border: 0 }}
            />
          </div>

          <div style={styles.cta}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>MEC — Get the best for your child</div>
              <div style={styles.smallNote}>Admissions open year-round. Limited spaces per cohort.</div>
            </div>

            <div>
              <a href="#/admissions" style={styles.ctaButton}>
                Enroll Now <i className="fa fa-chevron-right" style={{ marginLeft: 8 }}></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop smooth />
      <Footer />
    </div>
  );
}
