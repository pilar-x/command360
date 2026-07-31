import { 
  AlertNotification, 
  CommandDirectiveTask, 
  PersonnelRecord, 
  MaterialAsset, 
  IntelIncident, 
  StaffReport, 
  ExecutiveBriefData 
} from '../types';

export const mockExecutiveData: ExecutiveBriefData = {
  readinessScore: 84.0,
  personnelPercent: 87.0,
  logisticsPercent: 79.0,
  opsPercent: 86.0,
  criticalAlertCount: 4,
  warningAlertCount: 6,
  advisoryCount: 10,
  infoCount: 25,
  activeDirectives: 18,
  completedDirectives: 12,
  overdueDirectives: 2,
};

export const mockNotifications: AlertNotification[] = [
  {
    id: 'ALT-001',
    title: 'Kekurangan Senjata Organik dari Nyata Personel',
    message: 'ARQ-160 kurang 21 pucuk & Pistol kurang 4 pucuk dari kebutuhan nyata personel Yonif TP 897.',
    level: 'CRITICAL',
    staff: 'LOGISTIK',
    timestamp: '10 Menit lalu',
    status: 'UNREAD',
    clearance: 'RAHASIA',
    actionRequired: 'Koordinasi dengan Slogdam & optimalkan pemanfaatan senjata yang ada.',
  },
  {
    id: 'ALT-002',
    title: 'Kelangkaan BBM Solar untuk Operasional Ranmor',
    message: 'BBM jenis Solar langka di wilayah Lubuk Basung / Agam untuk operasional truk dan kendaraan dinas.',
    level: 'CRITICAL',
    staff: 'LOGISTIK',
    timestamp: '25 Menit lalu',
    status: 'UNREAD',
    clearance: 'RAHASIA',
    actionRequired: 'Gunakan alokasi swadaya satuan & ajukan kuota khusus.',
  },
  {
    id: 'ALT-003',
    title: 'Biaya Listrik MA Membengkak akibat Charger Motor Listrik',
    message: 'Pengisian daya 30 unit motor listrik menyebabkan lonjakan beban daya dan biaya listrik di Makoyon.',
    level: 'WARNING',
    staff: 'LOGISTIK',
    timestamp: '1 Jam lalu',
    status: 'ACKNOWLEDGED',
    clearance: 'BIASA',
    actionRequired: 'Koordinasi dengan Denzibang terkait penataan kelistrikan MA.',
  },
  {
    id: 'ALT-004',
    title: 'Antisipasi Banjir Musim Hujan di Area MA YONIF 897',
    message: 'Curah hujan tinggi berpotensi genangan di Makoyon Lubuk Basung Agam.',
    level: 'WARNING',
    staff: 'OPERASI',
    timestamp: '2 Jam lalu',
    status: 'ACKNOWLEDGED',
    clearance: 'BIASA',
    actionRequired: 'Pembuatan saluran pembuangan air dan tanggul penahan air.',
  },
  {
    id: 'ALT-005',
    title: 'Progres Pembangunan Batalyon Tahap I Capai 33,896%',
    message: 'Pekerjaan fisik oleh PT Biru Sistem Perkasa & Konsultan PT Gapa Wirasindo berjalan 210 hari kalender.',
    level: 'INFO',
    staff: 'LOGISTIK',
    timestamp: '3 Jam lalu',
    status: 'RESOLVED',
    clearance: 'BIASA',
  },
];

export const mockDirectives: CommandDirectiveTask[] = [
  {
    id: 'TSK-101',
    title: 'Latkadertih Tersebar & Peningkatan Kualifikasi Pelatih',
    arahanPimpinan: 'Guna mengatasi keterbatasan kader pelatih, laksanakan Latkadertih secara tersebar di setiap kompi.',
    disposisi: 'Pasi Opslat',
    picUnit: 'YONIF TP 897/Singgalang',
    deadline: '2026-08-15',
    priority: 'TINGGI',
    progress: 75,
    status: 'DALAM_PROSES',
    followUpHistory: [
      { date: '2026-07-28', note: 'Kurikulum Latkadertih disetujui Danyonif', author: 'Ws. Letda Inf Jonathan Isa' },
      { date: '2026-07-29', note: 'Pelaksanaan tahap I di Ki Markas & Ki A', author: 'Dan Satgas' }
    ]
  },
  {
    id: 'TSK-102',
    title: 'Pengurusan Sertifikat Lahan Batalyon ke ATR/BPN',
    arahanPimpinan: 'Segera koordinasikan dengan Pihak ATR/BPN Kabupaten Agam untuk percepatan sertifikasi lahan.',
    disposisi: 'Pasi Log & Pasi Ter',
    picUnit: 'Slog & Ster Yonif TP 897',
    deadline: '2026-08-30',
    priority: 'TINGGI',
    progress: 50,
    status: 'DALAM_PROSES',
    evidence: 'Surat Permohonan Sertifikasi No. B/312/VII/2026',
    followUpHistory: [
      { date: '2026-07-25', note: 'Pengukuran batas lahan 4 Ha jagung & site plan pangkalan', author: 'Pasi Log' }
    ]
  },
  {
    id: 'TSK-103',
    title: 'Pembangunan Barak Tambahan & Rumah Tipe F 45 Tahap 1',
    arahanPimpinan: 'Ajukan usulan pembangunan barak tambahan dan rumah Tipe F 45 untuk Perwira dan Anggota.',
    disposisi: 'Pasi Log',
    picUnit: 'Kompi Zeni/Konstruksi',
    deadline: '2026-09-10',
    priority: 'SEDANG',
    progress: 35,
    status: 'DALAM_PROSES',
    followUpHistory: [
      { date: '2026-07-27', note: 'Draf proposal site plan disiapkan untuk Komando Atas', author: 'Ws. Letda Czi R Chaniago' }
    ]
  }
];

