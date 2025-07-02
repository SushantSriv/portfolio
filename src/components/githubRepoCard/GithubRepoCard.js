// src/components/githubRepoCard/GithubRepoCard.js
import React, { useState, useCallback, useEffect } from "react";
import "./GithubRepoCard.css";
import { Fade } from "react-reveal";
import { Icon } from "@iconify/react";

import Button from "../button/Button";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";

export default function GithubRepoCard({ repo, theme }) {
    const openRepo = (url) => {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (win) win.focus();
    };

    const handleCardClick = useCallback(
        (e) => {
            if (e.target.closest(".repo-btn-row")) return;
            openRepo(repo.url);
        },
        [repo.url]
    );

    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset gallery index når modal åpnes
    useEffect(() => {
        if (open) setCurrentIndex(0);
    }, [open]);

    // Escape-tast
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" && open) setOpen(false);
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open]);

    const hasImages = repo.demoImages && repo.demoImages.length > 0;
    const imageCount = hasImages ? repo.demoImages.length : 0;

    const showPrev = () => {
        setCurrentIndex((i) => (i - 1 + imageCount) % imageCount);
    };
    const showNext = () => {
        setCurrentIndex((i) => (i + 1) % imageCount);
    };

    return (
        <div
            className="repo-card-div"
            style={{ backgroundColor: theme.highlight }}
            onClick={handleCardClick}
        >
            <Fade bottom duration={2000} distance="40px">
                <div>
                    <h3 className="repo-name" style={{ color: theme.text }}>
                        {repo.name}
                    </h3>
                    <p className="repo-description" style={{ color: theme.secondaryText }}>
                        {repo.description}
                    </p>
                    {repo.languages?.length > 0 && <ProjectLanguages logos={repo.languages} />}
                    {repo.dataSources?.length > 0 && (
                        <div className="repo-datas">
                            {repo.dataSources.map((src) =>
                                src.imageSrc ? (
                                    <img
                                        key={src.name}
                                        src={require(`../../assets/images/${src.imageSrc}`)}
                                        alt={src.name}
                                        className="repo-data-img"
                                    />
                                ) : (
                                    <Icon
                                        key={src.name}
                                        icon={src.iconifyClass}
                                        title={src.name}
                                        className="repo-data-icon"
                                        style={{ color: theme.text }}
                                    />
                                )
                            )}
                        </div>
                    )}

                    <div className="repo-btn-row">
                        <Button text="Code" href={repo.url} newTab theme={theme} />
                        {(repo.demoUrl || hasImages) && (
                            <button
                                type="button"
                                className="main-button"
                                style={{ backgroundColor: theme.headerColor, color: theme.text }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen(true);
                                }}
                            >
                                Demo / Pics
                            </button>
                        )}
                    </div>
                </div>
            </Fade>

            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Close-knapp */}
                        <button
                            className="modal-close-btn"
                            onClick={() => setOpen(false)}
                            aria-label="Close modal"
                        >
                            ×
                        </button>

                        {repo.demoUrl ? (
                            <iframe
                                src={repo.demoUrl}
                                title="Demo video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : hasImages ? (
                            <div className="modal-single-image-wrapper">
                                {imageCount > 1 && (
                                    <button className="modal-nav-btn modal-nav-prev" onClick={showPrev}>
                                        ‹
                                    </button>
                                )}
                                <img
                                    src={require(`../../assets/images/${repo.demoImages[currentIndex]}`)}
                                    alt={`${repo.name} screenshot ${currentIndex + 1}`}
                                    className="modal-single-image"
                                />
                                {imageCount > 1 && (
                                    <button className="modal-nav-btn modal-nav-next" onClick={showNext}>
                                        ›
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p style={{ color: theme.text }}>Ingen demo tilgjengelig</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
