# TableTwo

A private couple-focused meal planning app designed to replace expensive meal kits with smarter personalized recipes, shared dinner decisions, budget-aware grocery planning, and healthy balanced meals.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel deployment
- Supabase-ready private household data model
- GitHub + Claude Code friendly project structure

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Vercel

1. Push this folder to GitHub.
2. Import the GitHub repo into Vercel.
3. Add environment variables when Supabase/auth are connected.
4. Deploy.

## Product direction

TableTwo should become a private kitchen operating system for two people:

- Taste profiles for each person
- Shared dinner idea voting
- Cheap, balanced, elaborate, emergency, and meal-prep modes
- Grocery list generated from the weekly plan
- Pantry-aware planning
- Cuisine exploration across global food cultures
- Skill-level adapted cooking instructions
- Leftover strategy
- Health and budget balance

## Suggested next build steps for Claude Code

1. Add Supabase auth and a `households` table.
2. Persist profiles, recipes, meal plans, grocery items, and shared votes.
3. Add recipe generation with a server route using your preferred AI provider.
4. Add invite-only couple access.
5. Add iOS PWA support, then wrap with Capacitor if App Store distribution is needed.
