import React, { useState } from "react";

export default function UploadAccess() {
  const [pin, setPin] = useState("");
  const [granted, setGranted] = useState(false);
  const correctPIN = "1234"; // change this

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {!granted ? (
        <>
          <h2>Enter Access PIN</h2>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <br /><br />
          <button onClick={() => setGranted(pin === correctPIN)} style={{ padding: "10px 20px" }}>
            Submit
          </button>
          {pin && pin !== correctPIN && <p style={{ color: "red" }}>Wrong PIN</p>}
        </>
      ) : (
        <div>
          <h3>Click below to open the upload form</h3>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScPe3-vv0KL88V5bsf3exHSmJ5O_62aLdYwtkUDTd_jr_0LMw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#34A853",
              color: "white",
              padding: "10px 25px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Go to Upload Form
          </a>
        </div>
      )}
    </div>
  );
}
