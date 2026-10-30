import React, { useState } from 'react';
import { HumanRightsComplaint } from '../types/legal';
import {
  ShieldAlert,
  Plus,
  Scale,
  FileText,
  AlertCircle,
  MapPin,
  Calendar,
  User,
  CheckCircle2,
  X,
  Send
} from 'lucide-react';

interface HumanRightsDeskProps {
  complaints: HumanRightsComplaint[];
  onAddComplaint: (newComplaint: HumanRightsComplaint) => void;
  onGenerateHabeasCorpus: (complaint: HumanRightsComplaint) => void;
}

export const HumanRightsDesk: React.FC<HumanRightsDeskProps> = ({
  complaints,
  onAddComplaint,
  onGenerateHabeasCorpus,
}) => {
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<HumanRightsComplaint | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    victima: '',
    lugarIncidente: 'Nagua, María Trinidad Sánchez',
    autoridadSenalada: 'Destacamento de la Policía Nacional de Nagua',
    derechoVulnerado: 'Detención arbitraria y transgresión del plazo constitucional de 48 horas',
    articuloConstitucional: 'Art. 40 (num. 5 y 6) y Art. 69 Constitución Dominicana',
    urgencia: 'Inmediata (Privación de libertad)' as const,
    descripcionHechos: '',
  });

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.victima || !formData.descripcionHechos) return;

    const count = complaints.length + 1;
    const item: HumanRightsComplaint = {
      id: `cndh-${Date.now()}`,
      numeroRegistro: `CNDH-MTS-2026-${count.toString().padStart(3, '0')}`,
      victima: formData.victima,
      lugarIncidente: formData.lugarIncidente,
      fechaIncidente: new Date().toISOString().slice(0, 10),
      autoridadSenalada: formData.autoridadSenalada,
      derechoVulnerado: formData.derechoVulnerado,
      articuloConstitucional: formData.articuloConstitucional,
      estadoTramite: 'En Investigación',
      descripcionHechos: formData.descripcionHechos,
      urgencia: formData.urgencia,
      accionesRealizadas: [
        'Registro inicial de queja por la Coordinación Regional de la CNDH.',
        'Notificación y levantamiento preliminar de testimonios.',
      ],
    };

    onAddComplaint(item);
    setIsNewComplaintOpen(false);
    setFormData({
      victima: '',
      lugarIncidente: 'Nagua, María Trinidad Sánchez',
      autoridadSenalada: 'Destacamento de la Policía Nacional de Nagua',
      derechoVulnerado: 'Detención arbitraria y transgresión del plazo constitucional de 48 horas',
      articuloConstitucional: 'Art. 40 (num. 5 y 6) y Art. 69 Constitución Dominicana',
      urgencia: 'Inmediata (Privación de libertad)',
      descripcionHechos: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/src/assets/images/human_rights_courthouse_1793324905904.jpg"
            alt="Defensoría de Derechos Humanos Nagua"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-3 text-xs text-amber-300 font-medium">
            <span>Comisión Nacional de los Derechos Humanos (CNDH)</span>
            <span aria-hidden="true">·</span>
            <span>Coordinación Regional María Trinidad Sánchez</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-legal-heading tracking-tight text-white leading-tight">
            Defensoría de Derechos Humanos & Garantías Fundamentales
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unidad especializada de monitoreo, recepción de denuncias ciudadanas y articulación de
            acciones constitucionales (Hábeas Corpus, Amparo y Tutela Judicial Efectiva) liderada por el
            Lic. Pedro Baldera Germán para salvaguardar la dignidad humana en toda la región nordeste.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsNewComplaintOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Nueva Denuncia Ciudadana</span>
            </button>
          </div>
        </div>
      </section>

      {/* Constitutional Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <div className="text-amber-600 font-mono text-xs font-semibold">
            Art. 40 Constitución R.D.
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Libertad & Seguridad Personal</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Toda persona privada de su libertad debe ser sometida a la autoridad judicial competente
            dentro de las 48 horas. Vencido este plazo sin orden motivada, la privación deviene en
            ilegal.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <div className="text-amber-600 font-mono text-xs font-semibold">
            Art. 69 Constitución R.D.
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Tutela Judicial Efectiva</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Garantía inalienable del debido proceso: derecho a ser juzgado por un tribunal
            competente, imparcial e independiente, con estricto respeto a la presunción de
            inocencia.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
          <div className="text-amber-600 font-mono text-xs font-semibold">
            Art. 71 Constitución R.D.
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Acción de Hábeas Corpus</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mecanismo constitucional expedito frente a cualquier privación o amenaza ilegal de la
            libertad física. Obliga a la comparecencia física inmediata del detenido ante el juez.
          </p>
        </div>
      </div>

      {/* Active Complaints List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">
              Registro de Denuncias & Casos Tutelares
            </h3>
            <p className="text-xs text-slate-500">
              Expedientes bajo seguimiento de la defensoría regional
            </p>
          </div>
          <div className="text-xs text-slate-600 font-mono tabular-nums">
            {complaints.length} Casos Registrados
          </div>
        </div>

        <div className="space-y-3">
          {complaints.map((c) => {
            const isUrgent = c.urgencia.includes('Inmediata');
            return (
              <div
                key={c.id}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {c.numeroRegistro}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isUrgent ? 'text-rose-600' : 'text-amber-700'
                        }`}
                      >
                        {c.urgencia}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                      <span className="text-xs text-slate-500">{c.estadoTramite}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{c.victima}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onGenerateHabeasCorpus(c)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>Redactar Hábeas Corpus</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-slate-500 font-medium">Derecho Vulnerado:</div>
                    <div className="text-slate-800 font-semibold mt-0.5">{c.derechoVulnerado}</div>
                    <div className="text-amber-700 font-mono text-[11px] mt-0.5">
                      {c.articuloConstitucional}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 font-medium">Lugar & Autoridad Señalada:</div>
                    <div className="text-slate-800 font-semibold mt-0.5">{c.autoridadSenalada}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      {c.lugarIncidente} · Ocurrido el {c.fechaIncidente}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-900 mb-1">Descripción de los Hechos:</div>
                  <p className="leading-relaxed">{c.descripcionHechos}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-slate-900">Acciones Ejecutadas por CNDH:</div>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {c.accionesRealizadas.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Complaint Modal */}
      {isNewComplaintOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-base font-semibold">
                Registrar Denuncia Ciudadana / Vulneración de DD.HH.
              </h3>
              <button
                onClick={() => setIsNewComplaintOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateComplaint} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nombre de la Víctima o Comunidad Afectada *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo o colectivo..."
                    value={formData.victima}
                    onChange={(e) => setFormData({ ...formData, victima: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Lugar del Incidente
                  </label>
                  <input
                    type="text"
                    value={formData.lugarIncidente}
                    onChange={(e) => setFormData({ ...formData, lugarIncidente: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Autoridad o Agente Señalado
                  </label>
                  <input
                    type="text"
                    value={formData.autoridadSenalada}
                    onChange={(e) => setFormData({ ...formData, autoridadSenalada: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Derecho Fundamental Vulnerado
                  </label>
                  <input
                    type="text"
                    value={formData.derechoVulnerado}
                    onChange={(e) => setFormData({ ...formData, derechoVulnerado: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Artículos Constitucionales y Tratados Aplicables
                  </label>
                  <input
                    type="text"
                    value={formData.articuloConstitucional}
                    onChange={(e) =>
                      setFormData({ ...formData, articuloConstitucional: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Descripción Circunstanciada de los Hechos *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.descripcionHechos}
                    onChange={(e) => setFormData({ ...formData, descripcionHechos: e.target.value })}
                    placeholder="Detalles de la detención, abusos, falta de presentación ante juez o agresión..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewComplaintOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Registrar Denuncia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
