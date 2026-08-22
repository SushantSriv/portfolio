import React, { Component } from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { getGlassStyle } from "../../styles/glassStyle";
import Reveal, {
  RevealGroup,
  RevealItem,
} from "../../components/motion/Reveal";

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
    const { theme, skills } = this.props;

    return (
      <div>
        {skills.data.map((skill, idx) => (
          <div
            key={idx}
            className="skills-main-div skills-card"
            style={getGlassStyle(theme)}
          >
            {/* Illustration and copy come in from opposite sides, so the two
                halves of the row resolve toward each other. */}
            <Reveal
              direction="left"
              className="skills-image-div"
              duration={0.85}
            >
              <GetSkillSvg fileName={skill.fileName} theme={theme} />
            </Reveal>

            <RevealGroup className="skills-text-div" stagger={0.12}>
              <RevealItem
                as="h1"
                className="skills-heading"
                style={{ color: theme.text }}
              >
                {skill.title}
              </RevealItem>

              <RevealItem>
                <SoftwareSkill logos={skill.softwareSkills} />
              </RevealItem>

              {skill.skills.map((sentence, i) => (
                <RevealItem
                  key={i}
                  as="p"
                  className="subTitle skills-text"
                  style={{ color: theme.secondaryText }}
                >
                  {sentence}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    );
  }
}

export default SkillSection;
