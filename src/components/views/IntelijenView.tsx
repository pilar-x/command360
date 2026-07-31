import React, { useState } from 'react';
import { downloadReferenceDoc } from '../../utils/downloadUtils';
import { 
  Eye, 
  Map, 
  Database, 
  Radio, 
  AlertOctagon, 
  FileCheck, 
  Lock, 
  Search, 
  Filter,
  Flame,
  CloudRain,
  Shield,
  Layers,
  AlertTriangle,
  FileText,
  UserX,
  PlusCircle,
  TrendingDown,
  CheckCircle2,
  Clock,
  Paperclip,
  History,
  Building2,
  ShieldAlert,
  Users,
  HeartHandshake,
  Heart,
  Sparkles,
  Sprout,
  Check,
  Briefcase
} from 'lucide-react';
import { 
  mockIncidents, 
  mockReports, 
  mockKomsosLeaders, 
  mockBaktiTniProjects,
  KomsosLeaderItem,
  BaktiTniProjectItem
} from '../../data/mockData';
import { ClearanceLevel, UserRole } from '../../types';

interface IntelijenViewProps {
  activeSubmenu?: string;
  userClearance: ClearanceLevel;
  userRole?: UserRole;
}

interface PersonnelViolationCase {
  id: string;
  nama: string;
  pangkatNrp: string;
  satuan: string;
  kategori: 'DISIPLIN' | 'THTI/DESERSI' | 'NARKOBA' | 'PENYALAHGUNAAN WEWENANG' | 'PIDANA UMUM';
  tanggalKejadian: string;
  ringkasan: string;
  statusPenanganan: 'PENYELIDIKAN' | 'PROSES ANKUM' | 'SIDANG DISIPLIN/MILITER' | 'SELESAI (SANKSi)' | 'SP3';
  tindakLanjut: string;
  dokumenAttached: string;
}

const mockViolations: PersonnelViolationCase[] = [
  {
    id: 'KASUS-2026-001',
    nama: 'Kapt Inf *** (Terproteksi)',
    pangkatNrp: 'Kapten Inf / 111200****',
    satuan: 'Yonif 101',
    kategori: 'DISIPLIN',
    tanggalKejadian: '2026-07-12',
    ringkasan: 'Pelanggaran wewenang pengerahan personel tanpa izin tertulis Komandan Satuan.',
    statusPenanganan: 'PROSES ANKUM',
    tindakLanjut: 'Pemeriksaan saksi oleh Staf Intelijen & Pam Satuan.',
    dokumenAttached: 'BAP_Saksi_01.pdf'
  },
  {
    id: 'KASUS-2026-002',
    nama: 'Sertu *** (Terproteksi)',
    pangkatNrp: 'Sertu / 211900****',
    satuan: 'Kodim 0301',
    kategori: 'THTI/DESERSI',
    tanggalKejadian: '2026-07-04',
    ringkasan: 'Meninggalkan dinas tanpa izin selama 6 hari berturut-turut.',
    statusPenanganan: 'SIDANG DISIPLIN/MILITER',
    tindakLanjut: 'Berkas dilimpahkan ke Ankum untuk pelaksanaan Sidang Disiplin Militer.',
    dokumenAttached: 'Berkas_Limpah_Subdenpom.pdf'
  },
  {
    id: 'KASUS-2026-003',
    nama: 'Serda *** (Terproteksi)',
    pangkatNrp: 'Serda / 212100****',
    satuan: 'Denkav 3',
    kategori: 'NARKOBA',
    tanggalKejadian: '2026-06-20',
    ringkasan: 'Hasil tes urine terkonfirmasi positif amphetamin saat sidak internal.',
    statusPenanganan: 'SELESAI (SANKSi)',
    tindakLanjut: 'Vonis sidang militer, sanksi administratif & pemecatan dalam proses PDH.',
    dokumenAttached: 'Putusan_Mahmil_08.pdf'
  }
];

