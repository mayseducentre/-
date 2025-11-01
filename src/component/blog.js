import { useEffect, useState } from "react";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load local JSON
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const blogs = data.blog || [];
        setBlog(blogs.slice(0, 5)); // display first 5
        setLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (blog.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blog.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [blog]);

  if (!loading || blog.length === 0) {
    return (
      <center>
        <div className="loadery" style={{ margin: "50px auto" }}></div>
      </center>
    );
  }

  return (
    <section
      id="blog-slideshow"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1100px",
        height: "480px", // fixed professional height
        margin: "60px auto",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        backgroundColor: "#000",
      }}
    >
      {blog.map((post, index) => (
        <div
          key={index}
          onClick={() => (window.location.href = "#/news_updates")}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${post.news_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            cursor: "pointer",
          }}
        >
          {/* Dark overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
            }}
          ></div>

          {/* Text area */}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              color: "white",
              padding: "30px",
              transform:
                index === current ? "translateY(0)" : "translateY(100%)",
              opacity: index === current ? 1 : 0,
              transition: "all 0.8s ease-in-out",
            }}
          >
            <p
              style={{
                color: "#4FC3F7",
                fontSize: "0.9rem",
                margin: "0 0 5px 0",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {post.news_category}
            </p>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                margin: "5px 0 10px 0",
                textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
              }}
            >
              {post.news_heading}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                opacity: 0.9,
                maxWidth: "80%",
                lineHeight: "1.5",
              }}
            >
              {post.news_content
                ? post.news_content.slice(0, 100) + "..."
                : "Read more from our blog."}
            </p>
            <small style={{ color: "#bbb" }}>{post.date}</small>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {blog.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: i === current ? "#4FC3F7" : "rgba(255,255,255,0.4)",
              transition: "all 0.3s",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}
