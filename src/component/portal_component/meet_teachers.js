import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export default function MeetStaff() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStaff() {
      try {
        const q = query(collection(db, "users"), where("role", "==", "staff"));
        const snap = await getDocs(q);
        const staff = snap.docs.map((doc) => doc.data());
        setStaffList(staff);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStaff();
  }, []);

  if (loading) return <p>Loading staff...</p>;
  if (!staffList.length) return <p>No staff accounts available.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20,
      }}
    >
      {staffList.map((staff, index) => {
        const joinDate = staff.createdAt?.seconds
          ? new Date(staff.createdAt.seconds * 1000)
          : new Date(staff.createdAt || Date.now());

        return (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 24,
                fontWeight: 600,
                marginBottom: 15,
                overflow: "hidden",
              }}
            >
              {staff.photoURL ? (
                <img
                  src={staff.photoURL}
                  alt={staff.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                staff.name?.charAt(0) || "T"
              )}
            </div>

            <h4 style={{ marginBottom: 5, color: "#333" }}>{staff.name}</h4>
            {staff.subject && (
              <p style={{ color: "#7a5018", marginBottom: 5 }}>{staff.subject}</p>
            )}

            <span
              style={{
                background: "#f4f6f8",
                color: "#555",
                padding: "3px 8px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
            </span>

            <p style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
              Joined: {joinDate.toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}