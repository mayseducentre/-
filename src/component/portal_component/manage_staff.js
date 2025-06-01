import { useEffect, useState, useRef } from "react";
import Breadcrumb from "../breadcrumb";

const API_PATH = process.env.REACT_APP_ACCOUNT_API;
const ADMIN_PASS = process.env.REACT_APP_ADMIN_LOG;

const selectStyle = {
  padding: "10px 12px",
  width: "100%",
};

export default function ManageT() {
  const [staffList, setStaffList] = useState([]);
  const staffIdRef = useRef();
  const statusRef = useRef();

  // Fetch staff accounts
  const fetchStaff = () => {
    fetch(`${API_PATH}/staffaccount`)
      .then((res) => res.json())
      .then((data) => setStaffList(data))
      .catch((err) => console.error("Fetch staff error:", err));
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handlePushChange = (e) => {
    e.preventDefault();

    const userId = staffIdRef.current.value.trim();
    const status = statusRef.current.value;

    if (!userId) return alert("Please enter a staff ID");

    fetch(`${API_PATH}/staffaccount/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PATCH response:", data);
        alert("Status update successful");
        fetchStaff();
      })
      .catch((err) => console.error("Status update error:", err));
  };

  const handleDeleteAccount = () => {
    const userId = staffIdRef.current.value.trim();

    if (!userId) return alert("Please enter a staff ID");

    const password = window.prompt("Enter admin password:");
    if (password !== ADMIN_PASS) return alert("Incorrect password!");

    fetch(`${API_PATH}/staffaccount/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DELETE response:", data);
        alert("Account deleted successfully");
        fetchStaff();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <>
      <Breadcrumb title="Manage Staff" />
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body" style={{ maxHeight: "400px" }}>
            <button className="pointer" onClick={fetchStaff}>
              Refresh
            </button>
            <h5 className="card-title">
              Meet Staffs <span>| {process.env.REACT_APP_BRAND_SHORT}</span>
            </h5>

            <table className="table table-borderless scrolltable">
              <thead>
                <tr>
                  <th>Profile Pic</th>
                  <th>Staff_ID</th>
                  <th>Staff_Name</th>
                  <th>Staff_Subject</th>
                  <th>Staff_Email</th>
                  <th>School</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((info) => (
                  <tr key={info.id}>
                    <td>
                      <img
                        style={{
                          borderRadius: "50%",
                          width: "60px",
                          height: "60px",
                        }}
                        src={info.thumbnailUrl}
                        alt="Profile"
                      />
                    </td>
                    <td
                      onClick={() => {
                        navigator.clipboard.writeText(info.id);
                        alert("ID copied: " + info.id);
                      }}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {info.id}
                    </td>
                    <td>{info.name}</td>
                    <td>{info.subject}</td>
                    <td>
                      <a href={`mailto:${info.email}`}>{info.email}</a>
                    </td>
                    <td>{info.school}</td>
                    <td>{info.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Form */}
      <form onSubmit={handlePushChange}>
        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="checkout__input">
              <p>
                User ID<span>*</span>
              </p>
              <input ref={staffIdRef} type="text" required />
            </div>
          </div>

          <div className="col-lg-8 col-md-6">
            <div className="checkout__input">
              <p>
                Actions<span>*</span>
              </p>
              <select ref={statusRef} style={selectStyle}>
                <option value="enrolled">Enroll</option>
                <option value="expelled">Expelled</option>
                <option value="left">Left the school</option>
              </select>
            </div>
          </div>

          <div className="col-lg-8 col-md-6 mt-3">
            <div className="checkout__order">
              <button type="submit" className="site-btn">
                Push Changes
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="site-btn"
                style={{
                  background: "red",
                  color: "white",
                  marginLeft: "10px",
                }}
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
