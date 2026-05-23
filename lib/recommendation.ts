import type { Recipe, UserTasteProfile, HouseholdTasteProfile, RecipeRecommendationScore, PreferenceStrength } from '@/types';

const STRENGTH_BOOST: Record<PreferenceStrength, number> = {
  love: 18,
  like: 9,
  neutral: 0,
  dislike: -12,
  never: -999,
};

function normaliseStr(s: string) {
  return s.toLowerCase().trim();
}

function ingredientListContains(ingredients: string[], target: string): boolean {
  const t = normaliseStr(target);
  return ingredients.some(i => normaliseStr(i).includes(t) || t.includes(normaliseStr(i).split(' ')[0]));
}

function getTasteScore(recipe: Recipe, profile: UserTasteProfile): { score: number; reasons: string[]; warnings: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const warnings: string[] = [];

  // Proteins
  for (const pref of profile.proteins) {
    if (ingredientListContains(recipe.ingredients, pref.ingredient)) {
      const boost = STRENGTH_BOOST[pref.strength];
      score += boost;
      if (pref.strength === 'love') reasons.push(`Contains ${pref.ingredient} (you love it)`);
      else if (pref.strength === 'like') reasons.push(`Uses ${pref.ingredient}`);
      else if (pref.strength === 'dislike') warnings.push(`Contains ${pref.ingredient} (you dislike it)`);
      else if (pref.strength === 'never') warnings.push(`Contains ${pref.ingredient} — you asked to never see this`);
    }
  }

  // Vegetables
  for (const pref of profile.vegetables) {
    if (ingredientListContains(recipe.ingredients, pref.ingredient)) {
      const boost = STRENGTH_BOOST[pref.strength];
      score += boost;
      if (pref.strength === 'love') reasons.push(`Has ${pref.ingredient} (you love it)`);
      else if (pref.strength === 'dislike') warnings.push(`Contains ${pref.ingredient} (you dislike it)`);
      else if (pref.strength === 'never') warnings.push(`Contains ${pref.ingredient} — marked never`);
    }
  }

  // Dairy & sauces
  for (const pref of [...profile.dairy, ...profile.sauces]) {
    if (ingredientListContains(recipe.ingredients, pref.ingredient)) {
      score += STRENGTH_BOOST[pref.strength];
      if (pref.strength === 'never') warnings.push(`Contains ${pref.ingredient} — marked never`);
      else if (pref.strength === 'love') reasons.push(`Uses ${pref.ingredient} (you love it)`);
    }
  }

  // Allergies — hard block
  for (const allergy of profile.allergies) {
    if (ingredientListContains(recipe.ingredients, allergy)) {
      score -= 9999;
      warnings.push(`⚠️ Contains ${allergy} (allergy!)`);
    }
  }

  return { score, reasons, warnings };
}

function getCuisineScore(recipe: Recipe, profile: UserTasteProfile): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const cuisinePref = profile.cuisines.find(c => c.cuisine === recipe.cuisine);
  if (cuisinePref) {
    const boost = STRENGTH_BOOST[cuisinePref.strength];
    score += boost;
    if (cuisinePref.strength === 'love') reasons.push(`${recipe.cuisine} cuisine — one of your favourites`);
    else if (cuisinePref.strength === 'like') reasons.push(`${recipe.cuisine} cuisine — you enjoy this`);
  }
  return { score, reasons };
}

function getBudgetScore(recipe: Recipe, profile: UserTasteProfile): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  if (profile.budgetPreference === 'cheap') {
    if (recipe.cost === '$') { score += 15; reasons.push('Budget-friendly pick'); }
    else if (recipe.cost === '$$') score += 5;
    else score -= 10;
  } else if (profile.budgetPreference === 'balanced') {
    if (recipe.cost === '$') score += 8;
    else if (recipe.cost === '$$') { score += 15; reasons.push('Good value meal'); }
    else score += 3;
  } else {
    if (recipe.cost === '$$$') { score += 12; reasons.push('Elevated ingredient quality'); }
    else if (recipe.cost === '$$') score += 8;
  }
  return { score, reasons };
}

function getHealthScore(recipe: Recipe, profile: UserTasteProfile): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  if (profile.healthGoals.includes('highProtein') && recipe.nutrition.protein >= 25) {
    score += 10;
    reasons.push(`High protein (${recipe.nutrition.protein}g)`);
  }
  if (profile.healthGoals.includes('lowCarb') && recipe.nutrition.carbs < 30) {
    score += 10;
    reasons.push('Low carb');
  }
  if (profile.healthGoals.includes('plantBased') && recipe.tags.includes('vegetarian')) {
    score += 12;
    reasons.push('Plant-based friendly');
  }
  if (profile.healthGoals.includes('weightLoss') && recipe.nutrition.calories < 450) {
    score += 8;
    reasons.push('Lower calorie option');
  }

  if (recipe.health >= 85) { score += 10; reasons.push(`Excellent health score (${recipe.health})`); }
  else if (recipe.health >= 75) score += 5;

  return { score, reasons };
}

