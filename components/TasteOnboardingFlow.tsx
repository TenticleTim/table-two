'use client';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import type { PreferenceStrength, CuisineType, SkillLevel, BudgetLevel } from '@/types';

interface OnboardingState {
  name: string;
  cookingFor: 'solo' | 'couple' | 'family';
  proteins: Record<string, PreferenceStrength>;
  vegetables: Record<string, PreferenceStrength>;
  cuisines: Record<CuisineType, PreferenceStrength>;
  avoidances: string[];
  skill: SkillLevel;
  budget: BudgetLevel;
  maxTime: number;
  spice: number;
}

const PROTEINS = ['chicken', 'beef', 'pork', 'salmon', 'shrimp', 'eggs', 'tofu', 'lentils', 'turkey', 'lamb', 'tuna'];
const VEGETABLES = ['broccoli', 'spinach', 'kale', 'mushrooms', 'tomatoes', 'avocado', 'bell peppers', 'garlic', 'sweet potato', 'zucchini', 'corn', 'onion', 'eggplant'];
const CUISINES: CuisineType[] = ['Japanese', 'Italian', 'Mexican', 'Korean', 'Indian', 'Mediterranean', 'American', 'Thai', 'Chinese', 'French', 'MiddleEastern', 'NorthAfrican'];
const CUISINE_EMOJIS: Record<CuisineType, string> = { Japanese: '🍣', Italian: '🍝', Mexican: '🌮', Korean: '🥢', Indian: '🍛', Mediterranean: '🫒', American: '🍔', NorthAfrican: '🫕', Thai: '🥥', Chinese: '🥡', French: '🥐', MiddleEastern: '🧆' };
const AVOIDANCES = ['gluten', 'dairy', 'nuts', 'shellfish', 'cilantro', 'olives', 'anchovies', 'capers', 'liver', 'blue cheese', 'raw fish', 'pork'];

const strengthStyles: Record<PreferenceStrength | 'none', string> = {
  love: 'border-rose-400 bg-rose-50 text-rose-700',
  like: 'border-emerald-400 bg-emerald-50 text-emerald-700',
  neutral: 'border-gray-200 bg-gray-50 text-gray-500',
  dislike: 'border-orange-400 bg-orange-50 text-orange-700',
  never: 'border-red-500 bg-red-50 text-red-700',
  none: 'border-gray-200 bg-white text-gray-600',
};

function IngredientChip({ label, strength, onTap }: { label: string; strength?: PreferenceStrength; onTap: () => void }) {
  const style = strengthStyles[strength ?? 'none'];
  const emojis: Record<PreferenceStrength, string> = { love: '😍', like: '✓', neutral: '', dislike: '👎', never: '🚫' };
  return (
    <button
      onClick={onTap}
      className={`flex items-center gap-1 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all active:scale-95 ${style}`}
    >
      {strength && emojis[strength] && <span className="text-xs">{emojis[strength]}</span>}
      {label}
    </button>
  );
}

function cycleStrength(current?: PreferenceStrength): PreferenceStrength | undefined {
  const order: (PreferenceStrength | undefined)[] = [undefined, 'love', 'like', 'dislike', 'never', undefined];
  const idx = order.indexOf(current);
  return order[idx + 1];
}

