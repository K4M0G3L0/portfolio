# Kamogelo Kgashane — Portfolio

AI Solutions Architect · Technical Founder · Systems Builder

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (next-mdx-remote)
- **Database**: PostgreSQL (Prisma)
- **API**: GitHub API (Octokit)
- **Deployment**: Vercel

## Pages
- `/` — Home with live build status
- `/about` — Story arc + services
- `/projects` — Engineering case studies
- `/build` — LUMA AIOS live build (Day X/90)
- `/writing` — Technical articles
- `/lab` — Experiments and notes
- `/contact` — Contact form

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in GITHUB_TOKEN and DATABASE_URL

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

## GitHub API Integration

Create a Personal Access Token at https://github.com/settings/tokens
with `public_repo` scope. Add it as `GITHUB_TOKEN` in your `.env.local`.

The Live Build page (`/build`) pulls real commits from `K4M0G3L0/luma-aios`
and displays them with AI-generated summaries.

## Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

Update `BUILD_CURRENT_DAY` in Vercel environment variables daily.

## Content

Technical articles go in `content/writing/` as `.mdx` files.
Project case studies go in `content/projects/` as `.mdx` files.

Frontmatter:
```yaml
---
title: Article Title
description: Brief description
date: YYYY-MM-DD
tags: [AI Engineering, Agents]
status: published
featured: true
---
```
