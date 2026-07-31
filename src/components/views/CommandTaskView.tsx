import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Calendar,
  FileCheck2,
  ChevronRight
} from 'lucide-react';
import { mockDirectives } from '../../data/mockData';
import { CommandDirectiveTask } from '../../types';

export const CommandTaskView: React.FC = () => {
  const [tasks, setTasks] = useState<CommandDirectiveTask[]>(mockDirectives);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Directive Form State
  const [newTitle, setNewTitle] = useState('');
  const [newArahan, setNewArahan] = useState('');
  const [newPic, setNewPic] = useState('Batalyon Infanteri 1');
  const [newDeadline, setNewDeadline] = useState('2026-08-15');
  const [newPriority, setNewPriority] = useState<'TINGGI' | 'SEDANG' | 'RENDAH'>('TINGGI');

  const handleCreateDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newArahan) return;

    const newTask: CommandDirectiveTask = {
      id: `TSK-${100 + tasks.length + 1}`,
      title: newTitle,
      arahanPimpinan: newArahan,
      disposisi: 'Asops & Asintel',
      picUnit: newPic,
      deadline: newDeadline,
      priority: newPriority,
      progress: 0,
      status: 'DALAM_PROSES',
      followUpHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          note: 'Arahan Pimpinan diterbitkan',
          author: 'Panglima / Komandan'
        }
      ]
    };

    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewArahan('');
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.picUnit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">
            <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Command Task • Arahan Pimpinan & Disposisi Control</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            ARAHAN PIMPINAN & DISPOSISI CONTROL
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Pusat Pengendalian Tindak Lanjut Direktif Eksekutif, PIC Unit Penanggung Jawab, Evidence & Monitoring Deadline.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-md shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Arahan Pimpinan Baru</span>
        </button>
      </div>

      {/* Directives Status Counter Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase">TOTAL ARAHAN</span>
          <div className="mt-1 text-2xl font-bold font-mono text-slate-200">18 Arahan</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-emerald-400 uppercase">SELESAI / VERIFIED</span>
          <div className="mt-1 text-2xl font-bold font-mono text-emerald-400">12 Arahan</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-blue-400 uppercase">DALAM PROSES</span>
          <div className="mt-1 text-2xl font-bold font-mono text-blue-400">4 Arahan</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] font-mono text-red-400 uppercase">TERLAMBAT (OVERDUE)</span>
          <div className="mt-1 text-2xl font-bold font-mono text-red-400">2 Arahan</div>
        </div>
      </div>

      {/* Task List Table & Search */}
      <div className="p-5 bg-slate-900 rounded-lg border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-slate-100 uppercase">Daftar Arahan & Disposisi Unit</h2>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Cari Arahan atau PIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-slate-700"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-slate-300 font-mono"
            >
              <option value="ALL">SEMUA STATUS</option>
              <option value="DALAM_PROSES">DALAM PROSES</option>
              <option value="SELESAI">SELESAI</option>
              <option value="TERLAMBAT">TERLAMBAT</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((t) => (
            <div 
              key={t.id}
              className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400">{t.id}</span>
                  <h3 className="text-sm font-bold text-slate-100">{t.title}</h3>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.priority === 'TINGGI' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-slate-800 text-slate-300'
                  }`}>
                    PRIORITAS: {t.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.status === 'SELESAI' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    t.status === 'TERLAMBAT' ? 'bg-red-950 text-red-300 border border-red-800' :
                    'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800">
                <span className="font-bold text-amber-400">Arahan Pimpinan: </span>
                <span>"{t.arahanPimpinan}"</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Progress Tindak Lanjut</span>
                  <span>{t.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${t.progress}%` }} />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-900">
                <span>PIC Unit: <strong className="text-slate-200">{t.picUnit}</strong></span>
                <span>Disposisi: {t.disposisi}</span>
                <span>Deadline: <strong className="text-amber-400">{t.deadline}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create New Directive */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 max-w-lg w-full space-y-4 shadow-2xl">
            <h2 className="text-sm font-bold text-slate-100 uppercase border-b border-slate-800 pb-2">
              Terbitkan Arahan Pimpinan Baru
            </h2>

            <form onSubmit={handleCreateDirective} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono">Judul Direktif / Tugas</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="misal: Penyiapan Satgas Pengamanan Obvitnas Dumai"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Isi Arahan Pimpinan</label>
                <textarea
                  required
                  rows={3}
                  value={newArahan}
                  onChange={(e) => setNewArahan(e.target.value)}
                  placeholder="Tuliskan petunjuk dan arahan pimpinan secara tegas..."
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">PIC Unit Penanggung Jawab</label>
                  <input
                    type="text"
                    value={newPic}
                    onChange={(e) => setNewPic(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Deadline Tuntas</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono">Tingkat Prioritas</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-slate-100"
                >
                  <option value="TINGGI">TINGGI (SEGERA)</option>
                  <option value="SEDANG">SEDANG</option>
                  <option value="RENDAH">RENDAH</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded font-semibold hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded hover:bg-amber-400"
                >
                  Terbitkan Direktif
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
