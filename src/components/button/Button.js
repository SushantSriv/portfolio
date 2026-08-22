import React, { useRef } from "react";
import "./Button.css";
import { motion, useMotionValue, useSpring } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const onMouseEnter = (event, color, bgColor) => {
  const el = event.target;
  el.style.color = color;
  el.style.backgroundColor = bgColor;
};

const onMouseOut = (event, color, bgColor) => {
  const el = event.target;
  el.style.color = color;
  el.style.backgroundColor = bgColor;
};

// How far the button may chase the pointer, as a fraction of the cursor's
// offset from its centre. Small on purpose: past roughly 0.3 the button stops
// feeling magnetic and starts feeling like it's dodging the click.
const PULL_X = 0.22;
const PULL_Y = 0.32;

export default function Button({ text, className, href, newTab, theme }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  const handleMove = (event) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * PULL_X);
    y.set((event.clientY - (rect.top + rect.height / 2)) * PULL_Y);
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={className}>
      <motion.a
        ref={ref}
        className="main-button"
        href={href}
        target={newTab && "_blank"}
        style={{
          color: theme.body,
          backgroundColor: theme.text,
          border: `solid 1px ${theme.text}`,
          ...(reduced ? null : { x: springX, y: springY }),
        }}
        onMouseEnter={(event) => onMouseEnter(event, theme.text, theme.body)}
        onMouseMove={handleMove}
        onMouseOut={(event) => {
          onMouseOut(event, theme.body, theme.text);
          release();
        }}
        // No hover y-offset here: the magnetic transform already owns x/y, and
        // a competing `whileHover` would fight the spring.
        whileTap={{ scale: 0.95 }}
      >
        {text}
      </motion.a>
    </div>
  );
}
