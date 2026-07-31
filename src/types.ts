export type StaffType = 'COMMAND' | 'INTELIJEN' | 'OPERASI' | 'PERSONEL' | 'LOGISTIK';
export type StaffCategory = 'INTELIJEN' | 'OPERASI' | 'PERSONEL' | 'LOGISTIK';

export type UserRole = 
  | 'Panglima / Komandan'
  | 'Asintel'
  | 'Asops'
  | 'Aspers'
  | 'Aslog'
  | 'Administrator';

export type ClearanceLevel = 'SANGAT RAHASIA' | 'RAHASIA' | 'TERBATAS' | 'BIASA';

export type WorkflowStatus = 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'PUBLISHED' | 'RETURNED' | 'ARCHIVED';

export type NavigationMenu = 
  | 'COMMAND_CENTER'
  | 'SATUAN'
  | 'PERSONEL'
  | 'OPERASI'
  | 'LOGISTIK'
  | 'PANGKALAN'
  | 'PEMBANGUNAN'
  | 'TP_CONTROL'
  | 'KETAHANAN_PANGAN'
  | 'KESEHATAN'
  | 'TERITORIAL_MASYARAKAT'
  | 'PRESTASI'
  | 'KENDALA_KEBUTUHAN'
  | 'REPORT_CENTER'
  | 'ADMINISTRATION'
  | 'INTELIJEN'
  | 'COMMAND_MAP'
  | 'COMMAND_AI'
  | 'COMMAND_TASK'
  | 'DOCUMENT_CENTER'
  | 'GENERATED_SURAT'
  | 'VERIFICATION_CENTER'
  | 'ANALYTICS'
  | 'CALENDAR'
  | 'KNOWLEDGE'
  | 'NOTIFICATION'
  | 'SYSTEM_CENTER';

export interface AuditLogEntry {
  timestamp: string;
  user: string;
  action: string;
  note?: string;
}

export interface StaffDataRecord {
  id: string;
  title: string;
  staffCategory: StaffCategory;
  subCategory: 'KEJADIAN' | 'KEGIATAN' | 'PERSONEL' | 'MATERIIL' | 'DOKUMEN' | 'LAPORAN';
  date: string;
  time: string;
  region: string;
  locationName: string;
  lat?: number;
  lng?: number;
  description: string;
  priority: 'KRITIS' | 'TINGGI' | 'SEDANG' | 'RENDAH';
  status: string; // e.g. 'ACTIVE', 'PLANNED', 'ONGOING', 'COMPLETED', 'READY', 'MAINTENANCE'
  classification: ClearanceLevel;
  workflowStatus: WorkflowStatus;
  submittedBy: string;
  submittedAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  publishedBy?: string;
  publishedAt?: string;
  revisionNote?: string;
  auditTrail: AuditLogEntry[];
  attachmentName?: string;
  unitName?: string;
  personnelCount?: number;
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  level: 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'INFO';
  staff: StaffType;
  timestamp: string;
  status: 'UNREAD' | 'ACKNOWLEDGED' | 'ESCALATED' | 'RESOLVED';
  clearance: ClearanceLevel;
  actionRequired?: string;
}

export interface CommandDirectiveTask {
  id: string;
  title: string;
  arahanPimpinan: string;
  disposisi: string;
  picUnit: string;
  deadline: string;
  priority: 'TINGGI' | 'SEDANG' | 'RENDAH';
  progress: number;
  status: 'SELESAI' | 'DALAM_PROSES' | 'TERLAMBAT' | 'PENDING';
  evidence?: string;
  followUpHistory: Array<{
    date: string;
    note: string;
    author: string;
  }>;
}

export interface PersonnelRecord {
  id: string;
  nrp: string;
  nama: string;
  pangkat: string;
  jabatan: string;
  satuan: string;
  statusKehadiran: 'HADIR' | 'DINAS_LUAR' | 'CUTI' | 'IZIN' | 'PENDIDIKAN';
  kualifikasi: string[];
  clearance: ClearanceLevel;
  pendidikan: string;
  masaDinasYears: number;
}

export interface MaterialAsset {
  id: string;
  kodeInventaris: string;
  namaBarang: string;
  kategori: 'SENJATA_AMUNISI' | 'VEHICLE' | 'PERLENGKAPAN' | 'BEKAL' | 'KOMUNIKASI';
  jumlah: number;
  satuanUnit: string;
  kondisiBaik: number;
  kondisiRusakRingan: number;
  kondisiRusakBerat: number;
  lokasiGudang: string;
  statusMaintenance: 'SANGAT_BAIK' | 'PERLU_SERVIS' | 'DALAM_PERBAIKAN' | 'KRITIS';
}

