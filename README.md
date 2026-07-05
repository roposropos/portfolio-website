<div align="center">

  # Billingual Portfolio Website

**Technical portfolio for projects, CV, GitHub repositories and contact materials - built with Next.js, React and TypeScript.**

<p>
  <img src="https://img.shields.io/badge/Next.js-16.2.9-0c0a14?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19.2.7-7b3ff2?style=for-the-badge&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-6.0-1d1532?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 6">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-7b3ff2?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/PL_%2F_EN-portfolio-d8ccff?style=for-the-badge" alt="Polish and English">
</p>

<p>
  <a href="https://portfoliotworekrobert.vercel.app/pl">Live PL</a> |
  <a href="https://portfoliotworekrobert.vercel.app/en">Live EN</a> |
  <a href="#project-scope">Project scope</a> |
  <a href="#tech-stack">Tech stack</a> |
  <a href="#quick-start">Quick start</a> |
  <a href="#deployment">Deployment</a>
</p>

</div>

## About

This repository contains a GitHub-ready portfolio website for Robert Tworek, a Technical Computer Science student at Wroclaw University of Science and Technology. The site presents selected academic projects, practical technologies, education, CV files, contact links and public GitHub repositories in one cohesive visual system.

The design follows the same identity across the landing page and social preview: a dark grid hero, violet `RT` accent, bright recruiter summary panels and compact project cards. It is meant to work as a clean portfolio hub for recruiters and as a central index for project repositories.

## Project Scope

| Area | Implementation |
| --- | --- |
| Bilingual routes | Polish and English versions under `/pl` and `/en`. |
| Hero section | Profile summary, primary actions, GitHub, LinkedIn and CV links. |
| Project case studies | Detailed cards for selected academic projects with role, stack, proof points and metrics. |
| Dynamic GitHub index | Public repositories are loaded from the GitHub API and shown as live project links. |
| Recruiter materials | Downloadable CV files, contact section, mail composer and copy-email action. |
| SEO and sharing | Metadata, sitemap, robots.txt, OpenGraph image endpoint and app icon. |

## What It Shows

| Area | Details |
| --- | --- |
| Frontend architecture | Next.js App Router, React components and localized route handling. |
| Content modeling | Structured TypeScript content for Polish and English versions. |
| API integration | GitHub REST API with optional token support and graceful fallback behavior. |
| UI consistency | CSS variables, violet accent palette, dark hero surface and responsive layouts. |
| Portfolio storytelling | Academic projects are presented as practical case studies instead of loose links. |
| Production readiness | Vercel-ready build, SEO routes, public assets and social preview generation. |

## Featured Projects

| Project | Stack | Focus |
| --- | --- | --- |
| `pharmacy-management-system` | C#, .NET, Avalonia UI, PostgreSQL, SQL | Desktop pharmacy system with sales, inventory, prescriptions, reports, roles and audit. |
| `restaurant-process-simulation` | Java 17, Swing, TCP sockets, Bash | Multi-process restaurant simulation with shared resources, TCP protocol and live GUI panel. |
| `vocabulary-learning-app` | Python, Django, DRF, SQLite, HTML/CSS/JS | Web app for vocabulary learning with sets, flashcards, quizzes, progress and tests. |

## Tech Stack

| Layer | Tools |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript 6 |
| Styling | Tailwind CSS 4, CSS variables, responsive layout utilities |
| UI and interaction | `lucide-react`, `motion`, accessible filters and action buttons |
| Data | Localized TypeScript content, public GitHub REST API |
| Platform | Node.js, pnpm 11, Vercel-ready Next.js deployment |

## Visual System

| Token | Color | Usage |
| --- | --- | --- |
| `ink` | `#0c0a14` | Main dark background and hero grid base. |
| `violet` | `#7b3ff2` | Logo, active states, highlights and primary visual accent. |
| `violet-deep` | `#1d1532` | Dark cards, badges and elevated panels. |
| `violet-on-dark` | `#d8ccff` | Soft text accents on dark surfaces. |
| `surface` | `#f7f5fb` | Light page background and recruiter summary areas. |

## Quick Start

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open one of the localized routes:

```text
http://localhost:3000/pl
http://localhost:3000/en
```

## Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Example configuration:

```bash
NEXT_PUBLIC_SITE_URL=https://portfoliotworekrobert.vercel.app
GITHUB_TOKEN=github_pat_or_classic_token
```

`NEXT_PUBLIC_SITE_URL` is used for metadata, sitemap, robots.txt and OpenGraph URLs.

`GITHUB_TOKEN` is optional. The portfolio still works without it, but an authenticated token increases GitHub API limits for production deployments.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the local development server. |
| `pnpm typecheck` | Runs TypeScript checking without emitting files. |
| `pnpm lint` | Runs ESLint for the project. |
| `pnpm build` | Creates a production Next.js build. |
| `pnpm start` | Serves the production build locally. |

## Repository Structure

```text
robert-tworek-portfolio/
+-- app/
|   +-- [locale]/
|   |   +-- layout.tsx
|   |   +-- page.tsx
|   +-- api/
|   |   +-- github/route.ts
|   |   +-- og/route.tsx
|   +-- globals.css
|   +-- robots.ts
|   +-- sitemap.ts
|   +-- siteMetadata.ts
+-- components/
|   +-- PortfolioExperience.tsx
+-- data/
|   +-- content.ts
+-- lib/
|   +-- github.ts
|   +-- utils.ts
+-- public/
|   +-- assets/
|   +-- Robert-Tworek-CV-EN.pdf
|   +-- Robert-Tworek-CV-PL.pdf
+-- package.json
+-- README.md
```

## Verification

Before publishing or deploying, run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Deployment

The project is ready for a standard Vercel deployment.

1. Import the repository into Vercel.
2. Keep the default Next.js build settings.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Optionally add `GITHUB_TOKEN`.
5. Verify `/pl`, `/en`, `/sitemap.xml`, `/robots.txt` and `/api/og` after deployment.
