/* Endre denne filen for å oppdatere din personlige portefølje (norsk) */

/* ---------- Nettsted-innstillinger ---------- */
const settings = {
    isSplash: false, // Sett til true hvis du vil vise en splash-skjerm først
};

/* ---------- SEO-innstillinger ---------- */
const seo = {
    title: "Sushants portefølje",
    description:
        "Engasjert i å utvikle helhetlige, skalerbare løsninger som skaper varig sosial og teknisk verdi.",
    og: {
        title: "Sushants portefølje",
        type: "website",
        url: "https://sushant.com",
    },
};

/* ---------- Hjem-seksjon ---------- */
const greeting = {
    title: "Sushant Srivastava",
    logo_name: "SushantSrivastava",
    nickname: "Sush",
    subTitle:
        "Engasjert i å utvikle helhetlige, skalerbare løsninger som skaper varig sosial og teknisk verdi",
    resumeLink:
        "https://drive.google.com/file/d/1FDMdD7ZWnxxl7uZlotW_HI_xY2LFJvp5/view?usp=sharing",
    portfolio_repository: "https://github.com/SushantSriv",
    githubProfile: "https://github.com/SushantSriv",
};

/* ---------- Sosiale medier ---------- */
const socialMediaLinks = [
    {
        name: "Github",
        link: "https://github.com/SushantSriv",
        fontAwesomeIcon: "fa-github",
        backgroundColor: "#181717",
    },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/sushant-srivastava-b72331219/",
        fontAwesomeIcon: "fa-linkedin-in",
        backgroundColor: "#0077B5",
    },
    {
        name: "YouTube",
        link: "https://www.youtube.com/@CodeCraftbySushant",
        fontAwesomeIcon: "fa-youtube",
        backgroundColor: "#FF0000",
    },
    {
        name: "Gmail",
        link: "mailto:sushantsrivastava198@gmail.com",
        fontAwesomeIcon: "fa-google",
        backgroundColor: "#D14836",
    },
    {
        name: "X-Twitter",
        link: "",
        fontAwesomeIcon: "fa-x-twitter",
        backgroundColor: "#000000",
    },
    {
        name: "Facebook",
        link: "",
        fontAwesomeIcon: "fa-facebook-f",
        backgroundColor: "#1877F2",
    },
    {
        name: "Instagram",
        link: "",
        fontAwesomeIcon: "fa-instagram",
        backgroundColor: "#E4405F",
    },
    {
        name: "CodeChef",
        link: "https://www.codechef.com/users/sushant_sri",
        iconifyClassname: "simple-icons:codechef",
        backgroundColor: "#5B4638",
    },
    {
        name: "Kaggle",
        link: "https://www.kaggle.com/sushant198",
        fontAwesomeIcon: "fa-kaggle",
        backgroundColor: "#20BEFF",
    },
    {
        name: "Hugging Face",
        link: "https://huggingface.co/Sushant198",
        iconifyClassname: "simple-icons:huggingface", // Reference https://simpleicons.org/icons/huggingface
        backgroundColor: "#1099D7",
    },
];

