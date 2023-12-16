import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ExpertInFo, ExpertPassword, InsertExperto } from 'src/app/interfaces/Experto';

@Injectable({
  providedIn: 'root'
})
export class ExpertoService {

  private API_SERVER = environment.posgresDB.API_SERVER + "usuarioController/";

  constructor(
    private httpClient: HttpClient
  ) {

  }

  addExperto(registerExpert: InsertExperto) {
    return this.httpClient.post(this.API_SERVER + "saveUsers", registerExpert)
  }

  //Traer expertos sin admin
  getExpertos() {
    return this.httpClient.get(this.API_SERVER + "findAllUsersNotAdmin")
  }

  //Traer expertos sin evaluacion
  getAllExpertos() {
    return this.httpClient.get(this.API_SERVER + "findAllUsers")
  }

  updateExperto(data: any) {
    return this.httpClient.put(this.API_SERVER + "updateUser", data)
  }

  deleteExperto(id: number) {
    return this.httpClient.delete(this.API_SERVER + id)
  }

  //OBTENER LA IDEVALUACION DEL USUARIO
  getExpertoIdEvaluacion(idUsuario: any){
    return this.httpClient.get(this.API_SERVER + "obtenerIdEvaluacionPorIdUsuario/" + idUsuario)
  }
}
