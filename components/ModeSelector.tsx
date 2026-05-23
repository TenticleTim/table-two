'use client';
import { useState } from 'react';
import { Flame, Leaf, CalendarDays, Zap, ShoppingBasket, Heart } from 'lucide-react';

const modes = [
  { id: 'cheap', label: 'Cheap & Healthy', icon: Leaf, color: 'bg-emerald-100 text-emerald-800 border-emerald-200', active: 'bg-emerald-600 text-white border-emerald-600' },
  { id: 'balanced', label: 'Balanced', icon: Flame, color: 'bg-sky-100 text-sky-800 border-sky-200', active: 'bg-sky-600 text-white border-sky-600' },
  { id: 'date', label: 'Date Night', icon: Heart, color: 'bg-rose-100 text-rose-800 border-rose-200', active: 'bg-rose-600 text-white border-rose-600' },
  { id: 'prep', label: 'Meal Prep', icon: CalendarDays, color: 'bg-amber-100 text-amber-800 border-amber-200', active: 'bg-amber-600 text-white border-amber-600' },
  { id: 'pantry', label: 'Use What We Have', icon: ShoppingBasket, color: 'bg-violet-100 text-violet-800 border-violet-200', active: 'bg-violet-600 text-white border-violet-600' },
  { id: 'emergency', label: 'Emergency', icon: Zap, color: 'bg-orange-100 text-orange-800 border-orange-200', active: 'bg-orange-600 text-white border-orange-600' },
];

export function ModeSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = selected === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => setSelected(isActive ? null : mode.id)}
            className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-all ${isActive ? mode.active : mode.color}`}
          >
            <Icon size={15} />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
