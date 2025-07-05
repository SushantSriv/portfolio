/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Sushant's Portfolio",
  description:
    "Passionate about building end-to-end, scalable solutions that drive sustainable social and technical impact.",
  og: {
    title: "Sushant's Portfolio",
    type: "website",
    url: "sushant.com",
  },
};

//Home Page
const greeting = {
  title: "Sushant Srivastava",
  logo_name: "SushantSrivastava",
  nickname: "Sush",
  subTitle:
    "Passionate about building end-to-end, scalable solutions that drive sustainable social and technical impact.",
  resumeLink:
    "https://drive.google.com/file/d/1x_33VBsrV4hLE7EfOxGLbyUmVz32doYB/view?usp=sharing",
  portfolio_repository: "https://sushantsriv.github.io/portfolio/",
  githubProfile: "https://github.com/SushantSriv",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  // github: "https://github.com/SushantSriv",
  // linkedin: "https://www.linkedin.com/in/sushant-srivastava-b72331219/",
  // gmail: "sushantsrivastava198@gmail.com",
  // gitlab: "",
  // facebook: "",
  // twitter: "",
  // instagram: ""

  {
    name: "Github",
    link: "https://github.com/SushantSriv",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sushant-srivastava-b72331219/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/@CodeCraftbySushant",
    fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
    backgroundColor: "#FF0000", // Reference https://simpleicons.org/?q=youtube
  },
  {
    name: "Gmail",
    link: "mailto:sushantsrivastava198@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  {
    name: "X-Twitter",
    link: "",
    fontAwesomeIcon: "fa-x-twitter", // Reference https://fontawesome.com/icons/x-twitter?f=brands&s=solid
    backgroundColor: "#000000", // Reference https://simpleicons.org/?q=x
  },
  {
    name: "Facebook",
    link: "",
    fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
    backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  },
  {
    name: "Instagram",
    link: "",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  },
  {
  name: "CodeChef",
  link: "https://www.codechef.com/users/sushant_sri",
  iconifyClassname: "simple-icons:codechef",   // <- Iconify-navn
  backgroundColor: "#5B4638",
  },
  {
    name: "Kaggle",
    link: "https://www.kaggle.com/sushant198",
    fontAwesomeIcon: "fa-kaggle", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#20BEFF", // Reference https://simpleicons.org/?q=instagram
    },
    {
        name: "Hugging Face",
        link: "https://huggingface.co/Sushant198",
        iconifyClassname: "simple-icons:huggingface", // Reference https://simpleicons.org/icons/huggingface
        backgroundColor: "#1099D7",
    },

];

