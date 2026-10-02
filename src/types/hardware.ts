export type ComponentType = 'cpu' | 'gpu';

export type CpuCompany = 'intel' | 'amd' | 'apple';
export type GpuCompany = 'nvidia' | 'amd' | 'intel';
export type HardwareCompany = 'intel' | 'amd' | 'nvidia' | 'apple';

export type BudgetTier = 'budget' | 'mid-range' | 'high-end' | 'flagship' | 'workstation';

export type CpuTier = 
  | 'celeron' 
  | 'pentium' 
  | 'core-i3' 
  | 'core-i5' 
  | 'core-i7' 
  | 'core-i9' 
  | 'core-ultra' 
  | 'xeon' 
  | 'athlon' 
  | 'ryzen-3' 
  | 'ryzen-5' 
  | 'ryzen-7' 
  | 'ryzen-9' 
  | 'threadripper'
  | 'apple-m';

export interface CPUItem {
  id: string;
  name: string;
  company: CpuCompany;
  tier: CpuTier;
  series: string; // e.g., "Core i9", "Celeron", "Ryzen 7"
  generation: string; // e.g. "14th Gen (Raptor Lake Refresh)", "Zen 4 (Ryzen 7000)"
  architecture: string; // e.g. "Raptor Lake-S", "Arrow Lake-S", "Granite Ridge", "Raphael"
  socket: string; // e.g. "LGA 1700", "LGA 1851", "AM5", "AM4"
  cores: number;
  threads: number;
  coreBreakdown: string; // e.g. "8P + 16E", "8 Cores", "2P + 0E"
  baseClockGhz: number;
  boostClockGhz: number;
  l3CacheMb: number;
  totalCacheMb: number;
  tdpWatts: number;
  maxPowerWatts: number; // PL2 or PPT
  processNode: string; // e.g. "Intel 7 (10nm)", "TSMC 4nm", "TSMC 5nm"
  integratedGpu: string; // e.g. "Intel UHD 770", "AMD Radeon (2 CU)", "None (F-SKU)"
  memorySupport: string; // e.g. "DDR5-6400 / DDR4-3200"
  pcieGen: string; // e.g. "PCIe 5.0 (x16)"
  releaseYear: number;
  msrp: number; // USD
  budgetTier: BudgetTier;
  gamingScore: number; // 0-100 relative index
  productivityScore: number; // 0-100 relative index
  efficiencyScore: number; // 0-100 relative index
  features: string[];
  description: string;
  targetAudience: string;
}

export interface GPUItem {
  id: string;
  name: string;
  company: GpuCompany;
  series: string; // e.g. "GeForce RTX 40 Series", "Radeon RX 7000 Series", "Arc Battlemage"
  generation: string; // e.g. "Ada Lovelace", "Blackwell", "RDNA 3", "Battlemage"
  architecture: string;
  vramGb: number;
  vramType: string; // "GDDR7" | "GDDR6X" | "GDDR6" | "GDDR5"
  busWidthBits: number;
  bandwidthGbps: number;
  computeUnitsOrCores: string; // e.g. "16,384 CUDA Cores", "6,144 Stream Processors", "32 Xe Cores"
  baseClockMhz: number;
  boostClockMhz: number;
  tdpWatts: number;
  recommendedPsuWatts: number;
  powerConnectors: string; // e.g. "1x 16-pin 12V-2x6", "2x 8-pin"
  processNode: string;
  rayTracingGen: string; // e.g. "4th Gen Tensor / 3rd Gen RT", "2nd Gen RT", "Ray Tracing Units"
  upscalingTech: string; // e.g. "DLSS 4 / Frame Gen", "FSR 3.1 / AFMF", "XeSS 2"
  releaseYear: number;
  msrp: number;
  budgetTier: BudgetTier;
  gaming1080pScore: number; // 0-100
  gaming1440pScore: number; // 0-100
  gaming4kScore: number; // 0-100
  features: string[];
  description: string;
  targetAudience: string;
}

export type HardwareItem = CPUItem | GPUItem;

export interface CompanyInfo {
  id: HardwareCompany;
  name: string;
  fullName: string;
  foundedYear: number;
  headquarters: string;
  accentColor: string;
  tagline: string;
  keyArchitectures: string[];
  cpuCount?: number;
  gpuCount?: number;
}
