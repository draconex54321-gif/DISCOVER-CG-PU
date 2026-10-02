import React from 'react';
import { CPUItem, GPUItem, HardwareItem } from '../types/hardware';
import { getSalesMarketVolume } from '../utils/hardwareImages';
import { HardwareVisual } from './HardwareVisual';
import { Plus, Check, ExternalLink, Zap, Flame, TrendingUp } from 'lucide-react';

interface HardwareCardProps {
  item: HardwareItem;
  type: 'cpu' | 'gpu';
  isCompared: boolean;
  onToggleCompare: (item: HardwareItem) => void;
  onViewDetails: (item: HardwareItem) => void;
  showImages?: boolean;
}

export const HardwareCard: React.FC<HardwareCardProps> = ({
  item,
  type,
  isCompared,
  onToggleCompare,
  onViewDetails,
  showImages = true,
}) => {
  const isCpu = type === 'cpu';
  const cpu = item as CPUItem;
  const gpu = item as GPUItem;
  const sales = getSalesMarketVolume(item);

  // Company styling cues
  let brandColor = 'text-cyan-600 dark:text-cyan-400';
  let brandBorder = 'hover:border-slate-400 dark:hover:border-slate-700';

  if (item.company === 'intel') {
    brandColor = 'text-blue-600 dark:text-blue-400';
    brandBorder = 'hover:border-blue-400 dark:hover:border-blue-600';
  } else if (item.company === 'amd') {
    brandColor = 'text-rose-600 dark:text-rose-400';
    brandBorder = 'hover:border-rose-400 dark:hover:border-rose-600';
  } else if (item.company === 'nvidia') {
    brandColor = 'text-emerald-600 dark:text-emerald-400';
    brandBorder = 'hover:border-emerald-400 dark:hover:border-emerald-600';
  }

  const score = isCpu ? cpu.gamingScore : gpu.gaming1440pScore;

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm transition-all duration-200 hover:shadow-md ${brandBorder}`}
    >
      {/* Exact Laser-Engraved Hardware Visual (Shows Exact Model & Socket) */}
      {showImages && (
        <div
          onClick={() => onViewDetails(item)}
          className="relative cursor-pointer border-b border-slate-100 dark:border-slate-800/80"
          title={`Click to inspect ${item.name} full specifications`}
        >
          <HardwareVisual item={item} type={type} size="md" />

          {/* Floating Price & Series Ribbon */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-bold text-slate-800 dark:text-white bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded shadow-xs border border-slate-200/80 dark:border-slate-700">
              {item.series}
            </span>
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded shadow-xs border border-slate-200/80 dark:border-slate-700 tabular-nums">
              ${item.msrp} USD
            </span>
          </div>
        </div>
      )}

      {/* Main Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <div className="flex items-center gap-1.5 truncate">
              <span className={`font-semibold uppercase tracking-wider ${brandColor}`}>
                {item.company}
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span className="truncate">{item.generation}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span className="font-mono tabular-nums">{item.releaseYear}</span>
            </div>

            {!showImages && (
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 tabular-nums">
                ${item.msrp}
              </span>
            )}
          </div>

          {/* Primary Title */}
          <h3
            onClick={() => onViewDetails(item)}
            className="text-lg font-bold text-slate-900 dark:text-white tracking-tight cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors line-clamp-1"
          >
            {item.name}
          </h3>

          {/* Architecture & Socket/Bus */}
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            {item.architecture}
            <span aria-hidden="true" className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
            {isCpu ? cpu.socket : gpu.computeUnitsOrCores.split('/')[0]}
          </p>

          {/* Sales Volume / Market Popularity */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/30 px-2.5 py-1 rounded-lg">
            <TrendingUp className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="truncate font-medium">{sales.volume}</span>
          </div>

          {/* Technical Specs Metric Grid */}
          <div className="mt-3.5 grid grid-cols-3 gap-2 border-y border-slate-100 dark:border-slate-800/80 py-2.5 text-left">
            {isCpu ? (
              <>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Cores / Threads</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-slate-800 dark:text-slate-100 tabular-nums">
                    {cpu.cores}C / {cpu.threads}T
                  </span>
                  <span className="block text-[10px] text-slate-500 truncate">{cpu.coreBreakdown}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Boost Clock</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
                    {cpu.boostClockGhz.toFixed(1)} GHz
                  </span>
                  <span className="block text-[10px] text-slate-500">{cpu.baseClockGhz.toFixed(1)} GHz Base</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">TDP / Max</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums flex items-center gap-0.5">
                    <Flame className="h-3 w-3 inline text-amber-500" />
                    {cpu.tdpWatts}W
                  </span>
                  <span className="block text-[10px] text-slate-500">Peak: {cpu.maxPowerWatts}W</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">VRAM & Bus</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-slate-800 dark:text-slate-100 tabular-nums">
                    {gpu.vramGb}GB {gpu.vramType}
                  </span>
                  <span className="block text-[10px] text-slate-500">{gpu.busWidthBits}-bit bus</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Boost Clock</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
                    {gpu.boostClockMhz} MHz
                  </span>
                  <span className="block text-[10px] text-slate-500 truncate">{gpu.generation}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">TDP / PSU</span>
                  <span className="text-xs sm:text-sm font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums flex items-center gap-0.5">
                    <Zap className="h-3 w-3 inline text-amber-500" />
                    {gpu.tdpWatts}W
                  </span>
                  <span className="block text-[10px] text-slate-500">Rec: {gpu.recommendedPsuWatts}W</span>
                </div>
              </>
            )}
          </div>

          {/* Performance Score Index Bar */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{isCpu ? 'Gaming Performance Index' : '1440p Gaming Index'}</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white tabular-nums">{score} / 100</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  score >= 90
                    ? 'bg-cyan-500'
                    : score >= 75
                    ? 'bg-blue-500'
                    : score >= 50
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => onToggleCompare(item)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isCompared
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {isCompared ? (
              <>
                <Check className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Comparing</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 text-slate-400" />
                <span>Compare</span>
              </>
            )}
          </button>

          <button
            onClick={() => onViewDetails(item)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-white dark:bg-slate-900 py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            <span>Specs</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
