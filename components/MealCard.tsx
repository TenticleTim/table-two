import { Heart, ShoppingBasket, Sparkles } from 'lucide-react';

export function MealCard({ meal }: { meal: { title: string; mode: string; cuisine: string; time: string; cost: string; health: number; why: string } }) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-herb">{meal.mode} • {meal.cuisine}</p>
          <h3 className="mt-2 text-xl font-bold text-ink">{meal.title}</h3>
        </div>
        <div className="rounded-full bg-cream px-3 py-1 text-sm font-semibold">{meal.cost}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-gray-600">{meal.why}</p>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-2xl bg-cream p-3"><b>{meal.time}</b><br />Time</div>
        <div className="rounded-2xl bg-cream p-3"><b>{meal.health}</b><br />Health</div>
        <div className="rounded-2xl bg-cream p-3"><b>82%</b><br />Pantry</div>
      </div>
      <div className="mt-5 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-herb px-4 py-3 text-sm font-bold text-white"><Heart size={16}/> Share idea</button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white"><ShoppingBasket size={16}/> Add items</button>
      </div>
      <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold"><Sparkles size={16}/> Make it cheaper / fancier / healthier</button>
    </article>
  );
}
