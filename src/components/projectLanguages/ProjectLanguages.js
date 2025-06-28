// ProjectLanguages.js  – ny, funksjonell versjon
import React from "react";
import "./ProjectLanguages.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "@iconify/react";

export default function ProjectLanguages({ logos }) {
  return (
    <div className="software-skills-main-div">
      <ul className="dev-icons-languages">
        {logos.map((logo) => (
          <OverlayTrigger
            key={logo.name}
            placement="top"
            overlay={
              <Tooltip id={`tooltip-${logo.name}`}>{logo.name}</Tooltip>
            }
          >
            <li className="software-skill-inline-languages">
              <Icon
                icon={logo.iconifyClass}
                color={logo.color || "inherit"}
                width="24"
                height="24"
              />
            </li>
          </OverlayTrigger>
        ))}
      </ul>
    </div>
  );
}