export const mockPersonnel: PersonnelRecord[] = [
  {
    id: 'PRS-001',
    nrp: '11060293810',
    nama: 'Letkol Inf Saor J. Lumbanbatu',
    pangkat: 'Letkol',
    jabatan: 'Danyonif TP 897/Singgalang',
    satuan: 'Mayonif TP 897',
    statusKehadiran: 'HADIR',
    kualifikasi: ['Komando', 'Para Utama', 'Seskoad'],
    clearance: 'SANGAT RAHASIA',
    pendidikan: 'Akmil 2005',
    masaDinasYears: 21,
  },
  {
    id: 'PRS-002',
    nrp: '11120382911',
    nama: 'Kapten Inf Yulianto Yose I L',
    pangkat: 'Kapten',
    jabatan: 'Wadanyonif TP 897/Singgalang',
    satuan: 'Mayonif TP 897',
    statusKehadiran: 'HADIR',
    kualifikasi: ['Infanteri', 'Para Dasar', 'Tar Raider'],
    clearance: 'RAHASIA',
    pendidikan: 'Akmil 2012',
    masaDinasYears: 14,
  },
  {
    id: 'PRS-003',
    nrp: '11200481922',
    nama: 'Ws. Letda Inf Hasrul',
    pangkat: 'Letda',
    jabatan: 'Pasi Intel',
    satuan: 'Staf Intel Yonif TP 897',
    statusKehadiran: 'HADIR',
    kualifikasi: ['Dikpaintel', 'Pengamanan Teritorial'],
    clearance: 'RAHASIA',
    pendidikan: 'Secapa 2021',
    masaDinasYears: 12,
  },
  {
    id: 'PRS-004',
    nrp: '11210582933',
    nama: 'Ws. Letda Inf Jonathan Isa',
    pangkat: 'Letda',
    jabatan: 'Pasi Opslat',
    satuan: 'Staf Ops Yonif TP 897',
    statusKehadiran: 'HADIR',
    kualifikasi: ['Dikpaintel', 'Pertempuran Hutan'],
    clearance: 'RAHASIA',
    pendidikan: 'Secapa 2022',
    masaDinasYears: 10,
  },
  {
    id: 'PRS-005',
    nrp: '11220683944',
    nama: 'Ws. Letda Cke M Bintang Ihsan R',
    pangkat: 'Letda',
    jabatan: 'Pasi Pers',
    satuan: 'Staf Pers Yonif TP 897',
    statusKehadiran: 'HADIR',
    kualifikasi: ['Dik Pa Komlek', 'Manajemen Personel'],
    clearance: 'RAHASIA',
    pendidikan: 'Secapa 2022',
    masaDinasYears: 9,
  },
  {
    id: 'PRS-006',
    nrp: '11220683955',
    nama: 'Ws. Letda Cba Viradarma',
    pangkat: 'Letda',
    jabatan: 'Pasi Log',
    satuan: 'Staf Log Yonif TP 897',
    statusKehadiran: 'HADIR',
    kualifikasi: ['Pembekalan Angkutan', 'SIMAK BMN'],
    clearance: 'TERBATAS',
    pendidikan: 'Secapa 2023',
    masaDinasYears: 8,
  }
];

export const mockMaterialAssets: MaterialAsset[] = [
  {
    id: 'MAT-001',
    kodeInventaris: 'INV-SEN-556-01',
    namaBarang: 'Senapan Serbu SS2-V4 5.56mm',
    kategori: 'SENJATA_AMUNISI',
    jumlah: 1250,
    satuanUnit: 'Pucuk',
    kondisiBaik: 1180,
    kondisiRusakRingan: 50,
    kondisiRusakBerat: 20,
    lokasiGudang: 'Gudang Senjata Utama',
    statusMaintenance: 'SANGAT_BAIK',
  },
  {
    id: 'MAT-002',
    kodeInventaris: 'INV-RAN-ANOA-02',
    namaBarang: 'Panser Anoa 6x6 APC',
    kategori: 'VEHICLE',
    jumlah: 18,
    satuanUnit: 'Unit',
    kondisiBaik: 15,
    kondisiRusakRingan: 2,
    kondisiRusakBerat: 1,
    lokasiGudang: 'Garasi Ranmor Mekanis',
    statusMaintenance: 'PERLU_SERVIS',
  },
  {
    id: 'MAT-003',
    kodeInventaris: 'INV-BEK-BBM-D',
    namaBarang: 'BBM Pertamina Dex (Cadangan Operasional)',
    kategori: 'BEKAL',
    jumlah: 45000,
    satuanUnit: 'Liter',
    kondisiBaik: 45000,
    kondisiRusakRingan: 0,
    kondisiRusakBerat: 0,
    lokasiGudang: 'Tangki Timbun Bekang',
    statusMaintenance: 'SANGAT_BAIK',
  },
  {
    id: 'MAT-004',
    kodeInventaris: 'INV-KOM-TACTICAL-04',
    namaBarang: 'Radio Tactical Manpack HF/VHF Encrypted',
    kategori: 'KOMUNIKASI',
    jumlah: 120,
    satuanUnit: 'Set',
    kondisiBaik: 105,
    kondisiRusakRingan: 10,
    kondisiRusakBerat: 5,
    lokasiGudang: 'Gudang Komunikasi Hubdam',
    statusMaintenance: 'SANGAT_BAIK',
  },
];

