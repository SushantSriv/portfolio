import React, { useContext } from "react";
import "./Greeting.css";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { Fade } from "react-reveal";
import Hero3D from "../../components/hero3d/Hero3D";
import { LanguageContext } from "../../LanguageContext";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const heroEase = [0.22, 1, 0.36, 1];

const heroContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: heroEase },
  },
};

export default function Greeting(props) {
  const theme = props.theme;
  const greeting = props.greeting;
  const { language } = useContext(LanguageContext);
  const reduced = usePrefersReducedMotion();

  const { scrollY } = useViewportScroll();
  // The text and the 3D column drift apart as you scroll, which reads as
  // depth. The canvas moves further because it's the "closer" layer.
  const textY = useTransform(scrollY, [0, 700], [0, 70]);
  const artY = useTransform(scrollY, [0, 700], [0, 130]);
  const heroOpacity = useTransform(scrollY, [0, 620], [1, 0.15]);

  const parallax = reduced ? {} : { y: textY, opacity: heroOpacity };
  const artParallax = reduced ? {} : { y: artY, opacity: heroOpacity };

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
          "--hero-base": theme.dark,
          "--aurora-1": theme.imageHighlight,
          "--aurora-2": theme.jacketColor,
          "--aurora-3": theme.highlight,
        }}
      >
        <div className="greeting-main">
          <motion.div className="greeting-text-div" style={parallax}>
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                variants={heroItemVariants}
                className="greeting-text"
                style={{
                  backgroundImage: `linear-gradient(115deg, #FFFFFF 0%, ${theme.highlight} 30%, #FFFFFF 50%, ${theme.highlight} 70%, #FFFFFF 100%)`,
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
                  text={starText}
                  newTab={true}
                  href={greeting.portfolio_repository}
                  theme={theme}
                  className="portfolio-repo-btn"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="greeting-image-div" style={artParallax}>
            <Hero3D theme={theme} />
          </motion.div>
        </div>
      </div>
    </Fade>
  );
}
