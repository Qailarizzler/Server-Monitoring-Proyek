import React, { useState } from 'react';
import { ServerNode, ServerMetricPoint } from '../types';
import { 
  Cpu, 
  HardDrive, 
  Network, 
  Clock, 
  Thermometer, 
  RotateCw, 
  Flame, 
  Sparkles, 
  Pause, 
  Play, 
  HelpCircle,
  Radio,
  Power
} from 'lucide-react';

interface ServerMonitoringProps {
  servers: ServerNode[];
  selectedServerId: string;
  onSelectServer: (id: string) => void;
  telemetryHistory: ServerMetricPoint[];
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
  refreshIntervalMs: number;
  setRefreshIntervalMs: (ms: number) => void;
  onTriggerSpike: (type: 'traffic' | 'heavy' | 'clean' | 'eco') => void;
  onRestartService: (serverIndex: number, serviceName: string) => void;
}

export const ServerMonitoring: React.FC<ServerMonitoringProps> = ({
  servers,
  selectedServerId,
  onSelectServer,
  telemetryHistory,
  isStreaming,
  setIsStreaming,
  refreshIntervalMs,
  setRefreshIntervalMs,
  onTriggerSpike,
  onRestartService
}) => {
  const [showEduTips, setShowEduTips] = useState(true);
  const currentServer = servers.find(s => s.id === selectedServerId) || servers[0];
  const currentServerIndex = servers.findIndex(s => s.id === selectedServerId);

  // SVG dimensions for real-time telemetry line charts
  const svgWidth = 420;
  const svgHeight = 90;

  // Build SVG path from telemetry points
  const getSvgPath = (points: number[], maxVal: number = 100) => {
    if (points.length < 2) return '';
    const stepX = svgWidth / (points.length - 1);
    const coordinates = points.map((val, idx) => {
      const x = idx * stepX;
      const normalized = Math.min(Math.max(val / maxVal, 0), 1);
      const y = svgHeight - normalized * (svgHeight - 14) - 7;
      return { x, y };
    });

    const d = coordinates.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');

    return d;
  };

  const cpuPoints = telemetryHistory.map(p => p.cpu);
  const memoryPoints = telemetryHistory.map(p => (p.memory / currentServer.memoryTotalGB) * 100);
  const networkPoints = telemetryHistory.map(p => p.networkIn + p.networkOut);
  const latencyPoints = telemetryHistory.map(p => p.latency);

  const cpuSvgPath = getSvgPath(cpuPoints, 100);
  const memSvgPath = getSvgPath(memoryPoints, 100);

  // Get status color & badge text
  const getStatusBadge = (status: ServerNode['status']) => {
    if (status === 'critical') return { text: 'KRITIS', color: 'text-red-700 bg-red-100 border-red-200' };
    if (status === 'warning') return { text: 'PERINGATAN', color: 'text-amber-700 bg-amber-100 border-amber-200' };
    return { text: 'OPTIMAL', color: 'text-emerald-700 bg-emerald-100 border-emerald-200' };
  };

  const statusBadge = getStatusBadge(currentServer.status);

  return (
    <div className="space-y-6">
      {/* Top Controls: Server Node Selector & Stream Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Server Selector tabs */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Pilih Server Node Kelas 7
            </div>
            <div className="flex flex-wrap gap-2">
              {servers.map((srv) => {
                const isSelected = srv.id === selectedServerId;
                return (
                  <button
                    key={srv.id}
                    onClick={() => onSelectServer(srv.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all text-left border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-semibold">{srv.name}</div>
                    <div className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-700'}`}>
                      IP: {srv.ip} · {srv.cpu}% CPU
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Telemetry Stream controls */}
          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="text-slate-700">Interval:</span>
              <button
                onClick={() => setRefreshIntervalMs(1000)}
                className={`px-2 py-1 rounded text-xs tabular-nums font-mono ${
                  refreshIntervalMs === 1000 ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                1s
              </button>
              <button
                onClick={() => setRefreshIntervalMs(2000)}
                className={`px-2 py-1 rounded text-xs tabular-nums font-mono ${
                  refreshIntervalMs === 2000 ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                2s
              </button>
              <button
                onClick={() => setRefreshIntervalMs(5000)}
                className={`px-2 py-1 rounded text-xs tabular-nums font-mono ${
                  refreshIntervalMs === 5000 ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                5s
              </button>
            </div>

            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isStreaming
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
              }`}
            >
              {isStreaming ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Jeda Stream</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Mulai Stream</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selected Server Summary Banner */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${statusBadge.color}`}>
              {statusBadge.text}
            </span>
            <span className="font-semibold text-slate-800">{currentServer.role}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-700">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Uptime: <strong className="font-mono tabular-nums text-slate-700">{currentServer.uptimeHours} Jam</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5" />
              <span>Suhu: <strong className="font-mono tabular-nums text-slate-700">{currentServer.temperatureC}°C</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              <span>Ping: <strong className="font-mono tabular-nums text-slate-700">{currentServer.latencyMs} ms</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Real-time Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CPU Usage */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold">Penggunaan CPU</span>
              </div>
              <span className={`text-xs font-bold font-mono tabular-nums ${
                currentServer.cpu > 80 ? 'text-red-600' : currentServer.cpu > 60 ? 'text-amber-600' : 'text-slate-900'
              }`}>
                {currentServer.cpu}%
              </span>
            </div>

            {/* Sparkline chart */}
            <div className="mt-3 bg-slate-50 rounded-lg p-1.5 border border-slate-100 overflow-hidden">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-16 stroke-2 fill-none">
                <path d={cpuSvgPath} className={currentServer.cpu > 80 ? 'stroke-red-500' : 'stroke-blue-600'} />
              </svg>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
            <span>Zona {currentServer.cpu > 80 ? 'Beban Tinggi' : 'Stabil'}</span>
            <span className="font-mono tabular-nums">4 Core @ 2.4 GHz</span>
          </div>
        </div>

        {/* Card 2: Memory / RAM */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold">Memori RAM</span>
              </div>
              <span className="text-xs font-bold font-mono tabular-nums text-slate-900">
                {currentServer.memoryUsageGB.toFixed(1)} / {currentServer.memoryTotalGB} GB
              </span>
            </div>

            {/* Progress gauge */}
            <div className="mt-4">
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    (currentServer.memoryUsageGB / currentServer.memoryTotalGB) > 0.85
                      ? 'bg-red-500'
                      : (currentServer.memoryUsageGB / currentServer.memoryTotalGB) > 0.65
                      ? 'bg-amber-500'
                      : 'bg-purple-600'
                  }`}
                  style={{ width: `${(currentServer.memoryUsageGB / currentServer.memoryTotalGB) * 100}%` }}
                />
              </div>

              {/* Sparkline history */}
              <div className="mt-3 bg-slate-50 rounded-lg p-1.5 border border-slate-100 overflow-hidden">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-10 stroke-2 fill-none">
                  <path d={memSvgPath} className="stroke-purple-600" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
            <span>Terpakai {((currentServer.memoryUsageGB / currentServer.memoryTotalGB) * 100).toFixed(0)}%</span>
            <span className="font-mono tabular-nums">DDR4 ECC</span>
          </div>
        </div>

        {/* Card 3: Disk / Storage */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <HardDrive className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold">Penyimpanan SSD</span>
              </div>
              <span className="text-xs font-bold font-mono tabular-nums text-slate-900">
                {currentServer.diskUsageGB.toFixed(1)} / {currentServer.diskTotalGB} GB
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${(currentServer.diskUsageGB / currentServer.diskTotalGB) * 100}%` }}
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span>Sisa Kapasitas:</span>
                  <span className="font-mono font-medium text-slate-800 tabular-nums">
                    {(currentServer.diskTotalGB - currentServer.diskUsageGB).toFixed(1)} GB
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Status NVMe:</span>
                  <span className="font-medium text-emerald-600">Sehat (SMART OK)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
            <span>Read/Write I/O</span>
            <span className="font-mono tabular-nums">3,200 IOPS</span>
          </div>
        </div>

        {/* Card 4: Bandwidth & Latency */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600">
                  <Network className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold">Throughput Jaringan</span>
              </div>
              <span className="text-xs font-bold font-mono tabular-nums text-slate-900">
                {currentServer.networkSpeedMbps.toFixed(1)} Mbps
              </span>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Trafik Masuk (RX):</span>
                <span className="font-mono font-semibold text-blue-600 tabular-nums">
                  {(currentServer.networkSpeedMbps * 0.65).toFixed(1)} Mbps
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Trafik Keluar (TX):</span>
                <span className="font-mono font-semibold text-emerald-600 tabular-nums">
                  {(currentServer.networkSpeedMbps * 0.35).toFixed(1)} Mbps
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span className="text-slate-700">Kategori Latensi:</span>
                <span className="font-semibold text-emerald-600">
                  {currentServer.latencyMs < 30 ? 'Sangat Responsif' : 'Normal'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
            <span>Port Switch LAN</span>
            <span className="font-mono tabular-nums">Gigabit Ethernet</span>
          </div>
        </div>
      </div>

      {/* Interactive Server Load Simulation Lab for 7th Graders */}
      <div className="bg-linear-to-r from-blue-900 to-indigo-950 text-white rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold tracking-wide">
                Laboratorium Simulasi Beban Server (Eksperimen Interaktif Siswa)
              </h3>
            </div>
            <p className="text-xs text-blue-200 mt-1 max-w-2xl">
              Uji bagaimana server bereaksi terhadap berbagai skenario beban nyata. Klik tombol simulasi di bawah untuk melihat grafik dan notifikasi peringatan otomatis!
            </p>
          </div>

          <button
            onClick={() => setShowEduTips(!showEduTips)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-800/60 hover:bg-blue-800 text-xs font-medium text-blue-100 transition-colors shrink-0"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showEduTips ? 'Sembunyikan Info' : 'Buka Penjelasan'}</span>
          </button>
        </div>

        {/* Action Simulator buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onTriggerSpike('traffic')}
            className="p-3 bg-blue-800/40 hover:bg-blue-700/60 border border-blue-400/20 rounded-lg text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Lonjakan Pengunjung</span>
              <Network className="w-3.5 h-3.5 text-blue-300 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-[11px] text-blue-200 mt-1">+40% CPU & Throughput</div>
          </button>

          <button
            onClick={() => onTriggerSpike('heavy')}
            className="p-3 bg-amber-900/40 hover:bg-amber-800/60 border border-amber-400/20 rounded-lg text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-200">Stress Test Komputasi</span>
              <Flame className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-[11px] text-amber-200 mt-1">CPU &gt; 85% (Memicu Peringatan)</div>
          </button>

          <button
            onClick={() => onTriggerSpike('clean')}
            className="p-3 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-400/20 rounded-lg text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-200">Bersihkan Cache & RAM</span>
              <RotateCw className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-[11px] text-emerald-200 mt-1">Legakan memori & ping</div>
          </button>

          <button
            onClick={() => onTriggerSpike('eco')}
            className="p-3 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600/30 rounded-lg text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">Mode Hemat Daya</span>
              <Power className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-[11px] text-slate-300 mt-1">Stabilkan idle di 15%</div>
          </button>
        </div>

        {/* Educational Note Callout */}
        {showEduTips && (
          <div className="mt-4 p-3 bg-blue-950/60 border border-blue-400/20 rounded-lg text-xs text-blue-200 leading-relaxed">
            <strong className="text-white">Fakta Seru Kelas 7:</strong> Server sekolah bekerja mirip seperti otak manusia saat belajar. Ketika ada 100 siswa mengakses mading digital bersamaan, CPU membagi waktu sepersekian detik untuk setiap permintaan agar semua siswa terlayani tanpa lag.
          </div>
        )}
      </div>

      {/* Active Services on this Server */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Layanan & Daemon Aktif di Server</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Program latar belakang yang melayani permintaan aplikasi proyek siswa
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 tabular-nums">
            {currentServer.services.length} Layanan Berjalan
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {currentServer.services.map((srv, idx) => (
            <div key={srv.name} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div>
                  <div className="text-xs font-semibold text-slate-900">{srv.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Port: {srv.port} · Status: Normal
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRestartService(currentServerIndex, srv.name)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
                title={`Mulai ulang ${srv.name}`}
              >
                <RotateCw className="w-3 h-3" />
                <span>Restart</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
