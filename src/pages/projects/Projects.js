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
    const [selectedLangs, setSelectedLangs] = useState([]);

    // 1. Gather all unique languages from your JSON
    const allLanguages = useMemo(() => {
        const langs = new Set();
        ProjectsData.data.forEach(repo =>
            repo.languages.forEach(l => langs.add(l.name))
        );
        return Array.from(langs).sort();
    }, []);

    // 2. Toggle a language on/off
    const toggleLang = lang => {
        setSelectedLangs(curr =>
            curr.includes(lang)
                ? curr.filter(l => l !== lang)
                : [...curr, lang]
        );
    };

    // 3. Filter repos by ANY selected language
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
                            <h1
                                className="projects-heading-text"
                                style={{ color: theme.text }}
                            >
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

            {/* Filter heading */}
            <h3 className="filter-title" style={{ color: theme.text }}>
                {language === "no" ? "Filtrer etter teknologi" : "Filter by technology"}
            </h3>

            {/* Language pills */}
            <div className="lang-filter-bar">
                {allLanguages.map(lang => {
                    const active = selectedLangs.includes(lang);
                    return (
                        <button
                            key={lang}
                            className={`lang-pill ${active ? "active" : ""}`}
                            onClick={() => toggleLang(lang)}
                        >
                            {lang} {active && <span className="pill-close">×</span>}
                        </button>
                    );
                })}
            </div>

            {/* Repo cards */}
            <div className="repo-cards-div-main">
                {filteredRepos.map(repo => (
                    <GithubRepoCard key={repo.id} repo={repo} theme={theme} />
                ))}
            </div>

            {/* “More Projects” button */}
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
