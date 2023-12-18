import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private API_SERVER = environment.posgresDB.API_SERVER + "gruposController/";

  constructor(
    private httpClient: HttpClient
  ) {

  }

  createGrupo(grupoExpertos: any) {
    return this.httpClient.post(this.API_SERVER + "crearGrupo",grupoExpertos);
  }
}
