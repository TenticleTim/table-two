'use client';
import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import type { DinnerIdea } from '@/types';
import { users } from '@/data/users';

interface VotingCardProps {
  idea: DinnerIdea;
}

const statusStyles: Record<string, string> = {
  agreed: 'border-emerald-400 bg-emerald-50',
  rejected: 'border-gray-200 bg-gray-50 opacity-60',
  pending: 'border-gray-200 bg-white',
};

const statusBadge: Record<string, string> = {
  agreed: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-100 text-amber-800',
};

const statusLabel: Record<string, string> = {
  agreed: '✓ Agreed',
  rejected: 'Passed',
  pending: 'Voting',
};

export function VotingCard({ idea }: VotingCardProps) {
  const proposer = users.find(u => u.id === idea.proposedBy);
  const hearts = idea.votes.filter(v => v.type === 'heart').length;
  const passes = idea.votes.filter(v => v.type === 'pass').length;
  const [myVote, setMyVote] = useState<'heart' | 'pass' | null>(
    idea.votes.find(v => v.userId === 'user-matt')?.type ?? null
  );

  return (
    <article className={`card p-5 border-2 transition-colors ${statusStyles[idea.status]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-bold text-ink">{idea.title}</h3>
          <p className="text-sm text-gray-500">{idea.cuisine}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusBadge[idea.status]}`}>
          {statusLabel[idea.status]}
        </span>
      </div>

      {idea.note && (
        <p className="mt-2 text-sm text-gray-500 italic">"{idea.note}"</p>
      )}

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
        <span className="text-base">{proposer?.avatar}</span>
        <span>Proposed by <strong>{proposer?.name}</strong></span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-3 flex-1">
          {users.map(user => {
            const vote = idea.votes.find(v => v.userId === user.id);
            return (
              <div key={user.id} className="flex items-center gap-1">
                <span className="text-base">{user.avatar}</span>
                {vote?.type === 'heart' && <Heart size={14} className="fill-rose-500 text-rose-500" />}
                {vote?.type === 'pass' && <X size={14} className="text-gray-400" />}
                {!vote && <span className="text-xs text-gray-400">…</span>}
              </div>
            );
          })}
        </div>

        {idea.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => setMyVote(myVote === 'heart' ? null : 'heart')}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${myVote === 'heart' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-600 hover:bg-rose-50'}`}
            >
              <Heart size={13} className={myVote === 'heart' ? 'fill-rose-500' : ''} /> {hearts}
            </button>
            <button
              onClick={() => setMyVote(myVote === 'pass' ? null : 'pass')}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${myVote === 'pass' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <X size={13} /> {passes}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
