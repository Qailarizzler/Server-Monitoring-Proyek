import { ServerNode, StudentProject, BadgeItem } from '../types';

export const INITIAL_SERVERS: ServerNode[] = [
  {
    id: 'srv-01',
    name: 'SRV-LAB7A (Web Sekolah)',
    role: 'Server Web Portofolio & Profil Kelas 7A',
    ip: '192.168.10.15',
    status: 'online',
    cpu: 28,
    memoryUsageGB: 2.4,
    memoryTotalGB: 8.0,
    diskUsageGB: 34.5,
    diskTotalGB: 120.0,
    networkSpeedMbps: 45.2,
    latencyMs: 18,
    uptimeHours: 342,
    temperatureC: 44,
    services: [
      { name: 'NGINX Web Server', port: 80, status: 'running' },
      { name: 'Node.js Express API', port: 3000, status: 'running' },
      { name: 'SQLite Database', port: 5432, status: 'running' },
      { name: 'UFW Firewall', port: 22, status: 'running' }
    ]
  },
  {
    id: 'srv-02',
    name: 'SRV-IOT-GREEN (Lab IPA)',
    role: 'Broker Sensor IoT Hidroponik & Cuaca Sekolah',
    ip: '192.168.10.22',
    status: 'online',
    cpu: 42,
    memoryUsageGB: 1.8,
    memoryTotalGB: 4.0,
    diskUsageGB: 18.2,
    diskTotalGB: 64.0,
    networkSpeedMbps: 12.8,
    latencyMs: 24,
    uptimeHours: 198,
    temperatureC: 48,
    services: [
      { name: 'Mosquitto MQTT Broker', port: 1883, status: 'running' },
      { name: 'Telemetry Logger Service', port: 8080, status: 'running' },
      { name: 'InfluxDB TimeSeries', port: 8086, status: 'running' }
    ]
  },
  {
    id: 'srv-03',
    name: 'SRV-KUIS-INFORMATIKA',
    role: 'Server Backend Game Cerdas Cermat & Scratch Bot',
    ip: '192.168.10.30',
    status: 'online',
    cpu: 65,
    memoryUsageGB: 3.1,
    memoryTotalGB: 8.0,
    diskUsageGB: 41.0,
    diskTotalGB: 120.0,
    networkSpeedMbps: 68.4,
    latencyMs: 31,
    uptimeHours: 86,
    temperatureC: 51,
    services: [
      { name: 'Python FastAPI Engine', port: 8000, status: 'running' },
      { name: 'Redis Cache Realtime', port: 6379, status: 'running' },
      { name: 'WebSocket Server', port: 8081, status: 'running' }
    ]
  },
  {
    id: 'srv-04',
    name: 'SRV-PERPUS-MINI',
    role: 'Katalog Buku Digital & Peminjaman Mandiri',
    ip: '192.168.10.45',
    status: 'online',
    cpu: 16,
    memoryUsageGB: 1.5,
    memoryTotalGB: 4.0,
    diskUsageGB: 22.0,
    diskTotalGB: 64.0,
    networkSpeedMbps: 8.5,
    latencyMs: 14,
    uptimeHours: 512,
    temperatureC: 41,
    services: [
      { name: 'Apache Web Server', port: 8088, status: 'running' },
      { name: 'MariaDB Library Storage', port: 3306, status: 'running' }
    ]
  }
];

