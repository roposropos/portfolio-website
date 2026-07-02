<div align="center">

# Robert Tworek Portfolio

**Bilingual personal portfolio built as a polished project showcase for academic and technical work.**

<p>
  <a href="https://portfoliotworekrobert.vercel.app/pl">
    <img src="https://img.shields.io/badge/website-live-7C3AED?style=for-the-badge&logo=vercel&logoColor=white" alt="Live website">
  </a>
  <a href="https://github.com/roposropos">
    <img src="https://img.shields.io/badge/github-roposropos-1F1733?style=for-the-badge&logo=github&logoColor=white" alt="GitHub profile">
  </a>
  <a href="https://linkedin.com/in/tworekrobert">
    <img src="https://img.shields.io/badge/linkedin-tworekrobert-7C3AED?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn profile">
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16.2-1F1733?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-7C3AED?style=for-the-badge&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-6-1F1733?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 6">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-7C3AED?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/GitHub%20API-live%20index-1F1733?style=for-the-badge&logo=github&logoColor=white" alt="GitHub API">
</p>

<p>
  <a href="#about">About</a> |
  <a href="#main-features">Features</a> |
  <a href="#project-sections">Project sections</a> |
  <a href="#architecture">Architecture</a> |
  <a href="#quick-start">Quick start</a> |
  <a href="#deployment">Deployment</a>
</p>

</div>

## About

This repository contains my personal portfolio website, designed as a project in itself rather than a simple online CV. The goal is to present my academic projects, education, technical focus and contact materials in a way that feels modern, readable and consistent with my GitHub profile and CV visual identity.

The site is built around a violet visual system, bilingual content, interactive project case studies and a live GitHub repository index. It highlights complete, runnable projects instead of isolated code snippets and connects each project with a clear technical context: stack, role, scope, implementation details and repository links.

## Main Features

| Area | Implementation |
| --- | --- |
| Bilingual experience | Polish and English versions available under `/pl` and `/en`, with language-specific copy and CV files. |
| Portfolio hero | First-screen presentation with CV download, GitHub, LinkedIn and project navigation actions. |
| Project case studies | Interactive section for selected academic projects with filters, stack tags, metrics, role descriptions and technical proof points. |
| Live GitHub index | Public repositories are fetched from the GitHub API, filtered to exclude the profile README repository and displayed as direct project cards. |
| Dynamic project counter | The number of complete GitHub projects updates from the public repository list instead of being hardcoded. |
| Contact section | Email composer, email copy action, LinkedIn, GitHub and language-specific CV download. |
| SEO and sharing | Metadata, sitemap, robots route, generated OpenGraph image and branded RT favicon. |
| Visual consistency | Violet color system, dense project-focused layout, responsive spacing, motion details and GitHub/LinkedIn icon treatment. |

## Project Sections

| Section | Purpose |
| --- | --- |
| Hero | Introduces Robert Tworek, studies, technical profile and primary links. |
| Profile summary | Shows education, complete GitHub project count and language level in a compact recruiter-friendly format. |
| Selected academic projects | Presents the main project case studies: Pharmacy Management System, Restaurant Process Simulation and Vocabulary Learning App. |
| All GitHub projects | Pulls public repositories from GitHub and displays them as direct links with language, description, topics and update date. |
| Technologies | Groups tools and technologies by practical area: applications, backend, databases, systems, networks and engineering tooling. |
| Education | Shows Technical Computer Science at Wroclaw University of Science and Technology and the IT technician background. |
| Contact | Provides email, LinkedIn, GitHub and CV actions in one consistent section. |

## Main Projects Presented

