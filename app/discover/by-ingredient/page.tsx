'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { RecipeCard } from '@/components/RecipeCard';
import { recipes } from '@/data/recipes';
import { mattTasteProfile } from '@/data/taste-profiles';
import { getRecipesByLikedIngredient, scoreRecipeForUser } from '@/lib/recommendation';

const QUICK_PICKS = [
  { label: '🍗 Chicken', ingredient: 'chicken' },
  { label: '🐟 Salmon', ingredient: 'salmon' },
  { label: '🥚 Eggs', ingredient: 'eggs' },
  { label: '🥦 Broccoli', ingredient: 'broccoli' },
  { label: '🧀 Cheese', ingredient: 'cheese' },
  { label: '🍝 Pasta', ingredient: 'pasta' },
  { label: '🍚 Rice', ingredient: 'rice' },
  { label: '🍄 Mushrooms', ingredient: 'mushrooms' },
  { label: '🍅 Tomatoes', ingredient: 'tomatoes' },
  { label: '🌿 Spinach', ingredient: 'spinach' },
  { label: '🥑 Avocado', ingredient: 'avocado' },
  { label: '🍠 Sweet Potato', ingredient: 'sweet potato' },
  { label: '🫘 Lentils', ingredient: 'lentils' },
  { label: '🥩 Beef', ingredient: 'beef' },
  { label: '🍤 Shrimp', ingredient: 'shrimp' },
];

export default function ByIngredientPage() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');

  const searchTerm = selected || query.trim().toLowerCase();

  const results = searchTerm
    ? getRecipesByLikedIngredient(recipes, searchTerm, mattTasteProfile)
    : [];

  function selectIngredient(ing: string) {
    setSelected(ing);
    setQuery('');
  }

  return (
    <main className="page-container">
      <PageHeader
        title="Find by ingredient"
        subtitle="Tell us what you have and we'll find the best recipes."
      />

      {/* Search */}
      <div className="mb-5 relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Type an ingredient…"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(''); }}
          className="w-full rounded-2xl border border-gray-200 bg-white pl-10 pr-4 py-3 text-sm font-medium outline-none focus:border-herb focus:ring-2 focus:ring-herb/20 transition"
        />
      </div>

      {/* Quick picks */}
      <div className="mb-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Quick picks</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_PICKS.map(({ label, ingredient }) => (
            <button
              key={ingredient}
              onClick={() => selectIngredient(ingredient)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all ${
                selected === ingredient
                  ? 'border-herb bg-herb text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-cream'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {searchTerm && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-black text-ink">
              {results.length} recipe{results.length !== 1 ? 's' : ''} with <span className="text-herb">{searchTerm}</span>
            </h2>
            {(selected || query) && (
              <button onClick={() => { setSelected(''); setQuery(''); }} className="text-xs text-gray-400 hover:text-rose-500">
                Clear ✕
              </button>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map(({ recipe, score }) => (
                <RecipeCard key={recipe.id} recipe={recipe} score={score} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-cream p-8 text-center">
              <p className="text-3xl mb-2">🔍</p>
              <p className="font-bold text-ink">No recipes found for "{searchTerm}"</p>
              <p className="text-sm text-gray-500 mt-1">Try a different ingredient or browse all recipes.</p>
            </div>
          )}
        </section>
      )}

      {!searchTerm && (
        <div className="rounded-3xl bg-cream p-8 text-center">
          <p className="text-3xl mb-2">🥕</p>
          <p className="font-bold text-ink">What's in your fridge?</p>
          <p className="text-sm text-gray-500 mt-1">Pick an ingredient above and we'll find the best recipes for it.</p>
        </div>
      )}
    </main>
  );
}
