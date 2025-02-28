import React, { useState, useEffect } from "react";

const API_URL = `${process.env.REACT_APP_NOTE_DB}/projects`; // Replace with your Glitch DB URL

const ProjectUpload = () => {
  const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState("");
      const [fileUrl, setFileUrl] = useState("");

        // Fetch projects from Glitch DB
          const fetchProjects = () => {
              fetch(API_URL)
                    .then((res) => res.json())
                          .then((data) => setProjects(data))
                                .catch((error) => console.error("Error fetching projects:", error));
                                  };

                                    useEffect(() => {
                                        fetchProjects();
                                          }, []);

                                            // Handle project submission
                                              const handleSubmit = async (e) => {
                                                  e.preventDefault();

                                                      if (!title || !fileUrl) {
                                                            alert("Please enter a project title and file URL.");
                                                                  return;
                                                                      }

                                                                          const newProject = { id: Date.now(), title, fileUrl };

                                                                              fetch(API_URL, {
                                                                                    method: "POST",
                                                                                          headers: { "Content-Type": "application/json" },
                                                                                                body: JSON.stringify(newProject),
                                                                                                    })
                                                                                                          .then((res) => res.json())
                                                                                                                .then((data) => {
                                                                                                                        setProjects([...projects, data]);
                                                                                                                                setTitle("");
                                                                                                                                        setFileUrl("");
                                                                                                                                              })
                                                                                                                                                    .catch((error) => console.error("Error uploading project:", error));
                                                                                                                                                      };

                                                                                                                                                        // Handle project deletion
                                                                                                                                                          const handleDelete = async (id) => {
                                                                                                                                                              fetch(`${API_URL}/${id}`, { method: "DELETE" })
                                                                                                                                                                    .then(() => {
                                                                                                                                                                            setProjects(projects.filter((project) => project.id !== id));
                                                                                                                                                                                  })
                                                                                                                                                                                        .catch((error) => console.error("Error deleting project:", error));
                                                                                                                                                                                          };

                                                                                                                                                                                            return (
                                                                                                                                                                                                <div>
                                                                                                                                                                                                      <h2>Upload Your Project</h2>
                                                                                                                                                                                                            <form onSubmit={handleSubmit}>
                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                              type="text"
                                                                                                                                                                                                                                        placeholder="Project Title"
                                                                                                                                                                                                                                                  value={title}
                                                                                                                                                                                                                                                            onChange={(e) => setTitle(e.target.value)}
                                                                                                                                                                                                                                                                    />
                                                                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                                                                      type="text"
                                                                                                                                                                                                                                                                                                placeholder="File URL (e.g., Google Drive link)"
                                                                                                                                                                                                                                                                                                          value={fileUrl}
                                                                                                                                                                                                                                                                                                                    onChange={(e) => setFileUrl(e.target.value)}
                                                                                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                                                                                                    <button type="submit">Upload</button>
                                                                                                                                                                                                                                                                                                                                          </form>

                                                                                                                                                                                                                                                                                                                                                <h3>Your Uploaded Projects</h3>
                                                                                                                                                                                                                                                                                                                                                      <ul>
                                                                                                                                                                                                                                                                                                                                                              {projects.map((project) => (
                                                                                                                                                                                                                                                                                                                                                                        <li key={project.id}>
                                                                                                                                                                                                                                                                                                                                                                                    <strong>{project.title}</strong> -{" "}
                                                                                                                                                                                                                                                                                                                                                                                                <a href={project.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                                                                                                                                                                                                                                                                                                                                                              View Project
                                                                                                                                                                                                                                                                                                                                                                                                                          </a>
                                                                                                                                                                                                                                                                                                                                                                                                                                      <button onClick={() => handleDelete(project.id)}>Delete</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                </li>
                                                                                                                                                                                                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </ul>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    export default ProjectUpload;