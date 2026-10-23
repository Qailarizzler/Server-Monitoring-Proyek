import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/mockData';
import { 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  Cpu, 
  HardDrive, 
  Zap, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const EducationalGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Bagaimana cara kelompok saya mendapatkan 100 poin penuh?',
      a: 'Setiap proyek memiliki 4 fase berjenjang: (1) Desain Arsitektur [25 poin], (2) Konfigurasi Server [25 poin], (3) Integrasi Fitur [25 poin], dan (4) Uji Coba & Dokumentasi [25 poin]. Setiap kali kelompokmu menyelesaikan suatu fase dan mengirim laporan progres, 25 poin langsung diakumulasikan hingga mencapai 100%!'
    },
    {
      q: 'Kapan notifikasi otomatis akan berbunyi dan muncul?',
      a: 'Sistem secara otomatis mendeteksi ketika progres proyekmu melampaui batas ambang target: 25% (Langkah Awal), 50% (Separuh Jalan), 75% (Tahap Pemantapan), dan 100% (Piala Master). Selain itu, sistem juga akan memicu bunyi peringatan jika penggunaan CPU server lab melonjak melebihi 85%.'
    },
    {
      q: 'Apa yang harus dilakukan jika CPU server lab berubah warna merah (>80%)?',
      a: 'Jangan panik! Itu artinya server sedang kelebihan beban komputasi. Kamu bisa menguji tombol "Bersihkan Cache & RAM" di tab monitoring, memeriksa apakah kodemu memiliki pengulangan tak terbatas (infinite loop), atau menutup layanan yang sedang tidak digunakan.'
    },
    {
      q: 'Mengapa latensi (ping) penting dalam sistem monitoring?',
      a: 'Latensi mengukur seberapa cepat server merespons instruksimu. Jika latensi rendah (<30ms), website mading atau game kuis kelas akan terasa sangat cepat dan responsif saat diakses siswa lain.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Panduan Pemula Server & Jaringan untuk Kelas 7
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pelajari konsep dasar server, cara kerja pemantauan real-time, dan strategi meraih 100 poin penuh
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Journey to 100% Points */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900">
            Peta Jalan Meraih 100 Poin Proyek Kelas 7
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-2">
              25%
            </div>
            <h4 className="text-xs font-bold text-slate-900">Fase 1: Desain & Arsitektur</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Buat sketsa wireframe, alur data sensor, atau skema tabel database bersama kelompokmu.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] font-bold text-blue-600">+25 Poin Diperoleh</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-2">
              50%
            </div>
            <h4 className="text-xs font-bold text-slate-900">Fase 2: Konfigurasi Server</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Nyalakan layanan web server (NGINX/Node/MQTT), sambungkan alamat IP lokal, dan tes koneksi port.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] font-bold text-blue-600">+25 Poin Diperoleh</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-2">
              75%
            </div>
            <h4 className="text-xs font-bold text-slate-900">Fase 3: Integrasi Fitur</h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Tulis kode program, hubungkan sensor fisik atau formulir input, dan uji fungsionalitas utama.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] font-bold text-blue-600">+25 Poin Diperoleh</span>
          </div>

          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-2">
              100%
            </div>
            <h4 className="text-xs font-bold text-emerald-950">Fase 4: Uji Coba & Dokumen</h4>
            <p className="text-[11px] text-emerald-900 mt-1 leading-relaxed">
              Lakukan uji beban simultan, pastikan uptime stabil, dan serahkan laporan final praktikum.
            </p>
            <span className="inline-block mt-2 font-mono text-[10px] font-bold text-emerald-700">★ Tuntas 100 Poin Penuh!</span>
          </div>
        </div>
      </div>

      {/* Interactive Glossary with Real-World Analogies */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          Kamus Istilah Komputer & Server (Analogi Mudah untuk Siswa)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GLOSSARY_ITEMS.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{item.term}</h4>
                  <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {item.analogy}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.explanation}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[11px] text-slate-700 font-medium">
                {item.tipKelas7}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">
          Pertanyaan yang Sering Diajukan Siswa (FAQ)
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-3.5 text-left bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-3 transition-colors"
                >
                  <span className="text-xs font-semibold text-slate-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
