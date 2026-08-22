import React, { createContext, useContext } from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import useInView from "../../hooks/useInView";

// easeOutExpo-ish. Starts fast, settles slowly - reads as "weighty but
// effortless", which is what separates a premium reveal from a linear one.
export const REVEAL_EASE = [0.22, 1, 0.36, 1];

const OFFSETS = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: -50, y: 0 },
  right: { x: 50, y: 0 },
  none: { x: 0, y: 0 },
};

function resolveOffset(direction, distance) {
  const base = OFFSETS[direction] || OFFSETS.up;
  if (distance == null) return base;
  return {
    x: base.x === 0 ? 0 : Math.sign(base.x) * distance,
    y: base.y === 0 ? 0 : Math.sign(base.y) * distance,
  };
}

/**
 * Scroll-triggered reveal.
 *
 * Preferred over the react-reveal <Fade> used elsewhere in this codebase:
 * react-reveal animates on mount rather than on true viewport entry, so
 * content below the fold often finishes animating before you ever scroll to
 * it. This fires exactly when the element enters view (see useInView).
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance,
  once = true,
  margin,
  className,
  style,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ once, ...(margin ? { margin } : null) });
  const offset = resolveOffset(direction, distance);

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration, delay, ease: REVEAL_EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Cascade context.
 *
 * framer-motion 2.9.4 does not reliably propagate a parent's variant label
 * down to child `motion` components the way v6+ does - the parent reaches
 * "show" while the children stay stuck on "hidden". Rather than depend on
 * that behaviour, the group publishes its in-view state here and each item
 * animates itself, with the stagger applied as an explicit per-item delay.
 */
const CascadeContext = createContext(null);

export function RevealGroup({
  children,
  stagger = 0.1,
  delayChildren = 0,
  duration = 0.6,
  direction = "up",
  distance,
  once = true,
  margin,
  className,
  style,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ once, ...(margin ? { margin } : null) });

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // React.Children.map flattens nested arrays, so items coming from a
  // `.map()` are numbered in the same sequence as literal children.
  let cursor = 0;
  const indexed = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const index = cursor++;
    return (
      <CascadeContext.Provider
        value={{
          inView,
          delay: delayChildren + index * stagger,
          duration,
          direction,
          distance,
        }}
      >
        {child}
      </CascadeContext.Provider>
    );
  });

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {indexed}
    </div>
  );
}

/**
 * A single item in a <RevealGroup> cascade. Falls back to revealing on its
 * own if it happens to be rendered outside a group.
 */
export function RevealItem({
  children,
  className,
  style,
  as = "div",
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const cascade = useContext(CascadeContext);
  // Only used when this item is standalone; inside a group the parent's
  // observer drives it, and calling the hook unconditionally keeps hook
  // order stable across renders.
  const [ownRef, ownInView] = useInView({ once: true });

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  const Tag = motion[as] || motion.div;
  const inGroup = cascade != null;
  const inView = inGroup ? cascade.inView : ownInView;
  const offset = resolveOffset(
    inGroup ? cascade.direction : "up",
    inGroup ? cascade.distance : undefined
  );

  return (
    <Tag
      ref={inGroup ? undefined : ownRef}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration: inGroup ? cascade.duration : 0.6,
        delay: inGroup ? cascade.delay : 0,
        ease: REVEAL_EASE,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
