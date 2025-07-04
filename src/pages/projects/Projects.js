// src/pages/projects/Projects.js
import React, { useContext, useState, useMemo } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-reveal";
import ProjectsData from "../../shared/opensource/projects.json";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";
import { LanguageContext } from "../../LanguageContext";

export default function Projects(props) {
    const { theme, portfolio } = props;
    const { language } = useContext(LanguageContext);

    // track multiple selected languages
    const [selectedLangs, setSelectedLangs] = useState([]);

    // all unique languages
    const allLanguages = useMemo(() => {
        const langs = new Set();
        ProjectsData.data.forEach(repo =>
            repo.languages.forEach(l => langs.add(l.name))
        );
        return Array.from(langs).sort();
    }, []);

    // toggle a language on/off
    const toggleLang = lang => {
        setSelectedLangs(current => {
            if (current.includes(lang)) {
                return current.filter(l => l !== lang);
            }
            return [...current, lang];
        });
    };

    // filtered repos: if none selected, show all, else any-match
    const filteredRepos = useMemo(() => {
        if (selectedLangs.length === 0) return ProjectsData.data;
        return ProjectsData.data.filter(repo =>
            repo.languages.some(l => selectedLangs.includes(l.name))
        );
    }, [selectedLangs]);

    const moreText = language === "no" ? "Flere prosjekter" : "More Projects";

    return (
        <div className="projects-main">
            <Header theme={theme} />

            <div className="basic-projects">
                <Fade bottom duration={2000} distance="40px">
                    <div className="projects-heading-div">
                        <div className="projects-heading-img-div">
                            <ProjectsImg theme={theme} />
                        </div>
                        <div className="projects-heading-text-div">
                            <h1 className="projects-heading-text" style={{ color: theme.text }}>
                                {portfolio.projectsHeader.title}
                            </h1>
                            <p
                                className="projects-header-detail-text subTitle"
                                style={{ color: theme.secondaryText }}
                            >
                                {portfolio.projectsHeader.description}
                            </p>
                        </div>
                    </div>
                </Fade>
            </div>

            <h2 className="filter-title" style={{ color: theme.text }}>
                  Filter Projects by Technology
            </h2>
            {/* ====== MULTI-SELECT LANGUAGE FILTER ====== */}
            <div className="lang-filter-bar">
                <button
                    className={`lang-pill ${selectedLangs.length === 0 ? "active" : ""}`}
                    onClick={() => setSelectedLangs([])}
                >
                    All
                </button>
                {allLanguages.map(lang => {
                    const active = selectedLangs.includes(lang);
                    return (
                        <button
                            key={lang}
                            className={`lang-pill ${active ? "active" : ""}`}
                            onClick={() => toggleLang(lang)}
                        >
                            {lang}
                            {active && <span className="remove-icon">×</span>}
                        </button>
                    );
                })}
            </div>

            {/* ====== REPO CARDS ====== */}
            <div className="repo-cards-div-main">
                {filteredRepos.map(repo => (
                    <GithubRepoCard key={repo.id} repo={repo} theme={theme} />
                ))}
            </div>

            <div className="project-button-div">
                <Button
                    text={moreText}
                    className="project-button"
                    href={portfolio.greeting.githubProfile}
                    newTab={true}
                    theme={theme}
                />
            </div>

            <Footer theme={theme} />
            <TopButton theme={theme} />
        </div>
    );
}
