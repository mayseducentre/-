import React, { useState } from "react";

// ======= Data: Subjects, Topics, Lessons =======
const eLearningData = [
  {
    subject: "Computing",
    topics: [
      {
        title: "Introduction to Computers",
        lesson: {
          content: `
Computers are electronic devices that process information. They perform tasks according to programmed instructions. Understanding computers is essential in the modern world.

**Subtopic: Components of a Computer**
- **CPU (Central Processing Unit):** The brain of the computer that processes instructions.
- **RAM (Random Access Memory):** Temporary memory for active tasks.
- **Storage (HDD/SSD):** Permanent memory to store files and programs.
- **Input Devices:** Devices like keyboard and mouse used to provide data to the computer.
- **Output Devices:** Devices like monitors and printers that display results.

**Example:**
When you type a document, your keyboard sends input to the CPU. The CPU processes it and shows it on the monitor.

**Mini Exercise:**
Identify the input and output devices in your room.

**Illustration:**
Think of the CPU as a chef, RAM as the countertop space, and storage as the pantry. Input devices are ingredients, output devices are the served dishes.
          `,
          video: "https://www.youtube.com/embed/8hly31xKli0"
        }
      },
      {
        title: "Basic Programming Concepts",
        lesson: {
          content: `
Programming is writing instructions that a computer can execute. Learning programming enhances problem-solving skills.

**Subtopic: Variables**
Variables store data values. Example in JavaScript:
\`\`\`javascript
let name = "Alice";
let age = 10;
\`\`\`

**Subtopic: Loops**
Loops repeat actions until a condition is met.
\`\`\`javascript
for(let i=0; i<5; i++){
  console.log(i);
}
\`\`\`

**Mini Exercise:**
Write a loop that prints numbers 1 to 10.

**Illustration:**
Think of variables as containers and loops as repetitive tasks you automate.
          `,
          video: "https://www.youtube.com/embed/8jLOx1hD3_o"
        }
      }
    ]
  },
  {
    subject: "Creative Arts",
    topics: [
      {
        title: "Introduction to Drawing",
        lesson: {
          content: `
Drawing is a way to express ideas visually using lines, shapes, and textures.

**Subtopic: Basic Shapes**
All drawings start with simple shapes: circles, squares, and triangles.

**Subtopic: Shading**
Shading gives depth. Light areas are left white; dark areas are shaded.

**Mini Exercise:**
Draw a simple house using only rectangles, triangles, and circles.

**Illustration:**
Imagine shading like sunlight on an object; the side away from light is darker.
          `,
          video: "https://www.youtube.com/embed/B1Cj6U-1N8s"
        }
      },
      {
        title: "Color Theory Basics",
        lesson: {
          content: `
Colors convey mood and meaning. Understanding color theory improves art quality.

**Subtopic: Primary Colors**
Red, blue, yellow.

**Subtopic: Secondary Colors**
Mixing two primary colors: green, orange, purple.

**Mini Exercise:**
Create a color wheel using colored pencils or paints.

**Illustration:**
Colors are like emotions in a painting; warm colors evoke energy, cool colors evoke calm.
          `,
          video: "https://www.youtube.com/embed/8H6-5hX5a6Q"
        }
      }
    ]
  },
  {
    subject: "Social Studies",
    topics: [
      {
        title: "Introduction to Geography",
        lesson: {
          content: `
Geography is the study of Earth's landscapes, environments, and how humans interact with them.

**Subtopic: Continents and Oceans**
Earth has 7 continents and 5 oceans.

**Subtopic: Maps**
Maps are visual representations of areas. Types include political, physical, and thematic maps.

**Mini Exercise:**
Draw a simple map of your town marking important landmarks.

**Illustration:**
Think of a map as a bird's-eye view of your environment.
          `,
          video: "https://www.youtube.com/embed/OZTTqfMTHKc"
        }
      },
      {
        title: "History of Civilizations",
        lesson: {
          content: `
Civilizations are societies with advanced cultural and technological development.

**Subtopic: Ancient Civilizations**
Examples: Mesopotamia, Egypt, Indus Valley.

**Subtopic: Contributions**
Writing, architecture, agriculture, governance.

**Mini Exercise:**
List three inventions from ancient Egypt and their uses.

**Illustration:**
Imagine civilizations as trees: roots are culture, trunk is governance, branches are technology.
          `,
          video: "https://www.youtube.com/embed/h5M5a7Qa8RI"
        }
      }
    ]
  },
  {
    subject: "Mathematics",
    topics: [
      {
        title: "Basic Arithmetic",
        lesson: {
          content: `
Arithmetic involves addition, subtraction, multiplication, and division.

**Subtopic: Addition & Subtraction**
Combine or remove numbers. Example: 5 + 3 = 8, 10 - 4 = 6.

**Subtopic: Multiplication & Division**
Repeated addition or sharing. Example: 4 x 3 = 12, 12 ÷ 4 = 3.

**Mini Exercise:**
Solve 15 + 7, 20 - 6, 5 x 3, 18 ÷ 2.

**Illustration:**
Think of multiplication as groups of items and division as distributing items equally.
          `,
          video: "https://www.youtube.com/embed/dPj7V2c5g2g"
        }
      },
      {
        title: "Fractions and Decimals",
        lesson: {
          content: `
Fractions represent parts of a whole. Decimals are another way to express fractions.

**Subtopic: Fractions**
1/2 means one part of two equal parts.

**Subtopic: Decimals**
0.5 is the same as 1/2.

**Mini Exercise:**
Convert 3/4 into a decimal.

**Illustration:**
Fractions are like slices of pizza. Decimals are like percentages of the pizza eaten.
          `,
          video: "https://www.youtube.com/embed/1j5Oi9dPwrQ"
        }
      }
    ]
  }
];

