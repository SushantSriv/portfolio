import React from "react";
import { motion, useViewportScroll, useSpring } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./ScrollProgress.css";

/**
 * Thin gradient bar pinned to the top of the viewport that tracks how far
 * down the page you are. The raw scroll value is passed through a spring so
 * the bar glides instead of tracking the wheel one-to-one, which is what
 * makes it feel smooth rather than mechanical.
 */
export default function ScrollProgress({ theme }) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useViewportScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: reduced ? scrollYProgress : scaleX,
        backgroundImage: `linear-gradient(90deg, ${theme.imageHighlight}, ${theme.highlight}, ${theme.jacketColor})`,
      }}
    />
  );
}
