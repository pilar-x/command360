import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  CheckCircle, 
  Clock, 
  Plus, 
  Search,
  FileSpreadsheet
} from 'lucide-react';
import { mockReports } from '../../data/mockData';
import { downloadReferenceDoc } from '../../utils/downloadUtils';

export const ReportCenterView: React.FC = () => {
  const [reports, setReports] = useState(mockReports);
  const [activeStaff, setActiveStaff] = useState<string>('ALL');
  const [activeStatus, setActiveStatus] = useState<string>('ALL');

  const filteredReports = reports.filter(r => {
    const matchesStaff = activeStaff === 'ALL' || r.staff === activeStaff;
    const matchesStatus = activeStatus === 'ALL' || r.status === activeStatus;
    return matchesStaff && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Report Center • Consolidated Executive Reporting</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            PUSAT LAPORAN EMPAT STAF TERPADU
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Konsolidasi Laporan Harian, Mingguan, Bulanan, dan Laporan Khusus Intelijen, Operasi, Personel, dan Logistik.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 rounded text-xs font-semibold font-mono">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Rekap Excel</span>
          </button>
        </div>
      </div>

      {/* Pipeline Status Filters */}
      <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-1">
          <span className="text-slate-500 mr-2">STAF:</span>
          {['ALL', 'INTELIJEN', 'OPERASI', 'PERSONEL', 'LOGISTIK'].map((s) => (
            <button
              key={s}
              onClick={() => setActiveStaff(s)}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeStaff === s ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-slate-500 mr-2">STATUS:</span>
          {['ALL', 'MENUNGGU_VERIFIKASI', 'DISETUJUI', 'ARSIP'].map((st) => (
            <button
              key={st}
              onClick={() => setActiveStatus(st)}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeStatus === st ? 'bg-blue-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Repository List */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-slate-100 uppercase font-mono">
            Pustaka Laporan Terverifikasi ({filteredReports.length})
          </h2>
        </div>

        <div className="space-y-3">
          {filteredReports.map((r) => (
            <div 
              key={r.id}
              className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-amber-400">{r.id}</span>
                  <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded border border-slate-700">{r.staff}</span>
                  <span className="px-1.5 py-0.2 bg-amber-950 text-amber-300 rounded border border-amber-800">{r.clearance}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{r.judul}</h3>
                <p className="text-xs text-slate-300">{r.ringkasanContent}</p>
                <div className="text-[10px] font-mono text-slate-500 flex gap-4">
                  <span>Pembuat: {r.pembuat}</span>
                  <span>Tanggal: {r.tanggal}</span>
                  <span>Jenis: {r.jenis}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                  r.status === 'DISETUJUI' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {r.status}
                </span>

                <button 
                  onClick={() => downloadReferenceDoc(r.judul, r.staff, r.ringkasanContent, { id: r.id, clearance: r.clearance, author: r.pembuat, date: r.tanggal })}
                  className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded transition-colors" 
                  title="Unduh Referensi / Laporan"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
