# Progress Log

Running record of work done on this portfolio by Claude Code. Newest entries at
the top.

---

## 2026-08-23 — Fix blank page after the splash screen

Regression from the motion layer added earlier today. On a first visit the
splash played, the URL changed to `/home`, and then nothing rendered — a white
page until you reloaded. Reproduced it headlessly (clear `sessionStorage`, load
`/`, wait 7s: URL `/home`, `document.body.innerText` empty) before touching
anything.

**Cause.** `<AnimatePresence exitBeforeEnter>` holds the incoming route until
the outgoing one reports that its exit animation finished. Every page was
wrapped in `PageTransition`, which supplies that exit — except the splash,
which I'd deliberately left unwrapped. With no exit to report, the swap never
completed and the app rendered nothing at all.

The same trap was waiting for anyone with `prefers-reduced-motion` set:
`PageTransition` returned a plain `<div>` in that branch, so _every_
navigation would have dead-ended on a blank page. That path is now covered
too, and is what the reduced-motion checks below are for.

**Fixes.**

- `PageTransition` always renders a `motion.div` carrying an `exit`. Under
  reduced motion it's a zero-duration `opacity: 1` no-op — visually inert, but
  it still resolves so `AnimatePresence` can proceed.
- Both splash routes are wrapped in `PageTransition` like every other route.
- `Splash` navigates with `history.replace("/home")` instead of rendering
  `<Redirect>`. Because `AnimatePresence` keeps the outgoing subtree mounted
  while it animates out, a `<Redirect>` would still be rendering — pointing at
  the route we'd just arrived at — after the navigation had already happened.
  `replace` also keeps the splash out of history, so Back from `/home` leaves
  the site rather than replaying the intro.

Also fixed the React warnings the repro surfaced in `LoaderLogo.js` (`class` →
`className`, `stroke-width` → `strokeWidth`). Harmless — React passes unknown
attributes through, which is why the hexagon still animated — but they were
the only console noise left on load.

**Verified:** first visit plays the splash then lands on a rendered `/home`;
repeat visit in the same session skips straight there; reduced motion skips
the splash _and_ navigates between pages without blanking; Back after the
splash goes to `/home`, not the intro. Plus the usual clean production build
and no horizontal overflow at 390/768px on any route.

---

## 2026-08-23 — Motion layer: scroll reveals, page transitions, aurora hero

Brief was to make the site genuinely striking, with more animation and
smoother flow. Added a reusable motion layer rather than one-off animations,
and fixed three real bugs found along the way.

### The framer-motion constraint (read this before upgrading)

The project is pinned to **framer-motion 2.9.4** and has to stay there for
now. Attempting the upgrade documented the reason:

- v6.5.1 has the `whileInView` / `viewport` props I wanted, but its ES build
  ships as `.mjs`, and the webpack 4 bundled by `react-scripts@3.2.0` applies
  strict ESM semantics to `.mjs` and fails on framer-motion's named imports
  from CommonJS React (`Can't import the named export 'Children'…`).
- Importing framer-motion's CJS build directly gets past its own entry, but
  the same failure just moves down the tree — `popmotion`, `style-value-types`
  and friends are all `.mjs` in that generation.
- v5 ships `.mjs` too, so there's no v5/v6 escape hatch. Fixing this properly
  needs webpack config we can't reach without ejecting CRA.

So `whileInView` is hand-rolled instead: `src/hooks/useInView.js` is a small
IntersectionObserver hook, which is all `whileInView` wraps anyway.

**Second v2 gotcha:** framer-motion 2.9.4 does not _reliably_ propagate a
parent's variant label to child `motion` components. The skills cards showed
this clearly — the parent reached `show` while every child sat at `opacity: 0`
forever. `RevealGroup` therefore publishes its in-view state through React
context and each `RevealItem` animates itself, with the stagger applied as an
explicit per-item delay rather than `staggerChildren`.

"Reliably" is doing real work in that sentence: `AnimatedHeading` still uses
ordinary parent→child variant propagation with `staggerChildren`, and it does
work — verified on a below-the-fold heading going `opacity: 0` → `1` with its
transform reset on scroll. Only the `RevealGroup` shape failed. So don't
"fix" `AnimatedHeading` to match `RevealGroup`; it isn't broken, and the two
having different mechanics is deliberate rather than an oversight.

