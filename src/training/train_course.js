import React from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../component/breadcrumb"

export default function TrainingDashboard() {
  const navigate = useNavigate();

  const courses = [
    {
      id: "word",
      title: "Microsoft Word – Professional Teacher Training",
      category: "Document & Exam Creation",
      description:
        "Master professional typing, document formatting, and exam creation for both mobile and PC environments.",
      route: "/word-training",
    },
    {
      id: "excel",
      title: "Microsoft Excel – Data, Grades & Analysis",
      category: "Data & Assessment",
      description:
        "Develop strong Excel skills from fundamentals to advanced grade analysis using real school data.",
      route: "/excel-training",
    },
    {
      id: "ppt",
      title: "Microsoft PowerPoint – Teaching Presentations",
      category: "Instructional Design",
      description:
        "Design effective lesson slides, revision materials, and professional academic presentations.",
      route: "/ppt-training",
    },
  ];

  return (
<>
<Breadcrumb title="Training Courses" />
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Teacher ICT Professional Training</h1>
          <p style={styles.subtitle}>
            Select a training course to begin or continue your professional development
          </p>
        </header>

        <section style={styles.courseGrid}>
          {courses.map((course) => (
            <article
              key={course.id}
              style={styles.card}
              onClick={() => navigate(course.route)}
            >
              <div style={styles.cardHeader}>
                <span style={styles.category}>{course.category}</span>
              </div>

              <h2 style={styles.cardTitle}>{course.title}</h2>

              <p style={styles.cardDescription}>{course.description}</p>

              <footer style={styles.cardFooter}>
                <span style={styles.openText}>Open course →</span>
              </footer>
            </article>
          ))}
        </section>
      </div>
    </div>
</>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    marginBottom: "28px",
    borderBottom: "1px solid #dcdcdc",
    paddingBottom: "14px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    margin: "0 0 6px 0",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
  },
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "18px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #dfe3e8",
    borderRadius: "6px",
    padding: "16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow 0.2s ease",
  },
  cardHeader: {
    marginBottom: "8px",
  },
  category: {
    fontSize: "12px",
    color: "#6b6b6b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#222",
    margin: "6px 0 8px 0",
    lineHeight: "1.3",
  },
  cardDescription: {
    fontSize: "13px",
    color: "#444",
    lineHeight: "1.5",
    flexGrow: 1,
  },
  cardFooter: {
    marginTop: "14px",
    borderTop: "1px solid #ededed",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  openText: {
    fontSize: "13px",
    color: "#1976d2",
    fontWeight: "500",
  },
};