import React from 'react';
import { Scale, Link2 } from 'lucide-react';

interface TopNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenSync: () => void;
  onOpenNewCase: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onTabChange,
  onOpenSync,
  onOpenNewCase,
}) => {
  const navItems = [
    { id: 'casos', label: 'Casos & Expedientes' },
    { id: 'ddhh', label: 'Defensoría DD.HH.' },
    { id: 'plazos', label: 'Plazos Procesales' },
    { id: 'redactor', label: 'Redactor Jurídico' },
    { id: 'consultas', label: 'Consultas & Citas' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('casos')}
              className="flex items-center gap-2.5 text-left text-white font-legal-heading text-lg font-bold tracking-tight hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Scale className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">Baldera & Asociados</span>
            </button>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-amber-400 font-semibold border-b-2 border-amber-400'
                      : 'hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary action button + quick applet link */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSync}
              title="Ver vinculación con Applet 2878b1a1"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Link2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Applet 2878b1a1</span>
            </button>
            <button
              onClick={onOpenNewCase}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              + Nuevo Expediente
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden overflow-x-auto border-t border-slate-800 px-4 py-2 flex items-center gap-2 scrollbar-none bg-slate-900/95">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`px-3 py-1 text-xs whitespace-nowrap rounded-md shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
