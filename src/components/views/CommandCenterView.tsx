import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Users, 
  Truck, 
  Crosshair, 
  Bot, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  MapPin, 
  FileText, 
  RefreshCw,
  Sparkles,
  ChevronRight,
  Eye,
  Target,
  Calendar,
  Shield,
  Sprout,
  HeartHandshake,
  Bell,
  Filter,
  Check,
  ShieldCheck,
  Flame,
  Radio,
  Wrench,
  PlusCircle,
  CheckSquare
} from 'lucide-react';
import { 
  mockExecutiveData, 
  mockNotifications, 
  mockDirectives, 
  mockIncidents,
  mockCommanderAgenda,
  CommanderAgendaItem
} from '../../data/mockData';
import { NavigationMenu, UserRole, StaffDataRecord } from '../../types';
import { IndonesiaInteractiveMap } from '../map/IndonesiaInteractiveMap';

interface CommandCenterViewProps {
  onNavigate: (menu: NavigationMenu, submenu?: string) => void;
  userRole: UserRole;
  publishedRecords?: StaffDataRecord[];
  activeSubmenu?: string;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  onNavigate,
  userRole,
  publishedRecords = [],
  activeSubmenu = 'executive_dashboard'
}) => {
  const [isBriefGenerating, setIsBriefGenerating] = useState(false);
  const [targetMarkerId, setTargetMarkerId] = useState<string | null>(null);
  const [aiBriefText, setAiBriefText] = useState<string>(
    `Berdasarkan data fusion empat staf terkini:
1. SITUASI WILAYAH: Kondusif. Terdeteksi 3 hotspot karhutla di Riau (Sektor Barat) dalam koordinasi mobilisasi Satgas Staf Ops.
2. KESIAPAN SATUAN: Kesiapsiagaan tempur berada pada tingkat 92.4% (SIAP TINGGI).
3. STAF PERSONEL: DSPP 1.250 / Riil 1.180 (94.4%). 12 Personel sedang penugasan khusus.
4. STAF LOGISTIK: Stock Bekal BBM & Amunisi aman; 3 Ranmor Anoa 6x6 telah selesai pemeliharaan berkala.`
  );

  const handleRefreshBrief = async () => {
    setIsBriefGenerating(true);
    try {
      const res = await fetch('/api/command-ai/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ briefType: 'executive', staffData: mockExecutiveData })
      });
      const data = await res.json();
      if (data.summary) {
        setAiBriefText(data.summary);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBriefGenerating(false);
    }
  };

  const handleLocateIncident = (markerId: string) => {
    setTargetMarkerId(markerId);
    // Smooth scroll to map if on mobile
    const mapEl = document.getElementById('hero-command-map');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* TOP EXECUTIVE BANNER: BERANDA KOMANDO */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>COMMAND360 • BATALION INFANTERI TERITORIAL PEMBANGUNAN</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
            BERANDA KOMANDO
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ringkasan Situasi Batalyon • Tanggal: <span className="text-slate-200 font-mono">Kamis, 30 Juli 2026</span> | Pembaruan Terakhir: <span className="text-amber-400 font-mono font-bold">10:30 WIB</span> | Status Sistem: <span className="text-emerald-400 font-bold">● TERHUBUNG</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button 
            onClick={() => alert("Memperbarui data dari database real-time...")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md shadow transition-all min-h-[36px]"
          >
            PERBARUI DATA
          </button>
          <button 
            onClick={() => onNavigate('REPORT_CENTER', 'paparan_komandan')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-md shadow transition-all min-h-[36px]"
          >
            BUAT LAPORAN
          </button>
          <button 
            onClick={() => onNavigate('REPORT_CENTER', 'paparan_komandan')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-md hover:brightness-110 shadow transition-all min-h-[36px]"
          >
            MODE PAPARAN
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBMENU 1: EXECUTIVE DASHBOARD (BATTALION PICTURE - HERO VIEW) */}
      {/* ========================================================================= */}
      {(activeSubmenu === 'executive_dashboard' || !activeSubmenu) && (
        <>
          {/* THREE COMMAND INDICES & BATTERY/UNIT READINESS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase">
                <span>1. COMBAT READINESS</span>
                <span className="text-emerald-400 text-sm">91.8%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: '91.8%' }} />
              </div>
              <p className="text-[10px] text-slate-500">Personel (94.4%) • Materiil (91.2%) • Latihan (89.8%)</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 cursor-pointer hover:border-emerald-500/50" onClick={() => onNavigate('TP_CONTROL')}>
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase">
                <span>2. TERRITORIAL DEVELOPMENT</span>
                <span className="text-blue-400 text-sm">85.2%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full" style={{ width: '85.2%' }} />
              </div>
              <p className="text-[10px] text-slate-500">Pertanian (87%) • Peternakan (82%) • Konstruksi (74%)</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase">
                <span>3. COMMAND EFFECTIVENESS</span>
                <span className="text-amber-400 text-sm">94.0%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: '94.0%' }} />
              </div>
              <p className="text-[10px] text-slate-500">Program Staf • Disposisi Arahan • Kualitas Data</p>
            </div>
          </div>

          {/* TERRITORIAL DEVELOPMENT STATUS BAR */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                TERRITORIAL DEVELOPMENT STATUS (PROGRAM TP BATALYON)
              </span>
              <button onClick={() => onNavigate('SATUAN')} className="text-[11px] text-amber-400 hover:underline">
                LIHAT DALAM KOMPI-KOMPI →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 cursor-pointer hover:border-emerald-500" onClick={() => onNavigate('SATUAN', 'ki_pertanian')}>
                <div className="text-[10px] text-slate-400">PERTANIAN</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">87%</div>
                <div className="text-[9px] text-slate-500 mt-0.5">250 Ha Lahan Aktif</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 cursor-pointer hover:border-emerald-500" onClick={() => onNavigate('SATUAN', 'ki_peternakan')}>
                <div className="text-[10px] text-slate-400">PETERNAKAN</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">82%</div>
                <div className="text-[9px] text-slate-500 mt-0.5">12.5k Unggas + 320 Sapi</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 cursor-pointer hover:border-blue-500" onClick={() => onNavigate('SATUAN', 'ki_peternakan')}>
                <div className="text-[10px] text-slate-400">PERIKANAN</div>
                <div className="text-lg font-bold text-blue-400 mt-0.5">79%</div>
                <div className="text-[9px] text-slate-500 mt-0.5">18 Ton / Bulan</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 cursor-pointer hover:border-amber-500" onClick={() => onNavigate('SATUAN', 'ki_zeni')}>
                <div className="text-[10px] text-slate-400">KONSTRUKSI</div>
                <div className="text-lg font-bold text-amber-400 mt-0.5">74%</div>
                <div className="text-[9px] text-slate-500 mt-0.5">4 Proyek Air & Jalan</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 cursor-pointer hover:border-emerald-500" onClick={() => onNavigate('KESEHATAN')}>
                <div className="text-[10px] text-slate-400">KESEHATAN</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">91%</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Layanan Bakti Kesmas</div>
              </div>
            </div>
          </div>

          {/* COMMAND OVERVIEW KPI SCORES GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-amber-500/50 transition-colors flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
                <span className="uppercase truncate">Kesiapan Satuan</span>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              </div>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-xl sm:text-3xl font-extrabold font-mono text-amber-400">
                  {mockExecutiveData.readinessScore}%
                </span>
                <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">
                  SIAP TINGGI
                </span>
              </div>
              <div className="mt-2 sm:mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${mockExecutiveData.readinessScore}%` }} />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('PERSONEL')}
              className="p-3 sm:p-4 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-blue-500/50 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
                <span className="uppercase truncate">Kekuatan Personel</span>
                <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              </div>
              <div className="mt-2 flex items-baseline gap-1 sm:gap-2 flex-wrap">
                <span className="text-xl sm:text-3xl font-extrabold font-mono text-blue-400">
                  {mockExecutiveData.personnelPercent}%
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400">1.180/1.250 Org</span>
              </div>
              <div className="mt-2 sm:mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full" style={{ width: `${mockExecutiveData.personnelPercent}%` }} />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('LOGISTIK')}
              className="p-3 sm:p-4 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
                <span className="uppercase truncate">Kesiapan Materiil</span>
                <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <div className="mt-2 flex items-baseline gap-1 sm:gap-2 flex-wrap">
                <span className="text-xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                  {mockExecutiveData.logisticsPercent}%
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400">91.2% Baik</span>
              </div>
              <div className="mt-2 sm:mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${mockExecutiveData.logisticsPercent}%` }} />
              </div>
            </div>

            <div 
              onClick={() => onNavigate('OPERASI')}
              className="p-3 sm:p-4 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-purple-500/50 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400">
                <span className="uppercase truncate">Capaian Operasi</span>
                <Crosshair className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              </div>
              <div className="mt-2 flex items-baseline gap-1 sm:gap-2 flex-wrap">
                <span className="text-xl sm:text-3xl font-extrabold font-mono text-purple-400">
                  {mockExecutiveData.opsPercent}%
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400">8 Kegiatan Ops</span>
              </div>
              <div className="mt-2 sm:mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${mockExecutiveData.opsPercent}%` }} />
              </div>
            </div>
          </div>

          {/* HERO LAYOUT: INTELIJEN | INTERACTIVE MAP | CRITICAL ALERTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-3 space-y-4">
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                      STAF INTELIJEN
                    </h3>
                  </div>
                  <button 
                    onClick={() => onNavigate('INTELIJEN')}
                    className="text-[10px] text-amber-400 hover:underline font-mono"
                  >
                    DETAIL
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-amber-500/30">
                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                      <span>SIAGA INDEKS: TINGGI</span>
                      <span>78%</span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium mt-1">
                      Ancaman Karhutla Sektor Barat & Cuaca Ekstrem Maritim.
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Laporan Intelijen Terkini:</span>
                      <span className="font-mono text-amber-400 font-bold">14 Dok</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Ancaman Siber / Hoaks:</span>
                      <span className="font-mono text-emerald-400 font-bold">RENDAH</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Pengawasan Batas ALKI:</span>
                      <span className="font-mono text-blue-400 font-bold">AKTIF</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                      STAF OPERASI
                    </h3>
                  </div>
                  <button 
                    onClick={() => onNavigate('OPERASI')}
                    className="text-[10px] text-purple-400 hover:underline font-mono"
                  >
                    DETAIL
                  </button>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800 text-[11px]">
                    <span className="text-slate-400">Satgas Pam Perbatasan:</span>
                    <span className="font-bold text-slate-100">4 Batalyon</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800 text-[11px]">
                    <span className="text-slate-400">Patroli Maritim Natuna:</span>
                    <span className="font-bold text-emerald-400">ON DUTY</span>
                  </div>
                </div>
              </div>
            </div>

            <div id="hero-command-map" className="lg:col-span-6 space-y-4">
              <IndonesiaInteractiveMap 
                onNavigate={onNavigate}
                targetMarkerId={targetMarkerId}
                publishedRecords={publishedRecords}
                heightClass="h-[380px] sm:h-[480px] lg:h-[520px]"
              />
            </div>

            <div className="lg:col-span-3 space-y-4">
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                      CRITICAL ALERTS
                    </h3>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-950 text-red-400 border border-red-800">
                    {mockNotifications.length} PERINGATAN
                  </span>
                </div>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {mockNotifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className="p-3 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                          notif.level === 'CRITICAL' 
                            ? 'bg-red-950 text-red-300 border border-red-800' 
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {notif.level} • {notif.staff}
                        </span>
                        <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-200">{notif.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{notif.message}</p>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                        <span className="text-[10px] font-mono text-slate-500">📍 Location Alert</span>
                        <button
                          onClick={() => {
                            if (notif.title.toLowerCase().includes('jambi') || notif.message.toLowerCase().includes('jambi')) {
                              handleLocateIncident('M-JAMBI-01');
                            } else if (notif.title.toLowerCase().includes('padang') || notif.message.toLowerCase().includes('padang')) {
                              handleLocateIncident('M-PADANG-02');
                            } else {
                              handleLocateIncident('M-NATUNA-04');
                            }
                          }}
                          className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 text-amber-400 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all"
                        >
                          <Target className="w-3 h-3" />
                          <span>LOCATE ON MAP</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LOWER SECTION: COMMAND AI BRIEFING & DIRECTIVES TRACKER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-5 rounded-lg bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 shadow-md">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">
                    COMMAND AI EXECUTIVE BRIEFING
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 hidden xs:inline">
                    AI GENERATED
                  </span>
                </div>
                <button
                  onClick={handleRefreshBrief}
                  disabled={isBriefGenerating}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBriefGenerating ? 'animate-spin' : ''}`} />
                  <span>{isBriefGenerating ? 'Memperbarui...' : 'Update Brief'}</span>
                </button>
              </div>

              <div className="text-xs text-slate-300 space-y-2 whitespace-pre-line leading-relaxed font-sans">
                {aiBriefText}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Data Fusion: Intelijen, Operasi, Personel, Logistik</span>
                <button 
                  onClick={() => onNavigate('COMMAND_AI')}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-sans font-semibold"
                >
                  <span>Analisis Lebih Detail</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                    Arahan Pimpinan & Disposisi
                  </h3>
                </div>
                <button 
                  onClick={() => onNavigate('COMMAND_TASK')}
                  className="text-xs text-amber-400 hover:underline font-medium"
                >
                  Task Dashboard ({mockDirectives.length})
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs bg-slate-950 p-2 rounded border border-slate-800 font-mono">
                <div>
                  <div className="text-[10px] text-slate-500">TOTAL</div>
                  <div className="font-bold text-slate-200">{mockExecutiveData.activeDirectives}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-500">SELESAI</div>
                  <div className="font-bold text-emerald-400">{mockExecutiveData.completedDirectives}</div>
                </div>
                <div>
                  <div className="text-[10px] text-blue-500">PROSES</div>
                  <div className="font-bold text-blue-400">4</div>
                </div>
                <div>
                  <div className="text-[10px] text-red-500">TERLAMBAT</div>
                  <div className="font-bold text-red-400">{mockExecutiveData.overdueDirectives}</div>
                </div>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {mockDirectives.map((dir) => (
                  <div 
                    key={dir.id}
                    className="p-3 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{dir.id}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                        dir.status === 'SELESAI' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        dir.status === 'TERLAMBAT' ? 'bg-red-950 text-red-300 border border-red-800' :
                        'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {dir.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200">{dir.title}</h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>PIC: {dir.picUnit}</span>
                      <span>Deadline: {dir.deadline}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${dir.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* SUBMENU 2: READINESS OVERVIEW (TP READINESS INDEX) */}
      {/* ========================================================================= */}
      {(activeSubmenu === 'readiness_overview' || activeSubmenu === 'territorial_overview') && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>INDEKS KESIAPSIAGAAN SATUAN (TP READINESS INDEX)</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Rekapitulasi Kesiapan Tempur & Teritorial Seluruh Kompi Jajaran Batalyon Infanteri TP
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-xs font-bold">
                SIAP TEMPURI / READY (90.3%)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">IS TEMPURI (COMBAT)</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">91.8%</div>
                <p className="text-[10px] text-slate-500 mt-1">Personel, Amunisi, Senjata</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">IS TERITORIAL (TP)</span>
                <div className="text-2xl font-bold text-blue-400 mt-1">85.2%</div>
                <p className="text-[10px] text-slate-500 mt-1">Lahan, Alat Zeni, Alsintan</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">IS KOMANDO & STAF</span>
                <div className="text-2xl font-bold text-amber-400 mt-1">94.0%</div>
                <p className="text-[10px] text-slate-500 mt-1">C2, Komunikasi, Rencana</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">STATUS SIAGA BATALYON</span>
                <div className="text-2xl font-bold text-rose-400 mt-1">SIAGA 1</div>
                <p className="text-[10px] text-slate-500 mt-1">100% On-Call 24 Jam</p>
              </div>
            </div>

            {/* TABEL DETAIL KOMPI */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-200 uppercase tracking-wide">Daftar Kesiapsiagaan Per Kompi Jajaran</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                      <th className="p-2.5">NAMA KOMPI</th>
                      <th className="p-2.5">DISLOKASI / SEKTOR</th>
                      <th className="p-2.5">PERSONEL (RIILL/DSPP)</th>
                      <th className="p-2.5">KESIAPAN MATERIIL</th>
                      <th className="p-2.5">INDEKS COMBAT</th>
                      <th className="p-2.5">INDEKS TP TERITORIAL</th>
                      <th className="p-2.5">STATUS KESIAPAN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[
                      { name: 'KOMPI MARKAS (KIMA)', loc: 'Mayonif TP', pers: '145 / 150 (96.6%)', mat: '94%', combat: '93%', tp: '88%', status: 'SIAP OPERASIONAL' },
                      { name: 'KOMPI A (KAMPAR)', loc: 'Kampar Permai', pers: '125 / 130 (96.1%)', mat: '92%', combat: '92%', tp: '90%', status: 'SIAP TEMPURI' },
                      { name: 'KOMPI B (BANGKINANG)', loc: 'Bangkinang Barat', pers: '124 / 130 (95.3%)', mat: '90%', combat: '91%', tp: '88%', status: 'SIAP TEMPURI' },
                      { name: 'KOMPI C (PELALAWAN)', loc: 'Sektor Pelalawan', pers: '122 / 130 (93.8%)', mat: '89%', combat: '90%', tp: '86%', status: 'SIAP TEMPURI' },
                      { name: 'KOMPI BANTUAN (KIBAN)', loc: 'Mayonif TP', pers: '110 / 115 (95.6%)', mat: '95%', combat: '94%', tp: '82%', status: 'SIAP OPERASIONAL' },
                      { name: 'KOMPI PERTANIAN', loc: 'Lahan Demplot A', pers: '85 / 90 (94.4%)', mat: '88%', combat: '85%', tp: '95%', status: 'PRODUKTIF HIGH' },
                      { name: 'KOMPI PETERNAKAN', loc: 'Sektor Peternakan B', pers: '78 / 85 (91.7%)', mat: '86%', combat: '84%', tp: '92%', status: 'PRODUKTIF HIGH' },
                      { name: 'KOMPI ZENI/KONSTRUKSI', loc: 'Sektor Konstruksi', pers: '92 / 95 (96.8%)', mat: '91%', combat: '88%', tp: '94%', status: 'PROJ ACTIVE' },
                      { name: 'KOMPI MEDIS/KESLAP', loc: 'Poliklinik Yonif', pers: '65 / 70 (92.8%)', mat: '96%', combat: '90%', tp: '96%', status: 'SIAP YANKES' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/60 transition-colors">
                        <td className="p-2.5 font-bold text-slate-200">{row.name}</td>
                        <td className="p-2.5 text-slate-300">{row.loc}</td>
                        <td className="p-2.5 text-blue-400 font-bold">{row.pers}</td>
                        <td className="p-2.5 text-emerald-400 font-bold">{row.mat}</td>
                        <td className="p-2.5 text-amber-400 font-bold">{row.combat}</td>
                        <td className="p-2.5 text-blue-400 font-bold">{row.tp}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBMENU 3: TERRITORIAL OVERVIEW (TERRITORIAL STATUS) */}
      {/* ========================================================================= */}
      {activeSubmenu === 'territorial_overview' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                  <span>STATUS PEMBANGUNAN TERITORIAL & KETAHANAN PANGAN</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Laporan Realisasi & Integrasi 5 Pilar Pembangunan Teritorial Batalyon Infanteri TP
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded text-xs font-bold">
                CAPAIAN TP: 85.2%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">1. SEKTOR PERTANIAN</span>
                <div className="text-lg font-bold text-emerald-400">250 Ha Lahan</div>
                <p className="text-[10px] text-slate-500">Jagung 120Ha, Padi 80Ha, Palawija 50Ha</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">2. SEKTOR PETERNAKAN</span>
                <div className="text-lg font-bold text-amber-400">12.5k Unggas + 320 Sapi</div>
                <p className="text-[10px] text-slate-500">Kebutuhan Batalyon & Pasar</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">3. SEKTOR PERIKANAN</span>
                <div className="text-lg font-bold text-blue-400">18 Ton / Bulan</div>
                <p className="text-[10px] text-slate-500">Kolam Nila, Patin & Lele Binaan</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">4. KONSTRUKSI & AIR</span>
                <div className="text-lg font-bold text-rose-400">4 Proyek Aktif</div>
                <p className="text-[10px] text-slate-500">TMMD Jalan & Irigasi Desa</p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">5. BAKTI KESMAS</span>
                <div className="text-lg font-bold text-emerald-400">350 Warga Layanan</div>
                <p className="text-[10px] text-slate-500">Pengobatan & Nutrisi Stunting</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-200">Progres Panen & Hasil Ketahanan Pangan (Proyeksi 2026)</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Panen Jagung Hibrida Sektor Kompi A (120 Ha)</span>
                      <span className="text-emerald-400 font-bold">180 Ton (85%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Produksi Telur & Daging Unggas Kompi B (12.5k)</span>
                      <span className="text-amber-400 font-bold">4.2 Ton/Bln (90%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Program TMMD Pembukaan Jalan Tembus (3.2 km)</span>
                      <span className="text-blue-400 font-bold">60% Selesai</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-blue-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-200">Sektor Wilayah & Kompi Pelaksana Pembangunan</h3>
                <div className="space-y-2 text-[11px]">
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-amber-400 font-bold block">KOMPI A (Kampar Permai)</span>
                      <span className="text-slate-400">Pertanian Padi & Jagung + Normalisasi Irigasi 2.4 km</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px]">AKTIF</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-blue-400 font-bold block">KOMPI B (Bangkinang)</span>
                      <span className="text-slate-400">Peternakan Sapi Potong 80 Ekor + TMMD Jalan Tembus</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px]">AKTIF</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-emerald-400 font-bold block">KOMPI C (Pelalawan)</span>
                      <span className="text-slate-400">Demplot Palawija + Bhakti Kesehatan Stunting 350 Warga</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px]">AKTIF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBMENU 4: PETA KOMANDO & SITUASI TERKINI */}
      {/* ========================================================================= */}
      {(activeSubmenu === 'peta_komando' || activeSubmenu === 'situasi_terkini') && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>PETA KOMANDO & MONITORING SITUASI TERKINI</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Update Geospasial & Laporan Situasi (Lapsit) Real-time dari Pos-Pos Terdepan YONIF TP 897
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded text-xs font-bold">
                SIAGA VIGILANT
              </span>
            </div>

            {/* Interactive Map */}
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <h3 className="font-bold text-slate-200 mb-2">PETA GEOSPASIAL DISLOKASI & SEKTOR OPERASI</h3>
              <IndonesiaInteractiveMap 
                targetMarkerId={targetMarkerId} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <Flame className="w-4 h-4" />
                  <span>HOTSPOT KARHUTLA</span>
                </div>
                <div className="text-xl font-bold text-slate-100 mt-2">3 Titik Panas Terdeteksi</div>
                <p className="text-[10px] text-slate-400 mt-1">Sektor Barat Riau (Koordinat 0.531, 101.447). Tim Satgas Patroli dikerahkan.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Shield className="w-4 h-4" />
                  <span>DISLOKASI MAKOYON AGAM</span>
                </div>
                <div className="text-xl font-bold text-slate-100 mt-2">Lubuk Basung, Agam</div>
                <p className="text-[10px] text-slate-400 mt-1">Sektor utama YONIF TP 897/Singgalang terkoneksi 100%.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckSquare className="w-4 h-4" />
                  <span>KAMTIBMAS SEKTOR</span>
                </div>
                <div className="text-xl font-bold text-slate-100 mt-2">0 Kejadian Menonjol</div>
                <p className="text-[10px] text-slate-400 mt-1">Situasi Kamtibmas desa binaan Kompi A, B, C dalam keadaan aman terkendali.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-200">Feed Kejadian & Laporan Intel/Ops Terkini</h3>
              <div className="space-y-2">
                {mockIncidents.map((inc) => (
                  <div key={inc.id} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-400">{inc.kodeKejadian || inc.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inc.tingkatAncaman === 'SANGAT_TINGGI' || inc.tingkatAncaman === 'TINGGI' 
                            ? 'bg-red-950 text-red-300 border border-red-800' :
                          inc.tingkatAncaman === 'SEDANG' 
                            ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-slate-800 text-slate-300'
                        }`}>
                          ANCAMAN: {inc.tingkatAncaman}
                        </span>
                      </div>
                      <span className="text-slate-500 text-[10px]">{inc.waktuKejadian}</span>
                    </div>
                    <h4 className="font-bold text-slate-200">{inc.judul}</h4>
                    <p className="text-slate-400">{inc.ringkasan}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-[10px] text-slate-500">
                      <span>LOKASI: {inc.lokasi}</span>
                      <span className="text-emerald-400 font-bold">SUMBER: {inc.sumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBMENU 5: CRITICAL ALERTS (COMMAND ATTENTION) */}
      {/* ========================================================================= */}
      {activeSubmenu === 'critical_alerts' && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span>COMMAND ATTENTION & PERINGATAN KRITIS</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Notifikasi Berprioritas Tinggi Membutuhkan Arahan & Keputusan Danyon / Pimpinan
                </p>
              </div>
              <span className="px-3 py-1 bg-red-950 text-red-300 border border-red-800 rounded text-xs font-bold">
                {mockNotifications.length} PERINGATAN PERLU ATENSI
              </span>
            </div>

            <div className="space-y-3">
              {mockNotifications.map((notif) => (
                <div key={notif.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-400">{notif.id}</span>
                      <span className="px-2 py-0.5 bg-red-950 text-red-300 border border-red-800 rounded text-[10px] font-bold">
                        {notif.level}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">
                        STAF {notif.staff}
                      </span>
                    </div>
                    <span className="text-slate-500 text-[10px]">{notif.timestamp}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-100">{notif.title}</h3>
                  <p className="text-slate-300">{notif.message}</p>

                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-[11px] space-y-1">
                    <span className="text-amber-400 font-bold block">Rekomendasi Tindakan:</span>
                    <p className="text-slate-400">{notif.actionRequired}</p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-900">
                    <button 
                      onClick={() => onNavigate('COMMAND_TASK')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs flex items-center gap-1 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Terbitkan Disposisi Danyon</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBMENU 6: PERLU KEPUTUSAN & AGENDA PIMPINAN */}
      {/* ========================================================================= */}
      {(activeSubmenu === 'perlu_keputusan' || activeSubmenu === 'agenda_pimpinan') && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Daftar Arahan & Agenda Keputusan Danyon</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Surat Disposisi, Tugas Khusus Staf, & Agenda Resmi Komandan Yonif TP
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded text-xs font-bold">
                AGENDA PIMPINAN
              </span>
            </div>

            <div className="space-y-3">
              {mockCommanderAgenda.map((agenda) => (
                <div 
                  key={agenda.id}
                  className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded font-bold">
                        {agenda.waktu}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        agenda.status === 'BERLANGSUNG' ? 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse' :
                        agenda.status === 'SELESAI' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {agenda.status}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">LOKASI: <span className="text-slate-200 font-bold">{agenda.lokasi}</span></span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-100 mt-1">{agenda.kegiatan}</h3>
                  <p className="text-slate-400">{agenda.keterangan}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-500">
                    <span>PENDAMPING: <span className="text-slate-300">{agenda.pendamping}</span></span>
                    <span className="text-amber-400 font-bold">{agenda.kategori}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBMENU 7: PERUBAHAN TERBARU & RINGKASAN HARIAN AI */}
      {/* ========================================================================= */}
      {(activeSubmenu === 'perubahan_terbaru' || activeSubmenu === 'ringkasan_harian') && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>{activeSubmenu === 'ringkasan_harian' ? 'RINGKASAN HARIAN AI COMMANDER' : 'AUDIT PERUBAHAN TERBARU SYSTEM'}</span>
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Integrasi Otomatis Data Staf, Status Laporan & Sintesis AI Batalyon
                </p>
              </div>
              <button 
                onClick={() => onNavigate('COMMAND_AI')}
                className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded hover:bg-amber-400 transition-colors"
              >
                KONSULTASI COMMAND AI →
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Bot className="w-4 h-4" />
                <span>EXECUTIVE AI SUMMARY FOR DANYONIF TP 897</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">{aiBriefText}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


