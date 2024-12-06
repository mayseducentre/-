import emailjs from "emailjs-com";

export default function CreateAnnounce() {
  var path = process.env.REACT_APP_ACCOUNT_API;
  var assignpath = process.env.REACT_APP_ASSIGN_API;

  const randomdigit = Math.floor(Math.random() * 10).toString();
  const id = randomdigit;

  function SendAnnounce(e) {
    e.preventDefault();

    var subject = e.target.subject_email.value;
    var body = e.target.mainbody.value;
    var accounts = e.target.accounts.value;

    var d = new Date();
    var date = d.toLocaleDateString();

    fetch(`${path}/${accounts}`)
      .then((res) => res.json())
      .then((data) => {
        SendMail(data, subject, body);
        alert("Sent Successfully");
        e.target.subject_email.value = "";
        e.target.mainbody.value = "";
      })
      .catch((err) => console.log(err));

    fetch(`${assignpath}/mail`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        subject: subject,
        date: date,
        body: body,
        account: accounts
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  function SendMail(data, subject, body) {
    const formData = {
      subject_mail: subject,
      main_body: body,
    };

    // Loop through each account and send the email
    data.forEach((account) => {
      formData.bcc_email = account.email; // Assuming each account has an 'email' property

      emailjs
        .send("service_4dt6s3i", "template_0q1tvwm", formData, "VIB8bKSD-ZS3RCCHD")
        .then((res) => {
          console.log(res.text);
          alert("Global post success")
        })
        .catch((err) => {
          console.log(err.text);
        });
    });
  }

  return (
    <>
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <form onSubmit={SendAnnounce}>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <h3 className="checkout__title">Post an Announcement</h3>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Subject<span>*</span></p>
                        <input type="text" id="subject_email" name="subject_email" required />
                      </div>
                    </div>
                  </div>

                  <div className="checkout__input">
                    <p>Content<span>*</span></p>
                    <textarea id="mainbody" name="mainbody" placeholder="Comment" className="checkout__input__add" required></textarea>
                  </div>

                  <div className="checkout__input">
                    <p>Account<span>*</span></p>
                    <select style={{ padding: "10px 12px" }} id="accounts" name="accounts">
                      <option value="studentaccount">Students Account</option>
                      <option value="staffaccount">Teachers Account</option>
                      <option value="parentaccount">Parents Account</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <button type="submit" className="site-btn" id="announce">
                      POST ANNOUNCEMENT
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}