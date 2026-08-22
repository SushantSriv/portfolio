import React, { Component } from "react";
import "./CertificationCard.css";
import Tilt from "react-parallax-tilt";
import { getGlassStyle } from "../../styles/glassStyle";
import Reveal from "../motion/Reveal";

class CertificationCard extends Component {
  render() {
    const certificate = this.props.certificate;
    const theme = this.props.theme;
    const index = this.props.index || 0;
    return (
      <Reveal
        className="cert-card-reveal"
        direction="up"
        duration={0.65}
        // Modulo the column count so a long list still ripples per row
        // instead of the last cards waiting seconds to appear.
        delay={(index % 3) * 0.09}
      >
        <Tilt
          className="cert-card"
          style={getGlassStyle(theme)}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          glareEnable={true}
          glareMaxOpacity={0.25}
          glareColor={theme.highlight}
          glarePosition="all"
          transitionSpeed={1500}
        >
          <div className="content">
            <a
              href={certificate.certificate_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="content-overlay"></div>
              <div
                className="cert-header"
                style={{ backgroundColor: certificate.color_code }}
              >
                <img
                  className="logo_img"
                  src={require(`../../assets/images/${certificate.logo_path}`)}
                  alt={certificate.alt_name}
                />
              </div>
              <div className="content-details fadeIn-top">
                <h3 className="content-title" style={{ color: theme.body }}>
                  Certificate
                </h3>
              </div>
            </a>
          </div>
          <div className="cert-body">
            <h2 className="cert-body-title" style={{ color: theme.text }}>
              {certificate.title}
            </h2>
            <h3
              className="cert-body-subtitle"
              style={{ color: theme.secondaryText }}
            >
              {certificate.subtitle}
            </h3>
          </div>
        </Tilt>
      </Reveal>
    );
  }
}

export default CertificationCard;
