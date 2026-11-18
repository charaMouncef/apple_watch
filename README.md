# Apple Watch Ultra 4 Landing Page

An Apple-style product landing page for the Apple Watch Ultra 4, built with React, Vite, and Three.js. It features a scroll-driven 3D watch model, GSAP scroll animations, a custom loading screen, and a fully responsive layout.

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| 3D Rendering | [Three.js](https://threejs.org/) via [@react-three/fiber](https://r3f.docs.pmnd.rs/) & [@react-three/drei](https://github.com/pmndrs/drei) |
| Animation | [GSAP](https://gsap.com/) + ScrollTrigger + [@gsap/react](https://gsap.com/resources/React/) |
| Smooth Scrolling | [Lenis](https://github.com/darkroomengineering/lenis) |
| Responsive Queries | [react-responsive](https://github.com/contra/react-responsive) |

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server with hot module replacement.

### Build

```bash
npm run build
```

Generates a production build in the `dist/` folder.

### Preview

```bash
npm run preview
```

Serves the production build locally.

### Lint

```bash
npm run lint
```

## Project Structure

```
├── public/                        Static assets (models, images, fonts, icons)
├── src/
│   ├── main.jsx                   App entry point (mounts <App /> in StrictMode)
│   ├── App.jsx                    Loader gate, lazy section imports, GLB preload, Lenis/ScrollTrigger setup
│   ├── index.css                  Global styles (Tailwind theme, utilities, component styles)
│   ├── constants/
│   │   └── index.js               Nav links, feature cards, footer links
│   └── components/
│       ├── Loader.jsx             Initial loading screen with progress bar
│       ├── Navbar.jsx             Fixed Apple-style navigation
│       ├── Hero.jsx               Title, crossfading hero images, and Buy CTA
│       ├── ProductViewer.jsx      3D canvas, scroll timeline, and feature copy
│       ├── Health.jsx             Health and fitness tracking sections
│       ├── Features.jsx           Pinned horizontal scrolling cards
│       ├── Footer.jsx             Footer links and copyright
│       ├── three/
│       │   ├── Scene.jsx          Camera and scroll-driven camera path
│       │   └── StudioLights.jsx   Environment lighting setup
│       └── models/
│           └── Watch.jsx          gltfjsx-generated watch model
└── index.html                     SEO and social media metadata
```

## Features

- **Loading screen** — A progress-bar loader covers the app until fonts are ready and a minimum display time has elapsed.
- **Scroll-driven 3D camera** — The camera travels through four keyframe angles as the page scrolls, with separate positions for mobile and desktop.
- **Smooth scrolling** — Lenis is synced with GSAP's ticker so scroll-linked animations stay in step.
- **Scroll animations** — GSAP timelines with ScrollTrigger handle text reveals, canvas movement, and pinned horizontal cards.
- **Responsive design** — `react-responsive` adapts camera positions, model scale, and copy length on smaller screens.
- **Custom theming** — Tailwind v4 `@theme` tokens, custom fonts, and reusable utilities defined in `src/index.css`.
- **SEO metadata** — `index.html` includes a description, canonical URL, Open Graph, and Twitter card tags.

## How It Works

1. **Loading and setup** — `App.jsx` preloads the GLB, shows `Loader` until fonts are ready, then mounts the page. `ProductViewer`, `Health`, `Features`, and `Footer` are lazy-loaded and wrapped in `Suspense`.
2. **Smooth scrolling** — Lenis is driven from `gsap.ticker`, forwarding scroll events to `ScrollTrigger.update`; lazy sections trigger a `ScrollTrigger.refresh()` once the page mounts.
3. **Scroll progress** — `ProductViewer` uses a scrubbed ScrollTrigger timeline to move the canvas element and store scroll progress in `progressRef`.
4. **3D scene** — Each frame, `Scene` interpolates between four camera positions based on that progress and eases the camera with `gsap.quickTo`. `Watch` renders the preloaded GLB model.
5. **Reveals and pinning** — `ProductViewer` and `Health` register `useGSAP` text reveals. `Features` pins itself and scrubs the cards horizontally by the computed overflow width.
6. **Styling** — All component styling lives in `src/index.css` using Tailwind's `@layer components` with nested selectors.

## Assets

All static assets are served from `public/`:

- `models/` — The `apple_watch_ultra_4.glb` 3D model
- `fonts/` — Custom Regular, Medium, SemiBold, and Bold font files
- `healths/` and `features/` — Section imagery
- `hero.jpg`, `hero2.jpg`, and SVG icons/logo referenced throughout the components

## License

No open-source license is included in this repository. Apple Watch, the Apple logo, and related product imagery are trademarks of Apple Inc.
