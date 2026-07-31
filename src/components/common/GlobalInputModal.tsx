import React, { useState, useEffect } from 'react';
import { 
  X, 
  Eye, 
  Crosshair, 
  Users, 
  Truck, 
  MapPin, 
  Paperclip, 
  Save, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Lock, 
  FileText, 
  Layers, 
  Sparkles,
  Compass
} from 'lucide-react';
import { StaffCategory, ClearanceLevel, StaffDataRecord, WorkflowStatus } from '../../types';
import { LocationPickerMap } from './LocationPickerMap';

interface GlobalInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRecord: (newRecord: StaffDataRecord) => void;
  initialCategory?: StaffCategory;
  initialSubCategory?: 'KEJADIAN' | 'KEGIATAN' | 'PERSONEL' | 'MATERIIL' | 'DOKUMEN' | 'LAPORAN';
}

export const GlobalInputModal: React.FC<GlobalInputModalProps> = ({
  isOpen,
  onClose,
  onSubmitRecord,
  initialCategory = 'INTELIJEN',
  initialSubCategory = 'KEJADIAN'
}) => {
  if (!isOpen) return null;

  // Selected Category and Sub-category
  const [selectedStaff, setSelectedStaff] = useState<StaffCategory>(initialCategory);
  const [subCategory, setSubCategory] = useState<'KEJADIAN' | 'KEGIATAN' | 'PERSONEL' | 'MATERIIL' | 'DOKUMEN' | 'LAPORAN'>(initialSubCategory);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':'));
  const [region, setRegion] = useState('Riau');
  const [locationName, setLocationName] = useState('Pekanbaru, Riau');
  const [lat, setLat] = useState<number>(0.5310);
  const [lng, setLng] = useState<number>(101.4474);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'KRITIS' | 'TINGGI' | 'SEDANG' | 'RENDAH'>('TINGGI');
  const [status, setStatus] = useState('ONGOING');
  const [classification, setClassification] = useState<ClearanceLevel>('RAHASIA');
  const [unitName, setUnitName] = useState('');
  const [personnelCount, setPersonnelCount] = useState<number>(0);
  const [attachmentName, setAttachmentName] = useState<string>('');

  // UI state
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('SAVED');
  const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString('id-ID'));
  const [duplicateMatch, setDuplicateMatch] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default status options based on selectedStaff
  useEffect(() => {
    if (selectedStaff === 'OPERASI') setStatus('PLANNED');
    else if (selectedStaff === 'LOGISTIK') setStatus('READY');
    else if (selectedStaff === 'PERSONEL') setStatus('HADIR');
    else setStatus('ACTIVE');
  }, [selectedStaff]);

  // Auto-save draft trigger
  useEffect(() => {
    if (!title && !description) return;
    setAutoSaveStatus('SAVING');
    const timer = setTimeout(() => {
      setAutoSaveStatus('SAVED');
      setLastSavedTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1200);
    return () => clearTimeout(timer);
  }, [title, description, locationName, region, priority, status]);

  // Duplicate Check
  useEffect(() => {
    if (title.length > 5) {
      if (title.toLowerCase().includes('karhutla') || title.toLowerCase().includes('kampar')) {
        setDuplicateMatch('REC-2026-001 (Titik Hotspot Karhutla Sektor Kampar)');
      } else {
        setDuplicateMatch(null);
      }
    } else {
      setDuplicateMatch(null);
    }
  }, [title]);

  const handleLocationSelected = (loc: { lat: number; lng: number; locationName: string; region: string }) => {
    setLat(loc.lat);
    setLng(loc.lng);
    setLocationName(loc.locationName);
    setRegion(loc.region);
    setShowLocationPicker(false);
  };

  const handleSave = (asDraft: boolean) => {
    if (!title.trim()) {
      alert('Mohon isi Judul Record terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    const nowStr = new Date().toLocaleString('id-ID');

    const newRecord: StaffDataRecord = {
      id: `REC-${Date.now().toString().slice(-6)}`,
      title,
      staffCategory: selectedStaff,
      subCategory,
      date,
      time,
      region,
      locationName,
      lat,
      lng,
      description: description || 'Tidak ada deskripsi rinci.',
      priority,
      status,
      classification,
      workflowStatus: asDraft ? 'DRAFT' : 'SUBMITTED',
      submittedBy: 'Operator Staf (Session User)',
      submittedAt: `${date} ${time} WIB`,
      unitName,
      personnelCount,
      attachmentName,
      auditTrail: [
        {
          timestamp: nowStr,
          user: 'Operator Staf',
          action: asDraft ? 'Draft Dibuat' : 'Diajukan untuk Verifikasi',
          note: asDraft ? 'Disimpan dalam Draf' : 'Form Data Baru disubmit ke Verification Center'
        }
      ]
    };

    setTimeout(() => {
      onSubmitRecord(newRecord);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Header Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-100 uppercase tracking-wide">
                  STAFF DATA INPUT CENTER
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  ONE INPUT • MULTI OUTPUT
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Pusat entri data staf terpadu. Terintegrasi langsung ke Verification Center & Command Map.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Staff Category Tab Selector */}
        <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedStaff('INTELIJEN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedStaff === 'INTELIJEN'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>INTELIJEN</span>
            </button>

            <button
              onClick={() => setSelectedStaff('OPERASI')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedStaff === 'OPERASI'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>OPERASI</span>
            </button>

            <button
              onClick={() => setSelectedStaff('PERSONEL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedStaff === 'PERSONEL'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>PERSONEL</span>
            </button>

            <button
              onClick={() => setSelectedStaff('LOGISTIK')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                selectedStaff === 'LOGISTIK'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>LOGISTIK</span>
            </button>
          </div>

          {/* Auto-Save Indicator */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 shrink-0">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>
              {autoSaveStatus === 'SAVING' ? 'Menyimpan Draf...' : `Draf Tersimpan • ${lastSavedTime}`}
            </span>
          </div>
        </div>

        {/* Quick Choice Sub-category Pills */}
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <span className="text-slate-500 font-mono text-[11px] shrink-0">QUICK INPUT:</span>
          {(['KEJADIAN', 'KEGIATAN', 'LAPORAN', 'DOKUMEN'] as const).map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSubCategory(sub)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-colors ${
                subCategory === sub
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              + {sub}
            </button>
          ))}
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          
          {/* Duplicate Notice Banner */}
          {duplicateMatch && (
            <div className="p-3 bg-amber-950/60 border border-amber-500/50 rounded-lg flex items-start gap-2 text-amber-200 text-xs animate-in slide-in-from-top-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold">KEMUNGKINAN DUPLIKASI DATA TERDETEKSI:</span>
                <p className="text-[11px] text-amber-300 font-mono">{duplicateMatch}</p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => alert('Menampilkan rincian data existing...')}
                    className="underline text-[10px] font-bold text-amber-400 hover:text-white"
                  >
                    LIHAT EXISTING
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuplicateMatch(null)}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                  >
                    ABAIKAN & LANJUTKAN
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form Grid Section 1: Title, Clearance, Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-1">
              <label className="text-slate-300 font-bold flex items-center justify-between">
                <span>JUDUL RECORD DATA *</span>
                <span className="text-[10px] font-mono text-slate-500">WAJIB DIISI</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Titik Hotspot Karhutla Sektor Kampar / Patroli Terpadu Natuna..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>KLASIFIKASI KERAHASIAAN *</span>
              </label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value as ClearanceLevel)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
              >
                <option value="SANGAT RAHASIA">🔴 SANGAT RAHASIA</option>
                <option value="RAHASIA">🟠 RAHASIA</option>
                <option value="TERBATAS">🔵 TERBATAS</option>
                <option value="BIASA">⚪ BIASA</option>
              </select>
            </div>
          </div>

          {/* Form Grid Section 2: Date, Time, Priority, Status */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold">TANGGAL *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold">WAKTU *</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="HH:MM"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold">TINGKAT PRIORITAS *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              >
                <option value="KRITIS">🚨 KRITIS</option>
                <option value="TINGGI">⚡ TINGGI</option>
                <option value="SEDANG">🔹 SEDANG</option>
                <option value="RENDAH">⚪ RENDAH</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold">STATUS OPERASIONAL</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono font-bold focus:outline-none focus:border-amber-500"
              >
                {selectedStaff === 'OPERASI' && (
                  <>
                    <option value="PLANNED">PLANNED (Direncanakan)</option>
                    <option value="PREPARATION">PREPARATION (Persiapan)</option>
                    <option value="ONGOING">ONGOING (Berlangsung)</option>
                    <option value="COMPLETED">COMPLETED (Selesai)</option>
                    <option value="DELAYED">DELAYED (Ditunda)</option>
                  </>
                )}
                {selectedStaff === 'LOGISTIK' && (
                  <>
                    <option value="READY">READY (Siap Pakai)</option>
                    <option value="LIMITED">LIMITED (Terbatas)</option>
                    <option value="NOT READY">NOT READY (Tidak Siap)</option>
                    <option value="MAINTENANCE">MAINTENANCE (Perbaikan)</option>
                  </>
                )}
                {selectedStaff === 'PERSONEL' && (
                  <>
                    <option value="HADIR">HADIR (Lengkap)</option>
                    <option value="DINAS_LUAR">DINAS LUAR</option>
                    <option value="CUTI">CUTI / IZIN</option>
                    <option value="PENDIDIKAN">PENDIDIKAN</option>
                  </>
                )}
                {selectedStaff === 'INTELIJEN' && (
                  <>
                    <option value="ACTIVE">ACTIVE (Aktif Pantau)</option>
                    <option value="MONITORED">MONITORED (Terawasi)</option>
                    <option value="ESCALATED">ESCALATED (Eskalasi)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Form Grid Section 3: Interactive Location & GIS Picker */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-slate-200 uppercase tracking-wider">
                  GEO-SPATIAL LOCATION & MAP COORDINATES
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowLocationPicker(!showLocationPicker)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{showLocationPicker ? 'TUTUP PETA' : '📍 PILIH PADA PETA GIS'}</span>
              </button>
            </div>

            {/* Embedded Interactive Map Selector */}
            {showLocationPicker && (
              <div className="animate-in fade-in duration-200">
                <LocationPickerMap
                  initialLat={lat}
                  initialLng={lng}
                  initialLocationName={locationName}
                  initialRegion={region}
                  onSelectLocation={handleLocationSelected}
                  onClose={() => setShowLocationPicker(false)}
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-slate-400 text-[10px] font-mono block">WILAYAH / PROVINSI</label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Provinsi / Sektor"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px] font-mono block">NAMA LOKASI / OBJEK</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Kecamatan / Obvitnas / Posko"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px] font-mono block">LATITUDE</label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[10px] font-mono block">LONGITUDE</label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Description & Detail TextArea */}
          <div className="space-y-1">
            <label className="text-slate-300 font-bold flex items-center justify-between">
              <span>URAIAN & DETAILS SENSITIF *</span>
              <span className="text-[10px] font-mono text-slate-500">NEED-TO-KNOW PROTECTION</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan rincian perkembangan situasi, kekuatan pasukan, jumlah materiil, atau uraian kegiatan secara lengkap..."
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          {/* Unit Name & Personnel/Material Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold">UNIT / PENANGGUNG JAWAB</label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Contoh: Batalyon Infanteri 101 / Detasemen Peralatan..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold">JUMLAH PERSONEL / UNIT MATERIIL</label>
              <input
                type="number"
                value={personnelCount || ''}
                onChange={(e) => setPersonnelCount(parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* File Attachment Upload Box */}
          <div className="p-3 bg-slate-950 border border-dashed border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                <span>LAMPIRAN DOKUMEN / FOTO (PDF, IMAGE, DOC)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">MAX 25MB</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setAttachmentName(f.name);
                }}
              />
              <label
                htmlFor="file-upload"
                className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded text-slate-300 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Pilih File</span>
              </label>

              <span className="text-xs font-mono text-slate-400 truncate">
                {attachmentName ? `📎 ${attachmentName}` : 'Belum ada file dipilih'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Batal
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSave(true)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>SIMPAN DRAF</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSave(false)}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT UNTUK VERIFIKASI</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
