import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { pantryItems } from '@/data/pantry';
import { expiryColor, expiryLabel } from '@/lib/utils';

const categoryConfig: Record<string, { label: string; icon: string }> = {
  produce: { label: 'Produce', icon: '🥦' },
  protein: { label: 'Protein', icon: '🥩' },
  dairy: { label: 'Dairy & Eggs', icon: '🧀' },
  pantry: { label: 'Pantry & Dry Goods', icon: '🫙' },
  frozen: { label: 'Frozen', icon: '🧊' },
  spices: { label: 'Spices', icon: '🌶️' },
  condiments: { label: 'Condiments & Sauces', icon: '🫗' },
};

const categories = Object.keys(categoryConfig);

export default function PantryPage() {
  const grouped = categories.reduce<Record<string, typeof pantryItems>>((acc, cat) => {
    acc[cat] = pantryItems.filter(i => i.category === cat);
    return acc;
  }, {});

  const expiringSoon = pantryItems.filter(i => {
    if (!i.expiresAt) return false;
    const days = Math.ceil((new Date(i.expiresAt).getTime() - Date.now()) / 86400000);
    return days >= 0 && days <= 3;
  });

  return (
    <main className="page-container">
      <PageHeader
        title="Pantry"
        subtitle={`${pantryItems.length} items tracked`}
        action={
          <button className="flex items-center gap-2 rounded-2xl bg-herb px-4 py-2.5 text-sm font-bold text-white">
            + Add item
          </button>
        }
      />

      {/* Expiring soon alert */}
      {expiringSoon.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-3xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <span className="text-xl mt-0.5">⚠️</span>
          <div>
            <p className="font-semibold text-amber-900">Use soon: {expiringSoon.map(i => i.name).join(', ')}</p>
            <p className="mt-0.5 text-sm text-amber-700">These expire in the next 3 days. Want a recipe that uses them?</p>
            <Link href="/discover" className="text-sm font-semibold text-amber-800 underline">Find recipes →</Link>
          </div>
        </div>
      )}

      {/* Use What We Have CTA */}
      <div className="mb-8 rounded-3xl bg-ink p-6 text-white">
        <p className="text-sm text-white/60 mb-1">Mode</p>
        <h2 className="text-xl font-black">Use What We Have 🧹</h2>
        <p className="mt-1 text-white/70 text-sm">Find recipes that use the ingredients you already have and reduce waste.</p>
        <Link
          href="/discover"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-herb px-5 py-2.5 text-sm font-bold text-white"
        >
          Find matching recipes →
        </Link>
      </div>

      {/* Pantry categories */}
      <div className="space-y-6">
        {categories.map(cat => {
          const items = grouped[cat];
          if (!items?.length) return null;
          const config = categoryConfig[cat];
          return (
            <section key={cat}>
              <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-ink">
                <span className="text-xl">{config.icon}</span> {config.label}
                <span className="text-sm font-normal text-gray-400">({items.length})</span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map(item => {
                  const eColor = expiryColor(item.expiresAt);
                  const eLabel = expiryLabel(item.expiresAt);
                  return (
                    <div key={item.id} className="card flex items-center gap-3 px-4 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.quantity} {item.unit}</p>
                      </div>
                      {eLabel && (
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${eColor}`}>
                          {eLabel}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
