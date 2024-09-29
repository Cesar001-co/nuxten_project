import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EvaluacionInfo, EvaluacionJS, ProblemaInfo, listaPromDesvEst } from 'src/app/interfaces/Evaluaciones';
import { environment } from 'src/environments/environment.development';
import { ReportesService } from './reportes.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private API_SERVER = environment.posgresDB.API_SERVER + "evaluacionController/";

  constructor(
    private httpClient: HttpClient,
    private _reportesService: ReportesService,
    private toast: ToastrService
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

  //MODIFICAR LOS DATOS GENERALES DE LA EVALUCION
  updateInfoEvaluacion(infoEvaluacion: any) {
    return this.httpClient.put(this.API_SERVER + 'updateEvaluacionInfo', infoEvaluacion);
  }

  //MODIFICAR LA FASE DE LA EVALUACION
  updateFaseEvaluacion(infoEvaluacion: any) {
    return this.httpClient.put(this.API_SERVER + 'updateNombreFaseEva', infoEvaluacion);
  }

  //MODIFICAR LA FASE ACTUAL DE LA EVALUACION
  deleteEvaluacion(idEvaluacion: any) {
    return this.httpClient.delete(this.API_SERVER + "deleteEvaluacion/" + idEvaluacion);
  }

  getUsuariosByEvaluacion(idEvaluacion: any) {
    return this.httpClient.get(this.API_SERVER + "getUsuariosByEvaluacion/" + idEvaluacion)
  }

  //FINALIZA EVALUACION Y GUARDA LOS DATOS DE LA EVALUACION PARA GENERAR EL REPORTE
  finalizarEvaluacion(evaInfo: any, problemas: ProblemaInfo[], problemasPromDesv: listaPromDesvEst[]) {
    //LISTADO DE PROBLEMAS
    const listaProblemas: any[] = [];
    problemas.map(problema => {
      listaProblemas.push({
        num: 'P' + (problemas.indexOf(problema) + 1),
        defProb: problema.defProb,
        expProb: problema.expProb,
        principios: problema.principios.toString(),
        idEvid: problema.idEvid,
        evidencia: problema.nombreArchivo
      })
    });
    //LISTADO DE PROB. PROMEDIO  DESVIACION ESTANDAR
    const listaProblemasPromDesv: any[] = problemasPromDesv;
    listaProblemasPromDesv.map(prob => {
      prob.num = 'P' + (problemasPromDesv.indexOf(prob) + 1);
    });
    //DATOS GRAFICA DESVIACION
    let graficaProbPromDesv: any[] = [];
    problemasPromDesv.map(problema => {
      graficaProbPromDesv.push({
        desvCriticidad: Number(problema.desvEst?.criticidad.toFixed(1)),
        num: 'P' + (problemasPromDesv.indexOf(problema) + 1)
      })
    });
    graficaProbPromDesv = graficaProbPromDesv.sort((a, b) => a.desvCriticidad - b.desvCriticidad);
    //LISTA DE SOLUCIONES
    let listaSoluciones: any[] = [];
    problemas.map(problema => {
      listaSoluciones.push({
        num: 'P' + (problemas.indexOf(problema) + 1),
        def: problema.defProb,
        solucion: problema.solucion
      })
    });
    const infoReport = {
      evaInfo: evaInfo,
      problemas: listaProblemas,
      problemasPromDesv: listaProblemasPromDesv,
      grafica: graficaProbPromDesv,
      soluciones: listaSoluciones
    }
    this._reportesService.generarReporte(infoReport);
    return this.httpClient.delete(this.API_SERVER + 'finalizarEvaluacion/'+ evaInfo.idEvaluacion);
  }

  //DEFAULT EVALUACION DATA
  genDefProblemas(data: any): Array<any> {
    const arr: any = [];
    for (let index = 0; index < data.length; index++) {
      arr.push({ listaProb: [] });
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
      arr.push({ problemas: [] });
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
