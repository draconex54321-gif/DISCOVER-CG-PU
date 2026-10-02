import React from 'react';
import { ComponentType, BudgetTier } from '../types/hardware';
import { Search, X, SlidersHorizontal, LayoutGrid, Table } from 'lucide-react';

interface FilterBarProps {
  category: ComponentType;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTier: string;
  onSelectTier: (tier: string) => void;
  selectedBudget: BudgetTier | 'all';
  onSelectBudget: (budget: BudgetTier | 'all') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  availableTiers: { value: string; label: string }[];
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  category,
  searchQuery,
  onSearchChange,
  selectedTier,
  onSelectTier,
  selectedBudget,
  onSelectBudget,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  availableTiers,
  totalResults,
}) => {
  return (
    <div className="w-full space-y-3 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 shadow-xs backdrop-blur-sm transition-colors">
      {/* Top Row: Search and Sort + View Mode */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${category.toUpperCase()} by model (e.g. 14900K, 7800X3D, 5090, Celeron, Arc, AM5)...`}
            className="w-full rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-neutral-100 placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort and View controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sort:</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 px-3 py-2 text-xs text-slate-800 dark:text-neutral-200 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
          >
            <option value="newest">Release: Newest First</option>
            <option value="performance">Performance: Highest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="cores-vram">
              {category === 'cpu' ? 'Cores: Most First' : 'VRAM: Highest First'}
            </option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>

          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-neutral-950 rounded-xl border border-slate-200 dark:border-neutral-800 p-0.5">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              title="Spec Table View"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}
            >
              <Table className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Second Row: Tier buttons & Budget selector */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between pt-2 border-t border-slate-100 dark:border-neutral-800/60">
        {/* Tier / Series horizontal scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
            Series:
          </span>
          <button
            onClick={() => onSelectTier('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedTier === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                : 'bg-slate-100 dark:bg-neutral-950 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 border border-slate-200 dark:border-neutral-800'
            }`}
          >
            All Series
          </button>
          {availableTiers.map((tier) => (
            <button
              key={tier.value}
              onClick={() => onSelectTier(tier.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedTier === tier.value
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-neutral-950 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200 border border-slate-200 dark:border-neutral-800'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Budget tier filter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-neutral-400 uppercase tracking-wider shrink-0">
            Budget:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-neutral-950 p-1 rounded-xl border border-slate-200 dark:border-neutral-800">
            {[
              { id: 'all', label: 'All' },
              { id: 'budget', label: '<$150' },
              { id: 'mid-range', label: '$150-$350' },
              { id: 'high-end', label: '$350-$650' },
              { id: 'flagship', label: '$650+' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBudget(b.id as BudgetTier | 'all')}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer font-medium ${
                  selectedBudget === b.id
                    ? 'bg-white dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold border border-slate-200 dark:border-cyan-500/40 shadow-xs'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-200'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filter Result count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 pt-1">
        <span>
          Found <strong className="text-slate-900 dark:text-white font-mono tabular-nums">{totalResults}</strong> matching{' '}
          {category.toUpperCase()} models
        </span>
        {(searchQuery || selectedTier !== 'all' || selectedBudget !== 'all') && (
          <button
            onClick={() => {
              onSearchChange('');
              onSelectTier('all');
              onSelectBudget('all');
            }}
            className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};
