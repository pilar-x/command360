import { 
  DocumentTemplate, 
  GeneratedDocument, 
  DocCategoryGroup, 
  DocStaffDomain 
} from '../types';

export interface DocumentTypeInfo {
  id: string;
  name: string;
  categoryGroup: DocCategoryGroup;
  defaultStaffDomain: DocStaffDomain;
  description: string;
  isFavorite?: boolean;
}

export const ALL_DOCUMENT_TYPES: DocumentTypeInfo[] = [
  // A. SURAT (15 Types)
  { id: 'SURAT_PERINTAH', name: 'Surat Perintah', categoryGroup: 'SURAT', defaultStaffDomain: 'OPERASI', description: 'Surat perintah pelaksanaan tugas atau penggeseran pasukan/personel.', isFavorite: true },
  { id: 'SURAT_TUGAS', name: 'Surat Tugas', categoryGroup: 'SURAT', defaultStaffDomain: 'PERSONEL', description: 'Surat penugasan perorangan/tim untuk melaksanakan misi khusus.' },
  { id: 'SURAT_UNDANGAN', name: 'Surat Undangan', categoryGroup: 'SURAT', defaultStaffDomain: 'PERSONEL', description: 'Undangan resmi kegiatan, upacara, atau pengarahan.' },
  { id: 'SURAT_EDARAN', name: 'Surat Edaran', categoryGroup: 'SURAT', defaultStaffDomain: 'ALL', description: 'Pemberitahuan kebijakan/petunjuk administrasi ke seluruh jajaran.' },
  { id: 'SURAT_PEMBERITAHUAN', name: 'Surat Pemberitahuan', categoryGroup: 'SURAT', defaultStaffDomain: 'ALL', description: 'Pemberitahuan informasi resmi ke instansi luar atau internal.' },
  { id: 'SURAT_PERMOHONAN', name: 'Surat Permohonan', categoryGroup: 'SURAT', defaultStaffDomain: 'LOGISTIK', description: 'Permohonan dukungan dukungan materiil, bekal, atau sarana.' },
  { id: 'SURAT_PENGANTAR', name: 'Surat Pengantar', categoryGroup: 'SURAT', defaultStaffDomain: 'PERSONEL', description: 'Pengantar pengiriman berkas, pendaftaran, atau barang.' },
  { id: 'SURAT_JAWABAN', name: 'Surat Jawaban', categoryGroup: 'SURAT', defaultStaffDomain: 'ALL', description: 'Tanggapan resmi atas surat masuk instansi lain.' },
  { id: 'SURAT_BIASA', name: 'Surat Biasa', categoryGroup: 'SURAT', defaultStaffDomain: 'ALL', description: 'Surat dinas korespondensi rutin harian.' },
  { id: 'NOTA_DINAS', name: 'Nota Dinas', categoryGroup: 'SURAT', defaultStaffDomain: 'ALL', description: 'Komunikasi internal antar Staf/Pejabat dalam Batalyon.', isFavorite: true },
  { id: 'TELEGRAM', name: 'Telegram', categoryGroup: 'SURAT', defaultStaffDomain: 'OPERASI', description: 'Berita dinas cepat/sangat segera via jaringan komunikasi.', isFavorite: true },
  { id: 'MEMORANDUM', name: 'Memorandum', categoryGroup: 'SURAT', defaultStaffDomain: 'ALL', description: 'Catatan ingatan ringkas penyampaian arahan internal.' },
  { id: 'SURAT_KETERANGAN', name: 'Surat Keterangan', categoryGroup: 'SURAT', defaultStaffDomain: 'PERSONEL', description: 'Keterangan resmi status prajurit, kesehatan, atau jabatan.' },
  { id: 'SURAT_REKOMENDASI', name: 'Surat Rekomendasi', categoryGroup: 'SURAT', defaultStaffDomain: 'PERSONEL', description: 'Rekomendasi pendidikan, kenaikan pangkat, atau tugas.' },
  { id: 'SURAT_PERNYATAAN', name: 'Surat Pernyataan', categoryGroup: 'SURAT', defaultStaffDomain: 'ALL', description: 'Pernyataan kesanggupan atau pertanggungjawaban resmi.' },

  // B. LAPORAN (10 Types)
  { id: 'LAPORAN_HARIAN', name: 'Laporan Harian', categoryGroup: 'LAPORAN', defaultStaffDomain: 'OPERASI', description: 'Laporan harian situasi wilayah, personel, dan materiil.' },
  { id: 'LAPORAN_SITUASI', name: 'Laporan Situasi', categoryGroup: 'LAPORAN', defaultStaffDomain: 'INTELIJEN', description: 'Laporan perkembangan situasi intelijen dan keamanan (Lapsit).', isFavorite: true },
  { id: 'LAPORAN_KEGIATAN', name: 'Laporan Kegiatan', categoryGroup: 'LAPORAN', defaultStaffDomain: 'ALL', description: 'Laporan hasil pelaksanaan kegiatan, komsos, atau latihan.', isFavorite: true },
  { id: 'LAPORAN_KHUSUS', name: 'Laporan Khusus', categoryGroup: 'LAPORAN', defaultStaffDomain: 'INTELIJEN', description: 'Laporan insiden menonjol atau kejadian mendesak (Lapkhus).' },
  { id: 'LAPORAN_PELAKSANAAN', name: 'Laporan Pelaksanaan', categoryGroup: 'LAPORAN', defaultStaffDomain: 'TERITORIAL', description: 'Laporan pertanggungjawaban program kerja/proyek.' },
  { id: 'LAPORAN_PERKEMBANGAN', name: 'Laporan Perkembangan', categoryGroup: 'LAPORAN', defaultStaffDomain: 'PERENCANAAN', description: 'Laporan progres pembangunan, ketahanan pangan, atau latihan.' },
  { id: 'LAPORAN_MONITORING', name: 'Laporan Hasil Monitoring', categoryGroup: 'LAPORAN', defaultStaffDomain: 'PENGAWASAN', description: 'Laporan pemantauan lapangan dan pengawasan anggaran.' },
  { id: 'LAPORAN_EVALUASI', name: 'Laporan Evaluasi', categoryGroup: 'LAPORAN', defaultStaffDomain: 'OPERASI', description: 'Evaluasi hasil pelaksanaan program atau latihan posko.' },
  { id: 'LAPORAN_INSIDENTIL', name: 'Laporan Insidentil', categoryGroup: 'LAPORAN', defaultStaffDomain: 'OPERASI', description: 'Laporan kejadian darurat, bencana alam, atau gangguan.' },
  { id: 'EXECUTIVE_SUMMARY', name: 'Executive Summary', categoryGroup: 'LAPORAN', defaultStaffDomain: 'ALL', description: 'Ringkasan eksekutif komando untuk Danyonif / Panglima.', isFavorite: true },

  // C. PRODUK STAF (18 Types)
  { id: 'TELAAHAN_STAF', name: 'Telaahan Staf', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'OPERASI', description: 'Analisis komprehensif masalah beserta alternatif jalan keluar.', isFavorite: true },
  { id: 'KAJIAN_STAF', name: 'Kajian Staf', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'INTELIJEN', description: 'Kajian akademis/militasi terhadap potensi ancaman atau doktrin.' },
  { id: 'SARAN_STAF', name: 'Saran Staf', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'ALL', description: 'Saran tindakan konkret Perwira Staf kepada Komandan.' },
  { id: 'ANALISA_STAF', name: 'Analisa Staf', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'LOGISTIK', description: 'Analisis kebutuhan materiil, personel, atau logistik.' },
  { id: 'PERKIRAAN_STAF', name: 'Perkiraan Staf', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'INTELIJEN', description: 'Perkiraan Intelijen (Kirintel) / Perkiraan Operasi (Kirops).' },
  { id: 'KONSEP_RENCANA', name: 'Konsep Rencana', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'OPERASI', description: 'Konsep awal perencanaan operasi, komsos, atau latihan.' },
  { id: 'RENCANA_KEGIATAN', name: 'Rencana Kegiatan', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'ALL', description: 'Rencana rinci jadwal, sasaran, dan pendukung kegiatan.' },
  { id: 'RENCANA_OPERASI', name: 'Rencana Operasi', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'OPERASI', description: 'Dokumen Renops penanggulangan karhutla / pengamanan wilayah.', isFavorite: true },
  { id: 'RENCANA_LATIHAN', name: 'Rencana Latihan', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'OPERASI', description: 'Renlat Progsi / Latihan Taktis Kompi / Uji Petik.' },
  { id: 'PETUNJUK_PELAKSANAAN', name: 'Petunjuk Pelaksanaan', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'PERENCANAAN', description: 'Juklak arahan pelaksanaan teknis dari Batalyon.' },
  { id: 'PETUNJUK_TEKNIS', name: 'Petunjuk Teknis', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'LOGISTIK', description: 'Juknis pemeliharaan alutsista atau operasional alsintan.' },
  { id: 'SOP', name: 'SOP', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'ALL', description: 'Standard Operating Procedure kesiapan & penanganan darurat.', isFavorite: true },
  { id: 'TOR_KAK', name: 'TOR/KAK', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'PERENCANAAN', description: 'Term of Reference / Kerangka Acuan Kerja pengadaan & program.' },
  { id: 'KERANGKA_ACUAN', name: 'Kerangka Acuan', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'PERENCANAAN', description: 'Kerangka acuan kerja bakti TNI & ketahanan pangan.' },
  { id: 'MATRIKS_KEGIATAN', name: 'Matriks Kegiatan', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'OPERASI', description: 'Matriks sinkronisasi waktu, tempat, dan penanggung jawab.' },
  { id: 'CHECKLIST', name: 'Checklist', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'LOGISTIK', description: 'Daftar periksa kesiapan senjata, amunisi, dan kendaraan.' },
  { id: 'TIMELINE', name: 'Timeline', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'PERENCANAAN', description: 'Jadwal kronologis pelaksanaan kegiatan.' },
  { id: 'JADWAL_KEGIATAN', name: 'Jadwal Kegiatan', categoryGroup: 'PRODUK_STAF', defaultStaffDomain: 'ALL', description: 'Jadwal harian / mingguan kegiatan Batalyon.' },

  // D. RAPAT & KEGIATAN (14 Types)
  { id: 'UNDANGAN_RAPAT', name: 'Undangan Rapat', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'ALL', description: 'Undangan Rapat Evaluasi / Briefing Staf Komando.' },
  { id: 'AGENDA_RAPAT', name: 'Agenda Rapat', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'ALL', description: 'Susunan pembahasan & alokasi waktu rapat.' },
  { id: 'SUSUNAN_ACARA', name: 'Susunan Acara', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'PERSONEL', description: 'Rundown acara upacara, Sertijab, atau kunjungan kerja.' },
  { id: 'NOTULEN', name: 'Notulen', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'ALL', description: 'Catatan ringkas jalannya rapat dan keputusan.' },
  { id: 'RISALAH_RAPAT', name: 'Risalah Rapat', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'ALL', description: 'Transkrip lengkap & berita acara rapat komando.' },
  { id: 'DAFTAR_HADIR', name: 'Daftar Hadir', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'PERSONEL', description: 'Format absensi peserta rapat / gelaran apel.' },
  { id: 'POINTER_PIMPINAN', name: 'Pointer Pimpinan', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'ALL', description: 'Poin penekanan Danyonif / Komandan saat pengarahan.', isFavorite: true },
  { id: 'SAMBUTAN', name: 'Sambutan', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'PERSONEL', description: 'Naskah sambutan Komandan pada acara resmi / bakti sosial.' },
  { id: 'AMANAT', name: 'Amanat', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'PERSONEL', description: 'Amanat Inspektur Upacara pada upacara bendera / purna tugas.' },
  { id: 'TALKING_POINTS', name: 'Talking Points', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'INTELIJEN', description: 'Poin pembicaraan Komandan dengan instansi luar atau media.' },
  { id: 'BAHAN_PAPARAN', name: 'Bahan Paparan', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'OPERASI', description: 'Outline slide paparan kesiapan Batalyon.' },
  { id: 'EXECUTIVE_BRIEF', name: 'Executive Brief', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'ALL', description: 'Brief singkat situasi strategis untuk Komandan Atas.' },
  { id: 'HASIL_EVALUASI', name: 'Hasil Evaluasi', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'PENGAWASAN', description: 'Catatan kekurangan dan tindak lanjut dari rapat evaluasi.' },
  { id: 'RENCANA_TINDAK_LANJUT', name: 'Rencana Tindak Lanjut', categoryGroup: 'RAPAT_KEGIATAN', defaultStaffDomain: 'PERENCANAAN', description: 'Action plan perbaikan pasca rapat evaluasi.' },
];

