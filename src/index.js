import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./assets/font-awesome/css/all.css";

const engine = new Styletron();

ReactDOM.render(
    <HashRouter>
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <App />
            </BaseProvider>
        </StyletronProvider>
    </HashRouter>,              // second argument starts here
    document.getElementById("root")
);

// If you want your app to work offline and load faster,
// change unregister() to register() below.
serviceWorker.unregister();
