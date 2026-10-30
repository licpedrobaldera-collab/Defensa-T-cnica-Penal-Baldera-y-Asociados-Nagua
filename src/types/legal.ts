export type LegalStage = 
  | 'fase_preparatoria'
  | 'medida_coercion'
  | 'audiencia_preliminar'
  | 'juicio_fondo'
  | 'recurso_apelacion'
  | 'ejecucion_pena';

export type CaseUrgency = 'normal' | 'alta' | 'critica_plazo';

export interface LegalCase {
  id: string;
  expedienteNo: string;
  cliente: string;
  cedulaCliente: string;
  contraparte?: string;
  materia: 'Penal' | 'Constitucional' | 'Civil' | 'Laboral';
  delito: string;
  tribunal: string;
  juezFiscal: string;
  etapa: LegalStage;
  fechaInicio: string;
  proximaAudiencia?: string;
  plazoLimite?: string;
  diasRestantes?: number;
  medidaActual: string;
  urgencia: CaseUrgency;
  estado: 'Activo' | 'En Espera de Fallo' | 'Concluido' | 'Apelado';
  notas: string[];
  historial: {
    fecha: string;
    titulo: string;
    descripcion: string;
  }[];
}

export interface HumanRightsComplaint {
  id: string;
  numeroRegistro: string;
  victima: string;
  lugarIncidente: string;
  fechaIncidente: string;
  autoridadSenalada: string;
  derechoVulnerado: string;
  articuloConstitucional: string;
  estadoTramite: 'En Investigación' | 'Acción de Amparo Sometida' | 'Hábeas Corpus en Trámite' | 'Resuelto' | 'Elevado a CNDH Central';
  descripcionHechos: string;
  urgencia: 'Alta' | 'Inmediata (Privación de libertad)';
  accionesRealizadas: string[];
}

export interface LegalDocTemplate {
  id: string;
  titulo: string;
  baseLegal: string;
  materia: string;
  descripcion: string;
  camposRequeridos: {
    clave: string;
    etiqueta: string;
    placeholder: string;
    tipo?: 'text' | 'textarea' | 'date';
    valorPorDefecto?: string;
  }[];
  generarContenido: (valores: Record<string, string>) => string;
}
