import { useEffect, useState } from "react";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load blog posts from local db.json
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const blogs = data.blog || [];
        setBlog(blogs.slice(0, 5)); // show first 5
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  // Auto slideshow rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blog.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [blog]);

  if (!loading || blog.length === 0) {
    return (
      <center>
        <div className="loadery" style={{ margin: "50px auto" }}></div>
      </center>
    );
  }

  return (
    <>
      <section
        id="blog-slideshow"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          height: "450px",
          margin: "40px auto",
          overflow: "hidden",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {blog.map((post, index) => (
          <div
            key={index}
            onClick={() => (window.location.href = "#/news_updates")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${post.news_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 1s ease-in-out",
              opacity: index === current ? 1 : 0,
              cursor: "pointer",
            }}
          >
            {/* Overlay text area */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.7))",
                color: "white",
                padding: "20px",
                transform:
                  index === current ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.8s ease-in-out",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  margin: "0 0 5px 0",
                  textShadow: "1px 1px 3px black",
                }}
              >
                {post.news_heading}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  margin: "0 0 8px 0",
                  opacity: 0.9,
                }}
              >
                {post.news_category}
              </p>
              <small style={{ color: "#ccc" }}>{post.date}</small>
            </div>
          </div>
        ))}

        {/* Slideshow indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {blog.map((_, i) => (
            <div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: i === current ? "white" : "rgba(255,255,255,0.4)",
                transition: "background 0.3s",
              }}
            ></div>
          ))}
        </div>
      </section>
    </>
  );
}
