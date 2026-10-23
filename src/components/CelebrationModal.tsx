import React from 'react';
import { StudentProject } from '../types';
import { Trophy, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface CelebrationModalProps {
  project: StudentProject | null;
  isOpen: boolean;
  onClose: () => void;
  onGoToLeaderboard: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  project,
  isOpen,
  onClose,
  onGoToLeaderboard
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-center p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-20 h-20 bg-linear-to-tr from-amber-400 to-yellow-300 text-amber-950 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Selamat! Capaian 100% Sempurna</span>
        </div>

        <h3 className="text-xl font-black text-slate-900 mt-1">
          {project.title}
        </h3>

        <p className="text-xs text-blue-600 font-semibold mt-1">
          {project.teamName} · {project.gradeClass}
        </p>

        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          Luar biasa! Kelompokmu berhasil menuntaskan seluruh 4 fase proyek dan mengumpulkan <strong className="text-slate-900 font-mono">100 / 100 Poin Penuh</strong>! Lencana <span className="font-semibold text-amber-700">"Master Deployer Kelas 7"</span> telah berhasil dibuka.
        </p>

        <div className="my-5 p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>4 Fase Milestone Tuntas Diverifikasi</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Server Layanan Beroperasi Stabil di LAN Sekolah</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Skor Masuk ke Jajaran Puncak Papan Peringkat</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => {
              onClose();
              onGoToLeaderboard();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <span>Lihat di Papan Skor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
