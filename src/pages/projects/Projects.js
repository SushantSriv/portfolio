import React, {
    useContext,
    useState,
    useMemo,
    useCallback,
    useRef,
    useEffect,
} from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-reveal";
import { Icon } from "@iconify/react";
import ProjectsData from "../../shared/opensource/projects.json";
import "./Projects.css";
import ProjectsImg from "./ProjectsImg";
import { LanguageContext } from "../../LanguageContext";

export default function Projects(props) {
    const { theme, portfolio } = props;
    const { language } = useContext(LanguageContext);

    const [searchText, setSearchText] = useState("");
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);

    // All tech names
    const allTechs = useMemo(() => {
        const s = new Set();
        ProjectsData.data.forEach((repo) =>
            repo.languages?.forEach((l) => s.add(l.name))
        );
        return Array.from(s).sort();
    }, []);

    const toggleTech = useCallback(
        (tech) =>
            setSelectedTechs((prev) =>
                prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
            ),
        []
    );

    // Suggestions list (only unselected, filtered by searchText)
    const suggestions = useMemo(() => {
        const q = searchText.toLowerCase().trim();
        if (!q) return [];
        return allTechs
            .filter((tech) => !selectedTechs.includes(tech))
            .filter((tech) => tech.toLowerCase().includes(q));
    }, [allTechs, selectedTechs, searchText]);

    // Handle keyboard
    const onKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setShowSuggestions(true);
            setHighlightedIndex((i) =>
                i < suggestions.length - 1 ? i + 1 : 0
            );
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((i) =>
                i > 0 ? i - 1 : suggestions.length - 1
            );
        }
        if (e.key === "Enter") {
            if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
                const tech = suggestions[highlightedIndex];
                toggleTech(tech);
                setSearchText("");
                setShowSuggestions(false);
                setHighlightedIndex(-1);
                e.preventDefault();
            } else {
                // fallback exact match
                const exact = allTechs.find(
                    (t) => t.toLowerCase() === searchText.toLowerCase().trim()
                );
                if (exact) {
                    toggleTech(exact);
                    setSearchText("");
                    setShowSuggestions(false);
                    setHighlightedIndex(-1);
                    e.preventDefault();
                }
            }
        }
        if (e.key === "Escape") {
            setShowSuggestions(false);
            setHighlightedIndex(-1);
        }
    };

    // Close on outside click
    useEffect(() => {
        const onClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowSuggestions(false);
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    // Repo filtering
    const filteredRepos = useMemo(() => {
        return ProjectsData.data.filter((repo) => {
            const names = repo.languages?.map((l) => l.name.toLowerCase()) || [];
            const textOK =
                !searchText ||
                names.some((n) => n.includes(searchText.toLowerCase()));
            const tagsOK =
                selectedTechs.length === 0 ||
                selectedTechs.every((t) => names.includes(t.toLowerCase()));
            return textOK && tagsOK;
        });
    }, [searchText, selectedTechs]);

    const moreText = language === "no" ? "Flere prosjekter" : "More Projects";

    return (
        <div className="projects-main">
            <Header theme={theme} />

            <div className="basic-projects">
                <Fade bottom duration={2000} distance="40px">
                    <div className="projects-heading-div">
                        <div className="projects-heading-img-div">
                            <ProjectsImg theme={theme} />
                        </div>
                        <div className="projects-heading-text-div">
                            <h1
                                className="projects-heading-text"
                                style={{ color: theme.text }}
                            >
                                {portfolio.projectsHeader.title}
                            </h1>
                            <p
                                className="projects-header-detail-text subTitle"
                                style={{ color: theme.secondaryText }}
                            >
                                {portfolio.projectsHeader.description}
                            </p>
                        </div>
                    </div>
                </Fade>
            </div>

            {/* Search + tags */}
            <div
                className="projects-tag-search-wrapper"
                ref={wrapperRef}
            >
                <Icon icon="mdi:magnify" className="search-icon" />
                {selectedTechs.map((tech) => (
                    <span key={tech} className="search-tag">
                        {tech}
                        <Icon
                            icon="mdi:close"
                            className="tag-close"
                            onClick={() => toggleTech(tech)}
                        />
                    </span>
                ))}
                <input
                    type="text"
                    className="projects-tag-search-input"
                    placeholder={
                        language === "no" ? "Søk teknologi…" : "Search technologies…"
                    }
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setShowSuggestions(true);
                        setHighlightedIndex(-1);
                    }}
                    onKeyDown={onKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                />
                {searchText && (
                    <Icon
                        icon="mdi:close-circle"
                        className="clear-icon"
                        onClick={() => {
                            setSearchText("");
                            setShowSuggestions(false);
                            setHighlightedIndex(-1);
                        }}
                    />
                )}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="search-suggestions">
                        {suggestions.map((tech, idx) => (
                            <li
                                key={tech}
                                className={idx === highlightedIndex ? "highlighted" : ""}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                onMouseLeave={() => setHighlightedIndex(-1)}
                                onClick={() => {
                                    toggleTech(tech);
                                    setSearchText("");
                                    setShowSuggestions(false);
                                    setHighlightedIndex(-1);
                                }}
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Manual tech bar */}
            <div className="projects-tech-buttons">
                <button
                    className={`tech-btn ${selectedTechs.length === 0 ? "active" : ""}`}
                    onClick={() => setSelectedTechs([])}
                >
                    {language === "no" ? "Alle" : "All"}
                </button>
                {allTechs.map((tech) => (
                    <button
                        key={tech}
                        className={`tech-btn ${selectedTechs.includes(tech) ? "active" : ""
                            }`}
                        onClick={() => toggleTech(tech)}
                    >
                        {tech}
                    </button>
                ))}
            </div>

            <div className="repo-cards-div-main">
                {filteredRepos.map((repo) => (
                    <GithubRepoCard key={repo.id} repo={repo} theme={theme} />
                ))}
            </div>

            <div className="project-button-div">
                <Button
                    text={moreText}
                    className="project-button"
                    href={portfolio.greeting.githubProfile}
                    newTab
                    theme={theme}
                />
            </div>

            <Footer theme={theme} />
            <TopButton theme={theme} />
        </div>
    );
}
