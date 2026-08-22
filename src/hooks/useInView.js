import { useState, useEffect, useRef } from "react";

/**
 * Reports whether the returned ref's element is in the viewport.
 *
 * This exists because the project is pinned to framer-motion 2.9.4, which
 * predates the `whileInView` / `viewport` props (added in v6). Upgrading
 * isn't an option here: framer-motion 5+ and its dependency tree (popmotion,
 * style-value-types, ...) ship ES builds as `.mjs`, and the webpack 4 that
 * react-scripts 3.2.0 bundles applies strict ESM semantics to `.mjs` and then
 * fails on their named imports from CommonJS React. Fixing that needs webpack
 * config we can't reach without ejecting, so the scroll-trigger is hand-rolled
 * on IntersectionObserver instead - which is all `whileInView` wraps anyway.
 *
 * @param {Object}  options
 * @param {boolean} options.once   stop observing after the first entry (default true)
 * @param {string}  options.margin rootMargin - negative values fire the reveal
 *                                 slightly before the element is fully visible
 * @param {number}  options.amount fraction of the element that must be visible
 */
export default function useInView({
  once = true,
  margin = "-60px",
  amount = 0,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Without IntersectionObserver (or during SSR) show the content rather
    // than leaving it stuck at opacity 0 forever.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold: amount }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin, amount]);

  return [ref, inView];
}
