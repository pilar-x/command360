import React from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  MapPin, 
  Bot, 
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { NavigationMenu } from '../../types';

interface BottomNavProps {
  activeMenu: NavigationMenu;
  onNavigate: (menu: NavigationMenu, submenu?: string) => void;
  onOpenMobileStaff: () => void;
  onOpenMobileDrawer: () => void;
  onOpenInputModal: () => void;
  isMobileStaffActive?: boolean;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeMenu,
  onNavigate,
  onOpenMobileStaff,
  onOpenMobileDrawer,
  onOpenInputModal,
  isMobileStaffActive,
  unreadCount = 0
}) => {
  const isHomeActive = activeMenu === 'COMMAND_CENTER' && !isMobileStaffActive;
  const isMapActive = activeMenu === 'COMMAND_MAP' && !isMobileStaffActive;
  const isAiActive = activeMenu === 'COMMAND_AI' && !isMobileStaffActive;
  const isMoreActive = ![
    'COMMAND_CENTER', 
    'COMMAND_MAP', 
    'COMMAND_AI'
  ].includes(activeMenu) && !isMobileStaffActive;

  return (
    <>
      {/* Mobile Floating Action Button (FAB) for Instant Quick Input */}
      <button
        onClick={onOpenInputModal}
        className="lg:hidden fixed bottom-16 right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-2xl flex items-center justify-center border-2 border-slate-950 active:scale-95 transition-transform"
        title="Input Data Baru (+)"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 z-40 lg:hidden px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
          
          {/* 1. HOME */}
          <button
            onClick={() => onNavigate('COMMAND_CENTER')}
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] rounded-lg transition-all ${
              isHomeActive
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${isHomeActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-wide mt-0.5">HOME</span>
          </button>

          {/* 2. STAFF */}
          <button
            onClick={onOpenMobileStaff}
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] rounded-lg transition-all ${
              isMobileStaffActive || ['INTELIJEN', 'OPERASI', 'PERSONEL', 'LOGISTIK'].includes(activeMenu)
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className={`w-5 h-5 ${isMobileStaffActive || ['INTELIJEN', 'OPERASI', 'PERSONEL', 'LOGISTIK'].includes(activeMenu) ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-wide mt-0.5">STAFF</span>
          </button>

          {/* 3. MAP */}
          <button
            onClick={() => onNavigate('COMMAND_MAP')}
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] rounded-lg transition-all relative ${
              isMapActive
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className={`w-5 h-5 ${isMapActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-wide mt-0.5">MAP</span>
            <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </button>

          {/* 4. AI */}
          <button
            onClick={() => onNavigate('COMMAND_AI')}
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] rounded-lg transition-all ${
              isAiActive
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className={`w-5 h-5 ${isAiActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-wide mt-0.5">AI</span>
          </button>

          {/* 5. MORE */}
          <button
            onClick={onOpenMobileDrawer}
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] rounded-lg transition-all relative ${
              isMoreActive
                ? 'text-amber-400 font-bold bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="text-[10px] tracking-wide mt-0.5">MORE</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-red-500" />
            )}
          </button>

        </div>
      </nav>
    </>
  );
};