### New motion primitives (`src/components/motion/`)

- **`Reveal` / `RevealGroup` / `RevealItem`** — scroll-triggered reveals.
  Unlike the react-reveal `<Fade>` used elsewhere (which animates on _mount_,
  so below-the-fold content often finishes before you scroll to it), these
  fire on true viewport entry.
- **`AnimatedHeading`** — word-by-word mask reveal for page headings. Gradient
  backgrounds live on each word span, not the parent: `background-clip: text`
  clips a parent's background to its own paint box, so a transformed child
  would slide its glyphs out of the clipped region and lose its fill mid-flight.
- **`PageTransition`** + `AnimatePresence` in `Main.js` — routes now cross-fade
  instead of snapping, and scroll resets to top on navigation.
- **`ScrollProgress`** — spring-smoothed gradient progress bar.
- **`CursorGlow`** — ambient light trailing the pointer, layered at `z-index: 0`
  beneath content (`.app-content` holds `z-index: 1`) so it never washes over
  text. Desktop-only, gated on `(pointer: fine)`.

Everything respects `prefers-reduced-motion`, verified by rendering all pages
under Playwright's `reducedMotion: 'reduce'` and confirming nothing is left
stuck invisible.

### Visual work

- **Hero is now an animated aurora mesh**: three oversized colour blobs on
  independent drift cycles over the theme's darkest token, heavily blurred so
  they read as one continuous field. Only `transform` animates, so the blur
  rasterises once and the drift stays on the compositor. Replaces the flat
  linear-gradient-plus-black-scrim, which washed out to grey.
- **3D crystal**: added a vertical float, a slow breathing scale and an
  orbiting ring. Also fixed it overflowing its canvas — the ring was at 2.28
  world units against a visible half-height of ~2.04, so it clipped at the
  frustum edge. Sizes are now derived from that half-height with margin to
  spare, and the maths is written down in the file.
- **Magnetic buttons** — buttons chase the cursor slightly and spring back.
- Hero text/art scroll-parallax at different rates, plus a shimmer sweep
  through the gradient title.
- Projects and certifications grids now cascade in per row.

### Bugs found and fixed

1. **`.subTitle` was leaking site-wide.** `ContactComponent.css` declared a
   bare `.subTitle { animation: pulse 3s infinite; display: inline-block; … }`.
   CRA bundles all CSS globally, so _every_ subtitle on the site — the hero
   strapline, every skills bullet — was silently running an infinite scale
   animation. Caught it while debugging a phantom `scale(1.0498)` that kept
   changing on elements whose inline style said `transform: none`. Now scoped
   to `.contact-main .subTitle` and disabled under reduced motion.
2. **Word-masked headings broke their own text.** Spacing words with CSS
   margin meant the heading's text content was `"Getintouch"` — which is what
   a screen reader announces and what a user copies. Gaps are real space text
   nodes now; verified `innerText` reads `"Get in touch"`.
3. **Two missing React `key` props** (`ExperienceAccordion`, `DegreeCard`) that
   had been warning in the console.

### On the card-grid wrappers

Wrapping a flex item in a reveal `<div>` moves the flex item one level down —
the same trap that collapsed the certification cards to 112px strips
previously. Both grids now put the flex share on the wrapper
(`.repo-card-reveal`, `.cert-card-reveal`) and let the card fill it. Verified
card widths at 1440/1100/700/390px.

### Verification

Production build clean; all five routes checked for horizontal overflow at
390px and 768px (none); route navigation exercised end-to-end; Code and Live
Demo buttons click-tested again to be sure the magnetic transform didn't
reintroduce the earlier click-blocking regression.

---

## 2026-08-22 — Refreshed the Geo-Risk project entry from its current README

The user pointed at
`github.com/SushantSriv/Risikoprediksjon_for_Transport_og_Landbruk` and asked
to update its existing card from that repo's README, since the project had
moved on substantially since it was first added.

Fetched the live README via the GitHub API rather than relying on the old
entry. The project had changed in several concrete ways worth reflecting:

- **Deployment moved from Docker/Azure to Vercel** (two projects from one
  repo, frontend + FastAPI backend) — removed "Azure Container Registry"
  and "Docker" from the language chips, added "Vercel".
