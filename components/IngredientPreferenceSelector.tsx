'use client';
import { useState } from 'react';
import type { IngredientPreference, PreferenceStrength } from '@/types';
import { PreferenceStrengthPicker } from './PreferenceStrengthPicker';

interface IngredientPreferenceSelectorProps {
  title: string;
  suggestions: string[];
  initialPreferences?: IngredientPreference[];
  onChange: (prefs: IngredientPreference[]) => void;
}

const strengthColors: Record<PreferenceStrength, string> = {
  love: 'border-rose-400 bg-rose-50 text-rose-700',
  like: 'border-emerald-400 bg-emerald-50 text-emerald-700',
  neutral: 'border-gray-200 bg-white text-gray-600',
  dislike: 'border-orange-300 bg-orange-50 text-orange-700',
  never: 'border-red-400 bg-red-50 text-red-700',
};

const strengthEmoji: Record<PreferenceStrength, string> = {
  love: '😍',
  like: '👍',
  neutral: '',
  dislike: '👎',
  never: '🚫',
};

export function IngredientPreferenceSelector({
  title,
  suggestions,
  initialPreferences = [],
  onChange,
}: IngredientPreferenceSelectorProps) {
  const [prefs, setPrefs] = useState<IngredientPreference[]>(initialPreferences);
  const [selected, setSelected] = useState<string | null>(null);

  function getStrength(ingredient: string): PreferenceStrength | null {
    return prefs.find(p => p.ingredient === ingredient)?.strength ?? null;
  }

  function handleChipTap(ingredient: string) {
    const current = getStrength(ingredient);
    if (selected === ingredient) {
      setSelected(null);
    } else {
      if (!current) {
        const next: IngredientPreference[] = [...prefs, { ingredient, strength: 'like' }];
        setPrefs(next);
        onChange(next);
      }
      setSelected(ingredient);
    }
  }

  function handleStrengthChange(ingredient: string, strength: PreferenceStrength) {
    const next = prefs.map(p => p.ingredient === ingredient ? { ...p, strength } : p);
    setPrefs(next);
    onChange(next);
    setSelected(null);
  }

  function handleRemove(ingredient: string) {
    const next = prefs.filter(p => p.ingredient !== ingredient);
    setPrefs(next);
    onChange(next);
    setSelected(null);
  }

  return (
    <div>
      <p className="mb-3 text-sm font-bold text-gray-500 uppercase tracking-wide">{title}</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map(item => {
          const strength = getStrength(item);
          const isSelected = selected === item;
          return (
            <div key={item} className="flex flex-col gap-1">
              <button
                onClick={() => handleChipTap(item)}
                className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-semibold transition-all ${
                  strength ? strengthColors[strength] : 'border-gray-200 bg-white text-gray-600 hover:bg-cream'
                } ${isSelected ? 'ring-2 ring-offset-1 ring-herb' : ''}`}
              >
                {strength && <span className="text-xs">{strengthEmoji[strength]}</span>}
                {item}
              </button>

              {isSelected && strength && (
                <div className="flex items-center gap-1 pl-1">
                  <PreferenceStrengthPicker
                    value={strength}
                    onChange={v => handleStrengthChange(item, v)}
                    compact
                  />
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-xs text-gray-400 hover:text-rose-500 px-1"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-gray-400">Tap an ingredient to rate it. Tap again to adjust.</p>
    </div>
  );
}