export const mockIncidents: IntelIncident[] = [
  {
    id: 'INC-2026-001',
    kodeKejadian: 'KEJ-INTEL-089',
    judul: 'Titik Hotspot Karhutla Sektor Kabupaten Kampar',
    lokasi: 'Kabupaten Kampar, Riau',
    coordinates: [0.334, 101.025],
    kategori: 'KARHUTLA',
    tingkatAncaman: 'TINGGI',
    sumber: 'Satelit LAPAN & Laporan Babinsa',
    waktuKejadian: '2026-07-29 14:30',
    ringkasan: 'Ditemukan luasan lahan terbakar ±12 Hektar dekat kawasan hutan lindung. Kecepatan angin 18 knot ke arah Barat Daya.',
    clearance: 'RAHASIA',
  },
  {
    id: 'INC-2026-002',
    kodeKejadian: 'KEJ-INTEL-090',
    judul: 'Aktivitas Unjuk Rasa Isu Ketenagakerjaan Objek Vital',
    lokasi: 'Kawasan Industri Pelabuhan Dumai',
    coordinates: [1.681, 101.449],
    kategori: 'SECURITY',
    tingkatAncaman: 'SEDANG',
    sumber: 'Unit Intel Kodim & Open Source',
    waktuKejadian: '2026-07-29 09:00',
    ringkasan: 'Massa ±300 orang berkumpul di depan pintu gerbang pelabuhan. Situasi terkendali oleh pengamanan gabungan.',
    clearance: 'TERBATAS',
  },
  {
    id: 'INC-2026-003',
    kodeKejadian: 'KEJ-INTEL-091',
    judul: 'Perkembangan Tinggi Muka Air Sungai Siak',
    lokasi: 'Kecamatan Tenayan Raya, Pekanbaru',
    coordinates: [0.531, 101.447],
    kategori: 'BENCANA',
    tingkatAncaman: 'RENDAH',
    sumber: 'Monitoring BPBD & Staf Intel',
    waktuKejadian: '2026-07-29 16:00',
    ringkasan: 'Tinggi muka air berada pada status Siaga III (Waspada). Belum meluap ke pemukiman warga.',
    clearance: 'BIASA',
  },
];

export const mockReports: StaffReport[] = [
  {
    id: 'REP-INT-001',
    judul: 'Laporan Harian Perkembangan Situasi Wilayah (Laphid)',
    staff: 'INTELIJEN',
    jenis: 'HARIAN',
    tanggal: '2026-07-29',
    pembuat: 'Kasi Intel Korem',
    status: 'DISETUJUI',
    clearance: 'RAHASIA',
    ringkasanContent: 'Situasi umum wilayah Kodam kondusif. Pemantauan intensif dilakukan terhadap potensi karhutla dan stabilitas objek vital.',
  },
  {
    id: 'REP-OPS-002',
    judul: 'Laporan Kesiapsiagaan Satuan Penindak & Gladi Latihan',
    staff: 'OPERASI',
    jenis: 'MINGGUAN',
    tanggal: '2026-07-28',
    pembuat: 'Pabandya Ops',
    status: 'DISETUJUI',
    clearance: 'RAHASIA',
    ringkasanContent: 'Kesiapan Operasional Satuan berada pada tingkat 92.4%. Gladi Posko I Yonif Mekanis diselesaikan dengan predikat Sangat Baik.',
  },
  {
    id: 'REP-PRS-003',
    judul: 'Rekapitulasi Kekuatan Personel & DSPP Bulan Juli 2026',
    staff: 'PERSONEL',
    jenis: 'BULANAN',
    tanggal: '2026-07-25',
    pembuat: 'Pabandya Spers',
    status: 'DISETUJUI',
    clearance: 'BIASA',
    ringkasanContent: 'DSPP total 1.250 orang, Riil 1.180 orang (94.4%). Terjadi pengisian 12 jabatan kosong tingkat Perwira Pertama.',
  },
  {
    id: 'REP-LOG-004',
    judul: 'Laporan Khusus Kelayakan Alutsista & Amunisi Gudang Bekang',
    staff: 'LOGISTIK',
    jenis: 'KHUSUS',
    tanggal: '2026-07-29',
    pembuat: 'Pabandya Slog',
    status: 'MENUNGGU_VERIFIKASI',
    clearance: 'RAHASIA',
    ringkasanContent: 'Evaluasi kesiapan materiil menunjukkan 91.2% kendaraan tempur dalam kondisi Siap Pakai. Diperlukan pengajuan peremajaan amunisi cadangan.',
  }
];

export const mockSystemStatus = {
  serverHealth: 'OPTIMAL (99.98% Uptime)',
  activeConnections: 142,
  databaseLatency: '4ms',
  apiStatus: 'ONLINE',
  storageUsage: '42.8 GB / 500 GB (8.5%)',
  mfaEnforcement: 'AKTIF',
  lastBackupTime: '2026-07-29 02:00:00',
};

