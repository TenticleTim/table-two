import Link from 'next/link';
import { TrendingDown } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { GrocerySection } from '@/components/GrocerySection';
import { grocerySections, groceryStats } from '@/data/grocery';

export default function ShoppingPage() {
  return (
    <main className="page-container">
      <PageHeader
        title="Shopping List"
        subtitle="Generated from this week's meal plan."
        action={
          <button className="flex items-center gap-2 rounded-2xl bg-ink px-4 py-2.5 text-sm font-bold text-white">
            📤 Export list
          </button>
        }
      />

      {/* Cost summary */}
      <div className="mb-6 card overflow-hidden">
        <div className="bg-herb px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Estimated total</p>
              <p className="text-3xl font-black">${groceryStats.estimatedTotal.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-emerald-300">
                <TrendingDown size={16} />
                <span className="text-sm font-semibold">Saving ${groceryStats.estimatedSavings.toFixed(0)}</span>
              </div>
              <p className="text-xs text-white/60">vs meal kits this week</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white">
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-black text-ink">{groceryStats.totalItems}</p>
            <p className="text-xs text-gray-500">Total items</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-black text-emerald-600">{groceryStats.checkedCount}</p>
            <p className="text-xs text-gray-500">Checked off</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-lg font-black text-amber-600">{groceryStats.pantryOverlapCount}</p>
            <p className="text-xs text-gray-500">Already owned</p>
          </div>
        </div>
      </div>

      {/* Pantry overlap callout */}
      <div className="mb-6 flex items-start gap-3 rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
        <span className="text-xl mt-0.5">📦</span>
        <div>
          <p className="font-semibold text-emerald-800">3 items already in your pantry</p>
          <p className="text-sm text-emerald-700">Rice, canned chickpeas, and harissa paste — already covered. Saving ~$6.</p>
          <Link href="/pantry" className="text-sm font-semibold text-emerald-800 underline">Check pantry →</Link>
        </div>
      </div>

      {/* Grocery sections */}
      <div className="space-y-4">
        {grocerySections.map(section => (
          <GrocerySection key={section.section} section={section} />
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-cream p-5 text-center">
        <p className="text-sm text-gray-500">
          🛒 Tip: Shop at one store and save up to <strong>$18</strong> by skipping the specialty grocery run.
        </p>
      </div>
    </main>
  );
}
