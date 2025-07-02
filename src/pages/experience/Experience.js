import React, { Component } from "react";
import { Fade } from "react-reveal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import ExperienceAccordion from "../../containers/experienceAccordion/ExperienceAccordion";
import "./Experience.css";
import ExperienceImg from "./ExperienceImg";
import { LanguageContext } from "../../LanguageContext";

class Experience extends Component {
    static contextType = LanguageContext;

    render() {
        const { theme, portfolio } = this.props;
        const { language } = this.context;
        const exp = portfolio.experience;

        // Dynamisk tittel for anbefalingsbrev
        const recTitle =
            language === "no" ? "Anbefalingsbrev" : "Recommendation Letters";

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

                {/* Arbeidserfaring og frivillighet */}
                <ExperienceAccordion sections={exp.sections} theme={theme} />

                {/* Anbefalingsbrev-seksjon */}
                {exp.recommendationLetters && exp.recommendationLetters.length > 0 && (
                    <Fade bottom duration={2000} distance="40px">
                        <div className="recommendations-section">
                            <h2 style={{ color: theme.text }}>{recTitle}</h2>
                            <ul className="recommendation-list">
                                {exp.recommendationLetters.map((letter, idx) => (
                                    <li key={idx} style={{ color: theme.secondaryText }}>
                                        <a
                                            href={letter.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="recommendation-link"
                                        >
                                            {letter.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Fade>
                )}

                <Footer theme={theme} />
                <TopButton theme={theme} />
            </div>
        );
    }
}

export default Experience;
