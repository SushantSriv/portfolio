import React from "react";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import useInView from "../../hooks/useInView";
import { REVEAL_EASE } from "./Reveal";
import "./AnimatedHeading.css";

/**
 * Headline that reveals word by word, each word rising out from behind a
 * mask (the classic editorial/agency reveal).
 *
 * On gradient headings the background lives on each word span rather than
 * the parent: `background-clip: text` clips a parent's background to its own
 * paint box, so a transformed child would slide its glyphs out of that
 * clipped region and lose the fill mid-animation. Per-word backgrounds keep
 * every word painted correctly while it moves. The gradients used here run
 * between two close colors, so the per-word ramp reads as one continuous
 * sweep rather than repeating stripes.
 */
export default function AnimatedHeading({
  text,
  as = "h1",
  className = "",
  style,
  gradientFrom,
  gradientTo,
  delay = 0,
  stagger = 0.055,
  duration = 0.75,
  once = true,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ once });

  const gradient =
    gradientFrom && gradientTo
      ? `linear-gradient(120deg, ${gradientFrom}, ${gradientTo})`
      : null;

  const wordStyle = gradient
    ? {
        backgroundImage: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }
    : undefined;

  const words = String(text || "").split(" ");
  const PlainTag = as;

  // The separator is a real text node rather than CSS margin so the heading's
  // text content stays "Get in touch" and not "Getintouch" - that string is
  // what screen readers announce and what a user copies out of the page.
  const spacer = (i) => (i < words.length - 1 ? " " : null);

  if (reduced) {
    return (
      <PlainTag className={`animated-heading ${className}`} style={style}>
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className="ah-word-mask">
              <span className="ah-word" style={wordStyle}>
                {word}
              </span>
            </span>
            {spacer(i)}
          </React.Fragment>
        ))}
      </PlainTag>
    );
  }

  const Tag = motion[as] || motion.h1;

  return (
    <Tag
      ref={ref}
      className={`animated-heading ${className}`}
      style={style}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="ah-word-mask">
            <motion.span
              className="ah-word"
              style={wordStyle}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration, ease: REVEAL_EASE },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {spacer(i)}
        </React.Fragment>
      ))}
    </Tag>
  );
}