export const mockStaffDataRecords: import('../types').StaffDataRecord[] = [
  {
    id: 'REC-2026-001',
    title: 'Deteksi Karhutla Lahan Gambut Sektor Jambi Selatan',
    staffCategory: 'INTELIJEN',
    subCategory: 'KEJADIAN',
    date: '2026-07-29',
    time: '10:45',
    region: 'Jambi',
    locationName: 'Jambi Selatan, Prov. Jambi',
    lat: -1.61,
    lng: 103.61,
    description: 'Terdeteksi 14 titik panas baru dengan intensitas radiasi tinggi. Diperlukan tindakan sekat bakar dan pemadaman udara.',
    priority: 'KRITIS',
    status: 'ACTIVE',
    classification: 'RAHASIA',
    workflowStatus: 'SUBMITTED',
    submittedBy: 'Kapt Inf Sutrisno (Operator Intel)',
    submittedAt: '2026-07-29 10:45 WIB',
    auditTrail: [
      { timestamp: '2026-07-29 10:30 WIB', user: 'Kapt Inf Sutrisno', action: 'Draft Dibuat' },
      { timestamp: '2026-07-29 10:45 WIB', user: 'Kapt Inf Sutrisno', action: 'Diajukan untuk Verifikasi' }
    ]
  },
  {
    id: 'REC-2026-002',
    title: 'Latihan Pengamanan Obvitnas Kilang Pertamina Balikpapan',
    staffCategory: 'OPERASI',
    subCategory: 'KEGIATAN',
    date: '2026-07-30',
    time: '08:00',
    region: 'Kalimantan Timur',
    locationName: 'Balikpapan, Kaltim',
    lat: -1.2379,
    lng: 116.8529,
    description: 'Latihan Gladi Lapangan Simulasi Penanggulangan Unjuk Rasa dan Serangan Siber pada Obvitnas Kilang Minyak.',
    priority: 'TINGGI',
    status: 'PLANNED',
    classification: 'TERBATAS',
    workflowStatus: 'VERIFIED',
    submittedBy: 'Mayor Inf Rudi (Pasi Ops)',
    submittedAt: '2026-07-29 09:15 WIB',
    verifiedBy: 'Kolonel Inf Ahmad (Asops)',
    verifiedAt: '2026-07-29 10:00 WIB',
    auditTrail: [
      { timestamp: '2026-07-29 09:00 WIB', user: 'Mayor Inf Rudi', action: 'Draft Dibuat' },
      { timestamp: '2026-07-29 09:15 WIB', user: 'Mayor Inf Rudi', action: 'Diajukan untuk Verifikasi' },
      { timestamp: '2026-07-29 10:00 WIB', user: 'Kolonel Inf Ahmad', action: 'Terverifikasi' }
    ]
  },
  {
    id: 'REC-2026-003',
    title: 'Pengawasan Alur Laut Pesisir Natuna Utara',
    staffCategory: 'OPERASI',
    subCategory: 'KEGIATAN',
    date: '2026-07-29',
    time: '11:00',
    region: 'Kepulauan Riau',
    locationName: 'Kepulauan Natuna',
    lat: 3.9,
    lng: 108.2,
    description: 'Patroli rutin pengawasan wilayah perbatasan maritim dan pencegahan pelanggaran kedaulatan laut.',
    priority: 'TINGGI',
    status: 'ACTIVE',
    classification: 'RAHASIA',
    workflowStatus: 'PUBLISHED',
    submittedBy: 'Letkol Laut Hendra',
    submittedAt: '2026-07-29 08:30 WIB',
    verifiedBy: 'Kolonel Inf Ahmad',
    verifiedAt: '2026-07-29 09:00 WIB',
    publishedBy: 'Komandan Korem',
    publishedAt: '2026-07-29 09:30 WIB',
    auditTrail: [
      { timestamp: '2026-07-29 08:30 WIB', user: 'Letkol Laut Hendra', action: 'Diajukan' },
      { timestamp: '2026-07-29 09:00 WIB', user: 'Kolonel Inf Ahmad', action: 'Terverifikasi' },
      { timestamp: '2026-07-29 09:30 WIB', user: 'Komandan Korem', action: 'Diterbitkan ke Command Map' }
    ]
  },
  {
    id: 'REC-2026-004',
    title: 'Pengajuan Tambahan Alokasi Perbekalan Logistik Amunisi 5.56mm',
    staffCategory: 'LOGISTIK',
    subCategory: 'MATERIIL',
    date: '2026-07-28',
    time: '14:20',
    region: 'Jawa Timur',
    locationName: 'Gudang Logistik Surabaya',
    lat: -7.2575,
    lng: 112.7521,
    description: 'Laporan kekurangan bekal amunisi akibat penyesuaian intensitas latihan semester II.',
    priority: 'SEDANG',
    status: 'LIMITED',
    classification: 'TERBATAS',
    workflowStatus: 'RETURNED',
    submittedBy: 'Kapten Cpl Dian (Operator Slog)',
    submittedAt: '2026-07-28 14:20 WIB',
    revisionNote: 'Lengkapi dengan rincian nomor surat keputusan latihan dan otorisasi Danyonif.',
    auditTrail: [
      { timestamp: '2026-07-28 14:20 WIB', user: 'Kapten Cpl Dian', action: 'Diajukan' },
      { timestamp: '2026-07-28 16:00 WIB', user: 'Aslog Kasdam', action: 'Dikembalikan untuk Revisi', note: 'Lengkapi dengan rincian nomor surat keputusan latihan dan otorisasi Danyonif.' }
    ]
  }
];

export interface KomsosLeaderItem {
  id: string;
  namaTokoh: string;
  jabatanRole: string;
  wilayahBinaan: string;
  satuanPembina: string;
  statusJaringan: 'AKTIF' | 'SANGAT_DEKAT' | 'MONITORING';
  kontakRingkasan: string;
  terakhirSilaturahmi: string;
  keterangan: string;
}

export interface BaktiTniProjectItem {
  id: string;
  namaKegiatan: string;
  kategori: 'KARYA_BAKTI' | 'TMMD' | 'PENGOBATAN_GRATIS' | 'BANTUAN_BENCANA' | 'PEMBERDAYAAN_TANI';
  lokasi: string;
  subKompiPelaksana: string;
  targetProgres: number;
  personelDiturunkan: number;
  masyarakatTerlibat: number;
  tanggalMulai: string;
  tanggalTarget: string;
  status: 'DALAM_PROSES' | 'SELESAI' | 'PERENCANAAN';
  deskripsi: string;
}

export const mockKomsosLeaders: KomsosLeaderItem[] = [
  {
    id: 'KMS-001',
    namaTokoh: 'H. Abdul Rahman, S.Ag.',
    jabatanRole: 'Tokoh Agama / Ketua MUI Kecamatan',
    wilayahBinaan: 'Desa Kampar Permai, Sektor Kompi A',
    satuanPembina: 'Kompi A (Markas Lama)',
    statusJaringan: 'SANGAT_DEKAT',
    kontakRingkasan: '0812-7890-**** (Mitra Karib)',
    terakhirSilaturahmi: '2026-07-25',
    keterangan: 'Rutin memfasilitasi tausiyah kebangsaan bersama prajurit Yonif TP dan masyarakat desa.'
  },
  {
    id: 'KMS-002',
    namaTokoh: 'Datuk Tumenggung Sangsura',
    jabatanRole: 'Tokoh Adat / Pemangku Kerabatan Udaya',
    wilayahBinaan: 'Kecamatan Tapung Hulu',
    satuanPembina: 'Kompi B',
    statusJaringan: 'AKTIF',
    kontakRingkasan: '0852-6112-****',
    terakhirSilaturahmi: '2026-07-22',
    keterangan: 'Membantu penyelesaian potensi konflik lahan warga dan menyokong pos penyuluhan Babinsa/Yonif TP.'
  },
  {
    id: 'KMS-003',
    namaTokoh: 'Bpk. Ir. Slamet Widodo',
    jabatanRole: 'Ketua Kelompok Tani Mandiri & Kelapa Sawit',
    wilayahBinaan: 'Desa Bangkinang Sejahtera',
    satuanPembina: 'Kompi C',
    statusJaringan: 'AKTIF',
    kontakRingkasan: '0813-9021-****',
    terakhirSilaturahmi: '2026-07-27',
    keterangan: 'Kolaborasi program Ketahanan Pangan (Padi & Jagung) Yonif TP seluas 15 Hektar.'
  },
  {
    id: 'KMS-004',
    namaTokoh: 'Sdr. Rizky Pratama',
    jabatanRole: 'Ketua Karang Taruna & Komunitas Pemuda Siaga Bencana',
    wilayahBinaan: 'Kelurahan Pelalawan',
    satuanPembina: 'Kompi Bantuan',
    statusJaringan: 'SANGAT_DEKAT',
    kontakRingkasan: '0821-4456-****',
    terakhirSilaturahmi: '2026-07-28',
    keterangan: 'Mitra tim relawan pencegahan Karhutla dan olahraga bersama pemuda desa.'
  }
];

