import Link from 'next/link';
import { CalendarDays, ShoppingCart, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { currentWeekPlan } from '@/data/meal-plans';
import { getRecipeById } from '@/data/recipes';
import type { MealType } from '@/types';

const mealOrder: MealType[] = ['breakfast', 'lunch', 'dinner'];
const mealEmoji: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
};

export default function WeeklyPage() {
  const weekTotalCost = currentWeekPlan.days.reduce((total, day) => {
    return total + day.meals.reduce((dayTotal, slot) => {
      const recipe = getRecipeById(slot.recipeId);
      return dayTotal + (recipe?.costEstimate ?? 0);
    }, 0);
  }, 0);

  const allRecipes = currentWeekPlan.days.flatMap(d => d.meals.map(m => getRecipeById(m.recipeId))).filter(Boolean);
  const avgHealth = Math.round(allRecipes.reduce((sum, r) => sum + (r?.health ?? 0), 0) / allRecipes.length);
  const cuisines = [...new Set(allRecipes.map(r => r?.cuisine))].filter(Boolean);

  return (
    <main className="page-container">
      <PageHeader
        title="Weekly Planner"
        subtitle="May 18–24, 2026"
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-cream transition-colors">
              <RefreshCw size={14} /> Regenerate
            </button>
            <Link href="/shopping" className="flex items-center gap-2 rounded-2xl bg-herb px-4 py-2.5 text-sm font-bold text-white">
              <ShoppingCart size={14} /> Shopping list
            </Link>
          </div>
        }
      />

      {/* Week stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="card p-4">
          <p className="text-2xl font-black text-ink">${weekTotalCost.toFixed(0)}</p>
          <p className="text-xs text-gray-500">Week est. cost</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-black text-emerald-600">{avgHealth}</p>
          <p className="text-xs text-gray-500">Avg health score</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-black text-sky-600">{cuisines.length}</p>
          <p className="text-xs text-gray-500">Cuisines explored</p>
        </div>
      </div>

      {/* Weekly grid */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="min-w-[640px] grid grid-cols-7 gap-2">
          {/* Day headers */}
          {currentWeekPlan.days.map(day => (
            <div
              key={day.day}
              className={`rounded-2xl px-3 py-2 text-center text-sm font-bold ${
                day.date === '2026-05-23' ? 'bg-herb text-white' : 'bg-cream text-ink'
              }`}
            >
              <div>{day.day.slice(0, 3)}</div>
              <div className={`text-xs font-normal ${day.date === '2026-05-23' ? 'text-white/70' : 'text-gray-500'}`}>
                {new Date(day.date).getDate()}
              </div>
            </div>
          ))}

          {/* Meal rows */}
          {mealOrder.map(mealType => (
            currentWeekPlan.days.map(day => {
              const slot = day.meals.find(m => m.mealType === mealType);
              const recipe = slot ? getRecipeById(slot.recipeId) : undefined;
              return (
                <div
                  key={`${day.day}-${mealType}`}
                  className="card p-2.5 cursor-pointer hover:ring-herb transition-shadow min-h-[80px] flex flex-col"
                >
                  <span className="text-xs text-gray-400 mb-1">{mealEmoji[mealType]}</span>
                  {recipe ? (
                    <>
                      <span className="text-xl mb-1">{recipe.image}</span>
                      <p className="text-xs font-semibold text-ink leading-tight line-clamp-2">{recipe.title}</p>
                      <p className="text-xs text-gray-400 mt-auto">{recipe.cost}</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-300 mt-auto">+ Add</p>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">🌅 Breakfast</span>
        <span className="flex items-center gap-1.5">☀️ Lunch</span>
        <span className="flex items-center gap-1.5">🌙 Dinner</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded bg-herb" /> Today
        </span>
      </div>

      {/* Cuisine passport */}
      <section className="mt-8 card p-6">
        <h2 className="mb-1 font-bold text-ink flex items-center gap-2">
          🌍 Cuisine Passport — This Week
        </h2>
        <p className="mb-4 text-sm text-gray-500">You're exploring {cuisines.length} global cuisines.</p>
        <div className="flex flex-wrap gap-2">
          {cuisines.map(c => (
            <span key={c} className="rounded-full bg-cream px-3 py-1.5 text-sm font-semibold text-ink">{c}</span>
          ))}
        </div>
      </section>

      <div className="mt-4 text-center">
        <Link href="/discover" className="text-sm font-semibold text-herb">
          Browse recipes to fill empty slots →
        </Link>
      </div>
    </main>
  );
}
