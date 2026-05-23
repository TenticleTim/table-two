import Link from 'next/link';
import { Sparkles, Search, Users } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { RecipeCard } from '@/components/RecipeCard';
import { recipes } from '@/data/recipes';

const modeFilters = ['All', 'Cheap', 'Balanced', 'MealPrep', 'DateNight', 'Emergency', 'Elaborate'];
const cuisineFilters = ['All', 'Japanese', 'Italian', 'Mexican', 'Korean', 'Indian', 'Mediterranean', 'Thai', 'American', 'NorthAfrican'];

export default function DiscoverPage() {
  return (
    <main className="page-container">
      <PageHeader
        title="Discover Recipes"
        subtitle={`${recipes.length} recipes across 10 cuisines`}
      />

      {/* Taste intelligence shortcuts */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Link href="/discover/for-you" className="flex items-center gap-3 rounded-2xl bg-herb p-4 text-white hover:opacity-90 transition-opacity">
          <Sparkles size={20} />
          <div>
            <p className="font-bold text-sm">For You ✦</p>
            <p className="text-xs text-white/70">Personalised picks</p>
          </div>
        </Link>
        <Link href="/discover/by-ingredient" className="flex items-center gap-3 rounded-2xl bg-white border border-gray-200 p-4 hover:bg-cream transition-colors">
          <Search size={20} className="text-herb" />
          <div>
            <p className="font-bold text-sm text-ink">By ingredient</p>
            <p className="text-xs text-gray-400">Search what you have</p>
          </div>
        </Link>
        <Link href="/couple/taste-match" className="flex items-center gap-3 rounded-2xl bg-white border border-gray-200 p-4 hover:bg-cream transition-colors">
          <Users size={20} className="text-herb" />
          <div>
            <p className="font-bold text-sm text-ink">Taste Match</p>
            <p className="text-xs text-gray-400">Household compatibility</p>
          </div>
        </Link>
      </div>

      {/* Mode filter pills */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Mode</p>
        <div className="flex flex-wrap gap-2">
          {modeFilters.map(f => (
            <button
              key={f}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                f === 'All'
                  ? 'border-herb bg-herb text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-cream'
              }`}
            >
              {f === 'MealPrep' ? 'Meal Prep' : f === 'DateNight' ? 'Date Night' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine filter pills */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Cuisine</p>
        <div className="flex flex-wrap gap-2">
          {cuisineFilters.map(f => (
            <button
              key={f}
              className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-600 hover:bg-cream transition-colors"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
