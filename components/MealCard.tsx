import { Clock, Heart, ShoppingBasket, Sparkles } from 'lucide-react';
import type { Recipe } from '@/types';
import { modeColor, modeLabel } from '@/lib/utils';
import { BudgetBadge } from '@/components/BudgetBadge';
import { NutritionBar } from '@/components/NutritionBar';

interface MealCardProps {
  meal: Recipe;
  compact?: boolean;
}

export function MealCard({ meal, compact = false }: MealCardProps) {
  if (compact) {
    return (
      <article className="card flex items-center gap-4 p-4">
        <div className="text-3xl">{meal.image}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-herb">{meal.cuisine}</p>
          <h3 className="font-bold text-ink truncate">{meal.title}</h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock size={11} />{meal.time}</span>
            <span>{meal.nutrition.calories} kcal</span>
          </div>
        </div>
        <BudgetBadge cost={meal.cost} size="sm" />
      </article>
    );
  }

  return (
    <article className="card p-5 flex flex-col">
      <div className="mb-4 flex h-24 items-center justify-center rounded-2xl bg-cream text-5xl">
        {meal.image}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${modeColor(meal.mode)}`}>
              {modeLabel(meal.mode)}
            </span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {meal.cuisine}
            </span>
          </div>
          <h3 className="text-lg font-bold leading-snug text-ink">{meal.title}</h3>
        </div>
        <BudgetBadge cost={meal.cost} size="sm" />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">{meal.description}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-2xl bg-cream p-2.5">
          <div className="font-bold text-ink">{meal.time}</div>
          <div className="text-gray-500">Time</div>
        </div>
        <div className="rounded-2xl bg-cream p-2.5">
          <div className="font-bold text-ink">{meal.health}</div>
          <div className="text-gray-500">Health</div>
        </div>
        <div className="rounded-2xl bg-cream p-2.5">
          <div className="font-bold text-ink">{meal.pantryMatch}%</div>
          <div className="text-gray-500">Pantry</div>
        </div>
      </div>

      <div className="mt-4">
        <NutritionBar nutrition={meal.nutrition} health={meal.health} compact />
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-herb px-3 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          <Heart size={14} /> Add to ideas
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-ink px-3 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          <ShoppingBasket size={14} /> Add to list
        </button>
      </div>
      <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-cream">
        <Sparkles size={14} /> Remix this meal
      </button>
    </article>
  );
}
