import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import AddressImg from "./AddressImg";
import { Fade } from "react-reveal";
import "./ContactComponent.css";
import { LanguageContext } from "../../LanguageContext";

// Henter alle bilder i slideshow-mappen automatisk
function importAll(r) {
    return r.keys().map(r);
}
const slides = importAll(
    require.context(
        "../../assets/images/slideshow",
        false,
        /\.(png|jpe?g|svg)$/
    )
);

class Contact extends Component {
    static contextType = LanguageContext;

    constructor(props) {
        super(props);
        this.state = { currentSlide: 0 };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(({ currentSlide }) => ({
                currentSlide: (currentSlide + 1) % slides.length,
            }));
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { theme, portfolio } = this.props;
        const { language } = this.context;

        const greeting = portfolio.greeting;
        const contactSection = portfolio.contactPageData.contactSection;
        const addressSection = portfolio.contactPageData.addressSection;
        const phoneSection = portfolio.contactPageData.phoneSection;

        const resumeBtnText = language === "no" ? "Se min CV" : "See My Resume";
        const mapsBtnText = language === "no" ? "Åpne i Google Maps" : "Visit on Google Maps";

        const currentImage = slides[this.state.currentSlide];

        return (
            <div className="contact-main">
                <Header theme={theme} />

                <div className="basic-contact">
                    <Fade bottom duration={1000} distance="40px">
                        <div className="contact-heading-div">
                            <div className="contact-heading-text-div">
                                <h1 className="contact-heading-text" style={{ color: theme.text }}>
                                    {contactSection.title}
                                </h1>
                                <p className="contact-header-detail-text subTitle" style={{ color: theme.secondaryText }}>
                                    {contactSection.description}
                                </p>

                                <SocialMedia theme={theme} />

                                {/* Slideshow med smooth fade */}
                                <div className="profile-img-below-social">
                                    <Fade key={currentImage} duration={1000}>
                                        <img
                                            src={currentImage}
                                            alt={`Slide ${this.state.currentSlide + 1}`}
                                        />
                                    </Fade>
                                </div>

                                <div className="resume-btn-div">
                                    <Button
                                        text={resumeBtnText}
                                        newTab={true}
                                        href={greeting.resumeLink}
                                        theme={theme}
                                    />
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
                                <h1 className="address-heading-text" style={{ color: theme.text }}>
                                    {addressSection.title}
                                </h1>
                                <p className="contact-header-detail-text subTitle" style={{ color: theme.secondaryText }}>
                                    {addressSection.subtitle}
                                </p>

                                <h1 className="address-heading-text" style={{ color: theme.text }}>
                                    {phoneSection.title}
                                </h1>
                                <p className="contact-header-detail-text subTitle" style={{ color: theme.secondaryText }}>
                                    {phoneSection.subtitle}
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
