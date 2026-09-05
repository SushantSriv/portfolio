# Sushant Srivastava — Portfolio

**Live site: [sushantsriv.github.io/portfolio](https://sushantsriv.github.io/portfolio)**

A personal portfolio site built with React, featuring a WebGL 3D hero
centerpiece, glassmorphism UI, and bilingual (English/Norwegian) content —
showcasing experience, education, projects, and open-source activity.

## Features

- **3D hero** — an interactive, theme-colored crystal built with
  [three.js](https://threejs.org/) / `@react-three/fiber`, with a particle
  field backdrop, mouse-parallax, and automatic fallback to a static
  illustration on devices without WebGL or with `prefers-reduced-motion` set.
- **Glassmorphism + tilt cards** — certification, project, degree, and
  experience cards use a translucent glass treatment with mouse-tilt and
  glare (`react-parallax-tilt`), all colored from the active theme.
- **14 live color themes** — pick a palette from the header and the whole site
  recolors, including the WebGL scene, and the choice persists across visits.
  Every gradient, glass panel and 3D material is theme-token driven, so
  palettes need no per-component work.
- **Motion layer** — scroll-triggered reveals, word-by-word heading reveals,
  cross-faded route transitions, a scroll-progress bar and an ambient cursor
  glow, all disabled under `prefers-reduced-motion`.
- **At-a-glance stats** — counts derived from the content in the repo (project
  entries, unique technologies, certifications) rather than hardcoded, so they
  can't drift out of date.
- **English / Norwegian language toggle** — content is fully translated via
  `src/portfolio_en.js` / `src/portfolio_no.js` and a `LanguageContext`
  provider.
- **Fully responsive** — verified down to 375px with no horizontal overflow.
- **Live GitHub activity** — pull request and issue charts, org list, and
  repo cards pulled from the GitHub GraphQL API via `git_data_fetcher.mjs`.
- **"Write to Me" contact form** — a zero-backend `mailto:` form (no
  third-party mailer, no secrets to manage) since this is a static site.
- **Animated splash intro** — a signature-draw + iris-reveal loading screen,
  shown once per session (`sessionStorage`-gated) and skipped automatically
  under `prefers-reduced-motion`.

## Tech stack

- [React 17](https://react.dev/) + [React Router](https://reactrouter.com/)
- [three.js](https://threejs.org/) via `@react-three/fiber` /
  `@react-three/drei` for the 3D hero
- [Framer Motion](https://www.framer.com/motion/) for scroll/entrance
  animation, [react-reveal](https://www.react-reveal.com/) for section
  reveals, [react-parallax-tilt](https://github.com/mkosir/react-parallax-tilt)
  for card tilt/glare
- [styled-components](https://styled-components.com/) for the theme
  provider, [react-bootstrap](https://react-bootstrap.github.io/) and
  [baseui](https://baseweb.design/) for select UI primitives
- [Chart.js](https://www.chartjs.org/) (via `react-chartjs-2`) for the
  GitHub activity charts
- Bootstrapped with [Create React App](https://create-react-app.dev/)
  (`react-scripts`), deployed to GitHub Pages via
  [`gh-pages`](https://github.com/tschaub/gh-pages)

## Getting started

```bash
npm install
npm start
```

Opens the dev server at `http://localhost:3000`.

### Environment variables (optional)

The GitHub activity sections (pull requests, issues, repos) are populated by
`git_data_fetcher.mjs` using the GitHub GraphQL API. Copy `env.example` to
`.env` and fill in a
[personal access token](https://github.com/settings/tokens) to enable them
locally:

```bash
cp env.example .env
```

```
GITHUB_TOKEN=your_token
GITHUB_USERNAME=your_username
```

Without this, the site still runs fine — those specific sections just won't
have live data.

### Build & deploy

```bash
npm run build     # production build to /build
npm run deploy     # publish /build to the gh-pages branch
```

The site is configured to deploy to
`https://sushantsriv.github.io/portfolio` (see `homepage` in
`package.json`).

## Customization

All personal content lives in `src/portfolio.js` (site settings),
`src/portfolio_en.js` and `src/portfolio_no.js` (English/Norwegian content:
greeting, skills, education, certifications, experience, projects, contact
info).

Color palettes live in `src/theme.js`. To add one, export a new theme object
following the same token shape and register it in the `THEME_OPTIONS` list in
`src/ThemeContext.js` — that list is what the header's palette picker renders,
and the first entry is the default for new visitors.

## Project structure

```
src/
├── components/       Reusable UI pieces (cards, header, footer, hero3d, ...)
├── containers/        Page sections (greeting, skills, experience, ...)
├── pages/              Route-level page components
├── portfolio.js        Site settings (splash screen toggle, etc.)
├── portfolio_en.js     English content
├── portfolio_no.js     Norwegian content
├── theme.js             Color palette definitions
├── ThemeContext.js     Active palette + persistence (drives the picker)
└── LanguageContext.js  English/Norwegian language provider
```
