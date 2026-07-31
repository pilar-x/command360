import React, { useState, useEffect } from 'react';
import { 
  Search, 
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
  ArrowRight
} from 'lucide-react';
import { NavigationMenu } from '../../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (menu: NavigationMenu, submenu?: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks: Array<{ label: string; menu: NavigationMenu; submenu?: string; icon: React.ElementType }> = [
    { label: 'Executive Command Dashboard', menu: 'COMMAND_CENTER', icon: LayoutDashboard },
    { label: 'Situasi Terkini & Critical Alerts', menu: 'COMMAND_CENTER', submenu: 'critical_alerts', icon: LayoutDashboard },
    { label: 'Staf 2 Intelijen • Intelligence Overview', menu: 'INTELIJEN', icon: Eye },
    { label: 'Staf 3 Operasi • Operations & Readiness', menu: 'OPERASI', icon: Crosshair },
    { label: 'Staf 1 Personel • Master Personel & DSPP', menu: 'PERSONEL', icon: Users },
    { label: 'Staf 4 Logistik • Master Materiil & Stok Kritis', menu: 'LOGISTIK', icon: Truck },
    { label: 'Command Map Live • Tactical Geospatial', menu: 'COMMAND_MAP', icon: MapPin },
    { label: 'COMMAND AI Assistant • Natural Language Query', menu: 'COMMAND_AI', icon: Bot },
    { label: 'Arahan Pimpinan & Disposisi Control', menu: 'COMMAND_TASK', icon: CheckSquare },
    { label: 'Generated Surat & Produk Staf (AI Document Generator)', menu: 'GENERATED_SURAT', icon: FileText },
    { label: 'Report Center • Laporan Empat Staf', menu: 'REPORT_CENTER', icon: FileText },
  ];

  const filteredLinks = quickLinks.filter(l => l.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-xl w-full shadow-2xl overflow-hidden space-y-2">
        
        {/* Search Bar Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
          <Search className="w-4 h-4 text-amber-400 shrink-0" />
          <input 
            type="text"
            autoFocus
            placeholder="Pencarian cepat COMMAND360 (Ketik modul, direktif, atau data...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-100 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-500 hover:text-slate-300">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          <div className="px-3 py-1 text-[10px] text-slate-500 uppercase">
            Pintasan Navigasi Modul
          </div>

          {filteredLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(item.menu, item.submenu);
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>
            );
          })}
        </div>

        <div className="p-2 border-t border-slate-800 bg-slate-950 text-[10px] text-slate-500 font-mono text-right px-4">
          Tekan <kbd className="bg-slate-800 px-1 rounded text-slate-300">ESC</kbd> untuk menutup
        </div>

      </div>
    </div>
  );
};