export const INITIAL_PROJECTS: StudentProject[] = [
  {
    id: 'proj-01',
    title: 'Portal Mading Digital & Profil Siswa 7A',
    teamName: 'Kelompok 1 - Siber Bimasakti',
    gradeClass: 'Kelas 7-A',
    students: ['Ahmad Fauzi', 'Nadia Putri', 'Rizky Pratama'],
    serverId: 'srv-01',
    description: 'Aplikasi web interaktif untuk menampilkan artikel mading sekolah, jadwal piket kelas, dan galeri karya digital siswa.',
    category: 'Web App',
    progress: 75,
    points: 75,
    status: 'Berjalan',
    createdAt: '2026-10-01',
    lastUpdated: '2026-10-20',
    milestones: [
      {
        id: 'm1',
        title: 'Fase 1: Desain UI Wireframe & Perencanaan Basis Data',
        targetPercent: 25,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-05',
        evidenceNote: 'Wireframe Figma disetujui Guru Informatika.'
      },
      {
        id: 'm2',
        title: 'Fase 2: Konfigurasi Web Server NGINX & Direktori Publik',
        targetPercent: 50,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-12',
        evidenceNote: 'Server berhasil merespons HTTP port 80 pada IP 192.168.10.15.'
      },
      {
        id: 'm3',
        title: 'Fase 3: Pemrograman Fitur Unggah Artikel & Galeri Foto',
        targetPercent: 75,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-20',
        evidenceNote: 'Fitur formulir artikel dan tampilan responsif mobile tuntas diuji.'
      },
      {
        id: 'm4',
        title: 'Fase 4: Uji Coba Beban 50 Siswa & Dokumentasi Laporan Final',
        targetPercent: 100,
        pointsReward: 25,
        completed: false
      }
    ],
    reports: [
      {
        id: 'rep-01',
        projectId: 'proj-01',
        reportedBy: 'Nadia Putri',
        date: '2026-10-05',
        progressPercent: 25,
        pointsEarned: 25,
        category: 'Desain',
        note: 'Menyelesaikan sketsa tata letak halaman mading dan skema tabel database artikel.'
      },
      {
        id: 'rep-02',
        projectId: 'proj-01',
        reportedBy: 'Ahmad Fauzi',
        date: '2026-10-12',
        progressPercent: 50,
        pointsEarned: 25,
        category: 'Konfigurasi',
        note: 'Instalasi server web NGINX dan uji koneksi jaringan lokal laboratorium komputer.'
      },
      {
        id: 'rep-03',
        projectId: 'proj-01',
        reportedBy: 'Rizky Pratama',
        date: '2026-10-20',
        progressPercent: 75,
        pointsEarned: 25,
        category: 'Integrasi',
        note: 'Menghubungkan antarmuka formulir berita dengan penyimpanan SQLite lokal.'
      }
    ]
  },
  {
    id: 'proj-02',
    title: 'Monitor Suhu & Nutrisi Hidroponik Otomatis',
    teamName: 'Kelompok 2 - Green Tech SMP',
    gradeClass: 'Kelas 7-B',
    students: ['Siti Rahma', 'Bagas Aditya', 'Dewi Lestari'],
    serverId: 'srv-02',
    description: 'Sistem pembacaan sensor DHT22 dan TDS air tanaman sawi di greenhouse sekolah yang mengirim telemetri ke server MQTT setiap 5 detik.',
    category: 'IoT Sensor',
    progress: 100,
    points: 100,
    status: 'Selesai 100%',
    createdAt: '2026-09-25',
    lastUpdated: '2026-10-21',
    milestones: [
      {
        id: 'm21',
        title: 'Fase 1: Kalibrasi Sensor Suhu & Kelembaban DHT22',
        targetPercent: 25,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-09-28',
        evidenceNote: 'Sensor membaca suhu 27.4 C dan kelembaban 68% dengan toleransi <2%.'
      },
      {
        id: 'm22',
        title: 'Fase 2: Instalasi Broker MQTT & Alamat Topik Telemetri',
        targetPercent: 50,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-06',
        evidenceNote: 'Topik smp/lab-ipa/greenhouse aktif di port 1883.'
      },
      {
        id: 'm23',
        title: 'Fase 3: Dashboard Grafik Real-time & Notifikasi Suhu Ekstrem',
        targetPercent: 75,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-14',
        evidenceNote: 'Visualisasi grafik garis suhu berhasil menampilkan fluktuasi harian.'
      },
      {
        id: 'm24',
        title: 'Fase 4: Uji Operasional 72 Jam Tanpa Henti & Presentasi Karya',
        targetPercent: 100,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-21',
        evidenceNote: 'Uptime sensor mencapai 100% selama 3 hari berturut-turut.'
      }
    ],
    reports: [
      {
        id: 'rep-21',
        projectId: 'proj-02',
        reportedBy: 'Bagas Aditya',
        date: '2026-09-28',
        progressPercent: 25,
        pointsEarned: 25,
        category: 'Desain',
        note: 'Merakit mikrokontroler ESP32 dengan breadboard dan resistor penarik.'
      },
      {
        id: 'rep-22',
        projectId: 'proj-02',
        reportedBy: 'Siti Rahma',
        date: '2026-10-06',
        progressPercent: 50,
        pointsEarned: 25,
        category: 'Konfigurasi',
        note: 'Pengujian pengiriman paket MQTT dari kebun sekolah menuju server utama.'
      },
      {
        id: 'rep-23',
        projectId: 'proj-02',
        reportedBy: 'Dewi Lestari',
        date: '2026-10-14',
        progressPercent: 75,
        pointsEarned: 25,
        category: 'Integrasi',
        note: 'Integrasi batas ambang jika suhu melebihi 33 C sistem menyalakan kipas kabut.'
      },
      {
        id: 'rep-24',
        projectId: 'proj-02',
        reportedBy: 'Bagas Aditya',
        date: '2026-10-21',
        progressPercent: 100,
        pointsEarned: 25,
        category: 'Pengujian',
        note: 'Selesai 100%! Data tersimpan rapi dan laporan praktikum diserahkan ke guru IPA.'
      }
    ]
  },
  {
    id: 'proj-03',
    title: 'Arena Kuis Cerdas Cermat Komputer Multiplayer',
    teamName: 'Kelompok 3 - Byte Warrior',
    gradeClass: 'Kelas 7-A',
    students: ['Dimas Ariyanto', 'Fanya Zahra', 'Kenzo Raditya'],
    serverId: 'srv-03',
    description: 'Game kuis cepat-tepat seputar algoritma dan dasar komputer untuk dimainkan bersama 30 siswa satu kelas secara serentak.',
    category: 'Game Server',
    progress: 50,
    points: 50,
    status: 'Berjalan',
    createdAt: '2026-10-08',
    lastUpdated: '2026-10-18',
    milestones: [
      {
        id: 'm31',
        title: 'Fase 1: Bank Soal Informatika 100 Butir & Desain Papan Skor',
        targetPercent: 25,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-11',
        evidenceNote: 'Soal terbagi 4 kategori: Hardware, Software, Jaringan, Etika Digital.'
      },
      {
        id: 'm32',
        title: 'Fase 2: Pembuatan Room Server & Sinkronisasi Waktu WebSocket',
        targetPercent: 50,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-18',
        evidenceNote: 'Latency sinkronisasi antar siswa di bawah 40 milidetik.'
      },
      {
        id: 'm33',
        title: 'Fase 3: Animasi Suara Poin & Leaderboard Dinamis',
        targetPercent: 75,
        pointsReward: 25,
        completed: false
      },
      {
        id: 'm34',
        title: 'Fase 4: Turnamen Simulasi 1 Kelas & Dokumentasi Kode Sumber',
        targetPercent: 100,
        pointsReward: 25,
        completed: false
      }
    ],
    reports: [
      {
        id: 'rep-31',
        projectId: 'proj-03',
        reportedBy: 'Dimas Ariyanto',
        date: '2026-10-11',
        progressPercent: 25,
        pointsEarned: 25,
        category: 'Desain',
        note: 'Menyusun bank pertanyaan dan aturan penghitungan poin berbasis kecepatan menjawab.'
      },
      {
        id: 'rep-32',
        projectId: 'proj-03',
        reportedBy: 'Fanya Zahra',
        date: '2026-10-18',
        progressPercent: 50,
        pointsEarned: 25,
        category: 'Konfigurasi',
        note: 'Uji coba websocket room server dengan 10 smartphone siswa secara simultan.'
      }
    ]
  },
  {
    id: 'proj-04',
    title: 'Katalog Pencarian Buku Barcode Scanner Mini',
    teamName: 'Kelompok 4 - Pustaka Muda',
    gradeClass: 'Kelas 7-C',
    students: ['Tiara Melinda', 'Jonathan Christian', 'Galih Wicaksono'],
    serverId: 'srv-04',
    description: 'Aplikasi pencarian cepat lokasi rak buku perpustakaan sekolah dengan scan kode batang buku menggunakan kamera laptop.',
    category: 'Database',
    progress: 25,
    points: 25,
    status: 'Berjalan',
    createdAt: '2026-10-15',
    lastUpdated: '2026-10-19',
    milestones: [
      {
        id: 'm41',
        title: 'Fase 1: Inventarisasi 150 Buku & Skema Tabel Rak Perpustakaan',
        targetPercent: 25,
        pointsReward: 25,
        completed: true,
        completedAt: '2026-10-19',
        evidenceNote: 'Daftar ISBN buku kurikulum merdeka kelas 7 telah selesai didata.'
      },
      {
        id: 'm42',
        title: 'Fase 2: Integrasi Pembaca Barcode WebCam & Query SQL',
        targetPercent: 50,
        pointsReward: 25,
        completed: false
      },
      {
        id: 'm43',
        title: 'Fase 3: Antarmuka Peminjaman & Notifikasi Pengembalian',
        targetPercent: 75,
        pointsReward: 25,
        completed: false
      },
      {
        id: 'm44',
        title: 'Fase 4: Penerapan di Meja Sirkulasi Perpustakaan Sekolah',
        targetPercent: 100,
        pointsReward: 25,
        completed: false
      }
    ],
    reports: [
      {
        id: 'rep-41',
        projectId: 'proj-04',
        reportedBy: 'Tiara Melinda',
        date: '2026-10-19',
        progressPercent: 25,
        pointsEarned: 25,
        category: 'Desain',
        note: 'Mengumpulkan data buku dan menyusun rancangan database MariaDB tabel buku dan kategori.'
      }
    ]
  }
];

