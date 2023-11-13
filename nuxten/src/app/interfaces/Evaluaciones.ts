export interface EvaluacionInfo {
    idEvaluacion: number;
    nombreSitio: string ;
    urlSitio: string;
    tipoSitio: string;
    fechaCreacion: Date | null;
    fase: 'Creada' | 'Fase 1' | 'Fase 2' | 'Fase 3' | 'Fase 4';
    idFaEva: String;
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
    principios: listPrincipios[];
}

type listPrincipios = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'H7' | 'H8' | 'H9' | 'H10';

export interface Problemas {
    listaProb: Problema []
}

export interface ProblemaInfo {
    selected: boolean;
    defProb: string;
    expProb: string;
    principios: string[];
    idEvid: string | null;
    nombreArchivo: string | null;
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
        problemas: Problemas[];
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

