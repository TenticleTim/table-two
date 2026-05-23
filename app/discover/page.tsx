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