export const mockBaktiTniProjects: BaktiTniProjectItem[] = [
  {
    id: 'BKT-2026-001',
    namaKegiatan: 'Karya Bakti Pembersihan & Normalisasi Saluran Irigasi Desa',
    kategori: 'KARYA_BAKTI',
    lokasi: 'Desa Kampar Jaya, Sektor Kompi A',
    subKompiPelaksana: 'Kompi A',
    targetProgres: 85,
    personelDiturunkan: 35,
    masyarakatTerlibat: 120,
    tanggalMulai: '2026-07-15',
    tanggalTarget: '2026-08-05',
    status: 'DALAM_PROSES',
    deskripsi: 'Normalisasi parit dan irigasi sepanjang 2.4 km untuk mengantisipasi banjir musiman dan mendukung pengairan sawah 40 Hektar.'
  },
  {
    id: 'BKT-2026-002',
    namaKegiatan: 'Program TMMD Imbangan: Pembuatan Jalan Tembus Antar Desa',
    kategori: 'TMMD',
    lokasi: 'Dusun Siabu - Dusun Lubuk Agung',
    subKompiPelaksana: 'Kompi B',
    targetProgres: 60,
    personelDiturunkan: 50,
    masyarakatTerlibat: 80,
    tanggalMulai: '2026-07-01',
    tanggalTarget: '2026-08-15',
    status: 'DALAM_PROSES',
    deskripsi: 'Pembukaan dan pengerasan jalan penghubung isolasi sepanjang 3.2 km lebar 4 meter.'
  },
  {
    id: 'BKT-2026-003',
    namaKegiatan: 'Bhakti Kesehatan: Pengobatan Gratis & Bantuan Sembako Stunting',
    kategori: 'PENGOBATAN_GRATIS',
    lokasi: 'Balai Desa Tapung Hulu',
    subKompiPelaksana: 'Ton Kesehatan & Kompi C',
    targetProgres: 100,
    personelDiturunkan: 18,
    masyarakatTerlibat: 350,
    tanggalMulai: '2026-07-20',
    tanggalTarget: '2026-07-20',
    status: 'SELESAI',
    deskripsi: 'Pemeriksaan kesehatan gratis untuk 350 lansia dan pembagian paket nutrisi penanganan stunting anak bagi 75 keluarga.'
  },
  {
    id: 'BKT-2026-004',
    namaKegiatan: 'Pemberdayaan Lahan Ketahanan Pangan Jagung & Perikanan',
    kategori: 'PEMBERDAYAAN_TANI',
    lokasi: 'Lahan Demplot Yonif TP / Kompi Bantuan',
    subKompiPelaksana: 'Kompi Bantuan',
    targetProgres: 40,
    personelDiturunkan: 25,
    masyarakatTerlibat: 45,
    tanggalMulai: '2026-07-10',
    tanggalTarget: '2026-09-30',
    status: 'DALAM_PROSES',
    deskripsi: 'Penanaman bibit jagung hibrida di area 5 Ha dan pembibitan ikan patin 20.000 ekor bersama gabungan kelompok tani binaan.'
  }
];

export interface CommanderAgendaItem {
  id: string;
  waktu: string;
  kegiatan: string;
  lokasi: string;
  kategori: 'INSPEKSI' | 'RAPAT' | 'FIELD_VISIT' | 'PROTOKOL' | 'JAM_KOMANDO';
  pendamping: string;
  status: 'TERJADWAL' | 'BERLANGSUNG' | 'SELESAI';
  keterangan: string;
}

export const mockCommanderAgenda: CommanderAgendaItem[] = [
  {
    id: 'AGD-001',
    waktu: '07:30 - 08:30 WIB',
    kegiatan: 'Jam Komando & Apel Kesiapsiagaan Prajurit Yonif TP',
    lokasi: 'Lapangan Sisingamangaraja Mayonif TP',
    kategori: 'JAM_KOMANDO',
    pendamping: 'Wadanyon, Para Pasi Staf, Danki',
    status: 'SELESAI',
    keterangan: 'Pemberian pengarahan moril, disiplin, dan penguatan komitmen Kemanunggalan TNI-Rakyat.'
  },
  {
    id: 'AGD-002',
    waktu: '09:00 - 11:30 WIB',
    kegiatan: 'Inspeksi Lahan Demplot Ketahanan Pangan & Panen Jagung',
    lokasi: 'Sektor Kompi A (Kampar Permai)',
    kategori: 'FIELD_VISIT',
    pendamping: 'Pasi Ter, Danki A, Poktan Binaan',
    status: 'BERLANGSUNG',
    keterangan: 'Pengecekan kesiapan panen jagung hibrida 15 Hektar dan pembagian benih bantuan.'
  },
  {
    id: 'AGD-003',
    waktu: '13:30 - 15:00 WIB',
    kegiatan: 'Rapat Koordinasi Batalyon & Evaluasi Staf Mingguan',
    lokasi: 'Ruang Yudha Mayonif TP',
    kategori: 'RAPAT',
    pendamping: 'Pasi Intel, Pasi Ops, Pasi Pers, Pasi Log',
    status: 'TERJADWAL',
    keterangan: 'Pembahasan kesiapan Satgas Pam ALKI dan progres fisik program Bakti TNI.'
  },
  {
    id: 'AGD-004',
    waktu: '16:00 - 17:30 WIB',
    kegiatan: 'Silaturahmi & Audiensi dengan Forkopimda & MUI Kabupaten',
    lokasi: 'Gedung Daerah Kabupaten',
    kategori: 'PROTOKOL',
    pendamping: 'Pasi Ter & Dokter Batalyon',
    status: 'TERJADWAL',
    keterangan: 'Sinergi pencegahan Karhutla dan dukungan Bhakti Kesehatan Stunting.'
  },
  {
    id: 'AGD-005',
    waktu: '19:30 - 21:00 WIB',
    kegiatan: 'Pengecekan Pos Ronda & Patroli Malam Komsos Bersama Warga',
    lokasi: 'Desa Bangkinang Sejahtera (Sektor Kompi B)',
    kategori: 'INSPEKSI',
    pendamping: 'Danki B & Babinsa Sektor',
    status: 'TERJADWAL',
    keterangan: 'Inspeksi mendadak kesiapsiagaan pos siaga dan tatap muka tokoh pemuda.'
  }
];

