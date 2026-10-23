import React, { useState, useEffect, useRef } from 'react';
import { 
  ServerNode, 
  StudentProject, 
  AppNotification, 
  BadgeItem, 
  ServerMetricPoint,
  ProjectReport 
} from './types';
import { 
  INITIAL_SERVERS, 
  INITIAL_PROJECTS, 
  STUDENT_BADGES 
} from './data/mockData';
import { Header } from './components/Header';
import { ServerMonitoring } from './components/ServerMonitoring';
import { ProjectList } from './components/ProjectList';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { NewProjectModal } from './components/NewProjectModal';
import { LeaderboardView } from './components/LeaderboardView';
import { EducationalGuide } from './components/EducationalGuide';
import { NotificationCenter } from './components/NotificationCenter';
import { CelebrationModal } from './components/CelebrationModal';
import { soundManager } from './utils/audio';
import { triggerConfetti } from './utils/confetti';

const STORAGE_KEYS = {
  SERVERS: 'kidserver_servers_v1',
  PROJECTS: 'kidserver_projects_v1',
  NOTIFICATIONS: 'kidserver_notifications_v1',
  MUTED: 'kidserver_muted_v1'
};

export default function App() {
  // Navigation & Modal states
  const [activeTab, setActiveTab] = useState<'monitoring' | 'projects' | 'leaderboard' | 'guide'>('monitoring');
  const [selectedServerId, setSelectedServerId] = useState<string>('srv-01');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [celebrationProject, setCelebrationProject] = useState<StudentProject | null>(null);

  // Audio mute state
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MUTED);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  // Data states with localStorage persistence
  const [servers, setServers] = useState<ServerNode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVERS);
      return saved ? JSON.parse(saved) : INITIAL_SERVERS;
    } catch {
      return INITIAL_SERVERS;
    }
  });

  const [projects, setProjects] = useState<StudentProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'notif-init-1',
        title: 'Target 100% Tercapai! 🎉',
        message: 'Selamat untuk Kelompok 2 (Green Tech SMP)! Proyek Monitor Hidroponik telah tuntas 100% dan membuka lencana Master Deployer.',
        type: 'milestone',
        targetPercent: 100,
        projectId: 'proj-02',
        projectName: 'Monitor Suhu & Nutrisi Hidroponik Otomatis',
        timestamp: '21 Okt 2026, 14:30',
        read: false
      },
      {
        id: 'notif-init-2',
        title: 'Target 75% Dibuka!',
        message: 'Kelompok 1 (Siber Bimasakti) berhasil menyelesaikan Fase 3 integrasi artikel mading.',
        type: 'milestone',
        targetPercent: 75,
        projectId: 'proj-01',
        projectName: 'Portal Mading Digital & Profil Siswa 7A',
        timestamp: '20 Okt 2026, 10:15',
        read: true
      },
      {
        id: 'notif-init-3',
        title: 'Peringatan Kapasitas CPU',
        message: 'Server KUIS-INFORMATIKA sempat menyentuh 65% beban CPU saat sesi latihan kelas.',
        type: 'warning',
        timestamp: '18 Okt 2026, 11:20',
        read: true
      }
    ];
  });

  const [badges] = useState<BadgeItem[]>(STUDENT_BADGES);

  // Real-time Telemetry Stream state
  const [isStreaming, setIsStreaming] = useState(true);
  const [refreshIntervalMs, setRefreshIntervalMs] = useState(1000);
  const [telemetryHistory, setTelemetryHistory] = useState<ServerMetricPoint[]>(() => {
    // Generate initial 20 points
    const points: ServerMetricPoint[] = [];
    const now = Date.now();
    for (let i = 20; i >= 0; i--) {
      points.push({
        timestamp: new Date(now - i * 1500).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        cpu: Math.floor(25 + Math.random() * 15),
        memory: 2.2 + Math.random() * 0.4,
        networkIn: Math.floor(15 + Math.random() * 10),
        networkOut: Math.floor(8 + Math.random() * 5),
        latency: Math.floor(16 + Math.random() * 6)
      });
    }
    return points;
  });

  // Track recent warning to avoid spamming alerts
  const lastAlertTimeRef = useRef<number>(0);

  // Sync mute state with soundManager
  useEffect(() => {
    soundManager.setMuted(isMuted);
    try {
      localStorage.setItem(STORAGE_KEYS.MUTED, JSON.stringify(isMuted));
    } catch {
      // ignore
    }
  }, [isMuted]);

  // Persist state updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVERS, JSON.stringify(servers));
    } catch {
      // ignore
    }
  }, [servers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  // Helper to trigger automated notifications for target milestones
  const checkMilestoneThresholds = (
    project: StudentProject, 
    previousProgress: number, 
    newProgress: number
  ) => {
    const thresholds = [25, 50, 75, 100];
    const crossedThresholds = thresholds.filter(t => previousProgress < t && newProgress >= t);

    crossedThresholds.forEach(target => {
      let title = '';
      let msg = '';

      if (target === 25) {
        title = `Milestone 25% Terlampaui! 🚀`;
        msg = `Bagus sekali! ${project.teamName} (${project.gradeClass}) telah menuntaskan Fase 1 untuk proyek "${project.title}". 25 Poin tersimpan!`;
      } else if (target === 50) {
        title = `Separuh Jalan (50%) Terlampaui! ⚙️`;
        msg = `Mantap! Proyek "${project.title}" telah mencapai 50 Poin. Konfigurasi server dan basis data telah diverifikasi aktif!`;
      } else if (target === 75) {
        title = `Tahap Pemantapan (75%)! ⚡`;
        msg = `Keren! Proyek "${project.title}" mengumpulkan 75 Poin. Lanjutkan pengujian performa akhir untuk menyentuh 100%!`;
      } else if (target === 100) {
        title = `TARGET 100% TUNTAS SEMPURNA! 🎉`;
        msg = `LUAR BIASA! ${project.teamName} berhasil menyelesaikan 100% proyek "${project.title}" dengan 100 Poin Penuh! Lencana Master Deployer dibuka!`;
      }

      const newNotif: AppNotification = {
        id: `notif-${Date.now()}-${target}`,
        title,
        message: msg,
        type: 'milestone',
        targetPercent: target,
        projectId: project.id,
        projectName: project.title,
        timestamp: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        }),
        read: false
      };

      setNotifications(prev => [newNotif, ...prev]);

      if (target === 100) {
        soundManager.playMilestoneTriumph();
        triggerConfetti();
        setCelebrationProject(project);
      } else {
        soundManager.playNotification();
      }
    });
  };

  // Real-time server telemetry simulation interval
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setServers(prevServers => {
        return prevServers.map(srv => {
          if (srv.id !== selectedServerId) return srv;

          // Natural fluctuation
          const cpuDelta = (Math.random() - 0.5) * 4;
          const nextCpu = Math.min(Math.max(Math.round(srv.cpu + cpuDelta), 10), 98);

          const memDelta = (Math.random() - 0.5) * 0.08;
          const nextMem = Math.min(Math.max(Number((srv.memoryUsageGB + memDelta).toFixed(2)), 0.8), srv.memoryTotalGB - 0.2);

          const netIn = Math.max(5, Math.round(srv.networkSpeedMbps * 0.6 + (Math.random() - 0.5) * 6));
          const netOut = Math.max(3, Math.round(srv.networkSpeedMbps * 0.4 + (Math.random() - 0.5) * 4));
          const latency = Math.max(10, Math.round(srv.latencyMs + (Math.random() - 0.5) * 3));

          // Temperature correlates with CPU
          const temp = Math.min(75, Math.max(38, Math.round(40 + (nextCpu / 100) * 25)));

          // Check for critical alert (> 85%)
          if (nextCpu > 85 && Date.now() - lastAlertTimeRef.current > 30000) {
            lastAlertTimeRef.current = Date.now();
            soundManager.playAlert();
            const alertNotif: AppNotification = {
              id: `alert-cpu-${Date.now()}`,
              title: `Peringatan Beban CPU Tinggi (${nextCpu}%)`,
              message: `Server ${srv.name} mengalami lonjakan pemrosesan di atas 85%. Pantau layanan atau bersihkan cache memori!`,
              type: 'warning',
              timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              read: false
            };
            setNotifications(prev => [alertNotif, ...prev]);
          }

          return {
            ...srv,
            cpu: nextCpu,
            memoryUsageGB: nextMem,
            temperatureC: temp,
            latencyMs: latency,
            status: nextCpu > 85 ? 'critical' : nextCpu > 65 ? 'warning' : 'online'
          };
        });
      });

      // Update telemetry history for the selected server
      const current = servers.find(s => s.id === selectedServerId) || servers[0];
      setTelemetryHistory(prev => {
        const nextPoint: ServerMetricPoint = {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: current.cpu,
          memory: current.memoryUsageGB,
          networkIn: Math.round(current.networkSpeedMbps * 0.65),
          networkOut: Math.round(current.networkSpeedMbps * 0.35),
          latency: current.latencyMs
        };
        const updated = [...prev.slice(1), nextPoint];
        return updated;
      });
    }, refreshIntervalMs);

    return () => clearInterval(interval);
  }, [isStreaming, refreshIntervalMs, selectedServerId, servers]);

  // Load simulator trigger
  const handleTriggerSpike = (type: 'traffic' | 'heavy' | 'clean' | 'eco') => {
    setServers(prev => {
      return prev.map(srv => {
        if (srv.id !== selectedServerId) return srv;

        let nextCpu = srv.cpu;
        let nextMem = srv.memoryUsageGB;
        let nextNet = srv.networkSpeedMbps;

        if (type === 'traffic') {
          nextCpu = Math.min(84, srv.cpu + 35);
          nextNet = srv.networkSpeedMbps + 45;
          soundManager.playNotification();
        } else if (type === 'heavy') {
          nextCpu = 92;
          nextMem = Math.min(srv.memoryTotalGB - 0.4, srv.memoryUsageGB + 1.2);
          lastAlertTimeRef.current = Date.now();
          soundManager.playAlert();

          const alertNotif: AppNotification = {
            id: `alert-stress-${Date.now()}`,
            title: `Peringatan: Stress Test Diaktifkan (${srv.name})`,
            message: `Beban komputasi melonjak ke 92%! Kipas pendingin bekerja maksimal untuk mendinginkan prosesor.`,
            type: 'warning',
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            read: false
          };
          setNotifications(n => [alertNotif, ...n]);
        } else if (type === 'clean') {
          nextCpu = Math.max(18, srv.cpu - 25);
          nextMem = Math.max(1.2, srv.memoryUsageGB - 1.0);
          soundManager.playNotification();
        } else if (type === 'eco') {
          nextCpu = 14;
          nextMem = 1.4;
          nextNet = 8.5;
          soundManager.playNotification();
        }

        return {
          ...srv,
          cpu: nextCpu,
          memoryUsageGB: Number(nextMem.toFixed(2)),
          networkSpeedMbps: Number(nextNet.toFixed(1)),
          status: nextCpu > 85 ? 'critical' : nextCpu > 65 ? 'warning' : 'online'
        };
      });
    });
  };

  // Restart individual service
  const handleRestartService = (serverIndex: number, serviceName: string) => {
    soundManager.playNotification();
    setServers(prev => {
      const updated = [...prev];
      const srv = { ...updated[serverIndex] };
      srv.cpu = Math.max(15, srv.cpu - 10);
      updated[serverIndex] = srv;
      return updated;
    });

    const notif: AppNotification = {
      id: `service-restart-${Date.now()}`,
      title: `Layanan ${serviceName} Direstart`,
      message: `Layanan ${serviceName} di server ${servers[serverIndex].name} berhasil dimulai ulang dengan memori bersih.`,
      type: 'info',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Update milestone status from project modal
  const handleUpdateMilestone = (
    projectId: string, 
    milestoneId: string, 
    completed: boolean,
    evidenceNote?: string
  ) => {
    setProjects(prevProjects => {
      return prevProjects.map(proj => {
        if (proj.id !== projectId) return proj;

        const previousProgress = proj.progress;
        const updatedMilestones = proj.milestones.map(m => {
          if (m.id !== milestoneId) return m;
          return {
            ...m,
            completed,
            completedAt: completed ? new Date().toISOString().split('T')[0] : undefined,
            evidenceNote: evidenceNote || m.evidenceNote
          };
        });

        const totalEarnedPoints = updatedMilestones
          .filter(m => m.completed)
          .reduce((sum, m) => sum + m.pointsReward, 0);

        const newProgress = Math.min(100, totalEarnedPoints);

        const updatedProject: StudentProject = {
          ...proj,
          milestones: updatedMilestones,
          points: totalEarnedPoints,
          progress: newProgress,
          status: newProgress === 100 ? 'Selesai 100%' : 'Berjalan',
          lastUpdated: new Date().toISOString().split('T')[0]
        };

        checkMilestoneThresholds(updatedProject, previousProgress, newProgress);
        return updatedProject;
      });
    });
  };

  // Submit student progress report
  const handleSubmitReport = (
    projectId: string, 
    reportData: Omit<ProjectReport, 'id' | 'projectId' | 'date'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newReport: ProjectReport = {
      id: `rep-${Date.now()}`,
      projectId,
      date: today,
      ...reportData
    };

    setProjects(prevProjects => {
      return prevProjects.map(proj => {
        if (proj.id !== projectId) return proj;

        const previousProgress = proj.progress;
        // Total points calculation from milestones
        const currentMilestonesPoints = proj.milestones
          .filter(m => m.completed)
          .reduce((acc, m) => acc + m.pointsReward, 0);

        const totalPoints = Math.min(100, Math.max(proj.points, currentMilestonesPoints));

        const updatedProject: StudentProject = {
          ...proj,
          reports: [newReport, ...proj.reports],
          points: totalPoints,
          progress: totalPoints,
          status: totalPoints === 100 ? 'Selesai 100%' : 'Berjalan',
          lastUpdated: today
        };

        checkMilestoneThresholds(updatedProject, previousProgress, totalPoints);
        return updatedProject;
      });
    });
  };

  // Add new student project
  const handleAddProject = (
    newProjectData: Omit<StudentProject, 'id' | 'createdAt' | 'lastUpdated' | 'progress' | 'points' | 'reports' | 'status'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newProject: StudentProject = {
      id: `proj-${Date.now()}`,
      createdAt: today,
      lastUpdated: today,
      progress: 0,
      points: 0,
      reports: [],
      status: 'Berjalan',
      ...newProjectData
    };

    setProjects(prev => [newProject, ...prev]);
    soundManager.playNotification();

    const notif: AppNotification = {
      id: `new-proj-${Date.now()}`,
      title: `Proyek Baru Terdaftar: ${newProject.title}`,
      message: `${newProject.teamName} (${newProject.gradeClass}) telah mendaftarkan proyek baru dengan target 100 Poin. Semangat!`,
      type: 'info',
      projectId: newProject.id,
      projectName: newProject.title,
      timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Notification actions
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Selected project for modal
  const activeProject = projects.find(p => p.id === selectedProjectId) || null;
  const completedProjectsCount = projects.filter(p => p.progress === 100).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        notifications={notifications}
        isNotificationsOpen={isNotificationsOpen}
        setIsNotificationsOpen={setIsNotificationsOpen}
        isMuted={isMuted}
        toggleMute={() => setIsMuted(!isMuted)}
        totalProjects={projects.length}
        completedProjects={completedProjectsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'monitoring' && (
          <ServerMonitoring
            servers={servers}
            selectedServerId={selectedServerId}
            onSelectServer={(id) => setSelectedServerId(id)}
            telemetryHistory={telemetryHistory}
            isStreaming={isStreaming}
            setIsStreaming={setIsStreaming}
            refreshIntervalMs={refreshIntervalMs}
            setRefreshIntervalMs={setRefreshIntervalMs}
            onTriggerSpike={handleTriggerSpike}
            onRestartService={handleRestartService}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectList
            projects={projects}
            onSelectProject={(id) => setSelectedProjectId(id)}
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            projects={projects}
            badges={badges}
            onSelectProject={(id) => setSelectedProjectId(id)}
          />
        )}

        {activeTab === 'guide' && (
          <EducationalGuide />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">KIDSERVER Lab 7</span>
            <span>·</span>
            <span>Program Monitoring Server & Proyek Siswa Informatika Kelas 7</span>
          </div>
          <div className="text-slate-400">
            Sistem Poin 100% · Notifikasi Otomatis Capaian Target
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <NotificationCenter
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
        onSelectProject={(id) => setSelectedProjectId(id)}
      />

      <ProjectDetailModal
        project={activeProject}
        isOpen={!!selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        onUpdateMilestone={handleUpdateMilestone}
        onSubmitReport={handleSubmitReport}
      />

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        servers={servers}
        onAddProject={handleAddProject}
      />

      <CelebrationModal
        project={celebrationProject}
        isOpen={!!celebrationProject}
        onClose={() => setCelebrationProject(null)}
        onGoToLeaderboard={() => {
          setCelebrationProject(null);
          setActiveTab('leaderboard');
        }}
      />
    </div>
  );
}
