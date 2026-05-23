export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCost(estimate: number): string {
  return `$${estimate.toFixed(2)}`;
}

export function costSymbol(cost: '$' | '$$' | '$$$'): { label: string; color: string } {
  return {
    '$': { label: '$', color: 'text-emerald-600 bg-emerald-50' },
    '$$': { label: '$$', color: 'text-amber-600 bg-amber-50' },
    '$$$': { label: '$$$', color: 'text-rose-600 bg-rose-50' },
  }[cost];
}

export function healthColor(score: number): string {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-rose-600';
}

export function modeColor(mode: string): string {
  const map: Record<string, string> = {
    Cheap: 'bg-emerald-100 text-emerald-800',
    Balanced: 'bg-sky-100 text-sky-800',
    Elaborate: 'bg-violet-100 text-violet-800',
    MealPrep: 'bg-amber-100 text-amber-800',
    DateNight: 'bg-rose-100 text-rose-800',
    Emergency: 'bg-orange-100 text-orange-800',
  };
  return map[mode] ?? 'bg-gray-100 text-gray-800';
}

export function modeLabel(mode: string): string {
  const map: Record<string, string> = {
    MealPrep: 'Meal Prep',
    DateNight: 'Date Night',
  };
  return map[mode] ?? mode;
}

export function expiryColor(expiresAt: string | null): string {
  if (!expiresAt) return '';
  const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000);
  if (days < 0) return 'text-rose-600 bg-rose-50';
  if (days <= 3) return 'text-amber-600 bg-amber-50';
  return 'text-emerald-600 bg-emerald-50';
}

export function expiryLabel(expiresAt: string | null): string {
  if (!expiresAt) return '';
  const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000);
  if (days < 0) return 'Expired';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return `${days}d left`;
  return new Date(expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
