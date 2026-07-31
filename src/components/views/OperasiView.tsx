import React, { useState } from 'react';
import { 
  Crosshair, 
  Calendar, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText,
  Activity,
  Layers,
  BarChart,
  PlusCircle,
  Award,
  Users,
  ShieldCheck,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { mockExecutiveData } from '../../data/mockData';

interface OperasiViewProps {
  activeSubmenu?: string;
}

export const OperasiView: React.FC<OperasiViewProps> = ({
  activeSubmenu = 'ops_overview'
}) => {
  const [operationsList, setOperationsList] = useState([
    {
      id: 'OPS-2026-01',
      nama: 'Operasi Siaga Patroli Karhutla Terpadu',
      sektor: 'Wilayah Barat & Riau',
      status: 'BERJALAN',
      progress: 82,
      personelCount: 240,
      danSatgas: 'Kolonel Inf Pratama',
      keterangan: 'Pencegahan dan penyekatan titik bakar lahan.'
    },
    {
      id: 'OPS-2026-02',
      nama: 'Operasi Pengamanan Objek Vital Nasional (Obvitnas)',
      sektor: 'Pelabuhan & Kilang Dumai',
      status: 'BERJALAN',
      progress: 95,
      personelCount: 180,
      danSatgas: 'Letkol Inf Budi',
      keterangan: 'Pengamanan fisik dan perimeter udara.'
    },
    {
      id: 'OPS-2026-03',
      nama: 'Gladi Posko I Latihan Terpadu Komando',
      sektor: 'Markas Komando',
      status: 'PERSIAPAN',
      progress: 40,
      personelCount: 95,
      danSatgas: 'Mayor Czi Hendra',
      keterangan: 'Simulasi pengambilan keputusan taktis pimpinan.'
    }
  ]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-purple-400 font-semibold uppercase tracking-wider mb-1">
            <Crosshair className="w-4 h-4 text-purple-400" />
            <span>Staf 3 Operasi • Operations Management & Readiness</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wide">
            OPERATIONS COMMAND & READINESS SYSTEM
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Pengendalian Program Kerja, Kalender Kegiatan, Latihan Terpadu, Evaluasi Kesiapan Satuan, dan AAR Repository.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono px-3 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
            READINESS INDEX: {mockExecutiveData.opsPercent}%
          </span>
        </div>
      </div>

      {/* 1. DASHBOARD OPERASI */}
      {activeSubmenu === 'ops_overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Kegiatan Ops Berjalan</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-purple-400">8 Operasi</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">2 Sektor Utama Wilayah</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Personel Terlibat</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-400">515 Personel</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">43.6% Kekuatan Organik</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Latihan & Gladi</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">Gladi Posko I</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">On-Schedule Kalender</p>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 uppercase">Readiness Score Satuan</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400">94.8 / 100</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Predikat A (Sangat Baik)</p>
            </div>
          </div>

          {/* Active Ops Overview List */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-slate-100 uppercase tracking-wide">
                OPERASI BERJALAN & PROGRESS KEGIATAN HARI INI
              </h2>
            </div>

            <div className="space-y-3">
              {operationsList.map((ops) => (
                <div key={ops.id} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400">{ops.id}</span>
                      <h3 className="font-bold text-slate-100">{ops.nama}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[10px] font-bold">
                      {ops.status}
                    </span>
                  </div>
                  <p className="text-slate-300">{ops.keterangan}</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: `${ops.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PROGRAM & KEGIATAN */}
      {activeSubmenu === 'ops_programs' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>PROGRAM KERJA & KALENDER KEGIATAN OPERASI</span>
            </h2>
            <button className="px-3 py-1 bg-purple-900 text-purple-200 rounded font-bold border border-purple-700">
              + Input Rencana Kegiatan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold block">PROGRAM HARIAN</span>
              <p className="text-slate-200">Patroli Gabungan Sektor Pesisir</p>
              <p className="text-slate-400 text-[10px]">Waktu: 08:00 - 17:00 WIB</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <span className="text-blue-400 font-bold block">PROGRAM MINGGUAN</span>
              <p className="text-slate-200">Pemeliharaan Alat Komunikasi & Kendaraan Taktis</p>
              <p className="text-slate-400 text-[10px]">Target: Kesiapan 100%</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">PROGRAM BULANAN</span>
              <p className="text-slate-200">Evaluasi Capaian Renstra Triwulan II</p>
              <p className="text-slate-400 text-[10px]">Penyelenggara: Staf Operasi</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. LATIHAN */}
      {activeSubmenu === 'ops_exercise' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2 border-b border-slate-800 pb-3">
            <Target className="w-4 h-4 text-amber-400" />
            <span>PROGRAM & RENCANA LATIHAN / GLADI SATUAN</span>
          </h2>
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-amber-400">Gladi Posko I Latihan Terpadu Komando</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800">
                TAHUN 2026
              </span>
            </div>
            <p className="text-slate-300">Simulasi pengambilan keputusan taktis pimpinan dalam penanggulangan krisis wilayah.</p>
            <p className="text-slate-400 font-mono text-[11px]">Peserta: 95 Perwira Staf & Komandan Satuan.</p>
          </div>
        </div>
      )}

      {/* 4. KESIAPAN SATUAN */}
      {activeSubmenu === 'ops_readiness' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>KESIAPAN SATUAN (READINESS OVERVIEW)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 text-[11px]">KESIAPAN PERSONEL</span>
              <div className="text-xl font-bold font-mono text-emerald-400">96.2% HADIR</div>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 text-[11px]">KESIAPAN MATERIIL</span>
              <div className="text-xl font-bold font-mono text-blue-400">92.8% SIAP PAKAI</div>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-1">
              <span className="font-mono text-slate-400 text-[11px]">READINESS SCORE OVERALL</span>
              <div className="text-xl font-bold font-mono text-purple-400">94.8 / 100</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MONITORING */}
      {activeSubmenu === 'ops_monitoring' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
            MONITORING REAL-TIME PELAKSANAAN KEGIATAN & KENDALA
          </h2>
          <p className="text-slate-300">
            Pemantauan langsung pergerakan tim patroli, status logistik lapangan, dan linimasa penyelesaian tugas.
          </p>
        </div>
      )}

      {/* 6. COMMAND MAP */}
      {activeSubmenu === 'ops_map' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
            COMMAND MAP OPERASI & AREA TANGGUNG JAWAB
          </h2>
          <p className="text-slate-300">
            Tampilan peta khusus penempatan Satgas, batas wilayah operasi, dan rute patroli udara/darat.
          </p>
        </div>
      )}

      {/* 7. EVALUASI & LAPORAN */}
      {activeSubmenu === 'ops_reports' && (
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide border-b border-slate-800 pb-3">
            EVALUASI KEGIATAN & AFTER ACTION REVIEW (AAR)
          </h2>
          <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
            <h3 className="font-bold text-purple-400">Dokumen AAR Operasi Siaga Karhutla 2025</h3>
            <p className="text-slate-300">Lessons learned: Peningkatan efektivitas komunikasi radio genggam di wilayah blankspot.</p>
            <button className="px-3 py-1 bg-slate-800 rounded font-bold text-slate-200 border border-slate-700">
              Lihat Laporan Evaluasi Lengkap
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