export const IntelijenView: React.FC<IntelijenViewProps> = ({
  activeSubmenu = 'intel_overview',
  userClearance,
  userRole = 'Panglima / Komandan'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  // Violation Subsystem inner tab
  const [violationTab, setViolationTab] = useState<'DASHBOARD' | 'INPUT' | 'DAFTAR' | 'STATISTIK' | 'ARSIP'>('DASHBOARD');
  
  // New Violation Input Form State
  const [vCategory, setVCategory] = useState<PersonnelViolationCase['kategori']>('DISIPLIN');
  const [vSatuan, setVSatuan] = useState('Yonif 101');
  const [vTanggal, setVTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [vRingkasan, setVRingkasan] = useState('');
  const [vInisial, setVInisial] = useState('');
  const [vDokumen, setVDokumen] = useState('');
  const [violationsList, setViolationsList] = useState<PersonnelViolationCase[]>(mockViolations);

  const canViewDetailedPersonnel = userRole === 'Asintel' || userRole === 'Panglima / Komandan';

  const filteredIncidents = mockIncidents.filter(inc => {
    const matchesSearch = inc.judul.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inc.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'ALL' || inc.kategori === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Komsos & Bakti TNI state
  const [komsosTab, setKomsosTab] = useState<'BAKTI_TNI' | 'TOKOH_JARING' | 'INPUT_KEGIATAN'>('BAKTI_TNI');
  const [komsosList, setKomsosList] = useState<KomsosLeaderItem[]>(mockKomsosLeaders);
  const [baktiList, setBaktiList] = useState<BaktiTniProjectItem[]>(mockBaktiTniProjects);

  // New Bakti Activity Form State
  const [newBaktiNama, setNewBaktiNama] = useState('');
  const [newBaktiKategori, setNewBaktiKategori] = useState<BaktiTniProjectItem['kategori']>('KARYA_BAKTI');
  const [newBaktiLokasi, setNewBaktiLokasi] = useState('');
  const [newBaktiSubKompi, setNewBaktiSubKompi] = useState('Kompi A');
  const [newBaktiPersonel, setNewBaktiPersonel] = useState(25);
  const [newBaktiMasyarakat, setNewBaktiMasyarakat] = useState(50);
  const [newBaktiDeskripsi, setNewBaktiDeskripsi] = useState('');

  const handleAddBaktiProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBaktiNama.trim()) return;

    const newProject: BaktiTniProjectItem = {
      id: `BKT-2026-00${baktiList.length + 1}`,
      namaKegiatan: newBaktiNama,
      kategori: newBaktiKategori,
      lokasi: newBaktiLokasi || 'Sektor Binaan Batalyon',
      subKompiPelaksana: newBaktiSubKompi,
      targetProgres: 10,
      personelDiturunkan: Number(newBaktiPersonel) || 20,
      masyarakatTerlibat: Number(newBaktiMasyarakat) || 30,
      tanggalMulai: new Date().toISOString().split('T')[0],
      tanggalTarget: '2026-08-30',
      status: 'DALAM_PROSES',
      deskripsi: newBaktiDeskripsi || 'Kegiatan Karya Bakti / Pembinaan Teritorial Yonif TP.'
    };

    setBaktiList([newProject, ...baktiList]);
    setNewBaktiNama('');
    setNewBaktiLokasi('');
    setNewBaktiDeskripsi('');
    setKomsosTab('BAKTI_TNI');
    setSuccessMessage('Kegiatan Bakti TNI & Komsos baru berhasil dicatat dalam database teritorial.');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleAddViolation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vRingkasan.trim()) return;

    const newCase: PersonnelViolationCase = {
      id: `KASUS-2026-00${violationsList.length + 1}`,
      nama: vInisial ? `${vInisial} (Terproteksi)` : 'Personel Terproteksi',
      pangkatNrp: 'NRP Terproteksi (Need-To-Know)',
      satuan: vSatuan,
      kategori: vCategory,
      tanggalKejadian: vTanggal,
      ringkasan: vRingkasan,
      statusPenanganan: 'PENYELIDIKAN',
      tindakLanjut: 'Pemeriksaan awal oleh Staf Intelijen.',
      dokumenAttached: vDokumen || 'Dokumen_Awal.pdf'
    };

    setViolationsList([newCase, ...violationsList]);
    setVRingkasan('');
    setVInisial('');
    setVDokumen('');
    setViolationTab('DAFTAR');
    setSuccessMessage('Data Pelanggaran Personel berhasil dientri secara rahasia.');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Staf 2 Intelijen • Situation Awareness & Security Protection</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-100 uppercase tracking-wide">
            INTELLIGENCE DASHBOARD & MONITORING
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Pengumpulan, Pengolahan, dan Analisis Data Situasi Wilayah, Geografi, Demografi, Pelanggaran Personel, dan Sumber Terbuka.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono px-3 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
            CLEARANCE: {userClearance}
          </span>
        </div>
      </div>

      {/* 1. DASHBOARD INTELIJEN */}
      {activeSubmenu === 'intel_overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Indeks Ancaman Wilayah</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-amber-400">RENDAH-SEDANG</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Stabilitas Terjaga 98.2%</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Hotspot Karhutla Aktif</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-red-400">3 Titik</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Sektor Kampar & Pelalawan</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Monitoring Media Terbuka</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-blue-400">142 Stream</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Sentimen Positif 84%</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase">Kasus Pelanggaran Personel</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-purple-400">{violationsList.length} Kasus</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Data Agregat Terproteksi</p>
            </div>
          </div>

          {/* Incident Monitoring */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                Monitoring Kejadian & Perkembangan Situasi Wilayah
              </h2>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari kejadian..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1 text-xs bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-slate-700 text-slate-200"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-2 py-1 text-xs bg-slate-950 border border-slate-800 rounded text-slate-300 font-mono"
                >
                  <option value="ALL">SEMUA KATEGORI</option>
                  <option value="KARHUTLA">KARHUTLA</option>
                  <option value="SECURITY">SECURITY</option>
                  <option value="BENCANA">BENCANA</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredIncidents.map((inc) => (
                <div 
                  key={inc.id}
                  className="p-4 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400">{inc.kodeKejadian}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        inc.tingkatAncaman === 'TINGGI' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        ANCAMAN: {inc.tingkatAncaman}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{inc.waktuKejadian}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100">{inc.judul}</h3>
                  <p className="text-xs text-slate-300">{inc.ringkasan}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. DATA INTELIJEN */}
      {activeSubmenu === 'intel_data' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              <span>DATABASE INTELIJEN WILAYAH, GEOGRAFI, DEMOGRAFI & OBVITNAS</span>
            </h2>
            <span className="text-xs font-mono text-emerald-400">STATUS: TERUPDATE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 flex items-center gap-1.5">
                <Map className="w-4 h-4" /> Data Geografi & Topografi
              </h3>
              <p className="text-slate-300">Luas Wilayah Tanggung Jawab: 87.023 km².</p>
              <p className="text-slate-400">Panjang Garis Pantai: 1.240 km. Wilayah Hutan Lindung: 34%.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <h3 className="font-bold text-blue-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> Demografi & Infrastruktur Strategis
              </h3>
              <p className="text-slate-300">Jumlah Penduduk: 6.8 Juta Jiwa Agregat Wilayah.</p>
              <p className="text-slate-400">Kepadatan: 78 Jiwa/km². Obvitnas Utama: 6 Kilang & Pelabuhan.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Radio className="w-4 h-4" /> Data Sumber Terbuka & Kerawanan
              </h3>
              <p className="text-slate-300">Pantauan Isu Strategis: 18 Topik Hangat.</p>
              <p className="text-slate-400">Indeks Kerawanan Sektor Pesisir: Sedang-Terendali.</p>
            </div>
          </div>
        </div>
      )}

      {/* 2B. KOMUNIKASI SOSIAL (KOMSOS) & BAKTI TNI */}
      {activeSubmenu === 'intel_komsos' && (
        <div className="space-y-6">
          
          {/* Header & KPI Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Tokoh & Jaring Binaan</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-emerald-400">{komsosList.length} Tokoh</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Toma, Toga, Todat & Pemuda</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Kegiatan Bakti TNI</span>
                <HeartHandshake className="w-4 h-4 text-blue-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-blue-400">{baktiList.length} Program</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Karya Bakti & TMMD Imbangan</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Prajurit Mobilisasi</span>
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {baktiList.reduce((acc, curr) => acc + curr.personelDiturunkan, 0)} Prajurit
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Tersebar di Sub-Kompi</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Total Warga Terlibat</span>
                <Heart className="w-4 h-4 text-rose-400" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-rose-400">
                  {baktiList.reduce((acc, curr) => acc + curr.masyarakatTerlibat, 0)} Warga
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Kemanunggalan TNI-Rakyat</p>
            </div>
          </div>

          {/* Subtabs Control */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
                <div>
                  <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">
                    Sistem Pengendalian Komsos & Bakti TNI Batalyon
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Sinergi Pembinaan Teritorial Yonif TP dengan Komponen Masyarakat & Pemerintah Daerah
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setKomsosTab('BAKTI_TNI')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-colors ${
                    komsosTab === 'BAKTI_TNI'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Kegiatan Bakti TNI ({baktiList.length})
                </button>
                <button
                  onClick={() => setKomsosTab('TOKOH_JARING')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-colors ${
                    komsosTab === 'TOKOH_JARING'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tokoh & Jaring Binaan ({komsosList.length})
                </button>
                <button
                  onClick={() => setKomsosTab('INPUT_KEGIATAN')}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-colors flex items-center gap-1 ${
                    komsosTab === 'INPUT_KEGIATAN'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Entri Kegiatan Baru</span>
                </button>
              </div>
            </div>

            {/* TAB 1: BAKTI TNI PROJECTS */}
            {komsosTab === 'BAKTI_TNI' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {baktiList.map((project) => (
                    <div 
                      key={project.id}
                      className="p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-400">{project.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                              {project.kategori.replace('_', ' ')}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-slate-100 mt-1">{project.namaKegiatan}</h3>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                          project.status === 'SELESAI' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">{project.deskripsi}</p>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-400">Progres Pelaksanaan</span>
                          <span className="font-bold text-amber-400">{project.targetProgres}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${project.targetProgres}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-[11px] text-slate-300 font-mono">
                        <div>
                          <span className="text-slate-500 block text-[10px]">LOKASI</span>
                          <span>{project.lokasi}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">PELAKSANA</span>
                          <span className="text-amber-300 font-bold">{project.subKompiPelaksana}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">PERSONEL / WARGA</span>
                          <span>{project.personelDiturunkan} Prj / {project.masyarakatTerlibat} Warga</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: TOKOH & JARING KOMSOS BINAAN */}
            {komsosTab === 'TOKOH_JARING' && (
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono">
                        <th className="py-2.5 px-3">KODE / NAMA TOKOH</th>
                        <th className="py-2.5 px-3">PERAN / JABATAN</th>
                        <th className="py-2.5 px-3">WILAYAH BINAAN</th>
                        <th className="py-2.5 px-3">SUB-KOMPI PEMBINA</th>
                        <th className="py-2.5 px-3">STATUS JEJARING</th>
                        <th className="py-2.5 px-3">SILATURAHMI TERAKHIR</th>
                        <th className="py-2.5 px-3">KETERANGAN / DOKUMENTASI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {komsosList.map((leader) => (
                        <tr key={leader.id} className="hover:bg-slate-950/60 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-mono text-amber-400 font-bold">{leader.id}</div>
                            <div className="font-bold text-slate-200">{leader.namaTokoh}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-300 font-medium">{leader.jabatanRole}</td>
                          <td className="py-3 px-3 text-slate-300">{leader.wilayahBinaan}</td>
                          <td className="py-3 px-3 font-mono font-bold text-blue-400">{leader.satuanPembina}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              leader.statusJaringan === 'SANGAT_DEKAT'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {leader.statusJaringan}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-400">{leader.terakhirSilaturahmi}</td>
                          <td className="py-3 px-3 text-slate-300 max-w-xs">{leader.keterangan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: INPUT KEGIATAN KOMSOS / BAKTI TNI BARU */}
            {komsosTab === 'INPUT_KEGIATAN' && (
              <form onSubmit={handleAddBaktiProject} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4 max-w-3xl">
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>Formulir Pelaporan Kegiatan Komsos & Bakti TNI Teritorial</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Nama Kegiatan / Program *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Karya Bakti Perbaikan Masjid & Penyuluhan Karhutla"
                      value={newBaktiNama}
                      onChange={(e) => setNewBaktiNama(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Kategori Kegiatan *</label>
                    <select
                      value={newBaktiKategori}
                      onChange={(e) => setNewBaktiKategori(e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value="KARYA_BAKTI">KARYA BAKTI</option>
                      <option value="TMMD">TMMD IMBANGAN</option>
                      <option value="PENGOBATAN_GRATIS">BHAKTI KESEHATAN / STUNTING</option>
                      <option value="PEMBERDAYAAN_TANI">KETAHANAN PANGAN / TANI</option>
                      <option value="BANTUAN_BENCANA">BANTUAN BENCANA ALAM</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Lokasi / Sektor Binaan</label>
                    <input
                      type="text"
                      placeholder="Sektor Desa / Kecamatan"
                      value={newBaktiLokasi}
                      onChange={(e) => setNewBaktiLokasi(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Sub-Kompi Pelaksana</label>
                    <select
                      value={newBaktiSubKompi}
                      onChange={(e) => setNewBaktiSubKompi(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    >
                      <option value="Kompi Markas">Kompi Markas</option>
                      <option value="Kompi A">Kompi A (Markas Lama)</option>
                      <option value="Kompi B">Kompi B (Bangkinang)</option>
                      <option value="Kompi C">Kompi C (Pelalawan)</option>
                      <option value="Kompi Bantuan">Kompi Bantuan</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Jumlah Personel Diturunkan</label>
                    <input
                      type="number"
                      value={newBaktiPersonel}
                      onChange={(e) => setNewBaktiPersonel(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400">Perkiraan Warga Terlibat</label>
                    <input
                      type="number"
                      value={newBaktiMasyarakat}
                      onChange={(e) => setNewBaktiMasyarakat(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Deskripsi & Sasaran Kegiatan</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan sasaran fisik/non-fisik kegiatan..."
                    value={newBaktiDeskripsi}
                    onChange={(e) => setNewBaktiDeskripsi(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan Kegiatan Komsos / Bakti TNI</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2C. KETAHANAN WILAYAH & PANGAN TERITORIAL */}
      {activeSubmenu === 'intel_ketahanan' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>MONITORING KETAHANAN WILAYAH & PANGAN BINAAN YONIF TP</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Pemetaan Potensi Ketahanan Pangan, Air, Energi, & Ketahanan Ekonomi Masyarakat di Sektor Binaan
              </p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-bold">
              KONDISI UNGULAN
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-400">LAHAN DEMPLOT BINAAN</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">45.5 Hektar</div>
              <p className="text-[10px] text-slate-500 mt-1">Padi, Jagung & Sayur Mayur</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-400">PETERNAKAN YONIF TP</span>
              <div className="text-xl font-bold text-amber-400 mt-1">120 Sapi / 3.500 Unggas</div>
              <p className="text-[10px] text-slate-500 mt-1">Suplai Gizi Batalyon & Warga</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-400">SUMBER AIR & IRIGASI</span>
              <div className="text-xl font-bold text-blue-400 mt-1">12 Embung & Sumur Bor</div>
              <p className="text-[10px] text-slate-500 mt-1">Kesiapan Air Musim Kemarau</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <span className="text-slate-400">INDOKELARAN WAKTU HARVEST</span>
              <div className="text-xl font-bold text-rose-400 mt-1">Panen Raya Agst 2026</div>
              <p className="text-[10px] text-slate-500 mt-1">Estimasi 180 Ton Jagung/Padi</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-200">Sebaran Sektor Ketahanan Teritorial Batalyon</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300">
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">Sektor Kompi A (Kampar Permai)</span>
                <p>20 Ha Sawah Padi Organik + 2 Unit Embung Penampungan Air + Kolam Ikan Nila 50.000 bibit.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">Sektor Kompi B (Bangkinang)</span>
                <p>15 Ha Kebun Jagung Hibrida + Kandang Sapi Potong Terpadu 80 Ekor + Pengolahan Pupuk Organik.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <span className="font-bold text-blue-400 block mb-1">Sektor Kompi C (Pelalawan)</span>
                <p>10.5 Ha Tanaman Palawija & Hortikultura + Fasilitas Penjernihan Air Bersih untuk 400 KK.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeSubmenu === 'intel_violations' && (
        <div className="space-y-4">
          
          {/* Subsystem Banner & Clearance Notice */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            {successMessage && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-lg text-emerald-200 text-xs font-mono font-bold flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{successMessage}</span>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <UserX className="w-5 h-5 text-red-400" />
                  <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-wide">
                    SISTEM DATA PELANGGARAN PERSONEL
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                    RESTRICTED ACCESS
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pengawasan internal, pencatatan pelanggaran disiplin/pidana, status penanganan, dan rekapitulasi per satuan.
                </p>
              </div>

              {/* Protection Notice */}
              <div className="p-2 bg-slate-950 border border-amber-500/30 rounded-lg flex items-center gap-2 text-[11px] font-mono text-amber-300">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {canViewDetailedPersonnel 
                    ? 'Akses Penuh: Anda memiliki wewenang melihat nama & detail personel.' 
                    : 'Akses Agregat: Detail nama personel disamarkan sesuai protokol Need-To-Know.'}
                </span>
              </div>
            </div>

            {/* Inner Subsystem Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold pt-1">
              <button
                onClick={() => setViolationTab('DASHBOARD')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  violationTab === 'DASHBOARD' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                DASHBOARD PELANGGARAN
              </button>

              <button
                onClick={() => setViolationTab('INPUT')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                  violationTab === 'INPUT' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>INPUT PELANGGARAN</span>
              </button>

              <button
                onClick={() => setViolationTab('DAFTAR')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  violationTab === 'DAFTAR' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                DAFTAR & STATUS PENANGANAN ({violationsList.length})
              </button>

              <button
                onClick={() => setViolationTab('STATISTIK')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  violationTab === 'STATISTIK' ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}
              >
                STATISTIK & REKAP PER SATUAN
              </button>
            </div>
          </div>

          {/* TAB 1: DASHBOARD PELANGGARAN */}
          {violationTab === 'DASHBOARD' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400">TOTAL KASUS TERDAPAT</span>
                  <div className="text-2xl font-bold text-red-400">{violationsList.length} Kasus</div>
                  <span className="text-[10px] text-slate-500">Periode Tahun 2026</span>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400">DALAM PROSES ANKUM/MILITER</span>
                  <div className="text-2xl font-bold text-amber-400">
                    {violationsList.filter(v => v.statusPenanganan !== 'SELESAI (SANKSi)').length} Kasus
                  </div>
                  <span className="text-[10px] text-slate-500">Penanganan Aktif Staf Intel</span>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400">SELESAI / SANKSI DIJATUHKAN</span>
                  <div className="text-2xl font-bold text-emerald-400">
                    {violationsList.filter(v => v.statusPenanganan === 'SELESAI (SANKSi)').length} Kasus
                  </div>
                  <span className="text-[10px] text-slate-500">Vonis & Tindak Lanjut</span>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-slate-400">TREN PELANGGARAN</span>
                  <div className="text-2xl font-bold text-blue-400 flex items-center gap-1">
                    <TrendingDown className="w-5 h-5 text-emerald-400" />
                    <span>-18.4%</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Menurun dibanding 2025</span>
                </div>
              </div>

              {/* Category Breakdown & Unit Recap */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <h3 className="font-bold text-slate-100 uppercase">Rekapitulasi Kategori Pelanggaran</h3>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                      <span className="text-amber-400 font-bold">Pelanggaran Disiplin Murni</span>
                      <span className="font-mono text-slate-200">1 Kasus (33%)</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                      <span className="text-red-400 font-bold">THTI / Desersi</span>
                      <span className="font-mono text-slate-200">1 Kasus (33%)</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                      <span className="text-purple-400 font-bold">Narkotika & Obat Terlarang</span>
                      <span className="font-mono text-slate-200">1 Kasus (33%)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <h3 className="font-bold text-slate-100 uppercase">Rekapitulasi per Satuan (Agregat)</h3>
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                      <span className="text-slate-200 font-bold">Yonif 101</span>
                      <span className="font-mono text-amber-400">1 Kasus Disiplin</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                      <span className="text-slate-200 font-bold">Kodim 0301</span>
                      <span className="font-mono text-amber-400">1 Kasus THTI</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between">
                      <span className="text-slate-200 font-bold">Denkav 3</span>
                      <span className="font-mono text-red-400">1 Kasus Narkoba (Selesai)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INPUT PELANGGARAN */}
          {violationTab === 'INPUT' && (
            <form onSubmit={handleAddViolation} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-xs">
              <h3 className="font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>FORM ENTRI DATA PELANGGARAN PERSONEL (CONFIDENTIAL)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">KATEGORI PELANGGARAN *</label>
                  <select
                    value={vCategory}
                    onChange={(e) => setVCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-amber-400 font-mono font-bold"
                  >
                    <option value="DISIPLIN">DISIPLIN MURNI</option>
                    <option value="THTI/DESERSI">THTI / DESERSI</option>
                    <option value="NARKOBA">NARKOBA</option>
                    <option value="PENYALAHGUNAAN WEWENANG">PENYALAHGUNAAN WEWENANG</option>
                    <option value="PIDANA UMUM">PIDANA UMUM</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">SATUAN PERSONEL *</label>
                  <input
                    type="text"
                    value={vSatuan}
                    onChange={(e) => setVSatuan(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">TANGGAL KEJADIAN *</label>
                  <input
                    type="date"
                    value={vTanggal}
                    onChange={(e) => setVTanggal(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">INISIAL PERSONEL (OPSIONAL)</label>
                <input
                  type="text"
                  placeholder="Inisial atau Nama Personel..."
                  value={vInisial}
                  onChange={(e) => setVInisial(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">URAIAN KASUS & CROWD DETAILS *</label>
                <textarea
                  rows={3}
                  value={vRingkasan}
                  onChange={(e) => setVRingkasan(e.target.value)}
                  placeholder="Jelaskan ringkasan kronologi dan pasal/aturan disiplin yang dilanggar..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded text-slate-100 font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-500">
                  Data ini terlindungi oleh clearance Staf Intelijen & Pam.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg shadow"
                >
                  SIMPAN RECORD PELANGGARAN
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: DAFTAR & STATUS PENANGANAN */}
          {(violationTab === 'DAFTAR' || violationTab === 'STATISTIK') && (
            <div className="space-y-3">
              {violationsList.map((v) => (
                <div key={v.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400">{v.id}</span>
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-mono text-[10px]">
                        {v.kategori}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px] border border-slate-800">
                        SATUAN: {v.satuan}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[10px] font-bold">
                      STATUS: {v.statusPenanganan}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-slate-100 text-sm">
                      {canViewDetailedPersonnel ? v.nama : 'Personel Terproteksi (Akses Terbatas)'}
                      {canViewDetailedPersonnel && <span className="text-xs font-mono text-slate-400 ml-2">[{v.pangkatNrp}]</span>}
                    </div>
                    <p className="text-slate-300 leading-relaxed">{v.ringkasan}</p>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1 font-mono text-[11px]">
                    <span className="text-amber-400 font-bold block">TINDAK LANJUT / PROSES HUKUM:</span>
                    <span className="text-slate-300 block">{v.tindakLanjut}</span>
                    <div className="text-slate-500 text-[10px] flex items-center gap-2 pt-1 border-t border-slate-900">
                      <Paperclip className="w-3 h-3 text-amber-400" />
                      <span>Lampiran: {v.dokumenAttached}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* 4. MONITORING SITUASI */}
      {activeSubmenu === 'intel_monitoring' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">
            MONITORING SITUASI REAL-TIME & MEDIA TERBUKA
          </h2>
          <p className="text-slate-300">
            Stream pemantauan langsung isu Karhutla, Perkembangan Cuaca, Bencana Alam, dan Sentimen Media Publik.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400">Monitoring Karhutla & Cuaca</h3>
              <p className="text-slate-300">3 Hotspot Terdeteksi di Sektor Kampar (Confidence Level 88%).</p>
            </div>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
              <h3 className="font-bold text-blue-400">Media Terbuka & Isu Menonjol</h3>
              <p className="text-slate-300">142 Saluran Berita Terpantau, Sentimen Publik Positif Terjaga.</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. ANALISIS INTELIJEN */}
      {activeSubmenu === 'intel_analysis' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">
            ANALISIS SITUASI & RISK ASSESSMENT
          </h2>
          <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-400">Matriks Penilaian Risiko Wilayah</h3>
            <p className="text-slate-300">Ancaman Non-Militer (Karhutla & Cuaca Ekstrem): Sedang - Memerlukan kesiapan Satgas Terpadu.</p>
            <p className="text-slate-400">Ancaman Keamanan & Ketertiban: Sangat Rendah - Kondusif.</p>
          </div>
        </div>
      )}

      {/* 6. PETA INTELIJEN */}
      {activeSubmenu === 'intel_map' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">
            PETA INTELLIGENCE & LAYER KERAWANAN
          </h2>
          <p className="text-slate-300">
            Peta Geospasial khusus Intelijen menampilkan Hotspot, Objek Vital, dan Posko Pemantauan. (Data Pelanggaran Personel disembunyikan dari Peta sesuai Regulasi).
          </p>
        </div>
      )}

      {/* 7. PRODUK & LAPORAN */}
      {activeSubmenu === 'intel_reports' && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide">
            PRODUK INTELLIGENCE (LAPHID, LAPKHUS, BRIEF)
          </h2>
          <div className="space-y-2">
            {mockReports.filter(r => r.staff === 'INTELIJEN').map(rep => (
              <div key={rep.id} className="p-3 bg-slate-950 rounded border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-amber-400 font-bold">
                    <span>{rep.id}</span>
                    <span className="px-1.5 py-0.2 bg-amber-950 text-amber-300 rounded border border-amber-800 text-[10px]">
                      {rep.clearance}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-200 mt-1">{rep.judul}</h3>
                  <p className="text-slate-400">{rep.ringkasanContent}</p>
                </div>
                <button 
                  onClick={() => downloadReferenceDoc(rep.judul, 'PRODUK_INTELIJEN', rep.ringkasanContent, { id: rep.id, clearance: rep.clearance })}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded text-xs transition-colors"
                >
                  Unduh Referensi
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
