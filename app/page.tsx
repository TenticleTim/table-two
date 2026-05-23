import { ChefHat, Lock, Salad, WalletCards } from 'lucide-react';
import { MealCard } from '@/components/MealCard';
import { dinnerIdeas, groceryList } from '@/lib/sample-data';

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8">
      <section className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="rounded-2xl bg-herb p-3 text-white"><ChefHat /></div><div><h1 className="text-2xl font-black">TableTwo</h1><p className="text-sm text-gray-600">Private meal planning for two</p></div></div>
          <button className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">Invite partner</button>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] bg-ink p-8 text-white shadow-xl">
            <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">Replace meal kits. Eat better. Spend less.</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">Your private kitchen operating system.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">Plan breakfasts, lunches, dinners, meal prep, elaborate date-night meals, and budget-friendly weekly menus based on what both of you actually like.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-4"><Lock className="mb-3"/><b>Private couple space</b><p className="text-sm text-white/70">Invite-only household planning.</p></div>
              <div className="rounded-3xl bg-white/10 p-4"><WalletCards className="mb-3"/><b>Budget modes</b><p className="text-sm text-white/70">Cheap, balanced, elaborate, prep.</p></div>
              <div className="rounded-3xl bg-white/10 p-4"><Salad className="mb-3"/><b>Healthy balance</b><p className="text-sm text-white/70">Protein, veg, fiber, leftovers.</p></div>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-xl font-black">This week’s smart grocery list</h2>
            <p className="mt-1 text-sm text-gray-600">Generated from shared dinner picks and pantry overlap.</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {groceryList.map((item) => <li key={item} className="rounded-2xl bg-cream px-4 py-3 text-sm font-semibold">{item}</li>)}
            </ul>
          </aside>
        </div>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><h2 className="text-3xl font-black">Dinner pitch cards</h2><p className="text-gray-600">Vote, save, remix, and convert meals into grocery lists.</p></div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {dinnerIdeas.map((meal) => <MealCard key={meal.title} meal={meal} />)}
          </div>
        </section>
      </section>
    </main>
  );
}
