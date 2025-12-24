import { hash } from "bcrypt-ts";
import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toFirestoreFields, fromFirestoreFields } from "./firestore";

/* =========================
   STATIC SUBJECTS (NO API)
========================= */
const SUBJECTS = [
  "Mathematics",
  "English Language",
  "Integrated Science",
  "Social Studies",
  "ICT / Computing",
  "RME",
  "French",
  "Creative Arts",
  "Physical Education",
];

const select = {
  padding: "10px 12px",
  width: "100%",
};

export default function Accountform() {
  const [passconf, setPassconf] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState([]);
  const formRef = useRef();

  var path = process.env.REACT_APP_API_URL;
  var accountapi = process.env.REACT_APP_ACCOUNT_API;

  /* =========================
     LOAD LEVELS (UNCHANGED)
  ========================= */
  useEffect(() => {
    fetch(`${path}/level`)
      .then((res) => res.json())
      .then((data) => setLevel(data))
      .catch(console.log);
  }, [path]);

  function Sortout() {
    var role = document.getElementById("role_account").value;
    document.getElementById("studentlogic").style.display =
      role === "student" ? "block" : "none";
    document.getElementById("stafflogic").style.display =
      role === "staff" ? "block" : "none";
    document.getElementById("parentlogic").style.display =
      role === "parent" ? "block" : "none";
  }

  function checkps() {
    const color = passconf === password ? "#9ef178" : "#fa7373";
    document.getElementById("passcode_account").style.backgroundColor = color;
    document.getElementById("passcode_confirm").style.backgroundColor = color;
  }

  async function Postaccount(e) {
    e.preventDefault();

    var name = document.getElementById("name_account").value;
    var passcode = document.getElementById("passcode_account").value;
    var email = document.getElementById("email_account").value;
    var role = document.getElementById("role_account").value;
    var userclass = document.getElementById("class_account").value;
    var staffSubject = document.getElementById("subject_account")?.value || "";
    var gender = document.getElementById("gender_account").value;
    var phone = document.getElementById("phone_account").value;
    var birth = document.getElementById("birth_account").value;

    if (role === "none") {
      alert("Please select a role");
      return;
    }

    if (passcode.length < 8 || passconf !== passcode) {
      alert("Password error");
      return;
    }

    const hashedpassword = await hash(passcode, 10);
    const id = "011" + Date.now().toString().slice(-6);

    let formpage = {};

    if (role === "student") {
      formpage = {
        id,
        name,
        email,
        passcode: hashedpassword,
        role,
        class: userclass,
        birth_date: birth,
        gender,
        status: "enrolled",
      };
    }

    if (role === "staff") {
      formpage = {
        id,
        name,
        email,
        passcode: hashedpassword,
        role,
        subject: staffSubject,
        contact: phone,
        gender,
        status: "enrolled",
      };
    }

    fetch(`${accountapi}/${role}account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toFirestoreFields(formpage)),
    })
      .then(() => {
        alert("Account created successfully");
        e.target.reset();
      })
      .catch(() => alert("Signup failed"));
  }

  return (
    <>
      <section className="checkout spad">
        <div className="container">
          <form onSubmit={Postaccount} ref={formRef}>
            {/* UI UNCHANGED */}

            <select id="role_account" style={select} onChange={Sortout}>
              <option value="none">None</option>
              <option value="student">Student</option>
              <option value="staff">Teacher</option>
              <option value="parent">Parent</option>
            </select>

            <div id="studentlogic" style={{ display: "none" }}>
              <select id="class_account" style={select}>
                {level.map((lev) => (
                  <option key={lev.level} value={lev.level}>
                    {lev.level}
                  </option>
                ))}
              </select>
              <input type="date" id="birth_account" />
            </div>

            <div id="stafflogic" style={{ display: "none" }}>
              <input id="phone_account" placeholder="Phone Number" />
              <select id="subject_account" style={select}>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="site-btn">
              Create Account
            </button>
          </form>
        </div>
      </section>
    </>
  );
}