export const STUDENT_BADGES: BadgeItem[] = [
  {
    id: 'b-first',
    name: 'Langkah Pertama (25%)',
    description: 'Menyelesaikan perencanaan dan fase awal proyek dengan baik.',
    icon: 'Compass',
    criteria: 'Progres mencapai minimal 25%',
    unlocked: true
  },
  {
    id: 'b-halfway',
    name: 'Separuh Jalan (50%)',
    description: 'Server dan sistem inti mulai aktif beroperasi di jaringan sekolah.',
    icon: 'Cpu',
    criteria: 'Progres mencapai minimal 50%',
    unlocked: true
  },
  {
    id: 'b-near',
    name: 'Ksatria Telemetri (75%)',
    description: 'Integrasi sistem berhasil dan memasuki fase pemantapan performa.',
    icon: 'Activity',
    criteria: 'Progres mencapai minimal 75%',
    unlocked: true
  },
  {
    id: 'b-master',
    name: 'Master Deployer 100%!',
    description: 'Menyelesaikan seluruh fase proyek hingga 100 poin penuh!',
    icon: 'Trophy',
    criteria: 'Progres mencapai 100% & 100 Poin',
    unlocked: true
  },
  {
    id: 'b-eco',
    name: 'Server Guardian Hemat Energi',
    description: 'Mengoperasikan server dengan penggunaan CPU optimal < 60%.',
    icon: 'ShieldCheck',
    criteria: 'CPU stabil di zona nominal',
    unlocked: true
  }
];

