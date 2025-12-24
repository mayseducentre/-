import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toFirestoreFields, fromFirestoreFields } from "./firestore";

/* =======================
   STATIC SUBJECT LIST
======================= */
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
  const [password, setPassword] = useState("");
  const [passconf, setPassconf] = useState("");
  const [level, setLevel] = useState([]);
  const [userIP, setUserIP] = useState("");
  const formRef = useRef();

  const path = process.env.REACT_APP_API_URL;
  const accountapi = process.env.REACT_APP_ACCOUNT_API;

  /* =======================
     GET USER IP
  ======================= */
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setUserIP(data.ip))
      .catch(() => setUserIP("unknown"));
  }, []);

  /* =======================
     FETCH LEVELS ONLY
  ======================= */
  useEffect(() => {
    fetch(`${path}/level`)
      .then(res => res.json())
      .then(data => setLevel(data))
      .catch(console.error);
  }, [path]);

  /* =======================
     ROLE LOGIC DISPLAY
  ======================= */
  function Sortout() {
    const role = document.getElementById("role_account").value;
    ["studentlogic", "stafflogic", "parentlogic"].forEach(id => {
      document.getElementById(id).style.display = "none";
    });
    if (role !== "none") {
      document.getElementById(`${role}logic`).style.display = "block";
    }
  }

  /* =======================
     PASSWORD CHECK
  ======================= */
  function checkps() {
    const bg = password === passconf ? "#9ef178" : "#fa7373";
    document.getElementById("passcode_account").style.backgroundColor = bg;
    document.getElementById("passcode_confirm").style.backgroundColor = bg;
  }

  /* =======================
     IMAGE PREVIEW
  ======================= */
  function imgfile() {
    const input = document.getElementById("portal_img");
    const file = input.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      input.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("displayimage").src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* =======================
     EMAIL DUPLICATE CHECK
  ======================= */
  function Checkemail() {
    const email = document.getElementById("email_account").value;
    if (!email) return;

    ["studentaccount", "staffaccount", "parentaccount"].forEach(col => {
      fetch(`${accountapi}/${col}`)
        .then(res => res.json())
        .then(data => {
          if (data.documents) {
            const docs = data.documents.map(doc =>
              fromFirestoreFields(doc)
            );
            docs.forEach(d => {
              if (d.email === email) {
                alert("This email already exists.");
                document.getElementById("email_account").value = "";
              }
            });
          }
        });
    });
  }

  /* =======================
     CREATE ACCOUNT
  ======================= */
  async function Postaccount(e) {
    e.preventDefault();

    const name = document.getElementById("name_account").value;
    const email = document.getElementById("email_account").value;
    const role = document.getElementById("role_account").value;
    const passcode = password;
    const confirm = passconf;

    if (role === "none") {
      alert("Please select a role");
      return;
    }
    if (passcode.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if (passcode !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const constantPrefix = "011";
    const timestamp = Date.now().toString();
    const id = constantPrefix + timestamp.slice(-6) + Math.floor(Math.random() * 10);
    const acc_date = new Date().toLocaleDateString();

    const imgInput = document.getElementById("portal_img");
    const reader = new FileReader();

    reader.onload = async () => {
      const image = reader.result;
      let payload = {};

      if (role === "student") {
        payload = {
          id, name, email, passcode,
          role, class: document.getElementById("class_account").value,
          birth_date: document.getElementById("birth_account").value,
          thumbnailUrl: image,
          country: "Ghana",
          school: "MEC",
          status: "enrolled",
          ip: userIP,
          account_date: acc_date,
        };
      }

      if (role === "staff") {
        payload = {
          id, name, email, passcode,
          role,
          subject: document.getElementById("subject_account").value,
          contact: document.getElementById("phone_account").value,
          thumbnailUrl: image,
          country: "Ghana",
          school: "MEC",
          status: "enrolled",
          ip: userIP,
          account_date: acc_date,
        };
      }

      if (role === "parent") {
        payload = {
          id, name, email, passcode,
          role,
          contact: document.getElementById("Pphone_account").value,
          child_id: document.getElementById("childid_account1").value,
          other_child_id: document.getElementById("childid_account2").value,
          child_level: document.getElementById("childlevel_account").value,
          thumbnailUrl: image,
          country: "Ghana",
          school: "MEC",
          status: "enrolled",
          ip: userIP,
          account_date: acc_date,
        };
      }

      await fetch(`${accountapi}/${role}account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toFirestoreFields(payload)),
      });

      emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        {
          to_name: name,
          user_email: email,
          subj: "Your MEC User ID",
          mays_msg: `${name}, your User ID is ${id}`,
        },
        "VIB8bKSD-ZS3RCCHD"
      );

      alert("Account created successfully. Check your email.");
      e.target.reset();
    };

    reader.readAsDataURL(imgInput.files[0]);
  }

  /* =======================
     JSX (UNCHANGED STRUCTURE)
  ======================= */
  return (
    <>
      <section className="checkout spad">
        <div className="container">
          <form onSubmit={Postaccount} ref={formRef}>
            <input id="name_account" placeholder="Full Name" required />
            <input id="email_account" onBlur={Checkemail} placeholder="Email" required />

            <input
              id="passcode_account"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              id="passcode_confirm"
              type="password"
              value={passconf}
              onChange={e => setPassconf(e.target.value)}
              onKeyUp={checkps}
              placeholder="Confirm Password"
              required
            />

            <select id="role_account" style={select} onChange={Sortout}>
              <option value="none">Select Role</option>
              <option value="student">Student</option>
              <option value="staff">Teacher</option>
              <option value="parent">Parent</option>
            </select>

            <div id="studentlogic" style={{ display: "none" }}>
              <select id="class_account" style={select}>
                {level.map(l => (
                  <option key={l.level} value={l.level}>{l.level}</option>
                ))}
              </select>
              <input type="date" id="birth_account" />
            </div>

            <div id="stafflogic" style={{ display: "none" }}>
              <input id="phone_account" placeholder="Phone" />
              <select id="subject_account" style={select}>
                {SUBJECTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div id="parentlogic" style={{ display: "none" }}>
              <input id="Pphone_account" placeholder="Phone" />
              <input id="childid_account1" placeholder="Child ID" />
              <input id="childid_account2" placeholder="Other Child ID" />
              <select id="childlevel_account" style={select}>
                <option value="primary">Primary</option>
                <option value="jhs">JHS</option>
              </select>
            </div>

            <input type="file" id="portal_img" onChange={imgfile} required />
            <img id="displayimage" style={{ maxWidth: "50%" }} />

            <button type="submit">Create Account</button>
          </form>
        </div>
      </section>
    </>
  );
}