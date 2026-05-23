'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import { mattTasteProfile, sarahTasteProfile } from '@/data/taste-profiles';
import { users } from '@/data/users';
import { TasteProfileSummary } from '@/components/TasteProfileSummary';
import { IngredientPreferenceSelector } from '@/components/IngredientPreferenceSelector';
import { CuisinePreferenceSelector } from '@/components/CuisinePreferenceSelector';
import type { UserTasteProfile, IngredientPreference, CuisinePreference } from '@/types';

const PROTEIN_SUGGESTIONS = ['chicken', 'beef', 'pork', 'salmon', 'tuna', 'shrimp', 'eggs', 'tofu', 'lentils', 'turkey', 'lamb', 'crab'];
const VEG_SUGGESTIONS = ['broccoli', 'spinach', 'kale', 'mushrooms', 'tomatoes', 'avocado', 'bell peppers', 'garlic', 'sweet potato', 'zucchini', 'corn', 'onion', 'eggplant', 'asparagus', 'beets', 'cilantro'];

export default function TasteProfilePage() {
  const [activeUser, setActiveUser] = useState<'matt' | 'sarah'>('matt');
  const [saved, setSaved] = useState(false);
  const [mattProfile, setMattProfile] = useState<UserTasteProfile>(mattTasteProfile);
  const [sarahProfile, setSarahProfile] = useState<UserTasteProfile>(sarahTasteProfile);

  const profile = activeUser === 'matt' ? mattProfile : sarahProfile;
  const setProfile = activeUser === 'matt' ? setMattProfile : setSarahProfile;
  const user = users.find(u => u.id === `user-${activeUser}`)!;

  function updateProteins(prefs: IngredientPreference[]) {
    setProfile(p => ({ ...p, proteins: prefs }));
  }
  function updateVeg(prefs: IngredientPreference[]) {
    setProfile(p => ({ ...p, vegetables: prefs }));
  }
  function updateCuisines(prefs: CuisinePreference[]) {
    setProfile(p => ({ ...p, cuisines: prefs }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className="page-container">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Link href="/preferences" className="flex items-center gap-1 text-sm text-gray-500 hover:text-ink">
          <ChevronLeft size={16} /> Preferences
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-black text-ink">Taste Profile</h1>
        <p className="text-gray-500 mt-1">Update what you love, like, and want to avoid. Recommendations update instantly.</p>
      </div>

      {/* User switcher */}
      <div className="mb-6 flex gap-2">
        {users.map(u => {
          const key = u.id.replace('user-', '') as 'matt' | 'sarah';
          return (
            <button
              key={u.id}
              onClick={() => setActiveUser(key)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-all ${activeUser === key ? 'border-herb bg-herb text-white' : 'border-gray-200 bg-white text-gray-600'}`}
            >
              <span>{u.avatar}</span> {u.name}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Editor */}
        <div className="lg:col-span-3 space-y-8">
          {/* Proteins */}
          <section className="card p-6">
            <IngredientPreferenceSelector
              title="Proteins & meats"
              suggestions={PROTEIN_SUGGESTIONS}
              initialPreferences={profile.proteins}
              onChange={updateProteins}
            />
          </section>

          {/* Vegetables */}
          <section className="card p-6">
            <IngredientPreferenceSelector
              title="Vegetables & produce"
              suggestions={VEG_SUGGESTIONS}
              initialPreferences={profile.vegetables}
              onChange={updateVeg}
            />
          </section>

          {/* Cuisines */}
          <section className="card p-6">
            <CuisinePreferenceSelector
              initialPreferences={profile.cuisines}
              onChange={updateCuisines}
            />
          </section>

          {/* Save */}
          <button
            onClick={handleSave}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-herb py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
          >
            {saved ? '✓ Saved!' : <><Save size={16} /> Save taste profile</>}
          </button>
        </div>

        {/* Live summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 card p-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Live preview</p>
            <TasteProfileSummary
              profile={profile}
              name={user.name}
              avatar={user.avatar}
            />
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/discover/for-you"
          className="flex items-center gap-2 rounded-2xl border border-herb px-4 py-2.5 text-sm font-semibold text-herb hover:bg-herb hover:text-white transition-all"
        >
          ✦ See my recommendations
        </Link>
        <Link
          href="/couple/taste-match"
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-cream transition-all"
        >
          👫 View household match
        </Link>
        <Link
          href="/onboarding/taste"
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-cream transition-all"
        >
          ↺ Redo taste quiz
        </Link>
      </div>
    </main>
  );
}
