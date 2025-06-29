import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const stored = localStorage.getItem("lang");
    const defaultLang = stored || (navigator.language.startsWith("no") ? "no" : "en");

    const [language, setLanguage] = useState(defaultLang);

    const toggleLanguage = () => {
        const newLang = language === "en" ? "no" : "en";
        setLanguage(newLang);
        localStorage.setItem("lang", newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
