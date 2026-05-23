'use client';
import type { PreferenceStrength } from '@/types';

interface PreferenceStrengthPickerProps {
  value: PreferenceStrength;
  onChange: (v: PreferenceStrength) => void;
  compact?: boolean;
}

const options: { value: PreferenceStrength; emoji: string; label: string; active: string }[] = [
  { value: 'love', emoji: '😍', label: 'Love', active: 'bg-rose-500 text-white border-rose-500' },
  { value: 'like', emoji: '👍', label: 'Like', active: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'neutral', emoji: '😐', label: 'Meh', active: 'bg-gray-400 text-white border-gray-400' },
  { value: 'dislike', emoji: '👎', label: 'Nope', active: 'bg-orange-400 text-white border-orange-400' },
  { value: 'never', emoji: '🚫', label: 'Never', active: 'bg-red-600 text-white border-red-600' },
];

export function PreferenceStrengthPicker({ value, onChange, compact }: PreferenceStrengthPickerProps) {
  return (
    <div className="flex gap-1">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all ${
            value === opt.value ? opt.active : 'border-gray-200 text-gray-500 hover:bg-cream'
          }`}
        >
          <span>{opt.emoji}</span>
          {!compact && <span className="hidden sm:inline">{opt.label}</span>}
        </button>
      ))}
    </div>
  );
}
