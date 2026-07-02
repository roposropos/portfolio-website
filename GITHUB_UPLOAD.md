# GitHub Upload Notes

This file is a short checklist for publishing or updating the portfolio repository.

## Suggested repository name

```text
portfolio-website
```

Alternative:

```text
robert-tworek-portfolio
```

## Suggested repository description

```text
Personal bilingual portfolio website built with Next.js, React, TypeScript and Tailwind CSS.
```

## Suggested homepage URL

```text
https://portfoliotworekrobert.vercel.app/pl
```

## Suggested topics

```text
nextjs react typescript tailwindcss portfolio personal-website github-api bilingual vercel responsive-design
```

## Updating the existing repository

If this project is already connected to Vercel, update the repository by replacing the files and committing to the production branch, usually `main`.

```bash
git add .
git commit -m "Update portfolio website"
git push
```

Vercel should automatically create a new deployment from the pushed commit.

## First upload

Run these commands from the project root only if the repository does not exist yet:

```bash
git init
git add .
git commit -m "Add personal portfolio website"
git branch -M main
git remote add origin https://github.com/roposropos/portfolio-website.git
git push -u origin main
```

If the repository has a different name, replace the remote URL.

## Files that should not be uploaded

The `.gitignore` already excludes generated and local files such as:

```text
node_modules
.next
out
dist
.env
.env.local
*.zip
tsconfig.tsbuildinfo
```

## GitHub profile README entry

Suggested row for the featured projects table:

```md
| [Personal Portfolio Website](https://github.com/roposropos/portfolio-website) | Next.js, React, TypeScript, Tailwind CSS | bilingual portfolio website presenting my projects, CV, technical profile and contact materials |
```

## Pinned repositories

Recommended pinned order:

1. `portfolio-website`
2. `pharmacy-management-system`
3. `restaurant-process-simulation`
4. `vocabulary-learning-app`
5. `tsp-algorithms-benchmark`

## Vercel deployment

For production, keep this environment variable in Vercel:

```text
NEXT_PUBLIC_SITE_URL=https://portfoliotworekrobert.vercel.app
```

`GITHUB_TOKEN` is optional. It only increases GitHub API limits for the public repository counter and project index.
