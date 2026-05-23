import type { UserTasteProfile, PreferenceStrength } from '@/types';

interface TasteProfileSummaryProps {
  profile: UserTasteProfile;
  name: string;
  avatar: string;
}

const STRENGTH_EMOJI: Record<PreferenceStrength, string> = {
  love: '😍',
  like: '👍',
  neutral: '😐',
  dislike: '👎',
  never: '🚫',
};

const STRENGTH_CHIP: Record<PreferenceStrength, string> = {
  love: 'bg-rose-50 text-rose-700 border-rose-200',
  like: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  neutral: 'bg-gray-50 text-gray-500 border-gray-100',
  dislike: 'bg-orange-50 text-orange-700 border-orange-200',
  never: 'bg-red-50 text-red-700 border-red-200',
};

function chips(items: { ingredient: string; strength: PreferenceStrength }[], filter: PreferenceStrength[]) {
  return items.filter(i => filter.includes(i.strength));
}

export function TasteProfileSummary({ profile, name, avatar }: TasteProfileSummaryProps) {
  const lovedProteins = chips(profile.proteins, ['love']);
  const lovedVeg = chips(profile.vegetables, ['love']);
  const avoidedAll = [
    ...chips(profile.proteins, ['never', 'dislike']),
    ...chips(profile.vegetables, ['never', 'dislike']),
    ...chips(profile.dairy, ['never', 'dislike']),
  ];
  const lovedCuisines = profile.cuisines.filter(c => c.strength === 'love' || c.strength === 'like');
  const avoidedCuisines = profile.cuisines.filter(c => c.strength === 'dislike' || c.strength === 'never');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-2xl">{avatar}</div>
        <div>
          <h2 className="text-xl font-black text-ink">{name}</h2>
          <p className="text-sm text-gray-500">{profile.cookingSkill} cook · max {profile.maxWeeknightCookTime} min weeknights</p>
        </div>
      </div>

      {/* Loved proteins */}
      {lovedProteins.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Favourite proteins</p>
          <div className="flex flex-wrap gap-1.5">
            {lovedProteins.map(p => (
              <span key={p.ingredient} className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${STRENGTH_CHIP[p.strength]}`}>
                {STRENGTH_EMOJI[p.strength]} {p.ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Loved vegetables */}
      {lovedVeg.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Favourite vegetables</p>
          <div className="flex flex-wrap gap-1.5">
            {lovedVeg.map(p => (
              <span key={p.ingredient} className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${STRENGTH_CHIP[p.strength]}`}>
                {STRENGTH_EMOJI[p.strength]} {p.ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cuisine preferences */}
      {lovedCuisines.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Cuisines you enjoy</p>
          <div className="flex flex-wrap gap-1.5">
            {lovedCuisines.map(c => (
              <span key={c.cuisine} className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${STRENGTH_CHIP[c.strength]}`}>
                {STRENGTH_EMOJI[c.strength]} {c.cuisine}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Avoided foods */}
      {avoidedAll.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Avoids / dislikes</p>
          <div className="flex flex-wrap gap-1.5">
            {avoidedAll.slice(0, 10).map(p => (
              <span key={p.ingredient} className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${STRENGTH_CHIP[p.strength]}`}>
                {STRENGTH_EMOJI[p.strength]} {p.ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Avoided cuisines */}
      {avoidedCuisines.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Avoided cuisines</p>
          <div className="flex flex-wrap gap-1.5">
            {avoidedCuisines.map(c => (
              <span key={c.cuisine} className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${STRENGTH_CHIP[c.strength]}`}>
                {STRENGTH_EMOJI[c.strength]} {c.cuisine}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Budget + health goals */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-cream p-3">
          <p className="text-xs text-gray-500 mb-1">Budget preference</p>
          <p className="font-bold text-ink text-sm capitalize">{profile.budgetPreference}</p>
        </div>
        <div className="rounded-2xl bg-cream p-3">
          <p className="text-xs text-gray-500 mb-1">Health goals</p>
          <p className="font-bold text-ink text-sm capitalize">{profile.healthGoals.join(', ')}</p>
        </div>
        <div className="rounded-2xl bg-cream p-3">
          <p className="text-xs text-gray-500 mb-1">Spice level</p>
          <p className="font-bold text-ink text-sm">{'🌶️'.repeat(profile.spicePreference)}</p>
        </div>
        <div className="rounded-2xl bg-cream p-3">
          <p className="text-xs text-gray-500 mb-1">Meal prep</p>
          <p className="font-bold text-ink text-sm">{profile.mealPrepInterest ? 'Interested' : 'Not interested'}</p>
        </div>
      </div>
    </div>
  );
}
