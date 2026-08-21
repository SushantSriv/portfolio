import React from "react";

export default class Hero3DErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Swallow the error: the 3D hero is a visual enhancement, never the
    // reason the rest of the page should fail to render.
    if (process.env.NODE_ENV !== "production") {
      console.warn("Hero3D failed to render, falling back:", error);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
