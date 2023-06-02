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

export interface Expertos {
    idExpertos: number;
    idUsuario: number;
    idGrupo: number;
}

//EVALUACION JSON ============================================
export interface Problema {
    defProb: string;
    expProb: string;
    principios: string[];
}

export interface ProblemaInfo {
    selected: boolean;
    defProb: string;
    expProb: string;
    principios: string[];
    idEvid: string | null;
    solucion: string;
}

export interface ProblemaEvidencia {
    eviRute: string;
}

export interface Calificacion {
    severidad: number;
    frecuencia: number;
    criticidad: number;
}

export interface ProblemasCalificacion {
    problemas: Calificacion[]
}

export interface EvaluacionJS {
    Expertos: any[]
    Creada: {
        expertoSt: boolean[];
        state: boolean;
    };
    Fase1: {
        expertoSt: boolean[];
        problemas: Problema[];
        state: boolean;
    };
    listaProblemas: ProblemaInfo[]
    Fase2: {
        expertoSt: boolean[];
        problemas: ProblemaEvidencia[];
        state: boolean;
    };
    Fase3: {
        expertoSt: boolean[];
        calificaciones: ProblemasCalificacion[];
        state: boolean;
    }
    Fase4: {
        expertoSt: boolean[];
        state: boolean;
    }
}