// ==========================================
// DATA LAPORAN SATUAN (LAPSAT) FOTO LENGKAP
// BATALYON INFANTERI TP 897/SINGGALANG
// ==========================================

export const mockKetahananPangan = {
  pertanian: [
    { no: 1, jenisTanaman: 'Jagung', luasHa: 3, persentasePanen: '20%', progres: 'Proses Penanaman' },
    { no: 1, jenisTanaman: 'Jagung', luasHa: 4, persentasePanen: '20%', progres: 'Proses Penanaman' },
    { no: 2, jenisTanaman: 'Singkong, Cabe, Terong, Kacang Panjang, Bayam, Kangkung', luasHa: 1, persentasePanen: '20%', progres: 'Proses Penanaman' },
  ],
  peternakan: [
    { no: 1, jenisHewan: 'SAPI', jumlahEkor: 3, persentase: '30%', progres: 'Pemeliharaan' },
    { no: 2, jenisHewan: 'KAMBING', jumlahEkor: 21, persentase: '30%', progres: 'Pemeliharaan' },
    { no: 3, jenisHewan: 'BEBEK', jumlahEkor: 297, persentase: '30%', progres: 'Pemeliharaan' },
  ]
};

export const mockAlkapKesehatan = [
  { no: 1, nama: 'TANDU LAPANGAN', sat: 'UNIT', jumlah: 6 },
  { no: 2, nama: 'TEMPAT TIDUR PERIKSA', sat: 'UNIT', jumlah: 3 },
  { no: 3, nama: 'TEMPAT TIDUR TINDAKAN', sat: 'UNIT', jumlah: 2 },
  { no: 4, nama: 'TANGGA STAINLESS STEEL', sat: 'UNIT', jumlah: 2 },
  { no: 5, nama: 'TEMPAT TIDUR PERAWATAN PASIEN 2 CRANK', sat: 'UNIT', jumlah: 10 },
  { no: 6, nama: 'MATRAS 192x84x10', sat: 'UNIT', jumlah: 10 },
  { no: 7, nama: 'PANEL HEAD AND FOOT', sat: 'UNIT', jumlah: 10 },
  { no: 8, nama: 'BED SIDE CABINET STAINLESS STEEL', sat: 'UNIT', jumlah: 10 },
  { no: 9, nama: 'TROLLEY INSTRUMENT STAINLESS STEEL', sat: 'UNIT', jumlah: 4 },
  { no: 10, nama: 'TIANG INFUS', sat: 'UNIT', jumlah: 15 },
  { no: 11, nama: 'EXAMINATION LAMP', sat: 'UNIT', jumlah: 3 },
  { no: 12, nama: 'ALAT UKUR TINGGI BADAN', sat: 'UNIT', jumlah: 1 },
  { no: 13, nama: 'AUTO CLAVE STERILISASI', sat: 'UNIT', jumlah: 1 },
  { no: 14, nama: 'BLANKAR TRANSFER', sat: 'UNIT', jumlah: 1 },
  { no: 15, nama: 'KERANGKA BLANKAR TRANSFER', sat: 'UNIT', jumlah: 1 },
  { no: 16, nama: 'KURSI RODA', sat: 'UNIT', jumlah: 2 },
  { no: 17, nama: 'STRECHER', sat: 'UNIT', jumlah: 2 },
  { no: 18, nama: 'LEMARI OBAT 2 PINTU STAINLESS STEEL', sat: 'UNIT', jumlah: 3 },
  { no: 19, nama: 'LEMARI INSTRUMEN MEDIS 2 PINTU STAINLESS', sat: 'UNIT', jumlah: 4 },
  { no: 20, nama: 'SWING FOGGING', sat: 'UNIT', jumlah: 4 },
  { no: 21, nama: 'OBAT DAN BAHAN MEDIS', sat: 'UNIT', jumlah: 1 },
  { no: 22, nama: 'TROLLY TABUNG OKSIGEN', sat: 'UNIT', jumlah: 8 },
  { no: 23, nama: 'WBGT', sat: 'UNIT', jumlah: 3 },
  { no: 24, nama: 'SET BEDAH MINOR', sat: 'SET', jumlah: 2 },
  { no: 25, nama: 'DIAGNOSTIK SET', sat: 'SET', jumlah: 2 },
  { no: 26, nama: 'STETOSKOP DEWASA', sat: 'UNIT', jumlah: 3 },
  { no: 27, nama: 'TERMOMETER INFRA RED', sat: 'UNIT', jumlah: 3 },
  { no: 28, nama: 'PULSE OXIMETER', sat: 'UNIT', jumlah: 3 },
  { no: 29, nama: 'TENSIMETER DIGITAL', sat: 'UNIT', jumlah: 3 },
  { no: 30, nama: 'TIMBANGAN BADAN DEWASA', sat: 'UNIT', jumlah: 1 },
  { no: 31, nama: 'MICROSCOPE', sat: 'UNIT', jumlah: 1 },
  { no: 32, nama: 'SET PERALATAN GELAS LAB KES', sat: 'SET', jumlah: 1 },
  { no: 33, nama: 'ALAT UJI LABOLATORIUM KESEHATAN BARAT', sat: 'SET', jumlah: 1 },
  { no: 34, nama: 'TABUNG OKSIGEN+REGULATOR+MASKER', sat: 'SET', jumlah: 8 },
  { no: 35, nama: 'SUCTION', sat: 'UNIT', jumlah: 1 },
  { no: 36, nama: 'TRIPOD WBGT', sat: 'KAT', jumlah: 3 },
  { no: 37, nama: 'TAS WBGT+BENDERA WBGT', sat: 'KAT', jumlah: 3 },
  { no: 38, nama: 'KAT AMBULANCE', sat: 'KAT', jumlah: 3 },
  { no: 39, nama: 'KAT DOKTER', sat: 'KAT', jumlah: 1 },
  { no: 40, nama: 'KAT PERAWATAN', sat: 'KAT', jumlah: 2 },
  { no: 41, nama: 'KAT PEMBANTU PERAWAT', sat: 'KAT', jumlah: 3 },
];

