import type { MealPlan } from '@/types';

export const currentWeekPlan: MealPlan = {
  weekStart: '2026-05-18',
  days: [
    {
      day: 'Monday',
      date: '2026-05-18',
      meals: [
        { mealType: 'breakfast', recipeId: 'rec-005' },
        { mealType: 'lunch', recipeId: 'rec-011' },
        { mealType: 'dinner', recipeId: 'rec-023' },
        { mealType: 'snack', recipeId: 'rec-040' },
      ],
    },
    {
      day: 'Tuesday',
      date: '2026-05-19',
      meals: [
        { mealType: 'breakfast', recipeId: 'rec-001' },
        { mealType: 'lunch', recipeId: 'rec-014' },
        { mealType: 'dinner', recipeId: 'rec-016' },
        { mealType: 'snack', recipeId: 'rec-041' },
      ],
    },
    {
      day: 'Wednesday',
      date: '2026-05-20',
      meals: [
        { mealType: 'breakfast', recipeId: 'rec-008' },
        { mealType: 'lunch', recipeId: 'rec-009' },
        { mealType: 'dinner', recipeId: 'rec-021' },
        { mealType: 'snack', recipeId: 'rec-042' },
      ],
    },
    {
      day: 'Thursday',
      date: '2026-05-21',
      meals: [
        { mealType: 'breakfast', recipeId: 'rec-004' },
        { mealType: 'lunch', recipeId: 'rec-010' },
        { mealType: 'dinner', recipeId: 'rec-019' },
        { mealType: 'snack', recipeId: 'rec-043' },
      ],
    },
    {
      day: 'Friday',
      date: '2026-05-22',
      meals: [
        { mealType: 'breakfast', recipeId: 'rec-006' },
        { mealType: 'lunch', recipeId: 'rec-013' },
        { mealType: 'dinner', recipeId: 'rec-028' },
        { mealType: 'snack', recipeId: 'rec-002' },
      ],
    },
    {
      day: 'Saturday',
      date: '2026-05-23',
      meals: [
        { mealType: 'breakfast', recipeId: 'rec-007' },
        { mealType: 'lunch', recipeId: 'rec-012' },
        { mealType: 'dinner', recipeId: 'rec-027' },
        { mealType: 'snack', recipeId: 'rec-041' },
      ],
    },
    {
      day: 'Sunday',
      date: '2026-05-24',
      meals: [
        { mealType: 'breakfast', recipeId: 'rec-003' },
        { mealType: 'lunch', recipeId: 'rec-050' },
        { mealType: 'dinner', recipeId: 'rec-020' },
        { mealType: 'snack', recipeId: 'rec-040' },
      ],
    },
  ],
};

export const todayPlan = currentWeekPlan.days[5];
