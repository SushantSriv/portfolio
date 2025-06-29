import { Fade } from "react-reveal";
import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import ExperienceAccordion from "../../containers/experienceAccordion/ExperienceAccordion";
import "./Experience.css";
import ExperienceImg from "./ExperienceImg";

class Experience extends Component {
    render() {
        const { theme, portfolio } = this.props;
        // Henter riktig data for valgt språk
        const exp = portfolio.experience;

        return (
            <div className="experience-main">
                <Header theme={theme} />

                <div className="basic-experience">
                    <Fade bottom duration={2000} distance="40px">
                        <div className="experience-heading-div">
                            <div className="experience-heading-img-div">
                                <ExperienceImg theme={theme} />
                            </div>
                            <div className="experience-heading-text-div">
                                <h1
                                    className="experience-heading-text"
                                    style={{ color: theme.text }}
                                >
                                    {exp.title}
                                </h1>
                                <h3
                                    className="experience-heading-sub-text"
                                    style={{ color: theme.text }}
                                >
                                    {exp.subtitle}
                                </h3>
                                <p
                                    className="experience-header-detail-text subTitle"
                                    style={{ color: theme.secondaryText }}
                                >
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    </Fade>
                </div>

                <ExperienceAccordion sections={exp.sections} theme={theme} />

                <Footer theme={theme} />
                <TopButton theme={theme} />
            </div>
        );
    }
}

export default Experience;
