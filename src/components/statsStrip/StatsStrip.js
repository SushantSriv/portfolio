import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../LanguageContext";
import useInView from "../../hooks/useInView";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { getGlassStyle } from "../../styles/glassStyle";
import projectsData from "../../shared/opensource/projects.json";
import "./StatsStrip.css";

// First full-time software role (HPE, Jan 2020). Kept as a constant rather
// than parsed out of the experience strings, which are prose and localised.
const CAREER_START_YEAR = 2020;

function useCountUp(target, active, duration = 1400) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  const frame = useRef();

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    if (!active) return;

    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic: fast start, gentle landing on the final number.
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, active, duration, reduced]);

  return value;
}

function Stat({ value, suffix, label, theme, active, delay }) {
  const shown = useCountUp(value, active);
  return (
    <div className="stat-item" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-value" style={{ color: theme.imageHighlight }}>
        {shown}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label" style={{ color: theme.secondaryText }}>
        {label}
      </div>
    </div>
  );
}

/**
 * "At a glance" band under the hero.
 *
 * Every number is derived from the content already in the repo rather than
 * hardcoded, so the strip cannot drift out of date as projects, skills or
 * certifications are added.
 */
export default function StatsStrip({ theme, portfolio }) {
  const { language } = useContext(LanguageContext);
  const [ref, inView] = useInView({ once: true });

  const years = new Date().getFullYear() - CAREER_START_YEAR;
  const projects = projectsData.data.length;
  const certifications = portfolio.certifications.certifications.length;
  const technologies = new Set(
    portfolio.skills.data.flatMap((group) =>
      (group.softwareSkills || []).map((s) => s.skillName)
    )
  ).size;

  const stats =
    language === "no"
      ? [
          { value: years, suffix: "+", label: "År med utvikling" },
          { value: projects, suffix: "", label: "Prosjekter" },
          { value: technologies, suffix: "", label: "Teknologier" },
          { value: certifications, suffix: "", label: "Sertifiseringer" },
        ]
      : [
          { value: years, suffix: "+", label: "Years building software" },
          { value: projects, suffix: "", label: "Projects shipped" },
          { value: technologies, suffix: "", label: "Technologies" },
          { value: certifications, suffix: "", label: "Certifications" },
        ];

  return (
    <div className="stats-strip-wrap">
      <div
        ref={ref}
        className={`stats-strip${inView ? " is-visible" : ""}`}
        style={getGlassStyle(theme)}
      >
        {stats.map((s, i) => (
          <Stat
            key={s.label}
            {...s}
            theme={theme}
            active={inView}
            delay={i * 90}
          />
        ))}
      </div>
    </div>
  );
}
