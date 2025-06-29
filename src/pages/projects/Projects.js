// src/pages/projects/Projects.js

import React, { useContext } from "react";
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

    // Hent overskriftstekst og beskrivelse fra portfolio
    const header = portfolio.projectsHeader;
    const greeting = portfolio.greeting;

    // Knappetekst basert på valgt språk
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
                                {header.title}
                            </h1>
                            <p
                                className="projects-header-detail-text subTitle"
                                style={{ color: theme.secondaryText }}
                            >
                                {header.description}
                            </p>
                        </div>
                    </div>
                </Fade>
            </div>

            <div className="repo-cards-div-main">
                {ProjectsData.data.map((repo) => (
                    <GithubRepoCard key={repo.id} repo={repo} theme={theme} />
                ))}
            </div>

            <div className="project-button-div">
                <Button
                    text={moreText}
                    className="project-button"
                    href={greeting.githubProfile}
                    newTab={true}
                    theme={theme}
                />
            </div>

            <Footer theme={theme} />
            <TopButton theme={theme} />
        </div>
    );
}
