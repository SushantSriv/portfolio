import React, { useContext } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { LanguageProvider } from "./LanguageContext";
import { ThemeSwitcherProvider, ThemeContext } from "./ThemeContext";
import ScrollProgress from "./components/scrollProgress/ScrollProgress";
import CursorGlow from "./components/cursorGlow/CursorGlow";

// The active palette used to be the hardcoded `chosenTheme` import. It now
// comes from ThemeContext so visitors can switch it, but everything downstream
// still receives it as a plain `theme` prop - no component below had to change.
function ThemedApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <ScrollProgress theme={theme} />
        {/* The glow sits at z-index 0 and the content at z-index 1, so the
            ambient light shows through the gaps around cards without ever
            washing over text. */}
        <CursorGlow theme={theme} />
        <div className="app-content">
          <Main theme={theme} />
        </div>
      </>
    </ThemeProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeSwitcherProvider>
        <ThemedApp />
      </ThemeSwitcherProvider>
    </LanguageProvider>
  );
}

export default App;
