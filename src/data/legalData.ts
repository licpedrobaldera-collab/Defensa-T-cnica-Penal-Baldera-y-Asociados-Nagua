import { LegalCase, HumanRightsComplaint, LegalDocTemplate } from '../types/legal';

export const INITIAL_CASES: LegalCase[] = [
  {
    id: 'case-1',
    expedienteNo: 'EXP-2026-0038-PEN',
    cliente: 'Juan Carlos Rosario Morales',
    cedulaCliente: '071-0024981-3',
    materia: 'Penal',
    delito: 'Supuesta infracción a la Ley 631-16 (Porte y Tenencia de Armas)',
    tribunal: 'Juzgado de la Instrucción de María Trinidad Sánchez (Nagua)',
    juezFiscal: 'Mag. Dra. Carmen Liriano / Lic. Wilson Santos (Fiscal)',
    etapa: 'medida_coercion',
    fechaInicio: '2026-10-12',
    proximaAudiencia: '2026-11-05',
    plazoLimite: '2026-11-08',
    diasRestantes: 7,
    medidaActual: 'Prisión Preventiva (3 meses en Fortaleza Olegario Tenares)',
    urgencia: 'alta',
    estado: 'Activo',
    notas: [
      'Se demostró arraigo familiar y laboral suficiente.',
      'Sometida solicitud de revisión de medida para sustitución por fianza y presentación periódica (Art. 226 incisos 1 y 4 CPP).'
    ],
    historial: [
      {
        fecha: '2026-10-14',
        titulo: 'Imposición de Medida de Coerción',
        descripcion: 'Resolución No. 104-2026 impuso 3 meses de prisión preventiva.'
      },
      {
        fecha: '2026-10-24',
        titulo: 'Depósito de Instancia de Revisión',
        descripcion: 'Presentada instancia fundamentada en nuevos presupuestos probatorios de arraigo.'
      }
    ]
  },
  {
    id: 'case-2',
    expedienteNo: 'EXP-2025-0412-CRIM',
    cliente: 'Domingo Peña Almánzar',
    cedulaCliente: '071-0018542-9',
    materia: 'Penal',
    delito: 'Acusación por Supuesta Estafa (Art. 405 Código Penal)',
    tribunal: 'Tribunal Colegiado de Primera Instancia de María Trinidad Sánchez',
    juezFiscal: 'Tribunal Colegiado (Presidente: Mag. Pérez)',
    etapa: 'juicio_fondo',
    fechaInicio: '2025-08-20',
    proximaAudiencia: '2026-11-18',
    plazoLimite: '2026-11-30',
    diasRestantes: 20,
    medidaActual: 'Garantía Económica y Presentación Periódica',
    urgencia: 'normal',
    estado: 'Activo',
    notas: [
      'El querellante no aportó prueba material del supuesto perjuicio.',
      'Incidente de exclusión probatoria por ilicitud en obtención de testimonios.'
    ],
    historial: [
      {
        fecha: '2026-03-10',
        titulo: 'Auto de Apertura a Juicio',
        descripcion: 'Juzgado de la Instrucción dictó auto de apertura a juicio de fondo.'
      },
      {
        fecha: '2026-09-15',
        titulo: 'Primera Sesión de Juicio',
        descripcion: 'Apertura de debates y lectura de la acusación. Aplazamiento para comparecencia de perito contable.'
      }
    ]
  },
  {
    id: 'case-3',
    expedienteNo: 'EXP-2025-0199-APEL',
    cliente: 'Ramón Antonio Castillo García',
    cedulaCliente: '056-0041223-1',
    materia: 'Penal',
    delito: 'Homicidio Involuntario en Accidente de Tránsito (Ley 63-17)',
    tribunal: 'Corte de Apelación del Departamento Judicial de San Francisco de Macorís',
    juezFiscal: 'Segunda Sala Penal de la Corte de Apelación',
    etapa: 'recurso_apelacion',
    fechaInicio: '2025-05-14',
    proximaAudiencia: '2026-11-12',
    plazoLimite: '2026-11-15',
    diasRestantes: 14,
    medidaActual: 'Libertad bajo fianza',
    urgencia: 'normal',
    estado: 'Apelado',
    notas: [
      'Recurso interpuesto por falta de motivación de la sentencia de primer grado e inobservancia del Art. 24 CPP.',
      'Solicitamos revocación total y descargo por falta de imputabilidad.'
    ],
    historial: [
      {
        fecha: '2026-06-20',
        titulo: 'Sentencia de Primer Grado',
        descripcion: 'Condena civil desproporcionada sin base pericial.'
      },
      {
        fecha: '2026-07-08',
        titulo: 'Interposición de Recurso de Apelación',
        descripcion: 'Depósito formal del escrito de apelación dentro del plazo de 20 días (Art. 418 CPP).'
      }
    ]
  },
  {
    id: 'case-4',
    expedienteNo: 'EXP-2026-0071-CESE',
    cliente: 'Manuel E. Vásquez Paulino',
    cedulaCliente: '071-0033412-8',
    materia: 'Penal',
    delito: 'Presunta Asociación de Malhechores y Robo Agravado',
    tribunal: 'Primer Juzgado de la Instrucción del Distrito Judicial de Nagua',
    juezFiscal: 'Mag. Juez de Instrucción',
    etapa: 'fase_preparatoria',
    fechaInicio: '2025-10-25',
    proximaAudiencia: '2026-11-03',
    plazoLimite: '2026-10-31',
    diasRestantes: 2,
    medidaActual: 'Prisión Preventiva cumplió 12 meses',
    urgencia: 'critica_plazo',
    estado: 'Activo',
    notas: [
      'URGENTE: Se ha cumplido el plazo máximo de 12 meses de prisión preventiva sin acusación formal.',
      'Aplica el cese de pleno derecho de la prisión preventiva conforme al Art. 241 numeral 1 del Código Procesal Penal.',
      'Instancia de cese redactada y lista para depósito inmediato.'
    ],
    historial: [
      {
        fecha: '2025-10-28',
        titulo: 'Imposición Inicial Medida',
        descripcion: 'Se impuso 1 año de prisión preventiva.'
      },
      {
        fecha: '2026-10-28',
        titulo: 'Vencimiento de Plazo Legal',
        descripcion: 'Cumplido 1 año sin que el Ministerio Público presente requerimiento conclusivo.'
      }
    ]
  }
];

