// src/components/githubRepoCard/GithubRepoCard.js
import React, { useState, useCallback, useEffect } from "react";
import "./GithubRepoCard.css";
import { Fade } from "react-reveal";
import { Icon } from "@iconify/react";

import Button from "../button/Button";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";

export default function GithubRepoCard({ repo, theme }) {
    // Åpne GitHub-repo i ny fane
    const openRepo = (url) => {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (win) win.focus();
    };

    // Klikk på kort (unntatt knappene)
    const handleCardClick = useCallback(
        (e) => {
            if (e.target.closest(".repo-btn-row")) return;
            openRepo(repo.url);
        },
        [repo.url]
    );

    // Modal state
    const [open, setOpen] = useState(false);

    // Lukk modal ved Escape-tast
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open]);

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

                    {repo.languages?.length > 0 && (
                        <ProjectLanguages logos={repo.languages} />
                    )}

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
                        {(repo.demoUrl || repo.demoImages?.length > 0) && (
                            <button
                                type="button"
                                className="main-button"
                                style={{
                                    backgroundColor: theme.headerColor,
                                    color: theme.text,
                                }}
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
                        {/* Lukkeknapp */}
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
                        ) : repo.demoImages && repo.demoImages.length > 0 ? (
                            <div className="modal-gallery">
                                {repo.demoImages.map((imgSrc, idx) => (
                                    <img
                                        key={idx}
                                        src={require(`../../assets/images/${imgSrc}`)}
                                        alt={`${repo.name} screenshot ${idx + 1}`}
                                        className="modal-gallery-img"
                                    />
                                ))}
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
