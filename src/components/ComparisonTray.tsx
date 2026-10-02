import React from 'react';
import { HardwareItem } from '../types/hardware';
import { Scale, X, ArrowRight } from 'lucide-react';

interface ComparisonTrayProps {
  items: HardwareItem[];
  type: 'cpu' | 'gpu';
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onOpenModal: () => void;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({
  items,
  type,
  onRemoveItem,
  onClearAll,
  onOpenModal,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl rounded-2xl border border-slate-300 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 p-3.5 shadow-2xl backdrop-blur-md transition-colors">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Indicator & Selected Items List */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 shrink-0">
            <Scale className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700/80 px-2.5 py-1 text-xs text-slate-800 dark:text-neutral-200"
              >
                <span className="font-semibold truncate max-w-[120px]">{item.name}</span>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer p-0.5"
                  title="Remove from comparison"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {items.length < 3 && (
              <span className="text-[11px] text-slate-400 dark:text-neutral-500 italic pl-1 hidden sm:inline">
                (Add {3 - items.length} more)
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200 px-2 py-1 cursor-pointer transition-colors"
          >
            Clear
          </button>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-cyan-500 px-4 py-2 text-xs font-bold text-white dark:text-neutral-950 hover:bg-slate-800 dark:hover:bg-cyan-400 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Compare {items.length} {type.toUpperCase()}s</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
