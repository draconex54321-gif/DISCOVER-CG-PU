import React from 'react';
import { CPUItem, GPUItem, HardwareItem } from '../types/hardware';
import { HardwareVisual } from './HardwareVisual';
import { X, Trophy, Check, Zap, Flame, DollarSign, Plus } from 'lucide-react';

interface ComparisonModalProps {
  items: HardwareItem[];
  type: 'cpu' | 'gpu';
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  items,
  type,
  onRemoveItem,
  onClearAll,
  onClose,
}) => {
  if (items.length === 0) return null;

  const isCpu = type === 'cpu';
  const cpus = items as CPUItem[];
  const gpus = items as GPUItem[];

  // Helper to find the maximum value in an array of numbers
  const getMax = (arr: number[]) => Math.max(...arr);
  // Helper to find the minimum value in an array of numbers
  const getMin = (arr: number[]) => Math.min(...arr);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md">
      <div
        className="relative flex flex-col max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900/60">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Side-by-Side Spec Analyzer
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Comparing {items.length} {type.toUpperCase()} Models
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              Clear Comparison
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Header Row: Products with Exact Hardware Visual */}
          <div className={`grid grid-cols-${items.length} gap-4`}>
            {items.map((item) => (
              <div
                key={item.id}
                className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-neutral-900/40 p-4 text-center overflow-hidden flex flex-col items-center shadow-xs"
              >
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-2.5 right-2.5 z-10 text-slate-400 hover:text-rose-500 dark:text-neutral-400 dark:hover:text-rose-400 cursor-pointer p-1 bg-white/80 dark:bg-neutral-900/80 rounded-full shadow-xs"
                  title="Remove this item"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Exact Product Hardware Visual */}
                <div className="w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 mb-2.5 shrink-0 shadow-xs">
                  <HardwareVisual item={item} type={type} size="sm" />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {item.company} · {item.releaseYear}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">{item.name}</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">{item.architecture}</p>
                <div className="mt-2 text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  ${item.msrp} USD
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-slate-200 dark:divide-neutral-800">
                {/* Release Price */}
                <tr className="bg-slate-50/50 dark:bg-neutral-900/20">
                  <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400 w-1/4">MSRP Launch Price</td>
                  {items.map((item) => {
                    const isLowest = item.msrp === getMin(items.map((i) => i.msrp));
                    return (
                      <td key={item.id} className="px-4 py-3 font-mono font-semibold tabular-nums">
                        <span className={isLowest ? 'text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1' : 'text-slate-800 dark:text-neutral-200'}>
                          ${item.msrp}
                          {isLowest && <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-sans font-medium">(Lowest Price)</span>}
                        </span>
                      </td>
                    );
                  })}
                </tr>

                {/* Score Index */}
                <tr className="bg-white dark:bg-neutral-900/40">
                  <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">
                    {isCpu ? 'Gaming Performance Index' : '1440p Gaming Index'}
                  </td>
                  {items.map((item) => {
                    const score = isCpu ? (item as CPUItem).gamingScore : (item as GPUItem).gaming1440pScore;
                    const isHighest = score === getMax(items.map((i) => isCpu ? (i as CPUItem).gamingScore : (i as GPUItem).gaming1440pScore));
                    return (
                      <td key={item.id} className="px-4 py-3 font-mono font-bold tabular-nums">
                        <div className="flex items-center gap-2">
                          <span className={isHighest ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-700 dark:text-neutral-300'}>
                            {score} / 100
                          </span>
                          {isHighest && <Trophy className="h-3.5 w-3.5 text-amber-500" />}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {isCpu ? (
                  <>
                    {/* CPU Cores & Threads */}
                    <tr className="bg-slate-50/50 dark:bg-neutral-900/20">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">Cores / Threads</td>
                      {cpus.map((cpu) => {
                        const isMostCores = cpu.cores === getMax(cpus.map((c) => c.cores));
                        return (
                          <td key={cpu.id} className="px-4 py-3 font-mono tabular-nums">
                            <span className={isMostCores ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-neutral-200'}>
                              {cpu.cores} Cores / {cpu.threads} Threads
                            </span>
                            <span className="block text-[11px] text-slate-500 font-sans">{cpu.coreBreakdown}</span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Clock Speeds */}
                    <tr className="bg-white dark:bg-neutral-900/40">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">Boost / Base Clock</td>
                      {cpus.map((cpu) => {
                        const isFastest = cpu.boostClockGhz === getMax(cpus.map((c) => c.boostClockGhz));
                        return (
                          <td key={cpu.id} className="px-4 py-3 font-mono tabular-nums">
                            <span className={isFastest ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-neutral-200'}>
                              {cpu.boostClockGhz.toFixed(2)} GHz Boost
                            </span>
                            <span className="block text-[11px] text-slate-500">
                              {cpu.baseClockGhz.toFixed(2)} GHz Base
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Cache */}
                    <tr className="bg-slate-50/50 dark:bg-neutral-900/20">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">L3 / Total Cache</td>
                      {cpus.map((cpu) => {
                        const isBiggestCache = cpu.l3CacheMb === getMax(cpus.map((c) => c.l3CacheMb));
                        return (
                          <td key={cpu.id} className="px-4 py-3 font-mono tabular-nums">
                            <span className={isBiggestCache ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-800 dark:text-neutral-200'}>
                              {cpu.l3CacheMb} MB L3 Cache
                            </span>
                            <span className="block text-[11px] text-slate-500">
                              Total: {cpu.totalCacheMb} MB
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Socket */}
                    <tr className="bg-white dark:bg-neutral-900/40">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">Socket / Platform</td>
                      {cpus.map((cpu) => (
                        <td key={cpu.id} className="px-4 py-3 font-mono text-slate-800 dark:text-neutral-300 font-medium">
                          {cpu.socket}
                        </td>
                      ))}
                    </tr>

                    {/* TDP */}
                    <tr className="bg-slate-50/50 dark:bg-neutral-900/20">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">Power & TDP</td>
                      {cpus.map((cpu) => {
                        const isLowestPower = cpu.tdpWatts === getMin(cpus.map((c) => c.tdpWatts));
                        return (
                          <td key={cpu.id} className="px-4 py-3 font-mono tabular-nums">
                            <span className={isLowestPower ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-800 dark:text-neutral-200'}>
                              {cpu.tdpWatts}W Base TDP
                            </span>
                            <span className="block text-[11px] text-slate-500">
                              Peak Max: {cpu.maxPowerWatts}W
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </>
                ) : (
                  <>
                    {/* GPU VRAM */}
                    <tr className="bg-slate-50/50 dark:bg-neutral-900/20">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">VRAM Capacity & Type</td>
                      {gpus.map((gpu) => {
                        const isMaxVram = gpu.vramGb === getMax(gpus.map((g) => g.vramGb));
                        return (
                          <td key={gpu.id} className="px-4 py-3 font-mono tabular-nums">
                            <span className={isMaxVram ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-neutral-200'}>
                              {gpu.vramGb} GB {gpu.vramType}
                            </span>
                            <span className="block text-[11px] text-slate-500">
                              {gpu.busWidthBits}-bit ({gpu.bandwidthGbps} GB/s)
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* GPU Boost Clock */}
                    <tr className="bg-white dark:bg-neutral-900/40">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">Boost Clock</td>
                      {gpus.map((gpu) => {
                        const isFastest = gpu.boostClockMhz === getMax(gpus.map((g) => g.boostClockMhz));
                        return (
                          <td key={gpu.id} className="px-4 py-3 font-mono tabular-nums">
                            <span className={isFastest ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-800 dark:text-neutral-200'}>
                              {gpu.boostClockMhz} MHz
                            </span>
                            <span className="block text-[11px] text-slate-500">
                              Base: {gpu.baseClockMhz} MHz
                            </span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Compute Units / Shaders */}
                    <tr className="bg-slate-50/50 dark:bg-neutral-900/20">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">Compute Shaders</td>
                      {gpus.map((gpu) => (
                        <td key={gpu.id} className="px-4 py-3 font-mono text-slate-800 dark:text-neutral-300">
                          {gpu.computeUnitsOrCores}
                        </td>
                      ))}
                    </tr>

                    {/* GPU Power & PSU */}
                    <tr className="bg-white dark:bg-neutral-900/40">
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-neutral-400">TDP & Rec. PSU</td>
                      {gpus.map((gpu) => {
                        const isLowestPower = gpu.tdpWatts === getMin(gpus.map((g) => g.tdpWatts));
                        return (
                          <td key={gpu.id} className="px-4 py-3 font-mono tabular-nums">
                            <span className={isLowestPower ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-800 dark:text-neutral-200'}>
                              {gpu.tdpWatts}W TDP
                            </span>
                            <span className="block text-[11px] text-slate-500">
                              Rec. PSU: {gpu.recommendedPsuWatts}W
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 dark:border-neutral-800 px-6 py-4 bg-slate-50 dark:bg-neutral-950">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 dark:bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            Done Comparing
          </button>
        </div>
      </div>
    </div>
  );
};
