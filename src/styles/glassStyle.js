import { luminance } from "./color";

// Shared glassmorphism style helper.
//
// This codebase themes every element via inline `style={{...}}` props driven
// by the active theme object (see theme.js), never CSS variables/classes for
// color. getGlassStyle follows that same convention so it drops into any
// component that already receives a `theme` prop.
export function getGlassStyle(
  theme,
  { borderOpacity = "44", shadowOpacity = 0.22, tint = true } = {}
) {
  // A card tinted with theme.body sitting on a theme.body page is invisible -
  // that was the original bug here, and it made every card on the site read as
  // a faint outline. Cards now lean away from the page colour instead: a touch
  // of the accent hue on light themes, a lift toward white on dark ones.
  const dark = luminance(theme.body) < 0.5;
  const wash = dark ? "rgba(255, 255, 255, 0.07)" : `${theme.imageHighlight}0F`;

  const background = tint
    ? `linear-gradient(145deg, ${wash}, ${wash}), ${theme.body}`
    : theme.body;

  return {
    background,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${theme.imageHighlight}${borderOpacity}`,
    // Two-part shadow: a tight contact shadow to seat the card, plus a wide
    // soft one for depth. A single large blur alone reads as a smudge.
    boxShadow: `0 1px 2px rgba(0, 0, 0, ${
      shadowOpacity * 0.5
    }), 0 18px 40px -22px rgba(0, 0, 0, ${shadowOpacity})`,
  };
}

export default getGlassStyle;
