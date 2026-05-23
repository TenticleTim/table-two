import { PageHeader } from '@/components/PageHeader';
import { TrendingDown, Award, Leaf, Globe } from 'lucide-react';

const monthlyData = [
  { week: 'May 1–7', cost: 102, mealKitEquiv: 180 },
  { week: 'May 8–14', cost: 88, mealKitEquiv: 180 },
  { week: 'May 15–21', cost: 94, mealKitEquiv: 180 },
  { week: 'May 18–24', cost: 97, mealKitEquiv: 180 },
];

const totalSaved = monthlyData.reduce((sum, w) => sum + (w.mealKitEquiv - w.cost), 0);
const totalSpent = monthlyData.reduce((sum, w) => sum + w.cost, 0);

const badges = [
  { label: 'Budget Champion', desc: '3 weeks under $100', icon: '🏆', color: 'bg-amber-50 border-amber-200' },
  { label: 'Cuisine Explorer', desc: '10+ cuisines this month', icon: '🌍', color: 'bg-sky-50 border-sky-200' },
  { label: 'Meal Prepper', desc: '2 full prep Sundays', icon: '📦', color: 'bg-violet-50 border-violet-200' },
  { label: 'Zero Waste Week', desc: 'Used all pantry items', icon: '♻️', color: 'bg-emerald-50 border-emerald-200' },
  { label: 'Health Streak', desc: 'Avg health score 85+', icon: '💚', color: 'bg-green-50 border-green-200' },
  { label: 'Date Night Done', desc: 'Cooked an elaborate dinner', icon: '🕯️', color: 'bg-rose-50 border-rose-200' },
];

export default function InsightsPage() {
  const maxCost = Math.max(...monthlyData.map(w => w.mealKitEquiv));

  return (
    <main className="page-container">
      <PageHeader
        title="Budget Insights"
        subtitle="May 2026 — your kitchen savings report"
      />

      {/* Hero savings */}
      <div className="mb-8 rounded-4xl bg-herb p-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-white/70 mb-1">This month you saved</p>
            <p className="text-5xl font-black">$332</p>
            <p className="text-white/70 mt-1">vs HelloFresh / EveryPlate meal kits</p>
          </div>
          <TrendingDown size={48} className="text-white/30" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xl font-black">${totalSpent}</p>
            <p className="text-xs text-white/70">Actual grocery spend</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xl font-black">$720</p>
            <p className="text-xs text-white/70">Meal kit equivalent</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <p className="text-xl font-black">~$24</p>
            <p className="text-xs text-white/70">Avg cost per meal</p>
          </div>
        </div>
      </div>

      {/* Weekly cost chart */}
      <section className="mb-8 card p-6">
        <h2 className="mb-1 font-black text-ink">Weekly spend vs meal kits</h2>
        <p className="mb-6 text-sm text-gray-500">Green = your cost. Gray = what meal kits would cost.</p>
        <div className="space-y-4">
          {monthlyData.map(week => (
            <div key={week.week}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{week.week}</span>
                <span className="text-gray-500">
                  <span className="font-bold text-herb">${week.cost}</span>
                  <span className="text-gray-400"> / ${week.mealKitEquiv} meal kits</span>
                </span>
              </div>
              <div className="relative h-7 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gray-200"
                  style={{ width: `${(week.mealKitEquiv / maxCost) * 100}%` }}
                />
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-herb transition-all"
                  style={{ width: `${(week.cost / maxCost) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: <TrendingDown size={20} />, label: 'Cost per meal', value: '$24', color: 'text-herb' },
          { icon: <Award size={20} />, label: 'Healthiest week', value: 'May 8–14', color: 'text-amber-600' },
          { icon: <Globe size={20} />, label: 'Top cuisine', value: 'Italian', color: 'text-sky-600' },
          { icon: <Leaf size={20} />, label: 'Waste reduced', value: '~30%', color: 'text-emerald-600' },
        ].map(stat => (
          <div key={stat.label} className="card p-4">
            <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Achievement badges */}
      <section className="card p-6">
        <h2 className="mb-1 font-black text-ink">Achievements</h2>
        <p className="mb-5 text-sm text-gray-500">Earned this month by cooking together.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {badges.map(badge => (
            <div key={badge.label} className={`rounded-3xl border p-4 ${badge.color}`}>
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="font-bold text-ink text-sm">{badge.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
