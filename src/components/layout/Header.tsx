import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  Bell, 
  Bot, 
  UserCheck, 
  Lock, 
  ChevronDown,
  Activity,
  Layers,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';
import { UserRole, ClearanceLevel, NavigationMenu } from '../../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  clearance: ClearanceLevel;
  activeMenu: NavigationMenu;
  onNavigate: (menu: NavigationMenu) => void;
  unreadCriticalCount: number;
  unreadWarningCount: number;
  onOpenQuickSearch: () => void;
  onToggleAiDrawer: () => void;
  onOpenInputModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  clearance,
  activeMenu,
  onNavigate,
  unreadCriticalCount,
  unreadWarningCount,
  onOpenQuickSearch,
  onToggleAiDrawer,
  onOpenInputModal
}) => {
  const rolesList: UserRole[] = [
    'Panglima / Komandan',
    'Asintel',
    'Asops',
    'Aspers',
    'Aslog',
    'Administrator'
  ];

  const getClearanceBadgeClass = (level: ClearanceLevel) => {
    switch (level) {
      case 'SANGAT RAHASIA':
        return 'bg-red-950 text-red-300 border-red-800';
      case 'RAHASIA':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'TERBATAS':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 max-w-[1920px] mx-auto">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-bold shadow-sm shrink-0">
            <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold tracking-wider text-sm sm:text-base text-amber-400">COMMAND360</span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                v3.6
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">
              Sistem Informasi Komando Terpadu Batalyon
            </p>
          </div>
        </div>

        {/* Middle: Global Quick Command Search (Desktop / Laptop) */}
        <div className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md mx-4 lg:mx-6">
          <button
            onClick={onOpenQuickSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-md hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">Cari data intel, personel, logistik, arahan...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700 font-mono shrink-0 ml-2">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Controls: + INPUT DATA, Verification Center, Role Switcher, AI & Notifications */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* GLOBAL INPUT DATA BUTTON (Desktop & Tablet) */}
          <button
            onClick={onOpenInputModal}
            className="px-2.5 sm:px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow transition-all shrink-0 min-h-[36px]"
            title="Tambah Data Staf Baru (Intel, Ops, Pers, Log)"
          >
            <PlusCircle className="w-4 h-4 fill-slate-950 text-amber-500" />
            <span className="hidden xs:inline uppercase tracking-wide">+ INPUT DATA</span>
          </button>

          {/* VERIFICATION CENTER SHORTCUT */}
          <button
            onClick={() => onNavigate('VERIFICATION_CENTER')}
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border font-bold transition-all min-h-[36px] ${
              activeMenu === 'VERIFICATION_CENTER'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
            title="Pusat Verifikasi & Publikasi Data"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>VERIFIKASI</span>
          </button>

          {/* Quick Search Mobile Trigger */}
          <button
            onClick={onOpenQuickSearch}
            className="md:hidden p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Cari Data"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Security Clearance Badge */}
          <div className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] xl:text-[11px] font-semibold font-mono tracking-wide ${getClearanceBadgeClass(clearance)}`}>
            <Lock className="w-3 h-3" />
            <span>{clearance}</span>
          </div>

          {/* Role Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md text-slate-200 font-medium transition-colors min-h-[36px]">
              <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="max-w-[85px] xs:max-w-[110px] sm:max-w-none truncate text-[11px] sm:text-xs">{currentRole}</span>
              <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
            </button>
            <div className="absolute right-0 mt-1 w-52 sm:w-56 bg-slate-900 border border-slate-800 rounded-md shadow-xl py-1 hidden group-hover:block z-50">
              <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-mono text-slate-500">
                Pilih Peran / Akses Staf
              </div>
              {rolesList.map((role) => (
                <button
                  key={role}
                  onClick={() => onRoleChange(role)}
                  className={`w-full text-left px-3 py-2 sm:py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    currentRole === role ? 'text-amber-400 font-bold bg-slate-800/50' : 'text-slate-300'
                  }`}
                >
                  <span className="truncate">{role}</span>
                  {currentRole === role && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Command AI Toggle Button (Desktop & Tablet) */}
          <button
            onClick={() => onNavigate('COMMAND_AI')}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border font-medium transition-all min-h-[36px] ${
              activeMenu === 'COMMAND_AI'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-amber-500/50'
            }`}
            title="Buka Command AI Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400 active:text-slate-950" />
            <span className="hidden md:inline">COMMAND AI</span>
          </button>

          {/* Notification Button with Counter */}
          <button
            onClick={() => onNavigate('NOTIFICATION')}
            className="relative p-2 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Pusat Notifikasi Alert"
          >
            <Bell className="w-4 h-4" />
            {(unreadCriticalCount > 0 || unreadWarningCount > 0) && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-600 rounded-full border border-slate-950 animate-pulse">
                {unreadCriticalCount + unreadWarningCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
