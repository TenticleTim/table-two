import Link from 'next/link';
import { ChefHat, Zap, CalendarDays, ShoppingCart, TrendingDown } from 'lucide-react';
import { ModeSelector } from '@/components/ModeSelector';
import { MealCard } from '@/components/MealCard';
import { VotingCard } from '@/components/VotingCard';
import { recipes } from '@/data/recipes';
import { pendingIdeas } from '@/data/ideas';
import { currentWeekPlan } from '@/data/meal-plans';
import { getRecipeById } from '@/data/recipes';

const todayDinner = getRecipeById('rec-027');
const featuredRecipes = recipes.filter(r => r.mode === 'Balanced').slice(0, 3);

export default function Dashboard() {
  const today = currentWeekPlan.days[5];
  const todayDinnerSlot = today?.meals.find(m => m.mealType === 'dinner');
  const tonightRecipe = todayDinnerSlot ? getRecipeById(todayDinnerSlot.recipeId) : undefined;

  return (
    <main className="page-container">
      {/* Greeting */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-herb">Saturday, May 23</p>
        <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Good evening, Matt &amp; Sarah 👋
        </h1>
        <p className="mt-1 text-gray-500">You have a dinner plan for tonight and 3 shared ideas pending.</p>
      </div>

      {/* Cook Tonight Hero */}
      <div className="mb-6 relative overflow-hidden rounded-4xl bg-ink px-8 py-8 text-white shadow-xl">
        <div className="relative z-10">
          <p className="mb-1 text-sm font-semibold text-white/60">Tonight's dinner</p>
          <h2 className="text-2xl font-black sm:text-3xl">
            {tonightRecipe?.image} {tonightRecipe?.title ?? 'Mushroom Risotto'}
          </h2>
          <p className="mt-1 text-white/70">{tonightRecipe?.time ?? '50 min'} • {tonightRecipe?.cuisine} • {tonightRecipe?.cost}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/today"
              className="flex items-center gap-2 rounded-2xl bg-herb px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <ChefHat size={16} /> View today's plan
            </Link>
            <button className="flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20">
              <Zap size={16} /> Cook Tonight
            </button>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl opacity-20 select-none">
          {tonightRecipe?.image ?? '🍄'}
        </div>
      </div>

      {/* Mode Selector */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-ink">What are we cooking?</h2>
        <ModeSelector />
      </section>

      {/* Quick stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Link href="/shopping" className="card p-4 hover:ring-herb transition-shadow">
          <ShoppingCart size={20} className="mb-2 text-herb" />
          <p className="text-2xl font-black text-ink">$97</p>
          <p className="text-xs text-gray-500">Est. grocery cost</p>
        </Link>
        <Link href="/insights" className="card p-4 hover:ring-herb transition-shadow">
          <TrendingDown size={20} className="mb-2 text-emerald-600" />
          <p className="text-2xl font-black text-ink">$42</p>
          <p className="text-xs text-gray-500">Saved vs meal kits</p>
        </Link>
        <Link href="/weekly" className="card p-4 hover:ring-herb transition-shadow">
          <CalendarDays size={20} className="mb-2 text-sky-600" />
          <p className="text-2xl font-black text-ink">7/7</p>
          <p className="text-xs text-gray-500">Days planned</p>
        </Link>
        <Link href="/pantry" className="card p-4 hover:ring-herb transition-shadow">
          <span className="mb-2 block text-xl">📦</span>
          <p className="text-2xl font-black text-ink">30</p>
          <p className="text-xs text-gray-500">Pantry items</p>
        </Link>
      </div>

      {/* Shared ideas snapshot */}
      {pendingIdeas.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-black text-ink">Pending dinner votes</h2>
              <p className="text-sm text-gray-500">Both of you haven't voted on these yet.</p>
            </div>
            <Link href="/ideas" className="text-sm font-semibold text-herb">See all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pendingIdeas.slice(0, 2).map(idea => (
              <VotingCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}

      {/* Discover section */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-black text-ink">Balanced picks for this week</h2>
            <p className="text-sm text-gray-500">Healthy, practical, and achievable.</p>
          </div>
          <Link href="/discover" className="text-sm font-semibold text-herb">Browse all →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featuredRecipes.map(recipe => (
            <MealCard key={recipe.id} meal={recipe} />
          ))}
        </div>
      </section>
    </main>
  );
}
