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

export interface ProjectDetail {
  name: string;
  description: string;
  summaryContent: string;
  summaryUpdateDate: string;
  logContent: string;
}

export interface LogFileList {
  files: string[];
}

export interface Summary {
  id: number;
  time: string;
  content: string;
  isChecked: boolean;
}

export interface ProjectSummaryList {
  name: string;
  description: string;
  summaries: Summary[];
}
