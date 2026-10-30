import React, { useState } from 'react';
import { LegalCase, LegalStage } from '../types/legal';
import {
  Search,
  Plus,
  AlertTriangle,
  Clock,
  Building2,
  FileText,
  User,
  ChevronRight,
  Calendar,
  X,
  FileCheck,
  Send
} from 'lucide-react';

interface CaseManagementViewProps {
  cases: LegalCase[];
  onAddCase: (newCase: LegalCase) => void;
  onUpdateCase: (updatedCase: LegalCase) => void;
  onOpenDraftForCase: (legalCase: LegalCase) => void;
}

export const CaseManagementView: React.FC<CaseManagementViewProps> = ({
  cases,
  onAddCase,
  onUpdateCase,
  onOpenDraftForCase,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<'all' | LegalStage>('all');
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Form state for new case
  const [formData, setFormData] = useState({
    expedienteNo: '',
    cliente: '',
    cedulaCliente: '',
    materia: 'Penal' as const,
    delito: '',
    tribunal: 'Juzgado de la Instrucción de María Trinidad Sánchez (Nagua)',
    juezFiscal: '',
    etapa: 'medida_coercion' as LegalStage,
    medidaActual: 'Prisión Preventiva',
    plazoLimite: '',
    urgencia: 'normal' as const,
    notas: '',
  });

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.expedienteNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.delito.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tribunal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || c.etapa === stageFilter;
    return matchesSearch && matchesStage;
  });

  // Real KPI calculations
  const totalCases = cases.length;
  const criticalDeadlines = cases.filter(
    (c) => c.urgencia === 'critica_plazo' || (c.diasRestantes !== undefined && c.diasRestantes <= 7)
  ).length;
  const inPreventiveCustody = cases.filter((c) =>
    c.medidaActual.toLowerCase().includes('prisión preventiva')
  ).length;
  const inTrialOrAppeal = cases.filter(
    (c) => c.etapa === 'juicio_fondo' || c.etapa === 'recurso_apelacion'
  ).length;

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.expedienteNo || !formData.cliente || !formData.delito) return;

    const newCaseItem: LegalCase = {
      id: `case-${Date.now()}`,
      expedienteNo: formData.expedienteNo,
      cliente: formData.cliente,
      cedulaCliente: formData.cedulaCliente || 'Pendiente',
      materia: formData.materia,
      delito: formData.delito,
      tribunal: formData.tribunal,
      juezFiscal: formData.juezFiscal || 'En trámite',
      etapa: formData.etapa,
      fechaInicio: new Date().toISOString().slice(0, 10),
      plazoLimite: formData.plazoLimite || undefined,
      diasRestantes: formData.plazoLimite ? 30 : undefined,
      medidaActual: formData.medidaActual,
      urgencia: formData.urgencia,
      estado: 'Activo',
      notas: formData.notas ? [formData.notas] : ['Expediente registrado en el sistema.'],
      historial: [
        {
          fecha: new Date().toISOString().slice(0, 10),
          titulo: 'Apertura de Expediente',
          descripcion: 'Registro inicial de causa en Baldera & Asociados.',
        },
      ],
    };

    onAddCase(newCaseItem);
    setIsNewCaseOpen(false);
    setFormData({
      expedienteNo: '',
      cliente: '',
      cedulaCliente: '',
      materia: 'Penal',
      delito: '',
      tribunal: 'Juzgado de la Instrucción de María Trinidad Sánchez (Nagua)',
      juezFiscal: '',
      etapa: 'medida_coercion',
      medidaActual: 'Prisión Preventiva',
      plazoLimite: '',
      urgencia: 'normal',
      notas: '',
    });
  };

  const handleAddNoteToCase = () => {
    if (!selectedCase || !newNoteText.trim()) return;
    const updated: LegalCase = {
      ...selectedCase,
      notas: [newNoteText.trim(), ...selectedCase.notas],
      historial: [
        {
          fecha: new Date().toISOString().slice(0, 10),
          titulo: 'Nota Procesal Añadida',
          descripcion: newNoteText.trim(),
        },
        ...selectedCase.historial,
      ],
    };
    onUpdateCase(updated);
    setSelectedCase(updated);
    setNewNoteText('');
  };

  const getStageLabel = (stage: LegalStage) => {
    switch (stage) {
      case 'medida_coercion':
        return 'Medida de Coerción';
      case 'fase_preparatoria':
        return 'Fase Preparatoria';
      case 'audiencia_preliminar':
        return 'Audiencia Preliminar';
      case 'juicio_fondo':
        return 'Juicio de Fondo';
      case 'recurso_apelacion':
        return 'Recurso de Apelación';
      case 'ejecucion_pena':
        return 'Ejecución Penal';
      default:
        return stage;
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Firm Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/src/assets/images/hero_law_office_1793324905892.jpg"
            alt="Despacho Jurídico Baldera & Asociados"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 text-xs text-amber-300 font-medium">
              <span>Nagua, María Trinidad Sánchez</span>
              <span aria-hidden="true">·</span>
              <span>Distrito Judicial del Nordeste</span>
              <span aria-hidden="true">·</span>
              <span>Colegio de Abogados R.D.</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-legal-heading tracking-tight text-white leading-tight">
              Defensa Técnica Penal, Tutela Constitucional y Garantías Judiciales
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Estudio Jurídico dirigido por el Lic. Pedro Baldera Germán. Monitoreo riguroso de
              plazos del Código Procesal Penal, medidas coercitivas, cese de prisión preventiva y
              defensa inquebrantable del debido proceso.
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 backdrop-blur-xs shrink-0">
            <img
              src="/src/assets/images/pedro_baldera_avatar_1793324906044.jpg"
              alt="Lic. Pedro Baldera Germán"
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="font-semibold text-sm text-white">Lic. Pedro Baldera Germán</div>
              <div className="text-xs text-slate-300">Abogado Penalista & Defensor DD.HH.</div>
              <div className="text-xs text-amber-300 font-mono">Coordinador Regional CNDH</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Quantitative Rigor Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-medium text-slate-500">Total Expedientes Activos</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {totalCases}
          </div>
          <div className="text-xs text-slate-500 mt-1">Casos bajo gestión directa</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Alerta de Plazos Críticos</span>
          </div>
          <div className="text-2xl font-bold text-rose-600 font-mono tabular-nums mt-1">
            {criticalDeadlines}
          </div>
          <div className="text-xs text-slate-500 mt-1">Vencimiento en ≤ 7 días</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-medium text-slate-500">Prisión Preventiva</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {inPreventiveCustody}
          </div>
          <div className="text-xs text-slate-500 mt-1">Monitoreo de Cese Art. 241</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs font-medium text-slate-500">Juicio / Recursos de Alzada</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {inTrialOrAppeal}
          </div>
          <div className="text-xs text-slate-500 mt-1">Cortes y Colegiados</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, expediente, delito o tribunal..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* New Case Button */}
          <button
            onClick={() => setIsNewCaseOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Nuevo Expediente</span>
          </button>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'Todos los Casos' },
            { id: 'medida_coercion', label: 'Medidas de Coerción' },
            { id: 'fase_preparatoria', label: 'Fase Preparatoria' },
            { id: 'juicio_fondo', label: 'Juicio de Fondo' },
            { id: 'recurso_apelacion', label: 'Recursos & Apelaciones' },
          ].map((tab) => {
            const isActive = stageFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStageFilter(tab.id as any)}
                className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cases Data Table / Grid */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Expediente</th>
                <th className="py-3.5 px-4 font-semibold">Cliente / Imputado</th>
                <th className="py-3.5 px-4 font-semibold">Materia & Delito</th>
                <th className="py-3.5 px-4 font-semibold">Tribunal Asignado</th>
                <th className="py-3.5 px-4 font-semibold">Etapa Procesal</th>
                <th className="py-3.5 px-4 font-semibold text-right">Plazo Restante</th>
                <th className="py-3.5 px-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No se encontraron expedientes que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => {
                  const isCritical =
                    c.urgencia === 'critica_plazo' ||
                    (c.diasRestantes !== undefined && c.diasRestantes <= 7);
                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedCase(c)}
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                        {c.expedienteNo}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">{c.cliente}</div>
                        <div className="text-slate-500 font-mono text-[11px]">{c.cedulaCliente}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        <div className="text-slate-800 font-medium truncate">{c.delito}</div>
                        <div className="text-slate-500 text-[11px]">{c.materia}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                        <div className="truncate">{c.tribunal}</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-medium text-slate-700">{getStageLabel(c.etapa)}</span>
                        <div className="text-slate-500 text-[11px] truncate max-w-[180px]">
                          {c.medidaActual}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono tabular-nums">
                        {c.diasRestantes !== undefined ? (
                          <span
                            className={
                              isCritical ? 'text-rose-600 font-bold' : 'text-slate-700 font-medium'
                            }
                          >
                            {c.diasRestantes} días
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCase(c);
                          }}
                          className="px-2.5 py-1 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors cursor-pointer"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Drawer / Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div>
                <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                  Expediente Judicial
                </span>
                <h3 className="text-base font-semibold">{selectedCase.expedienteNo}</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              {/* Primary case overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <div className="text-slate-500 font-medium">Cliente / Justiciable:</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedCase.cliente}</div>
                  <div className="text-slate-500 font-mono mt-0.5">
                    Cédula: {selectedCase.cedulaCliente}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Tribunal Apoderado:</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{selectedCase.tribunal}</div>
                  <div className="text-slate-500 mt-0.5">Juez/Fiscal: {selectedCase.juezFiscal}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Calificación Jurídica / Delito:</div>
                  <div className="font-semibold text-slate-900 mt-0.5">{selectedCase.delito}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Medida Actual & Plazo:</div>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    {selectedCase.medidaActual}
                  </div>
                  {selectedCase.plazoLimite && (
                    <div className="text-rose-600 font-mono mt-0.5 font-medium">
                      Vence: {selectedCase.plazoLimite} (
                      {selectedCase.diasRestantes ?? 0} días restantes)
                    </div>
                  )}
                </div>
              </div>

              {/* Action shortcut to writer */}
              <div className="flex items-center justify-between p-3.5 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="space-y-0.5">
                  <div className="font-semibold text-amber-950">
                    ¿Requiere redactar una instancia para este caso?
                  </div>
                  <div className="text-amber-800 text-[11px]">
                    Genere automáticamente la solicitud de cese de prisión preventiva o apelación con
                    los datos de {selectedCase.cliente}.
                  </div>
                </div>
                <button
                  onClick={() => {
                    const c = selectedCase;
                    setSelectedCase(null);
                    onOpenDraftForCase(c);
                  }}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  Generar Instancia
                </button>
              </div>

              {/* Procedural notes and timeline */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 text-sm">Historial & Notas Procesales</h4>

                {/* Add note input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Escriba un nuevo apunte o actualización procesal..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddNoteToCase();
                    }}
                  />
                  <button
                    onClick={handleAddNoteToCase}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Guardar Nota</span>
                  </button>
                </div>

                {/* Notes list */}
                <div className="space-y-2 pt-2">
                  {selectedCase.notas.map((n, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white border border-slate-200 rounded-md text-slate-800 text-xs"
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {isNewCaseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-base font-semibold">Registrar Nuevo Expediente Penal / Civil</h3>
              <button
                onClick={() => setIsNewCaseOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Número de Expediente *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. EXP-2026-0089-PEN"
                    value={formData.expedienteNo}
                    onChange={(e) => setFormData({ ...formData, expedienteNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nombre del Cliente / Imputado *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Cédula de Identidad
                  </label>
                  <input
                    type="text"
                    placeholder="071-XXXXXXX-X"
                    value={formData.cedulaCliente}
                    onChange={(e) => setFormData({ ...formData, cedulaCliente: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Materia</label>
                  <select
                    value={formData.materia}
                    onChange={(e) => setFormData({ ...formData, materia: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="Penal">Penal</option>
                    <option value="Constitucional">Constitucional</option>
                    <option value="Civil">Civil</option>
                    <option value="Laboral">Laboral</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tipo Penal / Delito Imputado *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Supuesta violación a la Ley 631-16 / Art. 405 Código Penal"
                    value={formData.delito}
                    onChange={(e) => setFormData({ ...formData, delito: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tribunal Apoderado
                  </label>
                  <input
                    type="text"
                    value={formData.tribunal}
                    onChange={(e) => setFormData({ ...formData, tribunal: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Etapa Procesal</label>
                  <select
                    value={formData.etapa}
                    onChange={(e) => setFormData({ ...formData, etapa: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="medida_coercion">Medida de Coerción</option>
                    <option value="fase_preparatoria">Fase Preparatoria</option>
                    <option value="audiencia_preliminar">Audiencia Preliminar</option>
                    <option value="juicio_fondo">Juicio de Fondo</option>
                    <option value="recurso_apelacion">Recurso de Apelación</option>
                    <option value="ejecucion_pena">Ejecución de Pena</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Medida Actual</label>
                  <input
                    type="text"
                    placeholder="Ej. Prisión Preventiva / Fianza y Presentación"
                    value={formData.medidaActual}
                    onChange={(e) => setFormData({ ...formData, medidaActual: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Fecha Límite / Vencimiento de Plazo
                  </label>
                  <input
                    type="date"
                    value={formData.plazoLimite}
                    onChange={(e) => setFormData({ ...formData, plazoLimite: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Urgencia</label>
                  <select
                    value={formData.urgencia}
                    onChange={(e) => setFormData({ ...formData, urgencia: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="normal">Normal</option>
                    <option value="alta">Alta</option>
                    <option value="critica_plazo">Crítica (Próxima a vencer)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Notas o Estrategia Inicial
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                    placeholder="Observaciones de arraigo, presupuestos o plazos procesales..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsNewCaseOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Guardar Expediente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
