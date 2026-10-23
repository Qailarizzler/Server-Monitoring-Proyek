import React, { useState } from 'react';
import { StudentProject } from '../types';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Server, 
  Plus, 
  SlidersHorizontal,
  FolderGit2
} from 'lucide-react';

interface ProjectListProps {
  projects: StudentProject[];
  onSelectProject: (projectId: string) => void;
  onOpenNewProject: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onSelectProject,
  onOpenNewProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.students.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass = classFilter === 'all' || project.gradeClass === classFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === '100' && project.progress === 100) ||
      (statusFilter === 'in_progress' && project.progress < 100);

    return matchesSearch && matchesClass && matchesStatus;
  });

  // Calculate statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.progress === 100).length;
  const averagePoints = totalProjects > 0 
    ? Math.round(projects.reduce((acc, p) => acc + p.points, 0) / totalProjects) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Strip */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Proyek Informatika & Server Siswa Kelas 7
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Setiap kemajuan fase proyek yang dilaporkan menghasilkan poin hingga 100% serta notifikasi otomatis pencapaian target.
            </p>
          </div>

          <button
            onClick={onOpenNewProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek Kelompok</span>
          </button>
        </div>

        {/* 3-metric KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Total Proyek Terdaftar</span>
            <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
              {totalProjects}
            </span>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-100 flex items-center justify-between">
            <span className="text-emerald-700 font-medium">Proyek Tuntas 100 Poin</span>
            <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
              {completedProjects}
            </span>
          </div>
          <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 flex items-center justify-between">
            <span className="text-blue-700 font-medium">Rata-rata Poin Kelas</span>
            <span className="text-base font-bold font-mono text-blue-700 tabular-nums">
              {averagePoints} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek, nama kelompok, atau nama siswa..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 hidden sm:inline">Kelas:</span>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Semua Kelas</option>
                <option value="Kelas 7-A">Kelas 7-A</option>
                <option value="Kelas 7-B">Kelas 7-B</option>
                <option value="Kelas 7-C">Kelas 7-C</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-slate-500 hidden sm:inline">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Semua Status</option>
                <option value="in_progress">Sedang Berjalan</option>
                <option value="100">Selesai 100%</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <FolderGit2 className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-1" />
          <h3 className="text-sm font-semibold text-slate-800">Tidak ada proyek yang sesuai</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba ganti kata kunci pencarian atau bersihkan filter kelas.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setClassFilter('all'); setStatusFilter('all'); }}
            className="mt-4 px-3 py-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => {
            const completedMilestones = project.milestones.filter(m => m.completed).length;
            const isFinished = project.progress === 100;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`bg-white rounded-xl border p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                  isFinished ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div>
                  {/* Category & Class tags (Clean unboxed metadata) */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-blue-600">{project.gradeClass}</span>
                      <span>·</span>
                      <span>{project.category}</span>
                      <span>·</span>
                      <span className="truncate max-w-[140px]">{project.teamName}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress & Milestone Target Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-700">Progres Capaian:</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {project.progress}% ({project.points} / 100 Poin)
                      </span>
                    </div>

                    {/* Progress Track with 25%, 50%, 75%, 100% tick marks */}
                    <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isFinished ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>

                    {/* Tick labels */}
                    <div className="flex justify-between text-[10px] text-slate-700 mt-1 font-mono tabular-nums px-0.5">
                      <span className={project.progress >= 25 ? 'text-blue-600 font-bold' : ''}>25%</span>
                      <span className={project.progress >= 50 ? 'text-blue-600 font-bold' : ''}>50%</span>
                      <span className={project.progress >= 75 ? 'text-blue-600 font-bold' : ''}>75%</span>
                      <span className={project.progress >= 100 ? 'text-emerald-600 font-bold' : ''}>100%</span>
                    </div>
                  </div>
                </div>

                {/* Footer info: Students & Server */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Server className="w-3.5 h-3.5 text-slate-700" />
                    <span className="truncate max-w-[150px] font-mono text-[11px]">{project.serverId}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-700">
                      {completedMilestones}/4 Fase
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project.id);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>Lapor Progres</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
