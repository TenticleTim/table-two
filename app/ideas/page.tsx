import { PageHeader } from '@/components/PageHeader';
import { VotingCard } from '@/components/VotingCard';
import { dinnerIdeas, agreedIdeas, pendingIdeas } from '@/data/ideas';

export default function IdeasPage() {
  return (
    <main className="page-container">
      <PageHeader
        title="Dinner Ideas"
        subtitle="Vote, agree, and plan meals together."
        action={
          <button className="flex items-center gap-2 rounded-2xl bg-herb px-4 py-2.5 text-sm font-bold text-white">
            💡 Suggest a meal
          </button>
        }
      />

      {/* Summary */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        <div className="card p-4">
          <p className="text-2xl font-black text-ink">{dinnerIdeas.length}</p>
          <p className="text-xs text-gray-500">Total ideas</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-black text-emerald-600">{agreedIdeas.length}</p>
          <p className="text-xs text-gray-500">Agreed on</p>
        </div>
        <div className="card p-4">
          <p className="text-2xl font-black text-amber-600">{pendingIdeas.length}</p>
          <p className="text-xs text-gray-500">Awaiting votes</p>
        </div>
      </div>

      {/* Pending votes */}
      {pendingIdeas.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-black text-ink">Needs your vote</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {pendingIdeas.map(idea => (
              <VotingCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}

      {/* Agreed meals */}
      {agreedIdeas.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-black text-ink">✓ You both agreed</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {agreedIdeas.map(idea => (
              <VotingCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}

      {/* Passed / rejected */}
      {dinnerIdeas.filter(i => i.status === 'rejected').length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-black text-gray-400">Passed on</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {dinnerIdeas.filter(i => i.status === 'rejected').map(idea => (
              <VotingCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
