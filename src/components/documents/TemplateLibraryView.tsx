import React, { useState } from 'react';
import { DocumentTemplate, DocCategoryGroup, DocStaffDomain, DocClassification, DocPriority } from '../../types';
import { MOCK_TEMPLATES } from '../../data/mockDocumentData';
import { FileText, Plus, Search, CheckCircle2, Copy, X, Trash2 } from 'lucide-react';

interface TemplateLibraryViewProps {
  onSelectTemplateToGenerate: (template: DocumentTemplate) => void;
}

export const TemplateLibraryView: React.FC<TemplateLibraryViewProps> = ({
  onSelectTemplateToGenerate
}) => {
  const [templates, setTemplates] = useState<DocumentTemplate[]>(MOCK_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Template Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    categoryGroup: 'SURAT' as DocCategoryGroup,
    staffDomain: 'OPERASI' as DocStaffDomain,
    description: '',
    owner: 'STAF 3 OPERASI',
    version: 'v1.0',
    defaultKlasifikasi: 'Biasa' as DocClassification,
    defaultPrioritas: 'Biasa' as DocPriority,
    structureFields: 'Kop Komando, Nomor Surat, Dasar Hukum, Isi Arahan, Tanda Tangan Danyon'
  });

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplate.name.trim() || !newTemplate.description.trim()) {
      alert('Mohon lengkapi Nama Template dan Deskripsi Singkat.');
      return;
    }

    const fieldsArray = newTemplate.structureFields
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const created: DocumentTemplate = {
      id: `TMPL-CUSTOM-${Date.now().toString().slice(-5)}`,
      name: newTemplate.name.trim(),
      categoryGroup: newTemplate.categoryGroup,
      staffDomain: newTemplate.staffDomain,
      version: newTemplate.version || 'v1.0',
      effectiveDate: new Date().toISOString().split('T')[0],
      owner: newTemplate.owner || 'STAF KOMANDO',
      status: 'ACTIVE',
      description: newTemplate.description.trim(),
      defaultKlasifikasi: newTemplate.defaultKlasifikasi,
      defaultPrioritas: newTemplate.defaultPrioritas,
      structureFields: fieldsArray.length > 0 ? fieldsArray : ['Judul', 'Uraian', 'Penutup']
    };

    setTemplates(prev => [created, ...prev]);
    setIsModalOpen(false);
    showNotification(`Template baru "${created.name}" berhasil dibuat dan ditambahkan ke Library!`);

    // Reset Form
    setNewTemplate({
      name: '',
      categoryGroup: 'SURAT',
      staffDomain: 'OPERASI',
      description: '',
      owner: 'STAF 3 OPERASI',
      version: 'v1.0',
      defaultKlasifikasi: 'Biasa',
      defaultPrioritas: 'Biasa',
      structureFields: 'Kop Komando, Nomor Surat, Dasar Hukum, Isi Arahan, Tanda Tangan Danyon'
    });
  };

  const handleDeleteTemplate = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus template "${name}"?`)) {
      setTemplates(prev => prev.filter(t => t.id !== id));
      showNotification(`Template "${name}" telah dihapus.`);
    }
  };

  const filteredTemplates = templates.filter(tmpl => {
    const matchesSearch = tmpl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tmpl.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'ALL' || tmpl.categoryGroup === selectedGroup;
    const matchesDomain = selectedDomain === 'ALL' || tmpl.staffDomain === selectedDomain;
    return matchesSearch && matchesGroup && matchesDomain;
  });

  return (
    <div className="space-y-4 font-mono text-xs">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-mono text-xs rounded-lg flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>TEMPLATE LIBRARY - PERPUSTAKAAN TEMPLATE RESMI</span>
          </h2>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Daftar template dokumen administrasi militer yang telah disahkan administrator.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-1.5 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>+ TAMBAH TEMPLATE BARU</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nama template..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
          />
        </div>

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

        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="p-2 bg-slate-950 border border-slate-800 rounded text-slate-200 font-bold focus:outline-none text-xs"
        >
          <option value="ALL">SEMUA STAF (ALL DOMAINS)</option>
          <option value="OPERASI">STAF 3 OPERASI</option>
          <option value="INTELIJEN">STAF 2 INTELIJEN</option>
          <option value="PERSONEL">STAF 1 PERSONEL</option>
          <option value="LOGISTIK">STAF 4 LOGISTIK</option>
          <option value="TERITORIAL">TERITORIAL</option>
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((tmpl) => (
          <div key={tmpl.id} className="p-4 bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl space-y-3 transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-bold">
                  {tmpl.categoryGroup} • {tmpl.staffDomain}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{tmpl.status}</span>
                  </span>
                  <button
                    onClick={() => handleDeleteTemplate(tmpl.id, tmpl.name)}
                    className="p-1 bg-slate-950 hover:bg-red-950 text-slate-500 hover:text-red-400 rounded transition-colors"
                    title="Hapus Template"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-extrabold text-slate-100 text-sm">{tmpl.name}</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">{tmpl.description}</p>

              <div className="text-[10px] text-slate-500 space-y-0.5 font-mono">
                <div>Pemilik / Creator: <span className="text-slate-300">{tmpl.owner}</span></div>
                <div>Versi: <span className="text-slate-300">{tmpl.version}</span> • Tanggal Berlaku: <span className="text-slate-300">{tmpl.effectiveDate}</span></div>
                {tmpl.structureFields && tmpl.structureFields.length > 0 && (
                  <div className="mt-1 pt-1 border-t border-slate-800/80 text-[10px] text-amber-400">
                    Struktur: {tmpl.structureFields.join(' • ')}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => onSelectTemplateToGenerate(tmpl)}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-1.5 transition-colors uppercase text-[11px]"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>GUNAKAN TEMPLATE INI</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE TEMPLATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h2 className="text-sm font-extrabold text-slate-100 uppercase">Tambah Template Resmi Baru</h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 bg-slate-800 text-slate-400 hover:text-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nama Template *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Template Surat Perintah Tugas Khusus Komsos"
                  value={newTemplate.name}
                  onChange={e => setNewTemplate(p => ({ ...p, name: e.target.value }))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kategori Dokumen</label>
                  <select
                    value={newTemplate.categoryGroup}
                    onChange={e => setNewTemplate(p => ({ ...p, categoryGroup: e.target.value as DocCategoryGroup }))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none"
                  >
                    <option value="SURAT">SURAT</option>
                    <option value="LAPORAN">LAPORAN</option>
                    <option value="PRODUK_STAF">PRODUK STAF</option>
                    <option value="RAPAT_KEGIATAN">RAPAT & KEGIATAN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Domain Staf</label>
                  <select
                    value={newTemplate.staffDomain}
                    onChange={e => setNewTemplate(p => ({ ...p, staffDomain: e.target.value as DocStaffDomain }))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none"
                  >
                    <option value="OPERASI">STAF 3 OPERASI</option>
                    <option value="INTELIJEN">STAF 2 INTELIJEN</option>
                    <option value="PERSONEL">STAF 1 PERSONEL</option>
                    <option value="LOGISTIK">STAF 4 LOGISTIK</option>
                    <option value="TERITORIAL">TERITORIAL</option>
                    <option value="PERENCANAAN">PERENCANAAN</option>
                    <option value="ALL">SEMUA STAF (ALL)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Deskripsi & Tanda Petunjuk *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan kegunaan template ini dan standar peruntukannya dalam dinas militer..."
                  value={newTemplate.description}
                  onChange={e => setNewTemplate(p => ({ ...p, description: e.target.value }))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Klasifikasi Default</label>
                  <select
                    value={newTemplate.defaultKlasifikasi}
                    onChange={e => setNewTemplate(p => ({ ...p, defaultKlasifikasi: e.target.value as DocClassification }))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none"
                  >
                    <option value="Biasa">Biasa</option>
                    <option value="Terbatas">Terbatas</option>
                    <option value="Rahasia">Rahasia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Prioritas Default</label>
                  <select
                    value={newTemplate.defaultPrioritas}
                    onChange={e => setNewTemplate(p => ({ ...p, defaultPrioritas: e.target.value as DocPriority }))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none"
                  >
                    <option value="Biasa">Biasa</option>
                    <option value="Segera">Segera</option>
                    <option value="Sangat Segera">Sangat Segera</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Pemilik / Creator Staf</label>
                  <input
                    type="text"
                    value={newTemplate.owner}
                    onChange={e => setNewTemplate(p => ({ ...p, owner: e.target.value }))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Versi Template</label>
                  <input
                    type="text"
                    value={newTemplate.version}
                    onChange={e => setNewTemplate(p => ({ ...p, version: e.target.value }))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Struktur Bidang (Pisahkan dengan Koma)</label>
                <input
                  type="text"
                  placeholder="Kop, Dasar, Menimbang, Isi Perintah, Tanda Tangan"
                  value={newTemplate.structureFields}
                  onChange={e => setNewTemplate(p => ({ ...p, structureFields: e.target.value }))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SIMPAN TEMPLATE BARU</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

