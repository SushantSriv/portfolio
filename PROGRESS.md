# Progress Log

Running record of work done on this portfolio by Claude Code. Newest entries at
the top.

---

## 2026-08-21 — Site-wide consistency pass, contact form, privacy cleanup

Follow-up to the redesign: extended the glass/gradient treatment site-wide,
added a "Write to Me" contact form, fixed the hero image-column composition,
and removed personal data the user didn't want shown.

### Hero composition (round 3)

- The framed illustration added in the previous round didn't work visually —
  a flat vector illustration in a light card clashed with the glass/gradient/
  3D aesthetic. Removed it entirely per the user's own call ("your choice if
  you want to remove the boy picture").
- Instead, made the 3D canvas itself fill the column (taller
  `.hero3d-canvas-wrap`, no more shared space with an illustration) and added
  a themed particle field around the crystal (`Points`/`bufferGeometry`, ~140
  points in a spherical shell) for depth, so the space reads as one coherent
  tech scene instead of two competing visual styles.
- Also fixed the wireframe shell clipping at the canvas edge on wide
  viewports: pulled the camera back (`z: 4.2 -> 5.6`, `fov: 45 -> 40`) and
  shrunk the object scale, leaving real margin between the shape and the
  frustum edge instead of the fixed `1.4`/`1.22` multipliers that clipped in
  practice.

### Site-wide consistency

- Extended `getGlassStyle` + `react-parallax-tilt` to `ExperienceCard.js`
  (`.experience-card`), matching the treatment already on Certification/
  GithubRepo/Degree/Skill cards — this was the one page left visually flat
  after the redesign.
- Added a shared `.gradient-heading` utility class (`src/index.css`) and
  applied the hero's gradient-text treatment to every page's main `<h1>`
  (Education, Experience, Projects, Contact, and the "What I Do?" Skills
  heading) so the whole site reads as one design instead of "fancy hero +
  plain everything else."
- `Footer`/`TopButton`: fixed the same "hover sets no property" dead-CSS
  pattern already caught on `Button.css` — both now have real hover
  transitions (lift + shadow), and `TopButton`'s scroll-to-top uses
  `window.scrollTo({ behavior: 'smooth' })` instead of an instant jump.

### New: "Write to Me" contact form

Added `src/components/contactForm/ContactForm.js` — a toggle button that
reveals Name/Subject/Message fields (framer-motion height/opacity reveal,
glass-styled). Since this is a static GitHub Pages site with no backend, the
user chose the `mailto:` approach over standing up a third-party mailer
(EmailJS, etc.): submitting builds a `mailto:sushantsrivastava198@gmail.com`
link with the subject/body pre-filled and navigates to it, handing off to the
visitor's own email client. Zero secrets, zero backend, works everywhere a
mail client is configured.

### Privacy cleanup

- Removed the phone number entirely: stopped rendering `phoneSection` on the
  Contact page, deleted the field from `portfolio.js`/`portfolio_en.js`/
  `portfolio_no.js`, and removed `telephone` from `SeoHeader.js`'s JSON-LD
  (it was being published in page metadata/structured data, not just visibly
  displayed — worth knowing that SEO schema fields need the same scrutiny as
  on-page content).
- Removed the personal photo slideshow from the Contact page. Deleting the
  `require.context` call in `ContactComponent.js` alone wasn't enough — the
  images kept showing up in the production bundle anyway. Root cause: other
  components (`GithubRepoCard.js`, `DegreeCard.js`, `CertificationCard.js`,
  etc.) load images via `require(\`../../assets/images/\${variable}\`)`— dynamic requires with a runtime-only path segment. Webpack can't statically resolve those, so it conservatively bundles a *recursive* context over the entire`assets/images/`tree "just in case," which was sweeping up`assets/images/slideshow/*.jpg`regardless of whether anything explicitly imported it. Confirmed by grepping the built bundle for the literal filenames — traced to`require.context`'s auto-generated module listing, not a caching artifact (initially suspected stale webpack/babel-loader cache and spent a while ruling that out first). Fix: deleted the source image files outright (`src/assets/images/slideshow/`), which is the only
  way to guarantee they can't get swept into *any\* dynamic require pattern
  in the future. Verified by grepping the rebuilt bundle for the filenames
  and confirming zero matches.

