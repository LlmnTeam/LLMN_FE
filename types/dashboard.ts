// /types/dashboard.ts
export interface Metric {
  time: string;
  value: number;
}

export interface CpuHistory extends Metric {
  cpuUsage: number;
}

export interface MemoryHistory extends Metric {
  memoryUsage: number;
}

export interface NetworkMetric extends Metric {
  networkReceived?: number;
  networkSent?: number;
}

export interface DashboardData {
  ip: string;
  cpuUsage: string;
  memoryUsage: string;
  networkReceived: string;
  networkSent: string;
  summary: string;
  cpuHistory: CpuHistory[];
  memoryHistory: MemoryHistory[];
  networkInHistory: NetworkMetric[];
  networkOutHistory: NetworkMetric[];
}