| Project | Stack | Portfolio focus |
| --- | --- | --- |
| [pharmacy-management-system](https://github.com/roposropos/pharmacy-management-system) | C#, .NET, Avalonia UI, PostgreSQL, ODBC | Desktop pharmacy management system with customers, medicines, sales, prescriptions, inventory, reports, roles, audit logs and database-backed workflows. |
| [restaurant-process-simulation](https://github.com/roposropos/restaurant-process-simulation) | Java 17, Swing, TCP sockets, Bash | Academic multi-process restaurant simulation with client-server communication, resource allocation, scenario modes and live GUI visualization. |
| [vocabulary-learning-app](https://github.com/roposropos/vocabulary-learning-app) | Python, Django, Django REST Framework, SQLite, HTML/CSS/JS | Team web application for vocabulary learning with user accounts, word sets, flashcards, typed answers, quizzes and progress tracking. |
| [tsp-algorithms-benchmark](https://github.com/roposropos/tsp-algorithms-benchmark) | C++, Python, CSV | Benchmark repository for exact algorithms, heuristics and metaheuristics for TSP and ATSP problems. |
| [bilingual-portfolio-website](https://github.com/roposropos/bilingual-portfolio-website) | Next.js, React, TypeScript, Tailwind CSS | This portfolio project with bilingual content, GitHub API integration, CV downloads, contact actions and generated social preview. |

## Technical Highlights

- Next.js App Router with localized routes and server-side metadata generation.
- React 19 client components for filtering, selected project details and contact interactions.
- TypeScript-first content model stored in `data/content.ts`.
- GitHub API integration with server-side revalidation and a no-store refresh endpoint.
- Dynamic repository cards based on repository name, description, language, topics, stars, forks and update date.
- `mailto:` composer that builds an email from subject and message fields without storing user input.
- Generated OpenGraph image through `next/og`, matching the violet RT visual identity.
- Responsive design tuned for desktop and mobile portfolio browsing.
- Separate Polish and English CV files in `public/`.

## Architecture

| Path | Responsibility |
| --- | --- |
| `app/[locale]/page.tsx` | Locale-aware portfolio page, metadata and initial GitHub repository data. |
| `app/api/github/route.ts` | Fresh GitHub API endpoint used by the client to update repository data after page load. |
| `app/api/og/route.tsx` | Dynamic OpenGraph image rendered with the RT identity and project focus. |
| `components/PortfolioExperience.tsx` | Main interactive portfolio UI: hero, filters, project details, GitHub index, stack, education and contact. |
| `data/content.ts` | Polish and English content source for navigation, hero, projects, technologies, education and contact text. |
| `lib/github.ts` | GitHub API client with optional token support and cache behavior. |
| `app/globals.css` | Global visual system, color variables, reusable effects and responsive styling support. |
| `public/` | CV files and visual assets used by the portfolio. |

## Repository Structure

```text
robert-tworek-portfolio/
|-- app/
|   |-- [locale]/
|   |-- api/
|   |   |-- github/
|   |   `-- og/
|   |-- globals.css
|   |-- robots.ts
|   |-- siteMetadata.ts
|   `-- sitemap.ts
|-- components/
|   `-- PortfolioExperience.tsx
|-- data/
|   `-- content.ts
|-- lib/
|   |-- github.ts
|   `-- utils.ts
|-- public/
|   |-- Robert-Tworek-CV-EN.pdf
|   |-- Robert-Tworek-CV-PL.pdf
|   `-- assets/
|-- package.json
`-- README.md
```

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Interaction | Motion, Lucide React icons |
| Data | Static typed content, GitHub REST API |
| SEO | Next metadata API, sitemap, robots, dynamic OpenGraph image |
| Tooling | pnpm, ESLint, TypeScript compiler |
| Deployment | Vercel-ready Next.js application |

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

## Environment Variables

Create a local environment file based on `.env.example`:

```bash
cp .env.example .env.local
```

Available variables:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public website URL used by metadata, sitemap, robots and OpenGraph image URLs. |
| `GITHUB_TOKEN` | Optional | GitHub token used to increase API limits for the live repository counter and project index. |

Example:

```bash
NEXT_PUBLIC_SITE_URL=https://portfoliotworekrobert.vercel.app
GITHUB_TOKEN=github_pat_or_classic_token
```

The application also works without `GITHUB_TOKEN`, but production deployments can hit public GitHub API rate limits more easily without it.

## Quality Checks

Run type checking:

```bash
pnpm typecheck
```

Run linting:

```bash
pnpm lint
```

Build the production version:

```bash
pnpm build
```

Start the production server locally:

```bash
pnpm start
```

## Design Notes

The visual direction follows the same violet identity used across the website, CV files and GitHub profile. The layout intentionally avoids a generic landing-page structure and focuses on what matters for a technical portfolio: real projects, readable case studies, repository links, concise metrics, education and direct contact actions.

## Future Improvements

- Add a static screenshot generated from the deployed website to the repository README.
- Add GitHub Actions for lint, typecheck and production build verification.
- Add optional project screenshots only when every main project has a consistent visual preview.
- Add structured project metadata that could later be shared between the website and repository READMEs.

<p>
  <a href="https://portfoliotworekrobert.vercel.app/pl">Portfolio</a> |
  <a href="https://github.com/roposropos">GitHub</a> |
  <a href="https://linkedin.com/in/tworekrobert">LinkedIn</a>
</p>
