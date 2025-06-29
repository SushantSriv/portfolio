import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Educations from "../../containers/education/Educations";
import Certifications from "../../containers/certifications/Certifications";
import CompetitiveSites from "../../components/competitiveSites/CompetitiveSites";
import EducationImg from "./EducationImg";
import "./EducationComponent.css";
import { Fade } from "react-reveal";
import { LanguageContext } from "../../LanguageContext";

export default class Education extends Component {
    static contextType = LanguageContext;

    render() {
        const theme = this.props.theme;
        const { language } = this.context;
        const { portfolio } = this.props;

        const eduHeader = language === "no" ? "Utdanning" : "Education";
        const eduSubHeader =
            language === "no"
                ? "Grunnleggende kvalifikasjoner og sertifiseringer"
                : "Basic Qualification and Certifications";

        return (
            <div className="education-main">
                <Header theme={theme} />
                <div className="basic-education">
                    <Fade bottom duration={2000} distance="40px">
                        <div className="heading-div">
                            <div className="heading-img-div">
                                <EducationImg theme={theme} />
                            </div>
                            <div className="heading-text-div">
                                <h1 className="heading-text" style={{ color: theme.text }}>
                                    {eduHeader}
                                </h1>
                                <h3 className="heading-sub-text" style={{ color: theme.text }}>
                                    {eduSubHeader}
                                </h3>
                                <CompetitiveSites
                                    logos={portfolio.competitiveSites.competitiveSites}
                                />
                            </div>
                        </div>
                    </Fade>

                    <Educations theme={theme} degrees={portfolio.degrees} />

                    {portfolio.certifications.certifications.length > 0 && (
                        <Certifications
                            theme={theme}
                            certifications={portfolio.certifications}
                        />
                    )}
                </div>
                <Footer theme={theme} />
                <TopButton theme={theme} />
            </div>
        );
    }
}
