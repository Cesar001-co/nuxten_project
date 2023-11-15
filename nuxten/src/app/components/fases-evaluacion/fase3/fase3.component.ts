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

@Component({
  selector: 'nuxten-fase3',
  templateUrl: './fase3.component.html',
  styleUrls: ['./fase3.component.scss']
})
export class Fase3Component implements OnInit {

  state!: any;
  private subscription!: Subscription;

  evaFases!: EvaluacionJS;

  private faseEva!: any;
  private idEvaluacion!: any;
  private expertPos!: any;

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
      this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
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
  }

  async getFaseEva() {
    this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;
      this.getUserProblemas();
      //VERIFICAR EL ESTADO DE LA FASE
      if (this.evaFases.Fase3.state == false) {
        //VERIFICAR EL ESTADO DEL EXPERTO
        if (this.evaFases.Fase3.expertoSt[this.expertPos] == true) {
          this.estadoDeFase('Fase 3');
        }
      } else {
        this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
      }
    });
  }

  getUserProblemas() {
    this.problemas = this.evaFases.Fase3.calificaciones[this.expertPos].problemas;
    console.log(this.problemas);
    this.dataSourceClas = new MatTableDataSource(this.problemas);
  }

  scrollToClasificacion() {
    const element = document.getElementById('clasificacion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  finalizarFase() {

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
          // this.guardarProblemas();
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
