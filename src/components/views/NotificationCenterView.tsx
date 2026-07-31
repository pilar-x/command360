import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  ShieldAlert, 
  CheckCircle, 
  ArrowUpRight, 
  Filter, 
  Search 
} from 'lucide-react';
import { mockNotifications, mockExecutiveData } from '../../data/mockData';
import { AlertNotification } from '../../types';

export const NotificationCenterView: React.FC = () => {
  const [notifications, setNotifications] = useState<AlertNotification[]>(mockNotifications);
  const [activeLevel, setActiveLevel] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'INFO'>('ALL');

  const handleAcknowledge = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'ACKNOWLEDGED' } : n));
  };

  const filteredNotifs = notifications.filter(n => activeLevel === 'ALL' || n.level === activeLevel);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5 text-red-400" />
            <span>Notification Center • Executive Alert Tiering</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            PUSTAKA NOTIFIKASI & CRITICAL ALERTS
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Sistem klasifikasi bertingkat agar pimpinan berfokus pada kejadian kritis tanpa terganggu notifikasi rutin.
          </p>
        </div>
      </div>

      {/* Tiering Summary Filter Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveLevel('CRITICAL')}
          className={`p-4 rounded-lg border text-left transition-all ${
            activeLevel === 'CRITICAL'
              ? 'bg-red-950/80 border-red-500 ring-2 ring-red-500/30'
              : 'bg-slate-900 border-slate-800 hover:border-red-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono font-bold text-red-400">
            <span>5 CRITICAL</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Eskalasi & Tindak Lanjut Segera</p>
        </button>

        <button
          onClick={() => setActiveLevel('WARNING')}
          className={`p-4 rounded-lg border text-left transition-all ${
            activeLevel === 'WARNING'
              ? 'bg-amber-950/80 border-amber-500 ring-2 ring-amber-500/30'
              : 'bg-slate-900 border-slate-800 hover:border-amber-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
            <span>8 WARNING</span>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Peringatan Kesiapan Staf</p>
        </button>

        <button
          onClick={() => setActiveLevel('ADVISORY')}
          className={`p-4 rounded-lg border text-left transition-all ${
            activeLevel === 'ADVISORY'
              ? 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-500/30'
              : 'bg-slate-900 border-slate-800 hover:border-blue-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-400">
            <span>14 ADVISORY</span>
            <Info className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Pemberitahuan Taktis</p>
        </button>

        <button
          onClick={() => setActiveLevel('INFO')}
          className={`p-4 rounded-lg border text-left transition-all ${
            activeLevel === 'INFO'
              ? 'bg-slate-800 border-slate-600 ring-2 ring-slate-500/30'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
            <span>37 INFORMATION</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Laporan Rutin & Status Normal</p>
        </button>
      </div>

      {/* Notifications List */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-slate-100 uppercase font-mono">
            Daftar Alert Status ({filteredNotifs.length})
          </h2>
          {activeLevel !== 'ALL' && (
            <button 
              onClick={() => setActiveLevel('ALL')} 
              className="text-xs text-amber-400 hover:underline font-mono"
            >
              Tampilkan Semua Alert
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredNotifs.map((n) => (
            <div 
              key={n.id}
              className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-400">{n.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    n.level === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-800' :
                    n.level === 'WARNING' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {n.level} • {n.staff}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{n.timestamp}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-100">{n.title}</h3>
              <p className="text-xs text-slate-300">{n.message}</p>

              {n.actionRequired && (
                <div className="p-2.5 bg-slate-900 rounded border border-amber-500/30 text-xs font-mono text-amber-300">
                  <strong>Tindak Lanjut Disarankan: </strong> {n.actionRequired}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs font-mono">
                <span className="text-slate-500">Status: {n.status}</span>
                {n.status === 'UNREAD' && (
                  <button
                    onClick={() => handleAcknowledge(n.id)}
                    className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded hover:bg-amber-400 text-[11px]"
                  >
                    Konfirmasi / Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
