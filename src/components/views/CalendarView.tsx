import React from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus 
} from 'lucide-react';

export const CalendarView: React.FC = () => {
  const agendaEvents = [
    { time: '08:00 WIB', title: 'Executive Morning Briefing Panglima & Para Asisten', location: 'Ruang Rapat Utama COMMAND360', staff: 'COMMAND' },
    { time: '10:30 WIB', title: 'Video Conference Laporan Situasi Karhutla dengan Dan Satgas', location: 'Posko Satgas Kampar', staff: 'INTELIJEN / OPS' },
    { time: '13:30 WIB', title: 'Pemeriksaan Kesiapan Ranmor Anoa 6x6 Batalyon Mekanis', location: 'Garasi Bengkel Belakang', staff: 'LOGISTIK' },
    { time: '15:30 WIB', title: 'Evaluasi Penyesuaian DSPP & Talent Pool Perwira', location: 'Ruang Spers', staff: 'PERSONEL' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Calendar & Agenda • Executive & Staff Schedule</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            AGENDA PIMPINAN & KALENDER KEGIATAN SATUAN
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Jadwal Rapat Pimpinan, Agenda Empat Staf, Latihan Terpadu, dan Pengingat Milestone Taktis.
          </p>
        </div>

        <button className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded hover:bg-amber-400">
          <Plus className="w-4 h-4" />
          <span>Tambah Agenda</span>
        </button>
      </div>

      {/* Agenda Items */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h2 className="text-sm font-bold text-slate-100 uppercase font-mono border-b border-slate-800 pb-2">
          Agenda Hari Ini • Rabu, 29 Juli 2026
        </h2>

        <div className="space-y-3">
          {agendaEvents.map((evt, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-amber-400">{evt.time}</span>
                  <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[10px]">{evt.staff}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{evt.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{evt.location}</span>
                </p>
              </div>

              <span className="px-2.5 py-1 bg-blue-950 text-blue-300 rounded border border-blue-800 text-xs font-mono font-bold">
                DIJADWALKAN
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
