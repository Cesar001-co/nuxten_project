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

export interface loginInfo {
    email: string;
    contraseña: string;
}

//cambiar
export interface UserExperto {
    idUser: number;
    nombres: string;
    apellidos: string;
    numero: string;
    rol: 'Experto' | 'Admin';
    email: string;
    contraseña: string;
    idEvaluacion: string | null;
}