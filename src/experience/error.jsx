// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error details (you can also send this to a logging server)
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI if an error occurred
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    // Otherwise, render the children components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
