import React, { useContext } from "react";
import "./Certifications.css";
import { Fade } from "react-reveal";
import CertificationCard from "../../components/certificationCard/CertificationCard";
import { LanguageContext } from "../../LanguageContext";

export default function Certifications(props) {
    const theme = props.theme;
    const { certifications } = props; // objekt med .certifications-array
    const { language } = useContext(LanguageContext);
    const headerText = language === "no" ? "Sertifiseringer" : "Certifications";

    return (
        <div className="main" id="certs">
            <div className="certs-header-div">
                <Fade bottom duration={2000} distance="20px">
                    <h1 className="certs-header" style={{ color: theme.text }}>
                        {headerText}
                    </h1>
                </Fade>
            </div>
            <div className="certs-body-div">
                {certifications.certifications.map((cert) => (
                    <CertificationCard
                        key={cert.title}
                        certificate={cert}
                        theme={theme}
                    />
                ))}
            </div>
        </div>
    );
}
