// Shared glassmorphism style helper.
//
// This codebase themes every element via inline `style={{...}}` props driven
// by the active theme object (see theme.js), never CSS variables/classes for
// color. getGlassStyle follows that same convention so it drops into any
// component that already receives a `theme` prop.
export function getGlassStyle(
  theme,
  { borderOpacity = "33", shadowOpacity = 0.18 } = {}
) {
  return {
    backgroundColor: theme.body + "CC",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${theme.imageHighlight}${borderOpacity}`,
    boxShadow: `0 8px 32px -12px rgba(0, 0, 0, ${shadowOpacity})`,
  };
}

export default getGlassStyle;
