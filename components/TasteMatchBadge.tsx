import type { RecipeRecommendationScore } from '@/types';
import { matchLabelColor, matchLabelText } from '@/lib/recommendation';

interface TasteMatchBadgeProps {
  score: RecipeRecommendationScore;
  compact?: boolean;
}

export function TasteMatchBadge({ score, compact }: TasteMatchBadgeProps) {
  if (score.matchLabel === 'okay' || score.matchLabel === 'skip') return null;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${matchLabelColor(score.matchLabel)}`}>
      {compact ? score.matchLabel === 'perfect' ? '✦ Match' : '↑ Match' : matchLabelText(score.matchLabel)}
    </span>
  );
}