- **A real live demo now exists**
  (`risikoprediksjon-for-transport-og-l.vercel.app`) — added via the
  `liveUrl` field/button (same mechanism added for the 3d-home-view
  project), and cleared the old YouTube `demoUrl`, which almost certainly
  predates this rebuild and would show a stale UI.
- **The methodology changed in a genuinely interesting way**: the README
  documents that the original Random Forest risk _classifiers_ were
  deliberately removed and replaced with an exact climatology lookup table,
  after validating the classifiers were barely beating a 33% chance
  baseline once a raw-count confound (kommune size / good-weather traffic
  volume) was corrected for. The old one-line description didn't capture
  any of this — rewrote it to lead with what the project actually does now
  (live weather + 34 years of accident history, normalised by vehicle-km
  exposure from NVDB traffic data) and to include this validation story,
  since it's the most technically credible part of the README.
- **Data sources**: confirmed MET Norway and Statens Vegvesen (NVDB) are
  still current; the README no longer lists OpenStreetMap as a source, so
  removed it; added Kartverket (no logo asset available, so it renders via
  a generic `mdi:map-outline` icon instead of an image).
- Renamed from "Geo-Risk Prediction Dashboard" to "Weather-Based Risk
  Predictor (Traffic & Agriculture)" to reflect both the transport and
  Landbruk (agriculture) views the README describes.

Verified the live demo URL actually resolves (200), and confirmed via an
actual click test that the new Live Demo button opens the right project
specifically (there are now two "Live Demo" buttons on the Projects page,
one per project with a `liveUrl`). Production build and full mobile
overflow sweep both clean.

---

## 2026-08-22 — Splash signature reveal fix, resume link update

**Splash signature "cut off" look.** The user shared a screenshot where the
"Sushant Srivastava" signature on the splash screen looked like it was
sliced/underlapped by a border instead of reading clean and open. Root
cause: `.splash-signature` revealed itself via a hard `clip-path` wipe
(`inset(0 100% 0 0)` animating to `inset(0 0% 0 0)`) — a moving vertical
edge sweeping left to right. For a connected cursive script font
(Agustina), that hard edge can slice straight through a letter's
connecting stroke mid-animation, which is very likely what got
screenshotted. Confirmed via Playwright at six viewport widths (390px to
1920px) that the text never actually overflows its container — so this was
an animation artifact, not a layout bug. Replaced the clip-path wipe with a
plain opacity/blur fade (`.splash-signature` now fades and un-blurs in as
one unit, no directional cutting edge at any point), plus a touch of
`letter-spacing` for extra breathing room. Re-verified clean at all six
widths and in a settled + mid-animation screenshot.

**Resume links.** Split `resumeLink` into the correct per-language files —
`portfolio_en.js` now points to the English CV, `portfolio_no.js` to the
Norwegian one (both new Google Drive links from the user, checked as
publicly reachable before committing).

Verified with a production build after each change.

---

## 2026-08-22 — New project, CV-driven content refresh

Two asks: find and add a new GitHub project as "in development," and bring
experience/skills content up to date using the user's current CV.

### New project: 360° Home Tour

Found `SushantSriv/3d-home-view` via the GitHub API (not previously known to
this repo) — a free web app for property brokers that stitches per-room
phone videos into a navigable 360° tour, on a static GitHub Pages + Supabase
free-tier stack. Confirmed its GitHub Pages demo is actually live
(`tour.html?demo=1` returns 200) before linking to it.

Added it to `src/shared/opensource/projects.json` with `inProgress: true`
(renders the existing "In development" badge). Its demo is a live
interactive page, not a video, so the existing `demoUrl` field (which always
renders a YouTube-styled modal iframe) was the wrong fit — added a new
`liveUrl` field instead: `GithubRepoCard.js` now renders an extra "Live
Demo" button that opens it directly in a new tab when present, alongside
"Code". Verified with an actual click test that it opens the right URL.
Noted in the description that the repo itself is closed-source/
proprietary (public only because GitHub Pages requires it), since the
Projects page's own header text says "open-source unless otherwise noted."

### CV-driven content refresh (`portfolio_en.js` + `portfolio_no.js`)

The user's current CV showed the Aibel role had evolved substantially since
what was on the site — updated both language files in parallel:

