import React from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CPU_DATA } from '../data/cpuData';
import { GPU_DATA } from '../data/gpuData';
import { HardwareItem } from '../types/hardware';
import { HardwareVisual } from './HardwareVisual';

interface BudgetGuideModalProps {
  onClose: () => void;
  onSelectItem: (item: HardwareItem, type: 'cpu' | 'gpu') => void;
}

export const BudgetGuideModal: React.FC<BudgetGuideModalProps> = ({
  onClose,
  onSelectItem,
}) => {
  const budgetTiers = [
    {
      title: 'Ultra Budget & Entry Level',
      priceRange: 'Sub-$150 USD',
      target: '1080p Esports, Office Productivity, HTPC, NAS Servers',
      description: 'Maximum performance-per-dollar. Excellent for first-time builders and budget-constrained setups.',
      bestCpu: CPU_DATA.find((c) => c.id === 'intel-i3-12100f') || CPU_DATA[0],
      alternativeCpu: CPU_DATA.find((c) => c.id === 'amd-ryzen-5-5500'),
      bestGpu: GPU_DATA.find((g) => g.id === 'amd-rx-6600') || GPU_DATA[0],
      alternativeGpu: GPU_DATA.find((g) => g.id === 'intel-arc-a380'),
    },
    {
      title: 'Mainstream Value Sweet-Spot',
      priceRange: '$150 – $350 USD',
      target: '1440p High-FPS Gaming, Streaming, Programming, Content Creation',
      description: 'The golden tier where you get ~85% of flagship performance at less than half the cost.',
      bestCpu: CPU_DATA.find((c) => c.id === 'amd-ryzen-5-7600x') || CPU_DATA[0],
      alternativeCpu: CPU_DATA.find((c) => c.id === 'intel-i5-13600k'),
      bestGpu: GPU_DATA.find((g) => g.id === 'intel-arc-b580') || GPU_DATA[0],
      alternativeGpu: GPU_DATA.find((g) => g.id === 'nvidia-rtx-4060'),
    },
    {
      title: 'High-End Enthusiast Performance',
      priceRange: '$350 – $650 USD',
      target: '1440p Max Settings, 4K High Refresh, Heavy Video Editing & 3D Modeling',
      description: 'Equipped with cutting-edge 3D V-Cache and generous 16GB VRAM buffers that eliminate stuttering.',
      bestCpu: CPU_DATA.find((c) => c.id === 'amd-ryzen-7-7800x3d') || CPU_DATA[0],
      alternativeCpu: CPU_DATA.find((c) => c.id === 'intel-i7-14700k'),
      bestGpu: GPU_DATA.find((g) => g.id === 'amd-rx-7800-xt') || GPU_DATA[0],
      alternativeGpu: GPU_DATA.find((g) => g.id === 'nvidia-rtx-4070-super'),
    },
    {
      title: 'Flagship & No-Compromise Halo',
      priceRange: '$650+ USD',
      target: '4K Ultra Ray Tracing, AI Fine-Tuning & Local LLMs, CGI Render Workstations',
      description: 'The pinnacle of silicon engineering. Maximum thread counts, 24GB-32GB GDDR7/GDDR6X, and unmatched raw power.',
      bestCpu: CPU_DATA.find((c) => c.id === 'amd-ryzen-9-9950x') || CPU_DATA[0],
      alternativeCpu: CPU_DATA.find((c) => c.id === 'intel-i9-14900k'),
      bestGpu: GPU_DATA.find((g) => g.id === 'nvidia-rtx-5090') || GPU_DATA[0],
      alternativeGpu: GPU_DATA.find((g) => g.id === 'amd-rx-7900-xtx'),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md">
      <div
        className="relative flex flex-col max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 px-6 py-4 bg-slate-50 dark:bg-neutral-900/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              SiliconAtlas Hardware Buyer Guide
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Best CPU & GPU Recommendations By Budget
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {budgetTiers.map((tier, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/30 p-5 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 dark:border-neutral-800/80 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">{tier.target}</p>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-lg shrink-0">
                  {tier.priceRange}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                {tier.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CPU Pick */}
                <div className="rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-3.5 flex flex-col justify-between shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-18 rounded-lg overflow-hidden bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shrink-0">
                      <HardwareVisual item={tier.bestCpu} type="cpu" size="sm" className="scale-75 origin-center h-full w-full p-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-0.5">
                        Top CPU Pick
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{tier.bestCpu.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 truncate">
                        {tier.bestCpu.cores}C/{tier.bestCpu.threads}T · {tier.bestCpu.boostClockGhz} GHz Boost · {tier.bestCpu.socket}
                      </p>
                      {tier.alternativeCpu && (
                        <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-1 truncate">
                          Alternative: <span className="text-slate-700 dark:text-neutral-400">{tier.alternativeCpu.name}</span> (${tier.alternativeCpu.msrp})
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-neutral-900">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      ${tier.bestCpu.msrp} USD
                    </span>
                    <button
                      onClick={() => {
                        onSelectItem(tier.bestCpu, 'cpu');
                        onClose();
                      }}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      View Specs <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* GPU Pick */}
                <div className="rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 p-3.5 flex flex-col justify-between shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-18 rounded-lg overflow-hidden bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shrink-0">
                      <HardwareVisual item={tier.bestGpu} type="gpu" size="sm" className="scale-75 origin-center h-full w-full p-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-0.5">
                        Top GPU Pick
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{tier.bestGpu.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 truncate">
                        {tier.bestGpu.vramGb}GB {tier.bestGpu.vramType} · {tier.bestGpu.tdpWatts}W · {tier.bestGpu.upscalingTech.split('/')[0]}
                      </p>
                      {tier.alternativeGpu && (
                        <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-1 truncate">
                          Alternative: <span className="text-slate-700 dark:text-neutral-400">{tier.alternativeGpu.name}</span> (${tier.alternativeGpu.msrp})
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-neutral-900">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      ${tier.bestGpu.msrp} USD
                    </span>
                    <button
                      onClick={() => {
                        onSelectItem(tier.bestGpu, 'gpu');
                        onClose();
                      }}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      View Specs <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 dark:border-neutral-800 px-6 py-4 bg-slate-50 dark:bg-neutral-950">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 dark:bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
