import type { User } from '@/types';

export const users: User[] = [
  {
    id: 'user-matt',
    name: 'Matt',
    avatar: '👨‍🍳',
    preferences: {
      favoriteProteins: ['chicken', 'salmon', 'beef', 'eggs', 'shrimp'],
      favoriteVegetables: ['broccoli', 'spinach', 'bell peppers', 'garlic', 'sweet potato'],
      favoriteCuisines: ['Mexican', 'Japanese', 'Italian', 'American'],
      dislikedIngredients: ['blue cheese', 'liver', 'anchovies'],
      skillLevel: 'intermediate',
      budgetLevel: 'balanced',
      healthGoal: 'highProtein',
      spiceLevel: 3,
      dietaryRestrictions: [],
      prepTimeMax: 45,
    },
  },
  {
    id: 'user-sarah',
    name: 'Sarah',
    avatar: '👩‍🍳',
    preferences: {
      favoriteProteins: ['tofu', 'chicken', 'shrimp', 'eggs', 'lentils'],
      favoriteVegetables: ['kale', 'zucchini', 'tomatoes', 'mushrooms', 'avocado'],
      favoriteCuisines: ['Mediterranean', 'Indian', 'Thai', 'Italian'],
      dislikedIngredients: ['cilantro', 'olives', 'capers'],
      skillLevel: 'beginner',
      budgetLevel: 'cheap',
      healthGoal: 'balanced',
      spiceLevel: 2,
      dietaryRestrictions: [],
      prepTimeMax: 30,
    },
  },
];

export const currentUser = users[0];
export const partner = users[1];