export const INITIAL_COMPLAINTS: HumanRightsComplaint[] = [
  {
    id: 'cndh-01',
    numeroRegistro: 'CNDH-MTS-2026-014',
    victima: 'Kelvin Alexis De la Cruz (24 años)',
    lugarIncidente: 'Sector Pueblo Nuevo, Nagua',
    fechaIncidente: '2026-10-26',
    autoridadSenalada: 'Patrulla de la Policía Nacional (Destacamento Nagua)',
    derechoVulnerado: 'Detención arbitraria y transgresión del plazo constitucional de 48 horas sin presentación ante juez',
    articuloConstitucional: 'Art. 40 numerales 5 y 6, y Art. 69 (Garantías del Debido Proceso) Constitución Dominicana',
    estadoTramite: 'Hábeas Corpus en Trámite',
    descripcionHechos: 'El ciudadano fue detenido en una redada sin orden judicial previa ni flagrancia delictiva. Lleva 72 horas retenido en el cuartel sin ser presentado ante el Ministerio Público ni notificado de cargos.',
    urgencia: 'Inmediata (Privación de libertad)',
    accionesRealizadas: [
      'Visita de verificación en destacamento por Lic. Pedro Baldera.',
      'Notificación verbal al Oficial del día exigiendo presentación al MP.',
      'Redacción y depósito de Acción Constitucional de Hábeas Corpus ante la Cámara Penal de Nagua.'
    ]
  },
  {
    id: 'cndh-02',
    numeroRegistro: 'CNDH-MTS-2026-011',
    victima: 'Comunidad de Agricultores de Las Gordas / Nagua',
    lugarIncidente: 'Sección Las Gordas, María Trinidad Sánchez',
    fechaIncidente: '2026-10-15',
    autoridadSenalada: 'Personas armadas no identificadas con anuencia de agentes de seguridad',
    derechoVulnerado: 'Derecho a la propiedad agraria comunitaria, seguridad personal e integridad física',
    articuloConstitucional: 'Art. 51 (Derecho de Propiedad) y Art. 38 (Dignidad Humana)',
    estadoTramite: 'En Investigación',
    descripcionHechos: 'Campesinos de la zona arrocera denuncian intentos de desalojo extrajudicial sin orden judicial dictada por el Abogado del Estado, con destrucción de parcelas cultivadas.',
    urgencia: 'Alta',
    accionesRealizadas: [
      'Levantamiento testimonial y fotográfico en la parcela.',
      'Solicitud de certificación al Abogado del Estado del Departamento Judicial.',
      'Rueda de prensa y pronunciamiento institucional de la CNDH regional.'
    ]
  },
  {
    id: 'cndh-03',
    numeroRegistro: 'CNDH-MTS-2026-008',
    victima: 'Internos del pabellón B, Cárcel Pública Olegario Tenares',
    lugarIncidente: 'Fortaleza Olegario Tenares, Nagua',
    fechaIncidente: '2026-09-30',
    autoridadSenalada: 'Dirección General de Servicios Penitenciarios y Correccionales (DGSPC)',
    derechoVulnerado: 'Derecho a la salud, integridad física y trato digno de los privados de libertad',
    articuloConstitucional: 'Art. 42 (Derecho a la Integridad Personal) y Reglas Nelson Mandela',
    estadoTramite: 'Elevado a CNDH Central',
    descripcionHechos: 'Condiciones de hacinamiento crítico, falta de medicamentos básicos para internos con afecciones crónicas e insuficiencia de agua potable.',
    urgencia: 'Alta',
    accionesRealizadas: [
      'Inspección ocular conjunta con representantes de la sociedad civil.',
      'Entrega de pliego de peticiones a la Procuraduría Fiscal de Nagua.',
      'Envío de informe a la Comisión Nacional de los Derechos Humanos para presentación ante el Defensor del Pueblo.'
    ]
  }
];

