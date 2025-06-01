import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb";

const API_URL = process.env.REACT_APP_ACCOUNT_API;
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_LOG;

const selectStyle = {
  padding: "10px 12px",
  width: "100%",
};

export default function ManageP() {
  const [parents, setParents] = useState([]);

  const fetchParents = () => {
    fetch(`${API_URL}/parentaccount`)
      .then((res) => res.json())
      .then((data) => setParents(data))
      .catch((err) => console.error("Error fetching parent accounts:", err));
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const handlePushChange = (e) => {
    e.preventDefault();

    const userId = document.getElementById("parentIDs").value;
    const status = document.getElementById("permit").value;

    fetch(`${API_URL}/parentaccount/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Status updated:", data);
        alert("Status updated successfully!");
        fetchParents();
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  const handleDelete = () => {
    const userId = document.getElementById("parentIDs").value;

    if (!userId) {
      alert("Please enter a user ID.");
      return;
    }

    const password = prompt("Enter admin password:");

    if (password === ADMIN_PASSWORD) {
      fetch(`${API_URL}/parentaccount/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Account deleted:", data);
          alert("Account deleted successfully!");
          fetchParents();
        })
        .catch((err) => console.error("Error deleting account:", err));
    } else {
      alert("Incorrect password. Deletion cancelled.");
    }
  };

  return (
    <>
      <Breadcrumb title="Manage Parent" />

      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body" style={{ maxHeight: "400px" }}>
            <a onClick={fetchParents} className="pointer">
              Refresh
            </a>
            <h5 className="card-title">
              Meet Parents <span>| {process.env.REACT_APP_BRAND_SHORT}</span>
            </h5>

            <table className="table table-borderless scrolltable">
              <thead>
                <tr>
                  <th>Profile Pic</th>
                  <th>Parent_ID</th>
                  <th>Parent_Name</th>
                  <th>Child_ID</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id}>
                    <td>
                      <img
                        src={parent.thumbnailUrl}
                        alt="Profile"
                        style={{ borderRadius: "50%", width: 60, height: 60 }}
                      />
                    </td>
                    <td
                      onClick={() => {
                        navigator.clipboard.writeText(parent.id);
                        alert("ID copied: " + parent.id);
                      }}
                      className="pointer"
                    >
                      {parent.id}
                    </td>
                    <td>{parent.name}</td>
                    <td>{parent.child_id}</td>
                    <td>{parent.contact}</td>
                    <td>
                      <a href={`mailto:${parent.email}`}>{parent.email}</a>
                    </td>
                    <td>{parent.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <form onSubmit={handlePushChange}>
        <div className="row">
          <div className="col-lg-6">
            <div className="checkout__input">
              <p>
                User ID<span>*</span>
              </p>
              <input id="parentIDs" type="text" required />
            </div>
          </div>

          <div className="col-lg-8 col-md-6">
            <div className="checkout__input">
              <p>
                Actions<span>*</span>
              </p>
              <select id="permit" style={selectStyle}>
                <option value="enrolled">Enroll</option>
                <option value="deny">Deny</option>
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
                onClick={handleDelete}
                style={{
                  background: "red",
                  color: "white",
                  marginLeft: "10px",
                }}
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
