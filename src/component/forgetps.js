import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const ForgetPs = () => {
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const accountapi = process.env.REACT_APP_ACCOUNT_API;

  const checkEmailExists = async (emailToCheck) => {
    const endpoints = ["studentaccount", "staffaccount", "parentaccount"];
    for (const endpoint of endpoints) {
      const res = await fetch(`${accountapi}/${endpoint}`);
      const data = await res.json();
      const match = data.find((u) => u.email === emailToCheck);
      if (match) return { ...match, role: endpoint };
    }
    return null;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const match = await checkEmailExists(email);
    if (!match) return setError("Email not found");

    setUserInfo(match);
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    setVerificationCode(code);
    localStorage.setItem(
      "resetCode",
      JSON.stringify({ code, time: Date.now() })
    );

    // Send email
    const formData = {
      user_email: email,
      subj: "Verification Code",
      to_name: match.name,
      mays_msg: `Your verification code is ${code}. It is valid for 10 minutes.`,
    };

    try {
      await emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        formData,
        "VIB8bKSD-ZS3RCCHD"
      );
      setShowCodeInput(true);
    } catch (err) {
      setError("Failed to send email");
    }
  };

  const handleCodeVerification = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("resetCode"));
    if (!stored) return setError("No code found");
    const expired = Date.now() - stored.time > 10 * 60 * 1000;
    if (expired) return setError("Code expired");
    if (stored.code !== inputCode) return setError("Incorrect code");

    setShowCodeInput(false);
    setShowPasswordReset(true);
    setError("");
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError("Passwords do not match");
    setLoading(true);

    try {
      const res = await fetch(`${accountapi}/${userInfo.role}/${userInfo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: password }),
      });
      await res.json();

      const notifyData = {
        user_email: email,
        subj: "Password Updated",
        to_name: userInfo.name,
        mays_msg: `Your password was successfully updated. Log in here: https://mayseducentre.github.io/-/#/portal`,
      };

      await emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        notifyData,
        "VIB8bKSD-ZS3RCCHD"
      );

      alert("Password updated successfully");
      window.location.href = "#/portal";
    } catch (err) {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="containerS" id="portalogin">
      <div className="formpage">
        <a
          onClick={() => window.history.back()}
          style={{ fontSize: "30px", cursor: "pointer" }}
        >
          &times;
        </a>
        <div className="form-content">
          <header>Forgot Password</header>

          {error && <div style={{ color: "red" }}>{error}</div>}

          {!showCodeInput && !showPasswordReset && (
            <form onSubmit={handleEmailSubmit}>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Verify email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field button-field">
                <button>Submit</button>
              </div>
            </form>
          )}

          {showCodeInput && (
            <form onSubmit={handleCodeVerification}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Enter Verification code"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  required
                />
              </div>
              <div className="field button-field">
                <button>Verify</button>
              </div>
            </form>
          )}

          {showPasswordReset && (
            <form onSubmit={handlePasswordReset}>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="field button-field">
                <button disabled={loading}>
                  {loading ? "Updating..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgetPs;
