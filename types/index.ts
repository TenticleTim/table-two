export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type MealMode = 'Cheap' | 'Balanced' | 'Elaborate' | 'MealPrep' | 'DateNight' | 'Emergency';
export type CuisineType = 'Japanese' | 'Italian' | 'Mexican' | 'Korean' | 'Indian' | 'Mediterranean' | 'American' | 'NorthAfrican' | 'Thai' | 'Chinese' | 'French' | 'MiddleEastern';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type BudgetLevel = 'cheap' | 'balanced' | 'elaborate';
export type HealthGoal = 'balanced' | 'highProtein' | 'lowCarb' | 'plantBased' | 'weightLoss' | 'bulking';
export type VoteType = 'heart' | 'pass';
export type IdeaStatus = 'pending' | 'agreed' | 'rejected';

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: CuisineType;
  mode: MealMode;
  mealTypes: MealType[];
  time: string;
  cost: '$' | '$$' | '$$$';
  costEstimate: number;
  health: number;
  nutrition: NutritionInfo;
  servings: number;
  ingredients: string[];
  steps: string[];
  tags: string[];
  pantryMatch: number;
  skillLevel: SkillLevel;
  image: string;
}

export interface MealSlot {
  mealType: MealType;
  recipeId: string;
}

export interface DayPlan {
  day: string;
  date: string;
  meals: MealSlot[];
}

export interface MealPlan {
  weekStart: string;
  days: DayPlan[];
}

export interface PantryItem {
  id: string;
  name: string;
  category: 'produce' | 'protein' | 'dairy' | 'pantry' | 'frozen' | 'spices' | 'condiments';
  quantity: number;
  unit: string;
  expiresAt: string | null;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
  checked: boolean;
  recipeSource: string | null;
  inPantry: boolean;
}

export interface GrocerySection {
  section: string;
  icon: string;
  items: GroceryItem[];
}

export interface UserPreferences {
  favoriteProteins: string[];
  favoriteVegetables: string[];
  favoriteCuisines: CuisineType[];
  dislikedIngredients: string[];
  skillLevel: SkillLevel;
  budgetLevel: BudgetLevel;
  healthGoal: HealthGoal;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  dietaryRestrictions: string[];
  prepTimeMax: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  preferences: UserPreferences;
}

export interface Vote {
  userId: string;
  type: VoteType;
}

export interface DinnerIdea {
  id: string;
  recipeId: string;
  title: string;
  cuisine: CuisineType;
  proposedBy: string;
  votes: Vote[];
  status: IdeaStatus;
  note: string | null;
}

// ─── Taste Profile ─────────────────────────────────────────────────────────

export type PreferenceStrength = 'love' | 'like' | 'neutral' | 'dislike' | 'never';

export interface IngredientPreference {
  ingredient: string;
  strength: PreferenceStrength;
}

export interface CuisinePreference {
  cuisine: CuisineType;
  strength: PreferenceStrength;
}

export interface UserTasteProfile {
  userId: string;
  proteins: IngredientPreference[];
  vegetables: IngredientPreference[];
  grains: IngredientPreference[];
  dairy: IngredientPreference[];
  sauces: IngredientPreference[];
  cuisines: CuisinePreference[];
  favoriteDishes: string[];
  dislikedDishes: string[];
  textureDislikes: string[];
  spicePreference: 1 | 2 | 3 | 4 | 5;
  dietaryRestrictions: string[];
  allergies: string[];
  budgetPreference: BudgetLevel;
  cookingSkill: SkillLevel;
  maxWeeknightCookTime: number;
  mealPrepInterest: boolean;
  healthGoals: HealthGoal[];
}

export interface HouseholdTasteProfile {
  householdId: string;
  members: string[];
  sharedLikes: string[];
  sharedDislikes: string[];
  conflictIngredients: string[];
  compromiseCuisines: CuisineType[];
  favoriteSharedDishes: string[];
  avoidedHouseholdFoods: string[];
  budgetGoal: BudgetLevel;
  weeklyCookingStyle: MealMode;
}

export interface RecipeRecommendationScore {
  recipeId: string;
  totalScore: number;
  tasteScore: number;
  budgetScore: number;
  healthScore: number;
  pantryScore: number;
  timeScore: number;
  skillScore: number;
  coupleMatchScore: number;
  reasons: string[];
  warnings: string[];
  matchLabel: 'perfect' | 'great' | 'good' | 'okay' | 'skip';
}
