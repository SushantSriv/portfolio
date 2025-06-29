import React, { Component } from "react";
import "./Header.css";
import { Fade } from "react-reveal";
import { NavLink, Link } from "react-router-dom";
import { greeting, settings } from "../../portfolio.js";
import SeoHeader from "../seoHeader/SeoHeader";
import { LanguageContext } from "../../LanguageContext";


class Header extends Component {
    static contextType = LanguageContext;

    render() {
        const { language, toggleLanguage } = this.context;
        const theme = this.props.theme;
        const link = settings.isSplash ? "/splash" : "home";

        return (
            <Fade top duration={1000} distance="20px">
                <SeoHeader />
                <div>
                    <header className="header">
                        <NavLink to={link} tag={Link} className="logo">
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
                            {[
                                { path: "/home", label: language === "no" ? "Hjem" : "Home" },
                                {
                                    path: "/education",
                                    label: language === "no" ? "Utdanning" : "Education",
                                },
                                {
                                    path: "/experience",
                                    label: language === "no" ? "Erfaring" : "Experience",
                                },
                                {
                                    path: "/projects",
                                    label: language === "no" ? "Prosjekter" : "Projects",
                                },
                                {
                                    path: "/contact",
                                    label: language === "no" ? "Kontakt" : "Contact Me",
                                },
                            ].map((item) => (
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

                            <li>
                                <button
                                    onClick={toggleLanguage}
                                    style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        color: theme.text,
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        marginLeft: "1rem",
                                    }}
                                >
                                    {language === "no" ? "🇳🇴 Norsk" : "🇬🇧 English"}
                                </button>
                            </li>
                        </ul>
                    </header>
                </div>
            </Fade>
        );
    }
}

export default Header;
