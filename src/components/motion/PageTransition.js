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
 *
 * This ALWAYS renders a `motion.div` carrying an `exit`, even when the user
 * prefers reduced motion - it just runs at zero duration. That matters because
 * <AnimatePresence exitBeforeEnter> holds the incoming route until the
 * outgoing one reports that its exit finished. A plain `div` has no exit to
 * report, so the swap never completes and the app renders nothing at all. A
 * zero-duration exit resolves immediately while still keeping motion off.
 */
export default function PageTransition({ children, className, style }) {
  const reduced = usePrefersReducedMotion();

  // Routes render at whatever scroll offset the previous page was at, which
  // makes a new page look like it opened halfway down. Reset on mount.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const motionProps = reduced
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.35, ease: EASE },
      };

  return (
    <motion.div className={className} style={style} {...motionProps}>
      {children}
    </motion.div>
  );
}
