import React from 'react';
import { CPUItem, GPUItem, HardwareItem } from '../types/hardware';

interface HardwareVisualProps {
  item: HardwareItem;
  type: 'cpu' | 'gpu';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const HardwareVisual: React.FC<HardwareVisualProps> = ({
  item,
  type,
  size = 'md',
  className = '',
}) => {
  const isCpu = type === 'cpu';
  const cpu = item as CPUItem;
  const gpu = item as GPUItem;

  // Sizing dimensions
  const heightClass = size === 'sm' ? 'h-24' : size === 'lg' ? 'h-52' : 'h-36';

  if (isCpu) {
    // Determine Intel vs AMD vs Apple
    const isIntel = cpu.company === 'intel';
    const isAmd = cpu.company === 'amd';

    return (
      <div
        className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 p-3 select-none ${className}`}
      >
        {/* PCB Substrate */}
        <div
          className={`relative flex items-center justify-center shadow-lg border ${
            isIntel
              ? 'w-28 h-32 rounded-sm bg-gradient-to-br from-emerald-800 to-emerald-950 border-emerald-700/80 shadow-emerald-950/20'
              : isAmd
              ? 'w-32 h-32 rounded-sm bg-gradient-to-br from-neutral-800 to-neutral-900 border-neutral-700 shadow-black/30'
              : 'w-28 h-28 rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 border-slate-700 shadow-black/40'
          }`}
        >
          {/* Gold Alignment Triangle */}
          <div className="absolute top-1 left-1 w-0 h-0 border-l-[6px] border-l-amber-400 border-b-[6px] border-b-transparent" />

          {/* Substrate Traces / Notches */}
          {isIntel && (
            <>
              <div className="absolute top-0 left-6 w-3 h-1 bg-amber-400/90 rounded-b-xs" />
              <div className="absolute bottom-0 right-6 w-3 h-1 bg-amber-400/90 rounded-t-xs" />
            </>
          )}

          {/* Integrated Heat Spreader (IHS) */}
          <div
            className={`relative flex flex-col justify-between p-2 shadow-inner border transition-transform duration-300 ${
              isIntel
                ? 'w-24 h-28 rounded-sm bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-slate-300 shadow-slate-500/20'
                : isAmd
                ? 'w-26 h-26 rounded-md bg-gradient-to-b from-neutral-300 via-neutral-300 to-neutral-400 border-neutral-400 shadow-neutral-600/30'
                : 'w-22 h-22 rounded-md bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-slate-600 shadow-black/50 text-white'
            }`}
          >
            {/* Top Brand Logo Etching */}
            <div className="flex items-center justify-between">
              <span
                className={`text-[9px] font-black tracking-widest uppercase ${
                  isIntel
                    ? 'text-blue-700 dark:text-blue-600'
                    : isAmd
                    ? 'text-red-700 dark:text-red-600'
                    : 'text-slate-200'
                }`}
              >
                {isIntel ? 'intel®' : isAmd ? 'AMD' : ' Silicon'}
              </span>
              <span className="text-[7px] font-mono text-slate-500 font-bold uppercase">
                {cpu.socket}
              </span>
            </div>

            {/* Exact Laser-Engraved Model Name */}
            <div className="text-center my-0.5">
              <div
                className={`text-[11px] font-black uppercase tracking-tight leading-tight line-clamp-2 ${
                  isIntel
                    ? 'text-slate-800'
                    : isAmd
                    ? 'text-neutral-900'
                    : 'text-white'
                }`}
              >
                {cpu.name}
              </div>
              <div className="text-[7.5px] font-mono text-slate-600 font-semibold tracking-wider mt-0.5 uppercase">
                {cpu.cores}C · {cpu.boostClockGhz}GHz · {cpu.tdpWatts}W
              </div>
            </div>

            {/* Bottom Batch / Architecture Laser Mark */}
            <div className="flex items-center justify-between text-[6.5px] font-mono text-slate-500 uppercase border-t border-slate-400/40 pt-0.5">
              <span className="truncate max-w-[65px]">{cpu.architecture.split(' ')[0]}</span>
              <span>MALAY {cpu.releaseYear}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // GPU Visualization (Authentic Shroud with Fans & Model Stamping)
  const isNvidia = gpu.company === 'nvidia';
  const isAmdGpu = gpu.company === 'amd';
  const isIntelGpu = gpu.company === 'intel';

  // Determine fan count based on TDP / tier
  const fanCount = gpu.tdpWatts >= 250 ? 3 : gpu.tdpWatts >= 115 ? 2 : 1;

  return (
    <div
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 p-2.5 select-none ${className}`}
    >
      {/* GPU Body Shroud */}
      <div className="relative w-full max-w-[280px] h-28 rounded-lg bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 border border-neutral-700 shadow-xl flex flex-col justify-between p-2">
        {/* Top Edge: Metal Bracket & Illuminated Exact Model Bar */}
        <div className="flex items-center justify-between border-b border-neutral-700/80 pb-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                isNvidia
                  ? 'bg-emerald-400 shadow-sm shadow-emerald-400/80'
                  : isAmdGpu
                  ? 'bg-red-500 shadow-sm shadow-red-500/80'
                  : 'bg-blue-400 shadow-sm shadow-blue-400/80'
              }`}
            />
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider ${
                isNvidia ? 'text-emerald-400' : isAmdGpu ? 'text-rose-400' : 'text-blue-400'
              }`}
            >
              {gpu.name}
            </span>
          </div>

          <span className="text-[9px] font-mono text-neutral-300 font-semibold tabular-nums bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
            {gpu.vramGb}GB {gpu.vramType}
          </span>
        </div>

        {/* Center: Fan Assemblies */}
        <div className="flex items-center justify-around my-1 px-2">
          {Array.from({ length: fanCount }).map((_, idx) => (
            <div
              key={idx}
              className="relative h-14 w-14 rounded-full bg-neutral-950 border border-neutral-700/90 flex items-center justify-center shadow-inner"
            >
              {/* Spinning Fan Blades SVG */}
              <svg className="h-11 w-11 text-neutral-700 animate-spin-slow opacity-80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="14" fill="#262626" />
                <path d="M50 36 C45 20, 55 10, 50 0 C45 10, 35 20, 50 36 Z" fill="currentColor" />
                <path d="M64 50 C80 45, 90 55, 100 50 C90 45, 80 35, 64 50 Z" fill="currentColor" />
                <path d="M50 64 C55 80, 45 90, 50 100 C55 90, 65 80, 50 64 Z" fill="currentColor" />
                <path d="M36 50 C20 55, 10 45, 0 50 C10 55, 20 65, 36 50 Z" fill="currentColor" />
              </svg>
              {/* Fan Center Hub */}
              <div className="absolute h-4 w-4 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center">
                <span className="text-[5px] font-bold text-neutral-300">
                  {isNvidia ? 'GE' : isAmdGpu ? 'RX' : 'ARC'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Edge: PCIe Slot Gold Finger Contacts */}
        <div className="flex items-center justify-between border-t border-neutral-700/80 pt-1 text-[8px] font-mono text-neutral-400">
          <span className="truncate max-w-[120px]">{gpu.architecture}</span>
          <div className="flex items-center gap-1">
            <span className="h-1 w-12 bg-amber-400/90 rounded-xs" title="PCIe 4.0/5.0 Gold Pins" />
            <span className="text-neutral-500 font-semibold">{gpu.tdpWatts}W</span>
          </div>
        </div>
      </div>
    </div>
  );
};