export const MOCK_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'TMPL-SPRIN-01',
    name: 'Template Standard Surat Perintah Batalyon (Sprint)',
    categoryGroup: 'SURAT',
    staffDomain: 'OPERASI',
    version: 'v2.1',
    effectiveDate: '2026-01-01',
    owner: 'Pasi Ops Batalyon',
    status: 'ACTIVE',
    description: 'Format baku Surat Perintah Mabesad / Kodam / Yonif dengan Kop Resmi, Dasar, Maksud, Pertimbangan, dan Diktum Perintah.',
    defaultKlasifikasi: 'Biasa',
    defaultPrioritas: 'Segera',
    sampleKop: 'KODAM XX/TIB\nBATALYON INFANTERI TP 897/SINGGALANG',
    structureFields: ['Nomor Dokumen', 'Pertimbangan', 'Dasar', 'Diperintahkan Kepada', 'Untuk', 'Selesai']
  },
  {
    id: 'TMPL-LAPSIT-01',
    name: 'Template Laporan Situasi Harian (Lapsit Intel)',
    categoryGroup: 'LAPORAN',
    staffDomain: 'INTELIJEN',
    version: 'v1.5',
    effectiveDate: '2026-03-10',
    owner: 'Pasi Intel Batalyon',
    status: 'ACTIVE',
    description: 'Format standar Laporan Situasi Wilayah, perkembangan cuaca, ancaman, dan komsos masyarakat.',
    defaultKlasifikasi: 'Rahasia',
    defaultPrioritas: 'Segera',
    sampleKop: 'STAF INTELIJEN YONIF TP 897',
    structureFields: ['Nomor Laporan', 'Periode Waktu', 'I. Situasi Wilayah', 'II. Kejadian Menonjol', 'III. Analisa & Prediksi', 'IV. Kesimpulan & Saran']
  },
  {
    id: 'TMPL-TELSTAF-01',
    name: 'Template Telaahan Staf Taktis & Operasional',
    categoryGroup: 'PRODUK_STAF',
    staffDomain: 'OPERASI',
    version: 'v3.0',
    effectiveDate: '2026-02-15',
    owner: 'Sops Batalyon',
    status: 'ACTIVE',
    description: 'Sistematika Telaahan Staf: Persoalan, Pra-anggapan, Fakta yang Mempengaruhi, Analisis Cara Bertindak, Kesimpulan & Saran.',
    defaultKlasifikasi: 'Terbatas',
    defaultPrioritas: 'Biasa',
    sampleKop: 'STAF OPERASI YONIF TP 897/SINGGALANG',
    structureFields: ['Kepada', 'Dari', 'Persoalan', 'Pra-Anggapan', 'Fakta-Fakta', 'Diskusi/Analisis', 'Kesimpulan', 'Saran']
  },
  {
    id: 'TMPL-POINTER-01',
    name: 'Template Pointer Pengarahan Komandan',
    categoryGroup: 'RAPAT_KEGIATAN',
    staffDomain: 'ALL',
    version: 'v1.0',
    effectiveDate: '2026-04-01',
    owner: 'Mayon Batalyon',
    status: 'ACTIVE',
    description: 'Poin-poin penekanan singkat Komandan pada Jam Komandan atau Briefing Staf Mingguan.',
    defaultKlasifikasi: 'Biasa',
    defaultPrioritas: 'Segera',
    sampleKop: 'POINTER PENGARAHAN DANYONIF TP 897',
    structureFields: ['Tanggal Kegiatan', 'Peserta', 'Poin 1: Kesiapsiagaan', 'Poin 2: Disiplin & Moril', 'Poin 3: Ketahanan Pangan', 'Poin 4: Penutup']
  },
  {
    id: 'TMPL-SOP-01',
    name: 'Template SOP Kesiapsiagaan Dan Tanggap Darurat',
    categoryGroup: 'PRODUK_STAF',
    staffDomain: 'ALL',
    version: 'v2.0',
    effectiveDate: '2026-01-15',
    owner: 'Sops & Slog Batalyon',
    status: 'ACTIVE',
    description: 'Format Prosedur Tetap Kesiapsiagaan Batalyon dalam menghadapi ancaman karhutla dan siaga tempur.',
    defaultKlasifikasi: 'Terbatas',
    defaultPrioritas: 'Biasa',
    sampleKop: 'PROSEDUR TETAP YONIF TP 897',
    structureFields: ['Judul SOP', 'Tujuan', 'Ruang Lingkup', 'Referensi', 'Prosedur Kerja', 'Penanggung Jawab']
  }
];

