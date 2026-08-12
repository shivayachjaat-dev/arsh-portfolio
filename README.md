# Arsh Shivayach — AI Automation Engineer Portfolio

A premium, interactive personal brand website for Arsh Shivayach, an AI Automation Engineer and Senior Systems Engineer with 6+ years of experience building enterprise software systems.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (dark-first design system)
- **Framer Motion** (animations, transitions, scroll reveals)
- **React Three Fiber / Three.js** (particle background)
- **Lucide Icons** (icon system)
- **next-themes** (dark/light mode)

## Features

- Full-screen hero with 3D particle background and typing animation
- Interactive Skills Galaxy (canvas-based network visualization)
- Animated career evolution timeline
- Expandable experience cards with tech stack
- Filterable project showcase with case studies
- AI Engineering Philosophy cards
- Services grid with CTA
- Animated achievement counters
- Interactive tech stack wall
- GitHub integration (live API with fallback)
- LinkedIn profile section
- Contact form with validation
- Command palette (⌘K / Ctrl+K)
- Dark/Light mode toggle
- Konami Code easter egg
- Interactive developer terminal (Shift+`)
- Custom cursor glow
- Magnetic buttons
- Loading animation
- SEO optimized (structured data, OpenGraph, sitemap, robots)
- Fully responsive (mobile, tablet, desktop, 4K)
- Accessible (ARIA labels, keyboard nav, reduced motion support)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Design system, glassmorphism, animations
│   ├── layout.tsx        # Root layout, fonts, SEO, structured data
│   ├── page.tsx          # Home page (all sections)
│   ├── manifest.ts       # PWA manifest
│   ├── robots.ts         # Robots.txt
│   └── sitemap.ts        # Sitemap.xml
├── components/
│   ├── sections/         # Page sections (hero, about, skills, etc.)
│   ├── animated-counter.tsx
│   ├── command-palette.tsx
│   ├── cursor-glow.tsx
│   ├── easter-eggs.tsx
│   ├── footer.tsx
│   ├── loading-screen.tsx
│   ├── magnetic-button.tsx
│   ├── navbar.tsx
│   ├── particle-background.tsx
│   ├── section-heading.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── linkedin-icon.tsx
├── data/
│   ├── achievements.ts
│   ├── experience.ts
│   ├── navigation.ts
│   ├── philosophy.ts
│   ├── profile.ts
│   ├── projects.ts
│   ├── services.ts
│   ├── skills.ts
│   └── techStack.ts
├── lib/
│   └── utils.ts          # cn() utility
└── types/
    └── index.ts          # TypeScript interfaces
```

## Deployment

The site is configured for Vercel deployment. Connect the repository to Vercel and deploy — no additional configuration needed.

## License

© Arsh Shivayach. All rights reserved.
