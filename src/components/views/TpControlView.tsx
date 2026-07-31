import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  TrendingUp, 
  BarChart as BarChartIcon, 
  CheckCircle2, 
  Bot, 
  Layers, 
  Building, 
  HeartPulse, 
  ShieldCheck,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface TpControlViewProps {
  onNavigateToCompany?: (compKey: string) => void;
  activeSubmenu?: string;
}

export const TpControlView: React.FC<TpControlViewProps> = ({
  onNavigateToCompany,
  activeSubmenu = 'tp_overview'
}) => {
  const initialSector = 
    activeSubmenu === 'tp_pertanian' ? 'PERTANIAN' :
    activeSubmenu === 'tp_peternakan' ? 'PETERNAKAN' :
    activeSubmenu === 'tp_konstruksi' ? 'KONSTRUKSI' :
    activeSubmenu === 'tp_kesehatan' ? 'KESEHATAN' : 'ALL';

  const [selectedSector, setSelectedSector] = useState<'ALL' | 'PERTANIAN' | 'PETERNAKAN' | 'KONSTRUKSI' | 'KESEHATAN'>(initialSector);

  const tpBarChartData = [
    { sector: 'Pertanian (Ha)', capaian: 217, target: 250, unit: 'Ha' },
    { sector: 'Peternakan (Ekor)', capaian: 320, target: 350, unit: 'Sapi' },
    { sector: 'Perikanan (Ton)', capaian: 18, target: 20, unit: 'Ton' },
    { sector: 'Konstruksi (Unit)', capaian: 4, target: 5, unit: 'Proyek' },
    { sector: 'Kesehatan (Org)', capaian: 1420, target: 1500, unit: 'Warga' },
  ];

  const sectorKPIs = [
    { title: 'PERTANIAN', val: '87%', target: '250 Ha Total Lahan', status: 'ON TARGET', color: 'emerald', key: 'ki_pertanian' },
    { title: 'PETERNAKAN', val: '82%', target: '12.5k Unggas + 320 Sapi', status: 'ON TARGET', color: 'emerald', key: 'ki_peternakan' },
    { title: 'PERIKANAN', val: '79%', target: '18 Ton Nila & Patin / Bln', status: 'STABIL', color: 'blue', key: 'ki_peternakan' },
    { title: 'KONSTRUKSI', val: '74%', target: '4 Proyek Infrastruktur', status: 'ON SCHEDULE', color: 'amber', key: 'ki_zeni' },
    { title: 'KESEHATAN', val: '91%', target: '1.420 Warga Dilayani', status: 'SANGAT BAIK', color: 'emerald', key: 'ki_medis' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Pusat Pengendalian Teritorial Pembangunan • TP Control Center</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wide">
            TERRITORIAL DEVELOPMENT CONTROL CENTER
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Integrasi Program Ketahanan Pangan, Peternakan, Infrastructure/Energi, dan Kesehatan Masyarakat Batalyon Infanteri Teritorial Pembangunan.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
            INDEKS TERITORIAL: 85.2%
          </span>
        </div>
      </div>

      {/* Territorial Development Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
        {sectorKPIs.map((s, i) => (
          <div 
            key={i}
            onClick={() => onNavigateToCompany && onNavigateToCompany(s.key)}
            className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">{s.title}</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400">{s.val}</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 border-t border-slate-800/80 pt-2 flex items-center justify-between">
              <span className="truncate">{s.status}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Diagram Batang: Capaian Target Pembangunan Teritorial */}
      <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono text-xs shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <BarChartIcon className="w-4 h-4 text-emerald-400" />
            <span>DIAGRAM BATANG: CAPAIAN REALSASI VS TARGET PROGRAM TP</span>
          </h2>
          <span className="text-[10px] text-slate-400">Indikator Terukur</span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tpBarChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="sector" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '6px', fontSize: '11px', color: '#f8fafc' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="capaian" fill="#10b981" radius={[3, 3, 0, 0]} name="Capaian Riil" />
              <Bar dataKey="target" fill="#475569" radius={[3, 3, 0, 0]} name="Target Program" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Analysis & Strategic Trend */}
      <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="font-bold text-amber-400 uppercase tracking-wide flex items-center gap-2">
            <Bot className="w-4 h-4 text-amber-400" />
            ANALISIS AI COMMAND360: SYNERGY & CAPACITY PROJECTION YONIF TP
          </h2>
          <span className="text-[10px] text-slate-400">Model: Gemini Military TP Engine</span>
        </div>

        <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2 text-slate-300 leading-relaxed text-[11px]">
          <p>
            <strong className="text-emerald-400">1. Sinergi Pangan & Pakan:</strong> Integrasi limbah pertanian Kompi Pertanian ke Kompi Peternakan berhasil menekan biaya operasional pakan sebesar 65% dan menjamin ketersediaan protein (telur & daging) untuk seluruh prajurit & warga sekitar.
          </p>
          <p>
            <strong className="text-blue-400">2. Infrastruktur Air & Energi:</strong> Dukungan Pompanisasi Zeni di lahan 250 Ha meningkatkan frekuensi tanam dari 2 kali menjadi 3 kali semusim.
          </p>
          <p>
            <strong className="text-amber-400">3. Rekomendasi Pimpinan:</strong> Tingkatkan ekspansi lahan hidroponik untuk Kompi Pertanian sebesar 10 Ha pada Q4 untuk mendukung stok darurat regional.
          </p>
        </div>
      </div>

    </div>
  );
};
