import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HeuristicasService {

  private API_SERVER = environment.posgresDB.API_SERVER + "heuristicasController/";

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  //TRAER LA INFORMACION DE TODAS LAS HEURISTICAS
  getAllHeuristicas() {
    return this.httpClient.get(this.API_SERVER + "findAllHeuristicas");
  }
}
