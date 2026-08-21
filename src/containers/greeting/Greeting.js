import React, { useContext } from "react";
import "./Greeting.css";
import { motion } from "framer-motion";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { Fade } from "react-reveal";
import Hero3D from "../../components/hero3d/Hero3D";
import { LanguageContext } from "../../LanguageContext"; // ✨ NY

const heroEase = [0.645, 0.045, 0.355, 1];

const heroContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: heroEase } },
};

export default function Greeting(props) {
  const theme = props.theme;
  const greeting = props.greeting;
  const { language } = useContext(LanguageContext); // ✨ NY

  // Tekst for knappen på begge språk
  const starText =
    language === "no"
      ? "⭐ Gi meg en stjerne på GitHub"
      : "⭐ Star Me On Github";

  return (
    <Fade bottom duration={2000} distance="40px">
      <div
        className="greet-main"
        id="greeting"
        style={{
          "--aurora-1": theme.highlight,
          "--aurora-2": theme.imageHighlight,
          "--aurora-3": theme.jacketColor,
        }}
      >
        <div className="greeting-main">
          <div className="greeting-text-div">
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                variants={heroItemVariants}
                className="greeting-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, #FFFFFF, ${theme.highlight})`,
                }}
              >
                {greeting.title}
              </motion.h1>
              {greeting.nickname && (
                <motion.h2
                  variants={heroItemVariants}
                  className="greeting-nickname"
                  style={{ color: "rgba(255, 255, 255, 0.92)" }}
                >
                  ( {greeting.nickname} )
                </motion.h2>
              )}

              <motion.p
                variants={heroItemVariants}
                className="greeting-text-p subTitle"
                style={{ color: "rgba(255, 255, 255, 0.82)" }}
              >
                {greeting.subTitle}
              </motion.p>

              <motion.div variants={heroItemVariants}>
                <SocialMedia theme={theme} />
              </motion.div>

              <motion.div
                variants={heroItemVariants}
                className="portfolio-repo-btn-div"
              >
                <Button
                  text={starText} // 👈 BRUKER variabelen
                  newTab={true}
                  href={greeting.portfolio_repository}
                  theme={theme}
                  className="portfolio-repo-btn"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="greeting-image-div">
            <Hero3D theme={theme} />
          </div>
        </div>
      </div>
    </Fade>
  );
}
