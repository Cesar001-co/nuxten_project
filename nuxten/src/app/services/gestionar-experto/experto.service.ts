import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ExpertInFo, InsertExperto } from 'src/app/interfaces/Experto';

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
    console.log('userdata: ', registerExpert);
    return this.httpClient.post(this.API_SERVER + "saveUsers", registerExpert)
  }

  getExpertos() {
    return this.httpClient.get(this.API_SERVER + "findAllUsersNotAdmin")
  }

  updateExperto(data: ExpertInFo) {
    // return this.httpClient.get(this.API_SERVER + "findAllUsersNotAdmin")
  }

  deleteExperto(id: number) {
    // return this.httpClient.post(this.API_SERVER + "findAllUsersNotAdmin")
  }
}
