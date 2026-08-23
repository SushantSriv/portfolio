import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import Error404 from "../pages/errors/error404/Error";
import PageTransition from "../components/motion/PageTransition";

import { settings } from "../portfolio.js";
import { LanguageContext } from "../LanguageContext";
import * as portfolio_en from "../portfolio_en";
import * as portfolio_no from "../portfolio_no";

export default class Main extends Component {
  static contextType = LanguageContext;

  render() {
    const { language } = this.context;
    const portfolio = language === "no" ? portfolio_no : portfolio_en;
    const theme = this.props.theme;

    // The outer pathless Route exists purely to read `location`, which
    // AnimatePresence needs as a key: without it the Switch swaps children in
    // place and the outgoing page is unmounted before it can animate out.
    return (
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
              <Route
                path="/"
                exact
                render={(props) =>
                  settings.isSplash ? (
                    <PageTransition>
                      <Splash {...props} theme={theme} />
                    </PageTransition>
                  ) : (
                    <PageTransition>
                      <Home {...props} theme={theme} portfolio={portfolio} />
                    </PageTransition>
                  )
                }
              />
              <Route
                path="/home"
                render={(props) => (
                  <PageTransition>
                    <Home {...props} theme={theme} portfolio={portfolio} />
                  </PageTransition>
                )}
              />
              <Route
                path="/experience"
                exact
                render={(props) => (
                  <PageTransition>
                    <Experience
                      {...props}
                      theme={theme}
                      portfolio={portfolio}
                    />
                  </PageTransition>
                )}
              />
              <Route
                path="/education"
                render={(props) => (
                  <PageTransition>
                    <Education {...props} theme={theme} portfolio={portfolio} />
                  </PageTransition>
                )}
              />
              <Route
                path="/contact"
                render={(props) => (
                  <PageTransition>
                    <Contact {...props} theme={theme} portfolio={portfolio} />
                  </PageTransition>
                )}
              />
              <Route
                path="/projects"
                render={(props) => (
                  <PageTransition>
                    <Projects {...props} theme={theme} portfolio={portfolio} />
                  </PageTransition>
                )}
              />
              {settings.isSplash && (
                <Route
                  path="/splash"
                  render={(props) => (
                    <PageTransition>
                      <Splash {...props} theme={theme} />
                    </PageTransition>
                  )}
                />
              )}
              <Route
                path="*"
                render={(props) => (
                  <PageTransition>
                    <Error404 {...props} theme={theme} />
                  </PageTransition>
                )}
              />
            </Switch>
          </AnimatePresence>
        )}
      />
    );
  }
}