/* ---------- Ferdigheter ---------- */
const skills = {
    data: [
        {
            title: "AI-applikasjoner og Data Science",
            fileName: "DataScienceImg",
            skills: [
                "⚡ Brukt AI med åpne LLM-er, Whisper ASR og transformer-pipelines",
                "⚡ Prediktiv modellering og tidsserieanalyse med scikit-learn og statsmodels",
                "⚡ AI-drevne dashbord og historiefortelling (Power BI, Streamlit, Notebooks)",
                "⚡ Kjent med agentiske AI-mønstre og utforsker Semantic Kernel for orkestrering",
                "⚡ Eksempelkode: `norwegian-pronunciation-coach`, `electricity-forecast-xgboost`"
            ],
            softwareSkills: [
                { skillName: "Python", fontAwesomeClassname: "logos:python" },
                { skillName: "scikit‑learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" } },
                { skillName: "PyTorch", fontAwesomeClassname: "logos:pytorch" },
                { skillName: "Power BI", fontAwesomeClassname: "simple-icons:powerbi", style: { color: "#F2C811" } },
                { skillName: "Streamlit", fontAwesomeClassname: "simple-icons:streamlit", style: { color: "#FF4B4B" } }
            ]
        },
        {
            title: "MLOps, API-er og Azure-integrasjon",
            fileName: "CloudInfraImg",
            skills: [
                "⚡ Pakking og drift av ML-modeller med FastAPI, Docker og CI/CD-pipelines",
                "⚡ Azure-erfaring: Blob Storage, Container Registry, App Services, Functions",
                "⚡ Designet data lakes med AWS S3, Glue og Athena (sideprosjekter)",
                "⚡ Infrastruktur som kode med Bicep og Terraform for reproduserbare miljøer",
                "⚡ Bygget og distribuert GenAI-demoprosjekter — utforsker styring gjennom GenAI Ops-mønstre"
            ],
            softwareSkills: [
                { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" } },
                { skillName: "Azure", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0089D6" } },
                { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#1488C6" } },
                { skillName: "GitHub Actions", fontAwesomeClassname: "simple-icons:githubactions", style: { color: "#2088FF" } },
                { skillName: "Terraform", fontAwesomeClassname: "simple-icons:terraform", style: { color: "#844FBA" } }
            ]
        },
        {
            title: "Fullstack-utvikling og Dashboards",
            fileName: "FullStackImg",
            skills: [
                "⚡ Skybaserte dashbord bygget med React + Vite for sanntidsvisning av ML-resultater",
                "⚡ Kartvisualiseringer (Leaflet, Mapbox) for geospatiale risikovurderinger",
                "⚡ Utviklet API-er, frontend-logikk og containerisert leveranse (FastAPI + React)",
                "⚡ Erfaring med å jobbe tett med interne kunder (Aibel, Bosch) for å designe og levere Proof-of-Concept-løsninger"
            ],
            softwareSkills: [
                { skillName: "React", fontAwesomeClassname: "simple-icons:react" },
                { skillName: "Vite", fontAwesomeClassname: "simple-icons:vite", style: { color: "#646CFF" } },
                { skillName: "JavaScript", fontAwesomeClassname: "simple-icons:javascript", style: { color: "#F7DF1E" } },
                { skillName: "Leaflet", fontAwesomeClassname: "simple-icons:leaflet", style: { color: "#199900" } },
                { skillName: "Node.js", fontAwesomeClassname: "simple-icons:nodedotjs", style: { color: "#339933" } }
            ]
        },
        {
            title: "Skrivebordsverktøy og .NET-automatisering",
            fileName: "DesignImg",
            skills: [
                "⚡ Utvikling av interne skrivebordsapplikasjoner og automatiseringsverktøy i C# og .NET (WPF/WinForms)",
                "⚡ Samarbeid med designingeniører og interne kunder for å effektivisere arbeidsflyter",
                "⚡ Utvikling av brukervennlige grensesnitt med DevExpress og PowerShell-skripting"
            ],
            softwareSkills: [
                { skillName: "C#", fontAwesomeClassname: "simple-icons:csharp", style: { color: "#239120" } },
                { skillName: ".NET", fontAwesomeClassname: "simple-icons:dotnet", style: { color: "#512BD4" } },
                { skillName: "WPF", fontAwesomeClassname: "simple-icons:microsoft", style: { color: "#5E5E5E" } },
                { skillName: "DevExpress", fontAwesomeClassname: "simple-icons:devexpress", style: { color: "#FF7203" } },
                { skillName: "PowerShell", fontAwesomeClassname: "simple-icons:powershell", style: { color: "#5391FE" } }
            ]
        }
    ]
};


/* ---------- Konkurransesider ---------- */
const competitiveSites = {
    competitiveSites: [
        {
            siteName: "CodeChef",
            iconifyClassname: "simple-icons:codechef",
            style: { color: "#5B4638" },
            profileLink: "https://www.codechef.com/users/sushant_sri",
        },
        {
            siteName: "Codeforces",
            iconifyClassname: "simple-icons:codeforces",
            style: { color: "#1F8ACB" },
            profileLink: "https://codeforces.com/profile/sushantsrivastava1996",
        },
        {
            siteName: "Kaggle",
            iconifyClassname: "simple-icons:kaggle",
            style: { color: "#20BEFF" },
            profileLink: "https://www.kaggle.com/sushant198",
        },
        {
            siteName: "GitHub",
            iconifyClassname: "simple-icons:github",
            style: { color: "#181717" },
            profileLink: "https://github.com/SushantSriv",
        },
    ],
};

/* ---------- Utdanning ---------- */
const degrees = {
    degrees: [
        {
            title: "Norges miljø- og biovitenskapelige universitet (NMBU)",
            subtitle: "MSc i Data Science",
            logo_path: "nmbu_logo.png",
            alt_name: "NMBU",
            duration: "aug. 2022 – mai 2024",
            descriptions: [
                "⚡ Masteroppgave: Semantiske forbedringer i bilde-tekst-generering (karakter A)",
                "⚡ Emner: Maskinlæring, dyplæring, statistisk teori, databehandling",
            ],
            website_link: "https://www.nmbu.no/",
        },
        {
            title: "National Institute of Engineering (NIE) – Mysore",
            subtitle: "BEng i Information Science & Engineering",
            logo_path: "nie_logo.png",
            alt_name: "NIE",
            duration: "aug. 2016 – jun. 2020",
            descriptions: ["⚡ GPA: 8.63 / 10 (First Class with Distinction)"],
            website_link: "https://nie.ac.in/",
        },
        {
            title: "Sunbeam School Lahartara",
            subtitle: "Videregående (Science)",
            logo_path: "sunbeam_logo.png",
            alt_name: "Sunbeam",
            duration: "2013 – 2015",
            descriptions: ["⚡ Resultat: 87,4 %"],
            website_link: "https://sunbeamschools.com/",
        },
    ],
};

/* ---------- Sertifiseringer ---------- */
const certifications = {
    certifications: [
        {
            title: "Data Science Specialization",
            subtitle: "Johns Hopkins University – 10‑course series",
            logo_path: "johnhopkins_logo.png",      // place logo in src/assets/images
            certificate_link:
                "https://drive.google.com/file/d/1VzB8OnwhzLmDlbdnQFrlSdL05ht369qh/view?usp=sharing",
            alt_name: "Coursera",
            color_code: "#2A73CC",               // Coursera blue
        },
        {
            title: "Aruba Certified Switching Associate (ACSA)",
            subtitle: "Aruba Networks – HPE",
            logo_path: "aruba_logo.png",         // src/assets/images
            certificate_link:
                "https://drive.google.com/file/d/1uOzP0Rb9b4gNoZGHMXBI11NElpXW9cX7/view?usp=sharing",
            alt_name: "Aruba Networks",
            color_code: "#F58220",               // Aruba orange
        },
        {
            title: "Big Data Specialization",
            subtitle: "UC San Diego – 6‑course series",
            logo_path: "UC_San_diego_logo.png",
            certificate_link:
                "https://drive.google.com/file/d/1LWZ7chy94p4sLRcyYXt621jmqplqOnK_/view?usp=sharing",
            alt_name: "Coursera / UCSD",
            color_code: "#003B71",               // UCSD navy
        },
        {
            title: "Applied Data Science with Python",
            subtitle: "University of Michigan – 5‑course series",
            logo_path: "UM_logo.png",
            certificate_link:
                "https://drive.google.com/file/d/1LhAcp9orPN05XPpLNIumtPs4gTm8Ibdt/view?usp=sharing",
            alt_name: "Coursera / UMich",
            color_code: "#00274C",               // Michigan blue
        },
        {
            title: "SQL for Data Science",
            subtitle: "UC Davis",
            logo_path: "UC_davis_logo.png",
            certificate_link:
                "https://drive.google.com/file/d/1w4bSBl8wh9hY35ZNE8CIEnBXXbqE5S1Z/view?usp=sharing",
            alt_name: "Coursera / UCDavis",
            color_code: "#3C7E8F",               // UC Davis teal
        },
        {
            title: "Natural Language Processing Specialization",
            subtitle: "deeplearning.ai – 4‑course series",
            logo_path: "deeplearningai_logo.png", // src/assets/images
            certificate_link:
                "https://drive.google.com/file/d/1VgvLPJ7ixy-s0--Io_3jfVHTdvgjQRI6/view?usp=sharing",
            alt_name: "deeplearning.ai",
            color_code: "#EE0000",               // DL.ai red
        },
    ],
};

/* ---------- Erfaring ---------- */
const experience = {
    title: "Erfaring",
    subtitle: "Arbeid & frivillighet",
    description:
        "Over fire års kombinert erfaring innen systemutvikling, data‐science og nettverk. Har jobbet i alt fra multinasjonale selskaper til akademia, samt flere sommer- og prosjektinternships. Jeg trives i skjæringspunktet mellom programvareingeniørfag, datadrevne beslutninger og tverrfaglige team.",
    header_image_path: "experience.svg",
    sections: [
        {
            title: "Arbeid",
            work: true,
            experiences: [
                {
                    title: "IT‐konsulent (CAD/3D)",
                    company: "Aibel",
                    company_url: "https://aibel.com/",
                    logo_path: "aibel_logo.png",
                    duration: "mai 2024 – nå",
                    location: "Asker, Norge",
                    description:
                        "Utvikle interne C#/.NET-verktøy og arbeidsflytautomatisering for 3D-ingeniørsystemer, med integrering av desktop- og Azure-skykomponenter.",
                    color: "#0077B5",
                },
                {
                    title: "Konsulent / Universitetsassistent",
                    company: "NMBU – Norges miljø- og biovitenskapelige universitet",
                    company_url: "https://www.nmbu.no/",
                    logo_path: "nmbu_logo.png",
                    duration: "feb. 2024 – mai 2024",
                    location: "Ås, Norge",
                    description:
                        "Underviste i algoritmer og datastrukturer (INF221); veiledet studenter i kompleksitetsanalyse og Python-implementasjoner.",
                    color: "#1B5E20",
                },
                {
                    title: "Data Scientist (deltid)",
                    company: "Bosch Rexroth",
                    company_url: "https://www.boschrexroth.com/",
                    logo_path: "bosch_logo.png",
                    duration: "apr. 2023 – mai 2024",
                    location: "Ski, Norge",
                    description:
                        "Rasjonaliserte eldre data til relasjonelle datamodeller og bygde Power BI-dashbord for ledelsesrapportering.",
                    color: "#EA0016",
                },
                {
                    title: "Data Scientist Intern",
                    company: "DNV",
                    company_url: "https://www.dnv.com/",
                    logo_path: "dnv_logo.png",
                    duration: "jun. 2023 – aug. 2023",
                    location: "Høvik, Norge",
                    description:
                        "Utviklet et rammeverk for kostnadsprediksjon av belastning og utmattelse i offshore vindturbiner, og integrerte ML i Sesam Wind Manager.",
                    color: "#00457C",
                },
                {
                    title: "System Software Engineer",
                    company: "Hewlett Packard Enterprise",
                    company_url: "https://www.hpe.com/",
                    logo_path: "hpe_logo.png",
                    duration: "sep. 2020 – jul. 2022",
                    location: "Bengaluru, India",
                    description:
                        "Automatiserte Layer-3-protokoller (OSPF, PIM, IGMP) i Python og testet høy-tilgjengelighets-funksjoner (VSX/VSF) på Aruba AOS-CX.",
                    color: "#00B388",
                },
                {
                    title: "Software Engineering Intern",
                    company: "Hewlett Packard Enterprise",
                    company_url: "https://www.hpe.com/",
                    logo_path: "hpe_logo.png",
                    duration: "jan. 2020 – aug. 2020",
                    location: "Bengaluru, India",
                    description:
                        "Bygde verktøyet “L3 Triage” for feilklassifisering ved bruk av LDA + KNN/SVM, hvilket økte nøyaktigheten for Aruba-nettverksteamet.",
                    color: "#00B388",
                },
                {
                    title: "Data Engineering Intern",
                    company: "Embibe",
                    company_url: "https://www.embibe.com/",
                    logo_path: "embibe_logo.png",
                    duration: "jun. 2019 – aug. 2019",
                    location: "Bengaluru, India",
                    description:
                        "Automatiserte data-innhentingspipelines og bygde en e-handelsskraber med Requests og BeautifulSoup.",
                    color: "#6F2DFF",
                },
                {
                    title: "Forskningsassistent (sikkerhet)",
                    company: "Hewlett Packard Enterprise",
                    company_url: "https://www.hpe.com/",
                    logo_path: "hpe_logo.png",
                    duration: "jan. 2019 – apr. 2019",
                    location: "Bengaluru, India",
                    description:
                        "Utviklet CLI-verktøyet “Threat Ripper v1.0” for webtrussel-intelligens ved bruk av VirusTotal- og TIP-APIer.",
                    color: "#00B388",
                },
            ],
        },
        {
            title: "Frivillighet",
            experiences: [
                {
                    title: "Medlem – Motivasjonsgruppen",
                    company: "Aibel",
                    company_url: "https://aibel.com/",
                    logo_path: "aibel_logo.png",
                    duration: "mai 2024 – nå",
                    location: "Asker, Norge",
                    description:
                        "Planlegger teambyggingsaktiviteter og fremmer en samarbeidskultur på tvers av ingeniøravdelinger.",
                    color: "#0077B5",
                },
                {
                    title: "Studentambassadør",
                    company: "UNDP Norge",
                    company_url: "https://www.undp.org/",
                    logo_path: "undp_logo.png",
                    duration: "okt. 2022 – mai 2023",
                    location: "Ås, Norge",
                    description:
                        "Promoterte FNs bærekraftsmål og fungerte som bindeledd mellom UNDP, studenter og alumnigrupper.",
                    color: "#0066CC",
                },
                {
                    title: "PR‐sjef",
                    company: "International Students Union (ISU) – NMBU",
                    company_url: "https://www.isu-norway.no/",
                    logo_path: "isu_logo.png",
                    duration: "sept. 2022 – feb. 2023",
                    location: "Ås, Norge",
                    description:
                        "Håndterte sosiale medier, pressemeldinger og kulturelle arrangementer for internasjonale studenter.",
                    color: "#4CAF50",
                },
            ],
        },
    ],
    recommendationLetters: [
        {
            label: "DNV – Anbefalingsbrev",
            fileUrl: "https://drive.google.com/file/d/1L7tqOIx0YCXmPRXZ0ifb55enKqOgxJNJ/view"
        }
    ]
};

/* ---------- Prosjekter ---------- */
const projectsHeader = {
    title: "Prosjekter",
    description:
        "Et utvalg akademiske arbeider og hobbyprosjekter – fra MLOps og data-engineering til fullstack-dashbord og desktop-automatisering. Alle repoer er åpne med mindre annet er angitt.",
    avatar_image_path: "projects_image.svg",
};

/* ---------- Kontakt ---------- */
const contactPageData = {
    contactSection: {
        title: "Kontakt meg",
        profile_image_path: "mittbilde.jpg",    // erstatt med din egen fil
        description: `
      Jeg bygger helhetlige løsninger innen datavitenskap, ML-pipelines og desktop applikasjoner. 
      Bosatt i Norge siden 2022, brenner jeg for å løse lokale utfordringer og skape 
      bærekraftige, skalerbare systemer som gjør en forskjell. 
      På fritiden finner du meg gjerne på sti-løp, tennisbanen, styrketrening eller på tur. 
      Send meg en melding — jeg svarer som regel samme dag.
    `,
    },

    addressSection: {
        title: "Adresse",
        subtitle: "Gamle Drammensvei, 1357 Bekkestua, Norge",
        locality: "Bekkestua",
        country: "Norway",
        region: "Viken",
        postalCode: "1357",
        streetAddress: "Gamle Drammensvei",
        avatar_image_path: "address_image.svg",
        location_map_link: "https://maps.app.goo.gl/TL5gyRWjVVc9EszP6",
    },

    phoneSection: {
        title: "Telefon",
        subtitle: "+47 973 92 924",
    },
};

/* ---------- Eksport ---------- */
export {
    settings,
    seo,
    greeting,
    socialMediaLinks,
    skills,
    competitiveSites,
    degrees,
    certifications,
    experience,
    projectsHeader,
    contactPageData,
};
