import { PageHeader } from '@/components/PageHeader';
import { PreferenceChip } from '@/components/PreferenceChip';
import { users } from '@/data/users';

const skillLabels = { beginner: 'Beginner 🌱', intermediate: 'Intermediate 🔥', advanced: 'Advanced 👨‍🍳' };
const budgetLabels = { cheap: 'Budget-friendly 💚', balanced: 'Balanced 🟡', elaborate: 'Splurge 💜' };
const healthGoalLabels = {
  balanced: 'Balanced',
  highProtein: 'High Protein 💪',
  lowCarb: 'Low Carb',
  plantBased: 'Plant-Based 🌱',
  weightLoss: 'Weight Loss',
  bulking: 'Bulking',
};

export default function PreferencesPage() {
  return (
    <main className="page-container">
      <PageHeader
        title="Preferences"
        subtitle="Personalize the experience for both of you."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {users.map(user => (
          <section key={user.id} className="card p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-2xl">
                {user.avatar}
              </div>
              <div>
                <h2 className="text-xl font-black text-ink">{user.name}</h2>
                <p className="text-sm text-gray-500">{skillLabels[user.preferences.skillLevel]}</p>
              </div>
              <button className="ml-auto rounded-2xl border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-cream transition-colors">
                Edit
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wide">Favorite proteins</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.favoriteProteins.map(p => (
                    <PreferenceChip key={p} label={p} color="green" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wide">Favorite vegetables</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.favoriteVegetables.map(v => (
                    <PreferenceChip key={v} label={v} color="green" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wide">Favorite cuisines</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.favoriteCuisines.map(c => (
                    <PreferenceChip key={c} label={c} color="blue" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wide">Dislikes / avoid</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.dislikedIngredients.map(d => (
                    <PreferenceChip key={d} label={d} color="red" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-cream p-3">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="font-bold text-ink text-sm">{budgetLabels[user.preferences.budgetLevel]}</p>
                </div>
                <div className="rounded-2xl bg-cream p-3">
                  <p className="text-xs text-gray-500 mb-1">Health goal</p>
                  <p className="font-bold text-ink text-sm">{healthGoalLabels[user.preferences.healthGoal]}</p>
                </div>
                <div className="rounded-2xl bg-cream p-3">
                  <p className="text-xs text-gray-500 mb-1">Max prep time</p>
                  <p className="font-bold text-ink text-sm">{user.preferences.prepTimeMax} min</p>
                </div>
                <div className="rounded-2xl bg-cream p-3">
                  <p className="text-xs text-gray-500 mb-1">Spice level</p>
                  <p className="font-bold text-ink text-sm">{'🌶️'.repeat(user.preferences.spiceLevel)}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Shared preferences summary */}
      <section className="mt-8 card p-6">
        <h2 className="mb-4 font-black text-ink">Household compatibility</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-semibold text-emerald-700 uppercase mb-2">Shared favorites</p>
            <div className="flex flex-wrap gap-1.5">
              {['chicken', 'eggs', 'shrimp'].map(p => (
                <PreferenceChip key={p} label={p} color="green" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-sky-50 p-4">
            <p className="text-xs font-semibold text-sky-700 uppercase mb-2">Shared cuisines</p>
            <div className="flex flex-wrap gap-1.5">
              {['Italian', 'Thai'].map(c => (
                <PreferenceChip key={c} label={c} color="blue" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-rose-50 p-4">
            <p className="text-xs font-semibold text-rose-700 uppercase mb-2">Both avoid</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-sm text-gray-500">No shared dislikes!</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
