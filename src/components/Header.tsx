import React from 'react';
import { Activity, Bell, Volume2, VolumeX, Plus, Award, BookOpen, Server, CheckCircle2 } from 'lucide-react';
import { AppNotification } from '../types';

interface HeaderProps {
  activeTab: 'monitoring' | 'projects' | 'leaderboard' | 'guide';
  setActiveTab: (tab: 'monitoring' | 'projects' | 'leaderboard' | 'guide') => void;
  onOpenNewProject: () => void;
  notifications: AppNotification[];
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  totalProjects: number;
  completedProjects: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewProject,
  notifications,
  isNotificationsOpen,
  setIsNotificationsOpen,
  isMuted,
  toggleMute,
  totalProjects,
  completedProjects
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block leading-tight">
                KIDSERVER <span className="text-blue-600">Lab 7</span>
              </span>
              <span className="text-[11px] text-slate-700 hidden sm:block">
                Monitoring Server & Proyek Siswa
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (clean text links with subtle hover/active states) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'monitoring'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Monitoring Real-time</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'projects'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Proyek Siswa ({completedProjects}/{totalProjects})</span>
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'leaderboard'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Papan Skor 100%</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'guide'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Panduan Server</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Mute, Notifications, New Project) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Audio Mute/Unmute */}
            <button
              onClick={toggleMute}
              title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Efek Suara'}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-blue-600" />}
            </button>

            {/* Notification Bell with Badge */}
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`relative p-2 rounded-lg transition-colors ${
                isNotificationsOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Notifikasi Proyek & Server"
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold text-white bg-amber-500 rounded-full tabular-nums">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Proyek Baru</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar for smaller screens */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-100 gap-2 text-xs font-medium text-slate-600 scrollbar-none">
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'monitoring' ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'
            }`}
          >
            Monitoring
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'projects' ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'
            }`}
          >
            Proyek ({completedProjects}/{totalProjects})
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'leaderboard' ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'
            }`}
          >
            Papan Skor
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'guide' ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-slate-50'
            }`}
          >
            Panduan Kelas 7
          </button>
        </div>
      </div>
    </header>
  );
};
