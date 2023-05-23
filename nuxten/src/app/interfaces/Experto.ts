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

export interface ExpertoInFo {
    nombres: string;
    apellidos: string;
    identfi: number;
    email: string;
    numero: number;
    userID: string;
    idEvaluacion: string;
}

export interface UserExperto {
    idUser: number;
    nombres: string;
    apellidos: string;
    numero: number;
    rol: 'Experto' | 'Admin';
    email: string;
    password: string;
    idEvaluacion: string;
}