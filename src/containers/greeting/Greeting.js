import React, { useContext } from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { Fade } from "react-reveal";
import FeelingProud from "./FeelingProud";
import { LanguageContext } from "../../LanguageContext";           // ✨ NY

export default function Greeting(props) {
    const theme = props.theme;
    const greeting = props.greeting;
    const { language } = useContext(LanguageContext);               // ✨ NY

    // Tekst for knappen på begge språk
    const starText =
        language === "no" ? "⭐ Gi meg en stjerne på GitHub" : "⭐ Star Me On Github";

    return (
        <Fade bottom duration={2000} distance="40px">
            <div className="greet-main" id="greeting">
                <div className="greeting-main">
                    <div className="greeting-text-div">
                        <div>
                            <h1 className="greeting-text" style={{ color: theme.text }}>
                                {greeting.title}
                            </h1>
                            {greeting.nickname && (
                                <h2 className="greeting-nickname" style={{ color: theme.text }}>
                                    ( {greeting.nickname} )
                                </h2>
                            )}

                            <p
                                className="greeting-text-p subTitle"
                                style={{ color: theme.secondaryText }}
                            >
                                {greeting.subTitle}
                            </p>

                            <SocialMedia theme={theme} />

                            <div className="portfolio-repo-btn-div">
                                <Button
                                    text={starText}                                    // 👈 BRUKER variabelen
                                    newTab={true}
                                    href={greeting.portfolio_repository}
                                    theme={theme}
                                    className="portfolio-repo-btn"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="greeting-image-div">
                        <FeelingProud theme={theme} />
                    </div>
                </div>
            </div>
        </Fade>
    );
}
