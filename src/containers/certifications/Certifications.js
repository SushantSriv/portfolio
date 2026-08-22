import React, { useContext } from "react";
import "./Certifications.css";
import CertificationCard from "../../components/certificationCard/CertificationCard";
import AnimatedHeading from "../../components/motion/AnimatedHeading";
import { LanguageContext } from "../../LanguageContext";

export default function Certifications(props) {
  const theme = props.theme;
  const { certifications } = props; // objekt med .certifications-array
  const { language } = useContext(LanguageContext);
  const headerText = language === "no" ? "Sertifiseringer" : "Certifications";

  return (
    <div className="main" id="certs">
      <div className="certs-header-div">
        <AnimatedHeading
          as="h1"
          className="certs-header"
          text={headerText}
          gradientFrom={theme.text}
          gradientTo={theme.imageHighlight}
        />
      </div>
      <div className="certs-body-div">
        {certifications.certifications.map((cert, i) => (
          <CertificationCard
            key={cert.title}
            certificate={cert}
            theme={theme}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
