import React, { useState, useEffect } from 'react';
import { LEGAL_TEMPLATES } from '../data/legalData';
import { LegalDocTemplate } from '../types/legal';
import {
  FileText,
  Copy,
  Check,
  Printer,
  Download,
  BookOpen,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface LegalBriefWriterProps {
  initialTemplateId?: string;
  initialValues?: Record<string, string>;
}

export const LegalBriefWriter: React.FC<LegalBriefWriterProps> = ({
  initialTemplateId,
  initialValues,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    initialTemplateId || LEGAL_TEMPLATES[0].id
  );

  const activeTemplate =
    LEGAL_TEMPLATES.find((t) => t.id === selectedTemplateId) || LEGAL_TEMPLATES[0];

  // Initialize field values
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    activeTemplate.camposRequeridos.forEach((c) => {
      initial[c.clave] = initialValues?.[c.clave] || c.valorPorDefecto || '';
    });
    return initial;
  });

  // When template changes, reset form values
  useEffect(() => {
    const newValues: Record<string, string> = {};
    activeTemplate.camposRequeridos.forEach((c) => {
      newValues[c.clave] = initialValues?.[c.clave] || c.valorPorDefecto || '';
    });
    setFormValues(newValues);
  }, [selectedTemplateId, activeTemplate]);

  // When initialValues changes (e.g. from case shortcut)
  useEffect(() => {
    if (initialValues) {
      setFormValues((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const [copied, setCopied] = useState(false);

  const handleFieldChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const documentContent = activeTemplate.generarContenido(formValues);

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([documentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTemplate.id}_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-legal-heading text-slate-900">
            Redactor y Generador de Instancias Jurídicas Dominicanas
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Modelos procesales redactados conforme al rigor de la jurisprudencia y los requerimientos del foro penal.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Texto</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar .TXT</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Template Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
        {LEGAL_TEMPLATES.map((tpl) => {
          const isActive = tpl.id === activeTemplate.id;
          return (
            <button
              key={tpl.id}
              onClick={() => setSelectedTemplateId(tpl.id)}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tpl.titulo}
            </button>
          );
        })}
      </div>

      {/* Editor & Preview Split: 12-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: 5 cols */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-semibold text-slate-900 text-sm">{activeTemplate.titulo}</h3>
            <div className="text-[11px] text-amber-700 font-mono mt-1 font-medium">
              Base: {activeTemplate.baseLegal}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {activeTemplate.descripcion}
            </p>
          </div>

          <form className="space-y-3.5">
            {activeTemplate.camposRequeridos.map((field) => (
              <div key={field.clave}>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {field.etiqueta}
                </label>
                {field.tipo === 'textarea' ? (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    value={formValues[field.clave] || ''}
                    onChange={(e) => handleFieldChange(field.clave, e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formValues[field.clave] || ''}
                    onChange={(e) => handleFieldChange(field.clave, e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50/50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                )}
              </div>
            ))}
          </form>

          <div className="pt-2 text-[11px] text-slate-500">
            * Los cambios se reflejan inmediatamente en la vista previa formal.
          </div>
        </div>

        {/* Right Preview: 7 cols */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded-xl shadow-md overflow-hidden">
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Vista Previa de Instancia Legal</span>
            <span className="font-mono text-[11px] text-slate-500">Formato Estándar Judicial R.D.</span>
          </div>

          {/* Printable container */}
          <div
            id="printable-document"
            className="p-8 font-serif text-slate-900 text-sm leading-relaxed whitespace-pre-wrap select-text bg-white min-h-[600px] border-t border-slate-100"
          >
            {documentContent}
          </div>
        </div>
      </div>
    </div>
  );
};
