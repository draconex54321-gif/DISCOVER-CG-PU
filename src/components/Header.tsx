import React from 'react';
import { ComponentType } from '../types/hardware';
import { Layers, Cpu, Monitor, Scale, Sparkles, Home, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: ComponentType;
  onTabChange: (tab: ComponentType) => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenBudgetGuide: () => void;
  onGoHome: () => void;
  isHome: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  compareCount,
  onOpenCompare,
  onOpenBudgetGuide,
  onGoHome,
  isHome,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark with Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-neutral-900 border border-slate-700 dark:border-neutral-800 text-cyan-400 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                SiliconAtlas
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={onGoHome}
            className={`flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer py-5 ${
              isHome
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold border-b-2 border-cyan-600 dark:border-cyan-400 -mb-[2px]'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-100'
            }`}
          >
            <Home className="h-4 w-4" />
            Start Menu
          </button>

          <button
            onClick={() => onTabChange('cpu')}
            className={`flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer py-5 ${
              !isHome && activeTab === 'cpu'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold border-b-2 border-cyan-600 dark:border-cyan-400 -mb-[2px]'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-100'
            }`}
          >
            <Cpu className="h-4 w-4" />
            Processors (CPU)
          </button>

          <button
            onClick={() => onTabChange('gpu')}
            className={`flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer py-5 ${
              !isHome && activeTab === 'gpu'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold border-b-2 border-cyan-600 dark:border-cyan-400 -mb-[2px]'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-100'
            }`}
          >
            <Monitor className="h-4 w-4" />
            Graphics Cards (GPU)
          </button>

          <button
            onClick={onOpenBudgetGuide}
            className="flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap cursor-pointer py-5"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            Budget Guide
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Theme Toggle & Compare Tray) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-100/70 dark:bg-neutral-900 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 text-slate-700" />
            ) : (
              <Sun className="h-4 w-4 text-amber-400" />
            )}
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="relative flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white dark:text-neutral-200 border border-slate-800 dark:border-neutral-800 hover:bg-slate-800 dark:hover:bg-neutral-800 transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            <Scale className="h-4 w-4 text-cyan-400" />
            <span>Compare</span>
            {compareCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-[11px] font-bold text-neutral-950 font-mono">
                {compareCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