function getPantryScore(recipe: Recipe): number {
  return Math.round((recipe.pantryMatch / 100) * 10);
}

function getTimeScore(recipe: Recipe, profile: UserTasteProfile): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  const mins = parseTimeMinutes(recipe.time);
  if (mins === null) return { score: 0, reasons };

  let score = 0;
  if (mins <= profile.maxWeeknightCookTime) {
    score += 10;
    if (mins <= 20) reasons.push(`Super quick — ready in ${mins} min`);
    else if (mins <= 30) reasons.push(`Fast weeknight meal (${mins} min)`);
  } else if (mins > profile.maxWeeknightCookTime + 30) {
    score -= 8;
  }
  return { score, reasons };
}

function getSkillScore(recipe: Recipe, profile: UserTasteProfile): number {
  const levels: SkillMap = { beginner: 0, intermediate: 1, advanced: 2 };
  const userLevel = levels[profile.cookingSkill];
  const recipeLevel = levels[recipe.skillLevel];
  if (recipeLevel <= userLevel) return 8;
  if (recipeLevel === userLevel + 1) return 0;
  return -10;
}

type SkillMap = Record<string, number>;

function parseTimeMinutes(time: string): number | null {
  const hrMatch = time.match(/(\d+)\s*hr/);
  const minMatch = time.match(/(\d+)\s*min/);
  let total = 0;
  if (hrMatch) total += parseInt(hrMatch[1]) * 60;
  if (minMatch) total += parseInt(minMatch[1]);
  return total > 0 ? total : null;
}

export function scoreRecipeForUser(recipe: Recipe, profile: UserTasteProfile): RecipeRecommendationScore {
  const taste = getTasteScore(recipe, profile);
  const cuisine = getCuisineScore(recipe, profile);
  const budget = getBudgetScore(recipe, profile);
  const health = getHealthScore(recipe, profile);
  const time = getTimeScore(recipe, profile);
  const pantryScore = getPantryScore(recipe);
  const skillScore = getSkillScore(recipe, profile);

  const tasteScore = taste.score + cuisine.score;
  const budgetScore = budget.score;
  const healthScore = health.score;
  const timeScore = time.score;

  const totalScore = tasteScore + budgetScore + healthScore + pantryScore + timeScore + skillScore;

  const reasons = [
    ...cuisine.reasons,
    ...taste.reasons,
    ...budget.reasons,
    ...health.reasons,
    ...time.reasons,
  ].filter(Boolean).slice(0, 4);

  const warnings = taste.warnings.filter(Boolean).slice(0, 3);

  const matchLabel = totalScore >= 60 ? 'perfect'
    : totalScore >= 35 ? 'great'
    : totalScore >= 15 ? 'good'
    : totalScore >= 0 ? 'okay'
    : 'skip';

  return {
    recipeId: recipe.id,
    totalScore,
    tasteScore,
    budgetScore,
    healthScore,
    pantryScore,
    timeScore,
    skillScore,
    coupleMatchScore: 0,
    reasons,
    warnings,
    matchLabel,
  };
}

export function scoreRecipeForHousehold(
  recipe: Recipe,
  householdProfile: HouseholdTasteProfile,
  profileA: UserTasteProfile,
  profileB: UserTasteProfile,
): RecipeRecommendationScore {
  const scoreA = scoreRecipeForUser(recipe, profileA);
  const scoreB = scoreRecipeForUser(recipe, profileB);

  // Hard block if either person has allergy or never ingredient
  const hardBlock = scoreA.totalScore < -100 || scoreB.totalScore < -100;

  let coupleMatchScore = 0;
  const reasons: string[] = [];
  const warnings: string[] = [...scoreA.warnings, ...scoreB.warnings].filter(
    (w, i, arr) => arr.indexOf(w) === i,
  );

  if (!hardBlock) {
    const minScore = Math.min(scoreA.totalScore, scoreB.totalScore);
    const avgScore = (scoreA.totalScore + scoreB.totalScore) / 2;
    coupleMatchScore = Math.round((minScore * 0.4 + avgScore * 0.6));

    // Shared likes bonus
    const sharedLikeHits = householdProfile.sharedLikes.filter(s =>
      ingredientListContains(recipe.ingredients, s),
    );
    if (sharedLikeHits.length > 0) {
      coupleMatchScore += sharedLikeHits.length * 8;
      reasons.push(`You both love ${sharedLikeHits.slice(0, 2).join(' & ')}`);
    }

    // Conflict ingredient penalty
    const conflictHits = householdProfile.conflictIngredients.filter(s =>
      ingredientListContains(recipe.ingredients, s),
    );
    if (conflictHits.length > 0) {
      coupleMatchScore -= conflictHits.length * 10;
      warnings.push(`${conflictHits[0]} may not suit everyone`);
    }

    // Compromise cuisine bonus
    if (householdProfile.compromiseCuisines.includes(recipe.cuisine)) {
      coupleMatchScore += 15;
      reasons.push(`${recipe.cuisine} — a household favourite`);
    }

    if (scoreA.totalScore >= 30 && scoreB.totalScore >= 30) {
      reasons.push("Good match for both of you");
    } else if (scoreA.totalScore > scoreB.totalScore + 20) {
      reasons.push(`Better suited for ${profileA.userId.replace('user-', '')}`);
    } else if (scoreB.totalScore > scoreA.totalScore + 20) {
      reasons.push(`Better suited for ${profileB.userId.replace('user-', '')}`);
    }
  }

  const totalScore = hardBlock ? -999 : coupleMatchScore;
  const matchLabel = totalScore >= 60 ? 'perfect'
    : totalScore >= 35 ? 'great'
    : totalScore >= 15 ? 'good'
    : totalScore >= 0 ? 'okay'
    : 'skip';

  return {
    recipeId: recipe.id,
    totalScore,
    tasteScore: Math.round((scoreA.tasteScore + scoreB.tasteScore) / 2),
    budgetScore: Math.round((scoreA.budgetScore + scoreB.budgetScore) / 2),
    healthScore: Math.round((scoreA.healthScore + scoreB.healthScore) / 2),
    pantryScore: scoreA.pantryScore,
    timeScore: Math.round((scoreA.timeScore + scoreB.timeScore) / 2),
    skillScore: Math.round((scoreA.skillScore + scoreB.skillScore) / 2),
    coupleMatchScore,
    reasons: reasons.slice(0, 4),
    warnings: warnings.slice(0, 2),
    matchLabel,
  };
}

