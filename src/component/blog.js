import { useEffect, useState } from "react";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load from local JSON
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const blogs = data.blog || [];
        setBlog(blogs.slice(0, 5)); // limit to 5 posts
        setLoading(true);
      })
      .catch((err) => console.error(err));
  }, []);

  // Auto slideshow rotation
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
      style={{
        width: "100%",
        margin: "60px auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* === Header === */}
      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            color: "#111",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          News and Updates
        </h2>
        <p
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
            color: "#555",
            margin: 0,
          }}
        >
          Discover the latest stories, projects, and school highlights.
        </p>
      </div>

      {/* === Slideshow === */}
      <div
        id="blog-slideshow"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          height: "480px",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "18px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
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
            {/* Overlay gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4), rgba(0,0,0,0))",
              }}
            ></div>

            {/* Text overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                color: "white",
                padding: "35px 25px",
                textAlign: "left",
                transform:
                  index === current ? "translateY(0)" : "translateY(30px)",
                opacity: index === current ? 1 : 0,
                transition: "all 0.9s ease-in-out",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  color: "#4FC3F7",
                  fontSize: "clamp(0.8rem, 2vw, 1rem)",
                  margin: "0 0 5px 0",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontWeight: "500",
                }}
              >
                {post.news_category}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  fontWeight: "600",
                  margin: "5px 0 10px 0",
                  textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
                  lineHeight: "1.4",
                }}
              >
                {post.news_heading}
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  opacity: 0.85,
                  maxWidth: "85%",
                  lineHeight: "1.5",
                  margin: "5px 0 10px 0",
                }}
              >
                {post.news_content
                  ? post.news_content.slice(0, 110) + "..."
                  : "Read more from our latest stories."}
              </p>
              <small
                style={{
                  color: "#ccc",
                  fontSize: "0.8rem",
                  letterSpacing: "0.5px",
                }}
              >
                {post.date}
              </small>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
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
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background:
                  i === current ? "#4FC3F7" : "rgba(255,255,255,0.4)",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
