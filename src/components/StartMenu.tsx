import React from 'react';
import { ComponentType, HardwareCompany } from '../types/hardware';
import { Cpu, Monitor, Sparkles, Scale, ArrowRight, Layers, TrendingUp, CheckCircle2 } from 'lucide-react';

interface StartMenuProps {
  onStartExploring: (category: ComponentType, company?: HardwareCompany | 'all') => void;
  onOpenBudgetGuide: () => void;
  onOpenCompare: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  onStartExploring,
  onOpenBudgetGuide,
  onOpenCompare,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-14 px-4 sm:px-6 space-y-12">
      {/* Hero Welcome Zone */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
          <Layers className="h-3.5 w-3.5" />
          <span>Interactive Silicon Database & Architecture Atlas</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Find, Explore & Compare Every <span className="text-cyan-600 dark:text-cyan-400">CPU</span> and <span className="text-blue-600 dark:text-blue-400">GPU</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Welcome to SiliconAtlas. Explore complete product lines from Intel (Celeron to Core i9 & Core Ultra), AMD (Athlon to Ryzen 9 & Threadripper), and NVIDIA (GTX to RTX 5090 Blackwell) with exact laser-engraved silicon models, launch prices, and live benchmark indices.
        </p>

        {/* Primary Quick Start Action */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onStartExploring('cpu')}
            className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-cyan-500 hover:bg-slate-800 dark:hover:bg-cyan-400 px-6 py-3 text-sm font-bold text-white dark:text-slate-950 shadow-md transition-all cursor-pointer"
          >
            <span>Start Exploring Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenBudgetGuide}
            className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Budget Build Guide</span>
          </button>
        </div>
      </div>

      {/* Starting Menu Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Central Processors (CPU) */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Cpu className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                30+ Processors Cataloged
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Central Processors (CPU)
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Full lineup from entry budget dual-cores to 64-core workstation beasts across all architectures (Arrow Lake, Raptor Lake, Alder Lake, Zen 5, Zen 4, Zen 3).
              </p>
            </div>

            {/* Quick Brand Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Start with a specific brand:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onStartExploring('cpu', 'intel')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors text-left cursor-pointer"
                >
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Intel</span>
                  <span className="text-[10px] text-slate-500">Celeron → i9</span>
                </button>
                <button
                  onClick={() => onStartExploring('cpu', 'amd')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-red-300 dark:hover:border-red-700 transition-colors text-left cursor-pointer"
                >
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">AMD</span>
                  <span className="text-[10px] text-slate-500">Athlon → Ryzen 9</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
            <button
              onClick={() => onStartExploring('cpu')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2.5 px-4 text-xs font-bold text-slate-900 dark:text-white transition-colors cursor-pointer"
            >
              <span>Explore All CPUs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Graphics Cards (GPU) */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Monitor className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                25+ GPUs Cataloged
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Graphics Cards (GPU)
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Explore NVIDIA GeForce RTX/GTX, AMD Radeon RX, and Intel Arc GPUs with exact VRAM configurations, clock speeds, ray tracing, and upscaling technology.
              </p>
            </div>

            {/* Quick Brand Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Start with a specific brand:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onStartExploring('gpu', 'nvidia')}
                  className="flex flex-col p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors text-left cursor-pointer"
                >
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">NVIDIA</span>
                  <span className="text-[10px] text-slate-500 truncate">GTX → RTX 5090</span>
                </button>
                <button
                  onClick={() => onStartExploring('gpu', 'amd')}
                  className="flex flex-col p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-red-300 dark:hover:border-red-700 transition-colors text-left cursor-pointer"
                >
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">AMD</span>
                  <span className="text-[10px] text-slate-500 truncate">RX 580 → 7900 XTX</span>
                </button>
                <button
                  onClick={() => onStartExploring('gpu', 'intel')}
                  className="flex flex-col p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors text-left cursor-pointer"
                >
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Intel Arc</span>
                  <span className="text-[10px] text-slate-500 truncate">A380 → B580</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
            <button
              onClick={() => onStartExploring('gpu')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2.5 px-4 text-xs font-bold text-slate-900 dark:text-white transition-colors cursor-pointer"
            >
              <span>Explore All GPUs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Guarantee Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/40">
          <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Exact Laser-Etched Silicon</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              Every processor and GPU displays its authentic name and socket on the heat spreader or shroud.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/40">
          <TrendingUp className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Real Market Sales Numbers</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              Verified retail sales volume and Steam Hardware Survey rankings for every card and processor.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/40">
          <Scale className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Side-by-Side Comparison</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              Benchmark any 2 or 3 hardware components with instant spec deltas and bottleneck guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
