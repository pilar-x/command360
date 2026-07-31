import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Eye, 
  Crosshair, 
  Users, 
  Truck, 
  MapPin, 
  Bot, 
  CheckSquare, 
  FileText, 
  FolderGit2, 
  BarChart3, 
  Calendar, 
  BookOpen, 
  Bell, 
  Settings, 
  Cpu, 
  ChevronRight, 
  ChevronDown,
  ShieldCheck,
  HeartPulse,
  Building2,
  Sprout,
  Layers,
  Shield,
  FileEdit,
  Sparkles
} from 'lucide-react';
import { NavigationMenu, StaffType } from '../../types';

interface SidebarProps {
  activeMenu: NavigationMenu;
  onNavigate: (menu: NavigationMenu, submenu?: string) => void;
  activeSubmenu?: string;
  criticalCount: number;
}

interface MenuItem {
  id: NavigationMenu;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  submenus?: Array<{ id: string; label: string }>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  onNavigate,
  activeSubmenu,
  criticalCount
}) => {
  const [expandedMenu, setExpandedMenu] = useState<NavigationMenu | null>(activeMenu);

  const menuItems: MenuItem[] = [
    {
      id: 'COMMAND_CENTER',
      label: '01. BERANDA KOMANDO',
      icon: LayoutDashboard,
      submenus: [
        { id: 'executive_dashboard', label: 'Ringkasan Situasi Batalyon' },
        { id: 'readiness_overview', label: 'Indeks Kesiapan Batalyon' },
        { id: 'critical_alerts', label: 'Perhatian Komandan' },
        { id: 'perlu_keputusan', label: 'Perlu Keputusan' },
        { id: 'peta_komando', label: 'Peta Komando' },
        { id: 'perubahan_terbaru', label: 'Perubahan Terbaru' },
        { id: 'ringkasan_harian', label: 'Ringkasan Harian AI' },
      ]
    },
    {
      id: 'SATUAN',
      label: '02. PROFIL SATUAN',
      icon: Building2,
      submenus: [
        { id: 'data_satuan', label: 'Data Satuan' },
        { id: 'struktur_org', label: 'Struktur Organisasi' },
        { id: 'pejabat_satuan', label: 'Pejabat Satuan' },
        { id: 'dislokasi_satuan', label: 'Dislokasi Satuan' },
        { id: 'sejarah_satuan', label: 'Sejarah Satuan' },
        { id: 'organisasi_kompi', label: 'Organisasi Kompi' }
      ]
    },
    {
      id: 'PERSONEL',
      label: '03. PERSONEL',
      icon: Users,
      submenus: [
        { id: 'kekuatan_personel', label: 'Kekuatan Personel' },
        { id: 'komposisi_personel', label: 'Komposisi Personel' },
        { id: 'kesiapan_personel', label: 'Kesiapan Personel' },
        { id: 'kehadiran_personel', label: 'Kehadiran Personel' },
        { id: 'dik_kursus', label: 'Pendidikan & Kursus' },
        { id: 'binjas', label: 'Pembinaan Jasmani' },
        { id: 'atlet_prestasi', label: 'Atlet & Prestasi' },
        { id: 'keluarga_persit', label: 'Keluarga & Persit' }
      ]
    },
    {
      id: 'OPERASI',
      label: '04. OPERASI & LATIHAN',
      icon: Crosshair,
      submenus: [
        { id: 'ringkasan_kesiapan', label: 'Ringkasan Kesiapan' },
        { id: 'proglat', label: 'Program Latihan' },
        { id: 'kalender_latihan', label: 'Kalender Latihan' },
        { id: 'capaian_latihan', label: 'Capaian Latihan' },
        { id: 'kualifikasi_personel', label: 'Kualifikasi Personel' },
        { id: 'sarana_latihan', label: 'Sarana Latihan' },
        { id: 'evaluasi_latihan', label: 'Evaluasi Latihan' }
      ]
    },
    {
      id: 'LOGISTIK',
      label: '05. MATERIEL & LOGISTIK',
      icon: Truck,
      submenus: [
        { id: 'ringkasan_materiel', label: 'Ringkasan Materiel' },
        { id: 'kendaraan', label: 'Kendaraan' },
        { id: 'alkom', label: 'Alat Komunikasi' },
        { id: 'kaper_satuan', label: 'Perlengkapan Satuan' },
        { id: 'kaper_kesehatan', label: 'Perlengkapan Kesehatan' },
        { id: 'kaper_tp', label: 'Perlengkapan TP' },
        { id: 'har_pemeliharaan', label: 'Pemeliharaan' },
        { id: 'kebutuhan_materiel', label: 'Kebutuhan Materiel' }
      ]
    },
    {
      id: 'PANGKALAN',
      label: '06. PANGKALAN',
      icon: Layers,
      submenus: [
        { id: 'peta_pangkalan', label: 'Peta Pangkalan' },
        { id: 'perkantoran', label: 'Perkantoran' },
        { id: 'perumahan', label: 'Perumahan' },
        { id: 'prasarana', label: 'Prasarana' },
        { id: 'fasilitas_latihan', label: 'Fasilitas Latihan' },
        { id: 'utilitas', label: 'Utilitas' },
        { id: 'swadaya_satuan', label: 'Swadaya Satuan' }
      ]
    },
    {
      id: 'PEMBANGUNAN',
      label: '07. PEMBANGUNAN BATALYON',
      icon: Shield,
      submenus: [
        { id: 'ringkasan_pembangunan', label: 'Ringkasan Pembangunan' },
        { id: 'peta_rencana_induk', label: 'Peta Rencana Induk' },
        { id: 'progres_fisik', label: 'Progres Fisik' },
        { id: 'tahapan_pembangunan', label: 'Tahapan Pembangunan' },
        { id: 'target_penyelesaian', label: 'Target Penyelesaian' },
        { id: 'dokumentasi', label: 'Dokumentasi' },
        { id: 'kendala_pembangunan', label: 'Kendala Pembangunan' }
      ]
    },
    {
      id: 'TP_CONTROL',
      label: '08. TERITORIAL PEMBANGUNAN',
      icon: Sprout,
      badge: '5 PILAR',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      submenus: [
        { id: 'ringkasan_tp', label: 'Ringkasan TP' },
        { id: 'tp_pertanian', label: 'Pertanian' },
        { id: 'tp_peternakan', label: 'Peternakan' },
        { id: 'tp_perikanan', label: 'Perikanan' },
        { id: 'tp_konstruksi', label: 'Konstruksi' },
        { id: 'tp_kesehatan', label: 'Kesehatan' },
        { id: 'capaian_program', label: 'Capaian Program' }
      ]
    },
    {
      id: 'KETAHANAN_PANGAN',
      label: '09. KETAHANAN PANGAN',
      icon: Sprout,
      submenus: [
        { id: 'ringkasan_produksi', label: 'Ringkasan Produksi' },
        { id: 'data_lahan', label: 'Data Lahan' },
        { id: 'komoditas', label: 'Komoditas' },
        { id: 'masa_tanam', label: 'Masa Tanam' },
        { id: 'perkembangan', label: 'Perkembangan' },
        { id: 'panen', label: 'Panen' },
        { id: 'produksi', label: 'Produksi' },
        { id: 'target_realisasi', label: 'Target & Realisasi' }
      ]
    },
    {
      id: 'KESEHATAN',
      label: '10. KESEHATAN',
      icon: HeartPulse,
      submenus: [
        { id: 'kesiapan_kes', label: 'Kesiapan Kesehatan' },
        { id: 'personel_kes', label: 'Personel Kesehatan' },
        { id: 'faskes', label: 'Fasilitas Kesehatan' },
        { id: 'materiel_kes', label: 'Materiel Kesehatan' },
        { id: 'kegiatan_kes', label: 'Kegiatan Kesehatan' }
      ]
    },
    {
      id: 'TERITORIAL_MASYARAKAT',
      label: '11. TERITORIAL & MASYARAKAT',
      icon: Eye,
      submenus: [
        { id: 'kegiatan_teritorial', label: 'Kegiatan Teritorial' },
        { id: 'bakti_tni', label: 'Bakti TNI' },
        { id: 'bencana', label: 'Penanggulangan Bencana' },
        { id: 'komsos', label: 'Komunikasi Sosial' },
        { id: 'dampak_satuan', label: 'Indeks Dampak Satuan' },
        { id: 'penerimaan_masyarakat', label: 'Penerimaan Masyarakat' }
      ]
    },
    {
      id: 'PRESTASI',
      label: '12. PRESTASI SATUAN',
      icon: ShieldCheck,
      submenus: [
        { id: 'prestasi_personel', label: 'Prestasi Personel' },
        { id: 'prestasi_olahraga', label: 'Prestasi Olahraga' },
        { id: 'penghargaan', label: 'Penghargaan' },
        { id: 'dok_prestasi', label: 'Dokumentasi Prestasi' }
      ]
    },
    {
      id: 'KENDALA_KEBUTUHAN',
      label: '13. KENDALA & KEBUTUHAN',
      icon: CheckSquare,
      submenus: [
        { id: 'kendala_aktif', label: 'Kendala Aktif' },
        { id: 'prioritas', label: 'Prioritas' },
        { id: 'tindak_lanjut', label: 'Tindak Lanjut' },
        { id: 'dukungan_dibutuhkan', label: 'Dukungan Dibutuhkan' },
        { id: 'perlu_keputusan', label: 'Perlu Keputusan' }
      ]
    },
    {
      id: 'REPORT_CENTER',
      label: '14. PUSAT LAPORAN',
      icon: FileText,
      submenus: [
        { id: 'lap_harian', label: 'Laporan Harian' },
        { id: 'lap_mingguan', label: 'Laporan Mingguan' },
        { id: 'lap_bulanan', label: 'Laporan Bulanan' },
        { id: 'lap_satuan', label: 'Laporan Satuan' },
        { id: 'paparan_komandan', label: 'Paparan Komandan' },
        { id: 'arsip_laporan', label: 'Arsip Laporan' }
      ]
    },
    {
      id: 'GENERATED_SURAT',
      label: '15. GENERATED SURAT & PRODUK',
      icon: Sparkles,
      badge: 'AI DRAFT',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      submenus: [
        { id: 'overview', label: 'Overview' },
        { id: 'buat_dokumen', label: 'Buat Dokumen' },
        { id: 'surat', label: 'Surat' },
        { id: 'laporan', label: 'Laporan' },
        { id: 'produk_staf', label: 'Produk Staf' },
        { id: 'rapat_kegiatan', label: 'Rapat & Kegiatan' },
        { id: 'template_library', label: 'Template Library' },
        { id: 'document_library', label: 'Document Library' },
        { id: 'draft', label: 'Draft' },
        { id: 'menunggu_review', label: 'Menunggu Review' },
        { id: 'approved', label: 'Approved' },
        { id: 'archive', label: 'Archive' }
      ]
    },
    {
      id: 'ADMINISTRATION',
      label: '16. PENGATURAN',
      icon: Settings,
      submenus: [
        { id: 'pengguna', label: 'Pengguna' },
        { id: 'hak_akses', label: 'Hak Akses' },
        { id: 'sumber_data', label: 'Sumber Data' },
        { id: 'notifikasi', label: 'Notifikasi' },
        { id: 'audit_aktivitas', label: 'Audit Aktivitas' },
        { id: 'pengaturan_sistem', label: 'Pengaturan Sistem' }
      ]
    },
    {
      id: 'COMMAND_MAP',
      label: 'PETA KOMANDO INTERAKTIF',
      icon: MapPin,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800'
    },
    {
      id: 'COMMAND_AI',
      label: 'ASISTEN KOMANDO AI',
      icon: Bot,
      badge: 'AI',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
    },
    {
      id: 'VERIFICATION_CENTER',
      label: 'PUSAT VERIFIKASI DATA',
      icon: ShieldCheck,
      badge: 'STAF',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
    }
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.submenus && item.submenus.length > 0) {
      if (expandedMenu === item.id) {
        setExpandedMenu(null);
      } else {
        setExpandedMenu(item.id);
        onNavigate(item.id, item.submenus[0].id);
      }
    } else {
      onNavigate(item.id);
      setExpandedMenu(item.id);
    }
  };

  return (
    <aside className="hidden lg:flex w-56 xl:w-64 bg-slate-950 border-r border-slate-800 flex-col h-[calc(100vh-53px)] sticky top-[53px] overflow-y-auto shrink-0 select-none">
      
      <div className="p-3 border-b border-slate-900 text-[10px] font-mono uppercase text-slate-500 tracking-wider flex items-center justify-between">
        <span>Master Navigation</span>
        <span className="text-[9px] px-1 bg-slate-900 border border-slate-800 rounded text-slate-400">12 COL</span>
      </div>

      <nav className="flex-1 px-2 py-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          const isExpanded = expandedMenu === item.id;

          return (
            <div key={item.id} className="space-y-0.5">
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-md font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono border ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.submenus && item.submenus.length > 0 && (
                    isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    )
                  )}
                </div>
              </button>

              {/* Collapsible Submenus */}
              {item.submenus && isExpanded && (
                <div className="pl-8 pr-1 py-1 space-y-0.5 border-l border-slate-800/80 ml-4">
                  {item.submenus.map((sub) => {
                    const isSubActive = activeSubmenu === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => onNavigate(item.id, sub.id)}
                        className={`w-full text-left px-2 py-1 text-[11px] rounded transition-colors block truncate ${
                          isSubActive
                            ? 'text-amber-400 font-bold bg-slate-900'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                        }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-900 bg-slate-950/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
        <span>STATUS: SYSTEM NORMAL</span>
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </aside>
  );
};
