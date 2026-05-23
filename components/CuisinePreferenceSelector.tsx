'use client';
import { useState } from 'react';
import type { CuisinePreference, CuisineType, PreferenceStrength } from '@/types';

const CUISINE_EMOJIS: Record<CuisineType, string> = {
  Japanese: '🍣',
  Italian: '🍝',
  Mexican: '🌮',
  Korean: '🥢',
  Indian: '🍛',
  Mediterranean: '🫒',
  American: '🍔',
  NorthAfrican: '🫕',
  Thai: '🥥',
  Chinese: '🥡',
  French: '🥐',
  MiddleEastern: '🧆',
};

const ALL_CUISINES: CuisineType[] = [
  'Japanese', 'Italian', 'Mexican', 'Korean', 'Indian', 'Mediterranean',
  'American', 'NorthAfrican', 'Thai', 'Chinese', 'French', 'MiddleEastern',
];

const strengthStyles: Record<PreferenceStrength, string> = {
  love: 'border-rose-400 bg-rose-50 ring-rose-300',
  like: 'border-emerald-400 bg-emerald-50 ring-emerald-300',
  neutral: 'border-gray-200 bg-white ring-gray-100',
  dislike: 'border-orange-300 bg-orange-50 ring-orange-200',
  never: 'border-red-400 bg-red-50 ring-red-300',
};

const strengthLabel: Record<PreferenceStrength, string> = {
  love: 'Love 😍',
  like: 'Like 👍',
  neutral: 'Neutral',
  dislike: 'Dislike 👎',
  never: 'Avoid 🚫',
};

interface CuisinePreferenceSelectorProps {
  initialPreferences?: CuisinePreference[];
  onChange: (prefs: CuisinePreference[]) => void;
}

export function CuisinePreferenceSelector({ initialPreferences = [], onChange }: CuisinePreferenceSelectorProps) {
  const [prefs, setPrefs] = useState<CuisinePreference[]>(initialPreferences);

  function getStrength(cuisine: CuisineType): PreferenceStrength {
    return prefs.find(p => p.cuisine === cuisine)?.strength ?? 'neutral';
  }

  function cycle(cuisine: CuisineType) {
    const order: PreferenceStrength[] = ['neutral', 'love', 'like', 'dislike', 'never', 'neutral'];
    const current = getStrength(cuisine);
    const idx = order.indexOf(current);
    const next = order[idx + 1];
    const updated = prefs.filter(p => p.cuisine !== cuisine);
    if (next !== 'neutral') updated.push({ cuisine, strength: next });
    setPrefs(updated);
    onChange(updated);
  }

  return (
    <div>
      <p className="mb-3 text-sm font-bold text-gray-500 uppercase tracking-wide">Cuisine preferences</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {ALL_CUISINES.map(cuisine => {
          const strength = getStrength(cuisine);
          const style = strengthStyles[strength];
          return (
            <button
              key={cuisine}
              onClick={() => cycle(cuisine)}
              className={`flex flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all ${style} ${strength !== 'neutral' ? 'ring-1' : ''}`}
            >
              <span className="text-2xl">{CUISINE_EMOJIS[cuisine]}</span>
              <span className="text-xs font-semibold text-ink leading-tight">{cuisine}</span>
              {strength !== 'neutral' && (
                <span className="text-xs text-gray-500">{strengthLabel[strength]}</span>
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-gray-400">Tap to cycle: Love → Like → Dislike → Avoid</p>
    </div>
  );
}
