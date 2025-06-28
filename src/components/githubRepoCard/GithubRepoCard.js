// src/components/githubRepoCard/GithubRepoCard.js
import React, { useState, useCallback } from "react";
import "./GithubRepoCard.css";
import { Fade } from "react-reveal";
import { Icon } from "@iconify/react";

import Button from "../button/Button";
import ProjectLanguages from "../projectLanguages/ProjectLanguages";

export default function GithubRepoCard({ repo, theme }) {
  /* Åpne GitHub-repo i ny fane */
  const openRepo = (url) => {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) win.focus();
  };

  /* Kortets klikk – blokker hvis vi trykker på knapperaden */
  const handleCardClick = useCallback(
    (e) => {
      if (e.target.closest(".repo-btn-row")) return;
      openRepo(repo.url);
    },
    [repo.url]
  );

  /* Modal‐state */
  const [open, setOpen] = useState(false);

  return (
    <div
      className="repo-card-div"
      style={{ backgroundColor: theme.highlight }}
      onClick={handleCardClick}
    >
      <Fade bottom duration={2000} distance="40px">
        <div>
          {/* ---------- Tittel & beskrivelse ---------- */}
          <h3 className="repo-name" style={{ color: theme.text }}>
            {repo.name}
          </h3>

          <p className="repo-description" style={{ color: theme.secondaryText }}>
            {repo.description}
          </p>

          {/* ---------- Språk/teknologi ---------- */}
          {repo.languages?.length > 0 && (
            <ProjectLanguages logos={repo.languages} />
          )}

          {/* ---------- Datakilde-ikoner ---------- */}
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

          {/* ---------- Knapp-rad ---------- */}
          <div className="repo-btn-row">
            {/* Code-knapp bruker fortsatt Button-komponenten (anker) */}
            <Button text="Code" href={repo.url} newTab theme={theme} />

            {/* Demo-knapp som vanlig <button> – ingen navigasjon */}
            {repo.demoUrl && (
              <button
              type="button"
              className="main-button"               // ← samme klasse som Code
              style={{                               // farger fra tema
                backgroundColor: theme.headerColor,
                color: theme.text,
              }}
              onClick={(e) => {
                e.stopPropagation();                 // hindrer bubbling til kortet
                setOpen(true);                       // åpner modal
              }}
            >
              Demo / Pics
            </button>
            )}
          </div>
        </div>
      </Fade>

      {/* ---------- Modal ---------- */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={repo.demoUrl}
              title="Demo video / gallery"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
