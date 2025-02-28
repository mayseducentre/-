import React, { useState, useEffect } from "react";
import Breadcrumb from "../breadcrumb";

const API_URL = `${process.env.REACT_APP_NOTE_DB}/projects`; // Replace with your Glitch DB URL

const ProjectView = () => {
  const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(API_URL)
              .then((res) => res.json())
                    .then((data) => setProjects(data))
                          .catch((error) => console.error("Error fetching projects:", error));
                            }, []);

                              return (
                                  <div>
                                    <Breadcrumb title="View Projects" />
                                    
                                        <h2>All Student Projects</h2>
                                              <ul>
                                                      {projects.map((project) => (
                                                                <li key={project.id}>
                                                                            <strong>{project.title}</strong> -{" "}
                                                                                        <a href={project.fileUrl} target="_blank" rel="noopener noreferrer">
                                                                                                      View Project
                                                                                                                  </a>
                                                                                                                            </li>
                                                                                                                                    ))}
                                                                                                                                          </ul>
                                                                                                                                              </div>
                                                                                                                                                );
                                                                                                                                                };

                                                                                                                                                export default ProjectView;