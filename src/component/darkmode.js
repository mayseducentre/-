import React, { useState, useEffect } from "react";
import "../dark.css";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
      localStorage.getItem("darkMode") === "true"
        );

          useEffect(() => {
              const appWrapper = document.getElementById("app-wrapper");
                  if (darkMode) {
                        appWrapper.classList.add("dark-mode");
                            } else {
                                  appWrapper.classList.remove("dark-mode");
                                      }
                                          localStorage.setItem("darkMode", darkMode);
                                            }, [darkMode]);

                                              return (
                                                  <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
                                                        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                                                            </button>
                                                              );
                                                              };

                                                              export default DarkModeToggle;