import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Calificacion, EvaluacionJS, ProblemaInfo } from 'src/app/interfaces/Evaluaciones';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';
import { WaitingComponent } from '../../dialog-alerts/waiting/waiting.component';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';

@Component({
  selector: 'nuxten-fase3',
  templateUrl: './fase3.component.html',
  styleUrls: ['./fase3.component.scss']
})
export class Fase3Component implements OnInit {

  state!: any;
  private subscription!: Subscription;
  private subscriptionEvafases!: Subscription;

  evaFases!: EvaluacionJS;

  private faseEva!: any;
  private idEvaluacion!: any;
  private expertPos!: any;

  //ESCALAS DE CALIFICAICON
  escalas = [0, 1, 2, 3, 4];

  //Escala de calificación de severidad y frecuencia
  escalaInfo: any[] = [
    {
      severidad: '(4) Catastrofico',
      frecuencia: '(4) > 90%'
    },
    {
      severidad: '(3) Mayor',
      frecuencia: '(3) 51% - 90%'
    },
    {
      severidad: '(2) Menor',
      frecuencia: '(2) 11% - 50%'
    },
    {
      severidad: '(1) Cosmetico',
      frecuencia: '(1) 1% - 10%'
    },
    {
      severidad: '(0) No es problema',
      frecuencia: '(0) < 1%'
    }
  ];
  displayedColumns: string[] = ['sev', 'fre'];

  dataSourceClas!: MatTableDataSource<Calificacion>;
  problemas: Calificacion[] = [];
  displayedClasiColumns: string[] = ['pro', 'def', 'sev', 'fre', 'cri'];

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
      this.route.navigate(['/nuxten/evaluacion']);
    }
    // OBTENER LOS DATOS ENVIADOS POR EL LINK
    this.faseEva = this.routeInfo.snapshot.paramMap.get('faseEva');
    this.idEvaluacion = this.routeInfo.snapshot.paramMap.get('evaluacion');
    this.expertPos = this.routeInfo.snapshot.paramMap.get('pos');
  }
  ngOnInit() {
    this.getFaseEva();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvafases.unsubscribe();
  }

  async getFaseEva() {
    this.subscriptionEvafases = this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;
      this.getUserProblemas();
      //VERIFICAR EL ESTADO DE LA FASE
      if (this.evaFases.Fase3.state == false) {
        //VERIFICAR EL ESTADO DEL EXPERTO
        if (this.evaFases.Fase3.expertoSt[this.expertPos]) {
          this.estadoDeFase('Fase 3');
        }
      } else {
        this.route.navigate(['/nuxten/evaluacion']);
      }
    });
  }

  getUserProblemas() {
    this.problemas = this.evaFases.Fase3.calificaciones[this.expertPos].problemas;
    this.dataSourceClas = new MatTableDataSource(this.problemas);
  }

  scrollToClasificacion() {
    const element = document.getElementById('clasificacion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  finalizarFase() {
    //GENERAR ADVERTENCIA
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 8 },
      disableClose: true
    });
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        this.evaFases.Fase3.expertoSt[this.expertPos] = true;
        //VERIFICAR SI ES EL ULTIMO 
        if (this.fasesEvaluacionService.expertosCount(this.evaFases.Fase3.expertoSt) == this.evaFases.Expertos.length) {
          //ULTIMO: ACTUALIZA TODA LA FASE
          this.evaFases.Fase3.state = true;
          this.guardarProblemas().then(() => {
            const infoFaseEvaluacion = {
              idEvaluacion: this.idEvaluacion,
              fase: 'Fase 4'
            };
            //UPDATE CAMPO FASE EVALUACION
            this.evaluacionService.updateFaseEvaluacion(infoFaseEvaluacion).subscribe({
              next: () => {
                //VERIFICAR ESTADO DE LA FASE
                this.estadoDeFase('Fase 3');
              }
            });
          });
        } else {
          //NO ULTIMO: GUARDA LOS PROBLEMAS Y ACTUALIZA SU ESTADO
          //UPDATE INFO EN FIREBASE
          this.guardarProblemas().then(() => {
            this.estadoDeFase('Fase 3');
          });
        }
      }
    });
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
          this.evaFases.Fase3.expertoSt[this.expertPos] = false;
          this.guardarProblemas();
        } else {
          this.route.navigate(['/nuxten/evaluacion']);
        }
      });
    }
  }

  //DETECTAR EL CAMBIO
  onChange(dato: any, factor: any, problema: any) {
    if (factor.match('severidad')) {
      problema.severidad = dato;
    } else if (factor.match('frecuencia')) {
      problema.frecuencia = dato;
    }
    //REEMPLAZAR EL VALOR DE CRITICIDAD POR LA SUMA DE LA SEVERIDAD Y LA FRECUENCIA
    problema.criticidad = problema.severidad + problema.frecuencia;

    this.calificarProblema(problema, this.evaFases.Fase3.calificaciones[this.expertPos].problemas.indexOf(problema));
  }

  //GUARDAR DATOS
  guardarProblemas() {
    return this.fasesEvaluacionService.updateFaseEva(this.faseEva, this.evaFases)
  }

  calificarProblema(problema: any, problemaIndex: number) {
    return this.fasesEvaluacionService.calificarProblema(this.faseEva, this.expertPos, problemaIndex, problema)
  }

  goBack() {
    this.route.navigate(['/nuxten/evaluacion']);
  }

}
