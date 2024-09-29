import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoSitiosService {

  private API_SERVER = environment.posgresDB.API_SERVER + "tipoSitioController/";

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  //TRAER LA INFORMACION DE TODAS LOS TIPOS DE SITIOS
  getAllTipoSitios() {
    return this.httpClient.get(this.API_SERVER + "findAllTipoSitio");
  }
}
