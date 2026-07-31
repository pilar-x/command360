import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Activity, 
  ShieldCheck,
  Gauge,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { mockExecutiveData } from '../../data/mockData';
import { TacticalGauge } from '../common/TacticalGauge';

export const AnalyticsCenterView: React.FC = () => {
  // Data Diagram Batang Kekuatan & Kesiapan Per Kompi
  const kompiReadinessData = [
    { name: 'KIMA', dspp: 150, siapOps: 145, matReady: 94 },
    { name: 'Kompi A', dspp: 130, siapOps: 125, matReady: 92 },
    { name: 'Kompi B', dspp: 130, siapOps: 124, matReady: 90 },
    { name: 'Kompi C', dspp: 130, siapOps: 122, matReady: 89 },
    { name: 'Kompi Ban', dspp: 115, siapOps: 110, matReady: 95 },
    { name: 'Ki Tani', dspp: 90, siapOps: 85, matReady: 88 },
    { name: 'Ki Ternak', dspp: 85, siapOps: 78, matReady: 86 },
    { name: 'Ki Zeni', dspp: 95, siapOps: 92, matReady: 91 },
    { name: 'Ki Medis', dspp: 70, siapOps: 65, matReady: 96 },
  ];

  // Data Diagram Batang Cadangan Bekal & Logistik
  const logisticStockData = [
    { category: 'BBM Solar/Dex', persen: 90, status: 'Aman' },
    { category: 'Amunisi 5.56mm', persen: 72, status: 'Siaga' },
    { category: 'Ranmor Tempur', persen: 91, status: 'Aman' },
    { category: 'Alkom / Radio', persen: 94, status: 'Sangat Baik' },
    { category: 'Bekal Beras / Kaporlap', persen: 96, status: 'Aman' },
    { category: 'Obat / Keslap', persen: 88, status: 'Aman' },
  ];

  const monthlyTrendData = [
    { month: 'Jan', opsScore: 88, persScore: 91, logScore: 89 },
    { month: 'Feb', opsScore: 90, persScore: 92, logScore: 90 },
    { month: 'Mar', opsScore: 92, persScore: 93, logScore: 91 },
    { month: 'Apr', opsScore: 89, persScore: 93, logScore: 90 },
    { month: 'Mei', opsScore: 91, persScore: 94, logScore: 92 },
    { month: 'Jun', opsScore: 93, persScore: 94, logScore: 91 },
    { month: 'Jul', opsScore: 92.4, persScore: 94.4, logScore: 91.2 },
  ];

  const personnelPieData = [
    { name: 'Hadir Siaga', value: 980, color: '#10b981' },
    { name: 'Dinas Luar', value: 110, color: '#f59e0b' },
    { name: 'Cuti / Izin', value: 65, color: '#3b82f6' },
    { name: 'Pendidikan', value: 25, color: '#a855f7' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Executive Analytics Center • Fusion Index & Gauges</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            EXECUTIVE ANALYTICS, GAUGES & DIAGRAM BATANG
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Analisis Komprehensif Indeks Kesiapan Satuan, Diagram Batang Kekuatan Kompi, & Indikator Gauge Real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-emerald-400" />
            FUSION INDEX: <strong className="text-amber-400">92.4%</strong>
          </span>
        </div>
      </div>

      {/* Row 1: Tactical Gauge Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TacticalGauge 
          title="Indeks Kesiapan Operasional" 
          subtitle="Combat & Tactical Readiness"
          value={92.4} 
          targetValue={90}
          color="emerald"
          statusLabel="SIAP TEMPURI"
        />
        <TacticalGauge 
          title="Kekuatan Personel Siaga" 
          subtitle="Hadir vs DSPP Satuan"
          value={94.4} 
          targetValue={92}
          color="blue"
          statusLabel="OPTIMAL"
        />
        <TacticalGauge 
          title="Material & Alutsista" 
          subtitle="Kondisi Baik & Ready"
          value={91.2} 
          targetValue={88}
          color="amber"
          statusLabel="SIAP OPERASIONAL"
        />
        <TacticalGauge 
          title="Indeks Teritorial & TP" 
          subtitle="Capaian Pembangunan"
          value={89.5} 
          targetValue={85}
          color="purple"
          statusLabel="SANGAT MAJU"
        />
      </div>

      {/* Row 2: Diagram Batang (Bar Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart 1: Perbandingan Kekuatan & Kesiapan Per Kompi */}
        <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold text-slate-100 uppercase font-mono flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Diagram Batang: Kekuatan & Kesiapan Personel Per Kompi
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Prajurit (Orang)</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kompiReadinessData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '6px', fontSize: '11px', color: '#f8fafc' }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="dspp" fill="#475569" radius={[3, 3, 0, 0]} name="TOP/DSPP" />
                <Bar dataKey="siapOps" fill="#10b981" radius={[3, 3, 0, 0]} name="Siap Ops (Riil)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">
            *Diagram menunjukkan perbandingan jumlah DSPP ideal vs prajurit riil siap siaga di tiap Kompi Yonif TP.
          </p>
        </div>

        {/* Bar Chart 2: Indeks Ketersediaan Logistik & Bekal Bekal */}
        <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-xs font-bold text-slate-100 uppercase font-mono flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Diagram Batang: Tingkat Ketersediaan Bekal & Materiil (%)
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Persentase (%)</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={logisticStockData} layout="vertical" margin={{ top: 10, right: 20, left: 25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={10} width={110} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '6px', fontSize: '11px', color: '#f8fafc' }} 
                />
                <Bar dataKey="persen" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Ketersediaan (%)">
                  {logisticStockData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.persen < 80 ? '#f59e0b' : entry.persen < 70 ? '#ef4444' : '#10b981'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Hijau: Ketersediaan Tinggi (&gt;80%)</span>
            <span>Kuning: Perlu Atensi (70-80%)</span>
          </p>
        </div>

      </div>

      {/* Row 3: Trend & Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Trend Area Chart */}
        <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
          <h2 className="text-xs font-bold text-slate-100 uppercase font-mono">
            Tren Historis Kesiapan Operasional (Jan - Jul 2026)
          </h2>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '6px', fontSize: '12px' }} 
                />
                <Area type="monotone" dataKey="opsScore" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} name="Operasi" />
                <Area type="monotone" dataKey="persScore" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Personel" />
                <Area type="monotone" dataKey="logScore" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Logistik" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personnel Composition Pie Chart */}
        <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 space-y-3">
          <h2 className="text-xs font-bold text-slate-100 uppercase font-mono">
            Komposisi Kehadiran & Status Personel Satuan
          </h2>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={personnelPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {personnelPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '6px', fontSize: '12px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {personnelPieData.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-slate-300">{p.name}: {p.value} Org</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

