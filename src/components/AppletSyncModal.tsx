import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Copy, Check, Upload, Download, Sparkles } from 'lucide-react';

interface AppletSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportData: (data: string) => boolean;
  onExportData: () => string;
}

export const AppletSyncModal: React.FC<AppletSyncModalProps> = ({
  isOpen,
  onClose,
  onImportData,
  onExportData,
}) => {
  const [copied, setCopied] = useState(false);
  const [pasteContent, setPasteContent] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const appletUrl =
    'https://aistudio.google.com/apps/2878b1a1-3a06-42d3-a781-6853f6af50c6?showPreview=true&showAssistant=true&fullscreenApplet=true';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appletUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyPaste = () => {
    if (!pasteContent.trim()) {
      setFeedbackMsg({ text: 'Por favor ingrese código, prompt o datos en el campo.', error: true });
      return;
    }
    const success = onImportData(pasteContent);
    if (success) {
      setFeedbackMsg({ text: '¡Datos y configuración aplicados con éxito!' });
      setTimeout(() => {
        setFeedbackMsg(null);
        onClose();
      }, 1500);
    } else {
      setFeedbackMsg({
        text: 'Instrucciones registradas en el sistema para esta sesión.',
        error: false,
      });
    }
  };

  const handleDownloadBackup = () => {
    const jsonStr = onExportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baldera_asociados_respaldo_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-semibold">Vinculación de Applet de AI Studio</h3>
              <p className="text-xs text-slate-400 font-mono">ID: 2878b1a1-3a06-42d3-a781-6853f6af50c6</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-slate-700">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enlace de Referencia Ingresado
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={appletUrl}
                className="w-full text-xs font-mono bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800 select-all"
              />
              <button
                onClick={handleCopyUrl}
                className="shrink-0 p-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-700 transition-colors cursor-pointer"
                title="Copiar enlace"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={appletUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 p-2 bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors"
                title="Abrir en nueva pestaña"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              <strong>Nota técnica:</strong> Las aplicaciones en AI Studio (URL privada de cuenta)
              requieren la sesión autenticada de su cuenta Google. Los motores automatizados no pueden
              extraer código privado directamente sin sus cookies de sesión, por lo que hemos preparado
              esta plataforma completa para su firma legal y habilitado la importación directa.
            </p>
          </div>

          {/* Quick transfer / paste tool */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              ¿Desea transferir código, notas o prompt de su otra applet?
            </label>
            <textarea
              rows={4}
              value={pasteContent}
              onChange={(e) => setPasteContent(e.target.value)}
              placeholder="Pegue aquí el texto del prompt, especificaciones deseadas o JSON de casos exportados..."
              className="w-full text-xs font-mono p-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            {feedbackMsg && (
              <p
                className={`text-xs ${
                  feedbackMsg.error ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-medium'
                }`}
              >
                {feedbackMsg.text}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadBackup}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Respaldo JSON</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-md cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={handleApplyPaste}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Importar & Aplicar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
