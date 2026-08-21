import React, { Component } from "react";
import "./Splash.css";
import { Redirect } from "react-router-dom";
import LoaderLogo from "../../components/Loader/LoaderLogo.js";
import { prefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const SPLASH_SEEN_KEY = "portfolio_splash_seen";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" style={{ backgroundColor: props.theme.splashBg }}>
        <LoaderLogo id="logo" theme={props.theme} />
      </div>
    </div>
  );
}

class Splash extends Component {
  constructor(props) {
    super(props);
    const alreadySeen = sessionStorage.getItem(SPLASH_SEEN_KEY);
    this.state = {
      // Skip the 5.5s animation on repeat visits within the same session,
      // and for users who've opted out of motion.
      redirect: !!alreadySeen || prefersReducedMotion(),
    };
  }

  componentDidMount() {
    if (this.state.redirect) return;
    sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    this.id = setTimeout(() => this.setState({ redirect: true }), 5500);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/home" />
    ) : (
      <AnimatedSplash theme={this.props.theme} />
    );
  }
}

export default Splash;
