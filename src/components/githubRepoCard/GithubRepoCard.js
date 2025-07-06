// src/components/githubRepoCard/GithubRepoCard.js
import React, { useState, useCallback, useEffect } from "react";
import "./GithubRepoCard.css";
import { Fade } from "react-reveal";
import { Icon } from "@iconify/react";

import Button from "../button/Button";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";

export default function GithubRepoCard({ repo, theme }) {
    /* ---------- kort-klikk ---------- */
    const openRepo = (url) => {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (win) win.focus();
    };
    const handleCardClick = useCallback(
        (e) => {
            if (e.target.closest(".repo-btn-row")) return; // unngå knapper
            openRepo(repo.url);
        },
        [repo.url]
    );

    /* ---------- modal-state ---------- */
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);
    useEffect(() => { if (open) setIdx(0); }, [open]);

    useEffect(() => {
        const esc = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", esc);
        return () => document.removeEventListener("keydown", esc);
    }, []);

    /* ---------- demo-kilder ---------- */
    const hasVideo = !!repo.demoUrl;
    const hasImgs = repo.demoImages?.length;
    const hasPdfs = repo.demoPdfs?.length;

    /* ---------- galleri ---------- */
    const gallery = hasImgs ? repo.demoImages : hasPdfs ? repo.demoPdfs : [];
    const count = gallery.length;
    const prev = () => setIdx((i) => (i - 1 + count) % count);
    const next = () => setIdx((i) => (i + 1) % count);

    /* ---------- konverter GitHub-blob → RAW ---------- */
    const toRaw = (url) => {
        // https://github.com/user/repo/blob/branch/path/fil.pdf
        if (url.includes("github.com") && url.includes("/blob/")) {
            const [repoPart, filePart] = url.split("github.com/")[1].split("/blob/");
            return `https://raw.githubusercontent.com/${repoPart}/${filePart}`;
        }
        return url;
    };
    const resolved = hasPdfs ? gallery.map(toRaw) : gallery;

    /* ---------- render ---------- */
    return (
        <div
            className="repo-card-div"
            style={{ backgroundColor: theme.highlight }}
            onClick={handleCardClick}
        >
            <Fade bottom duration={2000} distance="40px">
                <div>
                    {/* Tittel & beskrivelse */}
                    <h3 className="repo-name" style={{ color: theme.text }}>
                        {repo.name}
                    </h3>
                    <p className="repo-description" style={{ color: theme.secondaryText }}>
                        {repo.description}
                    </p>

                    {/* Teknologier */}
                    {repo.languages?.length > 0 && (
                        <ProjectLanguages logos={repo.languages} />
                    )}

                    {/* Datasource-ikoner */}
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

                    {/* Knapper */}
                    <div className="repo-btn-row">
                        <Button text="Code" href={repo.url} newTab theme={theme} />

                        {(hasVideo || hasImgs || hasPdfs) && (
                            <button
                                type="button"
                                className="main-button demo-btn"
                                style={{ backgroundColor: theme.headerColor, color: theme.text }}
                                onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                            >
                                {hasVideo && <Icon icon="simple-icons:youtube" className="btn-icon" color="#FF0000" />}
                                {hasImgs && <Icon icon="mdi:image-multiple" className="btn-icon" />}
                                {hasPdfs && <Icon icon="mdi:file-pdf-box" className="btn-icon" />}
                                Demo
                            </button>
                        )}
                    </div>
                </div>
            </Fade>

            {/* Modal */}
            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setOpen(false)}>
                            ×
                        </button>

                        {hasVideo ? (
                            <iframe
                                src={repo.demoUrl}
                                title="Demo video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : hasImgs ? (
                            <div className="modal-single-image-wrapper">
                                {count > 1 && (
                                    <button className="modal-nav-btn modal-nav-prev" onClick={prev}>
                                        ‹
                                    </button>
                                )}
                                <img
                                    src={require(`../../assets/images/${resolved[idx]}`)}
                                    alt={`${repo.name} screenshot ${idx + 1}`}
                                    className="modal-single-image"
                                />
                                {count > 1 && (
                                    <button className="modal-nav-btn modal-nav-next" onClick={next}>
                                        ›
                                    </button>
                                )}
                            </div>
                        ) : hasPdfs ? (
                            <div className="modal-single-image-wrapper">
                                {count > 1 && (
                                    <button className="modal-nav-btn modal-nav-prev" onClick={prev}>
                                        ‹
                                    </button>
                                )}
                                <iframe
                                    className="modal-pdf-iframe"
                                    title={`${repo.name}-PDF ${idx + 1}`}
                                    src={`https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(
                                        resolved[idx]
                                    )}`}
                                />
                                {count > 1 && (
                                    <button className="modal-nav-btn modal-nav-next" onClick={next}>
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