### Verification

- Full mobile horizontal-overflow sweep (390px, all 5 routes) — clean.
- Splash screen re-tested end-to-end: fresh visit shows the new signature and
  redirects to `/home` after 5.5s; reload within the same session skips
  straight to `/home` (sessionStorage gating still works).
- Production build clean; confirmed via bundle grep that the slideshow
  images and phone number are genuinely gone from build output, not just
  from the rendered page.

---

## 2026-08-21 — Hero visual fixes after first look

User feedback on the first pass of the 3D redesign, live in browser:

1. The aurora background was too subtle/patchy — didn't read as a real,
   intentional background.
2. The distorted-sphere 3D shape didn't fit a tech profile ("maybe something
   like a prism").

Changes:

- **Background**: replaced the three-radial-blob aurora (`opacity: 0.45`,
  heavily blurred, patchy) with a single full-coverage diagonal linear
  gradient painted directly as `.greet-main`'s background, animated via
  `background-position` drift instead of blob movement. Swapped the gradient's
  darkest stop from `theme.body` (near-white on every theme, which is what
  made the old aurora look washed out) to `theme.jacketColor` (each theme's
  deep accent tone), so it reads as a real, rich, fully-colored card.
- **Found and fixed a real cross-theme contrast bug**: initially set the hero
  text to flat white assuming the gradient would always be medium-to-dark.
  `blackTheme` breaks that assumption — its `highlight` token is pure white
  and `jacketColor` is a light gray, so white text on `blackTheme` was nearly
  invisible (confirmed via screenshot). Fixed by layering a flat
  `rgba(0,0,0,0.4)` scrim underneath the text on top of the theme gradient
  (`background-image` with two comma-separated layers) — this guarantees
  sufficient contrast for white hero text on _any_ theme's token values, not
  just the ones tested first. Verified on both `blueTheme` and `blackTheme`.
- **3D shape**: swapped `MeshDistortMaterial` (organic blob) for a flat-shaded
  octahedron core (`flatShading: true`, sharp gem/crystal facets) plus an
  independently-rotating wireframe icosahedron shell around it — reads as a
  faceted crystal/prism rather than a blob, which fits a tech profile much
  better. This also means `@react-three/drei` is no longer imported anywhere
  in the codebase (the scene now uses only plain three.js primitives via
  `@react-three/fiber`), which simplified things and shrank the bundle
  slightly — worth removing the now-unused `@react-three/drei` dependency in
  a future pass if nothing else picks it back up.
- Gave `.greet-main` real card padding (`48px 40px` desktop, `28px 20px`
  mobile) now that it's an opaque, bordered gradient panel rather than a
  transparent section.

Re-verified after these changes: clean production build, zero mobile
horizontal overflow (390px), and both `blueTheme`/`blackTheme` screenshots
confirm the text stays legible.

---

## 2026-08-21 — "Wow" 3D + motion redesign

**Goal:** make the site visually striking — full WebGL 3D hero, glassmorphism
cards, gradient backgrounds, motion polish — while keeping every one of the 13
color themes coherent and not breaking mobile.

### Decisions made with the user along the way

1. Went with **real WebGL 3D** (three.js), not a CSS-only pseudo-3D effect.
2. Bumped **React 16.14 → 17.0.2**. Verified against the live npm registry that
   the maintained `@react-three/fiber`/`@react-three/drei` v7 line requires
   React ≥17 (not 18 — that's only `@react-three/fiber` v8+, which needs
   `createRoot`). Staying on React 16 would have meant relying on
   `react-three-fiber@4.2.21`/`drei@1.5.7`, abandoned packages last published
   in 2020. React 17 was chosen as a low-risk, no-breaking-changes bump.

