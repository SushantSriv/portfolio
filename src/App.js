import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";
import { LanguageProvider } from "./LanguageContext";

function App() {
    return (
        <LanguageProvider>
            <ThemeProvider theme={chosenTheme}>
                <>
                    <GlobalStyles />
                    <div>
                        <Main theme={chosenTheme} />
                    </div>
                </>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;
