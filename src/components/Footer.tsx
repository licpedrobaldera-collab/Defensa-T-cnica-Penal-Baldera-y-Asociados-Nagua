import React from 'react';
import { Scale, MapPin, Phone, Mail, Shield } from 'lucide-react';

interface FooterProps {
  onOpenSync: () => void;
  onTabChange: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSync, onTabChange }) => {
  return (
    <footer className="mt-16 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-legal-heading font-bold text-base">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>Baldera & Asociados · Estudio Jurídico</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Despacho profesional encabezado por el Lic. Pedro Baldera Germán. Ejercicio riguroso del
              derecho penal sustantivo y adjetivo, recursos de casación, garantías del debido proceso y
              defensoría regional de los derechos humanos.
            </p>
            <div className="flex items-center gap-2 text-slate-500 pt-1">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Colegio de Abogados de la República Dominicana (CARD)</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Secciones
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onTabChange('casos')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Expedientes Penales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('ddhh')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Defensoría DD.HH. (CNDH)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('plazos')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Calculadora de Plazos CPP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('redactor')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Redactor de Instancias
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('consultas')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Agenda de Consultas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Sede & Contacto
            </div>
            <div className="space-y-1 text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Nagua, Provincia María Trinidad Sánchez, República Dominicana</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>licpedrobaldera@gmail.com</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenSync}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer font-mono"
              >
                Vinculación con Applet 2878b1a1-3a06-42d3-a781-6853f6af50c6
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Baldera & Asociados. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Jurisdicción de la República Dominicana</span>
            <span aria-hidden="true">·</span>
            <span>Ley 76-02 & Ley 10-15</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
