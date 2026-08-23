import React, { Component } from "react";
import "./Splash.css";
import LoaderLogo from "../../components/Loader/LoaderLogo.js";
import { prefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { greeting } from "../../portfolio.js";

const SPLASH_SEEN_KEY = "portfolio_splash_seen";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" style={{ backgroundColor: props.theme.splashBg }}>
        <LoaderLogo id="logo" theme={props.theme} />
        <p className="splash-signature" style={{ color: props.theme.body }}>
          {greeting.title}
        </p>
      </div>
    </div>
  );
}

class Splash extends Component {
  constructor(props) {
    super(props);
    // Skip the 5.5s animation on repeat visits within the same session, and
    // for users who've opted out of motion.
    this.skip =
      !!sessionStorage.getItem(SPLASH_SEEN_KEY) || prefersReducedMotion();
  }

  componentDidMount() {
    if (this.skip) {
      this.goHome();
      return;
    }
    sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    this.id = setTimeout(this.goHome, 5500);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  // Navigating imperatively rather than rendering a <Redirect>. The splash
  // route sits inside an <AnimatePresence>, which keeps the outgoing subtree
  // mounted while it animates out - so a <Redirect> here would still be
  // rendering, pointing at the route we just arrived at, after the navigation
  // had already happened. `replace` also keeps the splash out of history, so
  // Back from /home leaves the site instead of replaying the intro.
  goHome = () => {
    this.props.history.replace("/home");
  };

  render() {
    if (this.skip) return null;
    return <AnimatedSplash theme={this.props.theme} />;
  }
}

export default Splash;
