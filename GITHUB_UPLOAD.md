# GitHub Upload Notes

This file is a short checklist for publishing the portfolio repository.

## Suggested repository name

```text
robert-tworek-portfolio
```

Alternative:

```text
portfolio
```

## Suggested repository description

```text
Personal bilingual portfolio website built with Next.js, React, TypeScript and Tailwind CSS.
```

## Suggested topics

```text
nextjs react typescript tailwindcss portfolio personal-website github-api bilingual
```

## First upload

Run these commands from the project root:

```bash
git init
git add .
git commit -m "Add personal portfolio website"
git branch -M main
git remote add origin https://github.com/roposropos/robert-tworek-portfolio.git
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
| [Personal Portfolio Website](https://github.com/roposropos/robert-tworek-portfolio) | Next.js, React, TypeScript, Tailwind CSS | bilingual portfolio website presenting my projects, CV, technical profile and contact materials |
```

## Pinned repositories

Recommended pinned order:

1. `robert-tworek-portfolio`
2. `pharmacy-management-system`
3. `restaurant-process-simulation`
4. `vocabulary-learning-app`
5. `tsp-algorithms-benchmark`

## Vercel deployment

After pushing the repository to GitHub:

1. Go to Vercel.
2. Create a new project from the GitHub repository.
3. Keep the framework preset as Next.js.
4. Set the production environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

5. Optionally add `GITHUB_TOKEN` to increase GitHub API limits.
6. Deploy the project and add the live URL to GitHub.

Vercel's Git integration creates deployments from connected repositories, and its Next.js preset handles the framework build automatically.
