import type { DinnerIdea } from '@/types';

export const dinnerIdeas: DinnerIdea[] = [
  {
    id: 'idea-001',
    recipeId: 'rec-016',
    title: 'Miso Butter Salmon Bowls',
    cuisine: 'Japanese',
    proposedBy: 'user-matt',
    votes: [
      { userId: 'user-matt', type: 'heart' },
      { userId: 'user-sarah', type: 'heart' },
    ],
    status: 'agreed',
    note: 'Add extra edamame this time!',
  },
  {
    id: 'idea-002',
    recipeId: 'rec-027',
    title: 'Mushroom Risotto',
    cuisine: 'Italian',
    proposedBy: 'user-sarah',
    votes: [
      { userId: 'user-sarah', type: 'heart' },
      { userId: 'user-matt', type: 'heart' },
    ],
    status: 'agreed',
    note: 'Perfect for Saturday date night.',
  },
  {
    id: 'idea-003',
    recipeId: 'rec-019',
    title: 'Korean Beef Lettuce Cups',
    cuisine: 'Korean',
    proposedBy: 'user-matt',
    votes: [
      { userId: 'user-matt', type: 'heart' },
      { userId: 'user-sarah', type: 'pass' },
    ],
    status: 'pending',
    note: null,
  },
  {
    id: 'idea-004',
    recipeId: 'rec-024',
    title: 'Thai Green Curry',
    cuisine: 'Thai',
    proposedBy: 'user-sarah',
    votes: [
      { userId: 'user-sarah', type: 'heart' },
    ],
    status: 'pending',
    note: 'Can we make it less spicy?',
  },
  {
    id: 'idea-005',
    recipeId: 'rec-055',
    title: 'Spicy Pork Ramen',
    cuisine: 'Japanese',
    proposedBy: 'user-matt',
    votes: [
      { userId: 'user-matt', type: 'heart' },
      { userId: 'user-sarah', type: 'heart' },
    ],
    status: 'pending',
    note: 'Weekend project — sounds amazing.',
  },
  {
    id: 'idea-006',
    recipeId: 'rec-036',
    title: 'Palak Paneer',
    cuisine: 'Indian',
    proposedBy: 'user-sarah',
    votes: [
      { userId: 'user-sarah', type: 'heart' },
      { userId: 'user-matt', type: 'pass' },
    ],
    status: 'rejected',
    note: null,
  },
];

export const agreedIdeas = dinnerIdeas.filter(i => i.status === 'agreed');
export const pendingIdeas = dinnerIdeas.filter(i => i.status === 'pending');