- **Aibel**: title changed from "IT Consultant (CAD/3D)" to "Software
  Engineer"; description replaced entirely to reflect the current scope —
  Claude Code application ownership (hardening the dev environment for a
  company-wide rollout), Copilot Studio/Power Automate AI adoption work, a
  WPF/.NET CAD portal, and the Web3D/Azure viewer work.
- **DNV** and **Bosch Rexroth**: descriptions refined to match the CV's more
  precise technical framing (load time-series/ultimate-strength assessments
  and parametric wave-load predictions for DNV; DAX/Power Query models with
  scheduled refresh for Bosch).
- **Skills**: added a bullet + two new `softwareSkills` icons (Claude Code,
  GitHub Copilot) to the existing "AI Applications & Data Science" section,
  rather than standing up a whole new category — smaller, safer change that
  still surfaces what's now the headline part of the day job. Verified the
  new iconify slugs (`simple-icons:anthropic`, `simple-icons:githubcopilot`,
  `simple-icons:supabase`) actually resolve before using them.
- **NMBU degree**: swapped the "Visit Website" link from the university
  homepage to the actual thesis repository page the CV cited — more useful
  evidence for a portfolio than a generic university link.
- Left the HPE entries and certifications alone — the CV's 1-page format
  visibly condenses/merges things the site already covers in more (accurate)
  detail; no factual conflict there, just different levels of granularity
  for different mediums.

### Verification

Full mobile overflow sweep (clean), production build (clean), and click
tests confirming both the new project's "Live Demo" button and the existing
"Code" button open the correct URLs.

---

## 2026-08-21 — Three real regressions from the redesign, caught by the user

The user flagged three concrete bugs from screenshots after the previous
round. All three traced back to `react-parallax-tilt`/`react-reveal`
interactions that weren't visible in my own testing:

1. **Project card "Code"/"Demo" buttons did nothing on click.**
   `react-parallax-tilt`'s glare effect renders a decorative overlay div
   (`.glare-wrapper`/`.glare`) covering the entire card. It defaults to
   `pointer-events: auto`, so it silently sat on top of and swallowed every
   click meant for buttons underneath - the card's own click-to-open-repo
   handler still fired (since it's on an ancestor), but the more specific
   "Code"/"Demo" button clicks never reached their handlers. Fixed with a
   site-wide `.glare-wrapper, .glare { pointer-events: none !important; }`
   in `index.css`, since this affects every Tilt-wrapped card, not just
   Projects. Verified with an actual Playwright click that confirmed a new
   tab opens to the right GitHub URL.

2. **Certification cards rendered as narrow ~112px strips with huge gaps**
   instead of normal card width. Root cause: `CertificationCard.js` wraps
   `<Tilt className="cert-card">` in a `<Fade>` (react-reveal), so the DOM
   is `.certs-body-div` (flex) > `.react-reveal` (Fade's wrapper div) >
   `.cert-card`. `.cert-card`'s `width: 30%` was resolving against its
   _immediate_ parent - the react-reveal wrapper - not the flex grid
   container. Since that wrapper has no explicit sizing of its own, its
   width is circularly determined by its content's shrink-to-fit size,
   which collapses percentage-width children down to roughly their content
   size instead of the intended grid share. Fixed by giving the actual flex
   item (`.certs-body-div > .react-reveal`) the `flex: 1 1 30%; max-width: 30%` grid share directly, and changing `.cert-card` to `width: 100%` to
   just fill it. (`GithubRepoCard`/`ExperienceCard`/`DegreeCard` don't have
   this problem - either Tilt isn't nested inside a Fade wrapper, or the
   surrounding layout isn't a percentage-based multi-column grid, so this
   was specific to the certifications grid.)

3. **Gradient-heading text appeared to clip at the top/descenders** ("Proiects",
   "Get in touch" cut off) in the user's screenshots. Couldn't reproduce it
   in a fresh headless render - suspect a transient rendering artifact tied
   to the react-reveal Fade opacity animation's first paint frame, which is
   a known category of glitch when `background-clip: text` sits inside an
   animated/transformed ancestor. Applied a defensive fix regardless since
   it's a safe improvement either way: `.gradient-heading` now has
   `line-height: 1.3` and `padding-bottom: 0.08em` so descenders always
   have headroom.

Re-verified: full mobile overflow sweep (clean), production build (clean),
and an actual click-through test on the Projects "Code" button confirming
it opens the correct repo in a new tab.

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