export const GLOSSARY_ITEMS = [
  {
    term: 'CPU (Central Processing Unit)',
    analogy: 'Otak Komputer & Jantung Komputasi',
    explanation: 'CPU bertugas menghitung dan menjalankan instruksi dari program siswa. Jika CPU di atas 80%, artinya server sedang bekerja sangat keras melayani banyak perintah sekaligus!',
    tipKelas7: 'Tips: Hindari loop tak berujung (infinite loop) di kodemu agar CPU tidak kepanasan.'
  },
  {
    term: 'RAM (Random Access Memory)',
    analogy: 'Meja Kerja Tempat Meletakkan Buku',
    explanation: 'RAM adalah memori berkecepatan tinggi yang menyimpan data sementara saat program dibuka. Semakin besar RAM, semakin banyak program yang bisa aktif bersamaan.',
    tipKelas7: 'Tips: Tutup koneksi basis data yang tidak terpakai agar memori server tidak penuh.'
  },
  {
    term: 'Penyimpanan / Disk Storage (SSD/HDD)',
    analogy: 'Lemari Arsip Buku dan File Proyek',
    explanation: 'Tempat penyimpanan permanen untuk sistem operasi, kode sumber, foto karya siswa, dan data sensor. Menggunakan satuan Gigabyte (GB).',
    tipKelas7: 'Tips: Kompres gambar sebelum diunggah ke server web agar kapasitas disk hemat.'
  },
  {
    term: 'Latensi & Waktu Respon (Ping / ms)',
    analogy: 'Kecepatan Balasan Pesan Chat',
    explanation: 'Waktu yang dibutuhkan sebuah data untuk melakukan perjalanan bolak-balik dari komputermu ke server, diukur dalam milidetik (ms). Semakin kecil angkanya, semakin gesit aplikasinya!',
    tipKelas7: 'Tips: Latensi di bawah 30ms tergolong sangat cepat untuk jaringan LAN sekolah.'
  },
  {
    term: 'Bandwidth & Lalu Lintas Jaringan',
    analogy: 'Lebar Jalan Raya Kendaraan Data',
    explanation: 'Jumlah data digital yang dapat dikirim dan diterima per detik, diukur dalam Megabit per detik (Mbps).',
    tipKelas7: 'Tips: Pastikan kabel LAN terpasang erat di switch laboratorium.'
  },
  {
    term: 'Sistem Poin 100%',
    analogy: 'Tolok Ukur Keberhasilan Proyek Siswa',
    explanation: 'Setiap proyek dibagi menjadi 4 tahapan berbobot 25 poin (total 100 poin). Setiap kali kelompokmu melaporkan kemajuan dengan bukti nyata, poin langsung terakumulasi!',
    tipKelas7: 'Target: Dapatkan lencana Master Deployer dengan menuntaskan seluruh 4 fase proyek.'
  }
];
