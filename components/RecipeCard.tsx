import { Clock, Plus } from 'lucide-react';
import type { Recipe, RecipeRecommendationScore } from '@/types';
import { modeColor, modeLabel } from '@/lib/utils';
import { BudgetBadge } from '@/components/BudgetBadge';
import { NutritionBar } from '@/components/NutritionBar';
import { TasteMatchBadge } from '@/components/TasteMatchBadge';

interface RecipeCardProps {
  recipe: Recipe;
  score?: RecipeRecommendationScore;
}

export function RecipeCard({ recipe, score }: RecipeCardProps) {
  return (
    <article className="card p-5 flex flex-col hover:ring-herb transition-shadow group">
      <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-cream text-5xl group-hover:scale-105 transition-transform relative">
        {recipe.image}
        {score && score.matchLabel !== 'okay' && score.matchLabel !== 'skip' && (
          <div className="absolute top-2 right-2">
            <TasteMatchBadge score={score} compact />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${modeColor(recipe.mode)}`}>
          {modeLabel(recipe.mode)}
        </span>
        {score && <TasteMatchBadge score={score} />}
      </div>

      <h3 className="font-bold text-ink leading-snug">{recipe.title}</h3>
      <p className="mt-1 text-xs text-gray-500">{recipe.cuisine}</p>

      {/* Taste reasons */}
      {score && score.reasons.length > 0 && (
        <p className="mt-1.5 text-xs text-emerald-600 leading-snug">
          ✓ {score.reasons[0]}
        </p>
      )}

      {/* Warnings */}
      {score && score.warnings.length > 0 && (
        <p className="mt-1 text-xs text-rose-500 leading-snug">
          ! {score.warnings[0]}
        </p>
      )}

      <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
        <span className="flex items-center gap-1"><Clock size={13} />{recipe.time}</span>
        <BudgetBadge cost={recipe.cost} size="sm" />
        <span className="ml-auto text-xs">Serves {recipe.servings}</span>
      </div>

      <div className="mt-3">
        <NutritionBar nutrition={recipe.nutrition} health={recipe.health} compact />
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-herb px-3 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
          <Plus size={14} /> Add to plan
        </button>
        <button className="flex items-center justify-center gap-1 rounded-2xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-cream">
          💡 Share idea
        </button>
      </div>
    </article>
  );
}