### What shipped

- **3D hero** (`src/components/hero3d/`): an autorotating, mouse-parallaxed,
  theme-colored distorted icosahedron (`@react-three/drei`'s
  `MeshDistortMaterial`) in the Greeting section, replacing the static
  `FeelingProud` illustration. Lazy-loaded (`React.lazy`/`Suspense`) into its
  own JS chunk, wrapped in an error boundary, and falls back to the original
  `FeelingProud` SVG when: `prefers-reduced-motion` is set, WebGL isn't
  available, or the 3D chunk throws for any reason. Colors are driven entirely
  by theme tokens (`imageHighlight`, `jacketColor`, `highlight`, `body`), so
  all 13 themes recolor it correctly — verified visually on `blueTheme` and
  `blackTheme`.
- **Aurora gradient background + gradient hero text** (`Greeting.js`/`.css`):
  a slow-drifting, theme-colored radial-gradient wash behind the hero, and a
  gradient-clipped headline. Scoped with `overflow:hidden` on `.greet-main` so
  it can never cause page-level horizontal scroll (the exact bug class fixed
  earlier this session — see below).
- **Staggered hero entrance** via `framer-motion` (name/subtitle/socials/CTA
  fade+slide in sequence), nested inside the existing `react-reveal` `Fade`
  rather than replacing it.
- **Glassmorphism + tilt cards**: a shared `getGlassStyle(theme)` helper
  (`src/styles/glassStyle.js`) applied to Certification, GitHub repo, Degree,
  and Skill-section cards, each wrapped in `react-parallax-tilt` for a
  mouse-follow tilt + glare on hover.
- **Button micro-interaction fix**: `Button.css` had a dead
  `.main-button:hover { transition: ease-in 0.3s; }` rule that named no
  property (a no-op). Replaced with a real hover lift + glow, and the button
  is now a `framer-motion` element with a tap-scale.
- **Splash intro session-gating** (`Splash.js`): added `sessionStorage`
  gating (skip the 5.5s intro on repeat visits) and a
  `prefers-reduced-motion` check, plus fixed a pre-existing
  `componentWillMount`/`componentWillUnmount` typo. **Left disabled** — see
  "Known issue, not fixed" below.

### Known issue, not fixed: splash screen has the wrong name

`src/components/Loader/LoaderLogo.js` is a hand-authored SVG signature
draw-on animation reading **"Ashutosh Ho"** — the original open-source
template's author, not this site's owner. It was never customized when this
portfolio was built from the template, and it's been inert this whole time
because `settings.isSplash` was already `false` in `src/portfolio.js`.

I got the session-storage/reduced-motion gating working and confirmed the
draw-on animation itself still renders correctly, but I did **not** flip
`isSplash` back on, because doing so would put someone else's name on the
site's first impression. Fixing it properly means either:

- Hand-authoring a new cursive SVG path for "Sushant Srivastava" (the hard
  way — matching the existing stroke-dasharray draw-on effect), or
- Swapping the SVG signature for a text-based render of the real name using
  the "Agustina Regular" cursive font already loaded and already used for the
  header logo (`src/components/header/Header.css` `.logo-name`), with a
  simpler CSS reveal (clip-path wipe or fade) instead of true path-tracing.

Left `isSplash: false` with a comment in `src/portfolio.js` pointing at this.

### Toolchain fights (worth knowing about before touching deps again)

This project runs `react-scripts@3.2.0` (webpack 4.41.0, Babel 7), **not
ejected**, with no `craco`/`config-overrides.js`. That means no custom
webpack/Babel config is reachable without ejecting, which shapes everything
below. Every one of these was a real, verified build failure — not a
hypothetical risk:

