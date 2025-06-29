import React, { useContext } from "react";
import "./Skills.css";
import SkillSection from "./SkillSection";
import { Fade } from "react-reveal";
import { LanguageContext } from "../../LanguageContext";  // Ny import

export default function Skills(props) {
    const theme = props.theme;
    const skills = props.skills;  // Henter ferdighetsdata fra props

    const { language } = useContext(LanguageContext);  // Les valgt språk

    // Velg overskriftstekst basert på språk (eller custom heading om satt)
    const headingText = skills.heading
        ? skills.heading
        : language === "no"
            ? "Dette gjør jeg"
            : "What I Do?";

    return (
        <div className="main" id="skills">
            <div className="skills-header-div">
                <Fade bottom duration={2000} distance="20px">
                    <h1 className="skills-header" style={{ color: theme.text }}>
                        {headingText}
                    </h1>
                </Fade>
            </div>
            <SkillSection theme={theme} skills={skills} />
        </div>
    );
}
