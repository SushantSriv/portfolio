import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../portfolio";
import styled from "styled-components";
import { Icon } from "@iconify/react"; 

const IconWrapper = styled.span`
  /* Felles bakgrunn på IKONET – gjelder nå både <i> OG <svg> */
  i,
  svg {
    background-color: ${(props) => props.backgroundColor};
    width: 40px;              /* samme sirkel-diameter som før */
    height: 40px;
    border-radius: 50%;
    display: flex;            /* sentrer glyphet */
    align-items: center;
    justify-content: center;
    color: #fff;              /* hvit logo-farge */
    font-size: 20px;          /* trengs for <i>, har ingen effekt på <svg> */
    line-height: 0;           /* fjerner tekst-baseline-skjevhet */
  }

  /* Hover-effekt på begge ikon-typer */
  &:hover i,
  &:hover svg {
    background-color: ${({ theme }) => theme.text};
    transition: 0.3s ease-in;
    transform: scale(1.15);   /* lett zoom */
  }
`;

export default function SocialMedia(props) {
  return (
    <div className="social-media-div">
      {socialMediaLinks.map((media, i) => (
        <a
          key={i}
          href={media.link}
          className="icon-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWrapper {...media} {...props}>
            {media.iconifyClassname ? (
              <Icon icon={media.iconifyClassname} aria-hidden />
            ) : (
              <i className={`fab ${media.fontAwesomeIcon}`} aria-hidden="true" />
            )}
          </IconWrapper>
        </a>
      ))}
    </div>
  );
}