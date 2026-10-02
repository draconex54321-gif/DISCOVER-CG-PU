import React from 'react';
import { ComponentType, HardwareCompany } from '../types/hardware';
import { COMPANIES } from '../data/companyData';
import { CPU_DATA } from '../data/cpuData';
import { GPU_DATA } from '../data/gpuData';
import { HARDWARE_IMAGES } from '../utils/hardwareImages';
import { Layers } from 'lucide-react';

interface CompanySelectorProps {
  category: ComponentType;
  selectedCompany: HardwareCompany | 'all';
  onSelectCompany: (company: HardwareCompany | 'all') => void;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  category,
  selectedCompany,
  onSelectCompany,
}) => {
  // Available companies based on category
  const companyKeys: HardwareCompany[] =
    category === 'cpu' ? ['intel', 'amd', 'apple'] : ['nvidia', 'amd', 'intel'];

  // Calculate counts
  const totalCount =
    category === 'cpu' ? CPU_DATA.length : GPU_DATA.length;

  const getCompanyCount = (companyId: HardwareCompany) => {
    if (category === 'cpu') {
      return CPU_DATA.filter((c) => c.company === companyId).length;
    } else {
      return GPU_DATA.filter((g) => g.company === companyId).length;
    }
  };

  const getCompanyImage = (companyId: HardwareCompany) => {
    if (category === 'cpu') {
      if (companyId === 'intel') return HARDWARE_IMAGES.intel_cpu;
      if (companyId === 'amd') return HARDWARE_IMAGES.amd_cpu;
      return HARDWARE_IMAGES.amd_cpu;
    } else {
      if (companyId === 'nvidia') return HARDWARE_IMAGES.nvidia_gpu;
      if (companyId === 'amd') return HARDWARE_IMAGES.amd_gpu;
      if (companyId === 'intel') return HARDWARE_IMAGES.intel_gpu;
      return HARDWARE_IMAGES.nvidia_gpu;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
          <span className="font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
            Select Manufacturer ({category.toUpperCase()})
          </span>
          <span className="font-mono tabular-nums">
            {selectedCompany === 'all'
              ? `Showing all ${totalCount} processors`
              : `Showing ${COMPANIES[selectedCompany]?.name || ''} lineup`}
          </span>
        </div>

        {/* Company Selection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* All Companies Button */}
          <button
            onClick={() => onSelectCompany('all')}
            className={`flex flex-col items-start justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedCompany === 'all'
                ? 'bg-slate-900 text-white dark:bg-neutral-800/90 border-slate-900 dark:border-cyan-500/70 shadow-sm'
                : 'bg-white dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-900'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className={`text-sm font-bold flex items-center gap-1.5 ${selectedCompany === 'all' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                <Layers className={`h-4 w-4 ${selectedCompany === 'all' ? 'text-cyan-400' : 'text-slate-400'}`} />
                All Brands
              </span>
              <span className={`text-xs font-mono tabular-nums px-2 py-0.5 rounded ${selectedCompany === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400'}`}>
                {totalCount}
              </span>
            </div>
            <p className={`mt-2 text-[11px] leading-tight ${selectedCompany === 'all' ? 'text-slate-300' : 'text-slate-500 dark:text-neutral-400'}`}>
              Complete {category.toUpperCase()} catalog cross-comparison
            </p>
          </button>

          {/* Specific Companies */}
          {companyKeys.map((companyId) => {
            const comp = COMPANIES[companyId];
            const isSelected = selectedCompany === companyId;
            const count = getCompanyCount(companyId);
            const compImg = getCompanyImage(companyId);

            // Brand accent styles
            let accentBorder = 'border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700';
            let badgeBg = 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300';
            let dotColor = 'bg-slate-400';

            if (companyId === 'intel') {
              dotColor = 'bg-blue-600';
              if (isSelected) {
                accentBorder = 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/20 shadow-xs ring-1 ring-blue-500';
                badgeBg = 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60';
              }
            } else if (companyId === 'amd') {
              dotColor = 'bg-red-600';
              if (isSelected) {
                accentBorder = 'border-red-500 bg-red-50/70 dark:bg-red-950/20 shadow-xs ring-1 ring-red-500';
                badgeBg = 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800/60';
              }
            } else if (companyId === 'nvidia') {
              dotColor = 'bg-emerald-600';
              if (isSelected) {
                accentBorder = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500';
                badgeBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60';
              }
            } else if (companyId === 'apple') {
              dotColor = 'bg-slate-600';
              if (isSelected) {
                accentBorder = 'border-slate-400 bg-slate-100 dark:bg-slate-900 shadow-xs ring-1 ring-slate-400';
                badgeBg = 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
              }
            }

            return (
              <button
                key={companyId}
                onClick={() => onSelectCompany(companyId)}
                className={`relative overflow-hidden flex flex-col items-start justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected ? accentBorder : 'bg-white dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 hover:bg-slate-50 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-7 rounded overflow-hidden bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shrink-0">
                      <img
                        src={compImg}
                        alt={comp.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{comp.name}</span>
                  </div>
                  <span className={`text-xs font-mono font-semibold tabular-nums px-2 py-0.5 rounded ${badgeBg}`}>
                    {count}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-500 dark:text-neutral-400 leading-tight">
                  <span>Founded {comp.foundedYear}</span>
                  <span className="mx-1 text-slate-300 dark:text-neutral-600">·</span>
                  <span className="truncate">{comp.keyArchitectures[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
