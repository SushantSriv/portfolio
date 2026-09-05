import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { greeting } from "../../portfolio.js";
import { LanguageContext } from "../../LanguageContext";
import SocialMedia from "../socialMedia/SocialMedia";
import Reveal from "../motion/Reveal";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  const { language } = useContext(LanguageContext);
  const theme = props.theme;
  const no = language === "no";

  const links = [
    { path: "/home", label: no ? "Hjem" : "Home" },
    { path: "/education", label: no ? "Utdanning" : "Education" },
    { path: "/experience", label: no ? "Erfaring" : "Experience" },
    { path: "/projects", label: no ? "Prosjekter" : "Projects" },
    { path: "/contact", label: no ? "Kontakt" : "Contact" },
  ];

  return (
    <footer className="footer-div">
      <Reveal>
        <div
          className="footer-inner"
          style={{ borderTopColor: `${theme.imageHighlight}33` }}
        >
          <div className="footer-brand">
            <p className="footer-name" style={{ color: theme.text }}>
              {greeting.title}
            </p>
            <p
              className="footer-tagline"
              style={{ color: theme.secondaryText }}
            >
              {no
                ? "Programvareingeniør — Drammen, Norge"
                : "Software Engineer — Drammen, Norway"}
            </p>
          </div>

          <nav className="footer-nav" aria-label={no ? "Bunntekst" : "Footer"}>
            {links.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                className="footer-link"
                style={{ color: theme.secondaryText }}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="footer-social">
            <SocialMedia theme={theme} />
          </div>
        </div>

        <p className="footer-text" style={{ color: theme.secondaryText }}>
          {no ? "Laget med" : "Made with"} <span role="img">❤️</span>{" "}
          {no ? "av" : "by"} {greeting.title} · © {new Date().getFullYear()}
        </p>
      </Reveal>
    </footer>
  );
}
