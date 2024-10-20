export interface Project {
  id: number;
  isUrgent: boolean;
  name: string;
  description: string;
  containerStatus: "WORKING" | "NOT_WORKING";
  cpuUsage: string;
  memoryUsage: string;
}

export interface ProjectList {
  projects: Project[];
}
