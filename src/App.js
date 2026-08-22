import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";
import { LanguageProvider } from "./LanguageContext";
import ScrollProgress from "./components/scrollProgress/ScrollProgress";
import CursorGlow from "./components/cursorGlow/CursorGlow";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={chosenTheme}>
        <>
          <GlobalStyles />
          <ScrollProgress theme={chosenTheme} />
          {/* The glow sits at z-index 0 and the content at z-index 1, so the
              ambient light shows through the gaps around cards without ever
              washing over text. */}
          <CursorGlow theme={chosenTheme} />
          <div className="app-content">
            <Main theme={chosenTheme} />
          </div>
        </>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