export interface IntelIncident {
  id: string;
  kodeKejadian: string;
  judul: string;
  lokasi: string;
  coordinates: [number, number]; // [lat, lng]
  kategori: 'SITUASI_WILAYAH' | 'BENCANA' | 'KARHUTLA' | 'CUACA_EKSTREM' | 'SECURITY';
  tingkatAncaman: 'SANGAT_TINGGI' | 'TINGGI' | 'SEDANG' | 'RENDAH';
  sumber: string;
  waktuKejadian: string;
  ringkasan: string;
  clearance: ClearanceLevel;
}

export interface MapLayerConfig {
  showBoundaries: boolean;
  showUnits: boolean;
  showInfrastructure: boolean;
  showIncidents: boolean;
  showDisasters: boolean;
  showHotspots: boolean;
  showWeather: boolean;
}

export interface StaffReport {
  id: string;
  judul: string;
  staff: StaffType;
  jenis: 'HARIAN' | 'MINGGUAN' | 'BULANAN' | 'KHUSUS' | 'EXECUTIVE';
  tanggal: string;
  pembuat: string;
  status: 'DRAFT' | 'MENUNGGU_VERIFIKASI' | 'DISETUJUI' | 'ARSIP';
  clearance: ClearanceLevel;
  ringkasanContent: string;
}

export interface ExecutiveBriefData {
  readinessScore: number;
  personnelPercent: number;
  logisticsPercent: number;
  opsPercent: number;
  criticalAlertCount: number;
  warningAlertCount: number;
  advisoryCount: number;
  infoCount: number;
  activeDirectives: number;
  completedDirectives: number;
  overdueDirectives: number;
}

// ==========================================
// AI DOCUMENT GENERATOR TYPES (GENERATED SURAT & PRODUK STAF)
// ==========================================

export type DocCategoryGroup = 'SURAT' | 'LAPORAN' | 'PRODUK_STAF' | 'RAPAT_KEGIATAN';

export type DocClassification = 'Biasa' | 'Terbatas' | 'Rahasia';

export type DocPriority = 'Biasa' | 'Segera' | 'Sangat Segera';

export type DocStaffDomain = 'ALL' | 'INTELIJEN' | 'OPERASI' | 'PERSONEL' | 'LOGISTIK' | 'TERITORIAL' | 'PERENCANAAN' | 'PENGAWASAN';

export type DocWorkflowStage = 'DRAFT' | 'REVIEW' | 'REVISION' | 'VERIFIED' | 'APPROVED' | 'FINAL' | 'ARCHIVED';

export interface DocComment {
  id: string;
  user: string;
  role: string;
  timestamp: string;
  selectedText?: string;
  comment: string;
  resolved: boolean;
}

export interface DocVersion {
  version: number;
  editedBy: string;
  role: string;
  timestamp: string;
  summary: string;
  content: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  categoryGroup: DocCategoryGroup;
  staffDomain: DocStaffDomain;
  version: string;
  effectiveDate: string;
  owner: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
  description: string;
  defaultKlasifikasi: DocClassification;
  defaultPrioritas: DocPriority;
  sampleKop?: string;
  structureFields: string[];
}

export interface GeneratedDocument {
  id: string;
  documentNumber: string;
  title: string;
  docType: string; // e.g. "Surat Perintah", "Laporan Situasi", "Telaahan Staf"
  categoryGroup: DocCategoryGroup;
  staffDomain: DocStaffDomain;
  classification: DocClassification;
  priority: DocPriority;
  date: string;
  location: string;
  fromSender: string;
  toRecipient: string;
  perihal: string;
  dasarList: string[];
  tembusanList: string[];
  pesertaList: string[];
  lampiranList: string[];
  maksud: string;
  tujuan: string;
  waktu: string;
  uraianContent: string;
  keterangan: string;
  templateId?: string;
  workflowStage: DocWorkflowStage;
  isFavorite?: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  verifiedBy?: string;
  approvedBy?: string;
  referenceFiles?: string[];
  missingFields?: string[];
  factVerification: {
    verifiedFacts: string[];
    userInputFacts: string[];
    missingFacts: string[];
  };
  comments: DocComment[];
  versions: DocVersion[];
  auditTrail: AuditLogEntry[];
}

