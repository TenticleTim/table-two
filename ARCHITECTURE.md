# Architecture Notes

## Suggested production stack

- Frontend: Next.js + TypeScript + Tailwind
- Hosting: Vercel
- Database/auth: Supabase
- AI recipe engine: server-only API route, never expose keys client-side
- iOS: PWA first, Capacitor wrapper later if needed

## Core tables

```sql
profiles(id, display_name, skill_level, allergies, dislikes, likes, spice_level)
households(id, name, created_by)
household_members(household_id, profile_id, role)
recipes(id, title, cuisine, mode, ingredients, steps, nutrition, cost_estimate)
meal_plans(id, household_id, date, meal_type, recipe_id)
grocery_items(id, household_id, name, quantity, category, checked, source_recipe_id)
votes(id, household_id, profile_id, recipe_id, vote, note)
pantry_items(id, household_id, name, quantity, expires_at)
```

## Privacy principles

- Each household is invite-only.
- Row-level security in Supabase should restrict all reads/writes by household membership.
- AI requests should send only the minimum needed preference data.
- Do not train or publish private recipes by default.
