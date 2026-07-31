import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Users, 
  Key, 
  Activity, 
  Server, 
  Database, 
  Lock,
  History
} from 'lucide-react';
import { mockSystemStatus } from '../../data/mockData';

interface AdminSystemViewProps {
  mode: 'ADMINISTRATION' | 'SYSTEM_CENTER';
}

export const AdminSystemView: React.FC<AdminSystemViewProps> = ({ mode }) => {
  const usersList = [
    { name: 'Kolonel Inf Pratama', role: 'Asops', clearance: 'SANGAT RAHASIA', mfa: 'AKTIF', status: 'ONLINE' },
    { name: 'Letkol Inf Budi', role: 'Dan Satgas', clearance: 'RAHASIA', mfa: 'AKTIF', status: 'ONLINE' },
    { name: 'Mayor Czi Hendra', role: 'Dandenzipur', clearance: 'RAHASIA', mfa: 'AKTIF', status: 'OFFLINE' },
    { name: 'Kapten Cpl Dian', role: 'Kasilog', clearance: 'TERBATAS', mfa: 'AKTIF', status: 'ONLINE' },
  ];

  const auditLogs = [
    { time: '16:05:12', user: 'Kolonel Inf Pratama', action: 'Mengakses Executive Briefing COMMAND AI', ip: '192.168.1.42' },
    { time: '15:42:00', user: 'Letkol Inf Budi', action: 'Mengubah Status Progress Directives TSK-101 (75%)', ip: '192.168.1.88' },
    { time: '14:20:10', user: 'Kapten Cpl Dian', action: 'Mengunduh Laporan Khusus Kelayakan Alutsista', ip: '192.168.1.102' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            {mode === 'ADMINISTRATION' ? <Settings className="w-3.5 h-3.5 text-amber-400" /> : <Cpu className="w-3.5 h-3.5 text-amber-400" />}
            <span>{mode === 'ADMINISTRATION' ? 'Administration & Access Control' : 'System Center & Infrastructure Health'}</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            {mode === 'ADMINISTRATION' ? 'USER MANAGEMENT & AUDIT TRAIL' : 'SYSTEM STATUS & INTEGRATION MONITOR'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {mode === 'ADMINISTRATION' 
              ? 'RBAC Permission, Security Clearance Assignment, Multi-Factor Authentication, & Security Audit Logs.'
              : 'Server Uptime, Database Health, API Latency, Storage Allocation, and System Release Notes.'}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded border border-emerald-800">
          <span>STATUS: ALL SYSTEMS NORMAL</span>
        </div>
      </div>

      {mode === 'ADMINISTRATION' ? (
        <div className="space-y-6">
          
          {/* User Management Table */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
            <h2 className="text-sm font-bold text-slate-100 uppercase font-mono border-b border-slate-800 pb-2">
              Daftar Pengguna & Clearance Akses (Role-Based Access Control)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase bg-slate-950">
                    <th className="py-2.5 px-3">NAMA PENGGUNA</th>
                    <th className="py-2.5 px-3">PERAN / JABATAN</th>
                    <th className="py-2.5 px-3">SECURITY CLEARANCE</th>
                    <th className="py-2.5 px-3">MFA STATUS</th>
                    <th className="py-2.5 px-3">STATUS AKSES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {usersList.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-950">
                      <td className="py-2.5 px-3 font-bold text-slate-200">{u.name}</td>
                      <td className="py-2.5 px-3 text-amber-400">{u.role}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800 text-[10px]">
                          {u.clearance}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400">{u.mfa}</td>
                      <td className="py-2.5 px-3 text-slate-300">{u.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
            <h2 className="text-sm font-bold text-slate-100 uppercase font-mono border-b border-slate-800 pb-2">
              Security Audit Trail & Login History
            </h2>
            <div className="space-y-2 text-xs font-mono">
              {auditLogs.map((log, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{log.time}</span>
                    <span className="text-amber-400 font-bold">{log.user}:</span>
                    <span className="text-slate-200">{log.action}</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">{log.ip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3 text-xs font-mono">
            <h2 className="text-sm font-bold text-slate-100 uppercase border-b border-slate-800 pb-2">
              Kesehatan Server & Database Status
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Server Health Uptime:</span>
                <span className="text-emerald-400 font-bold">{mockSystemStatus.serverHealth}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Database Latency:</span>
                <span className="text-blue-400 font-bold">{mockSystemStatus.databaseLatency}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Alokasi Storage:</span>
                <span className="text-slate-200">{mockSystemStatus.storageUsage}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Backup Terakhir:</span>
                <span className="text-slate-300">{mockSystemStatus.lastBackupTime}</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3 text-xs font-mono">
            <h2 className="text-sm font-bold text-slate-100 uppercase border-b border-slate-800 pb-2">
              Release Notes COMMAND360 v3.6 EX
            </h2>
            <p className="text-slate-300">
              • Pembaruan Gemini 3.6 Flash Server Engine untuk COMMAND AI.<br />
              • Integrasi Peta Taktis WGS84 dengan Layer Hotspot Karhutla.<br />
              • Penambahan Sistem Notifikasi Tiering Kritis Pimpinan.<br />
              • Dukungan Eksport Laporan Empat Staf Terpadu.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
