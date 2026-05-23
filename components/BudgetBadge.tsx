interface BudgetBadgeProps {
  cost: '$' | '$$' | '$$$';
  size?: 'sm' | 'md';
}

export function BudgetBadge({ cost, size = 'md' }: BudgetBadgeProps) {
  const colors = {
    '$': 'bg-emerald-100 text-emerald-800',
    '$$': 'bg-amber-100 text-amber-800',
    '$$$': 'bg-rose-100 text-rose-800',
  };
  const labels = { '$': 'Budget', '$$': 'Moderate', '$$$': 'Splurge' };
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${colors[cost]} ${padding}`}>
      {cost} <span className="opacity-70">{labels[cost]}</span>
    </span>
  );
}
