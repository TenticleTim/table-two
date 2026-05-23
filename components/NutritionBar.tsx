import type { NutritionInfo } from '@/types';
import { healthColor } from '@/lib/utils';

interface NutritionBarProps {
  nutrition: NutritionInfo;
  health: number;
  compact?: boolean;
}

export function NutritionBar({ nutrition, health, compact = false }: NutritionBarProps) {
  const total = nutrition.protein + nutrition.carbs + nutrition.fat;
  const proteinPct = Math.round((nutrition.protein / total) * 100);
  const carbsPct = Math.round((nutrition.carbs / total) * 100);
  const fatPct = 100 - proteinPct - carbsPct;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 flex">
          <div className="bg-sky-400 h-full" style={{ width: `${proteinPct}%` }} />
          <div className="bg-amber-400 h-full" style={{ width: `${carbsPct}%` }} />
          <div className="bg-rose-300 h-full" style={{ width: `${fatPct}%` }} />
        </div>
        <span className={`text-xs font-bold ${healthColor(health)}`}>{health}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Nutrition</span>
        <span className={`font-bold ${healthColor(health)}`}>{health}/100 health</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100 flex">
        <div className="bg-sky-400 h-full transition-all" style={{ width: `${proteinPct}%` }} title={`Protein ${proteinPct}%`} />
        <div className="bg-amber-400 h-full transition-all" style={{ width: `${carbsPct}%` }} title={`Carbs ${carbsPct}%`} />
        <div className="bg-rose-300 h-full transition-all" style={{ width: `${fatPct}%` }} title={`Fat ${fatPct}%`} />
      </div>
      <div className="flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-sky-400" />{nutrition.protein}g protein</span>
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-amber-400" />{nutrition.carbs}g carbs</span>
        <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-rose-300" />{nutrition.fat}g fat</span>
        <span className="ml-auto">{nutrition.calories} kcal</span>
      </div>
    </div>
  );
}
