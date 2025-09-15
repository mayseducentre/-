import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
      super(props);
          this.state = { hasError: false };
            }

              static getDerivedStateFromError(error) {
                  // Update state so the next render shows fallback UI
                      return { hasError: true };
                        }

                          componentDidCatch(error, errorInfo) {
                              // You can log errors to a monitoring service (optional)
                                  console.error("App crashed:", error, errorInfo);
                                    }

                                      render() {
                                          if (this.state.hasError) {
                                                return (
                                                        <div style={{ textAlign: "center", padding: "50px" }}>
                                                                  <h1>Something went wrong 😥</h1>
                                                                            <p>Please refresh the page or try again later.</p>
                                                                                    </div>
                                                                                          );
                                                                                              }

                                                                                                  return this.props.children;
                                                                                                    }
                                                                                                    }

                                                                                                    export default ErrorBoundary;