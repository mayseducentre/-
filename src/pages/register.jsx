import ScrollToTop from "react-scroll-to-top";
import Breadcrumb from "../component/breadcrumb";
import Footer from "../component/footer";
import Header from "../component/header";

export default function Register() {
  return (
    <>
      <Header />
      <br />
      <Breadcrumb
        title="Admissions"
        image="https://lh3.googleusercontent.com/pw/AP1GczOYEvYhhpvraIavh8lX7YxDHglyIcyuCdk4KDwQAgajvdzHN4ybIQ4QwOoARYJBladAEGJH0hA1c2_ehJSLjBBKuKb_Oi9cVuNriihbZ8OmSIGlIro"
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "30px 16px",
          boxSizing: "border-box",
        }}
      >
        <p style={{ fontSize: "18px", color: "#333", lineHeight: "1.7" }}>
          Thank you for your interest in May's Daycare and Educational Centre.
        </p>
        <p style={{ fontSize: "18px", color: "#333", lineHeight: "1.7" }}>
          Our curriculum is holistic, focusing on the whole child and connecting their development.
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>The Process</h4>

          <b>Stage 1: Completion of Forms (Application Forms)</b>
          <ul style={{ marginTop: "10px" }}>
            <li>
              These forms are available in the school's Office of Admissions and must be completed and submitted to the Office.
            </li>
            <li>
              <b>Note:</b> Registration fee payment and all documentation must be submitted <b>on campus</b>. Online submission is only for form completion.
            </li>
          </ul>

          <b>Stage 2: Entrance Assessments (if necessary)</b>
          <br />
          <br />

          <b>Stage 3: Submission of Documentation and Payment of Fees</b>

          <p style={{ marginTop: "10px", color: "#777" }}>
            Please fill out the form below. After submission, proceed to the school campus for payment and final submission.
          </p>
        </div>

        {/* Online Admission Form */}
        <div
          style={{
            marginTop: "30px",
            padding: "30px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>Online Admission Form</h3>

          <form
            action="https://formspree.io/f/xbjbobwv"
            method="POST"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {/* Child Details */}
            <h4 style={{ gridColumn: "1 / -1" }}>Child Information</h4>

            <input
              name="child_name"
              placeholder="Child's Full Name"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="child_dob"
              placeholder="Date of Birth"
              type="date"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="child_gender"
              placeholder="Gender"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="child_nationality"
              placeholder="Nationality"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="child_previous_school"
              placeholder="Previous School (if any)"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            {/* Parent Details */}
            <h4 style={{ gridColumn: "1 / -1" }}>Parent/Guardian Information</h4>

            <input
              name="parent_name"
              placeholder="Parent/Guardian Name"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="parent_phone"
              placeholder="Phone Number"
              type="tel"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="parent_email"
              placeholder="Email Address"
              type="email"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="parent_address"
              placeholder="Home Address"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            {/* Emergency Contact */}
            <h4 style={{ gridColumn: "1 / -1" }}>Emergency Contact</h4>

            <input
              name="emergency_name"
              placeholder="Emergency Contact Name"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="emergency_phone"
              placeholder="Emergency Contact Phone"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="emergency_relationship"
              placeholder="Relationship"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            {/* Health & Medical */}
            <h4 style={{ gridColumn: "1 / -1" }}>Health Information</h4>

            <input
              name="health_conditions"
              placeholder="Health Conditions (if any)"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="allergies"
              placeholder="Allergies (if any)"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="doctor_name"
              placeholder="Doctor's Name"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="doctor_phone"
              placeholder="Doctor's Phone"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            {/* Program & Admission */}
            <h4 style={{ gridColumn: "1 / -1" }}>Admission Details</h4>

            <input
              name="admission_level"
              placeholder="Desired Level/Class"
              required
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="start_date"
              placeholder="Preferred Start Date"
              type="date"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <input
              name="admission_term"
              placeholder="Preferred Term"
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            />

            <textarea
              name="additional_info"
              placeholder="Additional Information"
              style={{
                gridColumn: "1 / -1",
                minHeight: "120px",
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                outline: "none",
              }}
            ></textarea>

            <button
              type="submit"
              style={{
                gridColumn: "1 / -1",
                padding: "14px 16px",
                borderRadius: "10px",
                background: "#ff6b6b",
                color: "#fff",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Submit Application
            </button>
          </form>

          <div style={{ marginTop: "20px", color: "#ff6b6b", fontWeight: "600" }}>
            <p>
              <b>Important:</b> All payments, submission of documents, and verification must be completed at the school campus.
            </p>
          </div>
        </div>
      </div>

      <ScrollToTop smooth className="scrolly" />
      <Footer />
    </>
  );
}