import React from 'react';
import { CPUItem, GPUItem, HardwareItem } from '../types/hardware';
import { getSalesMarketVolume } from '../utils/hardwareImages';
import { HardwareVisual } from './HardwareVisual';
import { X, Check, Plus, Zap, TrendingUp, BarChart3 } from 'lucide-react';

interface HardwareDetailModalProps {
  item: HardwareItem | null;
  type: 'cpu' | 'gpu';
  isCompared: boolean;
  onToggleCompare: (item: HardwareItem) => void;
  onClose: () => void;
}

export const HardwareDetailModal: React.FC<HardwareDetailModalProps> = ({
  item,
  type,
  isCompared,
  onToggleCompare,
  onClose,
}) => {
  if (!item) return null;

  const isCpu = type === 'cpu';
  const cpu = item as CPUItem;
  const gpu = item as GPUItem;
  const sales = getSalesMarketVolume(item);

  // Performance comparison baselines for the interactive chart
  const primaryScore = isCpu ? cpu.gamingScore : gpu.gaming1440pScore;
  const productivityScore = isCpu ? cpu.productivityScore : gpu.gaming4kScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md">
      <div
        className="relative flex flex-col max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 p-6 pb-4 bg-slate-50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {item.company}
              </span>
              <span>·</span>
              <span>{item.generation}</span>
              <span>·</span>
              <span className="font-mono tabular-nums">{item.releaseYear}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              {item.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Architecture: <strong className="text-slate-700 dark:text-slate-200">{item.architecture}</strong>
              <span className="mx-2">·</span>
              MSRP: <strong className="text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">${item.msrp} USD</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(item)}
              className={`flex items-center gap-1.5 rounded-lg py-1.5 px-3 text-xs font-semibold transition-colors cursor-pointer ${
                isCompared
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {isCompared ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              <span>{isCompared ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Top Product Hero Showcase: Exact Laser-Etched Hardware Visual + Sales Volume */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30 overflow-hidden">
            {/* Exact Hardware Visual Column */}
            <div className="md:col-span-5 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
              <HardwareVisual item={item} type={type} size="lg" />
            </div>

            {/* Product Highlights & Sales Volume Data */}
            <div className="md:col-span-7 p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                  Market Adoption & Sales Statistics
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                    {sales.volume}
                  </span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mt-1">
                  Status: {sales.badge}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Quick specs row */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Category</span>
                  <strong className="capitalize">{item.budgetTier} Tier</strong>
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Fabrication</span>
                  <strong>{isCpu ? cpu.processNode : gpu.processNode}</strong>
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">TDP</span>
                  <strong className="text-amber-600 dark:text-amber-400 font-mono">{item.tdpWatts}W</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Benchmark Bar Chart Section */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                Performance Benchmark Index & Comparative Scaling
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Relative Index (0–100)</span>
            </div>

            <div className="space-y-3.5">
              {/* Primary Gaming Score */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {isCpu ? 'High-Refresh Gaming FPS Index' : '1440p Ultra Gaming Index'}
                  </span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                    {primaryScore} / 100
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-700"
                    style={{ width: `${primaryScore}%` }}
                  />
                </div>
              </div>

              {/* Productivity / 4K Score */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {isCpu ? 'Multi-Thread Productivity & Render Score' : '4K UHD Ray Tracing & Heavy Load Index'}
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                    {productivityScore} / 100
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${productivityScore}%` }}
                  />
                </div>
              </div>

              {/* Energy Efficiency Score */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {isCpu ? 'Performance-Per-Watt Efficiency' : '1080p Esports Competitive Index'}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {isCpu ? cpu.efficiencyScore : gpu.gaming1080pScore} / 100
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                    style={{ width: `${isCpu ? cpu.efficiencyScore : gpu.gaming1080pScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Datasheet Table */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
              Technical Specifications Datasheet
            </h4>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-neutral-900/20">
                  {isCpu ? (
                    <>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40 w-1/3">Socket / Platform</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200 font-semibold">{cpu.socket}</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Core Configuration</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{cpu.cores} Cores / {cpu.threads} Threads ({cpu.coreBreakdown})</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Base / Boost Clock</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{cpu.baseClockGhz.toFixed(2)} GHz Base / {cpu.boostClockGhz.toFixed(2)} GHz Boost</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Cache Memory</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{cpu.l3CacheMb} MB L3 Cache (Total {cpu.totalCacheMb} MB)</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Thermal Design Power (TDP)</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{cpu.tdpWatts}W Base / {cpu.maxPowerWatts}W Peak Turbo Limit</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Fabrication Node</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{cpu.processNode}</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Integrated Graphics</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{cpu.integratedGpu}</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Memory & PCIe Support</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{cpu.memorySupport} · {cpu.pcieGen}</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40 w-1/3">VRAM Capacity & Type</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200 font-semibold">{gpu.vramGb} GB {gpu.vramType} ({gpu.busWidthBits}-bit)</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Memory Bandwidth</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{gpu.bandwidthGbps} GB/s</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Compute Units / Shaders</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{gpu.computeUnitsOrCores}</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Core Clocks (Base / Boost)</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{gpu.baseClockMhz} MHz / {gpu.boostClockMhz} MHz</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">TDP & Recommended PSU</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{gpu.tdpWatts}W TBP / {gpu.recommendedPsuWatts}W PSU Recommended</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Power Connectors</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{gpu.powerConnectors}</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Upscaling & Ray Tracing</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{gpu.upscalingTech} · {gpu.rayTracingGen}</td>
                      </tr>
                      <tr className="divide-x divide-slate-200 dark:divide-slate-800/80">
                        <td className="px-4 py-2.5 font-medium text-slate-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-900/40">Process Node</td>
                        <td className="px-4 py-2.5 font-mono text-slate-900 dark:text-neutral-200">{gpu.processNode}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Architectural Highlights */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Key Features & Architectural Enhancements
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium"
                >
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* System Recommendation Advice */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 p-4">
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              Builder Advice & Recommended Pairings
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isCpu ? (
                <>
                  Optimal pairing for <strong>{cpu.name}</strong>: Match with an appropriate motherboard chipset ({cpu.socket.includes('1851') ? 'Z890 / B860' : cpu.socket.includes('1700') ? 'Z790 / B760' : cpu.socket.includes('AM5') ? 'X670 / B650' : 'B550 / A520'}). Pair with a {cpu.tdpWatts > 150 ? '360mm AIO liquid cooler' : cpu.tdpWatts > 100 ? 'dual-tower air cooler (Peerless Assassin)' : 'standard 120mm air cooler'} for peak sustained boost clocks.
                </>
              ) : (
                <>
                  Optimal pairing for <strong>{gpu.name}</strong>: Best paired with a modern 6-core or 8-core CPU (e.g. Ryzen 7 7800X3D or Core i5-14600K/13600K) to avoid bottlenecking in CPU-intensive titles. Minimum {gpu.recommendedPsuWatts}W Gold-certified power supply required.
                </>
              )}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-400">Target User:</span> {item.targetAudience}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-950">
          <div className="text-xs text-slate-500">
            Category: <strong className="capitalize text-slate-700 dark:text-slate-300">{item.budgetTier} Tier</strong>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Datasheet
          </button>
        </div>
      </div>
    </div>
  );
};
