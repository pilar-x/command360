import React, { useState, useRef } from 'react';
import { 
  GeneratedDocument, 
  DocumentTemplate,
  DocClassification, 
  DocPriority, 
  DocStaffDomain, 
  DocCategoryGroup,
  DocWorkflowStage,
  StaffDataRecord 
} from '../../types';
import { ALL_DOCUMENT_TYPES, MOCK_TEMPLATES } from '../../data/mockDocumentData';
import { mockStaffDataRecords } from '../../data/mockData';
import { A4DocumentPreview } from './A4DocumentPreview';
import { AiAssistantPanel } from './AiAssistantPanel';
import { 
  downloadReferenceDoc, 
  downloadDocumentAsPdf, 
  downloadDocumentAsDocx 
} from '../../utils/downloadUtils';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Check, 
  Download, 
  Printer, 
  Copy, 
  Database, 
  ShieldCheck, 
  FileCheck, 
  RefreshCw,
  Send,
  Save
} from 'lucide-react';

interface DocumentWizardProps {
  initialDocType?: string;
  onFinishDocument: (doc: GeneratedDocument) => void;
  onCancel: () => void;
  userRole: string;
}

export const DocumentWizard: React.FC<DocumentWizardProps> = ({
  initialDocType = 'Surat Perintah',
  onFinishDocument,
  onCancel,
  userRole
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1); // 1 to 6

  // Step 1 State
  const [selectedDocType, setSelectedDocType] = useState<string>(initialDocType);
  const [classification, setClassification] = useState<DocClassification>('Biasa');
  const [priority, setPriority] = useState<DocPriority>('Segera');
  const [staffDomain, setStaffDomain] = useState<DocStaffDomain>('OPERASI');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('TMPL-SPRIN-01');

  // Step 2 Form State
  const [documentNumber, setDocumentNumber] = useState<string>('Sprin/ 205 / VII / 2026');
  const [date, setDate] = useState<string>('30 Juli 2026');
  const [location, setLocation] = useState<string>('Padang');
  const [fromSender, setFromSender] = useState<string>('Komandan Batalyon Infanteri TP 897');
  const [toRecipient, setToRecipient] = useState<string>('Komandan Kompi A Yonif TP 897');
  const [perihal, setPerihal] = useState<string>('Pelaksanaan Patroli Sekat Bakar & Komsos Sektor Barat');
  
  const [dasarList, setDasarList] = useState<string[]>([
    'Direktif Latihan & Operasi Batalyon Infanteri TP 897/Singgalang TA 2026',
    'Laporan titik panas dan evaluasi lahan sekat bakar Sektor Barat Agam'
  ]);
  const [tembusanList, setTembusanList] = useState<string[]>([
    'Danrem 032/Wirabraja',
    'Pasi Intel Yonif TP 897'
  ]);
  const [pesertaList, setPesertaList] = useState<string[]>([
    '1 Tim Taktis Kompi A (12 Prajurit)'
  ]);
  const [lampiranList, setLampiranList] = useState<string[]>([
    'Peta Rute Patroli Sektor Barat'
  ]);

  const [maksud, setMaksud] = useState<string>('Petunjuk teknis pelaksanaan patroli pencegahan karhutla.');
  const [tujuan, setTujuan] = useState<string>('Mencegah kebakaran hutan dan meningkatkan sinergi masyarakat.');
  const [waktu, setWaktu] = useState<string>('30 Juli - 05 Agustus 2026');
  const [uraianNotes, setUraianNotes] = useState<string>('Briefing staf tanggal 30 Juli, tim melaksanakan patroli sekat bakar, pelaporan berkala 2x sehari.');
  const [uraianContent, setUraianContent] = useState<string>('');
  const [keterangan, setKeterangan] = useState<string>('Dokumen disusun otomatis oleh AI Document Generator COMMAND360.');

  // AI Prompt Assistant Modal State
  const [isAiExpanding, setIsAiExpanding] = useState<boolean>(false);

  // Step 3 Reference State
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['SOP_Sekat_Bakar_2026.pdf', 'Pedoman_Patroli_Sektor_Barat.docx']);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('');
  const [availableTemplates, setAvailableTemplates] = useState<DocumentTemplate[]>(MOCK_TEMPLATES);
  const [isAddingTemplateWizard, setIsAddingTemplateWizard] = useState(false);
  const [newWizardTemplate, setNewWizardTemplate] = useState({
    name: '',
    description: '',
    categoryGroup: 'SURAT' as DocCategoryGroup
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateWizardTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWizardTemplate.name.trim()) return;

    const newTmpl: DocumentTemplate = {
      id: `TMPL-WZ-${Date.now().toString().slice(-4)}`,
      name: newWizardTemplate.name.trim(),
      categoryGroup: newWizardTemplate.categoryGroup,
      staffDomain: staffDomain,
      version: 'v1.0',
      effectiveDate: new Date().toISOString().split('T')[0],
      owner: 'STAF KOMANDO',
      status: 'ACTIVE',
      description: newWizardTemplate.description.trim() || 'Template custom tambahan perwira staf.',
      defaultKlasifikasi: classification,
      defaultPrioritas: priority,
      structureFields: ['Judul', 'Uraian Perintah', 'Penutup']
    };

    setAvailableTemplates(prev => [newTmpl, ...prev]);
    setSelectedTemplateId(newTmpl.id);
    setIsAddingTemplateWizard(false);
    setNewWizardTemplate({ name: '', description: '', categoryGroup: 'SURAT' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newFileNames = filesArray.map(f => f.name);
      setUploadedFiles(prev => [...prev, ...newFileNames]);
    }
  };

  // Generated Document Final Object
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null);

  // Helper adding list items
  const addDasar = () => setDasarList(prev => [...prev, '']);
  const updateDasar = (idx: number, val: string) => {
    const updated = [...dasarList];
    updated[idx] = val;
    setDasarList(updated);
  };
  const removeDasar = (idx: number) => setDasarList(prev => prev.filter((_, i) => i !== idx));

  const addTembusan = () => setTembusanList(prev => [...prev, '']);
  const updateTembusan = (idx: number, val: string) => {
    const updated = [...tembusanList];
    updated[idx] = val;
    setTembusanList(updated);
  };
  const removeTembusan = (idx: number) => setTembusanList(prev => prev.filter((_, i) => i !== idx));

  const addPeserta = () => setPesertaList(prev => [...prev, '']);
  const updatePeserta = (idx: number, val: string) => {
    const updated = [...pesertaList];
    updated[idx] = val;
    setPesertaList(updated);
  };
  const removePeserta = (idx: number) => setPesertaList(prev => prev.filter((_, i) => i !== idx));

  const addLampiran = () => setLampiranList(prev => [...prev, '']);
  const updateLampiran = (idx: number, val: string) => {
    const updated = [...lampiranList];
    updated[idx] = val;
    setLampiranList(updated);
  };
  const removeLampiran = (idx: number) => setLampiranList(prev => prev.filter((_, i) => i !== idx));

  // AI Expand Function for Uraian Field
  const handleAiExpandUraian = () => {
    setIsAiExpanding(true);
    setTimeout(() => {
      const formalText = `DIPERINTAHKAN / DITETAPKAN:

1. Melaksanakan kegiatan ${perihal || 'kegiatan Batalyon'} berdasarkan arahan Komando Batalyon.
2. Penanggung jawab dan pelaksana wajib mengoordinasikan seluruh personel dan materiil sesuai standar operasional yang berlaku.
3. Melaporkan pelaksanaan kegiatan dan hambatan di lapangan secara hierarkis kepada Komandan Batalyon Infanteri TP 897/Singgalang.
4. Melaksanakan perintah ini dengan penuh rasa tanggung jawab, menjunjung tinggi disiplin prajurit, serta memperhatikan faktor keamanan.`;
      setUraianContent(formalText);
      setIsAiExpanding(false);
    }, 1000);
  };

  // Populate form from existing COMMAND360 Record
  const handleSelectCommand360Record = (recId: string) => {
    setSelectedRecordId(recId);
    const rec = mockStaffDataRecords.find(r => r.id === recId);
    if (rec) {
      setPerihal(rec.title);
      setUraianNotes(rec.description);
      setDate(rec.date);
      setLocation(rec.locationName || 'Padang');
      setMaksud(`Pelaksanaan kegiatan ${rec.title} di wilayah ${rec.locationName}.`);
      setTujuan(`Mendukung sasaran program Staf ${rec.staffCategory}.`);
    }
  };

  // Step 4 AI Generation Execution
  const handleGenerateDocument = () => {
    setCurrentStep(4);
    setTimeout(() => {
      const typeInfo = ALL_DOCUMENT_TYPES.find(t => t.name === selectedDocType);
      const catGroup: DocCategoryGroup = typeInfo ? typeInfo.categoryGroup : 'SURAT';

      let bodyUraian = uraianContent;
      if (!bodyUraian.trim()) {
        bodyUraian = `DIPERINTAHKAN:

1. Melaksanakan ${perihal || 'tugas operasional'} dengan sungguh-sungguh dan disiplin prajurit.
2. Seluruh personel yang terlibat (${pesertaList.join(', ') || 'Personel Satuan'}) wajib menjaga keamanan dan ketertiban.
3. Melaporkan hasil pelaksanaan secara berkala kepada Komandan Batalyon Infanteri TP 897.`;
      }

      const newDoc: GeneratedDocument = {
        id: `DOC-2026-${Math.floor(100 + Math.random() * 900)}`,
        documentNumber,
        title: perihal || selectedDocType,
        docType: selectedDocType,
        categoryGroup: catGroup,
        staffDomain,
        classification,
        priority,
        date,
        location,
        fromSender,
        toRecipient,
        perihal,
        dasarList: dasarList.filter(d => d.trim().length > 0),
        tembusanList: tembusanList.filter(t => t.trim().length > 0),
        pesertaList: pesertaList.filter(p => p.trim().length > 0),
        lampiranList: lampiranList.filter(l => l.trim().length > 0),
        maksud,
        tujuan,
        waktu,
        uraianContent: bodyUraian,
        keterangan,
        templateId: selectedTemplateId,
        workflowStage: 'DRAFT',
        createdBy: `${userRole}`,
        createdAt: new Date().toLocaleString('id-ID'),
        updatedAt: new Date().toLocaleString('id-ID'),
        factVerification: {
          verifiedFacts: [
            `Data Satuan: Batalyon Infanteri TP 897/Singgalang confirmed`,
            `Klasifikasi: ${classification} matches role clearance`
          ],
          userInputFacts: [
            `Nomor surat: ${documentNumber}`,
            `Perihal: ${perihal}`
          ],
          missingFacts: documentNumber ? [] : ['Nomor dokumen belum diisi']
        },
        comments: [],
        versions: [
          {
            version: 1,
            editedBy: userRole,
            role: 'Creator',
            timestamp: new Date().toLocaleString('id-ID'),
            summary: 'Draft awal dihasilkan oleh AI Document Generator',
            content: bodyUraian
          }
        ],
        auditTrail: [
          { timestamp: new Date().toLocaleString('id-ID'), user: userRole, action: 'Membuat draft dokumen baru' }
        ]
      };

      setGeneratedDoc(newDoc);
      setCurrentStep(5); // Move to Step 5 (Review)
    }, 1500);
  };

  const handleUpdateWorkflowStage = (stage: DocWorkflowStage) => {
    if (!generatedDoc) return;
    const updated: GeneratedDocument = {
      ...generatedDoc,
      workflowStage: stage,
      updatedAt: new Date().toLocaleString('id-ID'),
      auditTrail: [
        ...generatedDoc.auditTrail,
        { timestamp: new Date().toLocaleString('id-ID'), user: userRole, action: `Mengubah status dokumen ke ${stage}` }
      ]
    };
    setGeneratedDoc(updated);
    if (stage === 'FINAL' || stage === 'APPROVED') {
      setCurrentStep(6);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* Wizard Header Progress Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMAND360 DOCUMENT WIZARD</span>
            </div>
            <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-wide">
              {currentStep === 1 && 'STEP 1: PILIH JENIS DOKUMEN & KLASIFIKASI'}
              {currentStep === 2 && 'STEP 2: ISI PARAMETER & DATA DOKUMEN'}
              {currentStep === 3 && 'STEP 3: UPLOAD REFERENSI & TEMPLATE'}
              {currentStep === 4 && 'STEP 4: GENERATING DOCUMENT WITH AI...'}
              {currentStep === 5 && 'STEP 5: REVIEW, EDITOR & FACT CHECK'}
              {currentStep === 6 && 'STEP 6: DOKUMEN FINAL & EKSPOR'}
            </h2>
          </div>

          <button 
            onClick={onCancel} 
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold self-start sm:self-auto"
          >
            Batal / Kembali
          </button>
        </div>

        {/* 6 Steps Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {[
            { step: 1, label: '1. JENIS' },
            { step: 2, label: '2. DATA' },
            { step: 3, label: '3. REFERENSI' },
            { step: 4, label: '4. GENERATE' },
            { step: 5, label: '5. REVIEW' },
            { step: 6, label: '6. FINAL' },
          ].map((item) => (
            <div
              key={item.step}
              onClick={() => {
                if (generatedDoc && item.step <= 6) setCurrentStep(item.step);
              }}
              className={`p-2 rounded border text-center font-bold text-[10px] cursor-pointer transition-colors ${
                currentStep === item.step
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : currentStep > item.step
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: JENIS DOKUMEN */}
      {currentStep === 1 && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <label className="font-bold text-slate-200 uppercase text-xs block">
                1. Pilih Jenis Dokumen Resmi
              </label>
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-amber-400 font-bold focus:outline-none focus:border-amber-500 text-xs"
              >
                {ALL_DOCUMENT_TYPES.map((t) => (
                  <option key={t.id} value={t.name}>
                    [{t.categoryGroup}] {t.name} - {t.description}
                  </option>
                ))}
              </select>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-1">
                <span className="text-amber-400 font-bold block">JENIS TERPILIH: {selectedDocType}</span>
                <p className="text-slate-400 text-[11px]">
                  {ALL_DOCUMENT_TYPES.find(t => t.name === selectedDocType)?.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-bold text-slate-200 uppercase text-xs block mb-2">
                  2. Staff Domain (Bidang Staf)
                </label>
                <select
                  value={staffDomain}
                  onChange={(e) => setStaffDomain(e.target.value as DocStaffDomain)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 font-bold focus:outline-none focus:border-amber-500 text-xs"
                >
                  <option value="OPERASI">STAF 3 OPERASI</option>
                  <option value="INTELIJEN">STAF 2 INTELIJEN</option>
                  <option value="PERSONEL">STAF 1 PERSONEL</option>
                  <option value="LOGISTIK">STAF 4 LOGISTIK</option>
                  <option value="TERITORIAL">STAF TERITORIAL</option>
                  <option value="PERENCANAAN">STAF PERENCANAAN</option>
                  <option value="PENGAWASAN">STAF PENGAWASAN</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-200 uppercase text-xs block mb-2">
                    3. Klasifikasi Raflis
                  </label>
                  <select
                    value={classification}
                    onChange={(e) => setClassification(e.target.value as DocClassification)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 font-bold focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="Biasa">BIASA</option>
                    <option value="Terbatas">TERBATAS</option>
                    <option value="Rahasia">RAHASIA</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-200 uppercase text-xs block mb-2">
                    4. Tingkat Prioritas
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as DocPriority)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 font-bold focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="Biasa">BIASA</option>
                    <option value="Segera">SEGERA</option>
                    <option value="Sangat Segera">SANGAT SEGERA</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-2 text-xs uppercase"
            >
              <span>LANJUT KE STEP 2 (DATA DOKUMEN)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DATA DOKUMEN & AI ASSISTED INPUT */}
      {currentStep === 2 && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
          
          {/* Quick Import from COMMAND360 Data Button */}
          <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-extrabold text-amber-300 uppercase">GENERATE FROM COMMAND360 DATA</span>
                <p className="text-[11px] text-slate-400">Gunakan record kegiatan/kejadian dari database agar tidak mengetik ulang.</p>
              </div>
            </div>

            <select
              value={selectedRecordId}
              onChange={(e) => handleSelectCommand360Record(e.target.value)}
              className="p-2 bg-slate-950 border border-slate-800 rounded text-amber-400 font-bold focus:outline-none text-xs w-full sm:w-auto"
            >
              <option value="">-- Pilih Record Command360 --</option>
              {mockStaffDataRecords.map(r => (
                <option key={r.id} value={r.id}>[{r.staffCategory}] {r.title} ({r.date})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1">
              <label className="text-slate-300 font-bold">Nomor Dokumen / Surat</label>
              <input
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder="Sprin/ 102 / VII / 2026"
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Tanggal</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Tempat Dikeluarkan</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold">Dari (Pengirim / Pejabat Penandatangan)</label>
              <input
                type="text"
                value={fromSender}
                onChange={(e) => setFromSender(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-bold">Kepada (Penerima Perintah/Dokumen)</label>
              <input
                type="text"
                value={toRecipient}
                onChange={(e) => setToRecipient(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-slate-300 font-bold">Perihal / Judul Kegiatan</label>
              <input
                type="text"
                value={perihal}
                onChange={(e) => setPerihal(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>

          {/* Dynamic List Fields: DASAR */}
          <div className="space-y-2 border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-slate-200 font-bold uppercase">DASAR DOKUMEN</label>
              <button onClick={addDasar} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>+ TAMBAH DASAR</span>
              </button>
            </div>
            {dasarList.map((d, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-slate-500 font-bold">{idx + 1}.</span>
                <input
                  type="text"
                  value={d}
                  onChange={(e) => updateDasar(idx, e.target.value)}
                  placeholder="Instruksi / Surat Direktif..."
                  className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
                />
                <button onClick={() => removeDasar(idx)} className="p-2 bg-slate-800 hover:bg-red-950 text-red-400 rounded">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Dynamic List Fields: TEMBUSAN */}
          <div className="space-y-2 border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-slate-200 font-bold uppercase">TEMBUSAN</label>
              <button onClick={addTembusan} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>+ TAMBAH TEMBUSAN</span>
              </button>
            </div>
            {tembusanList.map((t, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-slate-500 font-bold">{idx + 1}.</span>
                <input
                  type="text"
                  value={t}
                  onChange={(e) => updateTembusan(idx, e.target.value)}
                  placeholder="Pejabat / Staf Tembusan..."
                  className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
                />
                <button onClick={() => removeTembusan(idx)} className="p-2 bg-slate-800 hover:bg-red-950 text-red-400 rounded">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* AI Assisted Input Area */}
          <div className="space-y-2 border-t border-slate-800 pt-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-slate-200 font-bold uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>POIN SINGKAT & BANTU TULIS DENGAN AI</span>
              </label>
              <button
                onClick={handleAiExpandUraian}
                disabled={isAiExpanding}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-1.5 transition-colors uppercase"
              >
                {isAiExpanding ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>AI SEDANG MENULIS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>✦ BANTU TULIS DENGAN AI</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              value={uraianNotes}
              onChange={(e) => setUraianNotes(e.target.value)}
              placeholder='Tulis poin-poin ringkas di sini, lalu klik "Bantu Tulis Dengan AI"...'
              rows={3}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-amber-500 text-xs"
            />

            {uraianContent && (
              <div className="p-3 bg-slate-950 border border-amber-500/40 rounded space-y-1">
                <span className="text-amber-400 font-bold block text-[10px] uppercase">HASIL DRAFT RESMI AI:</span>
                <div className="whitespace-pre-line text-slate-200 font-serif leading-relaxed text-xs">
                  {uraianContent}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded flex items-center gap-2 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>KEMBALI KE STEP 1</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-2 text-xs uppercase"
            >
              <span>LANJUT KE STEP 3 (REFERENSI)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: REFERENSI & TEMPLATE LIBRARY */}
      {currentStep === 3 && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* File Upload / Reference Library */}
            <div className="space-y-4">
              <label className="font-bold text-slate-200 uppercase text-xs block">
                1. Referensi Dokumen (Upload File / Library)
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.docx,.txt,.doc,.png,.jpg"
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="p-6 bg-slate-950 border-2 border-dashed border-slate-800 hover:border-amber-500 rounded-xl text-center space-y-2 cursor-pointer transition-colors group"
              >
                <Upload className="w-8 h-8 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
                <div className="font-bold text-slate-200 text-xs">Unggah File Referensi (PDF, DOCX, TXT)</div>
                <p className="text-[10px] text-slate-400">
                  Klik di sini untuk memilih file dari perangkat Anda. Sistem akan mengekstrak format dan terminologi.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                  <span>FILE REFERENSI TERHUBUNG ({uploadedFiles.length}):</span>
                  <span className="text-amber-400 font-mono">DAPAT DIUNDUH</span>
                </div>
                {uploadedFiles.map((f, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-slate-200 font-bold text-xs truncate">{f}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-emerald-400 font-mono text-[9px] bg-emerald-950 border border-emerald-800 px-1.5 py-0.5 rounded">PROCESSED</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadReferenceDoc(f, 'REFERENSI');
                        }}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[10px] flex items-center gap-1 transition-colors"
                        title="Unduh Referensi Dokumen"
                      >
                        <Download className="w-3 h-3" />
                        <span>UNDUH</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-200 uppercase text-xs block">
                  2. Pilih Template Resmi (Template Library)
                </label>
                <button
                  type="button"
                  onClick={() => setIsAddingTemplateWizard(true)}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] rounded flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Tambah Template</span>
                </button>
              </div>

              {isAddingTemplateWizard && (
                <form onSubmit={handleCreateWizardTemplate} className="p-3 bg-slate-950 border border-amber-500/50 rounded-lg space-y-2 text-xs">
                  <div className="font-bold text-amber-400 text-[11px] uppercase">Form Template Baru (Sederhana)</div>
                  <input
                    type="text"
                    required
                    placeholder="Nama Template Baru..."
                    value={newWizardTemplate.name}
                    onChange={e => setNewWizardTemplate(p => ({ ...p, name: e.target.value }))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-100 text-xs focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Deskripsi singkat..."
                    value={newWizardTemplate.description}
                    onChange={e => setNewWizardTemplate(p => ({ ...p, description: e.target.value }))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-100 text-xs focus:outline-none"
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingTemplateWizard(false)}
                      className="px-2.5 py-1 bg-slate-800 text-slate-300 font-bold rounded text-[10px]"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded text-[10px]"
                    >
                      Simpan & Pilih
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {availableTemplates.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      selectedTemplateId === tmpl.id
                        ? 'bg-slate-950 border-amber-500 text-slate-100 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-xs">{tmpl.name}</span>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[9px]">{tmpl.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{tmpl.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded flex items-center gap-2 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>KEMBALI KE STEP 2</span>
            </button>

            <button
              onClick={handleGenerateDocument}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-2 text-xs uppercase shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>✦ GENERATE DOCUMENT WITH AI</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: AI GENERATING LOADING STATE */}
      {currentStep === 4 && (
        <div className="p-12 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-amber-400 animate-spin mx-auto" />
          <h3 className="text-base font-extrabold text-slate-100 uppercase tracking-wider">
            COMMAND360 AI SEDANG MENYUSUN DOKUMEN...
          </h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Memproses parameter data, aturan klasifikasi {classification}, template {selectedTemplateId}, dan struktur administrasi militer resmi.
          </p>
        </div>
      )}

      {/* STEP 5: REVIEW, SPLIT SCREEN EDITOR & PREVIEW */}
      {currentStep === 5 && generatedDoc && (
        <div className="space-y-4">
          
          {/* Action Workflow Bar */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">STATUS STAGE:</span>
              <span className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded font-extrabold">
                {generatedDoc.workflowStage}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleUpdateWorkflowStage('DRAFT')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded flex items-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>SAVE DRAFT</span>
              </button>

              <button
                onClick={() => handleUpdateWorkflowStage('REVIEW')}
                className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-blue-100 font-bold rounded flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT REVIEW</span>
              </button>

              <button
                onClick={() => handleUpdateWorkflowStage('VERIFIED')}
                className="px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-purple-100 font-bold rounded flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VERIFY DOKUMEN</span>
              </button>

              <button
                onClick={() => handleUpdateWorkflowStage('APPROVED')}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-slate-950 font-extrabold rounded flex items-center gap-1"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>APPROVE & FINALIZE</span>
              </button>
            </div>
          </div>

          {/* Split Screen Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: AI Assistant Panel */}
            <div className="lg:col-span-5 h-full">
              <AiAssistantPanel
                doc={generatedDoc}
                onUpdateDoc={setGeneratedDoc}
                onRunAiAction={(act) => {
                  if (act === 'FORMALKAN') {
                    setGeneratedDoc({
                      ...generatedDoc,
                      uraianContent: generatedDoc.uraianContent + '\n\n[DIFORMALKAN AI]: Instruksi dilaksanakan sesuai prosedur komando.'
                    });
                  }
                }}
              />
            </div>

            {/* Right Column: A4 Document Preview */}
            <div className="lg:col-span-7">
              <A4DocumentPreview doc={generatedDoc} zoomLevel={90} showFactBadges={true} />
            </div>

          </div>

        </div>
      )}

      {/* STEP 6: DOKUMEN FINAL & EXPORT */}
      {currentStep === 6 && generatedDoc && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-100 uppercase tracking-wide">
              DOKUMEN TELAH FINAL & TERDAFTAR DI DOCUMENT LIBRARY
            </h3>
            <p className="text-slate-400 text-xs">
              Nomor: {generatedDoc.documentNumber} • Dokumen siap dicetak, diunduh, atau disebarkan.
            </p>
          </div>

          {/* Final Document Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT DOKUMEN</span>
            </button>

            <button
              onClick={() => downloadDocumentAsPdf(generatedDoc)}
              className="px-4 py-2.5 bg-red-900 hover:bg-red-800 text-white font-bold rounded flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT PDF</span>
            </button>

            <button
              onClick={() => downloadDocumentAsDocx(generatedDoc)}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT DOCX</span>
            </button>

            <button
              onClick={() => {
                onFinishDocument(generatedDoc);
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>SIMPAN KE DOCUMENT LIBRARY</span>
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            <A4DocumentPreview doc={generatedDoc} zoomLevel={85} showFactBadges={false} />
          </div>
        </div>
      )}

    </div>
  );
};
