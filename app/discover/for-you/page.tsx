import Link from 'next/link';
import { Sparkles, Settings } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { RecipeCard } from '@/components/RecipeCard';
import { RecommendationReasonCard } from '@/components/RecommendationReasonCard';
import { recipes } from '@/data/recipes';
import { mattTasteProfile, sarahTasteProfile, householdProfile } from '@/data/taste-profiles';
import { getRecommendedRecipes, getCompromiseMeals, matchLabelColor, matchLabelText } from '@/lib/recommendation';
import { users } from '@/data/users';

const forYou = getRecommendedRecipes(recipes, mattTasteProfile, sarahTasteProfile, householdProfile, 12);
const topPick = forYou[0];
const compromise = getCompromiseMeals(recipes, mattTasteProfile, sarahTasteProfile, householdProfile, 5);

const mattPicks = getRecommendedRecipes(recipes, mattTasteProfile, undefined, undefined, 6);
const sarahPicks = getRecommendedRecipes(recipes, sarahTasteProfile, undefined, undefined, 6);

export default function ForYouPage() {
  const [matt, sarah] = users;

  return (
    <main className="page-container">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-ink flex items-center gap-2">
            <Sparkles size={24} className="text-herb" />
            For You
          </h1>
          <p className="text-gray-500 mt-1">Recipes scored for your household's taste, budget, and lifestyle.</p>
        </div>
        <Link
          href="/settings/taste-profile"
          className="flex items-center gap-1.5 rounded-2xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-cream transition-colors shrink-0"
        >
          <Settings size={14} /> Edit tastes
        </Link>
      </div>

      {/* Top pick hero */}
      {topPick && (
        <section className="mb-8">
          <p className="text-xs font-bold text-herb uppercase tracking-widest mb-3">✦ Top household pick today</p>
          <div className="card p-5 sm:p-6">
            <div className="flex gap-5 flex-col sm:flex-row">
              <div className="flex h-36 w-full sm:w-36 sm:h-36 shrink-0 items-center justify-center rounded-2xl bg-cream text-6xl">
                {topPick.recipe.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${matchLabelColor(topPick.score.matchLabel)}`}>
                    {matchLabelText(topPick.score.matchLabel)}
                  </span>
                </div>
                <h2 className="text-xl font-black text-ink">{topPick.recipe.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{topPick.recipe.description}</p>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                  <span>⏱ {topPick.recipe.time}</span>
                  <span>{topPick.recipe.cost}</span>
                  <span>🏥 {topPick.recipe.health}/100</span>
                </div>
                {topPick.score.reasons.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {topPick.score.reasons.slice(0, 3).map((r, i) => (
                      <span key={i} className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Household recommendations */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-ink">Household picks</h2>
            <p className="text-sm text-gray-500">Scored for both {matt.name} and {sarah.name}</p>
          </div>
          <span className="text-xs text-gray-400">{matt.avatar}{sarah.avatar}</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {forYou.slice(1, 7).map(({ recipe, score }) => (
            <div key={recipe.id} className="flex flex-col gap-2">
              <RecipeCard recipe={recipe} score={score} />
            </div>
          ))}
        </div>
      </section>

      {/* Compromise meals */}
      {compromise.length > 0 && (
        <section className="mb-10">
          <h2 className="font-black text-ink mb-1">Compromise meals</h2>
          <p className="text-sm text-gray-500 mb-4">Works well for different preferences in your household</p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {compromise.slice(0, 3).map(({ recipe, score }) => (
              <div key={recipe.id} className="card p-4 flex gap-4 items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cream text-3xl">{recipe.image}</div>
                <div className="min-w-0">
                  <h3 className="font-bold text-ink text-sm leading-tight">{recipe.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{recipe.cuisine} · {recipe.time}</p>
                  {score.reasons[0] && (
                    <p className="text-xs text-emerald-600 mt-1">✓ {score.reasons[0]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Per-person picks */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Matt's picks */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{matt.avatar}</span>
            <div>
              <h2 className="font-black text-ink">{matt.name}'s picks</h2>
              <p className="text-xs text-gray-400">Based on {matt.name}'s taste profile</p>
            </div>
          </div>
          <div className="space-y-3">
            {mattPicks.slice(0, 4).map(({ recipe, score }) => (
              <div key={recipe.id} className="card p-3.5 flex gap-3 items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-2xl">{recipe.image}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink text-sm leading-tight truncate">{recipe.title}</h3>
                  <p className="text-xs text-gray-400">{recipe.cuisine} · {recipe.time}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${matchLabelColor(score.matchLabel)}`}>
                  {score.matchLabel === 'perfect' ? '✦' : score.matchLabel === 'great' ? '↑' : '·'} {score.matchLabel}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sarah's picks */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{sarah.avatar}</span>
            <div>
              <h2 className="font-black text-ink">{sarah.name}'s picks</h2>
              <p className="text-xs text-gray-400">Based on {sarah.name}'s taste profile</p>
            </div>
          </div>
          <div className="space-y-3">
            {sarahPicks.slice(0, 4).map(({ recipe, score }) => (
              <div key={recipe.id} className="card p-3.5 flex gap-3 items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-2xl">{recipe.image}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink text-sm leading-tight truncate">{recipe.title}</h3>
                  <p className="text-xs text-gray-400">{recipe.cuisine} · {recipe.time}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${matchLabelColor(score.matchLabel)}`}>
                  {score.matchLabel === 'perfect' ? '✦' : score.matchLabel === 'great' ? '↑' : '·'} {score.matchLabel}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/discover/by-ingredient" className="flex items-center gap-2 rounded-2xl bg-cream border border-gray-200 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50 transition-all">
          🥕 Browse by ingredient
        </Link>
        <Link href="/couple/taste-match" className="flex items-center gap-2 rounded-2xl bg-cream border border-gray-200 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50 transition-all">
          👫 Household taste match
        </Link>
        <Link href="/discover" className="flex items-center gap-2 rounded-2xl bg-cream border border-gray-200 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-gray-50 transition-all">
          🧭 All recipes
        </Link>
      </div>
    </main>
  );
}
