import { Clock, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { MealCard } from '@/components/MealCard';
import { NutritionBar } from '@/components/NutritionBar';
import { todayPlan } from '@/data/meal-plans';
import { getRecipeById } from '@/data/recipes';
import type { MealType } from '@/types';

const mealTypeConfig: Record<MealType, { label: string; emoji: string; time: string }> = {
  breakfast: { label: 'Breakfast', emoji: '🌅', time: '8:00 AM' },
  lunch: { label: 'Lunch', emoji: '☀️', time: '12:30 PM' },
  dinner: { label: 'Dinner', emoji: '🌙', time: '7:00 PM' },
  snack: { label: 'Snack', emoji: '🍎', time: '3:30 PM' },
};

export default function TodayPage() {
  const meals = todayPlan.meals
    .map(slot => ({ ...slot, recipe: getRecipeById(slot.recipeId) }))
    .filter(m => m.recipe != null);

  const totalCalories = meals.reduce((sum, m) => sum + (m.recipe?.nutrition.calories ?? 0), 0);
  const totalProtein = meals.reduce((sum, m) => sum + (m.recipe?.nutrition.protein ?? 0), 0);
  const avgHealth = Math.round(meals.reduce((sum, m) => sum + (m.recipe?.health ?? 0), 0) / meals.length);
  const totalCost = meals.reduce((sum, m) => sum + (m.recipe?.costEstimate ?? 0), 0);

  return (
    <main className="page-container">
      <PageHeader
        title="Today's Meals"
        subtitle="Saturday, May 23 — your full day plan"
        action={
          <button className="flex items-center gap-2 rounded-2xl bg-ink px-4 py-2.5 text-sm font-bold text-white">
            <RefreshCw size={14} /> Regenerate
          </button>
        }
      />

      {/* Day summary */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total calories', value: `${totalCalories} kcal`, color: 'text-amber-600' },
          { label: 'Total protein', value: `${totalProtein}g`, color: 'text-sky-600' },
          { label: 'Avg health score', value: `${avgHealth}/100`, color: 'text-emerald-600' },
          { label: 'Est. food cost', value: `$${totalCost.toFixed(0)}`, color: 'text-herb' },
        ].map(stat => (
          <div key={stat.label} className="card p-4">
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Meals timeline */}
      <div className="space-y-6">
        {meals.map(({ mealType, recipe }) => {
          const config = mealTypeConfig[mealType];
          return (
            <section key={mealType}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{config.emoji}</span>
                <div>
                  <h2 className="text-lg font-black text-ink">{config.label}</h2>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {config.time}
                  </p>
                </div>
                <button className="ml-auto flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-cream transition-colors">
                  <RefreshCw size={11} /> Swap
                </button>
              </div>
              {recipe && <MealCard meal={recipe} compact />}
            </section>
          );
        })}
      </div>

      {/* Day nutrition breakdown */}
      <div className="mt-8 card p-6">
        <h3 className="mb-4 font-bold text-ink">Day nutrition breakdown</h3>
        {meals[0]?.recipe && (
          <NutritionBar
            nutrition={{
              calories: totalCalories,
              protein: totalProtein,
              carbs: meals.reduce((sum, m) => sum + (m.recipe?.nutrition.carbs ?? 0), 0),
              fat: meals.reduce((sum, m) => sum + (m.recipe?.nutrition.fat ?? 0), 0),
              fiber: meals.reduce((sum, m) => sum + (m.recipe?.nutrition.fiber ?? 0), 0),
            }}
            health={avgHealth}
          />
        )}
      </div>
    </main>
  );
}
