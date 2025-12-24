import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import emailjs from "emailjs-com";

const select = { padding: "10px 12px", width: "100%" };

export default function Accountform() {
  const formRef = useRef();
  const [password, setPassword] = useState("");
  const [passconf, setPassconf] = useState("");
  const [loading, setLoading] = useState(false);

  function checkps() {
    const ok = password === passconf;
    document.getElementById("passcode_account").style.backgroundColor =
      ok ? "#9ef178" : "#fa7373";
    document.getElementById("passcode_confirm").style.backgroundColor =
      ok ? "#9ef178" : "#fa7373";
  }

  async function Postaccount(e) {
    e.preventDefault();
    setLoading(true);

    const name = document.getElementById("name_account").value;
    const email = document.getElementById("email_account").value;
    const role = document.getElementById("role_account").value;

    if (password.length < 8 || password !== passconf) {
      alert("Password must be at least 8 characters and match");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Create auth account
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️⃣ Send verification email
      await sendEmailVerification(cred.user);

      const uid = cred.user.uid;

      // 3️⃣ Save profile (NO PASSWORD)
      await setDoc(doc(db, "users", uid), {
        uid,
        name,
        email,
        role,
        country: "Ghana",
        status: "enrolled",
        emailVerified: false,
        createdAt: new Date().toISOString(),
      });

      // 4️⃣ Send EmailJS notice
      emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        {
          to_name: name,
          user_email: email,
          mays_msg:
            "Your account was created successfully.\n\n" +
            "IMPORTANT: Please check your email and VERIFY your account before logging in.\n\n" +
            "Login uses EMAIL + PASSWORD.",
        },
        "VIB8bKSD-ZS3RCCHD"
      );

      alert(
        "Account created! Please check your email and VERIFY your account before login."
      );
      formRef.current.reset();
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <section className="checkout spad">
      <div className="container">
        <form onSubmit={Postaccount} ref={formRef}>
          <input
            id="name_account"
            placeholder="Full Name"
            required
            autoComplete="off"
          />

          <input
            id="email_account"
            type="email"
            placeholder="Valid email"
            required
            autoComplete="off"
          />

          <input
            id="passcode_account"
            type="password"
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            id="passcode_confirm"
            type="password"
            placeholder="Confirm password"
            value={passconf}
            onChange={(e) => setPassconf(e.target.value)}
            onKeyUp={checkps}
            required
          />

          <select id="role_account" style={select} required>
            <option value="student">Student</option>
            <option value="staff">Teacher</option>
            <option value="parent">Parent</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </section>
  );
}