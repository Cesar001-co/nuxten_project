export interface InsertExperto {
    idUser: number;
    nombres: string;
    apellidos: string;
    numero: string;
    rol: 'Experto';
    email: string;
    contraseña: string;
    idEvaluacion: null;
}

export interface ExpertInFo {
    idUser: number;
    nombres: string;
    apellidos: string;
    numero: string;
    email: string;
}

export interface checkedExpert {
    idUser: number;
    nombres: string;
    apellidos: string;
    email: string;
    checked: boolean;
}

export interface ExpertPassword {
    idUser: number;
    contraseña: string;
}

export interface loginInfo {
    email: string;
    contraseña: string;
}

export interface ExpertoData {
    idUser: number;
    nombres: string;
    apellidos: string;
    numero: string;
    rol: 'Experto' | 'Admin';
    email: string;
    contraseña: string;
    idEvaluacion: any;
    // idEvaluacion: null | number;
} 
