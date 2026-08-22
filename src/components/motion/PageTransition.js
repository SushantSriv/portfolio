import React, { useEffect } from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Cross-fade wrapper for route changes.
 *
 * Kept deliberately short (~0.35s) and small in travel: a page transition is
 * dead time before the user can read anything, so anything longer starts to
 * feel like latency rather than polish.
 */
export default function PageTransition({ children, className, style }) {
  const reduced = usePrefersReducedMotion();

  // Routes render at whatever scroll offset the previous page was at, which
  // makes a new page look like it opened halfway down. Reset on mount.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
