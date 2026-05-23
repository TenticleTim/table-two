import type { RecipeRecommendationScore } from '@/types';
import { users } from '@/data/users';
import { matchLabelColor } from '@/lib/recommendation';

interface HouseholdTasteMatchCardProps {
  score: RecipeRecommendationScore;
}

export function HouseholdTasteMatchCard({ score }: HouseholdTasteMatchCardProps) {
  const [matt, sarah] = users;
  const pct = Math.min(100, Math.max(0, score.coupleMatchScore + 30));

  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Household match</p>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex -space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cream ring-2 ring-white text-sm">{matt.avatar}</div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cream ring-2 ring-white text-sm">{sarah.avatar}</div>
        </div>
        <div>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${matchLabelColor(score.matchLabel)}`}>
            {score.coupleMatchScore >= 50 ? 'Both will love this' :
             score.coupleMatchScore >= 25 ? 'Good for both' :
             score.coupleMatchScore >= 10 ? 'Compromise meal' :
             'Mixed opinions'}
          </span>
        </div>
      </div>

      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-herb transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      {score.reasons.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">{score.reasons[0]}</p>
      )}

      {score.warnings.length > 0 && (
        <p className="mt-1 text-xs text-rose-500">{score.warnings[0]}</p>
      )}
    </div>
  );
}
