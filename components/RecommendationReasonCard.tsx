import type { RecipeRecommendationScore } from '@/types';
import { matchLabelColor, matchLabelText } from '@/lib/recommendation';

interface RecommendationReasonCardProps {
  score: RecipeRecommendationScore;
  userName?: string;
}

export function RecommendationReasonCard({ score, userName }: RecommendationReasonCardProps) {
  if (score.reasons.length === 0 && score.warnings.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-cream p-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${matchLabelColor(score.matchLabel)}`}>
          {matchLabelText(score.matchLabel)}
        </span>
        {userName && (
          <span className="text-xs text-gray-400">for {userName}</span>
        )}
      </div>

      {score.reasons.length > 0 && (
        <ul className="space-y-1">
          {score.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
              <span className="text-emerald-500 mt-0.5">✓</span>
              {r}
            </li>
          ))}
        </ul>
      )}

      {score.warnings.length > 0 && (
        <ul className="space-y-1">
          {score.warnings.map((w, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm text-rose-600">
              <span className="mt-0.5">!</span>
              {w}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
