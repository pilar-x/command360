import React, { useState } from 'react';
import { 
  GeneratedDocument, 
  DocCategoryGroup, 
  DocStaffDomain, 
  DocumentTemplate,
  DocWorkflowStage 
} from '../../types';
import { 
  ALL_DOCUMENT_TYPES, 
  INITIAL_GENERATED_DOCUMENTS, 
  MOCK_TEMPLATES, 
  DocumentTypeInfo 
} from '../../data/mockDocumentData';
import { DocumentWizard } from '../documents/DocumentWizard';
import { TemplateLibraryView } from '../documents/TemplateLibraryView';
import { DocumentLibraryView } from '../documents/DocumentLibraryView';
import { 
  Sparkles, 
  Plus, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Star, 
  History, 
  Wand2, 
  Layers, 
  Send, 
  Zap, 
  Calendar, 
  FolderGit2, 
  ArrowRight,
  Shield,
  FileCheck,
  Building,
  Users,
  Crosshair,
  Truck,
  Sprout,
  BarChart3
} from 'lucide-react';

interface GeneratedSuratViewProps {
  activeSubmenu?: string;
  userRole?: string;
}

export const GeneratedSuratView: React.FC<GeneratedSuratViewProps> = ({
  activeSubmenu = 'overview',
  userRole = 'Panglima / Komandan'
}) => {
  const [currentViewMode, setCurrentViewMode] = useState<string>('OVERVIEW'); // 'OVERVIEW', 'WIZARD', 'TEMPLATES', 'LIBRARY'
  const [selectedDocTypeForWizard, setSelectedDocTypeForWizard] = useState<string>('Surat Perintah');
  
  // State for all generated documents in system
  const [documents, setDocuments] = useState<GeneratedDocument[]>(INITIAL_GENERATED_DOCUMENTS);

  // Active Staff Domain Filter ("Produk Staf per Staf")
  const [activeStaffDomain, setActiveStaffDomain] = useState<DocStaffDomain>('ALL');

  // Search query for document categories
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Quick Generate prompt
  const [quickPrompt, setQuickPrompt] = useState('');

  // Currently editing/reviewing document
  const [activeDocumentForEdit, setActiveDocumentForEdit] = useState<GeneratedDocument | null>(null);

  // KPI Metrics Calculation
  const countDraft = documents.filter(d => d.workflowStage === 'DRAFT').length;
  const countReview = documents.filter(d => d.workflowStage === 'REVIEW' || d.workflowStage === 'REVISION').length;
  const countVerified = documents.filter(d => d.workflowStage === 'VERIFIED').length;
  const countApproved = documents.filter(d => d.workflowStage === 'APPROVED' || d.workflowStage === 'FINAL').length;
  const countThisMonth = documents.length;

  // Filter Document Types based on Staff Domain and Search Query
  const filteredDocTypes = ALL_DOCUMENT_TYPES.filter(typeItem => {
    const matchesDomain = activeStaffDomain === 'ALL' || typeItem.defaultStaffDomain === activeStaffDomain;
    const matchesSearch = typeItem.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
                          typeItem.description.toLowerCase().includes(categorySearchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  // Favorites & Recently Used Document Types
  const favoriteDocTypes = ALL_DOCUMENT_TYPES.filter(t => t.isFavorite);
  const recentDocs = documents.slice(0, 5);

  const handleStartCreateWizard = (typeName: string = 'Surat Perintah') => {
    setSelectedDocTypeForWizard(typeName);
    setActiveDocumentForEdit(null);
    setCurrentViewMode('WIZARD');
  };

  const handleFinishWizard = (newDoc: GeneratedDocument) => {
    setDocuments(prev => [newDoc, ...prev]);
    setCurrentViewMode('LIBRARY');
  };

  const handleQuickGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    // Pre-select Laporan Kegiatan or Surat Perintah based on prompt
    if (quickPrompt.toLowerCase().includes('laporan')) {
      setSelectedDocTypeForWizard('Laporan Kegiatan');
    } else {
      setSelectedDocTypeForWizard('Surat Perintah');
    }
    setCurrentViewMode('WIZARD');
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* 1. PAGE HEADER BANNER */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI DOCUMENT CENTER • COMMAND360 KODAM XX/TIB</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100 uppercase tracking-wide">
            GENERATED SURAT & PRODUK STAF
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Pembuatan draft dokumen berbasis template dan AI untuk mendukung kegiatan staf secara cepat, terstruktur, dan terdokumentasi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleStartCreateWizard('Surat Perintah')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg flex items-center gap-2 transition-colors uppercase shadow-lg shadow-amber-500/10"
          >
            <Plus className="w-4 h-4" />
            <span>+ BUAT DOKUMEN</span>
          </button>
        </div>
      </div>

      {/* 2. TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">DRAFT</span>
          <div className="text-xl font-extrabold text-slate-100">{countDraft}</div>
          <span className="text-[10px] text-slate-500 block">Draft Belum Diselesaikan</span>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">MENUNGGU VERIFIKASI</span>
          <div className="text-xl font-extrabold text-blue-400">{countReview}</div>
          <span className="text-[10px] text-slate-500 block">Dalam Tahap Review</span>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">VERIFIED STAF</span>
          <div className="text-xl font-extrabold text-purple-400">{countVerified}</div>
          <span className="text-[10px] text-slate-500 block">Telah Diverifikasi Staf</span>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">DISETUJUI (APPROVED)</span>
          <div className="text-xl font-extrabold text-emerald-400">{countApproved}</div>
          <span className="text-[10px] text-slate-500 block">Disahkan Komandan</span>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">DOKUMEN BULAN INI</span>
          <div className="text-xl font-extrabold text-amber-400">{countThisMonth}</div>
          <span className="text-[10px] text-slate-500 block">Total Dibuat Bulan Ini</span>
        </div>
      </div>

      {/* SUBMENU NAVIGATION BAR */}
      <div className="flex border-b border-slate-800 overflow-x-auto gap-2 pb-2">
        {[
          { id: 'OVERVIEW', label: 'Overview' },
          { id: 'WIZARD', label: '+ Buat Dokumen' },
          { id: 'TEMPLATES', label: 'Template Library' },
          { id: 'LIBRARY', label: 'Document Library' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentViewMode(tab.id)}
            className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors whitespace-nowrap ${
              currentViewMode === tab.id
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-slate-100 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VIEW MODE 1: OVERVIEW & GENERATOR CATEGORIES */}
      {currentViewMode === 'OVERVIEW' && (
        <div className="space-y-6">
          
          {/* QUICK GENERATE WIDGET */}
          <div className="p-5 bg-slate-900 rounded-xl border border-amber-500/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>QUICK GENERATE WITH NATURAL LANGUAGE</span>
            </div>

            <form onSubmit={handleQuickGenerateSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={quickPrompt}
                onChange={(e) => setQuickPrompt(e.target.value)}
                placeholder='Ketik instruksi singkat, contoh: "Buat laporan kegiatan Briefing Staf tanggal 30 Juli 2026 berdasarkan data kegiatan yang tersedia"...'
                className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg flex items-center justify-center gap-2 uppercase text-xs transition-colors shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>QUICK GENERATE</span>
              </button>
            </form>
          </div>

          {/* PRODUK STAF PER STAF (STAFF DOMAIN SWITCHER) */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 uppercase text-xs flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>PRODUK STAF PER STAF (SMART DOMAIN FILTER)</span>
              </span>
              <span className="text-[10px] text-slate-500">Pilih staf untuk memfilter jenis produk yang relevan</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'ALL', label: 'SEMUA STAF (ALL)', icon: Layers },
                { id: 'OPERASI', label: 'OPERASI', icon: Crosshair },
                { id: 'INTELIJEN', label: 'INTELIJEN', icon: Shield },
                { id: 'PERSONEL', label: 'PERSONEL', icon: Users },
                { id: 'LOGISTIK', label: 'LOGISTIK', icon: Truck },
                { id: 'TERITORIAL', label: 'TERITORIAL', icon: Sprout },
                { id: 'PERENCANAAN', label: 'PERENCANAAN', icon: BarChart3 },
              ].map((staf) => (
                <button
                  key={staf.id}
                  onClick={() => setActiveStaffDomain(staf.id as DocStaffDomain)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 border ${
                    activeStaffDomain === staf.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <staf.icon className="w-3.5 h-3.5" />
                  <span>{staf.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH & FAVORITES BAR */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={categorySearchQuery}
                onChange={(e) => setCategorySearchQuery(e.target.value)}
                placeholder="Cari jenis surat atau produk staf... (Contoh: Surat Perintah, Lapsit, Telaahan Staf, SOP, Pointer)"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-xs"
              />
            </div>

            {/* FAVORITES CAROUSEL */}
            <div className="space-y-2">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>FAVORITES (DOKUMEN SERING DIGUNAKAN)</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {favoriteDocTypes.map((fav) => (
                  <button
                    key={fav.id}
                    onClick={() => handleStartCreateWizard(fav.name)}
                    className="p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-lg text-left transition-colors font-mono space-y-1"
                  >
                    <span className="font-bold text-slate-100 text-[11px] block truncate">{fav.name}</span>
                    <span className="text-[9px] text-slate-500 block">[{fav.categoryGroup}]</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4 MAIN CATEGORIES GRID */}
          <div className="space-y-6">
            
            {/* CATEGORY A: SURAT */}
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-sm uppercase tracking-wide text-amber-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>A. SURAT & NOTA DINAS ({filteredDocTypes.filter(t => t.categoryGroup === 'SURAT').length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDocTypes.filter(t => t.categoryGroup === 'SURAT').map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleStartCreateWizard(item.name)}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-lg cursor-pointer transition-colors space-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-100 text-xs">{item.name}</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px]">{item.defaultStaffDomain}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-2 text-right">
                      <span className="text-[10px] text-amber-400 font-bold uppercase hover:underline inline-flex items-center gap-1">
                        Buat Draft <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY B: LAPORAN */}
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-sm uppercase tracking-wide text-blue-400 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-400" />
                  <span>B. LAPORAN & EXECUTIVE SUMMARY ({filteredDocTypes.filter(t => t.categoryGroup === 'LAPORAN').length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDocTypes.filter(t => t.categoryGroup === 'LAPORAN').map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleStartCreateWizard(item.name)}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 rounded-lg cursor-pointer transition-colors space-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-100 text-xs">{item.name}</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px]">{item.defaultStaffDomain}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-2 text-right">
                      <span className="text-[10px] text-blue-400 font-bold uppercase hover:underline inline-flex items-center gap-1">
                        Buat Draft <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY C: PRODUK STAF */}
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-sm uppercase tracking-wide text-purple-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>C. PRODUK STAF & REN OPS/LAT ({filteredDocTypes.filter(t => t.categoryGroup === 'PRODUK_STAF').length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDocTypes.filter(t => t.categoryGroup === 'PRODUK_STAF').map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleStartCreateWizard(item.name)}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 rounded-lg cursor-pointer transition-colors space-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-100 text-xs">{item.name}</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px]">{item.defaultStaffDomain}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-2 text-right">
                      <span className="text-[10px] text-purple-400 font-bold uppercase hover:underline inline-flex items-center gap-1">
                        Buat Draft <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY D: RAPAT & KEGIATAN */}
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <h3 className="font-extrabold text-slate-100 text-sm uppercase tracking-wide text-emerald-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>D. RAPAT & KEGIATAN ({filteredDocTypes.filter(t => t.categoryGroup === 'RAPAT_KEGIATAN').length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDocTypes.filter(t => t.categoryGroup === 'RAPAT_KEGIATAN').map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleStartCreateWizard(item.name)}
                    className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-lg cursor-pointer transition-colors space-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-100 text-xs">{item.name}</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px]">{item.defaultStaffDomain}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-2 text-right">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase hover:underline inline-flex items-center gap-1">
                        Buat Draft <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RECENT DOCUMENTS BOARD */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-100 uppercase text-xs flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <span>RECENT DOCUMENTS (10 DOKUMEN TERAKHIR)</span>
            </h3>

            <div className="space-y-2">
              {recentDocs.map((doc) => (
                <div key={doc.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-100">{doc.title}</span>
                    <div className="text-[10px] text-slate-500 flex gap-3">
                      <span>Nomor: {doc.documentNumber}</span>
                      <span>Tanggal: {doc.date}</span>
                      <span>Oleh: {doc.createdBy}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-bold">
                    {doc.workflowStage}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW MODE 2: DOCUMENT WIZARD */}
      {currentViewMode === 'WIZARD' && (
        <DocumentWizard
          initialDocType={selectedDocTypeForWizard}
          onFinishDocument={handleFinishWizard}
          onCancel={() => setCurrentViewMode('OVERVIEW')}
          userRole={userRole}
        />
      )}

      {/* VIEW MODE 3: TEMPLATE LIBRARY */}
      {currentViewMode === 'TEMPLATES' && (
        <TemplateLibraryView
          onSelectTemplateToGenerate={(tmpl) => {
            setSelectedDocTypeForWizard(tmpl.name);
            setCurrentViewMode('WIZARD');
          }}
        />
      )}

      {/* VIEW MODE 4: DOCUMENT LIBRARY */}
      {currentViewMode === 'LIBRARY' && (
        <DocumentLibraryView
          documents={documents}
          onOpenDocumentDetails={(doc) => {
            setActiveDocumentForEdit(doc);
            setCurrentViewMode('WIZARD');
          }}
          onDuplicateDocument={(doc) => {
            const dup: GeneratedDocument = {
              ...doc,
              id: `DOC-2026-${Math.floor(100 + Math.random() * 900)}`,
              documentNumber: `${doc.documentNumber} (Salinan)`,
              workflowStage: 'DRAFT',
              createdAt: new Date().toLocaleString('id-ID')
            };
            setDocuments(prev => [dup, ...prev]);
          }}
        />
      )}

    </div>
  );
};
