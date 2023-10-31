import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EvaluacionInfo, EvaluacionJS } from 'src/app/interfaces/Evaluaciones';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private API_SERVER = environment.posgresDB.API_SERVER + "evaluacionController/";

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  //CREAR EVALUACION EN LA BASE DE DATOS
  crearEvaluacion(evaluacion: any) {
    return this.httpClient.post(this.API_SERVER + "saveEvaluacion", evaluacion);
  }

  //TRAER LA INFORMACION DE TODAS LAS EVALUACIONES
  getAllEvaluaciones() {
    return this.httpClient.get<EvaluacionInfo[]>(this.API_SERVER + "findAllEvaluaciones");
  }

  //TRAER LA INFORMACION DE UNA EVALUACION EN ESPECIFICO
  getEvaluacion(idEvaluacion: number) {
    return this.httpClient.get<EvaluacionInfo>(this.API_SERVER + idEvaluacion);
  }

  updateFasesEva() {

  }

  //DEFAULT EVALUACION DATA
  genDefProblemas(data: any): Array<any> {
    const arr: any = [];
    for (let index = 0; index < data.length; index++) {
      arr.push({});
    }
    return arr
  }

  genDefExpertos(data: any): Array<any> {
    const arr: any = [];
    for (let index = 0; index < data.length; index++) {
      arr.push(false);
    }
    return arr
  }

  setExpertos(data: any): Array<any> {
    const arr: any = [];
    for (let index = 0; index < data.length; index++) {
      arr.push(data[index]);
    }
    return arr
  }

  setDefCalificaciones(data: any): Array<any> {
    const arr: any = [];
    for (let index = 0; index < data.length; index++) {
      arr.push({problemas: []});
    }
    return arr
  }

  generateDefaultFase(data: any) {
    const evaluacion: EvaluacionJS = {
      Expertos: this.setExpertos(data),
      Creada: {
        expertoSt: this.genDefExpertos(data),
        state: false
      },
      Fase1: {
        expertoSt: this.genDefExpertos(data),
        problemas: this.genDefProblemas(data),
        state: false
      },
      listaProblemas: [],
      Fase2: {
        expertoSt: this.genDefExpertos(data),
        problemas: [],
        state: false
      },
      Fase3: {
        expertoSt: this.genDefExpertos(data),
        calificaciones: this.setDefCalificaciones(data),
        state: false
      },
      Fase4: {
        expertoSt: this.genDefExpertos(data),
        state: false
      }
    }
    // const json = JSON.stringify(evaluacion);
    // console.log(json);
    // const eva: EvaluacionJS = JSON.parse(json);
    // console.log(eva.Creada.expertoSt[0]);
    return JSON.stringify(evaluacion);
  }
}
