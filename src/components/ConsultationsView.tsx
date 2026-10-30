import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, Shield, Plus, X } from 'lucide-react';

interface ConsultationItem {
  id: string;
  cliente: string;
  telefono: string;
  cedula: string;
  materia: string;
  fecha: string;
  hora: string;
  modalidad: 'Presencial (Despacho Nagua)' | 'Virtual / Videollamada';
  estado: 'Confirmada' | 'En Espera' | 'Atendida';
  urgente: boolean;
  motivo: string;
}

const INITIAL_CONSULTATIONS: ConsultationItem[] = [
  {
    id: 'c-1',
    cliente: 'Marcos Aurelio Ventura',
    telefono: '(809) 584-2190',
    cedula: '071-0045123-9',
    materia: 'Penal - Medidas de Coerción',
    fecha: '2026-10-31',
    hora: '10:00 AM',
    modalidad: 'Presencial (Despacho Nagua)',
    estado: 'Confirmada',
    urgente: true,
    motivo: 'Familiar detenido en destacamento; se requiere asistencia inmediata para audiencia coercitiva.',
  },
  {
    id: 'c-2',
    cliente: 'Ana Teresa Gómez',
    telefono: '(829) 712-4433',
    cedula: '056-0038921-1',
    materia: 'Inmobiliario y Agrario',
    fecha: '2026-11-03',
    hora: '03:30 PM',
    modalidad: 'Presencial (Despacho Nagua)',
    estado: 'Confirmada',
    urgente: false,
    motivo: 'Deslinde y saneamiento parcelario en zona de Las Gordas.',
  },
  {
    id: 'c-3',
    cliente: 'Lic. Rafael Medina',
    telefono: '(849) 321-9988',
    cedula: '001-1122334-5',
    materia: 'Constitucional / Amparo',
    fecha: '2026-11-06',
    hora: '11:00 AM',
    modalidad: 'Virtual / Videollamada',
    estado: 'En Espera',
    urgente: false,
    motivo: 'Consulta sobre vulneración al debido proceso en procedimiento administrativo sancionador.',
  },
];

export const ConsultationsView: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationItem[]>(INITIAL_CONSULTATIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    telefono: '',
    cedula: '',
    materia: 'Penal',
    fecha: new Date().toISOString().slice(0, 10),
    hora: '10:00 AM',
    modalidad: 'Presencial (Despacho Nagua)' as const,
    urgente: false,
    motivo: '',
  });

  const handleCreateConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cliente || !formData.telefono) return;

    const newConsultation: ConsultationItem = {
      id: `c-${Date.now()}`,
      cliente: formData.cliente,
      telefono: formData.telefono,
      cedula: formData.cedula || 'En trámite',
      materia: formData.materia,
      fecha: formData.fecha,
      hora: formData.hora,
      modalidad: formData.modalidad,
      estado: 'Confirmada',
      urgente: formData.urgente,
      motivo: formData.motivo,
    };

    setConsultations([newConsultation, ...consultations]);
    setIsModalOpen(false);
    setFormData({
      cliente: '',
      telefono: '',
      cedula: '',
      materia: 'Penal',
      fecha: new Date().toISOString().slice(0, 10),
      hora: '10:00 AM',
      modalidad: 'Presencial (Despacho Nagua)',
      urgente: false,
      motivo: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-legal-heading text-slate-900">
            Agenda de Consultas & Atención al Ciudadano
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Programación de citas presenciales en la oficina de Nagua y consultas telemáticas sobre derecho penal y amparo.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Nueva Consulta</span>
        </button>
      </div>

      {/* Consultations Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-sm">Próximas Citas Pautadas</h3>
          <span className="text-xs font-mono text-slate-500 tabular-nums">
            {consultations.length} Consultas en Agenda
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Ciudadano / Cliente</th>
                <th className="py-3 px-4">Contacto & Cédula</th>
                <th className="py-3 px-4">Materia</th>
                <th className="py-3 px-4">Fecha & Hora</th>
                <th className="py-3 px-4">Modalidad</th>
                <th className="py-3 px-4">Motivo de Consulta</th>
                <th className="py-3 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {consultations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span>{item.cliente}</span>
                      {item.urgente && (
                        <span className="text-rose-600 font-semibold text-[10px] uppercase">
                          (Urgente)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    <div>{item.telefono}</div>
                    <div className="text-[11px] text-slate-400">{item.cedula}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium">{item.materia}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 whitespace-nowrap">
                    <div>{item.fecha}</div>
                    <div className="text-slate-500 text-[11px]">{item.hora}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{item.modalidad}</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">{item.motivo}</td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="font-semibold text-emerald-700">{item.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official CARD Fee Reference Guide */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Shield className="w-5 h-5 text-amber-500 shrink-0" />
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Tarifario de Honorarios Mínimos (Colegio de Abogados de la R.D. - CARD)
            </h3>
            <p className="text-xs text-slate-500">
              Criterio orientativo conforme a la Ley 302 sobre Honorarios de los Abogados
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-semibold text-slate-900">Medida de Coerción Penal</div>
            <div className="text-amber-700 font-mono font-bold">RD$ 25,000 - 50,000</div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Asistencia técnica en audiencia, preparación de presupuestos de arraigo y memorial de defensa.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-semibold text-slate-900">Acción de Hábeas Corpus</div>
            <div className="text-amber-700 font-mono font-bold">RD$ 35,000 - 60,000</div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Redacción de instancia constitucional, tramitación judicial y representación oral en estrado (gratuito para casos probono CNDH).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="font-semibold text-slate-900">Juicio de Fondo & Apelación</div>
            <div className="text-amber-700 font-mono font-bold">Conforme a complejidad</div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Defensa penal integral en primera instancia, corte colegiada o recursos ante la corte de apelación.
            </p>
          </div>
        </div>
      </div>

      {/* New Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-base font-semibold">Agendar Nueva Consulta Legal</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateConsultation} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nombre Completo del Cliente *
                </label>
                <input
                  type="text"
                  required
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teléfono Móvil *</label>
                  <input
                    type="text"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="(809) 000-0000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cédula</label>
                  <input
                    type="text"
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                    placeholder="071-XXXXXXX-X"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Materia Legal</label>
                  <select
                    value={formData.materia}
                    onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="Penal">Penal</option>
                    <option value="Constitucional / DDHH">Constitucional / DDHH</option>
                    <option value="Inmobiliario">Inmobiliario</option>
                    <option value="Civil y Familia">Civil y Familia</option>
                    <option value="Laboral">Laboral</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Modalidad</label>
                  <select
                    value={formData.modalidad}
                    onChange={(e) => setFormData({ ...formData, modalidad: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="Presencial (Despacho Nagua)">Presencial (Despacho Nagua)</option>
                    <option value="Virtual / Videollamada">Virtual / Videollamada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hora</label>
                  <input
                    type="text"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    placeholder="Ej. 10:30 AM"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Motivo o Caso</label>
                <textarea
                  rows={3}
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  placeholder="Resumen del requerimiento o antecedentes..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgente-check"
                  checked={formData.urgente}
                  onChange={(e) => setFormData({ ...formData, urgente: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="urgente-check" className="font-semibold text-slate-700">
                  Caso urgente (Privación de libertad en curso o audiencia próxima)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Confirmar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
