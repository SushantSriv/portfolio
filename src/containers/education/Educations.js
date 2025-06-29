import React, { useContext } from "react";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard";
import { Fade } from "react-reveal";
import { LanguageContext } from "../../LanguageContext";

export default function Educations(props) {
    const theme = props.theme;
    const { degrees } = props; // objekt med .degrees-array
    const { language } = useContext(LanguageContext);
    const headerText = language === "no" ? "Grader mottatt" : "Degrees Received";

    return (
        <div className="main" id="educations">
            <div className="educations-header-div">
                <Fade bottom duration={2000} distance="20px">
                    <h1 className="educations-header" style={{ color: theme.text }}>
                        {headerText}
                    </h1>
                </Fade>
            </div>
            <div className="educations-body-div">
                {degrees.degrees.map((degree) => (
                    <DegreeCard key={degree.title} degree={degree} theme={theme} />
                ))}
            </div>
        </div>
    );
}
