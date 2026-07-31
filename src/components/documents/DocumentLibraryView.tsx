import React, { useState } from 'react';
import { GeneratedDocument, DocWorkflowStage, DocClassification } from '../../types';
import { A4DocumentPreview } from './A4DocumentPreview';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Printer, 
  Eye, 
  Copy, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  History,
  Trash2
} from 'lucide-react';

interface DocumentLibraryViewProps {
  documents: GeneratedDocument[];
  onOpenDocumentDetails: (doc: GeneratedDocument) => void;
  onDuplicateDocument: (doc: GeneratedDocument) => void;
}

export const DocumentLibraryView: React.FC<DocumentLibraryViewProps> = ({
  documents,
  onOpenDocumentDetails,
  onDuplicateDocument
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<GeneratedDocument | null>(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.docType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'ALL' || doc.workflowStage === selectedStage;
    const matchesGroup = selectedGroup === 'ALL' || doc.categoryGroup === selectedGroup;
    return matchesSearch && matchesStage && matchesGroup;
  });

  const getStageBadge = (stage: DocWorkflowStage) => {
    switch (stage) {
      case 'DRAFT': return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'REVIEW': return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'REVISION': return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'VERIFIED': return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'APPROVED': return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'FINAL': return 'bg-emerald-900 text-emerald-200 border-emerald-700 font-extrabold';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      
      {/* Search & Filter Header */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nomor, perihal, atau jenis dokumen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
          />
        </div>

        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 font-bold focus:outline-none text-xs"
        >
          <option value="ALL">SEMUA STATUS WORKFLOW (ALL)</option>
          <option value="DRAFT">DRAFT</option>
          <option value="REVIEW">MENUNGGU REVIEW</option>
          <option value="VERIFIED">VERIFIED</option>
          <option value="APPROVED">APPROVED</option>
          <option value="FINAL">FINAL</option>
        </select>

        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 font-bold focus:outline-none text-xs"
        >
          <option value="ALL">SEMUA KATEGORI (ALL)</option>
          <option value="SURAT">SURAT</option>
          <option value="LAPORAN">LAPORAN</option>
          <option value="PRODUK_STAF">PRODUK STAF</option>
          <option value="RAPAT_KEGIATAN">RAPAT & KEGIATAN</option>
        </select>
      </div>

      {/* Documents Table */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto space-y-3">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
              <th className="p-3">NOMOR & DOKUMEN</th>
              <th className="p-3 text-center">JENIS & STAF</th>
              <th className="p-3 text-center">TANGGAL</th>
              <th className="p-3 text-center">KLASIFIKASI</th>
              <th className="p-3 text-center">STATUS</th>
              <th className="p-3 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-950/60 transition-colors">
                <td className="p-3">
                  <div className="font-extrabold text-amber-400 text-xs">{doc.documentNumber}</div>
                  <div className="font-bold text-slate-100 mt-0.5">{doc.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Oleh: {doc.createdBy}</div>
                </td>

                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 bg-slate-950 text-slate-300 border border-slate-800 rounded text-[10px] font-bold">
                    {doc.docType} ({doc.staffDomain})
                  </span>
                </td>

                <td className="p-3 text-center text-slate-300 font-mono">
                  {doc.date}
                </td>

                <td className="p-3 text-center">
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-bold">
                    {doc.classification}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <span className={`px-2.5 py-1 rounded text-[10px] border font-bold ${getStageBadge(doc.workflowStage)}`}>
                    {doc.workflowStage}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenDocumentDetails(doc)}
                      className="p-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded font-bold text-[10px] flex items-center gap-1"
                      title="Buka Editor / Review"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>EDIT / REVIEW</span>
                    </button>

                    <button
                      onClick={() => setSelectedDocForPreview(doc)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                      title="Preview A4"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDuplicateDocument(doc)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px]"
                      title="Duplicate / Use as Template"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* A4 Preview Modal */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <span className="font-extrabold text-amber-400 text-sm uppercase">PREVIEW A4: {selectedDocForPreview.title}</span>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold"
              >
                Tutup
              </button>
            </div>

            <A4DocumentPreview doc={selectedDocForPreview} zoomLevel={85} showFactBadges={true} />
          </div>
        </div>
      )}

    </div>
  );
};