export const LEGAL_TEMPLATES: LegalDocTemplate[] = [
  {
    id: 'cese-prision-241',
    titulo: 'Instancia de Cese de Prisión Preventiva (Art. 241 CPP)',
    baseLegal: 'Art. 241 numeral 1 del Código Procesal Penal Dominicano (Ley 76-02, mod. Ley 10-15)',
    materia: 'Penal - Medidas de Coerción',
    descripcion: 'Petición motivada dirigida al Juez de la Instrucción para ordenar el cese inmediato de la prisión preventiva por haber transcurrido el plazo máximo legal fijado sin que se haya presentado requerimiento conclusivo.',
    camposRequeridos: [
      { clave: 'juez', etiqueta: 'Juez o Tribunal Apoderado', placeholder: 'Al Juez del Juzgado de la Instrucción de María Trinidad Sánchez', tipo: 'text', valorPorDefecto: 'Al Magistrado Juez del Juzgado de la Instrucción del Distrito Judicial de María Trinidad Sánchez' },
      { clave: 'imputado', etiqueta: 'Nombre Completo del Imputado', placeholder: 'Nombre del imputado', tipo: 'text', valorPorDefecto: 'Manuel E. Vásquez Paulino' },
      { clave: 'cedula', etiqueta: 'Cédula del Imputado', placeholder: '071-0000000-0', tipo: 'text', valorPorDefecto: '071-0033412-8' },
      { clave: 'expediente', etiqueta: 'Número de Expediente', placeholder: 'EXP-2026-XXXX', tipo: 'text', valorPorDefecto: 'EXP-2026-0071-CESE' },
      { clave: 'recinto', etiqueta: 'Centro Penitenciario Actual', placeholder: 'Ej. Fortaleza Olegario Tenares de Nagua', tipo: 'text', valorPorDefecto: 'Cárcel Pública Fortaleza Olegario Tenares de Nagua' },
      { clave: 'fechaMedida', etiqueta: 'Fecha de la Resolución que Impuso la Medida', placeholder: 'Ej. 28 de octubre de 2025', tipo: 'text', valorPorDefecto: '28 de octubre de 2025' },
      { clave: 'plazoVencido', etiqueta: 'Plazo Transcurrido', placeholder: 'Ej. 12 meses', tipo: 'text', valorPorDefecto: '12 meses' }
    ],
    generarContenido: (v) => `AL: Magistrado Juez del Juzgado de la Instrucción del Distrito Judicial de María Trinidad Sánchez, Nagua.

ASUNTO: Instancia en Solicitud de CESE INMEDIATO DE PRISIÓN PREVENTIVA por Vencimiento del Plazo Máximo Legal.

BASE LEGAL: Artículo 241 numeral 1 del Código Procesal Penal de la República Dominicana (modificado por la Ley 10-15); Artículos 40 y 69 de la Constitución de la República Dominicana.

IMPUTADO: ${v.imputado || '[Nombre del Imputado]'}, dominicano, mayor de edad, titular de la cédula de identidad y electoral No. ${v.cedula || '[Cédula]'}, recluido actualmente en el recinto penitenciario ${v.recinto || '[Recinto Penitenciario]'}.

ABOGADO DEFENSOR: LIC. PEDRO BALDERA GERMÁN, dominicano, mayor de edad, Abogado de los Tribunales de la República, miembro del Colegio de Abogados de la República Dominicana (CARD), con estudio profesional abierto en la ciudad de Nagua, provincia María Trinidad Sánchez.

EXPEDIENTE NO.: ${v.expediente || '[No. Expediente]'}

HONORABLE MAGISTRADO:

El infrascrito abogado, actuando a nombre y en representación procesal de ${v.imputado || '[Nombre del Imputado]'}, tiene a bien exponeros muy respetuosamente lo siguiente:

1. EN CUANTO A LOS HECHOS Y ANTECEDENTES PROCESALES:
En fecha ${v.fechaMedida || '[Fecha de la Medida]'}, este digno Juzgado impuso en contra de nuestro patrocinado la medida de coerción consistente en prisión preventiva por un lapso de ${v.plazoVencido || '12 meses'}, habiendo sido remitido a ${v.recinto || '[Recinto Penitenciario]'}.

2. EN CUANTO AL DERECHO Y EL CUMPLIMIENTO DEL PLAZO MÁXIMO:
El Artículo 241 del Código Procesal Penal Dominicano, de manera imperativa y sin lugar a interpretación restrictiva, dispone en su numeral 1:
"Cese. La prisión preventiva finaliza: 1) Cuando su duración exceda de doce meses..."

3. A la fecha de redacción y depósito de la presente instancia, ha transcurrido íntegramente dicho plazo legal, sin que el Ministerio Público haya presentado requerimiento conclusivo alguno ni solicitado formalmente declaratoria de caso complejo en los términos de la ley. La prolongación de la privación de libertad en estas circunstancias deviene en arbitraria, ilegal e inconstitucional, violentando el Artículo 40 numeral 6 de la Carta Magna.

POR TALES MOTIVOS, y los que sabréis suplir con vuestro elevado criterio de justicia, os SOLICITAMOS muy formalmente:

PRIMERO: DECLARAR buena y válida en cuanto a la forma la presente instancia de Solicitud de Cese de Prisión Preventiva por haber sido incoada conforme a las reglas del derecho procesal vigente.

SEGUNDO: En cuanto al fondo, ORDENAR EL CESE INMEDIATO de la medida de coerción de prisión preventiva que pesa sobre el ciudadano ${v.imputado || '[Nombre del Imputado]'}, en estricta aplicación del Artículo 241 numeral 1 del Código Procesal Penal.

TERCERO: En consecuencia, ORDENAR la emisión del correspondiente Mandamiento de Libertad a favor del justiciable, o en su defecto, fijar la aplicación de una medida no privativa de libertad contemplada en el Artículo 226 del CPP (presentación periódica y fianza económica).

En la ciudad de Nagua, Provincia María Trinidad Sánchez, República Dominicana, a los ${new Date().toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })}.

________________________________________
LIC. PEDRO BALDERA GERMÁN
Abogado Defensor Penalista
Matrícula CARD`
  },
  {
    id: 'habeas-corpus-71',
    titulo: 'Acción Constitucional de Hábeas Corpus (Art. 71 Constitución)',
    baseLegal: 'Artículo 71 de la Constitución Dominicana y Ley 137-11 Orgánica del Tribunal Constitucional',
    materia: 'Constitucional / Derechos Humanos',
    descripcion: 'Demanda de tutela de la libertad individual frente a privación o amenaza ilegal y arbitraria de la libertad ambulatoria.',
    camposRequeridos: [
      { clave: 'juez', etiqueta: 'Tribunal Apoderado', placeholder: 'A la Presidencia de la Cámara Penal del Juzgado de Primera Instancia de María Trinidad Sánchez', tipo: 'text', valorPorDefecto: 'A la Presidencia de la Cámara Penal del Juzgado de Primera Instancia del Distrito Judicial de María Trinidad Sánchez' },
      { clave: 'afectado', etiqueta: 'Nombre del Ciudadano Privado de Libertad', placeholder: 'Nombre del agraviado', tipo: 'text', valorPorDefecto: 'Kelvin Alexis De la Cruz' },
      { clave: 'cedula', etiqueta: 'Cédula o Identificación', placeholder: 'Cédula', tipo: 'text', valorPorDefecto: '071-0029811-4' },
      { clave: 'autoridad', etiqueta: 'Autoridad Recurrida', placeholder: 'Ej. Coronel Comandante del Destacamento Policial de Nagua', tipo: 'text', valorPorDefecto: 'Comandante del Destacamento de la Policía Nacional de Nagua y Ministerio Público' },
      { clave: 'horasDetencion', etiqueta: 'Tiempo de Detención Ilegal', placeholder: 'Ej. Más de 72 horas', tipo: 'text', valorPorDefecto: '72 horas continuas' },
      { clave: 'hechos', etiqueta: 'Relato sucinto de la arbitrariedad', placeholder: 'Detalles de la aprehensión...', tipo: 'textarea', valorPorDefecto: 'Aprehendido sin orden judicial motivada de arresto, sin encontrarse en flagrante delito, y mantenido retenido sin ser presentado a la autoridad judicial competente dentro del plazo constitucional de las 48 horas.' }
    ],
    generarContenido: (v) => `A LA: Presidencia de la Cámara Penal del Juzgado de Primera Instancia del Distrito Judicial de María Trinidad Sánchez, Nagua.

ASUNTO: Demanda en Acción Constitucional de HÁBEAS CORPUS en favor de ciudadano arbitrariamente privado de su libertad.

BASE LEGAL: Artículo 71 de la Constitución Dominicana; Artículos 381 y siguientes del Código Procesal Penal; Artículos 63 y siguientes de la Ley No. 137-11 Orgánica del Tribunal Constitucional y los Procedimientos Constitucionales.

AGRAVIADO: ${v.afectado || '[Nombre del Agraviado]'}, dominicano, mayor de edad, con cédula de identidad No. ${v.cedula || '[Cédula]'}.

ABOGADO POSTULANTE: LIC. PEDRO BALDERA GERMÁN, en su condición de Abogado y Defensor de los Derechos Humanos (CNDH), con estudio profesional en la calle Sánchez No. 45, Nagua, María Trinidad Sánchez.

AUTORIDAD ACCIONADA: ${v.autoridad || '[Autoridad Accionada]'}.

HONORABLE MAGISTRADO PRESIDENTE:

Quien suscribe tiene a bien solicitar con carácter de extrema urgencia vuestra intervención tutelar, por los motivos de hecho y derecho siguientes:

1. HECHOS:
En fecha reciente, el ciudadano ${v.afectado || '[Nombre]'} fue apresado violentamente por agentes policiales bajo el mando de la autoridad accionada. A la fecha actual, cuenta con ${v.horasDetencion || 'más de 48 horas'} en detención material en las celdas policiales.
Detalle de la infracción: ${v.hechos}

2. DERECHO VIOLENTADO:
El Artículo 40 numeral 5 de la Carta Magna establece que:
"Toda persona privada de su libertad será sometida a la autoridad judicial competente dentro de las cuarenta y ocho horas de su privación..."
Asimismo, el Artículo 71 consagra:
"Toda persona privada de su libertad o amenazada de serlo, de manera ilegal, arbitraria o irrazonable, tiene derecho a una acción de hábeas corpus ante un juez o tribunal competente..."

3. La retención prolongada sin control jurisdiccional constituye una privación arbitraria y un agravio irreparable a las garantías judiciales más elementales de la persona humana.

POR TODO ELLO, SOLICITAMOS:

PRIMERO: ADMITIR como buena, válida y de extrema urgencia la presente Acción Constitucional de Hábeas Corpus.

SEGUNDO: DICTAR INMEDIATAMENTE AUTO DE FIJACIÓN DE AUDIENCIA y ordenar a ${v.autoridad || 'la autoridad recurrida'} que conduzca y presente de inmediato por ante vuestro estrado al ciudadano ${v.afectado || '[Nombre]'}, junto con las causas que justificaron su arresto.

TERCERO: En la audiencia a celebrarse, ORDENAR LA INMEDIATA PUESTA EN LIBERTAD del justiciable por haberse conculcado flagrantemente el plazo constitucional improrrogable de 48 horas y la tutela judicial efectiva.

Justicia que os pide y espera merecer, en Nagua, R.D., a ${new Date().toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })}.

________________________________________
LIC. PEDRO BALDERA GERMÁN
Abogado & Defensor de los Derechos Humanos`
  },
  {
    id: 'apelacion-medida-410',
    titulo: 'Recurso de Apelación de Medida de Coerción (Art. 410 CPP)',
    baseLegal: 'Artículos 410, 411 y siguientes del Código Procesal Penal Dominicano',
    materia: 'Penal - Recursos',
    descripcion: 'Escrito formal de apelación interpuesto ante la Corte de Apelación correspondiente contra la resolución del Juzgado de la Instrucción que impone prisión preventiva de forma desproporcionada.',
    camposRequeridos: [
      { clave: 'corte', etiqueta: 'Corte de Apelación Competente', placeholder: 'Corte de Apelación del Depto. Judicial de San Francisco de Macorís', tipo: 'text', valorPorDefecto: 'A los Honorables Jueces de la Corte de Apelación del Departamento Judicial de San Francisco de Macorís (por vía de la Secretaría del Juzgado de la Instrucción de Nagua)' },
      { clave: 'imputado', etiqueta: 'Nombre del Recurrente', placeholder: 'Imputado', tipo: 'text', valorPorDefecto: 'Juan Carlos Rosario Morales' },
      { clave: 'resolucion', etiqueta: 'Resolución Recurrida No.', placeholder: 'Resolución No. XXX-2026', tipo: 'text', valorPorDefecto: 'Resolución Penal No. 104-2026 de fecha 14 de octubre de 2026' },
      { clave: 'agravios', etiqueta: 'Síntesis de Agravios e Ilegalidades', placeholder: 'Falta de motivación, arraigo no valorado...', tipo: 'textarea', valorPorDefecto: '1. Desnaturalización de los presupuestos de arraigo depositados (contrato laboral, bienes inmuebles y arraigo familiar comprobable). 2. Violación al principio de excepcionalidad de la prisión preventiva (Art. 222 CPP). 3. Omisión de examen de medidas menos gravosas (Art. 226 incisos 1 y 4).' }
    ],
    generarContenido: (v) => `A LOS: Honorables Magistrados Jueces que componen la Corte de Apelación del Departamento Judicial de San Francisco de Macorís.
POR VÍA DE: La Secretaría del Juzgado de la Instrucción del Distrito Judicial de María Trinidad Sánchez, Nagua.

ASUNTO: Escrito motivado de RECURSO DE APELACIÓN contra ${v.resolucion || '[Resolución Recurrida]'}.

RECURRENTE: ${v.imputado || '[Nombre del Imputado]'}, a través de su defensa técnica.

DEFENSA TÉCNICA: LIC. PEDRO BALDERA GERMÁN, Abogado de los Tribunales de la República, matrícula CARD activa, con domicilio procesal en Nagua, R.D.

HONORABLES MAGISTRADOS:

En tiempo hábil dentro del plazo improrrogable de DIEZ (10) DÍAS previsto en el Artículo 411 del Código Procesal Penal, interponemos formal recurso de apelación fundamentado en las siguientes consideraciones:

I. ADMISIBILIDAD:
La resolución impugnada es susceptible de apelación directa de conformidad con el Artículo 410 del Código Procesal Penal. El recurso se interpone en la secretaría del tribunal a quo cumpliendo los requisitos formales de ley.

II. AGRAVIOS QUE FUNDAMENTAN LA APELACIÓN:
${v.agravios}

El tribunal de primer grado incurrió en vicio de insuficiente motivación jurídica y vulneró el principio constitucional de que la libertad es la regla y la prisión preventiva la excepción insoslayable.

POR TODO ELLO, SOLICITAMOS:

PRIMERO: DECLARAR ADMISIBLE en la forma el presente recurso de apelación por haber sido interpuesto en tiempo hábil y con apego a las disposiciones de los Artículos 410 y 411 del Código Procesal Penal.

SEGUNDO: En cuanto al fondo, REVOCAR EN TODAS SUS PARTES ${v.resolucion || 'la resolución impugnada'}.

TERCERO: MODIFICAR la medida de coerción y en su lugar IMPONER a favor de ${v.imputado || '[Imputado]'} las medidas de coerción establecidas en los numerales 1 y 4 del Artículo 226 del CPP, consistentes en fianza económica y presentación periódica.

Por la recta aplicación de las garantías constitucionales, en Nagua, a ${new Date().toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })}.

________________________________________
LIC. PEDRO BALDERA GERMÁN
Abogado Defensor`
  }
];

