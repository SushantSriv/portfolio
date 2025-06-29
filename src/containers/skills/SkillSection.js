import React, { Component } from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { Fade } from "react-reveal";

import DataScienceImg from "./DataScienceImg";
import FullStackImg from "./FullStackImg";
import CloudInfraImg from "./CloudInfraImg";
import DesignImg from "./DesignImg";

/* Henter riktig SVG‐komponent */
function GetSkillSvg({ fileName, theme }) {
    switch (fileName) {
        case "DataScienceImg":
            return <DataScienceImg theme={theme} />;
        case "FullStackImg":
            return <FullStackImg theme={theme} />;
        case "CloudInfraImg":
            return <CloudInfraImg theme={theme} />;
        default:
            return <DesignImg theme={theme} />;
    }
}

class SkillSection extends Component {
    render() {
        const { theme, skills } = this.props;   // 👈 henter fra props

        return (
            <div>
                {skills.data.map((skill, idx) => (
                    <div key={idx} className="skills-main-div">
                        <Fade left duration={2000}>
                            <div className="skills-image-div">
                                <GetSkillSvg fileName={skill.fileName} theme={theme} />
                            </div>
                        </Fade>

                        <div className="skills-text-div">
                            <Fade right duration={1000}>
                                <h1 className="skills-heading" style={{ color: theme.text }}>
                                    {skill.title}
                                </h1>
                            </Fade>

                            <Fade right duration={1500}>
                                <SoftwareSkill logos={skill.softwareSkills} />
                            </Fade>

                            <Fade right duration={2000}>
                                {skill.skills.map((sentence, i) => (
                                    <p
                                        key={i}
                                        className="subTitle skills-text"
                                        style={{ color: theme.secondaryText }}
                                    >
                                        {sentence}
                                    </p>
                                ))}
                            </Fade>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default SkillSection;