export const INITIAL_GENERATED_DOCUMENTS: GeneratedDocument[] = [
  {
    id: 'DOC-2026-001',
    documentNumber: 'Sprin/ 142 / VII / 2026',
    title: 'Surat Perintah Pelaksanaan Patroli Pengamanan Sektor Barat & Sekat Bakar',
    docType: 'Surat Perintah',
    categoryGroup: 'SURAT',
    staffDomain: 'OPERASI',
    classification: 'Biasa',
    priority: 'Segera',
    date: '30 Juli 2026',
    location: 'Padang',
    fromSender: 'Komandan Batalyon Infanteri TP 897/Singgalang',
    toRecipient: 'Komandan Kompi A Yonif TP 897',
    perihal: 'Pelaksanaan Patroli Sekat Bakar & Komsos Teritorial Sektor Barat',
    dasarList: [
      'Direktif Latihan & Operasi Batalyon Infanteri TP 897/Singgalang TA 2026',
      'Pertimbangan Komando mengenai laporan titik panas di Sektor Barat Agam'
    ],
    tembusanList: [
      'Danrem 032/Wirabraja',
      'Pasi Intel Yonif TP 897',
      'Pasi Log Yonif TP 897'
    ],
    pesertaList: ['1 Tim Taktis Kompi A (12 Prajurit)', '2 Unit Maung Jelajah'],
    lampiranList: ['Peta Rute Patroli Sektor Barat'],
    maksud: 'Memberikan dasar hukum dan petunjuk teknis pelaksanaan patroli pencegahan karhutla.',
    tujuan: 'Mencegah terjadinya kebakaran hutan serta menjaga kemanunggalan TNI dengan masyarakat lokal.',
    waktu: '30 Juli - 05 Agustus 2026',
    uraianContent: `DIPERINTAHKAN:

Kepada:
1. Nama: Abel Maulana Alfian, Pangkat/NRP: Serda / 212001928, Jabatan: Danru 1 Ki-A.
2. Beserta 11 orang anggota Kompi A Yonif TP 897.

Untuk:
1. Melaksanakan Patroli Pencegahan Kebakaran Hutan & Lahan (Karhutla) serta Pembinaan Teritorial di Sektor Barat Lubuk Basung.
2. Mengoordinasikan pembukaan jalur sekat bakar bersama kelompok tani lokal di area 4 Hektar lahan jagung.
3. Melaporkan perkembangan situasi berkala setiap pukul 06.00 WIB dan 18.00 WIB kepada Pasi Ops Batalyon.
4. Melaksanakan perintah ini dengan penuh rasa tanggung jawab dan memperhatikan faktor keamanan personel maupun materiil.`,
    keterangan: 'Dokumen ini dibuat menggunakan AI Document Generator COMMAND360 dan telah diverifikasi oleh Pasi Ops.',
    templateId: 'TMPL-SPRIN-01',
    workflowStage: 'APPROVED',
    isFavorite: true,
    createdBy: 'Letda Inf Jonathan Isa (Ws. Pasi Ops)',
    createdAt: '2026-07-29 14:20:00',
    updatedAt: '2026-07-30 08:15:00',
    verifiedBy: 'Kapten Inf Yulianto (Wadanyonif)',
    approvedBy: 'Letkol Inf Saor J. Lumbanbatu (Danyonif)',
    factVerification: {
      verifiedFacts: ['Nama Serda Abel Maulana Alfian verified in DSPP', 'Maung Jelajah 2 Unit ready in Logistik', 'Sektor Barat Agam matches territorial map'],
      userInputFacts: ['Durasi patroli 30 Juli - 05 Agustus 2026'],
      missingFacts: []
    },
    comments: [
      {
        id: 'CMT-01',
        user: 'Kapten Inf Yulianto',
        role: 'Wadanyonif',
        timestamp: '2026-07-29 16:00',
        comment: 'Redaksi dasar nomor 1 sudah sesuai direktif. Dapat dilanjutkan persetujuan Danyon.',
        resolved: true
      }
    ],
    versions: [
      {
        version: 1,
        editedBy: 'Letda Inf Jonathan Isa',
        role: 'Ws. Pasi Ops',
        timestamp: '2026-07-29 14:20',
        summary: 'Draft awal dihasilkan oleh AI dari parameter kegiatan',
        content: 'Draft Awal Surat Perintah...'
      },
      {
        version: 2,
        editedBy: 'Kapten Inf Yulianto',
        role: 'Wadanyonif',
        timestamp: '2026-07-29 16:00',
        summary: 'Koreksi penambahan Maung Jelajah dan nama Danru',
        content: 'Draft Final Surat Perintah...'
      }
    ],
    auditTrail: [
      { timestamp: '2026-07-29 14:20:00', user: 'Ws. Pasi Ops', action: 'Membuat draft menggunakan AI Document Generator' },
      { timestamp: '2026-07-29 16:00:00', user: 'Wadanyonif', action: 'Memverifikasi dokumen & menandai persetujuan' },
      { timestamp: '2026-07-30 08:15:00', user: 'Danyonif', action: 'Menyetujui Surat Perintah (APPROVED)' }
    ]
  },

  {
    id: 'DOC-2026-002',
    documentNumber: 'Lapsit/ 88 / VII / 2026/ Intel',
    title: 'Laporan Situasi Perkembangan Keamanan & Gejolak Sosial Sektor Timur',
    docType: 'Laporan Situasi',
    categoryGroup: 'LAPORAN',
    staffDomain: 'INTELIJEN',
    classification: 'Rahasia',
    priority: 'Segera',
    date: '30 Juli 2026',
    location: 'Padang',
    fromSender: 'Pasi Intel Batalyon Infanteri TP 897',
    toRecipient: 'Danyonif TP 897/Singgalang',
    perihal: 'Laporan Situasi Perkembangan Keamanan & Wilayah Binaan',
    dasarList: [
      'Program Kerja Staf Intelijen Yonif TP 897 TA 2026',
      'Laporan Informasi Lapangan Pos Babinsa Sektor Timur tanggal 29 Juli 2026'
    ],
    tembusanList: ['Asintel Kasdam XX/TIB', 'Wadanyonif TP 897'],
    pesertaList: ['Jajaran Unit Intel Yonif TP 897'],
    lampiranList: ['Matriks Analisa Potensi Kerawanan Wilayah'],
    maksud: 'Melaporkan kondisi keamanan wilayah binaan dan dinamika sosial teritorial.',
    tujuan: 'Sebagai bahan pertimbangan Komandan dalam mengambil keputusan pergeseran siaga.',
    waktu: '29 - 30 Juli 2026',
    uraianContent: `I. SITUASI WILAYAH:
1. Secara umum situasi di wilayah Binaan Yonif TP 897 dalam keadaan aman dan terkendali.
2. Cuaca cerah berawan, kelembaban udara normal, jalur transportasi darat lancar.

II. KEJADIAN MENONJOL:
1. Pada tanggal 29 Juli 2026 pukul 19.30 WIB, telah dilaksanakan musyawarah adat pembukaan lahan kelompok tani di Kec. Lubuk Basung berjalan kondusif.
2. Tidak ditemukan indikasi gerakan intoleran maupun penyusupan di area pangkalan Yonif TP 897.

III. ANALISA & PREDIKSI:
Diperkirakan 3 hari ke depan tingkat partisipasi warga dalam program Ketahanan Pangan Batalyon akan meningkat pesat.

IV. SARAN:
Agar Staf Teritorial meningkatkan pendampingan alsintan cultivator di lokasi penanaman jagung.`,
    keterangan: 'Lapsit Intelijen berkala dikirim ke Command Center.',
    templateId: 'TMPL-LAPSIT-01',
    workflowStage: 'REVIEW',
    isFavorite: true,
    createdBy: 'Ws. Letda Inf Hasrul (Pasi Intel)',
    createdAt: '2026-07-30 06:30:00',
    updatedAt: '2026-07-30 07:00:00',
    factVerification: {
      verifiedFacts: ['Musyawarah adat 29 Juli verified', 'Cuaca cerah berawan'],
      userInputFacts: ['Prediksi partisipasi warga 3 hari ke depan'],
      missingFacts: []
    },
    comments: [
      {
        id: 'CMT-02',
        user: 'Ws. Letda Inf Hasrul',
        role: 'Pasi Intel',
        timestamp: '2026-07-30 07:00',
        comment: 'Mohon masukan Wadan untuk poin analisis keamanan pangkalan.',
        resolved: false
      }
    ],
    versions: [
      {
        version: 1,
        editedBy: 'Ws. Letda Inf Hasrul',
        role: 'Pasi Intel',
        timestamp: '2026-07-30 06:30',
        summary: 'Draft awal Lapsit hasil olah data AI',
        content: 'Draft Lapsit...'
      }
    ],
    auditTrail: [
      { timestamp: '2026-07-30 06:30:00', user: 'Pasi Intel', action: 'Mengumpulkan data Lapsit & Generate AI Draft' },
      { timestamp: '2026-07-30 07:00:00', user: 'Pasi Intel', action: 'Mengajukan review ke Wadanyonif (REVIEW)' }
    ]
  },

  {
    id: 'DOC-2026-003',
    documentNumber: 'Telstaf/ 19 / VII / 2026/ Ops',
    title: 'Telaahan Staf Optimalisasi Pemanfaatan 114 Unit Alkapsus Pertanian Dalam Pembinaan TP',
    docType: 'Telaahan Staf',
    categoryGroup: 'PRODUK_STAF',
    staffDomain: 'OPERASI',
    classification: 'Terbatas',
    priority: 'Biasa',
    date: '28 Juli 2026',
    location: 'Padang',
    fromSender: 'Ws. Pasi Ops Batalyon Infanteri TP 897',
    toRecipient: 'Danyonif TP 897/Singgalang',
    perihal: 'Telaahan Staf Kesiapan Alkapsus Pertanian & Jadwal Rotasi Penggunaan',
    dasarList: [
      'Instruksi Panglima Kodam XX/TIB tentang Optimalisasi 5 Pilar Teritorial Pembangunan',
      'Data Inventaris Alkapsus Pertanian Yonif TP 897 (114 Unit Alkapsus Tani Ready)'
    ],
    tembusanList: ['Wadanyonif TP 897', 'Pasi Log Yonif TP 897', 'Danki Tani Yonif TP 897'],
    pesertaList: ['Staf Ops & Danki Tani'],
    lampiranList: ['Tabel Alokasi Cultivator, Mesin Perontok Padi & Pompa Air'],
    maksud: 'Menyampaikan saran tindak optimalisasi pengoperasian alsintan bantuan.',
    tujuan: 'Meningkatkan hasil panen jagung 8 Ha dan efisiensi waktu olah tanah.',
    waktu: 'Agustus - Oktober 2026',
    uraianContent: `1. PERSOALAN:
Bagaimana mengoptimalkan pengoperasian 3 Unit Cultivator, 6 Mesin Perontok Padi, dan 10 Mesin Pompa Air agar tidak terjadi penumpukan pemakaian di Kompi Tani.

2. PRA-ANGGAPAN:
Apabila rotasi unit alsintan diatur secara terjadwal per sektor 2 Hektar, maka efisiensi olah tanah meningkat 40%.

3. FAKTA YANG MEMPENGARUHI:
a. Batalyon memiliki 114 Unit total Alkapsus Pertanian dalam kondisi 100% Baik.
b. Lahan jagung seluas 8 Ha membutuhkan pengairan intensif 2x seminggu.

4. ANALISIS CARA BERTINDAK:
- Cara Bertindak A: Membagi unit alsintan secara permanen di masing-masing Kompi A, B, C.
- Cara Bertindak B: Memusatkan Alsintan di bawah Pengawasan Kompi Tani dengan sistem sewa pakai Batalyon.

5. KESIMPULAN:
Cara Bertindak B lebih menjamin pemeliharaan rutin dan usia pakai mesin.

6. SARAN:
Agar Danyonif menyetujui penerbitan SOP Pemeliharaan & Rotasi Alsintan Kompi Tani.`,
    keterangan: 'Telaahan Staf Operasi dalam tahap verifikasi.',
    templateId: 'TMPL-TELSTAF-01',
    workflowStage: 'VERIFIED',
    isFavorite: true,
    createdBy: 'Ws. Letda Inf Jonathan Isa',
    createdAt: '2026-07-28 10:00:00',
    updatedAt: '2026-07-29 11:30:00',
    verifiedBy: 'Kapten Inf Yulianto (Wadanyonif)',
    factVerification: {
      verifiedFacts: ['114 Unit Alkapsus Pertanian confirmed', '8 Ha Lahan Tani verified'],
      userInputFacts: ['Proyeksi efisiensi 40%'],
      missingFacts: []
    },
    comments: [],
    versions: [
      {
        version: 1,
        editedBy: 'Ws. Letda Inf Jonathan Isa',
        role: 'Ws. Pasi Ops',
        timestamp: '2026-07-28 10:00',
        summary: 'Penyusunan Telaahan Staf AI Assistant',
        content: 'Draft Telstaf...'
      }
    ],
    auditTrail: [
      { timestamp: '2026-07-28 10:00:00', user: 'Ws. Pasi Ops', action: 'Membuat Telaahan Staf' },
      { timestamp: '2026-07-29 11:30:00', user: 'Wadanyonif', action: 'Memverifikasi Telaahan Staf (VERIFIED)' }
    ]
  },

  {
    id: 'DOC-2026-004',
    documentNumber: 'Ptr/ 05 / VII / 2026/ Mayon',
    title: 'Pointer Pengarahan Danyonif Pada Jam Komandan - Evaluasi Triwulan II',
    docType: 'Pointer Pimpinan',
    categoryGroup: 'RAPAT_KEGIATAN',
    staffDomain: 'ALL',
    classification: 'Biasa',
    priority: 'Segera',
    date: '25 Juli 2026',
    location: 'Aula Batalyon TP 897',
    fromSender: 'Komandan Batalyon Infanteri TP 897',
    toRecipient: 'Prajurit & Persit Yonif TP 897/Singgalang',
    perihal: 'Pointer Jam Komandan & Penekanan Kesiapsiagaan Satuan',
    dasarList: [
      'Kalender Kegiatan Batalyon Infanteri TP 897 Bulan Juli 2026'
    ],
    tembusanList: [],
    pesertaList: ['Seluruh Perwira, Bintara, Tamtama & Persit Yonif TP 897'],
    lampiranList: [],
    maksud: 'Petunjuk dan penekanan Komandan mengenai disiplin, ketahanan pangan, dan prestasi.',
    tujuan: 'Menjaga moril dan kesiap-siagaan prajurit Yonif TP 897.',
    waktu: '25 Juli 2026, 08.00 WIB',
    uraianContent: `POIN PENEKANAN DANYONIF:

1. KESIAPSIAGAAN SATUAN & DISIPLIN:
- Jaga netralitas dan tingkatkan kewaspadaan di seluruh pos jagaan Batalyon.
- Laksanakan pemeriksaan berkala alut dan perorangan (ARQ 160 sebanyak 649 pucuk dalam kondisi aman).

2. PEMBINAAN KETAHANAN PANGAN & 5 PILAR TP:
- Apresiasi kepada Kompi Tani dan Ternak atas pemeliharaan 321 ekor ternak dan 8 Ha lahan jagung & singkong.
- Pertahankan sinergi dengan masyarakat sekitar pangkalan.

3. PRESTASI OLAHRAGA & PRAPOS:
- Ucapan selamat kepada Serda Maikel Simarmata dan Serda Asael Ginting atas perolehan Juara Run 5K Padang & Payakumbuh.
- Jadikan prestasi atlet sebagai motivasi bagi seluruh prajurit.

4. KESIMPULAN & PENUTUP:
Tingkatkan ketakwaan kepada Tuhan Yang Maha Esa dan pegang teguh Sapta Marga, Sumpah Prajurit, dan 8 Wajib TNI.`,
    keterangan: 'Pointer Pimpinan telah disetujui dan siap didistribusikan.',
    templateId: 'TMPL-POINTER-01',
    workflowStage: 'FINAL',
    isFavorite: true,
    createdBy: 'Pasi Pers Yonif TP 897',
    createdAt: '2026-07-25 07:00:00',
    updatedAt: '2026-07-25 08:00:00',
    verifiedBy: 'Wadanyonif TP 897',
    approvedBy: 'Danyonif TP 897',
    factVerification: {
      verifiedFacts: ['Prestasi atlet Serda Maikel & Serda Asael verified', '649 Pucuk ARQ 160 confirmed'],
      userInputFacts: [],
      missingFacts: []
    },
    comments: [],
    versions: [
      {
        version: 1,
        editedBy: 'Pasi Pers',
        role: 'Pasi Pers',
        timestamp: '2026-07-25 07:00',
        summary: 'Final Pointer Pengarahan Komandan',
        content: 'Pointer Pengarahan...'
      }
    ],
    auditTrail: [
      { timestamp: '2026-07-25 07:00:00', user: 'Pasi Pers', action: 'Membuat pointer pimpinan' },
      { timestamp: '2026-07-25 08:00:00', user: 'Danyonif', action: 'Finalisasi & Pengesahan Pointer (FINAL)' }
    ]
  }
];
