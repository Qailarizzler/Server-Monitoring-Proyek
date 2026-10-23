import React, { useState } from 'react';
import { StudentProject, ServerNode } from '../types';
import { X, Plus, AlertCircle, Sparkles } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  servers: ServerNode[];
  onAddProject: (newProject: Omit<StudentProject, 'id' | 'createdAt' | 'lastUpdated' | 'progress' | 'points' | 'reports' | 'status'>) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  servers,
  onAddProject
}) => {
  const [title, setTitle] = useState('');
  const [teamName, setTeamName] = useState('');
  const [gradeClass, setGradeClass] = useState('Kelas 7-A');
  const [studentNames, setStudentNames] = useState('');
  const [serverId, setServerId] = useState(servers[0]?.id || 'srv-01');
  const [category, setCategory] = useState<StudentProject['category']>('Web App');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Harap masukkan judul proyek.');
      return;
    }
    if (!teamName.trim()) {
      setError('Harap masukkan nama kelompok.');
      return;
    }
    if (!studentNames.trim()) {
      setError('Harap masukkan minimal 1 nama siswa anggota tim.');
      return;
    }
    if (!description.trim()) {
      setError('Harap masukkan deskripsi singkat tujuan proyek.');
      return;
    }

    const students = studentNames
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Standardized 4 milestones for 7th grade, each worth 25 points to sum up to 100
    const milestones = [
      {
        id: `m-${Date.now()}-1`,
        title: 'Fase 1: Desain Arsitektur & Perencanaan Proyek',
        targetPercent: 25,
        pointsReward: 25,
        completed: false
      },
      {
        id: `m-${Date.now()}-2`,
        title: 'Fase 2: Konfigurasi Server & Basis Data Lingkungan Sekolah',
        targetPercent: 50,
        pointsReward: 25,
        completed: false
      },
      {
        id: `m-${Date.now()}-3`,
        title: 'Fase 3: Integrasi Fitur Utama & Pemrograman Sistem',
        targetPercent: 75,
        pointsReward: 25,
        completed: false
      },
      {
        id: `m-${Date.now()}-4`,
        title: 'Fase 4: Uji Coba Performa, Beban Jaringan & Laporan Akhir',
        targetPercent: 100,
        pointsReward: 25,
        completed: false
      }
    ];

    onAddProject({
      title: title.trim(),
      teamName: teamName.trim(),
      gradeClass,
      students,
      serverId,
      category,
      description: description.trim(),
      milestones
    });

    // Reset & close
    setTitle('');
    setTeamName('');
    setStudentNames('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Daftarkan Proyek Baru Kelas 7</h2>
              <p className="text-[11px] text-slate-500">
                Sistem penilaian otomatis 100 poin & target milestone berjenjang
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Judul Proyek:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Sistem Presensi Digital Kelas 7B"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nama Kelompok / Tim:
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Contoh: Kelompok 5 - Cyber Eagle"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tingkat Kelas:
              </label>
              <select
                value={gradeClass}
                onChange={(e) => setGradeClass(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              >
                <option value="Kelas 7-A">Kelas 7-A</option>
                <option value="Kelas 7-B">Kelas 7-B</option>
                <option value="Kelas 7-C">Kelas 7-C</option>
                <option value="Kelas 7-D">Kelas 7-D</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Anggota Siswa (Pisahkan dengan koma):
            </label>
            <input
              type="text"
              value={studentNames}
              onChange={(e) => setStudentNames(e.target.value)}
              placeholder="Contoh: Rayhan, Maya, Kevin, Alisa"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kategori Proyek:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StudentProject['category'])}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              >
                <option value="Web App">Web App (HTML/CSS/JS)</option>
                <option value="IoT Sensor">IoT Sensor & Lingkungan</option>
                <option value="Game Server">Game Server / Scratch Bot</option>
                <option value="Database">Database & Manajemen Data</option>
                <option value="Robotika">Robotika & Otomasi</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tautkan ke Server Lab:
              </label>
              <select
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
              >
                {servers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.ip})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Deskripsi Proyek & Tujuan:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan gambaran ringkas proyek, fitur yang dibuat, dan manfaatnya untuk sekolah..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 resize-none"
            />
          </div>

          {/* Automatic 100-Point Rule Note */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2 text-blue-900 text-[11px] leading-relaxed">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Ketentuan Penilaian:</strong> Proyek akan otomatis memiliki 4 fase berbobot masing-masing 25 poin (total 100 poin). Setiap kali kelompok melaporkan progres, poin langsung bertambah dan notifikasi otomatis dikirim saat mencapai 25%, 50%, 75%, dan 100%.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors"
            >
              Simpan & Daftarkan Proyek
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
