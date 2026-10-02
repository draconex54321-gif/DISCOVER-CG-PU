import { CompanyInfo } from '../types/hardware';

export const COMPANIES: Record<string, CompanyInfo> = {
  intel: {
    id: 'intel',
    name: 'Intel',
    fullName: 'Intel Corporation',
    foundedYear: 1968,
    headquarters: 'Santa Clara, California, USA',
    accentColor: '#0071C5', // Intel Classic Blue
    tagline: 'Pioneer of the x86 microprocessor architecture, leading desktop and client computing from Celeron to Core Ultra & Xeon.',
    keyArchitectures: ['Arrow Lake', 'Raptor Lake', 'Alder Lake', 'Battlemage Xe2', 'Alchemist Xe'],
  },
  amd: {
    id: 'amd',
    name: 'AMD',
    fullName: 'Advanced Micro Devices, Inc.',
    foundedYear: 1969,
    headquarters: 'Santa Clara, California, USA',
    accentColor: '#ED1C24', // AMD Radeon/Ryzen Red
    tagline: 'Creator of the Zen microarchitecture and RDNA graphics, revolutionizing multi-core desktop CPUs and high-efficiency gaming GPUs.',
    keyArchitectures: ['Zen 5 (Granite Ridge)', 'Zen 4 (Raphael)', 'Zen 3 (Vermeer)', 'RDNA 3', 'RDNA 2'],
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA',
    fullName: 'NVIDIA Corporation',
    foundedYear: 1993,
    headquarters: 'Santa Clara, California, USA',
    accentColor: '#76B900', // NVIDIA GeForce Green
    tagline: 'The global leader in discrete graphics processing units, AI acceleration, and ray tracing technologies from entry GTX to RTX 50 Blackwell.',
    keyArchitectures: ['Blackwell', 'Ada Lovelace', 'Ampere', 'Turing', 'Pascal'],
  },
  apple: {
    id: 'apple',
    name: 'Apple Silicon',
    fullName: 'Apple Inc.',
    foundedYear: 1976,
    headquarters: 'Cupertino, California, USA',
    accentColor: '#94A3B8', // Sleek Aluminum Silver
    tagline: 'Custom ARM-based System-on-Chips renowned for class-leading performance-per-watt and unified memory architecture.',
    keyArchitectures: ['M4 (TSMC N3E)', 'M3 (TSMC N3B)', 'M2', 'M1'],
  },
};