const skills = {
  data: [
    //------------------------------------------------------------------
    {
      title: "Data Science & Machine Learning",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Predictive modelling and deep‑learning pipelines (TensorFlow & PyTorch)",
        "⚡ Structured & time‑series analytics with pandas, scikit‑learn and statsmodels",
        "⚡ Data storytelling with notebooks, Power BI dashboards and Tableau",
        "⚡ Example repos: `boligprediksjon‑fastapi`, `COVID‑19‑Data‑Pipeline`",
      ],
      softwareSkills: [
        { skillName: "Python", fontAwesomeClassname: "logos:python" },
        { skillName: "pandas", fontAwesomeClassname: "simple-icons:pandas", style: { color: "#150458" } },
        { skillName: "scikit‑learn", fontAwesomeClassname: "simple-icons:scikitlearn", style: { color: "#F7931E" } },
        { skillName: "TensorFlow", fontAwesomeClassname: "logos:tensorflow" },
        { skillName: "PyTorch", fontAwesomeClassname: "logos:pytorch" },
        { skillName: "Power BI", fontAwesomeClassname: "simple-icons:powerbi", style: { color: "#F2C811" } },
      ],
    },
    //------------------------------------------------------------------
    {
      title: "MLOps, APIs & Cloud",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Packaging & serving models with FastAPI and Docker (GitHub Actions CI/CD)",
        "⚡ Data‑lake design on AWS S3, Glue & Athena",
        "⚡ Deploying container images to Azure Container Registry & ECS",
        "⚡ Infrastructure automation using Bicep & Terraform (course projects)",
      ],
      softwareSkills: [
        { skillName: "FastAPI", fontAwesomeClassname: "simple-icons:fastapi", style: { color: "#009688" } },
        { skillName: "Docker", fontAwesomeClassname: "simple-icons:docker", style: { color: "#1488C6" } },
        { skillName: "AWS", fontAwesomeClassname: "simple-icons:amazonaws", style: { color: "#FF9900" } },
        { skillName: "Azure", fontAwesomeClassname: "simple-icons:microsoftazure", style: { color: "#0089D6" } },
        { skillName: "GitHub Actions", fontAwesomeClassname: "simple-icons:githubactions", style: { color: "#2088FF" } },
      ],
    },
    //------------------------------------------------------------------
    {
      title: "Front‑end & Visualisation",
      fileName: "FullStackImg",
      skills: [
        "⚡ Responsive React/Vite dashboards & SPAs (risk‑prediction repo)",
        "⚡ Map‑based visualisations with Leaflet & Mapbox GL",
        "⚡ Rapid prototyping in HTML, CSS Modules & Bootstrap",
      ],
      softwareSkills: [
        { skillName: "React", fontAwesomeClassname: "simple-icons:react" },
        { skillName: "Vite", fontAwesomeClassname: "simple-icons:vite", style: { color: "#646CFF" } },
        { skillName: "JavaScript", fontAwesomeClassname: "simple-icons:javascript", style: { color: "#F7DF1E" } },
        { skillName: "Bootstrap", fontAwesomeClassname: "simple-icons:bootstrap", style: { color: "#7952B3" } },
        { skillName: "Leaflet", fontAwesomeClassname: "simple-icons:leaflet", style: { color: "#199900" } },
      ],
    },
    //------------------------------------------------------------------
    {
      title: "Desktop & CAD Automation",
      fileName: "DesignImg",
      skills: [
        "⚡ Developing WPF/WinForms tooling and Aveva E3D plug‑ins in C# (.NET)",
        "⚡ Automating engineering workflows with PML scripts & REST integrations",
        "⚡ Building DevExpress UI components for design engineers",
      ],
      softwareSkills: [
        { skillName: "C#", fontAwesomeClassname: "simple-icons:csharp", style: { color: "#239120" } },
        { skillName: ".NET", fontAwesomeClassname: "simple-icons:dotnet", style: { color: "#512BD4" } },
        { skillName: "WPF", fontAwesomeClassname: "simple-icons:microsoft", style: { color: "#5E5E5E" } },
        { skillName: "DevExpress", fontAwesomeClassname: "simple-icons:devexpress", style: { color: "#FF7203" } },
        { skillName: "PowerShell", fontAwesomeClassname: "simple-icons:powershell", style: { color: "#5391FE" } },
      ],
    },
  ],
};


// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "Codechef",
      iconifyClassname: "simple-icons:codechef",
      style: {
        color: "#5B4638",
      },
      profileLink: "https://www.codechef.com/users/sushant_sri",
    },
    {
      siteName: "Codeforces",
      iconifyClassname: "simple-icons:codeforces",
      style: {
        color: "#1F8ACB",
      },
      profileLink: "https://codeforces.com/profile/sushantsrivastava1996",
    },
    {
      siteName: "Kaggle",
      iconifyClassname: "simple-icons:kaggle",
      style: {
        color: "#20BEFF",
      },
      profileLink: "https://www.kaggle.com/sushant198",
    },
    {
      siteName: "Github",
      iconifyClassname: "simple-icons:github",
      style: {
        color: "#181717",
      },
      profileLink: "https://github.com/SushantSriv",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Norges miljø- og biovitenskapelige universitet (NMBU)",
      subtitle: "MSc in Data Science",
      logo_path: "nmbu_logo.png",          // add to src/assets
      alt_name: "NMBU",
      duration: "Aug 2022 – May 2024",
      descriptions: [
        "⚡ Thesis: Semantic Enhancements in Image Captioning (Grade A)",
        "⚡ Core courses: Machine Learning, Deep Learning, Statistical Theory & Data Processing",
      ],
      website_link: "https://www.nmbu.no/",
    },
    {
      title: "National Institute of Engineering (NIE)",
      subtitle: "BEng in Information Science & Engineering",
      logo_path: "nie_logo.png",           // add to src/assets
      alt_name: "NIE Mysore",
      duration: "Aug 2016 – Jun 2020",
      descriptions: [
        "⚡ CGPA: 8.63 / 10 (First Class with Distinction)",
      ],
      website_link: "https://nie.ac.in/",
    },
    {
      title: "Sunbeam School Lahartara",
      subtitle: "Senior Secondary (XII), Science",
      logo_path: "sunbeam_logo.png",       // optional – can omit
      alt_name: "Sunbeam School",
      duration: "2013 – 2015",
      descriptions: [
        "⚡ Percentage: 87.4%",
      ],
      website_link: "https://sunbeamschools.com/",
    },
  ],
};

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


// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work & Volunteership",
  description:
    "Over 4 år med kombinert erfaring innen systemutvikling, data science og nettverk. Har jobbet i alt fra multinasjonale selskaper til akademia, samt flere sommer-/prosjekt-internships. Jeg trives i skjæringspunktet mellom programvare­ingeniørfag, data-drevne beslutninger og tverrfaglige team.",
  header_image_path: "experience.svg",
  sections: [
    //----------------------------------------------------
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "IT Consultant (CAD/3D)",
          company: "Aibel",
          company_url: "https://aibel.com/",
          logo_path: "aibel_logo.png",
          duration: "May 2024 – Present",
          location: "Asker, Norway",
          description:
            "Develop custom C#/.NET & PML plug-ins for Aveva E3D and MicroStation, build WPF tooling, and maintain 3D uploader to Azure for Web3D solution.",
          color: "#0077B5",
        },
        {
          title: "Consultant / Teaching Assistant",
          company: "NMBU – Norwegian Univ. of Life Sciences",
          company_url: "https://www.nmbu.no/",
          logo_path: "nmbu_logo.png",
          duration: "Feb 2024 – May 2024",
          location: "Ås, Norway",
          description:
            "Taught algorithms & data structures (INF221); guided students on complexity analysis and Python implementations.",
          color: "#1B5E20",
        },
        {
          title: "Data Scientist (Part-time)",
          company: "Bosch Rexroth",
          company_url: "https://www.boschrexroth.com/",
          logo_path: "bosch_logo.png",
          duration: "Apr 2023 – May 2024",
          location: "Ski, Norway",
          description:
            "Rationalised legacy data into relational schemas and built Power BI dashboards for management reporting.",
          color: "#EA0016",
        },
        {
          title: "Data Scientist Intern",
          company: "DNV",
          company_url: "https://www.dnv.com/",
          logo_path: "dnv_logo.png",
          duration: "Jun 2023 – Aug 2023",
          location: "Høvik, Norway",
          description:
            "Developed cost-prediction framework for offshore wind turbine fatigue and integrated ML into Sesam Wind Manager.",
          color: "#00457C",
        },
        {
          title: "System Software Engineer",
          company: "Hewlett Packard Enterprise",
          company_url: "https://www.hpe.com/",
          logo_path: "hpe_logo.png",
          duration: "Sep 2020 – Jul 2022",
          location: "Bengaluru, India",
          description:
            "Automated Layer-3 protocols (OSPF, PIM, IGMP) in Python and tested high-availability features (VSX/VSF) on Aruba AOS-CX.",
          color: "#00B388",
        },
        {
          title: "Software Engineering Intern",
          company: "Hewlett Packard Enterprise",
          company_url: "https://www.hpe.com/",
          logo_path: "hpe_logo.png",
          duration: "Jan 2020 – Aug 2020",
          location: "Bengaluru, India",
          description:
            "Built \"L3 Triage\" bug-classification tool using LDA + KNN/SVM, boosting accuracy for Aruba networking team.",
          color: "#00B388",
        },
        {
          title: "Data Engineering Intern",
          company: "Embibe",
          company_url: "https://www.embibe.com/",
          logo_path: "embibe_logo.png",
          duration: "Jun 2019 – Aug 2019",
          location: "Bengaluru, India",
          description:
            "Automated data ingestion pipelines and built e-commerce scraper (Requests + BeautifulSoup).",
          color: "#6F2DFF",
        },
        {
          title: "Research Student (Security)",
          company: "Hewlett Packard Enterprise",
          company_url: "https://www.hpe.com/",
          logo_path: "hpe_logo.png",
          duration: "Jan 2019 – Apr 2019",
          location: "Bengaluru, India",
          description:
            "Created CLI tool \"Threat Ripper v1.0\" for web threat intelligence using VirusTotal & TIP APIs.",
          color: "#00B388",
        },
      ],
      },
    //----------------------------------------------------
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "Committee Member – Motivasjongruppen",
          company: "Aibel",
          company_url: "https://aibel.com/",
          logo_path: "aibel_logo.png",
          duration: "May 2024 – Present",
          location: "Asker, Norway",
          description:
            "Organise team-building events and foster collaborative culture across engineering departments.",
          color: "#0077B5",
        },
        {
          title: "Student Ambassador",
          company: "UNDP Norway",
          company_url: "https://www.undp.org/",
          logo_path: "undp_logo.png",
          duration: "Oct 2022 – May 2023",
          location: "Ås, Norway",
          description:
            "Promoted UN Sustainable Development Goals and liaised between UNDP, students and alumni.",
          color: "#0066CC",
        },
        {
          title: "PR Manager",
          company: "International Students Union (ISU) – NMBU",
          company_url: "https://www.isu-norway.no/",
          logo_path: "isu_logo.png",
          duration: "Sept 2022 – Feb 2023",
          location: "Ås, Norway",
          description:
            "Managed social media, press releases and cultural events for international student community.",
          color: "#4CAF50",
        },
      ]
      }

    ],
    recommendationLetters: [
        {
            label: "DNV – Letter of Recommendation",
            fileUrl: "https://drive.google.com/file/d/1L7tqOIx0YCXmPRXZ0ifb55enKqOgxJNJ/view"
        }
    ]
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "A curated selection of academic work, specializations and hobby projects — spanning MLOps, data engineering, full‑stack dashboards and desktop automation. All repositories are open‑source unless otherwise noted.",
  avatar_image_path: "projects_image.svg",
};

const contactPageData = {
    contactSection: {
        title: "Get in touch",
        profile_image_path: "mittbilde.jpg",    // replace with your own file
        description: `
      I build end-to-end solutions in data science, ML pipelines and CAD automation. 
      Based in Norway since 2022, I’m passionate about tackling local challenges and creating 
      sustainable, scalable systems that make a difference. 
      Outside of work, you’ll find me trail running, playing tennis, strength training or hiking. 
      Drop me a message — I usually reply the same day.
    `,
    },

    addressSection: {
        title: "Office location",
        subtitle: "Bekkestua, 1357 Bærum, Norway",
        locality: "Bekkestua",
        country: "Norway",
        region: "Viken",
        postalCode: "1357",
        streetAddress: "Gamle Drammensvei",
        avatar_image_path: "address_image.svg",
        location_map_link: "https://maps.app.goo.gl/TL5gyRWjVVc9EszP6",
    },

    phoneSection: {
        title: "Phone",
        subtitle: "+47 973 92 924",
    },
};


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