export const STATUTORY_DEADLINES = [
  {
    titulo: 'Presentación del Detenido ante el Juez (Medida de Coerción)',
    plazo: '48 Horas continuas',
    baseLegal: 'Art. 40 numeral 5 Constitución / Art. 224 CPP',
    tipo: 'horas',
    duracionHoras: 48,
    descripcion: 'Plazo perentorio desde el momento exacto del arresto policial para someter al detenido a control judicial.'
  },
  {
    titulo: 'Conclusión de la Fase Preparatoria (Con Prisión Preventiva)',
    plazo: '3 Meses (prorrogable 2 meses más)',
    baseLegal: 'Art. 150 del Código Procesal Penal',
    tipo: 'meses',
    duracionMeses: 3,
    descripcion: 'Tiempo que tiene el Ministerio Público para formular acusación formal o requerimiento conclusivo cuando el imputado guarda prisión.'
  },
  {
    titulo: 'Conclusión de la Fase Preparatoria (En Libertad o Medida no Privativa)',
    plazo: '6 Meses',
    baseLegal: 'Art. 150 del Código Procesal Penal',
    tipo: 'meses',
    duracionMeses: 6,
    descripcion: 'Plazo otorgado a la Fiscalía para concluir la investigación cuando el justiciable está en libertad.'
  },
  {
    titulo: 'Duración Máxima de la Prisión Preventiva Ordinaria',
    plazo: '12 Meses',
    baseLegal: 'Art. 241 numeral 1 del CPP',
    tipo: 'meses',
    duracionMeses: 12,
    descripcion: 'Límite temporal absoluto para la vigencia de la prisión preventiva antes del cese obligatorio de pleno derecho.'
  },
  {
    titulo: 'Recurso de Apelación de Medida de Coerción',
    plazo: '10 Días hábiles',
    baseLegal: 'Art. 411 del Código Procesal Penal',
    tipo: 'dias',
    duracionDias: 10,
    descripcion: 'Plazo legal a partir de la notificación de la resolución coercitiva para depositar el recurso ante la corte de alzada.'
  },
  {
    titulo: 'Recurso de Apelación contra Sentencia de Juicio de Fondo',
    plazo: '20 Días',
    baseLegal: 'Art. 418 del Código Procesal Penal',
    tipo: 'dias',
    duracionDias: 20,
    descripcion: 'Plazo para apelar la sentencia definitiva condenatoria o absolutoria dictada por tribunal unipersonal o colegiado.'
  },
  {
    titulo: 'Duración Máxima Total del Proceso Penal Dominicano',
    plazo: '4 Años (Ley 10-15)',
    baseLegal: 'Art. 148 del CPP',
    tipo: 'anos',
    duracionMeses: 48,
    descripcion: 'Plazo de extinción definitiva de la acción penal si el proceso no ha concluido con sentencia irrevocable.'
  }
];