export const mockAlkapsusPertanian = [
  { no: 1, nama: 'CULTIVATOR', sat: 'UNIT', jumlah: 3 },
  { no: 2, nama: 'MESIN PERONTOK PADI', sat: 'UNIT', jumlah: 6 },
  { no: 3, nama: 'MESIN PENGGILING PADI', sat: 'UNIT', jumlah: 7 },
  { no: 4, nama: 'MESIN PENANAM BENIH', sat: 'UNIT', jumlah: 9 },
  { no: 5, nama: 'MESIN PENANAM SAYUR', sat: 'UNIT', jumlah: 7 },
  { no: 6, nama: 'MESIN PERONTOK JAGUNG', sat: 'UNIT', jumlah: 7 },
  { no: 7, nama: 'MESIN POMPA AIR', sat: 'UNIT', jumlah: 10 },
  { no: 8, nama: 'MESIN PENCACAH RUMPUT', sat: 'UNIT', jumlah: 10 },
  { no: 9, nama: 'MESIN BLOWER PEMBASMI HAMA', sat: 'UNIT', jumlah: 12 },
  { no: 10, nama: 'BAJAK SINGKAL', sat: 'UNIT', jumlah: 6 },
  { no: 11, nama: 'CORONG PERONTOK PADI', sat: 'UNIT', jumlah: 6 },
  { no: 12, nama: 'CORONG PENGGILING PADI', sat: 'UNIT', jumlah: 14 },
  { no: 13, nama: 'CORONG PENCACAH RUMPUT', sat: 'UNIT', jumlah: 10 },
  { no: 14, nama: 'SELANG POMPA AIR', sat: 'UNIT', jumlah: 10 },
  { no: 15, nama: 'MESIN BAJAK MINI', sat: 'UNIT', jumlah: 3 },
  { no: 16, nama: 'GENSET 5500W', sat: 'UNIT', jumlah: 2 },
];

export const mockSenjataMunisi = {
  senjata: [
    { no: 1, nama: 'ARQ 160', top: 1044, nyata: 649 },
    { no: 2, nama: 'MAGAZEN', top: 3312, nyata: 1947 },
    { no: 3, nama: 'TALI SANDANG', top: 1044, nyata: 649 },
    { no: 4, nama: 'PISTOL G2 COMBAT PINDAD', top: 105, nyata: 22 },
    { no: 5, nama: 'MAGAZEN PISTOL', top: 315, nyata: 66 },
    { no: 6, nama: 'TAS MAGAZEN', top: 0, nyata: 22 },
    { no: 7, nama: 'BOX SENJATA', top: 105, nyata: 22 },
    { no: 8, nama: 'ALOPTIK', top: 0, nyata: 0 },
    { no: 9, nama: 'BOX AIMPOINT', top: 105, nyata: 22 },
    { no: 10, nama: 'BATERAI', top: 105, nyata: 22 },
    { no: 11, nama: 'DBAL-PL', top: 0, nyata: 0 },
    { no: 12, nama: 'BOX DBAL-PL', top: 105, nyata: 22 },
    { no: 13, nama: 'PISTOL ARMO V1 PINDAD', top: 1, nyata: 1 },
  ],
  munisi: [
    { no: 1, nama: 'MU KAL 5,56 MM/MU – 5TJ', top: '567.226', nyata: '535.390' },
    { no: 2, nama: 'MU KAL 9 MM/MU – 1TJ', top: '1.804', nyata: '1.292' },
  ]
};

export const mockAlkapsatAlkomKendaraan = {
  alkapsat: [
    { no: 1, nama: 'FIELDBED', sat: 'BUAH', jumlah: 966 },
    { no: 2, nama: 'TENDA LENGKUNG', sat: 'UNIT', jumlah: 4 },
    { no: 3, nama: 'TENDA SERBAGUNA', sat: 'UNIT', jumlah: 32 },
  ],
  alkom: [
    { no: 1, nama: 'ALKOMLEK', top: 1, jumlah: 1 },
    { no: 2, nama: 'TV HISENSE', top: 1, jumlah: 1 },
  ],
  kendaraan: [
    { no: 1, nama: 'MAUNG JELAJAH', top: 1, jumlah: 1 },
    { no: 2, nama: 'MAUNG TANGGUH', top: 1, jumlah: 1 },
    { no: 3, nama: 'SPM LISTRIK DAN KLX 150', top: 67, jumlah: 30 },
    { no: 4, nama: 'TRUCK NPS', top: 17, jumlah: 4 },
    { no: 5, nama: 'TRUCK TANGKI AIR', top: 1, jumlah: 1 },
    { no: 6, nama: 'TRUCK DAMKAR', top: 3, jumlah: 3 },
    { no: 7, nama: 'DUMP TRUCK', top: 4, jumlah: 2 },
    { no: 8, nama: 'TRUK TANGKI BBM', top: 1, jumlah: 1 },
    { no: 9, nama: 'AMBULANCE BIASA', top: 5, jumlah: 1 },
  ]
};

