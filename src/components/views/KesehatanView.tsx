import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  Stethoscope, 
  Ambulance, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  FileSpreadsheet,
  Droplet,
  Pill,
  Users,
  Search,
  Building,
  Package
} from 'lucide-react';
import { mockAlkapKesehatan } from '../../data/mockData';

interface KesehatanViewProps {
  activeSubmenu?: string;
}

export const KesehatanView: React.FC<KesehatanViewProps> = ({
  activeSubmenu = 'kes_overview'
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlkap = mockAlkapKesehatan.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const medicalClasses = [
    { class: 'Kelas I (Fit Tanpa Catatan)', count: 980, percent: 83.0, status: 'SIAP TEMPURI' },
    { class: 'Kelas II (Fit Ringan / Kacamata / Gigi)', count: 145, percent: 12.3, status: 'SIAP DENGAN CATATAN' },
    { class: 'Kelas III (Pengobatan Rawat Jalan)', count: 42, percent: 3.6, status: 'PEMULIHAN' },
    { class: 'Kelas IV (Rawat Inap / Unfit)', count: 13, percent: 1.1, status: 'BEBAS TUGAS MEDIS' }
  ];

  const ambulances = [
    { unit: 'Ambulans 4x4 Land Cruiser No. 01', status: 'SIAP OPERASIONAL', pos: 'Poskes Batalyon', driver: 'Sertu Agus' },
    { unit: 'Ambulans 4x4 Land Cruiser No. 02', status: 'SIAP OPERASIONAL', pos: 'Poskes Kompi Medis', driver: 'Serda Rian' },
    { unit: 'Ambulans Taktis Isuzu NPS 4x4 No. 03', status: 'PEMELIHARAAN', pos: 'Bengkel Ton Evakuasi', driver: 'Kopda Joko' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Dokter Batalyon • Unsur Pembantu Pimpinan & Pelayanan Keslap</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wide">
            KESEHATAN BATALYON & KESLAP YONIF TP 897
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitoring Rikkes Berkala Prajurit, Inventory ALKAP KESEHATAN (Slide 11 & 12), Armada Evakuasi, dan Bekes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
            KESIAPAN MEDIS: 95.3%
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase">Prajurit Fit (Kelas I & II)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">95.3%</span>
            <span className="text-[10px] text-slate-400">(1.125 / 1.180)</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Siap Mobilisasi Operasional</p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase">Total Item Alkap Kes</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-400">41 Kategori</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Slide 11 & Slide 12 Lapsat</p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase">Kesiapan Evakuasi</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-400">2 / 3 Unit</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Ambulans Taktis 4x4 Ready</p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
          <span className="text-slate-400 uppercase">Bakti Kesmas Teritorial</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-400">1.420 Pasien</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Layanan Pengobatan Gratis Q3</p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Medical Classification */}
        <div className="lg:col-span-2 p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              STATUS KELAS KESEHATAN PRAJURIT (RIKKES BERKALA)
            </h2>
            <span className="text-[11px] font-mono text-slate-400">Update Terakhir: 29 Juli 2026</span>
          </div>

          <div className="space-y-3">
            {medicalClasses.map((item, index) => (
              <div key={index} className="p-3 bg-slate-950 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-200">{item.class}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Jumlah: <span className="text-slate-100 font-bold">{item.count} Prajurit</span> ({item.percent}%)
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div 
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-emerald-400' : index === 1 ? 'bg-blue-400' : index === 2 ? 'bg-amber-400' : 'bg-red-400'
                      }`} 
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    index === 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    index === 1 ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                    index === 2 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-red-950 text-red-300 border border-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Dokter Advice Note */}
          <div className="p-4 bg-slate-950/80 rounded border border-amber-800/60 font-mono text-xs space-y-1">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              REKOMENDASI DOKTER BATALYON UNTUK DANYON:
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              13 Prajurit Kelas IV disarankan tidak diikutsertakan dalam latihan taktis medan berat minggu depan. Tim Keslap siap menyiagakan 1 Poskes Lapangan & 2 Ambulans Taktis untuk mendukung Latihan Puncak Yonif TP.
            </p>
          </div>
        </div>

        {/* Evakuasi Units */}
        <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2 border-b border-slate-800 pb-2">
            <Ambulance className="w-4 h-4 text-blue-400" />
            ARMADA EVAKUASI & AMBULANS TAKTIS
          </h3>
          
          <div className="space-y-2 text-xs">
            {ambulances.map((a, i) => (
              <div key={i} className="p-2.5 bg-slate-950 rounded border border-slate-800">
                <div className="font-bold text-slate-200 text-[11px]">{a.unit}</div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>Pos: {a.pos}</span>
                  <span className={a.status === 'SIAP OPERASIONAL' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TABEL ALKAP KESEHATAN LENGKAP (FOTO SLIDE 11 & 12) */}
      <div className="p-5 bg-slate-900 rounded-xl border border-amber-600/40 space-y-4 font-mono text-xs shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-amber-400 uppercase tracking-wide flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              <span>PEMBINAAN MATERIIL: ALKAP KESEHATAN (SLIDE 11 & 12 LAPSAT)</span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Daftar Lengkap 41 Item Peralatan & Perlengkapan Kesehatan Batalyon Infanteri TP 897</p>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Cari Alkap Kes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-950/40 border-b border-amber-600/40 text-amber-300 font-bold uppercase text-[11px]">
                <th className="p-2.5 text-center w-12">NO</th>
                <th className="p-2.5">NAMA ALKAP KESEHATAN</th>
                <th className="p-2.5 text-center w-24">SATUAN</th>
                <th className="p-2.5 text-center w-24">JUMLAH</th>
                <th className="p-2.5 text-right w-32">KONDISI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredAlkap.map((item) => (
                <tr key={item.no} className="hover:bg-slate-800/50">
                  <td className="p-2.5 text-center text-slate-400 font-bold">{item.no}</td>
                  <td className="p-2.5 font-bold text-slate-100 uppercase">{item.nama}</td>
                  <td className="p-2.5 text-center text-slate-400">{item.sat}</td>
                  <td className="p-2.5 text-center font-bold text-amber-400 text-sm">{item.jumlah}</td>
                  <td className="p-2.5 text-right font-bold text-emerald-400">
                    <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded text-[10px]">
                      BAIK / READY
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

