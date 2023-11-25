import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EvidenciasService {

  private API_SERVER = environment.posgresDB.API_SERVER + "evidenciasController/";

  constructor(
    private httpClient: HttpClient
  ) {

  }

  //CREAR EVIDENCIA EN LA BASE DE DATOS
  crearEvidencia(evidencia: any) {
    return this.httpClient.post(this.API_SERVER + "crear-evidencia", evidencia);
  }

  //ELIMINAR EVIDENCIA DE LA BASE DE DATOS
  deleteEvidencia(idEvid: any) {
    return this.httpClient.delete(this.API_SERVER + "deleteByIdEvidencia/" + idEvid);
  }

  //REEMPLAZAR EVIDENCIA
  updateEvidencia(evidencia: any) {
    return this.httpClient.put(this.API_SERVER + 'updateEvidencia', evidencia);
  }
  
  //CONVERTIR UN ARCHIVO FILE A BASE64 PARA GUARDARLO EN LA BASE DE DATOS
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = btoa(reader.result as string);
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsBinaryString(file);
    });
  }
}
