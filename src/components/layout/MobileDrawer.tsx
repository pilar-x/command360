import React from 'react';
import { 
  X, 
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
  UserCheck, 
  Lock, 
  ChevronRight 
} from 'lucide-react';
import { NavigationMenu, UserRole, ClearanceLevel } from '../../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: NavigationMenu;
  onNavigate: (menu: NavigationMenu, submenu?: string) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  clearance: ClearanceLevel;
  criticalCount: number;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeMenu,
  onNavigate,
  currentRole,
  onRoleChange,
  clearance,
  criticalCount
}) => {
  if (!isOpen) return null;

  const rolesList: UserRole[] = [
    'Panglima / Komandan',
    'Asintel',
    'Asops',
    'Aspers',
    'Aslog',
    'Administrator'
  ];

  const menuSections = [
    {
      title: 'UTAMA & COMMAND',
      items: [
        { id: 'COMMAND_CENTER' as NavigationMenu, label: 'Command Center Overview', icon: LayoutDashboard },
        { id: 'COMMAND_MAP' as NavigationMenu, label: 'Command Map & Geo-Spatial', icon: MapPin, badge: 'LIVE' },
        { id: 'COMMAND_AI' as NavigationMenu, label: 'Command AI Assistant', icon: Bot, badge: 'AI' },
        { id: 'COMMAND_TASK' as NavigationMenu, label: 'Command Directives & Task', icon: CheckSquare, badge: '18 Directives' },
      ]
    },
    {
      title: 'STAF KOMANDO',
      items: [
        { id: 'INTELIJEN' as NavigationMenu, label: 'Staf 2 Intelijen', icon: Eye },
        { id: 'OPERASI' as NavigationMenu, label: 'Staf 3 Operasi', icon: Crosshair },
        { id: 'PERSONEL' as NavigationMenu, label: 'Staf 1 Personel', icon: Users },
        { id: 'LOGISTIK' as NavigationMenu, label: 'Staf 4 Logistik', icon: Truck },
      ]
    },
    {
      title: 'ANALISIS, DOKUMEN & LAINNYA',
      items: [
        { id: 'REPORT_CENTER' as NavigationMenu, label: 'Report Center & Briefing', icon: FileText },
        { id: 'DOCUMENT_CENTER' as NavigationMenu, label: 'Document & Archive', icon: FolderGit2 },
        { id: 'ANALYTICS' as NavigationMenu, label: 'Executive Analytics', icon: BarChart3 },
        { id: 'CALENDAR' as NavigationMenu, label: 'Agenda & Kalender Kegiatan', icon: Calendar },
        { id: 'KNOWLEDGE' as NavigationMenu, label: 'Knowledge Base & Doktrin', icon: BookOpen },
        { id: 'NOTIFICATION' as NavigationMenu, label: 'Notification Alert Center', icon: Bell, badge: criticalCount > 0 ? `${criticalCount} Alert` : undefined },
        { id: 'ADMINISTRATION' as NavigationMenu, label: 'Sistem Administrasi', icon: Settings },
        { id: 'SYSTEM_CENTER' as NavigationMenu, label: 'System Health & Security', icon: Cpu },
      ]
    }
  ];

  const handleSelectMenu = (menuId: NavigationMenu) => {
    onNavigate(menuId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div>
          <h2 className="text-sm font-extrabold text-amber-400 tracking-wider">COMMAND360 MENU</h2>
          <p className="text-[10px] text-slate-400 font-mono">Navigasi Seluruh Fitur & Modul System</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-slate-100 rounded-lg bg-slate-800 hover:bg-slate-700 min-w-[40px] min-h-[40px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role & Clearance Card Bar */}
      <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">STATUS CLEARANCE:</span>
          <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {clearance}
          </span>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-400 uppercase">Peran / Jabatan Aktif:</label>
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs font-semibold text-amber-400 font-mono"
          >
            {rolesList.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {menuSections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest px-1">
              {sec.title}
            </h3>
            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMenu(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all min-h-[48px] ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'text-slate-200 bg-slate-900/60 hover:bg-slate-900 active:bg-slate-800 border border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-800 text-amber-400 border border-slate-700">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
