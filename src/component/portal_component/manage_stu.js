import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";

const path = process.env.REACT_APP_ACCOUNT_API;

const select = {
  padding: "10px 12px",
  width: "100%",
};

export default function ManageST() {
  const [stu, setStu] = useState([]);

  const stucc = () => {
    fetch(`${path}/studentaccount`)
      .then((res) => res.json())
      .then((data) => setStu(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    stucc();
  }, []);

  const handlePushChange = (e) => {
    e.preventDefault();
    const userid = document.getElementById("stuIDs").value.trim();
    const permit2 = document.getElementById("permit2").value;

    if (!userid) {
      alert("Please enter a student ID.");
      return;
    }

    fetch(`${path}/studentaccount/${userid}`, {
      method: "PATCH",
      body: JSON.stringify({ status: permit2 }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Status updated successfully.");
        stucc();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    const userid = document.getElementById("stuIDs").value.trim();

    if (!userid) {
      alert("Please enter a student ID.");
      return;
    }

    const confirmPwd = window.prompt(
      "Enter admin password to confirm deletion:"
    );
    if (!confirmPwd) {
      alert("Action cancelled.");
      return;
    }

    if (confirmPwd !== process.env.REACT_APP_ADMIN_LOG) {
      alert("Incorrect admin password.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this student account?"
    );
    if (!confirmed) return;

    fetch(`${path}/studentaccount/${userid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Account deleted successfully.");
        stucc();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Breadcrumb title="Manage Student" />
      <div
        style={{
          width: "100%",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "row",
          background: "whitesmoke",
        }}
      >
        <a id="stuadm"></a> students | &emsp;&emsp;&emsp;&nbsp;
        <i className="fa fa-search-o"></i>
        <input
          style={{
            padding: "10px 12px",
            border: "none",
            background: "transparent",
          }}
          placeholder="Search Students..."
        />
      </div>

      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body" style={{ maxHeight: "400px" }}>
            <a onClick={stucc} className="pointer">
              Refresh
            </a>
            <h5 className="card-title">
              Meet Students (acc)
              <span> | {process.env.REACT_APP_BRAND_SHORT}</span>
            </h5>

            <table className="table table-borderless scrolltable">
              <thead>
                <tr>
                  <th>Profile Pic</th>
                  <th>Student_ID</th>
                  <th>Student_Name</th>
                  <th>Level/Class</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stu.map((info) => (
                  <tr key={info.id}>
                    <td>
                      <img
                        style={{
                          borderRadius: "50%",
                          width: "60px",
                          height: "60px",
                        }}
                        src={info.thumbnailUrl}
                        alt="student"
                      />
                    </td>
                    <td
                      onClick={() => {
                        navigator.clipboard.writeText(info.id);
                        alert("ID copied: " + info.id);
                      }}
                    >
                      {info.id}
                    </td>
                    <td>{info.name}</td>
                    <td>{info.class}</td>
                    <td>
                      <a href={`mailto:${info.email}`}>{info.email}</a>
                    </td>
                    <td>{info.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      <form onSubmit={handlePushChange}>
        <div className="row">
          <div className="col-lg-6">
            <div className="checkout__input">
              <p>
                User ID<span>*</span>
              </p>
              <input id="stuIDs" type="text" required />
            </div>
          </div>

          <div className="col-lg-8 col-md-6">
            <div className="checkout__input">
              <p>
                Actions<span>*</span>
              </p>
              <select id="permit2" style={select}>
                <option value="enrolled">Enroll</option>
                <option value="graduated">Graduated</option>
                <option value="expelled">Expelled</option>
                <option value="left">Left the school</option>
              </select>
            </div>
          </div>

          <br />
          <br />

          <div className="col-lg-8 col-md-6">
            <div className="checkout__order">
              <button type="submit" className="site-btn">
                Push Changes
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                onClick={handleDelete}
                style={{ background: "red", color: "white" }}
                className="site-btn"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