export function getRecommendedRecipes(
  recipes: Recipe[],
  profileA: UserTasteProfile,
  profileB?: UserTasteProfile,
  householdProfile?: HouseholdTasteProfile,
  limit = 20,
): { recipe: Recipe; score: RecipeRecommendationScore }[] {
  return recipes
    .map(recipe => {
      const score = profileB && householdProfile
        ? scoreRecipeForHousehold(recipe, householdProfile, profileA, profileB)
        : scoreRecipeForUser(recipe, profileA);
      return { recipe, score };
    })
    .filter(({ score }) => score.totalScore > -100)
    .sort((a, b) => b.score.totalScore - a.score.totalScore)
    .slice(0, limit);
}

export function getCompromiseMeals(
  recipes: Recipe[],
  profileA: UserTasteProfile,
  profileB: UserTasteProfile,
  householdProfile: HouseholdTasteProfile,
  limit = 10,
): { recipe: Recipe; score: RecipeRecommendationScore }[] {
  return recipes
    .map(recipe => ({
      recipe,
      score: scoreRecipeForHousehold(recipe, householdProfile, profileA, profileB),
    }))
    .filter(({ score }) => score.coupleMatchScore > 0)
    .sort((a, b) => b.score.coupleMatchScore - a.score.coupleMatchScore)
    .slice(0, limit);
}

export function getRecipesByLikedIngredient(
  recipes: Recipe[],
  ingredient: string,
  profile: UserTasteProfile,
): { recipe: Recipe; score: RecipeRecommendationScore }[] {
  const matching = recipes.filter(r => ingredientListContains(r.ingredients, ingredient));
  return matching
    .map(recipe => ({ recipe, score: scoreRecipeForUser(recipe, profile) }))
    .filter(({ score }) => score.totalScore > -100)
    .sort((a, b) => b.score.totalScore - a.score.totalScore);
}

export function getAvoidanceWarnings(recipe: Recipe, profile: UserTasteProfile): string[] {
  const warnings: string[] = [];

  for (const allergy of profile.allergies) {
    if (ingredientListContains(recipe.ingredients, allergy)) {
      warnings.push(`⚠️ Allergy: ${allergy}`);
    }
  }

  const neverItems = [
    ...profile.proteins,
    ...profile.vegetables,
    ...profile.dairy,
    ...profile.sauces,
  ].filter(p => p.strength === 'never');

  for (const item of neverItems) {
    if (ingredientListContains(recipe.ingredients, item.ingredient)) {
      warnings.push(`Contains ${item.ingredient} (never show)`);
    }
  }

  return warnings;
}

export function explainRecommendation(recipe: Recipe, profile: UserTasteProfile): string[] {
  const score = scoreRecipeForUser(recipe, profile);
  return score.reasons;
}

export function matchLabelColor(label: RecipeRecommendationScore['matchLabel']): string {
  const map: Record<string, string> = {
    perfect: 'bg-herb text-white',
    great: 'bg-emerald-100 text-emerald-800',
    good: 'bg-sky-100 text-sky-800',
    okay: 'bg-gray-100 text-gray-600',
    skip: 'bg-rose-100 text-rose-700',
  };
  return map[label] ?? 'bg-gray-100 text-gray-600';
}

export function matchLabelText(label: RecipeRecommendationScore['matchLabel']): string {
  const map: Record<string, string> = {
    perfect: '✦ Perfect match',
    great: '↑ Great match',
    good: 'Good match',
    okay: 'Okay match',
    skip: 'Poor match',
  };
  return map[label] ?? label;
}
