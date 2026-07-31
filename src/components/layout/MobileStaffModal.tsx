import React, { useState } from 'react';
import { 
  Eye, 
  Crosshair, 
  Users, 
  Truck, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Shield 
} from 'lucide-react';
import { NavigationMenu } from '../../types';

interface MobileStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStaff: (menu: NavigationMenu, submenu?: string) => void;
  currentMenu: NavigationMenu;
  currentSubmenu?: string;
}

export const MobileStaffModal: React.FC<MobileStaffModalProps> = ({
  isOpen,
  onClose,
  onSelectStaff,
  currentMenu,
  currentSubmenu
}) => {
  const [expandedStaff, setExpandedStaff] = useState<NavigationMenu | null>(
    ['INTELIJEN', 'OPERASI', 'PERSONEL', 'LOGISTIK'].includes(currentMenu) ? currentMenu : null
  );

  if (!isOpen) return null;

  const staffModules = [
    {
      id: 'INTELIJEN' as NavigationMenu,
      code: 'STAF-2',
      name: 'INTELIJEN',
      subtitle: 'Situation Awareness & Risk Assessment',
      icon: Eye,
      color: 'amber',
      bgGradient: 'from-amber-950/60 to-slate-900',
      border: 'border-amber-500/40',
      iconColor: 'text-amber-400',
      submenus: [
        { id: 'intel_overview', label: 'Intelligence Overview' },
        { id: 'data_informasi', label: 'Data & Informasi Geografi/Obvitnas' },
        { id: 'monitoring_situasi', label: 'Monitoring Situasi & Kejadian' },
        { id: 'intel_map', label: 'Intelligence Map' },
        { id: 'analisis_intel', label: 'Analisis & Risk Assessment' },
        { id: 'produk_intel', label: 'Produk Intelijen Terbit' }
      ]
    },
    {
      id: 'OPERASI' as NavigationMenu,
      code: 'STAF-3',
      name: 'OPERASI',
      subtitle: 'Readiness & Campaign Execution',
      icon: Crosshair,
      color: 'purple',
      bgGradient: 'from-purple-950/60 to-slate-900',
      border: 'border-purple-500/40',
      iconColor: 'text-purple-400',
      submenus: [
        { id: 'ops_overview', label: 'Operations Overview' },
        { id: 'program_kegiatan', label: 'Program & Kalender Kegiatan' },
        { id: 'latihan', label: 'Latihan & Gladi Posko' },
        { id: 'kesiapan_satuan', label: 'Kesiapan Satuan Tempur' },
        { id: 'monitoring_pelaksanaan', label: 'Monitoring Pelaksanaan Ops' },
        { id: 'pelaporan_operasi', label: 'Pelaporan & AAR Repository' }
      ]
    },
    {
      id: 'PERSONEL' as NavigationMenu,
      code: 'STAF-1',
      name: 'PERSONEL',
      subtitle: 'Strength, Structure & Career Management',
      icon: Users,
      color: 'blue',
      bgGradient: 'from-blue-950/60 to-slate-900',
      border: 'border-blue-500/40',
      iconColor: 'text-blue-400',
      submenus: [
        { id: 'pers_overview', label: 'Personnel Overview' },
        { id: 'master_personel', label: 'Master Personel & NRP' },
        { id: 'kekuatan_dspp', label: 'Kekuatan DSPP vs Riil' },
        { id: 'struktur_jabatan', label: 'Struktur Jabatan & Pengisian' },
        { id: 'pendidikan_kompetensi', label: 'Pendidikan & Kompetensi' },
        { id: 'kehadiran', label: 'Kehadiran & Ketersediaan' }
      ]
    },
    {
      id: 'LOGISTIK' as NavigationMenu,
      code: 'STAF-4',
      name: 'LOGISTIK',
      subtitle: 'Material Readiness & Supply Chain',
      icon: Truck,
      color: 'emerald',
      bgGradient: 'from-emerald-950/60 to-slate-900',
      border: 'border-emerald-500/40',
      iconColor: 'text-emerald-400',
      submenus: [
        { id: 'log_overview', label: 'Logistics Overview' },
        { id: 'master_materiil', label: 'Master Materiil & Alutsista' },
        { id: 'inventaris', label: 'Inventaris & Stock Opname' },
        { id: 'ranmor_pemeliharaan', label: 'Kendaraan & Maintenance' },
        { id: 'bekal_persediaan', label: 'Bekal & Persediaan Kritis' },
        { id: 'fasilitas', label: 'Fasilitas & Utilitas' }
      ]
    }
  ];

  const handleStaffClick = (staffId: NavigationMenu, firstSubmenu: string) => {
    if (expandedStaff === staffId) {
      setExpandedStaff(null);
    } else {
      setExpandedStaff(staffId);
    }
  };

  const handleSubmenuSelect = (staffId: NavigationMenu, subId: string) => {
    onSelectStaff(staffId, subId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-sm font-extrabold text-slate-100 tracking-wider uppercase">PILIH STAF KOMANDO</h2>
            <p className="text-[10px] text-slate-400 font-mono">Mobile Staff Selection & Submenu Drill-Down</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-100 rounded-lg bg-slate-800 hover:bg-slate-700 min-w-[40px] min-h-[40px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Touch Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {staffModules.map((staff) => {
          const Icon = staff.icon;
          const isExpanded = expandedStaff === staff.id;
          const isActiveStaff = currentMenu === staff.id;

          return (
            <div
              key={staff.id}
              className={`rounded-xl border transition-all overflow-hidden ${
                isActiveStaff 
                  ? `${staff.border} bg-slate-900 shadow-lg ring-1 ring-amber-500/30` 
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              {/* Main Touch Card Header */}
              <button
                onClick={() => handleStaffClick(staff.id, staff.submenus[0].id)}
                className={`w-full p-4 flex items-center justify-between text-left min-h-[64px] bg-gradient-to-r ${staff.bgGradient}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center shrink-0 ${staff.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {staff.code}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-100 tracking-wide">{staff.name}</h3>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{staff.subtitle}</p>
                  </div>
                </div>

                <div className="p-1.5 rounded-md bg-slate-950/60 border border-slate-800 text-slate-400 shrink-0">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-amber-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Accordion / Submenu Drill-down List */}
              {isExpanded && (
                <div className="p-2 bg-slate-950/90 border-t border-slate-800/80 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                    SUBMENU STAF {staff.name}
                  </div>
                  {staff.submenus.map((sub) => {
                    const isSubSelected = currentMenu === staff.id && currentSubmenu === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleSubmenuSelect(staff.id, sub.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                          isSubSelected
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                            : 'text-slate-300 hover:bg-slate-900 active:bg-slate-800'
                        }`}
                      >
                        <span>{sub.label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
