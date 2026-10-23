export interface ServerMetricPoint {
  timestamp: string;
  cpu: number;
  memory: number;
  networkIn: number;
  networkOut: number;
  latency: number;
}

export interface ServerNode {
  id: string;
  name: string;
  role: string;
  ip: string;
  status: 'online' | 'warning' | 'critical';
  cpu: number;
  memoryUsageGB: number;
  memoryTotalGB: number;
  diskUsageGB: number;
  diskTotalGB: number;
  networkSpeedMbps: number;
  latencyMs: number;
  uptimeHours: number;
  temperatureC: number;
  services: {
    name: string;
    port: number;
    status: 'running' | 'degraded' | 'stopped';
  }[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetPercent: number; // e.g. 25, 50, 75, 100
  pointsReward: number; // e.g. 25 points
  completed: boolean;
  completedAt?: string;
  evidenceNote?: string;
}

export interface ProjectReport {
  id: string;
  projectId: string;
  reportedBy: string;
  date: string;
  progressPercent: number;
  pointsEarned: number;
  note: string;
  category: 'Desain' | 'Konfigurasi' | 'Integrasi' | 'Pengujian';
}

export interface StudentProject {
  id: string;
  title: string;
  teamName: string;
  gradeClass: string; // e.g. "Kelas 7-A", "Kelas 7-B"
  students: string[];
  serverId: string;
  description: string;
  category: 'Web App' | 'IoT Sensor' | 'Game Server' | 'Database' | 'Robotika';
  progress: number; // 0 to 100
  points: number; // 0 to 100
  milestones: ProjectMilestone[];
  reports: ProjectReport[];
  status: 'Berjalan' | 'Perlu Perhatian' | 'Selesai 100%';
  createdAt: string;
  lastUpdated: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'milestone' | 'points' | 'warning' | 'info';
  targetPercent?: number;
  projectId?: string;
  projectName?: string;
  timestamp: string;
  read: boolean;
}

export interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  unlocked: boolean;
}
