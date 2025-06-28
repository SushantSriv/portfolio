import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";      // ← change
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/font-awesome/css/all.css";

const engine = new Styletron();

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>     {/* ← change */}
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <App />
            </BaseProvider>
        </StyletronProvider>
    </BrowserRouter>, {/* ← change */ }
  document.getElementById("root")
);

serviceWorker.unregister();
