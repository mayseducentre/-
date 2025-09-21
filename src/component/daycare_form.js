// daycare_form.js
import { hash } from "bcrypt-ts";
import emailjs from "emailjs-com";

const accountapi = process.env.REACT_APP_ACCOUNT_API;

function Checkid(e) {
  e.preventDefault();
  ["studentaccount", "staffaccount", "parentaccount"].forEach((col) => {
    fetch(`${accountapi}/${col}`)
      .then((res) => res.json())
      .then(checkData);
  });
}

function checkData(data) {
  if (!Array.isArray(data)) return;

  for (let i = 0; i < data.length; i++) {
    const id = document.getElementById("compare_id").value;
    if (id === data[i].id) {
      document.getElementById("ps_new").style.display = "block";
      document.getElementById("chkmail").style.display = "none";
      document.getElementById("psid").value = data[i].id;
      document.getElementById("psrole").value = data[i].role;
      document.getElementById("psname").value = data[i].name;
      document.getElementById("compare_email").value = data[i].email;
      document.getElementById("compare_id").style.background = "lightgreen";
    } else {
      document.getElementById("compare_id").style.background = "red";
      setTimeout(() => {
        document.getElementById("compare_id").style.background = "white";
      }, 3000);
    }
  }
}

function checkps(e) {
  e.preventDefault();
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("compare_ps").value;

  if (confirm !== pass) {
    document.getElementById("password").style.backgroundColor = "#fa7373";
    document.getElementById("compare_ps").style.backgroundColor = "#fa7373";
  } else {
    document.getElementById("password").style.backgroundColor = "#9ef178";
    document.getElementById("compare_ps").style.backgroundColor = "#9ef178";
    setTimeout(() => {
      document.getElementById("password").style.backgroundColor = "white";
      document.getElementById("compare_ps").style.backgroundColor = "white";
    }, 10000);
  }
}

async function Newps(e) {
  e.preventDefault();

  const role = document.getElementById("psrole").value;
  const id = document.getElementById("psid").value;
  const passcode = document.getElementById("password").value;

  // hash new password with bcrypt-ts
  const hashedpassword = await hash(passcode, 10);

  document.getElementById("pssub").style.display = "none";
  document.getElementById("lod").style.display = "block";

  const acc =
    role === "student"
      ? "studentaccount"
      : role === "staff"
      ? "staffaccount"
      : "parentaccount";

  fetch(`${accountapi}/${acc}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ passcode: hashedpassword }),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then(() => {
      alert("Your passcode is updated successfully");

      const name = document.getElementById("psname").value;
      const email = document.getElementById("compare_email").value;

      const formData = {
        user_email: email,
        subj: "Account Completed Successfully",
        to_name: name,
        mays_msg:
          "Your account has been successfully completed. Verify it was you by logging in. https://mayseducentre.github.io/-/#/portal",
      };

      emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        formData,
        "VIB8bKSD-ZS3RCCHD"
      );

      window.location.href = "#/portal";
    })
    .catch((err) => {
      console.error("Error updating password", err);
      alert("Failed to update password. Try again.");
      document.getElementById("pssub").style.display = "block";
      document.getElementById("lod").style.display = "none";
    });
}

export default function DaycareForm() {
  return (
    <section className="container">
      <div className="formpage">
        <div className="form-content">
          <header>Reset / Complete Account</header>

          {/* Step 1: Check ID */}
          <form id="chkmail" onSubmit={Checkid}>
            <div className="field input-field">
              <input
                type="text"
                id="compare_id"
                placeholder="Enter your ID"
                required
              />
            </div>
            <div className="field button-field">
              <button type="submit">Check ID</button>
            </div>
          </form>

          {/* Step 2: New password form */}
          <form id="ps_new" style={{ display: "none" }} onSubmit={Newps}>
            <input id="psid" hidden readOnly />
            <input id="psrole" hidden readOnly />
            <input id="psname" hidden readOnly />
            <input id="compare_email" hidden readOnly />

            <div className="field input-field">
              <input
                id="password"
                type="password"
                placeholder="New Password"
                required
              />
            </div>
            <div className="field input-field">
              <input
                id="compare_ps"
                type="password"
                placeholder="Confirm Password"
                required
                onBlur={checkps}
              />
            </div>

            <div className="field button-field">
              <button id="pssub" type="submit">
                Update Password
              </button>
              <div id="lod" style={{ display: "none" }}>
                Updating...
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}