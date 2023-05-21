export interface InsertExperto {
    nombres: string;
    apellidos: string;
    identfi: number;
    email: string;
    numero: number;
    password: string;
}

export interface PruebaExperto {
    idCedula: number;
    nombres: string;
    apellidos: string;
    telefono: string;
    correoElectronico: string;
    userId: string | null;
    idEvaluacion: number | null;
}

export interface ExpertoInFo {
    nombres: string;
    apellidos: string;
    identfi: number;
    email: string;
    numero: number;
    userID: string;
    idEvaluacion: string;
}