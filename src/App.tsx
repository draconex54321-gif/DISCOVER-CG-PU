import React, { useState, useMemo, useEffect } from 'react';
import { ComponentType, HardwareCompany, BudgetTier, HardwareItem, CPUItem, GPUItem } from './types/hardware';
import { CPU_DATA } from './data/cpuData';
import { GPU_DATA } from './data/gpuData';
import { Header } from './components/Header';
import { StartMenu } from './components/StartMenu';
import { CompanySelector } from './components/CompanySelector';
import { FilterBar } from './components/FilterBar';
import { HardwareCard } from './components/HardwareCard';
import { HardwareDetailModal } from './components/HardwareDetailModal';
import { ComparisonTray } from './components/ComparisonTray';
import { ComparisonModal } from './components/ComparisonModal';
import { TableView } from './components/TableView';
import { BudgetGuideModal } from './components/BudgetGuideModal';
import { Cpu, Monitor, FilterX, ArrowLeft } from 'lucide-react';

export default function App() {
  // Navigation View: 'menu' (Welcome / Starting Hub) or 'catalog' (Full Hardware Explorer)
  const [currentView, setCurrentView] = useState<'menu' | 'catalog'>('menu');

  // Theme: 'light' by default as explicitly requested
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [activeCategory, setActiveCategory] = useState<ComponentType>('cpu');
  const [selectedCompany, setSelectedCompany] = useState<HardwareCompany | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier | 'all'>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Comparison State
  const [comparedCpuIds, setComparedCpuIds] = useState<string[]>([]);
  const [comparedGpuIds, setComparedGpuIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Detail Modal State
  const [selectedDetailItem, setSelectedDetailItem] = useState<HardwareItem | null>(null);
  const [detailItemType, setDetailItemType] = useState<ComponentType>('cpu');

  // Budget Guide Modal
  const [isBudgetGuideOpen, setIsBudgetGuideOpen] = useState(false);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Launching exploration from Start Menu
  const handleStartExploring = (category: ComponentType, company: HardwareCompany | 'all' = 'all') => {
    setActiveCategory(category);
    setSelectedCompany(company);
    setSelectedTier('all');
    setSearchQuery('');
    setCurrentView('catalog');
  };

  // Reset tier when company or category changes
  const handleCategoryChange = (category: ComponentType) => {
    setActiveCategory(category);
    setSelectedCompany('all');
    setSelectedTier('all');
    setSearchQuery('');
    setCurrentView('catalog');
  };

  const handleCompanyChange = (company: HardwareCompany | 'all') => {
    setSelectedCompany(company);
    setSelectedTier('all');
  };

  // Compute available Series / Tiers based on current category and company
  const availableTiers = useMemo(() => {
    if (activeCategory === 'cpu') {
      if (selectedCompany === 'intel') {
        return [
          { value: 'celeron', label: 'Celeron' },
          { value: 'pentium', label: 'Pentium' },
          { value: 'core-i3', label: 'Core i3' },
          { value: 'core-i5', label: 'Core i5' },
          { value: 'core-i7', label: 'Core i7' },
          { value: 'core-i9', label: 'Core i9' },
          { value: 'core-ultra', label: 'Core Ultra' },
          { value: 'xeon', label: 'Xeon' },
        ];
      }
      if (selectedCompany === 'amd') {
        return [
          { value: 'athlon', label: 'Athlon' },
          { value: 'ryzen-3', label: 'Ryzen 3' },
          { value: 'ryzen-5', label: 'Ryzen 5' },
          { value: 'ryzen-7', label: 'Ryzen 7' },
          { value: 'ryzen-9', label: 'Ryzen 9' },
          { value: 'threadripper', label: 'Threadripper' },
        ];
      }
      return [
        { value: 'celeron', label: 'Celeron' },
        { value: 'pentium', label: 'Pentium' },
        { value: 'core-i3', label: 'Core i3' },
        { value: 'core-i5', label: 'Core i5' },
        { value: 'core-i7', label: 'Core i7' },
        { value: 'core-i9', label: 'Core i9' },
        { value: 'core-ultra', label: 'Core Ultra' },
        { value: 'ryzen-3', label: 'Ryzen 3' },
        { value: 'ryzen-5', label: 'Ryzen 5' },
        { value: 'ryzen-7', label: 'Ryzen 7' },
        { value: 'ryzen-9', label: 'Ryzen 9' },
        { value: 'threadripper', label: 'Threadripper' },
        { value: 'xeon', label: 'Xeon' },
      ];
    } else {
      if (selectedCompany === 'nvidia') {
        return [
          { value: 'RTX 50', label: 'RTX 50 Series' },
          { value: 'RTX 40', label: 'RTX 40 Series' },
          { value: 'RTX 30', label: 'RTX 30 Series' },
          { value: 'GTX 16', label: 'GTX 16 Series' },
          { value: 'GTX 10', label: 'GTX 10 Series' },
          { value: 'GT', label: 'GT Series' },
        ];
      }
      if (selectedCompany === 'amd') {
        return [
          { value: 'RX 7000', label: 'Radeon RX 7000' },
          { value: 'RX 6000', label: 'Radeon RX 6000' },
          { value: 'RX 500', label: 'Radeon RX 500' },
        ];
      }
      if (selectedCompany === 'intel') {
        return [
          { value: 'Arc B-Series', label: 'Arc Battlemage' },
          { value: 'Arc A-Series', label: 'Arc Alchemist' },
        ];
      }
      return [
        { value: 'RTX 50', label: 'GeForce RTX 50' },
        { value: 'RTX 40', label: 'GeForce RTX 40' },
        { value: 'RTX 30', label: 'GeForce RTX 30' },
        { value: 'RX 7000', label: 'Radeon RX 7000' },
        { value: 'RX 6000', label: 'Radeon RX 6000' },
        { value: 'Arc B-Series', label: 'Arc Battlemage' },
        { value: 'Arc A-Series', label: 'Arc Alchemist' },
      ];
    }
  }, [activeCategory, selectedCompany]);

  // Filtered and Sorted Hardware List
  const filteredItems = useMemo(() => {
    const rawList: HardwareItem[] = activeCategory === 'cpu' ? CPU_DATA : GPU_DATA;

    return rawList
      .filter((item) => {
        // 1. Company Filter
        if (selectedCompany !== 'all' && item.company !== selectedCompany) {
          return false;
        }

        // 2. Tier / Series Filter
        if (selectedTier !== 'all') {
          if (activeCategory === 'cpu') {
            const cpu = item as CPUItem;
            if (cpu.tier !== selectedTier && !cpu.series.toLowerCase().includes(selectedTier.toLowerCase())) {
              return false;
            }
          } else {
            const gpu = item as GPUItem;
            if (!gpu.series.toLowerCase().includes(selectedTier.toLowerCase())) {
              return false;
            }
          }
        }

        // 3. Budget Tier Filter
        if (selectedBudget !== 'all' && item.budgetTier !== selectedBudget) {
          return false;
        }

        // 4. Search Query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(q);
          const matchArch = item.architecture.toLowerCase().includes(q);
          const matchGen = item.generation.toLowerCase().includes(q);
          const matchCompany = item.company.toLowerCase().includes(q);

          let matchSpecific = false;
          if (activeCategory === 'cpu') {
            const cpu = item as CPUItem;
            matchSpecific =
              cpu.socket.toLowerCase().includes(q) ||
              cpu.series.toLowerCase().includes(q) ||
              cpu.coreBreakdown.toLowerCase().includes(q) ||
              `${cpu.cores}` === q;
          } else {
            const gpu = item as GPUItem;
            matchSpecific =
              gpu.series.toLowerCase().includes(q) ||
              `${gpu.vramGb}gb` === q ||
              `${gpu.vramGb}` === q ||
              gpu.upscalingTech.toLowerCase().includes(q);
          }

          if (!matchName && !matchArch && !matchGen && !matchCompany && !matchSpecific) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.releaseYear - a.releaseYear;
        }
        if (sortBy === 'price-asc') {
          return a.msrp - b.msrp;
        }
        if (sortBy === 'price-desc') {
          return b.msrp - a.msrp;
        }
        if (sortBy === 'performance') {
          const scoreA = activeCategory === 'cpu' ? (a as CPUItem).gamingScore : (a as GPUItem).gaming1440pScore;
          const scoreB = activeCategory === 'cpu' ? (b as CPUItem).gamingScore : (b as GPUItem).gaming1440pScore;
          return scoreB - scoreA;
        }
        if (sortBy === 'cores-vram') {
          if (activeCategory === 'cpu') {
            return (b as CPUItem).cores - (a as CPUItem).cores;
          } else {
            return (b as GPUItem).vramGb - (a as GPUItem).vramGb;
          }
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [activeCategory, selectedCompany, selectedTier, selectedBudget, searchQuery, sortBy]);

  // Comparison toggle logic
  const activeComparedIds = activeCategory === 'cpu' ? comparedCpuIds : comparedGpuIds;

  const handleToggleCompare = (item: HardwareItem) => {
    const isCpu = activeCategory === 'cpu';
    const currentList = isCpu ? comparedCpuIds : comparedGpuIds;
    const setList = isCpu ? setComparedCpuIds : setComparedGpuIds;

    if (currentList.includes(item.id)) {
      setList(currentList.filter((id) => id !== item.id));
    } else {
      if (currentList.length >= 3) {
        setList([...currentList.slice(1), item.id]);
      } else {
        setList([...currentList, item.id]);
      }
    }
  };

  const handleRemoveCompareItem = (id: string) => {
    if (activeCategory === 'cpu') {
      setComparedCpuIds(comparedCpuIds.filter((item) => item !== id));
    } else {
      setComparedGpuIds(comparedGpuIds.filter((item) => item !== id));
    }
  };

  const handleClearCompare = () => {
    if (activeCategory === 'cpu') {
      setComparedCpuIds([]);
    } else {
      setComparedGpuIds([]);
    }
  };

  const comparedObjects = useMemo(() => {
    const rawList: HardwareItem[] = activeCategory === 'cpu' ? CPU_DATA : GPU_DATA;
    return activeComparedIds
      .map((id) => rawList.find((i) => i.id === id))
      .filter((i): i is HardwareItem => Boolean(i));
  }, [activeCategory, activeComparedIds]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-800 dark:selection:text-cyan-200 transition-colors">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeCategory}
        onTabChange={handleCategoryChange}
        compareCount={activeComparedIds.length}
        onOpenCompare={() => {
          if (activeComparedIds.length > 0) {
            setIsCompareModalOpen(true);
          }
        }}
        onOpenBudgetGuide={() => setIsBudgetGuideOpen(true)}
        onGoHome={() => setCurrentView('menu')}
        isHome={currentView === 'menu'}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main View Area */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 flex-1">
        {currentView === 'menu' ? (
          /* ======================================================== */
          /* STARTING MENU / WELCOME HUB SCREEN                        */
          /* ======================================================== */
          <StartMenu
            onStartExploring={handleStartExploring}
            onOpenBudgetGuide={() => setIsBudgetGuideOpen(true)}
            onOpenCompare={() => {
              if (activeComparedIds.length > 0) {
                setIsCompareModalOpen(true);
              } else {
                handleStartExploring('cpu');
              }
            }}
          />
        ) : (
          /* ======================================================== */
          /* HARDWARE EXPLORER & CATALOG SCREEN                       */
          /* ======================================================== */
          <div className="space-y-8">
            {/* Category Hero / Switcher banner */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800/80 pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setCurrentView('menu')}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Starting Menu</span>
                  </button>
                  <span className="text-slate-300 dark:text-neutral-700">·</span>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                    {activeCategory.toUpperCase()} Architecture Catalog
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {activeCategory === 'cpu'
                    ? 'Central Processing Units (CPU) Database'
                    : 'Graphics Processing Units (GPU) Database'}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  {activeCategory === 'cpu'
                    ? 'Browse Intel & AMD desktop and workstation processors from Celeron and Athlon to Core i9 and Threadripper, with authentic laser-engraved IHS heat spreaders and live specs.'
                    : 'Browse NVIDIA GeForce, AMD Radeon, and Intel Arc discrete graphics cards from entry 1080p to RTX 5090 Blackwell and RDNA 3, with exact shroud models and VRAM.'}
                </p>
              </div>

              {/* Quick Segmented Category Toggle */}
              <div className="flex items-center bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-1.5 rounded-xl shrink-0 shadow-xs">
                <button
                  onClick={() => handleCategoryChange('cpu')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === 'cpu'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Cpu className="h-4 w-4" />
                  <span>CPU Catalog</span>
                  <span className="font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-800 dark:text-neutral-300">
                    {CPU_DATA.length}
                  </span>
                </button>

                <button
                  onClick={() => handleCategoryChange('gpu')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === 'gpu'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                  <span>GPU Catalog</span>
                  <span className="font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-800 dark:text-neutral-300">
                    {GPU_DATA.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Company Selector (Intel, AMD, NVIDIA, etc.) */}
            <CompanySelector
              category={activeCategory}
              selectedCompany={selectedCompany}
              onSelectCompany={handleCompanyChange}
            />

            {/* Filter & Search Bar */}
            <FilterBar
              category={activeCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTier={selectedTier}
              onSelectTier={setSelectedTier}
              selectedBudget={selectedBudget}
              onSelectBudget={setSelectedBudget}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              availableTiers={availableTiers}
              totalResults={filteredItems.length}
            />

            {/* Content Display: Grid View or Spec Table View */}
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/30 p-12 text-center shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-neutral-800 text-slate-400 dark:text-neutral-400 mb-4">
                  <FilterX className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No Processors Found</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400 max-w-md">
                  No {activeCategory.toUpperCase()} models match your current filter or search criteria (&ldquo;{searchQuery}&rdquo;). Try clearing filters or searching another model number.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTier('all');
                    setSelectedBudget('all');
                    setSelectedCompany('all');
                  }}
                  className="mt-4 rounded-xl bg-slate-900 dark:bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredItems.map((item) => (
                  <HardwareCard
                    key={item.id}
                    item={item}
                    type={activeCategory}
                    isCompared={activeComparedIds.includes(item.id)}
                    onToggleCompare={handleToggleCompare}
                    onViewDetails={(item) => {
                      setSelectedDetailItem(item);
                      setDetailItemType(activeCategory);
                    }}
                  />
                ))}
              </div>
            ) : (
              <TableView
                items={filteredItems}
                type={activeCategory}
                comparedIds={activeComparedIds}
                onToggleCompare={handleToggleCompare}
                onViewDetails={(item) => {
                  setSelectedDetailItem(item);
                  setDetailItemType(activeCategory);
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Floating Bottom Comparison Tray */}
      <ComparisonTray
        items={comparedObjects}
        type={activeCategory}
        onRemoveItem={handleRemoveCompareItem}
        onClearAll={handleClearCompare}
        onOpenModal={() => setIsCompareModalOpen(true)}
      />

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <ComparisonModal
          items={comparedObjects}
          type={activeCategory}
          onRemoveItem={handleRemoveCompareItem}
          onClearAll={handleClearCompare}
          onClose={() => setIsCompareModalOpen(false)}
        />
      )}

      {/* Hardware Full Specifications Modal */}
      {selectedDetailItem && (
        <HardwareDetailModal
          item={selectedDetailItem}
          type={detailItemType}
          isCompared={activeComparedIds.includes(selectedDetailItem.id)}
          onToggleCompare={handleToggleCompare}
          onClose={() => setSelectedDetailItem(null)}
        />
      )}

      {/* Budget Guide Modal */}
      {isBudgetGuideOpen && (
        <BudgetGuideModal
          onClose={() => setIsBudgetGuideOpen(false)}
          onSelectItem={(item, type) => {
            setActiveCategory(type);
            setSelectedDetailItem(item);
            setDetailItemType(type);
            setCurrentView('catalog');
          }}
        />
      )}

      {/* Quiet Technical Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-8 text-slate-500 dark:text-neutral-400 transition-colors">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-900 dark:text-white">SiliconAtlas</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Laser-Accurate Hardware Database</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="font-mono tabular-nums">{CPU_DATA.length} CPUs / {GPU_DATA.length} GPUs</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentView('menu')}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer"
            >
              Start Menu
            </button>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Intel · AMD · NVIDIA</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>All Generations & Budgets</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
