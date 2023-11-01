import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FasesEvaluacionService {

  private API_SERVER = environment.posgresDB.API_SERVER + "FaseEvaluacionController/";

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  //OBTENER LA INFORMACION DE LA EVALUACION POR MEDIO DEL ID DE LA FASE
  getFaseEva(idFase: number){
    return this.httpClient.get(this.API_SERVER + idFase);
  }

  //EDITAR LA INFORMACION DE LA EVALUACION
  updateFaseEva(faseEva: any) {
    return this.httpClient.post(this.API_SERVER + "updateFaseEva", faseEva);
  }
}
