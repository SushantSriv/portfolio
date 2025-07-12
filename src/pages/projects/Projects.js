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
    const [selectedFilters, setSelectedFilters] = useState([]);

    // 1) Hent alle unike tags fra både languages og technologies
    const allFilters = useMemo(() => {
        const setFilters = new Set();
        ProjectsData.data.forEach((repo) => {
            if (repo.languages) {
                repo.languages.forEach((l) => setFilters.add(l.name));
            }
            if (repo.technologies) {
                repo.technologies.forEach((t) => setFilters.add(t));
            }
        });
        return Array.from(setFilters).sort();
    }, []);

    // 2) Slå av/på en tag
    const toggleFilter = (f) => {
        setSelectedFilters((curr) =>
            curr.includes(f) ? curr.filter((x) => x !== f) : [...curr, f]
        );
    };

    // 3) Filtrer repos: vis alle hvis ingen valgt, ellers sjekk om repo inneholder minst én av valgte tags
    const filteredRepos = useMemo(() => {
        if (selectedFilters.length === 0) return ProjectsData.data;
        return ProjectsData.data.filter((repo) => {
            const langs = repo.languages?.map((l) => l.name) || [];
            const techs = repo.technologies || [];
            return selectedFilters.some((f) => langs.includes(f) || techs.includes(f));
        });
    }, [selectedFilters]);

    const moreText = language === "no" ? "Flere prosjekter" : "More Projects";
    const filterTitle = language === "no" ? "Filtrer etter teknologi" : "Filter by technology";

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
                            <p className="projects-header-detail-text subTitle" style={{ color: theme.secondaryText }}>
                                {portfolio.projectsHeader.description}
                            </p>
                        </div>
                    </div>
                </Fade>
            </div>

            {/* Filter-piller */}
            <h3 className="filter-title" style={{ color: theme.text }}>
                {filterTitle}
            </h3>
            <div className="lang-filter-bar">
                {allFilters.map((f) => {
                    const active = selectedFilters.includes(f);
                    return (
                        <button
                            key={f}
                            className={`lang-pill ${active ? "active" : ""}`}
                            onClick={() => toggleFilter(f)}
                        >
                            {f} {active && <span className="pill-close">×</span>}
                        </button>
                    );
                })}
            </div>

            {/* Repo-kort */}
            <div className="repo-cards-div-main">
                {filteredRepos.map((repo) => (
                    <GithubRepoCard key={repo.id} repo={repo} theme={theme} />
                ))}
            </div>

            {/* “More Projects” */}
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
