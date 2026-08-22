import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import ContactForm from "../../components/contactForm/ContactForm";
import AddressImg from "./AddressImg";
import { Fade } from "react-reveal";
import "./ContactComponent.css";
import { LanguageContext } from "../../LanguageContext";
import AnimatedHeading from "../../components/motion/AnimatedHeading";

class Contact extends Component {
  static contextType = LanguageContext;

  render() {
    const { theme, portfolio } = this.props;
    const { language } = this.context;

    const greeting = portfolio.greeting;
    const contactSection = portfolio.contactPageData.contactSection;
    const addressSection = portfolio.contactPageData.addressSection;

    const resumeBtnText = language === "no" ? "Se min CV" : "See My Resume";
    const mapsBtnText =
      language === "no" ? "Åpne i Google Maps" : "Visit on Google Maps";

    return (
      <div className="contact-main">
        <Header theme={theme} />

        <div className="basic-contact">
          <Fade bottom duration={1000} distance="40px">
            <div className="contact-heading-div">
              <div className="contact-heading-text-div">
                <AnimatedHeading
                  as="h1"
                  className="contact-heading-text"
                  text={contactSection.title}
                  gradientFrom={theme.text}
                  gradientTo={theme.imageHighlight}
                />
                <p
                  className="contact-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {contactSection.description}
                </p>

                <SocialMedia theme={theme} />

                <div className="resume-btn-div">
                  <Button
                    text={resumeBtnText}
                    newTab={true}
                    href={greeting.resumeLink}
                    theme={theme}
                  />
                  <ContactForm theme={theme} language={language} />
                </div>
              </div>
            </div>
          </Fade>

          <Fade bottom duration={1000} distance="40px">
            <div className="address-heading-div">
              <div className="contact-heading-img-div">
                <AddressImg theme={theme} />
              </div>
              <div className="address-heading-text-div">
                <AnimatedHeading
                  as="h1"
                  className="address-heading-text"
                  text={addressSection.title}
                  gradientFrom={theme.text}
                  gradientTo={theme.imageHighlight}
                />
                <p
                  className="contact-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {addressSection.subtitle}
                </p>

                <div className="address-btn-div">
                  <Button
                    text={mapsBtnText}
                    newTab={true}
                    href={addressSection.location_map_link}
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </Fade>
        </div>

        <Footer theme={theme} />
        <TopButton theme={theme} />
      </div>
    );
  }
}

export default Contact;
