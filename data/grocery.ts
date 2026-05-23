import type { GrocerySection } from '@/types';

export const grocerySections: GrocerySection[] = [
  {
    section: 'Produce',
    icon: '🥦',
    items: [
      { id: 'g-001', name: 'Salmon fillets (2)', quantity: 2, unit: 'fillets', estimatedCost: 9.99, checked: false, recipeSource: 'Miso Butter Salmon Bowls', inPantry: false },
      { id: 'g-002', name: 'Avocados', quantity: 2, unit: 'avocados', estimatedCost: 2.49, checked: false, recipeSource: 'Miso Butter Salmon Bowls', inPantry: false },
      { id: 'g-003', name: 'Bell peppers (3)', quantity: 3, unit: 'peppers', estimatedCost: 3.49, checked: true, recipeSource: 'Sheet Pan Fajitas', inPantry: false },
      { id: 'g-004', name: 'Cherry tomatoes', quantity: 1, unit: 'pint', estimatedCost: 3.99, checked: false, recipeSource: 'Tuna Niçoise', inPantry: false },
      { id: 'g-005', name: 'Sweet potatoes (2)', quantity: 2, unit: 'potatoes', estimatedCost: 2.19, checked: false, recipeSource: 'Grain Bowl', inPantry: false },
      { id: 'g-006', name: 'Asparagus', quantity: 1, unit: 'bunch', estimatedCost: 3.49, checked: false, recipeSource: 'Salmon & Asparagus', inPantry: false },
      { id: 'g-007', name: 'Kale (bag)', quantity: 1, unit: 'bag', estimatedCost: 3.29, checked: false, recipeSource: 'Grain Bowl', inPantry: false },
      { id: 'g-008', name: 'Mushrooms (mixed)', quantity: 400, unit: 'g', estimatedCost: 4.49, checked: false, recipeSource: 'Mushroom Risotto', inPantry: false },
    ],
  },
  {
    section: 'Protein',
    icon: '🥩',
    items: [
      { id: 'g-009', name: 'Chicken thighs (4)', quantity: 4, unit: 'pieces', estimatedCost: 6.99, checked: false, recipeSource: 'Honey Garlic Chicken', inPantry: false },
      { id: 'g-010', name: 'Ground beef (400g)', quantity: 400, unit: 'g', estimatedCost: 5.49, checked: false, recipeSource: 'Korean Beef Cups', inPantry: false },
      { id: 'g-011', name: 'Shrimp (300g)', quantity: 300, unit: 'g', estimatedCost: 8.99, checked: true, recipeSource: 'Garlic Shrimp Pasta', inPantry: false },
      { id: 'g-012', name: 'Tuna (2 cans)', quantity: 2, unit: 'cans', estimatedCost: 3.49, checked: false, recipeSource: 'Tuna Niçoise', inPantry: false },
    ],
  },
  {
    section: 'Dairy & Eggs',
    icon: '🧀',
    items: [
      { id: 'g-013', name: 'Mozzarella (fresh)', quantity: 150, unit: 'g', estimatedCost: 4.29, checked: false, recipeSource: 'Caprese Panini', inPantry: false },
      { id: 'g-014', name: 'Parmesan (block)', quantity: 1, unit: 'block', estimatedCost: 4.99, checked: false, recipeSource: 'Multiple', inPantry: false },
      { id: 'g-015', name: 'Heavy cream', quantity: 1, unit: 'cup', estimatedCost: 2.49, checked: false, recipeSource: 'Butter Chicken', inPantry: false },
    ],
  },
  {
    section: 'Pantry & Dry Goods',
    icon: '🫙',
    items: [
      { id: 'g-016', name: 'Arborio rice (1 cup)', quantity: 1, unit: 'cup', estimatedCost: 1.99, checked: false, recipeSource: 'Mushroom Risotto', inPantry: false },
      { id: 'g-017', name: 'Coconut milk (can)', quantity: 1, unit: 'can', estimatedCost: 2.29, checked: false, recipeSource: 'Thai Green Curry', inPantry: false },
      { id: 'g-018', name: 'Green curry paste', quantity: 1, unit: 'jar', estimatedCost: 3.49, checked: false, recipeSource: 'Thai Green Curry', inPantry: false },
      { id: 'g-019', name: 'Red lentils', quantity: 2, unit: 'cups', estimatedCost: 1.99, checked: true, recipeSource: 'Lentil Soup', inPantry: false },
      { id: 'g-020', name: 'Soba noodles', quantity: 200, unit: 'g', estimatedCost: 2.99, checked: false, recipeSource: 'Thai Peanut Noodles', inPantry: false },
    ],
  },
  {
    section: 'Bakery & Bread',
    icon: '🍞',
    items: [
      { id: 'g-021', name: 'Sourdough loaf', quantity: 1, unit: 'loaf', estimatedCost: 4.99, checked: false, recipeSource: 'Avocado Toast', inPantry: false },
      { id: 'g-022', name: 'Naan (4-pack)', quantity: 1, unit: 'pack', estimatedCost: 3.49, checked: false, recipeSource: 'Butter Chicken', inPantry: false },
    ],
  },
  {
    section: 'Fresh Herbs & Spices',
    icon: '🌿',
    items: [
      { id: 'g-023', name: 'Fresh basil', quantity: 1, unit: 'bunch', estimatedCost: 1.99, checked: false, recipeSource: 'Multiple', inPantry: false },
      { id: 'g-024', name: 'Fresh parsley', quantity: 1, unit: 'bunch', estimatedCost: 1.49, checked: false, recipeSource: 'Multiple', inPantry: false },
      { id: 'g-025', name: 'Fresh dill', quantity: 1, unit: 'bunch', estimatedCost: 1.49, checked: false, recipeSource: 'Salmon & Asparagus', inPantry: false },
    ],
  },
];

export const groceryStats = {
  estimatedTotal: 97.12,
  estimatedSavings: 42.00,
  pantryOverlapCount: 3,
  checkedCount: 3,
  totalItems: 25,
};
