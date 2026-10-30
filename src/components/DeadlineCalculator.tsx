import React, { useState } from 'react';
import { STATUTORY_DEADLINES } from '../data/legalData';
import { Calendar, Clock, AlertTriangle, ShieldCheck, CheckCircle2, BookOpen } from 'lucide-react';

export const DeadlineCalculator: React.FC = () => {
  const [selectedDeadlineIndex, setSelectedDeadlineIndex] = useState(0);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState('08:00');

  const activeDeadline = STATUTORY_DEADLINES[selectedDeadlineIndex];

  // Calculate expiration
  const calculateResult = () => {
    const [year, month, day] = startDate.split('-').map(Number);
    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(year, month - 1, day, hours, minutes);

    let expiration = new Date(start);

    if (activeDeadline.duracionHoras) {
      expiration = new Date(start.getTime() + activeDeadline.duracionHoras * 3600 * 1000);
    } else if (activeDeadline.duracionDias) {
      // Adding days (calendar / judicial days)
      expiration.setDate(expiration.getDate() + activeDeadline.duracionDias);
    } else if (activeDeadline.duracionMeses) {
      expiration.setMonth(expiration.getMonth() + activeDeadline.duracionMeses);
    }

    const now = new Date();
    const diffMs = expiration.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const isExpired = diffMs <= 0;

    return {
      expirationFormatted: expiration.toLocaleDateString('es-DO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: activeDeadline.duracionHoras ? '2-digit' : undefined,
        minute: activeDeadline.duracionHoras ? '2-digit' : undefined,
      }),
      diffDays,
      diffHours,
      isExpired,
    };
  };

  const result = calculateResult();

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold font-legal-heading text-slate-900">
          Calculadora de Plazos Procesales Penales (CPP Dominicano)
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Cálculo perentorio y cómputo de términos conforme a la Ley 76-02 (modificada por la Ley 10-15) y la Constitución de la República Dominicana.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Seleccione el Plazo Procesal a Computar:
              </label>
              <select
                value={selectedDeadlineIndex}
                onChange={(e) => setSelectedDeadlineIndex(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-medium text-slate-900"
              >
                {STATUTORY_DEADLINES.map((item, idx) => (
                  <option key={idx} value={idx}>
                    {item.titulo} ({item.plazo})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Fecha Inicial (Arresto / Notificación):
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              {activeDeadline.duracionHoras && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Hora Exacta de Privación de Libertad:
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Statutory description */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-700 font-semibold font-mono">
              <BookOpen className="w-4 h-4" />
              <span>Base Jurídica: {activeDeadline.baseLegal}</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{activeDeadline.descripcion}</p>
          </div>
        </div>

        {/* Right Result Card: 5 cols */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              Resultado del Cómputo
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                result.isExpired
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {result.isExpired ? 'Plazo Vencido' : 'Plazo Vigente'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400">Fecha y Hora de Expiración Legal:</div>
            <div className="text-lg font-bold text-amber-400 font-legal-heading capitalize">
              {result.expirationFormatted}
            </div>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1">
            <div className="text-xs text-slate-300">Tiempo Restante / Exceso:</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-white">
              {result.isExpired ? (
                <span className="text-rose-400">
                  Venció hace {Math.abs(result.diffDays)} días ({Math.abs(result.diffHours)} horas)
                </span>
              ) : (
                <span className="text-emerald-400">
                  {result.diffDays} días restantes ({result.diffHours} horas)
                </span>
              )}
            </div>
          </div>

          {/* Procedural Remedy Alert */}
          <div className="text-xs space-y-1.5 text-slate-300 pt-2 border-t border-slate-800">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Consecuencia Procesal / Remedio Jurídico:</span>
            </div>
            {result.isExpired ? (
              <p className="leading-relaxed text-rose-300">
                Al haber expirado este término fatal, procede interponer de forma inmediata la
                instancia de <strong>Cese de Prisión Preventiva (Art. 241 CPP)</strong> o la
                <strong> Acción de Hábeas Corpus (Art. 71 Constitución)</strong> por privación ilegal
                sobrevenida.
              </p>
            ) : (
              <p className="leading-relaxed">
                El plazo se encuentra en curso regular. Se recomienda preparar con antelación el
                requerimiento probatorio y verificar la comparecencia ante el tribunal apoderado.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Complete Statutory Reference Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 text-sm">
            Tabla de Términos Fatales del Código Procesal Penal Dominicano
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Procedimiento o Acto</th>
                <th className="py-3 px-4">Término Legal</th>
                <th className="py-3 px-4">Base Jurídica</th>
                <th className="py-3 px-4">Efecto por Inobservancia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Presentación de persona arrestada ante el juez
                </td>
                <td className="py-3 px-4 font-mono font-medium text-slate-800">48 Horas</td>
                <td className="py-3 px-4 text-slate-600 font-mono">Art. 40.5 Const. / Art. 224 CPP</td>
                <td className="py-3 px-4 text-rose-600 font-medium">Detención arbitraria inmediata / Hábeas Corpus</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Conclusión de investigación (Prisión Preventiva)
                </td>
                <td className="py-3 px-4 font-mono font-medium text-slate-800">3 Meses (+2 prórroga)</td>
                <td className="py-3 px-4 text-slate-600 font-mono">Art. 150 CPP</td>
                <td className="py-3 px-4 text-amber-700">Intimación a concluir (Art. 151 CPP)</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Límite máximo de duración de prisión preventiva
                </td>
                <td className="py-3 px-4 font-mono font-medium text-slate-800">12 Meses ordinarios</td>
                <td className="py-3 px-4 text-slate-600 font-mono">Art. 241 num. 1 CPP</td>
                <td className="py-3 px-4 text-rose-600 font-medium">Cese de pleno derecho de la prisión</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Recurso de apelación de medidas coercitivas
                </td>
                <td className="py-3 px-4 font-mono font-medium text-slate-800">10 Días hábiles</td>
                <td className="py-3 px-4 text-slate-600 font-mono">Art. 411 CPP</td>
                <td className="py-3 px-4 text-slate-600">Inadmisibilidad del recurso por extemporáneo</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Recurso de apelación de sentencia definitiva
                </td>
                <td className="py-3 px-4 font-mono font-medium text-slate-800">20 Días</td>
                <td className="py-3 px-4 text-slate-600 font-mono">Art. 418 CPP</td>
                <td className="py-3 px-4 text-slate-600">Adquiere autoridad de la cosa irrevocablemente juzgada</td>
              </tr>
              <tr className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Extinción de la acción penal por plazo máximo
                </td>
                <td className="py-3 px-4 font-mono font-medium text-slate-800">4 Años totales</td>
                <td className="py-3 px-4 text-slate-600 font-mono">Art. 148 CPP (Ley 10-15)</td>
                <td className="py-3 px-4 text-rose-600 font-medium">Extinción definitiva de la acción penal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