// ======= React Component =======
const ELearningPlatform = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const renderSubjects = () => (
    <div style={styles.grid}>
      {eLearningData.map((subj) => (
        <div
          key={subj.subject}
          style={styles.card}
          onClick={() => handleSubjectSelect(subj.subject)}
        >
          {subj.subject}
        </div>
      ))}
    </div>
  );

  const renderTopics = () => {
    const subjectData = eLearningData.find((s) => s.subject === selectedSubject);
    if (!subjectData) return null;
    return (
      <>
        <button style={styles.backButton} onClick={handleBackToSubjects}>
          ← Back to Subjects
        </button>
        <h2 style={styles.header}>{selectedSubject} Topics</h2>
        <div style={styles.grid}>
          {subjectData.topics.map((topic) => (
            <div
              key={topic.title}
              style={styles.card}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic.title}
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderLesson = () => {
    if (!selectedTopic) return null;
    const { lesson } = selectedTopic;
    return (
      <div>
        <button style={styles.backButton} onClick={handleBackToTopics}>
          ← Back to Topics
        </button>
        <h2 style={styles.header}>{selectedTopic.title}</h2>
        <div style={styles.lessonContent}>
          {lesson.content.split("\n\n").map((para, idx) => (
            <p key={idx} style={styles.paragraph}>
              {para}
            </p>
          ))}
        </div>
        <div style={styles.videoContainer}>
          <iframe
            width="100%"
            height="400"
            src={lesson.video}
            title="YouTube video lesson"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>E-Learning Platform</h1>
      {!selectedSubject && renderSubjects()}
      {selectedSubject && !selectedTopic && renderTopics()}
      {selectedTopic && renderLesson()}
    </div>
  );
};

// ======= Inline Styles =======
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2rem",
    color: "#333"
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5rem",
    color: "#555"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  card: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    hover: {
      backgroundColor: "#e0e0e0",
      transform: "translateY(-5px)"
    }
  },
  backButton: {
    padding: "10px 20px",
    marginBottom: "20px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "1rem"
  },
  lessonContent: {
    marginBottom: "20px"
  },
  paragraph: {
    marginBottom: "15px",
    lineHeight: "1.6",
    fontSize: "1rem",
    color: "#444"
  },
  videoContainer: {
    marginTop: "20px"
  }
};

export default ELearningPlatform;