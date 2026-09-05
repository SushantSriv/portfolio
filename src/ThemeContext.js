import React, { createContext, useCallback, useMemo, useState } from "react";
import * as themes from "./theme";

const STORAGE_KEY = "portfolio_theme";

/**
 * The 14 palettes in theme.js were defined but unreachable - the app imported
 * `chosenTheme` directly, so switching meant editing source. This exposes them
 * as a real, persisted user choice.
 *
 * Order is deliberate: light/airy first, then the deeper and higher-contrast
 * ones, so the swatch row reads as a gradient rather than a random grid.
 */
export const THEME_OPTIONS = [
  { key: "blue", label: "Ocean", theme: themes.blueTheme },
  { key: "teal", label: "Lagoon", theme: themes.tealTheme },
  { key: "green", label: "Meadow", theme: themes.greenTheme },
  { key: "violet", label: "Violet", theme: themes.violetTheme },
  { key: "purple", label: "Orchid", theme: themes.purpleTheme },
  { key: "pink", label: "Blossom", theme: themes.pinkTheme },
  { key: "red", label: "Ember", theme: themes.redTheme },
  { key: "orange", label: "Amber", theme: themes.orangeTheme },
  { key: "yellow", label: "Sunbeam", theme: themes.yellowTheme },
  { key: "brown", label: "Clay", theme: themes.brownTheme },
  { key: "materialLight", label: "Paper", theme: themes.materialLightTheme },
  { key: "materialTeal", label: "Mint", theme: themes.materialTealTheme },
  { key: "black", label: "Graphite", theme: themes.blackTheme },
  { key: "materialDark", label: "Midnight", theme: themes.materialDarkTheme },
];

const DEFAULT_KEY = "blue";

function readStoredKey() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return THEME_OPTIONS.some((o) => o.key === stored) ? stored : DEFAULT_KEY;
  } catch (e) {
    // Private mode / blocked storage - fall back rather than break rendering.
    return DEFAULT_KEY;
  }
}

export const ThemeContext = createContext({
  themeKey: DEFAULT_KEY,
  theme: themes.chosenTheme,
  setThemeKey: () => {},
  options: THEME_OPTIONS,
});

export function ThemeSwitcherProvider({ children }) {
  const [themeKey, setKey] = useState(readStoredKey);

  const setThemeKey = useCallback((key) => {
    setKey(key);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch (e) {
      // Persisting is a nicety; the switch itself must still work.
    }
  }, []);

  const value = useMemo(() => {
    const found =
      THEME_OPTIONS.find((o) => o.key === themeKey) || THEME_OPTIONS[0];
    return {
      themeKey: found.key,
      theme: found.theme,
      setThemeKey,
      options: THEME_OPTIONS,
    };
  }, [themeKey, setThemeKey]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;
