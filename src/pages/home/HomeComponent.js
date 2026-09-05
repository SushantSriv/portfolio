import React, { Component } from "react";
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import StatsStrip from "../../components/statsStrip/StatsStrip";
import Skills from "../../containers/skills/Skills";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";

class Home extends Component {
  render() {
    const { theme, portfolio } = this.props;

    return (
      <div>
        <Header theme={theme} />
        <Greeting theme={theme} greeting={portfolio.greeting} />
        <StatsStrip theme={theme} portfolio={portfolio} />
        <Skills theme={theme} skills={portfolio.skills} />
        <Footer theme={theme} />
        <TopButton theme={theme} />
      </div>
    );
  }
}

export default Home;