1. **`@react-three/drei`'s barrel export pulls in `@react-spring`**, which
   ships optional-chaining syntax (`ctrl.ref?.delete(ctrl)`) this Babel setup
   doesn't transpile in `node_modules`. Fix: deep-import
   `@react-three/drei/core/MeshDistortMaterial` directly instead of
   `{ MeshDistortMaterial } from "@react-three/drei"` — that file has zero
   `@react-spring` dependency on its own.
2. **`framer-motion` v4–v6's `module` build ships raw `.mjs` files** that
   webpack 4 treats as strict ESM and can't resolve named exports from
   React's CJS build against (`Can't import the named export 'useRef'...`).
   Pinned down to `framer-motion@2.9.4`, whose build predates the
   multi-file ESM split (single bundled `.es.js` file) and works cleanly.
3. **`react-parallax-tilt`'s current "legacy" build still uses class-field
   syntax** (`glareWrapperEl;` with no assignment) that isn't transpiled
   either. Pinned to `react-parallax-tilt@1.3.46`, an explicit `es5` build.
4. **`styled-components` lost its `react-is` peer dependency at the top of
   `node_modules`** once the dependency tree got denser from the above — a
   known styled-components/npm-hoisting gotcha. Fixed by adding `react-is`
   as a direct dependency.
5. Two `lsof -ti:3000 | kill` restarts silently did nothing on this
   Windows/git-bash setup — `lsof` wasn't finding the real Windows process.
   Killing by PID via `ps aux`/`netstat -ano` + `taskkill //F //PID <n>` is
   what actually works here for restarting the dev server after a
   `node_modules` change.

Final dependency pins (`package.json`): `react`/`react-dom@17.0.2`,
`@react-three/fiber@^7.0.29`, `@react-three/drei@^7.27.5`, `three@0.130.1`,
`framer-motion@2.9.4`, `react-parallax-tilt@1.3.46`, `react-is@^16.13.1`, plus
a new `.npmrc` with `legacy-peer-deps=true` (needed because `react-reveal`'s
declared peer range still caps at React 16 — confirmed harmless in practice,
all 5 routes click-through clean on React 17).

### Verification done

- `npm run build` clean after every phase (React 17 bump, 3D hero, glass/tilt
  cards). Final bundle: 3D/three.js code-splits into its own ~186KB gzipped
  chunk, confirmed lazy (doesn't inflate the main bundle).
- Scripted Playwright horizontal-overflow scan (the same approach from the
  mobile-fix session) re-run at 390px across all 5 routes — zero real
  overflow. (`react-parallax-tilt`'s glare-effect divs show up as
  technically-oversized in the DOM but are clipped by their own
  `overflow:hidden` wrapper — confirmed harmless, not visible.)
- Theme-cycling spot check (`blueTheme` ↔ `blackTheme`): 3D hero, aurora
  background, gradient text, and glass cards all recolor correctly.
- `prefers-reduced-motion` emulation: 3D hero correctly falls back to the
  static `FeelingProud` SVG instead of mounting the WebGL canvas.
- All 5 routes (`/`, `/education`, `/experience`, `/projects`, `/contact`)
  click-through clean on React 17 with no new console errors (only
  pre-existing, unrelated `key` prop warnings from before this session).

---

## 2026-08-21 — Mobile responsiveness + UI bug fixes

Commit `8497a76`. Full details in that commit message; summary:

- Root-caused and fixed site-wide mobile horizontal overflow: `Splash.css`
  set `body { display: flex }` globally (loaded on every page because
  `Splash` is statically imported even though disabled), which let the page
  grow to the width of its widest unshrinkable descendant instead of
  respecting the viewport.
- Fixed the Contact page's address illustration (unconstrained ~1013px SVG)
  and Projects page's repo cards (flex-basis overflow past their row) —
  both were clipping content on narrow screens.
- Fixed a swapped EN/NO string in the header's language-switch hint.
- Fixed `ContactComponent.js` being saved as Latin-1 instead of UTF-8, which
  mangled the Norwegian "Åpne i Google Maps" button text at runtime.
- Minor: `stroke-miterlimit` → `strokeMiterlimit` JSX attribute fixes.
