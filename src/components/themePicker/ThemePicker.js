import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeContext from "../../ThemeContext";
import { LanguageContext } from "../../LanguageContext";
import "./ThemePicker.css";

/**
 * Palette switcher. Each swatch previews its own theme using that theme's own
 * tokens, so the choice is made visually rather than by reading labels.
 */
export default function ThemePicker() {
  const { theme, themeKey, setThemeKey, options } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const label = language === "no" ? "Fargetema" : "Colour theme";

  // Click-outside and Escape both close the popover. Without these it can be
  // left hanging open while the user interacts with the page behind it.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="theme-picker" ref={wrapRef}>
      <button
        type="button"
        className="theme-picker-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={label}
        title={label}
        onClick={() => setOpen((o) => !o)}
        style={{ color: theme.text, borderColor: theme.text }}
      >
        <span
          className="theme-picker-dot"
          style={{
            background: `linear-gradient(135deg, ${theme.imageHighlight}, ${theme.jacketColor})`,
          }}
        />
        <span className="theme-picker-caret">▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-picker-pop"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: theme.body,
              borderColor: `${theme.imageHighlight}55`,
            }}
          >
            <p className="theme-picker-title" style={{ color: theme.text }}>
              {label}
            </p>
            <div className="theme-picker-grid">
              {options.map((opt) => {
                const active = opt.key === themeKey;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    title={opt.label}
                    aria-label={opt.label}
                    aria-pressed={active}
                    className={`theme-swatch${active ? " is-active" : ""}`}
                    onClick={() => {
                      setThemeKey(opt.key);
                      setOpen(false);
                    }}
                    style={{
                      // Preview each option in its own palette, not the active one.
                      background: `linear-gradient(135deg, ${opt.theme.body} 0 45%, ${opt.theme.imageHighlight} 45% 100%)`,
                      borderColor: active
                        ? opt.theme.imageHighlight
                        : `${theme.secondaryText}44`,
                      boxShadow: active
                        ? `0 0 0 2px ${theme.body}, 0 0 0 4px ${opt.theme.imageHighlight}`
                        : "none",
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