export function TasteOnboardingFlow({ onComplete }: { onComplete: (state: OnboardingState) => void }) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<OnboardingState>({
    name: '',
    cookingFor: 'couple',
    proteins: {},
    vegetables: {},
    cuisines: {} as Record<CuisineType, PreferenceStrength>,
    avoidances: [],
    skill: 'intermediate',
    budget: 'balanced',
    maxTime: 30,
    spice: 2,
  });

  const steps = [
    { id: 'welcome', title: 'Welcome to TableTwo', subtitle: 'Quick taste quiz — 2 minutes' },
    { id: 'proteins', title: 'What proteins do you love?', subtitle: 'Tap to rate. Tap again to cycle.' },
    { id: 'vegetables', title: 'Your favourite vegetables?' },
    { id: 'cuisines', title: 'Cuisines you enjoy?' },
    { id: 'avoidances', title: 'Anything to avoid?' },
    { id: 'cooking', title: 'Your cooking style' },
    { id: 'done', title: 'You\'re all set!' },
  ];

  const progress = ((step) / (steps.length - 1)) * 100;

  function toggleProtein(p: string) {
    setState(s => {
      const next = cycleStrength(s.proteins[p]);
      const updated = { ...s.proteins };
      if (next) updated[p] = next; else delete updated[p];
      return { ...s, proteins: updated };
    });
  }

  function toggleVeg(v: string) {
    setState(s => {
      const next = cycleStrength(s.vegetables[v]);
      const updated = { ...s.vegetables };
      if (next) updated[v] = next; else delete updated[v];
      return { ...s, vegetables: updated };
    });
  }

  function toggleCuisine(c: CuisineType) {
    setState(s => {
      const next = cycleStrength(s.cuisines[c]);
      const updated = { ...s.cuisines };
      if (next) updated[c] = next; else delete updated[c];
      return { ...s, cuisines: updated };
    });
  }

  function toggleAvoidance(a: string) {
    setState(s => ({
      ...s,
      avoidances: s.avoidances.includes(a)
        ? s.avoidances.filter(x => x !== a)
        : [...s.avoidances, a],
    }));
  }

  const canNext = step === 0 || true;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-herb transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-8">

        {/* Step header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-herb uppercase tracking-widest mb-1">
            {step + 1} of {steps.length}
          </p>
          <h1 className="text-2xl font-black text-ink">{steps[step].title}</h1>
          {'subtitle' in steps[step] && (
            <p className="mt-1 text-gray-500">{(steps[step] as { subtitle?: string }).subtitle}</p>
          )}
        </div>

        {/* Step content */}
        <div className="flex-1">
          {step === 0 && (
            <div className="space-y-6">
              <div className="rounded-3xl bg-white p-6 text-center">
                <div className="text-5xl mb-4">👨‍👩‍🍳</div>
                <p className="text-gray-600">Tell us what you and your household love to eat. We'll personalise every recommendation, meal plan, and grocery list.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Cooking for</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['solo', 'couple', 'family'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setState(s => ({ ...s, cookingFor: opt }))}
                      className={`rounded-2xl border p-3 text-sm font-semibold capitalize transition-all ${state.cookingFor === opt ? 'border-herb bg-herb text-white' : 'border-gray-200 bg-white text-gray-600'}`}
                    >
                      {opt === 'solo' ? '🧑 Solo' : opt === 'couple' ? '👫 Couple' : '👨‍👩‍👧 Family'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="text-xs text-gray-400 mb-4">Tap once = Love, twice = Like, three = Dislike, four = Never, five = clear</p>
              <div className="flex flex-wrap gap-2">
                {PROTEINS.map(p => (
                  <IngredientChip key={p} label={p} strength={state.proteins[p]} onTap={() => toggleProtein(p)} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-xs text-gray-400 mb-4">Tap to cycle through preferences</p>
              <div className="flex flex-wrap gap-2">
                {VEGETABLES.map(v => (
                  <IngredientChip key={v} label={v} strength={state.vegetables[v]} onTap={() => toggleVeg(v)} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-3 gap-2">
              {CUISINES.map(c => {
                const strength = state.cuisines[c];
                const styles: Record<string, string> = {
                  love: 'border-rose-400 bg-rose-50',
                  like: 'border-emerald-400 bg-emerald-50',
                  dislike: 'border-orange-300 bg-orange-50',
                  never: 'border-red-400 bg-red-50',
                };
                return (
                  <button
                    key={c}
                    onClick={() => toggleCuisine(c)}
                    className={`flex flex-col items-center gap-1 rounded-2xl border p-3 transition-all ${strength ? styles[strength] : 'border-gray-200 bg-white'}`}
                  >
                    <span className="text-2xl">{CUISINE_EMOJIS[c]}</span>
                    <span className="text-xs font-semibold text-ink">{c}</span>
                    {strength && <span className="text-xs text-gray-500">{strength === 'love' ? '😍' : strength === 'like' ? '👍' : strength === 'dislike' ? '👎' : '🚫'}</span>}
                  </button>
                );
              })}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Select anything you want to avoid — allergies, intolerances, or just foods you hate.</p>
              <div className="flex flex-wrap gap-2">
                {AVOIDANCES.map(a => (
                  <button
                    key={a}
                    onClick={() => toggleAvoidance(a)}
                    className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-all ${state.avoidances.includes(a) ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-600'}`}
                  >
                    {state.avoidances.includes(a) && '🚫 '}{a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-ink mb-2">Cooking skill</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setState(st => ({ ...st, skill: s }))}
                      className={`rounded-2xl border p-3 text-sm font-semibold capitalize transition-all ${state.skill === s ? 'border-herb bg-herb text-white' : 'border-gray-200 bg-white text-gray-600'}`}
                    >
                      {s === 'beginner' ? '🌱 Beginner' : s === 'intermediate' ? '🔥 Intermediate' : '👨‍🍳 Advanced'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-2">Budget preference</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['cheap', 'balanced', 'elaborate'] as BudgetLevel[]).map(b => (
                    <button
                      key={b}
                      onClick={() => setState(st => ({ ...st, budget: b }))}
                      className={`rounded-2xl border p-3 text-sm font-semibold capitalize transition-all ${state.budget === b ? 'border-herb bg-herb text-white' : 'border-gray-200 bg-white text-gray-600'}`}
                    >
                      {b === 'cheap' ? '💚 Budget' : b === 'balanced' ? '🟡 Balanced' : '💜 Splurge'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-2">Max weeknight cook time: <span className="text-herb">{state.maxTime} min</span></p>
                <input
                  type="range"
                  min={15}
                  max={90}
                  step={5}
                  value={state.maxTime}
                  onChange={e => setState(s => ({ ...s, maxTime: Number(e.target.value) }))}
                  className="w-full accent-herb"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>15 min</span><span>90 min</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-2">Spice level</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setState(s => ({ ...s, spice: n }))}
                      className={`rounded-full w-10 h-10 text-lg border transition-all ${state.spice >= n ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'}`}
                    >
                      🌶️
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="rounded-3xl bg-herb p-6 text-white text-center">
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="text-xl font-black mb-2">Taste profile created!</h2>
                <p className="text-white/80">TableTwo now knows your preferences. Every recommendation will be personalised to you.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(state.proteins).length > 0 && (
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs text-gray-400 mb-1">Proteins rated</p>
                    <p className="font-black text-ink text-xl">{Object.keys(state.proteins).length}</p>
                  </div>
                )}
                {Object.keys(state.cuisines).length > 0 && (
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs text-gray-400 mb-1">Cuisines rated</p>
                    <p className="font-black text-ink text-xl">{Object.keys(state.cuisines).length}</p>
                  </div>
                )}
                {state.avoidances.length > 0 && (
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs text-gray-400 mb-1">Avoidances set</p>
                    <p className="font-black text-ink text-xl">{state.avoidances.length}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-8">
          {step > 0 && step < steps.length - 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-herb px-4 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {step === 0 ? 'Start taste quiz' : 'Continue'} <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => onComplete(state)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-herb px-4 py-3 text-sm font-bold text-white"
            >
              <Check size={16} /> Go to my recommendations
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
