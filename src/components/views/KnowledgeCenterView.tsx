import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bot, 
  Sparkles, 
  FileText,
  Download,
  Eye,
  CheckCircle2,
  X
} from 'lucide-react';
import { downloadReferenceDoc } from '../../utils/downloadUtils';

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  reads: string;
  content: string;
}

export const KnowledgeCenterView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const kbArticles: ArticleItem[] = [
    { 
      id: 'KB-001',
      title: 'Doktrin & Pedoman Penanggulangan Karhutla Sektor Hutan Lindung', 
      category: 'DOKTRIN', 
      reads: '1.4k',
      content: 'I. LATAR BELAKANG\nPencegahan dan penanggulangan kebakaran hutan dan lahan (Karhutla) di sektor hutan lindung memerlukan integrasi taktis antara tim patroli darat Babinsa, pemantauan udara drone, dan pembuatan sekat bakar secara masif.\n\nII. PROSEDUR UTAMA\n1. Pembentukan Posko Aju di tiap sub-sektor rawan.\n2. Patroli gabungan TNI, Polri, BPBD, dan Manggala Agni 24/7.\n3. Sekat bakar buatan minimal lebar 10-15 meter sepanjang batas rawan titik panas.\n4. Laporan situasi berkala tiap 6 jam via aplikasi Command360.'
    },
    { 
      id: 'KB-002',
      title: 'SOP Penanganan Unjuk Rasa di Sekitar Objek Vital Nasional (Obvitnas)', 
      category: 'SOP', 
      reads: '920',
      content: 'I. KETENTUAN UMUM\nPengamanan Objek Vital Nasional dilakukan dengan mengutamakan tindakan persuasif, humanis, dan terukur tanpa mengorbankan kewaspadaan keamanan.\n\nII. TAHAPAN TINDAKAN\n1. Tahap Persiapan: Apel kesiapan personel, pemeriksaan sarpras, peragaan komunikasi komando.\n2. Tahap Penanganan: Pengatapan barikade, negosiasi tim komsos, penyiapan tim cadangan taktis.\n3. Tahap Konsolidasi: Pembubaran terkontrol, pengecekan personel dan perlengkapan.'
    },
    { 
      id: 'KB-003',
      title: 'Petunjuk Teknis Pemeliharaan Periodik Ranmor Anoa 6x6 APC', 
      category: 'JUKNIS', 
      reads: '650',
      content: 'I. PERAWATAN HARIAN\n- Pengecekan oli mesin, air radiator, dan tekanan angin ban.\n- Pemeriksaan sistem pengereman pneumatik & alternator.\n\nII. PERAWATAN MINGGUAN\n- Pelumasan sistem kemudi 6x6 dan engsel pintu darurat.\n- Pengujian sistem komunikasi radio komando dan winch pemulih.'
    },
    { 
      id: 'KB-004',
      title: 'Lessons Learned: Penanganan Krisis Bencana Banjir & Mobilisasi Babinsa', 
      category: 'LESSONS LEARNED', 
      reads: '2.1k',
      content: 'I. RINGKASAN EVALUASI\nSinergi antara Koramil dan Babinsa di lapangan menjadi kunci utama kecepatan evakuasi warga saat banjir bandang.\n\nII. REKOMENDASI TAKTIS\n1. Pembentukan jaringan komunikasi darurat berbasis radio SSB.\n2. Alokasi perahu karet dan pelampung siap pakai di tiap Pos Ramil.'
    },
  ];

  const handleDownload = (art: ArticleItem) => {
    downloadReferenceDoc(art.title, art.category, art.content, { id: art.id });
    setToastMessage(`Mengunduh dokumen referensi: ${art.title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-mono text-xs rounded-lg flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Knowledge Center • Reference Brain of COMMAND360</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            PUSAT PENGETAHUAN & REFERENSI TAKTIS
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Doktrin, Peraturan, SOP, Juknis, Juklak, Best Practices, dan Pencarian Referensi Otomatis dengan AI.
          </p>
        </div>
      </div>

      {/* AI Knowledge Search */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold border-b border-slate-800 pb-2">
          <Sparkles className="w-4 h-4" />
          <span>AI KNOWLEDGE SEARCH ENGINE</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input 
            type="text" 
            placeholder="Ketik topik doktrin atau SOP (misal: 'Prosedur sekat bakar karhutla')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="space-y-2">
          {kbArticles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map((art) => (
            <div key={art.id} className="p-3.5 bg-slate-950 rounded border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-800 text-amber-400 text-[10px] font-mono rounded border border-slate-700">
                    {art.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{art.id} • {art.reads} dibaca</span>
                </div>
                <h3 className="text-xs font-bold text-slate-100 mt-1">{art.title}</h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => setSelectedArticle(art)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Baca</span>
                </button>

                <button 
                  onClick={() => handleDownload(art)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded flex items-center gap-1 transition-colors"
                  title="Unduh Referensi Dokumen"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>UNDUH REFERENSI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl w-full space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-mono font-bold">
                  {selectedArticle.category}
                </span>
                <h2 className="text-sm font-extrabold text-slate-100 mt-1">{selectedArticle.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-1 bg-slate-800 text-slate-400 hover:text-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 whitespace-pre-line leading-relaxed">
              {selectedArticle.content}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded"
              >
                Tutup
              </button>

              <button
                onClick={() => handleDownload(selectedArticle)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>UNDUH DOKUMEN REFERENSI</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
