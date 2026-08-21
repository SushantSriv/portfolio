import React, { Suspense, lazy } from "react";
import "./Hero3D.css";
import FeelingProud from "../../containers/greeting/FeelingProud";
import Hero3DErrorBoundary from "./Hero3DErrorBoundary";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

function supportsWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

export default function Hero3D({ theme }) {
  const reducedMotion = usePrefersReducedMotion();
  const fallback = <FeelingProud theme={theme} />;

  if (reducedMotion || !supportsWebGL()) {
    return <div className="hero3d-fallback">{fallback}</div>;
  }

  return (
    <div className="hero3d-canvas-wrap">
      <Hero3DErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <Hero3DScene theme={theme} />
        </Suspense>
      </Hero3DErrorBoundary>
    </div>
  );
}
