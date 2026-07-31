import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';

// Views
import { CommandCenterView } from './components/views/CommandCenterView';
import { IntelijenView } from './components/views/IntelijenView';
import { OperasiView } from './components/views/OperasiView';
import { PersonelView } from './components/views/PersonelView';
import { LogistikView } from './components/views/LogistikView';
import { KesehatanView } from './components/views/KesehatanView';
import { SatuanView } from './components/views/SatuanView';
import { TpControlView } from './components/views/TpControlView';
import { CommandMapView } from './components/views/CommandMapView';
import { CommandAiView } from './components/views/CommandAiView';
import { CommandTaskView } from './components/views/CommandTaskView';
import { ReportCenterView } from './components/views/ReportCenterView';
import { DocumentCenterView } from './components/views/DocumentCenterView';
import { NotificationCenterView } from './components/views/NotificationCenterView';
import { AnalyticsCenterView } from './components/views/AnalyticsCenterView';
import { CalendarView } from './components/views/CalendarView';
import { KnowledgeCenterView } from './components/views/KnowledgeCenterView';
import { AdminSystemView } from './components/views/AdminSystemView';
import { VerificationCenterView } from './components/views/VerificationCenterView';
import { GeneratedSuratView } from './components/views/GeneratedSuratView';

import { QuickSearchModal } from './components/common/QuickSearchModal';
import { GlobalInputModal } from './components/common/GlobalInputModal';

