import Link from 'next/link';
import { Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { RecipeCard } from '@/components/RecipeCard';
import { mattTasteProfile, sarahTasteProfile, householdProfile } from '@/data/taste-profiles';
import { getCompromiseMeals, scoreRecipeForHousehold, matchLabelColor } from '@/lib/recommendation';
import { recipes } from '@/data/recipes';
import { users } from '@/data/users';

const compromise = getCompromiseMeals(recipes, mattTasteProfile, sarahTasteProfile, householdProfile, 6);
const [matt, sarah] = users;

const mattCuisinesLoved = mattTasteProfile.cuisines.filter(c => c.strength === 'love' || c.strength === 'like').map(c => c.cuisine);
const sarahCuisinesLoved = sarahTasteProfile.cuisines.filter(c => c.strength === 'love' || c.strength === 'like').map(c => c.cuisine);
const sharedCuisines = mattCuisinesLoved.filter(c => sarahCuisinesLoved.includes(c));

const mattProteinsLoved = mattTasteProfile.proteins.filter(p => p.strength === 'love' || p.strength === 'like').map(p => p.ingredient);
const sarahProteinsLoved = sarahTasteProfile.proteins.filter(p => p.strength === 'love' || p.strength === 'like').map(p => p.ingredient);
const sharedProteins = mattProteinsLoved.filter(p => sarahProteinsLoved.includes(p));

const mattNever = [
  ...mattTasteProfile.proteins.filter(p => p.strength === 'never'),
  ...mattTasteProfile.vegetables.filter(p => p.strength === 'never'),
  ...mattTasteProfile.dairy.filter(p => p.strength === 'never'),
].map(p => p.ingredient);

const sarahNever = [
  ...sarahTasteProfile.proteins.filter(p => p.strength === 'never'),
  ...sarahTasteProfile.vegetables.filter(p => p.strength === 'never'),
  ...sarahTasteProfile.dairy.filter(p => p.strength === 'never'),
].map(p => p.ingredient);

const conflicts = householdProfile.conflictIngredients;

export default function TasteMatchPage() {
  return (
    <main className="page-container">
      <PageHeader
        title="Household Taste Match"
        subtitle="How well do your palates overlap — and where to compromise."
      />

      {/* Hero compatibility card */}
      <div className="mb-8 rounded-4xl bg-herb p-6 sm:p-8 text-white">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-white/70 mb-1">Overall compatibility</p>
            <p className="text-5xl font-black">78%</p>
            <p className="text-white/70 mt-1">Strong match with great compromise potential</p>
          </div>
          <Heart size={48} className="text-white/30" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xl font-black">{sharedProteins.length}</p>
            <p className="text-xs text-white/70">Shared proteins</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xl font-black">{sharedCuisines.length}</p>
            <p className="text-xs text-white/70">Shared cuisines</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xl font-black">{conflicts.length}</p>
            <p className="text-xs text-white/70">Conflicts to note</p>
          </div>
        </div>
      </div>

      {/* Profiles side by side */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {/* Matt */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cream text-xl">{matt.avatar}</div>
            <h2 className="font-black text-ink">{matt.name}</h2>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Loves</p>
              <div className="flex flex-wrap gap-1.5">
                {mattTasteProfile.proteins.filter(p => p.strength === 'love').map(p => (
                  <span key={p.ingredient} className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-semibold text-rose-700">😍 {p.ingredient}</span>
                ))}
                {mattTasteProfile.cuisines.filter(c => c.strength === 'love').map(c => (
                  <span key={c.cuisine} className="rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-xs font-semibold text-sky-700">😍 {c.cuisine}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Avoids</p>
              <div className="flex flex-wrap gap-1.5">
                {mattNever.map(item => (
                  <span key={item} className="rounded-full bg-red-50 border border-red-200 px-2.5 py-0.5 text-xs font-semibold text-red-700">🚫 {item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sarah */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cream text-xl">{sarah.avatar}</div>
            <h2 className="font-black text-ink">{sarah.name}</h2>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Loves</p>
              <div className="flex flex-wrap gap-1.5">
                {sarahTasteProfile.proteins.filter(p => p.strength === 'love').map(p => (
                  <span key={p.ingredient} className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-semibold text-rose-700">😍 {p.ingredient}</span>
                ))}
                {sarahTasteProfile.cuisines.filter(c => c.strength === 'love').map(c => (
                  <span key={c.cuisine} className="rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-xs font-semibold text-sky-700">😍 {c.cuisine}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Avoids</p>
              <div className="flex flex-wrap gap-1.5">
                {sarahNever.map(item => (
                  <span key={item} className="rounded-full bg-red-50 border border-red-200 px-2.5 py-0.5 text-xs font-semibold text-red-700">🚫 {item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared loves */}
      <section className="mb-8 card p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={18} className="text-emerald-500" />
          <h2 className="font-black text-ink">You both love</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-semibold text-emerald-700 uppercase mb-2">Shared proteins</p>
            <div className="flex flex-wrap gap-1.5">
              {sharedProteins.map(p => (
                <span key={p} className="rounded-full bg-white border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{p}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-sky-50 p-4">
            <p className="text-xs font-semibold text-sky-700 uppercase mb-2">Shared cuisines</p>
            <div className="flex flex-wrap gap-1.5">
              {sharedCuisines.map(c => (
                <span key={c} className="rounded-full bg-white border border-sky-200 px-2.5 py-0.5 text-xs font-semibold text-sky-700">{c}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-rose-50 p-4">
            <p className="text-xs font-semibold text-rose-700 uppercase mb-2">Household never list</p>
            <div className="flex flex-wrap gap-1.5">
              {householdProfile.avoidedHouseholdFoods.map(f => (
                <span key={f} className="rounded-full bg-white border border-rose-200 px-2.5 py-0.5 text-xs font-semibold text-rose-700">🚫 {f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conflict ingredients */}
      {conflicts.length > 0 && (
        <section className="mb-8 card p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-500" />
            <h2 className="font-black text-ink">Known conflicts</h2>
          </div>
          <p className="text-sm text-gray-500 mb-3">These ingredients are liked by one person but disliked by the other. We'll flag them in recipes.</p>
          <div className="flex flex-wrap gap-2">
            {conflicts.map(item => (
              <span key={item} className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-sm font-semibold text-amber-700">
                ⚠️ {item}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Compromise meals */}
      <section className="mb-8">
        <h2 className="font-black text-ink mb-1">Best compromise meals</h2>
        <p className="text-sm text-gray-500 mb-4">Recipes that score well for both of you</p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {compromise.map(({ recipe, score }) => (
            <RecipeCard key={recipe.id} recipe={recipe} score={score} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Link href="/discover/for-you" className="flex items-center gap-2 rounded-2xl bg-herb px-4 py-2.5 text-sm font-bold text-white">
          ✦ See all recommendations
        </Link>
        <Link href="/settings/taste-profile" className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-cream transition-all">
          ⚙️ Edit taste profiles
        </Link>
      </div>
    </main>
  );
}
