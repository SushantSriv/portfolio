import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./CursorGlow.css";

/**
 * Soft ambient light that trails the cursor.
 *
 * Deliberately laggy (low stiffness) and large: a glow that tracks the
 * pointer exactly reads as a cursor replacement and gets distracting, while
 * one that drifts behind reads as lighting on the page.
 *
 * Desktop-only by design - it's gated on a fine pointer (mouse/trackpad), so
 * touch devices never pay for the listener or the paint.
 */
export default function CursorGlow({ theme }) {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 55, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 55, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    setEnabled(true);
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow"
      style={{
        x: sx,
        y: sy,
        background: `radial-gradient(circle, ${theme.imageHighlight}38 0%, ${theme.imageHighlight}12 35%, transparent 68%)`,
      }}
    />
  );
}
