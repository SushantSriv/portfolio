/**
 * Small colour helpers.
 *
 * The hero panel is always dark (it paints over theme.dark), but the palettes
 * vary wildly in lightness - blueTheme's highlight is a pale blue while
 * materialDarkTheme's is a mid grey. Colours pulled straight from a theme can
 * therefore vanish against the hero. These let a component ask for "this theme
 * colour, but guaranteed light enough to read on a dark panel".
 */

function parseHex(hex) {
  if (typeof hex !== "string") return null;
  let h = hex.trim().replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6 || /[^0-9a-f]/i.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

const toHex = (n) =>
  Math.max(0, Math.min(255, Math.round(n)))
    .toString(16)
    .padStart(2, "0");

/** Mix a hex colour toward white. amount 0 = unchanged, 1 = white. */
export function lighten(hex, amount = 0.5) {
  const c = parseHex(hex);
  if (!c) return hex;
  const m = (v) => v + (255 - v) * amount;
  return `#${toHex(m(c.r))}${toHex(m(c.g))}${toHex(m(c.b))}`;
}

/** Perceived brightness, 0 (black) to 1 (white). Rec. 601 luma. */
export function luminance(hex) {
  const c = parseHex(hex);
  if (!c) return 0.5;
  return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255;
}

/**
 * Return `hex` lightened only as far as needed to clear `min` brightness.
 * Colours that are already light are returned untouched, so themes keep their
 * character instead of every palette washing out to the same pale tint.
 */
export function ensureLight(hex, min = 0.72) {
  const lum = luminance(hex);
  if (lum >= min) return hex;
  // Solving the mix exactly is overkill; the shortfall maps closely enough to
  // the mix amount, and it is clamped so nothing ever goes fully white.
  return lighten(hex, Math.min(0.85, (min - lum) / (1 - lum)));
}
