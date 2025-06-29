import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import Error404 from "../pages/errors/error404/Error";

import { settings } from "../portfolio.js"; 
import { LanguageContext } from "../LanguageContext";
import * as portfolio_en from "../portfolio_en";
import * as portfolio_no from "../portfolio_no";

export default class Main extends Component {
    static contextType = LanguageContext;

    render() {
        const { language } = this.context;
        const portfolio = language === "no" ? portfolio_no : portfolio_en;

        return (
            <Switch>
                <Route
                    path="/"
                    exact
                    render={(props) =>
                        settings.isSplash ? (
                            <Splash {...props} theme={this.props.theme} />
                        ) : (
                            <Home {...props} theme={this.props.theme} portfolio={portfolio} />
                        )
                    }
                />
                <Route
                    path="/home"
                    render={(props) => (
                        <Home {...props} theme={this.props.theme} portfolio={portfolio} />
                    )}
                />
                <Route
                    path="/experience"
                    exact
                    render={(props) => (
                        <Experience {...props} theme={this.props.theme} portfolio={portfolio} />
                    )}
                />
                <Route
                    path="/education"
                    render={(props) => (
                        <Education {...props} theme={this.props.theme} portfolio={portfolio} />
                    )}
                />
                <Route
                    path="/contact"
                    render={(props) => (
                        <Contact {...props} theme={this.props.theme} portfolio={portfolio} />
                    )}
                />
                <Route
                    path="/projects"
                    render={(props) => (
                        <Projects {...props} theme={this.props.theme} portfolio={portfolio} />
                    )}
                />
                {settings.isSplash && (
                    <Route
                        path="/splash"
                        render={(props) => <Splash {...props} theme={this.props.theme} />}
                    />
                )}
                <Route
                    path="*"
                    render={(props) => <Error404 {...props} theme={this.props.theme} />}
                />
            </Switch>
        );
    }
}
