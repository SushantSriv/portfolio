// src/components/header/Header.js

import React, { Component } from "react";
import "./Header.css";
import { Fade } from "react-reveal";
import { NavLink, Link } from "react-router-dom";
import { greeting, settings } from "../../portfolio.js";
import SeoHeader from "../seoHeader/SeoHeader";
import { LanguageContext } from "../../LanguageContext";

// Flaggbilder – plasser no.svg + gb.svg i src/assets/flags/
import noFlag from "../../assets/flags/no.png";
import gbFlag from "../../assets/flags/gb.png";

class Header extends Component {
    static contextType = LanguageContext;

    state = {
        langMenuOpen: false,
        showHint: true, // viser hint første gang
    };

    toggleLangMenu = () => {
        this.setState((s) => ({
            langMenuOpen: !s.langMenuOpen,
            showHint: false, // skjul hint etter første klikk
        }));
    };

    selectLang = (lang) => {
        if (lang !== this.context.language) {
            this.context.toggleLanguage();
        }
        this.setState({ langMenuOpen: false });
    };

    render() {
        const { language } = this.context;
        const theme = this.props.theme;
        const baseLink = settings.isSplash ? "/splash" : "/home";

        const menuItems = [
            { path: "/home", label: language === "no" ? "Hjem" : "Home" },
            { path: "/education", label: language === "no" ? "Utdanning" : "Education" },
            { path: "/experience", label: language === "no" ? "Erfaring" : "Experience" },
            { path: "/projects", label: language === "no" ? "Prosjekter" : "Projects" },
            { path: "/contact", label: language === "no" ? "Kontakt" : "Contact" },
        ];

        // Lokaliser hint-teksten
        const hintText =
            language === "no"
                ? "👆 Need to Change Language?"
                : "👆 Trykk her for å bytte språk?";

        return (
            <Fade top duration={1000} distance="20px">
                <SeoHeader />
                <header className="header">
                    {/* Logo */}
                    <NavLink to={baseLink} className="logo" tag={Link}>
                        <span style={{ color: theme.text }}>{"<"}</span>
                        <span className="logo-name" style={{ color: theme.text }}>
                            {greeting.logo_name}
                        </span>
                        <span style={{ color: theme.text }}>{"/>"}</span>
                    </NavLink>

                    {/* Hamburger‐trick for mobil */}
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn">
                        <span className="navicon"></span>
                    </label>

                    <ul className="menu" style={{ backgroundColor: theme.body }}>
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    tag={Link}
                                    activeStyle={{ fontWeight: "bold" }}
                                    style={{ color: theme.text }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = theme.highlight)}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}

                        <li className="lang-item">
                            {/* Vis hint før første klikk OG mens dropdown er åpen */}
                            {this.state.showHint && !this.state.langMenuOpen && (
                                <div
                                    className="lang-hint"
                                    style={{
                                        backgroundColor: theme.body,
                                        color: theme.text,
                                        border: `1px solid ${theme.text}`,
                                    }}
                                >
                                    {hintText}
                                </div>
                            )}

                            <button
                                className="lang-btn"
                                onClick={this.toggleLangMenu}
                                style={{ color: theme.text, borderColor: theme.text }}
                            >
                                <img
                                    src={language === "no" ? noFlag : gbFlag}
                                    alt={language === "no" ? "Norsk flagg" : "British flag"}
                                    className="flag-icon-img"
                                />
                                {language === "no" ? "Norsk" : "English"}
                                <span className="arrow">▾</span>
                            </button>

                            {this.state.langMenuOpen && (
                                <ul className="lang-dropdown" style={{ backgroundColor: theme.body }}>
                                    <li onClick={() => this.selectLang("en")}>
                                        <img src={gbFlag} alt="British flag" className="flag-icon-img" />
                                        English
                                    </li>
                                    <li onClick={() => this.selectLang("no")}>
                                        <img src={noFlag} alt="Norsk flagg" className="flag-icon-img" />
                                        Norsk
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </header>
            </Fade>
        );
    }
}

export default Header;
