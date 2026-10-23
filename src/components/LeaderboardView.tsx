import React from 'react';
import { StudentProject, BadgeItem } from '../types';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Compass, 
  Cpu, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';

interface LeaderboardViewProps {
  projects: StudentProject[];
  badges: BadgeItem[];
  onSelectProject: (projectId: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  projects,
  badges,
  onSelectProject
}) => {
  // Sort projects descending by points, then by progress
  const sortedProjects = [...projects].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.progress - a.progress;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 0) return { icon: <Trophy className="w-5 h-5 text-amber-500" />, label: 'Juara 1' };
    if (rank === 1) return { icon: <Award className="w-5 h-5 text-slate-400" />, label: 'Juara 2' };
    if (rank === 2) return { icon: <Award className="w-5 h-5 text-amber-700" />, label: 'Juara 3' };
    return { icon: <span className="font-mono text-sm font-bold text-slate-400">#{rank + 1}</span>, label: '' };
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-blue-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-600" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default: return <Award className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-amber-500/10 via-blue-500/10 to-emerald-500/10 border border-amber-200/60 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Papan Peringkat Capaian 100 Poin Kelas 7
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Peringkat kelompok siswa berdasarkan akumulasi poin pelaporan progres proyek server
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 text-xs">
            <div className="font-semibold text-slate-500">Target Maksimal:</div>
            <div className="text-xl font-black font-mono text-blue-600 tabular-nums">100 Poin</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Klasemen Kelompok Siswa</h3>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {sortedProjects.length} Kelompok Berpartisipasi
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedProjects.map((project, idx) => {
            const rankInfo = getRankBadge(idx);
            const isFinished = project.points === 100;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    {rankInfo.icon}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600">{project.gradeClass}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                        {project.teamName}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 truncate mt-0.5">
                      {project.title}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>Anggota: {project.students.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div>
                    <div className="text-base font-extrabold font-mono text-slate-900 tabular-nums">
                      {project.points} <span className="text-xs font-normal text-slate-500">/ 100 Poin</span>
                    </div>

                    <div className="w-24 sm:w-32 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isFinished ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {isFinished && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-200">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>100% Club</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Koleksi Lencana Prestasi (Badges) Kelas 7
            </h3>
            <p className="text-xs text-slate-500">
              Penghargaan otomatis yang dapat dibuka siswa saat mencapai target milestone tertentu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                  {getBadgeIcon(badge.icon)}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900">{badge.name}</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {badge.description}
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100 inline-block">
                    {badge.criteria}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
