import React, { useState } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Send, 
  Eye, 
  FileText, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Filter, 
  Lock, 
  MapPin, 
  ChevronRight, 
  X, 
  History,
  MessageSquare,
  Sparkles,
  Layers,
  Building,
  UserCheck
} from 'lucide-react';
import { StaffDataRecord, WorkflowStatus, StaffCategory, UserRole } from '../../types';

interface VerificationCenterViewProps {
  records: StaffDataRecord[];
  onUpdateRecordStatus: (recordId: string, newStatus: WorkflowStatus, note?: string) => void;
  userRole: UserRole;
}

export const VerificationCenterView: React.FC<VerificationCenterViewProps> = ({
  records,
  onUpdateRecordStatus,
  userRole
}) => {
  const [activeTab, setActiveTab] = useState<WorkflowStatus | 'ALL'>('SUBMITTED');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<StaffCategory | 'ALL'>('ALL');

  // Selected Record for Detail Modal or Return Modal
  const [selectedRecord, setSelectedRecord] = useState<StaffDataRecord | null>(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [revisionNote, setRevisionNote] = useState('');

  // Filter records
  const filteredRecords = records.filter(rec => {
    if (activeTab !== 'ALL' && rec.workflowStatus !== activeTab) return false;
    if (categoryFilter !== 'ALL' && rec.staffCategory !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rec.title.toLowerCase().includes(q) ||
        rec.locationName.toLowerCase().includes(q) ||
        rec.submittedBy.toLowerCase().includes(q) ||
        rec.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReturnSubmit = () => {
    if (!selectedRecord) return;
    if (!revisionNote.trim()) {
      alert('Mohon masukkan Catatan Revisi untuk Operator.');
      return;
    }
    onUpdateRecordStatus(selectedRecord.id, 'RETURNED', revisionNote);
    setIsReturnModalOpen(false);
    setSelectedRecord(null);
    setRevisionNote('');
  };

  const getWorkflowBadge = (status: WorkflowStatus) => {
    switch (status) {
      case 'DRAFT':
        return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">DRAFT</span>;
      case 'SUBMITTED':
        return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-950 text-amber-300 border border-amber-800 animate-pulse">PENDING VERIFICATION</span>;
      case 'RETURNED':
        return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-red-950 text-red-300 border border-red-800">RETURNED FOR REVISION</span>;
      case 'VERIFIED':
        return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-950 text-blue-300 border border-blue-800">VERIFIED</span>;
      case 'PUBLISHED':
        return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-300 border border-emerald-800">PUBLISHED LIVE</span>;
      case 'ARCHIVED':
        return <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800">ARCHIVED</span>;
    }
  };

  const getStaffBadge = (cat: StaffCategory) => {
    switch (cat) {
      case 'INTELIJEN':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">INTELIJEN</span>;
      case 'OPERASI':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">OPERASI</span>;
      case 'PERSONEL':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">PERSONEL</span>;
      case 'LOGISTIK':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">LOGISTIK</span>;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* View Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800 shadow">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h1 className="text-sm sm:text-base font-extrabold text-slate-100 uppercase tracking-wide">
              DATA VERIFICATION & PUBLICATION CENTER
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              ROLE: {userRole}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Mekanisme validasi bertingkat sebelum data diterbitkan ke Executive Command Center & Command Map.
          </p>
        </div>

        {/* Status Pipeline Statistics */}
        <div className="flex items-center gap-2 font-mono text-[11px] overflow-x-auto pb-1 sm:pb-0">
          <div className="px-2.5 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-800 text-center">
            <span className="block text-[9px] text-amber-400 font-sans">SUBMITTED</span>
            <span className="font-bold">{records.filter(r => r.workflowStatus === 'SUBMITTED').length}</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-red-950/60 text-red-300 border border-red-800 text-center">
            <span className="block text-[9px] text-red-400 font-sans">RETURNED</span>
            <span className="font-bold">{records.filter(r => r.workflowStatus === 'RETURNED').length}</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-blue-950/60 text-blue-300 border border-blue-800 text-center">
            <span className="block text-[9px] text-blue-400 font-sans">VERIFIED</span>
            <span className="font-bold">{records.filter(r => r.workflowStatus === 'VERIFIED').length}</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-center">
            <span className="block text-[9px] text-emerald-400 font-sans">PUBLISHED</span>
            <span className="font-bold">{records.filter(r => r.workflowStatus === 'PUBLISHED').length}</span>
          </div>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-3">
        
        {/* Workflow Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-slate-800">
          <button
            onClick={() => setActiveTab('SUBMITTED')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'SUBMITTED' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>MENUNGGU VERIFIKASI</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-950/50 font-mono">
              {records.filter(r => r.workflowStatus === 'SUBMITTED').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('RETURNED')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'RETURNED' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>PERLU REVISI</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-950/50 font-mono">
              {records.filter(r => r.workflowStatus === 'RETURNED').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('VERIFIED')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'VERIFIED' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>TERVERIFIKASI</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-950/50 font-mono">
              {records.filter(r => r.workflowStatus === 'VERIFIED').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('PUBLISHED')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
              activeTab === 'PUBLISHED' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>DITERBITKAN (LIVE MAP)</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-950/50 font-mono">
              {records.filter(r => r.workflowStatus === 'PUBLISHED').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors shrink-0 ${
              activeTab === 'ALL' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>SEMUA RECORD ({records.length})</span>
          </button>
        </div>

        {/* Search Input & Staff Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan judul record, lokasi, atau pembuat..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs font-mono focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">SEMUA STAF</option>
              <option value="INTELIJEN">INTELIJEN</option>
              <option value="OPERASI">OPERASI</option>
              <option value="PERSONEL">PERSONEL</option>
              <option value="LOGISTIK">LOGISTIK</option>
            </select>
          </div>
        </div>

      </div>

      {/* Record Cards List */}
      {filteredRecords.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">Tidak Ada Record Dalam Kategori Ini</h3>
          <p className="text-xs text-slate-500">
            Seluruh data staf yang diajukan sudah diproses atau belum tersedia.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all space-y-3 text-xs shadow-md"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-amber-400 font-bold">{rec.id}</span>
                  {getStaffBadge(rec.staffCategory)}
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px] border border-slate-800">
                    {rec.subCategory}
                  </span>
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    rec.priority === 'KRITIS' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {rec.priority}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 font-mono text-[10px] border border-amber-800/60">
                    🔒 {rec.classification}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {getWorkflowBadge(rec.workflowStatus)}
                </div>
              </div>

              {/* Body Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-3 space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-100">{rec.title}</h3>
                  <p className="text-slate-300 line-clamp-2 leading-relaxed">{rec.description}</p>
                  
                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{rec.locationName} ({rec.region})</span>
                    </span>
                    {rec.lat && rec.lng && (
                      <span className="text-slate-500">
                        [{rec.lat}, {rec.lng}]
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Submitted: {rec.submittedAt}</span>
                    </span>
                  </div>
                </div>

                {/* Submitter Info Box */}
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1 text-[11px] font-mono">
                  <span className="text-slate-500 text-[10px] block">OPERATOR DIAJUKAN</span>
                  <span className="text-slate-200 font-semibold block truncate">{rec.submittedBy}</span>
                  {rec.unitName && (
                    <span className="text-slate-400 text-[10px] block">Unit: {rec.unitName}</span>
                  )}
                  {rec.revisionNote && (
                    <div className="mt-1 pt-1 border-t border-slate-900 text-red-400 text-[10px]">
                      ⚠️ Note: {rec.revisionNote}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setSelectedRecord(rec)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>LIHAT DETAIL & AUDIT TRAIL</span>
                </button>

                <div className="flex items-center gap-2">
                  {/* RETURN BUTTON */}
                  {(rec.workflowStatus === 'SUBMITTED' || rec.workflowStatus === 'VERIFIED') && (
                    <button
                      onClick={() => {
                        setSelectedRecord(rec);
                        setIsReturnModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>KEMBALIKAN (RETURN)</span>
                    </button>
                  )}

                  {/* VERIFY BUTTON */}
                  {rec.workflowStatus === 'SUBMITTED' && (
                    <button
                      onClick={() => onUpdateRecordStatus(rec.id, 'VERIFIED')}
                      className="px-3 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800 text-xs font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>VERIFIKASI DATA</span>
                    </button>
                  )}

                  {/* PUBLISH BUTTON */}
                  {(rec.workflowStatus === 'VERIFIED' || rec.workflowStatus === 'SUBMITTED') && (
                    <button
                      onClick={() => onUpdateRecordStatus(rec.id, 'PUBLISHED')}
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>TERBITKAN KE COMMAND MAP</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* DETAIL & AUDIT TRAIL MODAL */}
      {selectedRecord && !isReturnModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto text-xs">
            
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="font-extrabold text-slate-100 uppercase tracking-wide">
                  RECORD INSPECTOR & AUDIT TRAIL • {selectedRecord.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-100">{selectedRecord.title}</h2>
                  {getWorkflowBadge(selectedRecord.workflowStatus)}
                </div>
                <p className="text-slate-300">{selectedRecord.description}</p>
                <div className="text-[11px] font-mono text-slate-400 flex flex-wrap gap-4 pt-1 border-t border-slate-900">
                  <span>STAF: {selectedRecord.staffCategory}</span>
                  <span>WILAYAH: {selectedRecord.region}</span>
                  <span>KOORDINAT: {selectedRecord.lat}, {selectedRecord.lng}</span>
                  <span>KLASIFIKASI: {selectedRecord.classification}</span>
                </div>
              </div>

              {/* Audit Trail History */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-200 uppercase tracking-wider">
                  <History className="w-4 h-4 text-amber-400" />
                  <span>RIWAYAT AUDIT TRAIL (IMMUTABLE LOG)</span>
                </div>

                <div className="space-y-2 pl-2 border-l-2 border-amber-500/40">
                  {selectedRecord.auditTrail.map((log, i) => (
                    <div key={i} className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-amber-400 font-bold">
                        <span>{log.action}</span>
                        <span className="text-slate-500">{log.timestamp}</span>
                      </div>
                      <div className="text-slate-300">Oleh: {log.user}</div>
                      {log.note && <div className="text-slate-400 text-[10px]">Catatan: {log.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REVISION NOTE RETURN MODAL */}
      {isReturnModalOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-4 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-red-400" />
                <h3 className="font-bold text-slate-100 uppercase">KEMBALIKAN RECORD UNTUK REVISI</h3>
              </div>
              <button onClick={() => setIsReturnModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-slate-300">
                Data akan dikembalikan ke Operator <span className="font-bold text-amber-400">{selectedRecord.submittedBy}</span> dengan status <span className="font-bold text-red-400">RETURNED</span>.
              </p>
              <label className="text-slate-200 font-bold block">CATATAN REVISI (WAJIB) *</label>
              <textarea
                rows={3}
                value={revisionNote}
                onChange={(e) => setRevisionNote(e.target.value)}
                placeholder="Jelaskan bagian data yang perlu diperbaiki atau dokumen yang kurang..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsReturnModalOpen(false)}
                className="px-3 py-2 bg-slate-800 text-slate-300 rounded-lg font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleReturnSubmit}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow"
              >
                <RotateCcw className="w-4 h-4" />
                <span>KIRIM REVISI KE OPERATOR</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
