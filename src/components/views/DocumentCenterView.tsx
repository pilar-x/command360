import React, { useState, useRef } from 'react';
import { 
  FolderGit2, 
  File, 
  Search, 
  History, 
  Lock, 
  Download,
  FolderPlus,
  CheckCircle2
} from 'lucide-react';
import { downloadReferenceDoc } from '../../utils/downloadUtils';

export const DocumentCenterView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [documentsList, setDocumentsList] = useState([
    { id: 'DOC-001', name: 'SOP Penanganan Karhutla & Sekat Bakar Sektor Barat.pdf', category: 'SOP', version: 'v2.4', date: '2026-07-15', clearance: 'RAHASIA' },
    { id: 'DOC-002', name: 'Pedoman Kesiapsiagaan Alutsista & Maintenance Ranmor.pdf', category: 'Pedoman', version: 'v1.2', date: '2026-06-20', clearance: 'TERBATAS' },
    { id: 'DOC-003', name: 'Surat Direktif Panglima Mengenai Pembinaan Personel Cyber.pdf', category: 'Surat Keluar', version: 'v1.0', date: '2026-07-28', clearance: 'SANGAT RAHASIA' },
    { id: 'DOC-004', name: 'Doktrin Latihan Posko I & Simulasi Pengambilan Keputusan.pdf', category: 'Doktrin', version: 'v3.0', date: '2026-05-10', clearance: 'BIASA' },
  ]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newDoc = {
        id: `DOC-00${documentsList.length + 1}`,
        name: file.name,
        category: 'Referensi Baru',
        version: 'v1.0',
        date: new Date().toISOString().split('T')[0],
        clearance: 'TERBATAS'
      };
      setDocumentsList(prev => [newDoc, ...prev]);
      showNotification(`File reference "${file.name}" berhasil diunggah ke Vault.`);
    }
  };

  const handleDownload = (doc: typeof documentsList[0]) => {
    downloadReferenceDoc(doc.name, doc.category, undefined, {
      id: doc.id,
      clearance: doc.clearance,
      version: doc.version,
      date: doc.date
    });
    showNotification(`Mengunduh file referensi: ${doc.name}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-mono text-xs rounded-lg flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.docx,.txt,.doc"
        className="hidden"
      />

      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Document Center • Strategic Document Vault</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            ARSIP DOKUMEN & PRODUK STAF
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Penyimpanan Dokumen Resmi, SOP, Pedoman, Peraturan, Surat Masuk/Keluar, dan Version History.
          </p>
        </div>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Unggah Dokumen Baru</span>
        </button>
      </div>

      {/* Document Search & List */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
          <input 
            type="text" 
            placeholder="Cari nama dokumen, SOP, atau direktif..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="space-y-2 font-mono text-xs">
          {documentsList.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map((doc) => (
            <div key={doc.id} className="p-3 bg-slate-950 rounded border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <File className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-200">{doc.name}</div>
                  <div className="text-[10px] text-slate-500 flex gap-3 mt-0.5">
                    <span>ID: {doc.id}</span>
                    <span>Versi: {doc.version}</span>
                    <span>Kategori: {doc.category}</span>
                    <span>Tanggal: {doc.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800 text-[10px]">
                  {doc.clearance}
                </span>
                <button 
                  onClick={() => handleDownload(doc)}
                  className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded font-extrabold flex items-center gap-1 transition-colors"
                  title="Unduh Referensi Dokumen"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>UNDUH</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
