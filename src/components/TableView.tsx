import React from 'react';
import { CPUItem, GPUItem, HardwareItem } from '../types/hardware';
import { HardwareVisual } from './HardwareVisual';
import { Check, Plus, ExternalLink } from 'lucide-react';

interface TableViewProps {
  items: HardwareItem[];
  type: 'cpu' | 'gpu';
  comparedIds: string[];
  onToggleCompare: (item: HardwareItem) => void;
  onViewDetails: (item: HardwareItem) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  items,
  type,
  comparedIds,
  onToggleCompare,
  onViewDetails,
}) => {
  const isCpu = type === 'cpu';

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
            <tr>
              <th className="py-3.5 pl-4 pr-3">Model</th>
              <th className="px-3 py-3.5">Brand</th>
              <th className="px-3 py-3.5">Architecture</th>
              {isCpu ? (
                <>
                  <th className="px-3 py-3.5">Cores / Threads</th>
                  <th className="px-3 py-3.5">Base / Boost</th>
                  <th className="px-3 py-3.5">Cache</th>
                  <th className="px-3 py-3.5">Socket</th>
                  <th className="px-3 py-3.5">TDP (Base/Peak)</th>
                </>
              ) : (
                <>
                  <th className="px-3 py-3.5">VRAM & Bus</th>
                  <th className="px-3 py-3.5">Clock (MHz)</th>
                  <th className="px-3 py-3.5">Compute Units</th>
                  <th className="px-3 py-3.5">TDP (Watts)</th>
                  <th className="px-3 py-3.5">Upscaling</th>
                </>
              )}
              <th className="px-3 py-3.5 font-mono">Launch MSRP</th>
              <th className="px-3 py-3.5">Score</th>
              <th className="py-3.5 pl-3 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-neutral-800/60 font-mono">
            {items.map((item) => {
              const cpu = item as CPUItem;
              const gpu = item as GPUItem;
              const isCompared = comparedIds.includes(item.id);
              const score = isCpu ? cpu.gamingScore : gpu.gaming1440pScore;

              let brandText = 'text-cyan-600 dark:text-cyan-400';
              if (item.company === 'intel') brandText = 'text-blue-600 dark:text-blue-400';
              if (item.company === 'amd') brandText = 'text-rose-600 dark:text-rose-400';
              if (item.company === 'nvidia') brandText = 'text-emerald-600 dark:text-emerald-400';

              return (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-neutral-800/40 transition-colors group cursor-pointer"
                  onClick={() => onViewDetails(item)}
                >
                  <td className="py-2.5 pl-4 pr-3 font-sans font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-11 rounded overflow-hidden bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shrink-0">
                        <HardwareVisual item={item} type={type} size="sm" className="scale-75 origin-center h-full w-full p-0" />
                      </div>
                      <span className="truncate">{item.name}</span>
                    </div>
                  </td>
                  <td className={`px-3 py-3 uppercase font-semibold text-[11px] ${brandText}`}>
                    {item.company}
                  </td>
                  <td className="px-3 py-3 font-sans text-slate-500 dark:text-neutral-400 text-xs">
                    {item.architecture}
                  </td>

                  {isCpu ? (
                    <>
                      <td className="px-3 py-3 text-slate-800 dark:text-neutral-200 tabular-nums">
                        {cpu.cores}C / {cpu.threads}T
                        <span className="block text-[10px] text-slate-400 font-sans">
                          {cpu.coreBreakdown}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-cyan-600 dark:text-cyan-400 tabular-nums font-semibold">
                        {cpu.baseClockGhz.toFixed(1)} / {cpu.boostClockGhz.toFixed(1)} GHz
                      </td>
                      <td className="px-3 py-3 text-slate-700 dark:text-neutral-300 tabular-nums">
                        {cpu.l3CacheMb} MB L3
                      </td>
                      <td className="px-3 py-3 font-sans text-slate-600 dark:text-neutral-400 font-medium">
                        {cpu.socket}
                      </td>
                      <td className="px-3 py-3 text-amber-600 dark:text-amber-400 tabular-nums">
                        {cpu.tdpWatts}W / {cpu.maxPowerWatts}W
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-3 text-slate-800 dark:text-neutral-200 tabular-nums">
                        {gpu.vramGb}GB {gpu.vramType}
                        <span className="block text-[10px] text-slate-400 font-sans">
                          {gpu.busWidthBits}-bit bus
                        </span>
                      </td>
                      <td className="px-3 py-3 text-cyan-600 dark:text-cyan-400 tabular-nums font-semibold">
                        {gpu.boostClockMhz} MHz
                      </td>
                      <td className="px-3 py-3 text-slate-700 dark:text-neutral-300">
                        {gpu.computeUnitsOrCores.split('/')[0]}
                      </td>
                      <td className="px-3 py-3 text-amber-600 dark:text-amber-400 tabular-nums">
                        {gpu.tdpWatts}W
                      </td>
                      <td className="px-3 py-3 font-sans text-slate-500 dark:text-neutral-400 text-[11px]">
                        {gpu.upscalingTech.split('/')[0]}
                      </td>
                    </>
                  )}

                  <td className="px-3 py-3 text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">
                    ${item.msrp}
                  </td>

                  <td className="px-3 py-3">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        score >= 90
                          ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300'
                          : score >= 75
                          ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400'
                      }`}
                    >
                      {score}
                    </span>
                  </td>

                  <td className="py-3 pl-3 pr-4 text-right font-sans" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onToggleCompare(item)}
                        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          isCompared
                            ? 'bg-cyan-600 text-white font-bold'
                            : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                        }`}
                        title={isCompared ? 'Remove from compare' : 'Add to compare'}
                      >
                        {isCompared ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => onViewDetails(item)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                        title="View Full Specifications"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
