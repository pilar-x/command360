import React, { useState } from 'react';
import { GeneratedDocument, DocComment, DocVersion } from '../../types';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  MessageSquare, 
  History, 
  Wand2, 
  RefreshCw, 
  Check, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface AiAssistantPanelProps {
  doc: GeneratedDocument;
  onUpdateDoc: (updated: GeneratedDocument) => void;
  onRunAiAction: (actionType: string) => void;
}

export const AiAssistantPanel: React.FC<AiAssistantPanelProps> = ({
  doc,
  onUpdateDoc,
  onRunAiAction
}) => {
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'FACTS' | 'COMMENTS' | 'VERSIONS'>('COMMAND');
  const [promptText, setPromptText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    setIsAiLoading(true);

    setTimeout(() => {
      // Simulate AI transformation based on user instruction
      const nowStr = new Date().toLocaleString('id-ID');
      const updatedDoc: GeneratedDocument = {
        ...doc,
        uraianContent: `${doc.uraianContent}\n\n[REVISI AI: ${promptText.toUpperCase()}]\nSemua jajaran diperintahkan untuk menindaklanjuti dengan disiplin tinggi dan pelaporan berkala.`,
        updatedAt: nowStr,
        versions: [
          {
            version: doc.versions.length + 1,
            editedBy: 'COMMAND360 AI Assistant',
            role: 'AI Editor',
            timestamp: nowStr,
            summary: `AI Revision: ${promptText}`,
            content: doc.uraianContent
          },
          ...doc.versions
        ],
        auditTrail: [
          ...doc.auditTrail,
          { timestamp: nowStr, user: 'User via AI', action: `Meminta AI: "${promptText}"` }
        ]
      };
      onUpdateDoc(updatedDoc);
      setPromptText('');
      setIsAiLoading(false);
    }, 1200);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const commentObj: DocComment = {
      id: `CMT-${Date.now()}`,
      user: 'Operator Current User',
      role: 'Reviewer',
      timestamp: new Date().toLocaleString('id-ID'),
      comment: newComment,
      resolved: false
    };
    onUpdateDoc({
      ...doc,
      comments: [commentObj, ...doc.comments]
    });
    setNewComment('');
  };

  const handleToggleCommentResolve = (commentId: string) => {
    const updated = doc.comments.map(c => 
      c.id === commentId ? { ...c, resolved: !c.resolved } : c
    );
    onUpdateDoc({ ...doc, comments: updated });
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-4 font-mono text-xs flex flex-col h-full">
      
      {/* Panel Top Header */}
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/30 rounded text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 uppercase tracking-wide">COMMAND360 AI EDITOR</h3>
            <p className="text-[10px] text-slate-400">Asisten Pembantu Penyusunan Dokumen Resmi</p>
          </div>
        </div>
        <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px]">
          INTERACTIVE AI
        </span>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 gap-1 pb-1">
        <button
          onClick={() => setActiveTab('COMMAND')}
          className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'COMMAND' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>AI TOOLBAR</span>
        </button>

        <button
          onClick={() => setActiveTab('FACTS')}
          className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'FACTS' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>FACT CHECK</span>
        </button>

        <button
          onClick={() => setActiveTab('COMMENTS')}
          className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors flex items-center gap-1.5 relative ${
            activeTab === 'COMMENTS' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>KOMENTAR</span>
          {doc.comments.filter(c => !c.resolved).length > 0 && (
            <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
              {doc.comments.filter(c => !c.resolved).length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('VERSIONS')}
          className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'VERSIONS' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>VERSI ({doc.versions.length})</span>
        </button>
      </div>

      {/* TAB 1: AI TOOLBAR & COMMAND BOX */}
      {activeTab === 'COMMAND' && (
        <div className="space-y-4 flex-1 flex flex-col justify-between">
          
          {/* Quick AI Refinement Actions */}
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              QUICK REFINEMENT ACTIONS
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onRunAiAction('PERBAIKI_BAHASA')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-200 text-left hover:border-amber-500 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>PERBAIKI BAHASA</span>
              </button>

              <button
                onClick={() => onRunAiAction('FORMALKAN')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-200 text-left hover:border-amber-500 transition-colors flex items-center gap-2"
              >
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>FORMALKAN MILITER</span>
              </button>

              <button
                onClick={() => onRunAiAction('RINGKASKAN')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-200 text-left hover:border-amber-500 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                <span>RINGKASKAN</span>
              </button>

              <button
                onClick={() => onRunAiAction('PERJELAS')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-200 text-left hover:border-amber-500 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>PERJELAS URAIAN</span>
              </button>

              <button
                onClick={() => onRunAiAction('PERBAIKI_EYD')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-200 text-left hover:border-amber-500 transition-colors flex items-center gap-2"
              >
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                <span>PERBAIKI EYD / EBI</span>
              </button>

              <button
                onClick={() => onRunAiAction('CEK_DATA')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-slate-200 text-left hover:border-amber-500 transition-colors flex items-center gap-2"
              >
                <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>CEK DATA KOSONG</span>
              </button>
            </div>
          </div>

          {/* Smart Data Check Warning */}
          {doc.missingFields && doc.missingFields.length > 0 && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 text-red-400 font-bold uppercase text-[11px]">
                <AlertTriangle className="w-4 h-4" />
                <span>MISSING DATA DETECTED ({doc.missingFields.length})</span>
              </div>
              <ul className="list-disc pl-4 text-red-300 text-[10px] space-y-0.5">
                {doc.missingFields.map((field, idx) => (
                  <li key={idx}>Field &quot;{field}&quot; belum diisi atau masih menggunakan placeholder.</li>
                ))}
              </ul>
            </div>
          )}

          {/* ASK COMMAND360 AI Box */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ASK COMMAND360 AI COMMAND BOX</span>
            </label>
            <form onSubmit={handleCommandSubmit} className="space-y-2">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder='Perintahkan AI, contoh: "Perbaiki paragraf kedua agar lebih formal", "Ringkas bagian latar belakang", "Tambahkan penekanan ketahanan pangan"...'
                rows={4}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-xs"
              />
              <button
                type="submit"
                disabled={isAiLoading || !promptText.trim()}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-extrabold rounded flex items-center justify-center gap-2 transition-colors uppercase text-xs"
              >
                {isAiLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>COMMAND360 AI SEDANG MENYUSUN...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>KIRIM PERINTAH KE AI</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 2: FACT CHECK & ACCURACY AUDIT */}
      {activeTab === 'FACTS' && (
        <div className="space-y-4 flex-1">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-2">
            <h4 className="font-bold text-slate-200 uppercase text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ATURAN KEBENARAN FAKTA MILITER (AI SAFETY)</span>
            </h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              AI Document Generator dilarang keras mengarang dasar hukum, nomor surat, nama pejabat, pangkat/NRP, tanggal, satuan, atau angka hasil kegiatan yang tidak diverifikasi.
            </p>
          </div>

          {/* Facts Categories */}
          <div className="space-y-3">
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded space-y-1">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>🟢 VERIFIED DATA ({doc.factVerification.verifiedFacts.length})</span>
              </div>
              <ul className="list-disc pl-4 text-emerald-300 text-[10px] space-y-1">
                {doc.factVerification.verifiedFacts.map((fact, idx) => (
                  <li key={idx}>{fact}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded space-y-1">
              <div className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>🟡 USER INPUT (UNVERIFIED) ({doc.factVerification.userInputFacts.length})</span>
              </div>
              <ul className="list-disc pl-4 text-amber-300 text-[10px] space-y-1">
                {doc.factVerification.userInputFacts.map((fact, idx) => (
                  <li key={idx}>{fact}</li>
                ))}
              </ul>
            </div>

            {doc.factVerification.missingFacts.length > 0 && (
              <div className="p-3 bg-red-950/30 border border-red-800/40 rounded space-y-1">
                <div className="font-bold text-red-400 flex items-center gap-1.5 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>🔴 MISSING DATA ({doc.factVerification.missingFacts.length})</span>
                </div>
                <ul className="list-disc pl-4 text-red-300 text-[10px] space-y-1">
                  {doc.factVerification.missingFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: COMMENTS & REVISION SYSTEM */}
      {activeTab === 'COMMENTS' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2 overflow-y-auto max-h-64 pr-1">
            {doc.comments.length === 0 ? (
              <div className="p-4 bg-slate-950 rounded border border-slate-800 text-center text-slate-500">
                Belum ada komentar atau revisi pada dokumen ini.
              </div>
            ) : (
              doc.comments.map((cmt) => (
                <div key={cmt.id} className={`p-3 rounded border font-mono ${cmt.resolved ? 'bg-slate-950/50 border-slate-800 text-slate-500' : 'bg-slate-950 border-amber-500/40 text-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">{cmt.user} ({cmt.role})</span>
                    <span className="text-[10px] text-slate-500">{cmt.timestamp}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed">{cmt.comment}</p>
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => handleToggleCommentResolve(cmt.id)}
                      className="px-2 py-0.5 text-[9px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                    >
                      {cmt.resolved ? 'Selesai' : 'Tandai Resolved'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddComment} className="space-y-2 border-t border-slate-800 pt-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tambahkan komentar atau masukan revisi..."
              rows={2}
              className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-xs"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-bold rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>TAMBAH KOMENTAR REVISI</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: VERSION HISTORY */}
      {activeTab === 'VERSIONS' && (
        <div className="space-y-3 flex-1 overflow-y-auto max-h-80">
          {doc.versions.map((ver) => (
            <div key={ver.version} className="p-3 bg-slate-950 border border-slate-800 rounded space-y-1 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="font-extrabold text-amber-400">VERSI {ver.version}</span>
                <span className="text-[10px] text-slate-500">{ver.timestamp}</span>
              </div>
              <div className="text-slate-300 font-bold">{ver.summary}</div>
              <div className="text-[10px] text-slate-500">Oleh: {ver.editedBy} ({ver.role})</div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
