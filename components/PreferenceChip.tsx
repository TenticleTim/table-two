'use client';

interface PreferenceChipProps {
  label: string;
  color?: 'green' | 'red' | 'blue' | 'amber';
  removable?: boolean;
  onRemove?: () => void;
}

const colorMap = {
  green: 'bg-emerald-100 text-emerald-800',
  red: 'bg-rose-100 text-rose-800',
  blue: 'bg-sky-100 text-sky-800',
  amber: 'bg-amber-100 text-amber-800',
};

export function PreferenceChip({ label, color = 'green', removable, onRemove }: PreferenceChipProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${colorMap[color]}`}>
      {label}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 rounded-full hover:opacity-70 transition-opacity"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
