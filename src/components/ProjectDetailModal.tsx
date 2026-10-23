import React, { useState } from 'react';
import { StudentProject, ProjectMilestone, ProjectReport } from '../types';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Award, 
  Server, 
  Calendar, 
  Send, 
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: StudentProject | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMilestone: (projectId: string, milestoneId: string, completed: boolean, evidenceNote?: string) => void;
  onSubmitReport: (
    projectId: string, 
    report: Omit<ProjectReport, 'id' | 'projectId' | 'date'>
  ) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onUpdateMilestone,
  onSubmitReport
}) => {
  if (!isOpen || !project) return null;

  // New report form state
  const [reporterName, setReporterName] = useState('');
  const [category, setCategory] = useState<ProjectReport['category']>('Konfigurasi');
  const [reportNote, setReportNote] = useState('');
  const [targetMilestoneId, setTargetMilestoneId] = useState<string>('');
  const [formError, setFormError] = useState('');

  const completedCount = project.milestones.filter(m => m.completed).length;
  const isMaster100 = project.progress >= 100;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName.trim()) {
      setFormError('Harap masukkan nama siswa pelapor.');
      return;
    }
    if (!reportNote.trim()) {
      setFormError('Harap tuliskan catatan perkembangan atau hasil uji coba.');
      return;
    }

    setFormError('');

    // If a milestone was selected to be marked completed, complete it
    let pointsAwarded = 0;
    if (targetMilestoneId) {
      const milestone = project.milestones.find(m => m.id === targetMilestoneId);
      if (milestone && !milestone.completed) {
        pointsAwarded = milestone.pointsReward;
        onUpdateMilestone(project.id, targetMilestoneId, true, reportNote);
      }
    }

    // Submit report record
    const nextProgress = Math.min(100, project.progress + (pointsAwarded > 0 ? pointsAwarded : 0));
    onSubmitReport(project.id, {
      reportedBy: reporterName.trim(),
      progressPercent: nextProgress,
      pointsEarned: pointsAwarded,
      note: reportNote.trim(),
      category: category
    });

    // Reset form fields
    setReportNote('');
    setTargetMilestoneId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-blue-600">{project.gradeClass}</span>
              <span>·</span>
              <span className="font-medium text-slate-700">{project.teamName}</span>
              <span>·</span>
              <span>Server: {project.serverId}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{project.title}</h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
            aria-label="Tutup jendela modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* 100% Score & Progress Banner */}
          <div className={`p-4 rounded-xl border ${
            isMaster100 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-blue-50/70 border-blue-200 text-blue-950'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  isMaster100 ? 'bg-emerald-600 text-white shadow-sm' : 'bg-blue-600 text-white shadow-sm'
                }`}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status Poin Proyek
                  </div>
                  <div className="text-lg font-extrabold font-mono tabular-nums">
                    {project.points} / 100 Poin
                    <span className="text-xs font-medium ml-2 text-slate-600">
                      ({completedCount} dari 4 fase tercapai)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  isMaster100
                    ? 'bg-emerald-600 text-white'
                    : project.progress >= 75
                    ? 'bg-blue-600 text-white'
                    : project.progress >= 50
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-700 text-white'
                }`}>
                  {isMaster100 ? 'TUNTAS 100%' : `TARGET: ${project.progress}%`}
                </span>
              </div>
            </div>

            {/* Progress visual */}
            <div className="mt-3">
              <div className="w-full h-3.5 bg-white/80 rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full transition-all duration-500 ${
                    isMaster100 ? 'bg-emerald-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono tabular-nums text-slate-500 mt-1 px-1">
                <span>0%</span>
                <span className={project.progress >= 25 ? 'font-bold text-blue-600' : ''}>25% (Fase 1)</span>
                <span className={project.progress >= 50 ? 'font-bold text-blue-600' : ''}>50% (Fase 2)</span>
                <span className={project.progress >= 75 ? 'font-bold text-blue-600' : ''}>75% (Fase 3)</span>
                <span className={project.progress >= 100 ? 'font-bold text-emerald-600' : ''}>100% Penuh</span>
              </div>
            </div>
          </div>

          {/* Anggota Kelompok Siswa */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2">
              Anggota Tim Proyek (Siswa Kelas 7):
            </div>
            <div className="flex flex-wrap gap-2">
              {project.students.map((student, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-800 shadow-2xs"
                >
                  {student}
                </span>
              ))}
            </div>
          </div>

          {/* 4 Standardized Milestones (25 Poin Each) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Daftar Capaian Milestone (Target 100 Poin)
              </h3>
              <span className="text-xs text-slate-500">
                Tiap fase bernilai 25 poin
              </span>
            </div>

            <div className="space-y-2.5">
              {project.milestones.map((m, idx) => {
                return (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      m.completed
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onUpdateMilestone(project.id, m.id, !m.completed)}
                          className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors"
                          title={m.completed ? 'Batalkan capaian' : 'Tandai selesai'}
                        >
                          {m.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-900">
                              {m.title}
                            </span>
                            <span className="text-[11px] font-mono font-bold text-blue-600 tabular-nums">
                              +{m.pointsReward} Poin
                            </span>
                          </div>

                          {m.completed && m.evidenceNote && (
                            <p className="text-xs text-slate-600 mt-1 italic">
                              Catatan Guru/Siswa: "{m.evidenceNote}"
                            </p>
                          )}

                          {m.completedAt && (
                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3" />
                              <span>Selesai pada: {m.completedAt}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                          m.completed
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {m.completed ? 'TERVERIFIKASI' : `${m.targetPercent}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Laporan Progres Baru (Siswa melaporkan progres untuk dapat poin) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Formulir Laporan Progres Siswa (Klaim Poin)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Laporkan hasil pekerjaan kelompokmu. Sistem akan secara otomatis memverifikasi target milestone, menambahkan poin sampai 100%, dan mengirimkan notifikasi.
            </p>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Siswa Pelapor:
                  </label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Contoh: Nadia Putri / Rizky"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Kategori Laporan:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectReport['category'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                  >
                    <option value="Desain">Desain Arsitektur & Perencanaan</option>
                    <option value="Konfigurasi">Konfigurasi Server & Basis Data</option>
                    <option value="Integrasi">Integrasi Fitur & Pemrograman</option>
                    <option value="Pengujian">Pengujian Beban & Dokumentasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Klaim Penyelesaian Milestone (Opsional):
                </label>
                <select
                  value={targetMilestoneId}
                  onChange={(e) => setTargetMilestoneId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                >
                  <option value="">-- Pilih fase yang telah dituntaskan --</option>
                  {project.milestones.map((m) => (
                    <option key={m.id} value={m.id} disabled={m.completed}>
                      {m.title} (+{m.pointsReward} Poin) {m.completed ? '(Sudah Selesai)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Catatan Kemajuan / Hasil Uji Coba:
                </label>
                <textarea
                  rows={3}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Jelaskan apa yang sudah dikerjakan kelompokmu, hasil tes di server, kendala yang diatasi, dsb..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Laporan & Perbarui Poin</span>
                </button>
              </div>
            </form>
          </div>

          {/* Riwayat Laporan Aktivitas */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Linimasa & Riwayat Laporan ({project.reports.length})
            </h3>

            {project.reports.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada laporan yang dikirim.</p>
            ) : (
              <div className="space-y-2">
                {project.reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs"
                  >
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-800 font-semibold">{rep.reportedBy}</strong>
                        <span>·</span>
                        <span className="text-blue-600 font-medium">{rep.category}</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">{rep.date}</span>
                    </div>

                    <p className="text-slate-700 mt-1 leading-relaxed">
                      {rep.note}
                    </p>

                    {rep.pointsEarned > 0 && (
                      <div className="mt-2 text-[11px] font-mono font-bold text-emerald-600">
                        +{rep.pointsEarned} Poin Diperoleh · Capaian: {rep.progressPercent}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
