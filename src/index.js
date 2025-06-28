import React from "react";
import ReactDOM from "react-dom";
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/font-awesome/css/all.css";

import { BrowserRouter } from "react-router-dom";   // ✨ NYTT

const engine = new Styletron();

ReactDOM.render(
    <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
            {/* PUBLIC_URL = "https://sushantsriv.github.io/portfolio" fra package.json */}
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <App />
            </BrowserRouter>
        </BaseProvider>
    </StyletronProvider>,
    document.getElementById("root")
);

// Hvis du vil ha PWA-/offline-støtte, bytt til register()
serviceWorker.unregister();
