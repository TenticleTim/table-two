'use client';
import { useState } from 'react';
import type { GrocerySection as GrocerySectionType } from '@/types';

interface GrocerySectionProps {
  section: GrocerySectionType;
}

export function GrocerySection({ section }: GrocerySectionProps) {
  const [items, setItems] = useState(section.items);

  const toggle = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const sectionTotal = items.reduce((sum, item) => sum + item.estimatedCost, 0);
  const checkedCount = items.filter(i => i.checked).length;

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between bg-cream px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{section.icon}</span>
          <h3 className="font-bold text-ink">{section.section}</h3>
          <span className="text-sm text-gray-500">({items.length} items)</span>
          {checkedCount > 0 && (
            <span className="rounded-full bg-herb px-2 py-0.5 text-xs font-semibold text-white">
              {checkedCount} done
            </span>
          )}
        </div>
        <span className="text-sm font-semibold text-gray-600">${sectionTotal.toFixed(2)}</span>
      </div>
      <ul className="divide-y divide-gray-50">
        {items.map(item => (
          <li
            key={item.id}
            className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50 ${item.checked ? 'opacity-50' : ''}`}
          >
            <button
              onClick={() => toggle(item.id)}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${item.checked ? 'border-herb bg-herb text-white' : 'border-gray-300'}`}
              aria-label={`Mark ${item.name} as ${item.checked ? 'unchecked' : 'checked'}`}
            >
              {item.checked && <span className="text-xs font-bold">✓</span>}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-ink ${item.checked ? 'line-through' : ''}`}>{item.name}</p>
              {item.recipeSource && (
                <p className="text-xs text-gray-400">For: {item.recipeSource}</p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-gray-700">${item.estimatedCost.toFixed(2)}</p>
              <p className="text-xs text-gray-400">{item.quantity} {item.unit}</p>
            </div>
            {item.inPantry && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                In pantry
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
