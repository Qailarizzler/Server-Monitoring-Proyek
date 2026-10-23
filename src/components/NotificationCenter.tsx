import React, { useState } from 'react';
import { AppNotification } from '../types';
import { soundManager } from '../utils/audio';
import { 
  X, 
  CheckCheck, 
  Trash2, 
  Award, 
  AlertTriangle, 
  Info, 
  Volume2,
  Clock
} from 'lucide-react';

interface NotificationCenterProps {
  notifications: AppNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onSelectProject
}) => {
  const [filter, setFilter] = useState<'all' | 'milestone' | 'warning'>('all');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter(item => {
    if (filter === 'milestone') return item.type === 'milestone' || item.type === 'points';
    if (filter === 'warning') return item.type === 'warning';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleTestSound = () => {
    soundManager.playNotification();
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/30 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-label="Pusat Notifikasi Otomatis"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Notifikasi Proyek & Server</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>{unreadCount} pesan belum dibaca</span>
              <span>·</span>
              <button
                onClick={handleTestSound}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="Uji coba suara notifikasi"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Tes Suara</span>
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter controls & bulk actions */}
        <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('milestone')}
              className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                filter === 'milestone'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Target Poin
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`px-2.5 py-1 rounded-md transition-colors font-medium ${
                filter === 'warning'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Peringatan
            </button>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="p-1 text-slate-600 hover:text-blue-600 hover:bg-white rounded transition-colors"
                title="Tandai semua dibaca"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-1 text-slate-500 hover:text-red-600 hover:bg-white rounded transition-colors"
                title="Bersihkan riwayat notifikasi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Award className="w-10 h-10 mb-2 text-slate-300 stroke-1" />
              <p className="text-sm font-medium text-slate-600">Belum ada notifikasi baru</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Notifikasi otomatis akan muncul saat proyekmu mencapai target 25%, 50%, 75%, atau 100%, serta saat ada peringatan server.
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => {
              const isMilestone = item.type === 'milestone';
              const isWarning = item.type === 'warning';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (!item.read) onMarkAsRead(item.id);
                    if (item.projectId && onSelectProject) {
                      onSelectProject(item.projectId);
                      onClose();
                    }
                  }}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    !item.read
                      ? 'bg-blue-50/60 border-blue-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                        isMilestone
                          ? 'bg-amber-100 text-amber-700'
                          : isWarning
                          ? 'bg-red-100 text-red-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {isMilestone ? (
                        <Award className="w-4 h-4" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <Info className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {item.title}
                        </span>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.timestamp}</span>
                        </span>

                        {item.targetPercent && (
                          <span className="font-mono font-medium text-blue-600 tabular-nums">
                            Target {item.targetPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info for Grade 7 */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-500">
            Sistem otomatis mengecek capaian milestone & batas aman beban server kelas.
          </p>
        </div>
      </div>
    </div>
  );
};