import { NavigationMenu, UserRole, ClearanceLevel, StaffDataRecord, WorkflowStatus } from './types';
import { mockExecutiveData, mockNotifications, mockStaffDataRecords } from './data/mockData';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<NavigationMenu>('COMMAND_CENTER');
  const [activeSubmenu, setActiveSubmenu] = useState<string>('executive_dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Panglima / Komandan');
  const [clearance, setClearance] = useState<ClearanceLevel>('SANGAT RAHASIA');
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  
  // Input Data & Workflow State
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [staffRecords, setStaffRecords] = useState<StaffDataRecord[]>(mockStaffDataRecords);

  // Automatically update clearance when switching roles
  useEffect(() => {
    switch (userRole) {
      case 'Panglima / Komandan':
        setClearance('SANGAT RAHASIA');
        break;
      case 'Asintel':
        setClearance('RAHASIA');
        break;
      case 'Asops':
        setClearance('RAHASIA');
        break;
      case 'Aspers':
        setClearance('BIASA');
        break;
      case 'Aslog':
        setClearance('TERBATAS');
        break;
      default:
        setClearance('SANGAT RAHASIA');
    }
  }, [userRole]);

  // Global Ctrl+K Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (menu: NavigationMenu, submenu?: string) => {
    setActiveMenu(menu);
    if (submenu) {
      setActiveSubmenu(submenu);
    } else {
      // Default submenus
      switch (menu) {
        case 'COMMAND_CENTER': setActiveSubmenu('executive_dashboard'); break;
        case 'INTELIJEN': setActiveSubmenu('intel_overview'); break;
        case 'OPERASI': setActiveSubmenu('ops_overview'); break;
        case 'PERSONEL': setActiveSubmenu('pers_overview'); break;
        case 'LOGISTIK': setActiveSubmenu('log_overview'); break;
        default: setActiveSubmenu('');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateRecord = (newRecord: StaffDataRecord) => {
    setStaffRecords(prev => [newRecord, ...prev]);
  };

  const handleUpdateRecordStatus = (recordId: string, newStatus: WorkflowStatus, note?: string) => {
    const nowStr = new Date().toLocaleString('id-ID');
    setStaffRecords(prev =>
      prev.map(rec => {
        if (rec.id === recordId) {
          const actionName = 
            newStatus === 'VERIFIED' ? 'Telah Diverifikasi' :
            newStatus === 'PUBLISHED' ? 'Diterbitkan ke Command Center & Map' :
            newStatus === 'RETURNED' ? 'Dikembalikan untuk Revisi' : `Status diubah ke ${newStatus}`;
          
          return {
            ...rec,
            workflowStatus: newStatus,
            revisionNote: note || rec.revisionNote,
            auditTrail: [
              ...rec.auditTrail,
              {
                timestamp: nowStr,
                user: userRole,
                action: actionName,
                note: note || `Status diperbarui menjadi ${newStatus}`
              }
            ]
          };
        }
        return rec;
      })
    );
  };

  const renderCurrentView = () => {
    switch (activeMenu) {
      case 'COMMAND_CENTER':
        return (
          <CommandCenterView 
            activeSubmenu={activeSubmenu}
            onNavigate={handleNavigate} 
            userRole={userRole} 
            publishedRecords={staffRecords.filter(r => r.workflowStatus === 'PUBLISHED')}
          />
        );
      case 'SATUAN':
        return <SatuanView activeSubmenu={activeSubmenu} onNavigateSubmenu={(sub) => handleNavigate('SATUAN', sub)} />;
      case 'PERSONEL':
        return <PersonelView activeSubmenu={activeSubmenu} />;
      case 'OPERASI':
        return <OperasiView activeSubmenu={activeSubmenu} />;
      case 'LOGISTIK':
        return <LogistikView activeSubmenu={activeSubmenu} />;
      case 'PANGKALAN':
        return <LogistikView activeSubmenu={activeSubmenu || 'log_facilities'} />;
      case 'PEMBANGUNAN':
        return <TpControlView activeSubmenu={activeSubmenu || 'tp_konstruksi'} onNavigateToCompany={(comp) => handleNavigate('SATUAN', comp)} />;
      case 'TP_CONTROL':
        return <TpControlView activeSubmenu={activeSubmenu} onNavigateToCompany={(comp) => handleNavigate('SATUAN', comp)} />;
      case 'KETAHANAN_PANGAN':
        return <TpControlView activeSubmenu={activeSubmenu || 'tp_pertanian'} onNavigateToCompany={(comp) => handleNavigate('SATUAN', comp)} />;
      case 'KESEHATAN':
        return <KesehatanView activeSubmenu={activeSubmenu} />;
      case 'TERITORIAL_MASYARAKAT':
        return <IntelijenView activeSubmenu={activeSubmenu || 'intel_komsos'} userClearance={clearance} userRole={userRole} />;
      case 'PRESTASI':
        return <PersonelView activeSubmenu={activeSubmenu || 'atlet_prestasi'} />;
      case 'KENDALA_KEBUTUHAN':
        return <CommandTaskView />;
      case 'REPORT_CENTER':
        return <ReportCenterView />;
      case 'ADMINISTRATION':
        return <AdminSystemView mode="ADMINISTRATION" />;
      case 'VERIFICATION_CENTER':
        return (
          <VerificationCenterView
            records={staffRecords}
            onUpdateRecordStatus={handleUpdateRecordStatus}
            userRole={userRole}
          />
        );
      case 'INTELIJEN':
        return <IntelijenView activeSubmenu={activeSubmenu} userClearance={clearance} userRole={userRole} />;
      case 'COMMAND_MAP':
        return (
          <CommandMapView 
            publishedRecords={staffRecords.filter(r => r.workflowStatus === 'PUBLISHED')} 
          />
        );
      case 'COMMAND_AI':
        return <CommandAiView userRole={userRole} />;
      case 'COMMAND_TASK':
        return <CommandTaskView />;
      case 'DOCUMENT_CENTER':
        return <DocumentCenterView />;
      case 'GENERATED_SURAT':
        return <GeneratedSuratView activeSubmenu={activeSubmenu} userRole={userRole} />;
      case 'NOTIFICATION':
        return <NotificationCenterView />;
      case 'ANALYTICS':
        return <AnalyticsCenterView />;
      case 'CALENDAR':
        return <CalendarView />;
      case 'KNOWLEDGE':
        return <KnowledgeCenterView />;
      case 'SYSTEM_CENTER':
        return <AdminSystemView mode="SYSTEM_CENTER" />;
      default:
        return (
          <CommandCenterView 
            onNavigate={handleNavigate} 
            userRole={userRole} 
            publishedRecords={staffRecords.filter(r => r.workflowStatus === 'PUBLISHED')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans antialiased flex flex-col selection:bg-amber-500 selection:text-slate-950 tactical-grid-bg pb-16 lg:pb-0">
      
      {/* Top Header */}
      <Header
        currentRole={userRole}
        onRoleChange={setUserRole}
        clearance={clearance}
        activeMenu={activeMenu}
        onNavigate={handleNavigate}
        unreadCriticalCount={mockExecutiveData.criticalAlertCount}
        unreadWarningCount={mockExecutiveData.warningAlertCount}
        onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
        onToggleAiDrawer={() => handleNavigate('COMMAND_AI')}
        onOpenInputModal={() => setIsInputModalOpen(true)}
      />

      {/* Main Body Layout */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <Sidebar
          activeMenu={activeMenu}
          onNavigate={handleNavigate}
          activeSubmenu={activeSubmenu}
          criticalCount={mockExecutiveData.criticalAlertCount}
        />

        {/* Content View */}
        <main className="flex-1 p-3 sm:p-4 md:p-5 max-w-[1920px] mx-auto w-full overflow-x-hidden">
          {renderCurrentView()}
        </main>

      </div>

      {/* Mobile Bottom Bar & Floating Input FAB */}
      <BottomNav
        activeMenu={activeMenu}
        onNavigate={handleNavigate}
        onOpenMobileStaff={() => handleNavigate('INTELIJEN')}
        onOpenMobileDrawer={() => setIsQuickSearchOpen(true)}
        onOpenInputModal={() => setIsInputModalOpen(true)}
        unreadCount={mockExecutiveData.criticalAlertCount}
      />

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Global Staff Input Modal */}
      <GlobalInputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onSubmitRecord={handleCreateRecord}
      />

    </div>
  );
}
