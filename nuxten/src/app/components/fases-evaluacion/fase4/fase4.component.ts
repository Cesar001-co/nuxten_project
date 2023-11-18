import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EvaluacionJS, ProblemaInfo, listaPromDesvEst } from 'src/app/interfaces/Evaluaciones';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { WaitingComponent } from '../../dialog-alerts/waiting/waiting.component';
import { MatTableDataSource } from '@angular/material/table';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from "ng-apexcharts";
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export interface listaGrafica {
  desvCriticidad: number;
  problemas: any
}

@Component({
  selector: 'nuxten-fase4',
  templateUrl: './fase4.component.html',
  styleUrls: ['./fase4.component.scss']
})

export class Fase4Component implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  state!: any;
  private subscription!: Subscription;
  private subscriptionEvafases!: Subscription;

  evaFases!: EvaluacionJS;
  datosEvaluacion!: EvaluacionJS;

  private faseEva!: any;
  private idEvaluacion!: any;
  public expertPos!: any;

  dataSoucePromDesvEst!: MatTableDataSource<listaPromDesvEst>;
  displayedColumnsPromDesvEst: string[] = ['pro', 'def', 'sevP', 'freP', 'criP', 'sevD', 'freD', 'criD'];
  problemasDesvPromDesvEst: listaPromDesvEst[] = [];

  dataSouceSoluciones!: MatTableDataSource<ProblemaInfo>;
  displayedColumnsSolucion: string[] = ['pro', 'defS', 'sol'];
  solucionesProblemas: ProblemaInfo[] = [];

  respaldo: any = '';

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private route: Router,
    private fasesService: FasesService,
    private routeInfo: ActivatedRoute,
    private fasesEvaluacionService: FasesEvaluacionService,
    private evaluacionService: EvaluacionService
  ) {
    this.subscription = this.fasesService.state$.subscribe(state => {
      this.state = state;
    });
    if (this.state == true) {
      this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
    }
    // OBTENER LOS DATOS ENVIADOS POR EL LINK
    this.faseEva = this.routeInfo.snapshot.paramMap.get('faseEva');
    this.idEvaluacion = this.routeInfo.snapshot.paramMap.get('evaluacion');
    this.expertPos = this.routeInfo.snapshot.paramMap.get('pos');
  }

  ngOnInit() {
    this.getFaseEva();
    this.getDatosEvaluacion();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvafases.unsubscribe();
  }

  async getFaseEva() {
    this.subscriptionEvafases = this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;
      this.getSolucionesProblemas();
      //VERIFICAR EL ESTADO DE LA FASE
      if (this.evaFases.Fase4.state == false) {
        //VERIFICAR EL ESTADO DEL EXPERTO
        if (this.evaFases.Fase4.expertoSt[this.expertPos]) {
          this.estadoDeFase('Fase 4');
        }
      } else {
        this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
      }
    });
  }

  getDatosEvaluacion() {
    this.fasesEvaluacionService.getFaseEvaNoChanges(this.faseEva).subscribe((fasesEva: any) => {
      this.datosEvaluacion = fasesEva.data();
      console.log(this.datosEvaluacion);

      this.getProblemasPromDesvEst(this.datosEvaluacion);
      this.setGraficaValues(this.datosEvaluacion);
    });
  }

  getSolucionesProblemas() {
    this.solucionesProblemas = this.evaFases.listaProblemas;
    this.dataSouceSoluciones = new MatTableDataSource(this.solucionesProblemas);
  }

  //ENVIA LA CONFIGURACION DEL GRAFICO
  setGraficaValues(evaFases: EvaluacionJS) {
    let listaProblemasDesvEst: listaGrafica[] = []
    for (let i = 0; i < evaFases.listaProblemas.length; i++) {
      listaProblemasDesvEst.push({
        desvCriticidad: Number(this.problemasDesvPromDesvEst[i].desvEst?.criticidad.toFixed(1)),
        problemas: `P${i + 1}`
      });
    }
    listaProblemasDesvEst = listaProblemasDesvEst.sort((a, b) => a.desvCriticidad - b.desvCriticidad);

    this.chartOptions = {
      series: [
        {
          name: "Desviacion Est. Criticidad",
          data: listaProblemasDesvEst.map((des) => des.desvCriticidad),
          color: 'var(--nuxten-color-primary)'
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Desviación Estandar Criticidad"
      },
      xaxis: {
        categories: listaProblemasDesvEst.map((des) => des.problemas)
      }
    };
  }

  //OBTENER EL PROMEDIO Y LA DESVIACION ESTANDAR DE TODOS LOS PROBLEMAS
  getProblemasPromDesvEst(evaFases: EvaluacionJS) {
    for (let i = 0; i < evaFases.listaProblemas.length; i++) {
      let PromSeveridad = 0;
      let PromFrecuencia = 0;
      let PromCriticidad = 0;

      let listaSeveridad = [];
      let listaFrecuencia = [];
      let listaCriticidad = [];
      for (let j = 0; j < evaFases.Expertos.length; j++) {
        //OBTENER LA SUMATORIA DE SEVERIDAD, FRECUENCIA Y CRITICIDAD DEL PROBLEMA ACTUAL EN LA LISTA
        PromSeveridad = PromSeveridad + evaFases.Fase3.calificaciones[j].problemas[i].severidad;
        PromFrecuencia = PromFrecuencia + evaFases.Fase3.calificaciones[j].problemas[i].frecuencia;
        PromCriticidad = PromCriticidad + evaFases.Fase3.calificaciones[j].problemas[i].criticidad;

        //OBTENER SEVERIDAD, FRECUENCIA Y CRITICIDAD DEL PROBLEMA ACTUAL EN LA LISTA
        listaSeveridad.push(evaFases.Fase3.calificaciones[j].problemas[i].severidad);
        listaFrecuencia.push(evaFases.Fase3.calificaciones[j].problemas[i].frecuencia);
        listaCriticidad.push(evaFases.Fase3.calificaciones[j].problemas[i].criticidad);
      }
      PromSeveridad = PromSeveridad / evaFases.Expertos.length;
      PromFrecuencia = PromFrecuencia / evaFases.Expertos.length;
      PromCriticidad = PromCriticidad / evaFases.Expertos.length;

      this.problemasDesvPromDesvEst.push({
        problema: evaFases.listaProblemas[i].defProb,
        promedio: {
          severidad: PromSeveridad,
          frecuencia: PromFrecuencia,
          criticidad: PromCriticidad
        },
        desvEst: {
          severidad: this.calcularDesvEst(listaSeveridad),
          frecuencia: this.calcularDesvEst(listaFrecuencia),
          criticidad: this.calcularDesvEst(listaCriticidad)
        },
      });
    }
    this.dataSoucePromDesvEst = new MatTableDataSource(this.problemasDesvPromDesvEst);
  }

  //CALCULAR LA DESVIACION ESTANDAR DE LOS PROBLEMAS
  calcularDesvEst(muestra: number[]): number {
    const n = muestra.length;

    if (n <= 1) {
      // La desviación estándar no está definida para muestras de tamaño 0 o 1.
      return 0;
    }

    // Calcular la media de la muestra
    const media = muestra.reduce((sum, value) => sum + value, 0) / n;

    // Calcular la suma de los cuadrados de las diferencias
    const sumatoriaCuadradosDiferencias = muestra.reduce((sum, value) => {
      const diferencia = value - media;
      return sum + diferencia * diferencia;
    }, 0);

    // Calcular la desviación estándar
    const desviacionEstandar = Math.sqrt(sumatoriaCuadradosDiferencias / (n - 1));

    return desviacionEstandar;
  }

  finalizarFase() {
    //GENERAR ADVERTENCIA
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 8 },
      disableClose: true
    });
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        // this.evaFases.Fase4.expertoSt[this.expertPos] = true;
        // //VERIFICAR SI ES EL ULTIMO 
        // if (this.fasesEvaluacionService.expertosCount(this.evaFases.Fase4.expertoSt) == this.evaFases.Expertos.length) {
        //   //ULTIMO: ACTUALIZA TODA LA FASE
        //   //VERIFICAR QUE TODOS LOS PROBLEMAS TENGAN SOLUCION
        //   if (this.evaFases.listaProblemas.filter((prob) => prob.solucion != "").length != this.evaFases.listaProblemas.length) {
        //     this.toast.warning("Debe llenar la solucion de todos los problemas", "Mensaje de Advertenica");
        //   } else {
        //     this.evaFases.Fase4.state = true;
        //     this.guardarProblemas().then(() => {
        //       const infoFaseEvaluacion = {
        //         idEvaluacion: this.idEvaluacion,
        //         fase: 'Fase 4'
        //       };
        //       //UPDATE CAMPO FASE EVALUACION
        //       this.evaluacionService.updateFaseEvaluacion(infoFaseEvaluacion).subscribe({
        //         next: () => {
        //           //VERIFICAR ESTADO DE LA FASE
        //           this.estadoDeFase('Fase 4');
        //         }
        //       });
        //     });
        //   }
        // } else {
        //   //NO ULTIMO: GUARDA LOS PROBLEMAS Y ACTUALIZA SU ESTADO
        //   //UPDATE INFO EN FIREBASE
        //   this.guardarProblemas().then(() => {
        //     this.estadoDeFase('Fase 4');
        //   });
        // }
      }
    });

  }

  onFocus(problema: any) {
    this.respaldo = problema.solucion;
  }

  onBlur(problema: any) {
    if (this.respaldo != problema.solucion) {
      this.guardarProblemas();
    }
  }

  //ALERTA DE ESPERAR CAMBIO DE FASE
  estadoDeFase(fase: any) {
    //VERIFICAR CUANTAS ALERTAS ESTAN ABIERTAS
    if (this.dialog.openDialogs.length == 0) {
      const dialogAv = this.dialog.open(WaitingComponent, {
        data: {
          idFaseEva: this.faseEva,
          fase: fase
        },
        disableClose: true
      });
      dialogAv.afterClosed().subscribe(result => {
        if (result == false) {
          this.evaFases.Fase4.expertoSt[this.expertPos] = false;
          this.guardarProblemas();
        } else {
          this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
        }
      });
    }
  }

  //GUARDAR DATOS
  guardarProblemas() {
    return this.fasesEvaluacionService.updateFaseEva(this.faseEva, this.evaFases)
  }

  goBack() {
    this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
  }
}
