export default function NewsInfo() {
  const themeColor = "#c76a1f"; // orange-brown color

  return (
    <>
      <div
        style={{
          padding: "20px",
          maxWidth: "900px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => {
            window.location.reload();
          }}
          style={{
            borderRadius: "25px",
            padding: "10px 25px",
            border: `2px solid ${themeColor}`,
            background: "transparent",
            color: themeColor,
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          <i className="fa fa-arrow-left"></i> Back
        </button>

        {/* Header */}
        <h2
          id="newsheader"
          style={{ color: themeColor, fontWeight: "900", marginTop: "10px" }}
        ></h2>

        {/* Info bar */}
        <div style={{ marginTop: "5px", color: "#444", fontSize: "14px" }}>
          <a id="newsdate" style={{ marginRight: "8px" }}></a>|
          <a id="newscategory" style={{ marginLeft: "8px" }}></a>
        </div>

        {/* Image */}
        <div
          style={{
            marginTop: "25px",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <img
            id="newsimg"
            style={{
              width: "100%",
              height: "380px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Content Box */}
        <div
          style={{
            marginTop: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 12px rgba(0,0,0,0.12)",
            padding: "15px",
            background: "#fff",
          }}
        >
          <textarea
            id="newscontent"
            readOnly
            style={{
              width: "100%",
              height: "80vh",
              border: "none",
              outline: "none",
              fontSize: "16px",
              color: "#333",
              resize: "none",
              background: "transparent",
            }}
          ></textarea>
        </div>

        {/* Back Button Again */}
        <button
          onClick={() => {
            window.location.reload();
          }}
          style={{
            borderRadius: "25px",
            padding: "10px 25px",
            border: `2px solid ${themeColor}`,
            background: "transparent",
            color: themeColor,
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "35px",
          }}
        >
          <i className="fa fa-arrow-left"></i> Back
        </button>
      </div>

      <br />
      <br />
    </>
  );
}
