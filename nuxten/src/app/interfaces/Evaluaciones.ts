export interface EvaluacionInfo {
    idEvaluacion: number;
    nombreSitio: string;
    urlVer: string;
    tipoSitio: string;
    fecha: string;
    fase: 'Creada' | 'Fase 1' | 'Fase 2' | 'Fase 3' | 'Fase 4';
    idFaseEva: number;
    idGrupo: number;
}