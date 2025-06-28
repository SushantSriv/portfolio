import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";          // BrowserRouter removed
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import { settings } from "../portfolio.js";
import Error404 from "../pages/errors/error404/Error";

export default class Main extends Component {
    render() {
        return (
            <Switch>                                            {/* single routing context */}
                <Route
                    path="/"
                    exact
                    render={(props) =>
                        settings.isSplash ? (
                            <Splash {...props} theme={this.props.theme} />
                        ) : (
                            <Home {...props} theme={this.props.theme} />
                        )
                    }
                />
                <Route
                    path="/home"
                    render={(props) => <Home {...props} theme={this.props.theme} />}
                />
                <Route
                    path="/experience"
                    exact
                    render={(props) => (
                        <Experience {...props} theme={this.props.theme} />
                    )}
                />
                <Route
                    path="/education"
                    render={(props) => (
                        <Education {...props} theme={this.props.theme} />
                    )}
                />
                <Route
                    path="/contact"
                    render={(props) => <Contact {...props} theme={this.props.theme} />}
                />

                {settings.isSplash && (
                    <Route
                        path="/splash"
                        render={(props) => <Splash {...props} theme={this.props.theme} />}
                    />
                )}

                <Route
                    path="/projects"
                    render={(props) => <Projects {...props} theme={this.props.theme} />}
                />

                {/* catch-all 404 */}
                <Route
                    path="*"
                    render={(props) => <Error404 {...props} theme={this.props.theme} />}
                />
            </Switch>
        );
    }
}
