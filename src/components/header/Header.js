// src/components/header/Header.js

import React, { Component } from "react";
import "./Header.css";
import { Fade } from "react-reveal";
import { NavLink, Link } from "react-router-dom";
import { greeting, settings } from "../../portfolio.js";
import SeoHeader from "../seoHeader/SeoHeader";
import { LanguageContext } from "../../LanguageContext";

class Header extends Component {
    static contextType = LanguageContext;

    state = { langMenuOpen: false };

    toggleLangMenu = () => {
        this.setState((s) => ({ langMenuOpen: !s.langMenuOpen }));
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
        const link = settings.isSplash ? "/splash" : "/home";

        const menuItems = [
            { path: "/home", label: language === "no" ? "Hjem" : "Home" },
            { path: "/education", label: language === "no" ? "Utdanning" : "Education" },
            { path: "/experience", label: language === "no" ? "Erfaring" : "Experience" },
            { path: "/projects", label: language === "no" ? "Prosjekter" : "Projects" },
            { path: "/contact", label: language === "no" ? "Kontakt" : "Contact" },
        ];

        return (
            <Fade top duration={1000} distance="20px">
                <SeoHeader />
                <header className="header">
                    <NavLink to={link} className="logo" tag={Link}>
                        <span style={{ color: theme.text }}> &lt;</span>
                        <span className="logo-name" style={{ color: theme.text }}>
                            {greeting.logo_name}
                        </span>
                        <span style={{ color: theme.text }}>/&gt;</span>
                    </NavLink>

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
                                    onMouseEnter={(e) =>
                                        (e.target.style.backgroundColor = theme.highlight)
                                    }
                                    onMouseOut={(e) =>
                                        (e.target.style.backgroundColor = "transparent")
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}

                        {/* Språk‐velger */}
                        <li className="lang-item">
                            <button
                                className="lang-btn"
                                onClick={this.toggleLangMenu}
                                style={{ color: theme.text, borderColor: theme.text }}
                            >
                                {/* Wrappet emoji i span med role og aria-label */}
                                {language === "no" ? (
                                    <>
                                        <span role="img" aria-label="Norwegian flag" className="flag">
                                            🇳🇴
                                        </span>{" "}
                                        Norsk
                                    </>
                                ) : (
                                    <>
                                        <span role="img" aria-label="British flag" className="flag">
                                            🇬🇧
                                        </span>{" "}
                                        English
                                    </>
                                )}
                                <span className="arrow">▾</span>
                            </button>

                            {this.state.langMenuOpen && (
                                <ul className="lang-dropdown" style={{ backgroundColor: theme.body }}>
                                    <li onClick={() => this.selectLang("en")}>
                                        <span role="img" aria-label="British flag" className="flag">
                                            🇬🇧
                                        </span>{" "}
                                        English
                                    </li>
                                    <li onClick={() => this.selectLang("no")}>
                                        <span role="img" aria-label="Norwegian flag" className="flag">
                                            🇳🇴
                                        </span>{" "}
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