export const mockPrajuritBerprestasi = [
  {
    no: 1,
    nama: 'Jona Adrian Putra',
    pangkat: 'Prada',
    prestasi: ['Juara 2 MTQ Ke 30 Ramadhan Se Kec. Lubuk Basung, Agam']
  },
  {
    no: 2,
    nama: 'Maikel Simarmata',
    pangkat: 'Serda',
    prestasi: [
      'Juara 2 ARM Warrior Fun Run 5K Padang',
      'Juara 2 5K Run ITP Run 2026, Padang',
      'Juara 1 Umum Putra Police Women Run 2026 di Polres Payakumbuh'
    ]
  },
  {
    no: 3,
    nama: 'Asael Ginting',
    pangkat: 'Serda',
    prestasi: [
      'Juara 3 Bhayangkara Run, Road To Police Women Run 2026, Polresta Padang',
      'Juara 2 Kahf Own The Way Run Sumbar 2026, Padang',
      'Juara 2 Bhayangkara Run, Road To Police Women Run 2026, Padang Panjang'
    ]
  }
];

export const mockTcAtlet = [
  { cabor: 'PENCAK SILAT', jumlah: 12 },
  { cabor: 'JUJITSU', jumlah: 4 },
  { cabor: 'KARATE', jumlah: 3 },
  { cabor: 'SEPAK BOLA', jumlah: 32 },
  { cabor: 'MUAYTHAI', jumlah: 1 },
  { cabor: 'TINJU', jumlah: 10 },
  { cabor: 'UJI PETIK', jumlah: 65 },
  { cabor: 'ANGKAT BESI', jumlah: 1 },
  { cabor: 'RENANG', jumlah: 1 },
  { cabor: 'LARI', jumlah: 1 },
  { cabor: 'BADMINTON', jumlah: 6 },
  { cabor: 'BOLA VOLLY', jumlah: 21 },
];

export const mockKomposisiPersonel = {
  topDsppTotal: 670,
  siapOpsTotal: 373,
  diluarSatuanTotal: 296,
  siapOpsBreakdown: [
    { kompi: 'KI MARKAS', jumlah: 74 },
    { kompi: 'KI-A', jumlah: 69 },
    { kompi: 'KI-B', jumlah: 63 },
    { kompi: 'KI-C', jumlah: 64 },
    { kompi: 'KI-BANT', jumlah: 41 },
    { kompi: 'KI PETERNAKAN', jumlah: 8 },
    { kompi: 'KI PERTANIAN', jumlah: 6 },
    { kompi: 'KI ZI/KON', jumlah: 23 },
    { kompi: 'KI MEDIS', jumlah: 25 },
    { kompi: 'MAYON', jumlah: 1 },
    { kompi: 'LF', jumlah: 1 },
  ],
  keteranganKhusus: [
    { kategori: 'AKPER (LF)', personil: ['Serda Abel Maulana Alfian'] },
    { kategori: 'DIK SPESIALISASI', personil: ['M Pratu Tri Junaldy', 'Pratu Nofriyan Ananda ichola'] },
    { kategori: 'BP ZIDAM', personil: ['Prada Miko Dwi Handoko'] },
    { kategori: 'BP SECATA', personil: ['Serda Albert'] },
    { kategori: 'SUS PATIH', personil: ['Letda Inf Julasmi'] },
    { kategori: 'BP TIH SECATA', personil: ['Letda Inf Edi Hartono'] },
    { kategori: 'DIKTUKPA', personil: ['Serka Foni Angria'] },
    { kategori: 'BEKTRAM', personil: ['Serda Fajar B', 'Serda Mhd Danil', 'Prada Agryan Rhaka'] },
    { kategori: 'BP DAM (PERSIT)', personil: ['Letda Inf Andi Riyatno'] },
    { kategori: 'KUNG TIH RINDAM', personil: ['Letda Inf Jaka Wahyudin'] },
    { kategori: 'DIKPAINTEL', personil: ['Letda Inf Feri Febrian', 'Letda Inf Jonathan Isa'] },
    { kategori: 'TIH LAT PRATUGAS', personil: ['Praka Bayu Tirta S'] },
    { kategori: 'DIK PA KOMLEK', personil: ['Letda Cke M Bintang Ihsan R'] },
    { kategori: 'LAT SANJAK', personil: ['Letda Inf Taufik H', 'Serda Sevenjung S', 'Serda Mhd Andrean N'] },
    { kategori: 'JUJITSU', personil: ['Serda Ramadhani', 'Prada M Deka', 'Prada Rizky', 'Prada Josua Aritonang'] },
  ]
};

export const mockStrukturOrganisasi = {
  danyonif: { jabatan: 'DANYONIF', nama: 'LETKOL INF SAOR J. LUMBANBATU' },
  wadanyonif: { jabatan: 'WADANYONIF', nama: 'KAPTEN INF YULIANTO YOSE I L' },
  staf: [
    { jabatan: 'PASI INTEL', nama: 'Ws. LETDA INF HASRUL' },
    { jabatan: 'PASI OPSLAT', nama: 'Ws. LETDA INF JONATHAN ISA' },
    { jabatan: 'PASI PERS', nama: 'Ws. LETDA CKE M BINTANG' },
    { jabatan: 'PASI LOG', nama: 'Ws. LETDA CBA VIRADARMA' },
    { jabatan: 'DOKTER', nama: '-' },
  ],
  kompi: [
    { jabatan: 'DANKI MA', nama: 'KAPT INF ZUL EFENDI' },
    { jabatan: 'DANKI A', nama: 'Ws. LETDA INF JUL ASMI' },
    { jabatan: 'DANKI B', nama: 'Ws. LETDA INF ICHWAN F' },
    { jabatan: 'DANKI C', nama: 'Ws. LETDA INF FERI FEBRIAN' },
    { jabatan: 'DANKI BAN', nama: 'Ws. LETDA INF ADIK PEBRI' },
    { jabatan: 'DANKI TERNAK', nama: 'Ws. LETDA INF RUDI H PURBA' },
    { jabatan: 'DANKI TANI', nama: 'Ws. LETDA INF A IRWAN' },
    { jabatan: 'DANKI ZI', nama: 'Ws. LETDA CZI R CHANIAGO' },
    { jabatan: 'DANKI MEDIS', nama: 'KAPTEN CKM FRENGKY H' },
  ]
};



