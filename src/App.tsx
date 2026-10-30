import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { Footer } from './components/Footer';
import { CaseManagementView } from './components/CaseManagementView';
import { HumanRightsDesk } from './components/HumanRightsDesk';
import { DeadlineCalculator } from './components/DeadlineCalculator';
import { LegalBriefWriter } from './components/LegalBriefWriter';
import { ConsultationsView } from './components/ConsultationsView';
import { AppletSyncModal } from './components/AppletSyncModal';
import { INITIAL_CASES, INITIAL_COMPLAINTS } from './data/legalData';
import { LegalCase, HumanRightsComplaint } from './types/legal';
import { Link2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('casos');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Cases state with local persistence
  const [cases, setCases] = useState<LegalCase[]>(() => {
    try {
      const saved = localStorage.getItem('baldera_cases');
      return saved ? JSON.parse(saved) : INITIAL_CASES;
    } catch {
      return INITIAL_CASES;
    }
  });

  // Complaints state with local persistence
  const [complaints, setComplaints] = useState<HumanRightsComplaint[]>(() => {
    try {
      const saved = localStorage.getItem('baldera_complaints');
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  });

  // State for prefilling LegalBriefWriter from cases or complaints
  const [draftPrefill, setDraftPrefill] = useState<{
    templateId?: string;
    values?: Record<string, string>;
  }>({});

  useEffect(() => {
    try {
      localStorage.setItem('baldera_cases', JSON.stringify(cases));
    } catch {
      // storage quota or private mode fallback
    }
  }, [cases]);

  useEffect(() => {
    try {
      localStorage.setItem('baldera_complaints', JSON.stringify(complaints));
    } catch {
      // storage quota fallback
    }
  }, [complaints]);

  const handleAddCase = (newCase: LegalCase) => {
    setCases((prev) => [newCase, ...prev]);
  };

  const handleUpdateCase = (updated: LegalCase) => {
    setCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleAddComplaint = (newComplaint: HumanRightsComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  // Shortcut from case details to writer
  const handleOpenDraftForCase = (c: LegalCase) => {
    const isCese =
      c.etapa === 'fase_preparatoria' ||
      c.medidaActual.toLowerCase().includes('prisión preventiva');
    const templateId = isCese ? 'cese-prision-241' : 'apelacion-medida-410';

    setDraftPrefill({
      templateId,
      values: {
        imputado: c.cliente,
        cedula: c.cedulaCliente,
        expediente: c.expedienteNo,
        juez: `Al Magistrado Juez del ${c.tribunal}`,
        recinto: 'Recinto Carcelario Fortaleza Olegario Tenares de Nagua',
      },
    });
    setCurrentTab('redactor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shortcut from complaint to habeas corpus writer
  const handleGenerateHabeasCorpus = (complaint: HumanRightsComplaint) => {
    setDraftPrefill({
      templateId: 'habeas-corpus-71',
      values: {
        afectado: complaint.victima,
        autoridad: complaint.autoridadSenalada,
        hechos: complaint.descripcionHechos,
      },
    });
    setCurrentTab('redactor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Data import/export handlers for the Applet sync modal
  const handleImportData = (dataStr: string): boolean => {
    try {
      const parsed = JSON.parse(dataStr);
      if (Array.isArray(parsed.cases)) {
        setCases(parsed.cases);
      }
      if (Array.isArray(parsed.complaints)) {
        setComplaints(parsed.complaints);
      }
      return true;
    } catch {
      // If it's prompt text or notes, we still accept it as feedback
      return false;
    }
  };

  const handleExportData = (): string => {
    return JSON.stringify(
      {
        cases,
        complaints,
        exportDate: new Date().toISOString(),
        firm: 'Baldera & Asociados',
        attorney: 'Lic. Pedro Baldera Germán',
      },
      null,
      2
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Banner Notice regarding linked Applet UUID */}
      <div className="bg-slate-950 text-slate-300 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-slate-400 font-mono text-[11px] truncate">
              Espacio Activo · Vinculado a Applet AI Studio: <strong className="text-slate-200">2878b1a1-3a06-42d3-a781-6853f6af50c6</strong>
            </span>
          </div>
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 shrink-0 cursor-pointer"
          >
            <Link2 className="w-3 h-3" />
            <span>Detalles de Sincronización</span>
          </button>
        </div>
      </div>

      {/* Top Navigation Bar adhering to 3-zone contract */}
      <TopNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenNewCase={() => {
          setCurrentTab('casos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'casos' && (
          <CaseManagementView
            cases={cases}
            onAddCase={handleAddCase}
            onUpdateCase={handleUpdateCase}
            onOpenDraftForCase={handleOpenDraftForCase}
          />
        )}

        {currentTab === 'ddhh' && (
          <HumanRightsDesk
            complaints={complaints}
            onAddComplaint={handleAddComplaint}
            onGenerateHabeasCorpus={handleGenerateHabeasCorpus}
          />
        )}

        {currentTab === 'plazos' && <DeadlineCalculator />}

        {currentTab === 'redactor' && (
          <LegalBriefWriter
            initialTemplateId={draftPrefill.templateId}
            initialValues={draftPrefill.values}
          />
        )}

        {currentTab === 'consultas' && <ConsultationsView />}
      </main>

      {/* Applet Synchronization & Transfer Modal */}
      <AppletSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onImportData={handleImportData}
        onExportData={handleExportData}
      />

      {/* Clean Legal Footer */}
      <Footer
        onOpenSync={() => setIsSyncModalOpen(true)}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
