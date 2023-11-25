import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionJS, Problema, ProblemaInfo } from 'src/app/interfaces/Evaluaciones';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { AgregarProblemaComponent } from '../agregar-problema/agregar-problema.component';
import { Principio } from '../../../interfaces/Principios';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { Subscription } from 'rxjs';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';
import { WaitingComponent } from '../../dialog-alerts/waiting/waiting.component';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { HeuristicasService } from 'src/app/services/gestionar-fases/heuristicas.service';

@Component({
  selector: 'nuxten-fase1',
  templateUrl: './fase1.component.html',
  styleUrls: ['./fase1.component.scss']
})

export class Fase1Component implements OnInit {

  state!: any;
  private subscription!: Subscription;
  private subscriptionEvafases!: Subscription;

  evaFases!: EvaluacionJS;

  private faseEva!: any;
  private idEvaluacion!: any;
  private expertPos!: any;

  dataSource!: MatTableDataSource<Problema>;
  problemas: Problema[] = []
  principiosDataSource!: MatTableDataSource<Principio>;
  principios: Principio[] = [];

  displayedColumns: string[] = ['heuristica', 'nombre', 'descripcion'];
  displayedColumnsProblemas: string[] = ['prob','def', 'des', 'principios', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private route: Router,
    private fasesService: FasesService,
    private routeInfo: ActivatedRoute,
    private fasesEvaluacionService: FasesEvaluacionService,
    private evaluacionService: EvaluacionService,
    private heuristicasService: HeuristicasService
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

  ngOnInit(): void {
    this.getHeuristicas();
    this.getFaseEva();
    try {
      this.getUserProblemas();
    } catch (error) { }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvafases.unsubscribe();
  }

  //OBTENER LA INFORMACION DE LAS HEURISTICAS
  getHeuristicas() {
    this.heuristicasService.getAllHeuristicas().subscribe((heuristica: any) => {
      for (const heuristicas of heuristica) {
        this.principios.push({
          heuristica: heuristicas.codigoHeuristica,
          nombre: heuristicas.nombreHeuristica,
          descripcion: heuristicas.descripcionHeuristica
        });
      }
      this.principiosDataSource = new MatTableDataSource(this.principios);
    });
  }

  //OBTENER LA INFORMACION DE LA EVALUACION
  async getFaseEva() {
    this.subscriptionEvafases = this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;
      this.getUserProblemas();
      //VERIFICAR EL ESTADO DE LA FASE
      if (this.evaFases.Fase1.state == false) {
        //VERIFICAR EL ESTADO DEL EXPERTO
        if (this.evaFases.Fase1.expertoSt[this.expertPos] == true) {
          this.estadoDeFase('Fase 1');
        }

      } else {
        this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
      }
    });
  }

  getUserProblemas() {
    this.problemas = this.evaFases.Fase1.problemas[this.expertPos].listaProb;
    this.dataSource = new MatTableDataSource(this.problemas);
  }

  //GUARDAR DATOS
  guardarProblemas() {
    this.evaFases.Fase1.problemas[this.expertPos].listaProb = this.problemas
    return this.fasesEvaluacionService.updateFaseEva(this.faseEva, this.evaFases)
  }

  //AGREGAR UN PROBLEMA A LA LISTA DE PROBLEMAS  
  agregarProblema() {
    const dialogPr = this.dialog.open(AgregarProblemaComponent, {
      disableClose: true
    });
    dialogPr.afterClosed().subscribe(problema => {
      if (problema) {
        console.log(problema);
        this.problemas.push(problema);
        this.dataSource = new MatTableDataSource(this.problemas);
      }
    });
  }

  //ELIMINAR EL PROBLEMA DE LA LISTA DE PROBLEMAS
  deleteProblema(problema: Problema) {
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 9, name: problema.defProb },
      disableClose: true
    })
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        this.toast.success("Problema eliminado con exito", "Mensaje de Confirmación");
        this.problemas = this.problemas.filter(problemas => problemas != problema);
        this.dataSource = new MatTableDataSource(this.problemas);
      }
    })
  }

  //FINALIZAR FASE
  finalizarFase() {
    if (this.problemas.length > 0) {
      // GENERAR ADVERTENCIA
      const dialogAv = this.dialog.open(AdvertenciaComponent, {
        data: { selected: 8 },
        disableClose: true
      });
      dialogAv.afterClosed().subscribe(result => {
        if (result == true) {
          this.evaFases.Fase1.expertoSt[this.expertPos] = true;
          //VERIFICAR SI ES EL ULTIMO 
          if (this.fasesEvaluacionService.expertosCount(this.evaFases.Fase1.expertoSt) == this.evaFases.Expertos.length) {
            //ULTIMO: ACTUALIZA TODA LA FASE
            this.evaFases.Fase1.state = true;
            this.evaFases.Fase1.problemas[this.expertPos].listaProb = this.problemas;
            //ALMACENAR LOS PROBLEMAS DE TODOS LOS EXPERTOS EN LA LISTAS
            const problemas: ProblemaInfo [] = []
            for (let i = 0; i < this.evaFases.Fase1.problemas.length; i++) {
              for (let j = 0; j < this.evaFases.Fase1.problemas[i].listaProb.length; j++) {
                problemas.push({
                  selected: false,
                  defProb: this.evaFases.Fase1.problemas[i].listaProb[j].defProb,
                  expProb: this.evaFases.Fase1.problemas[i].listaProb[j].expProb,
                  principios: this.evaFases.Fase1.problemas[i].listaProb[j].principios,
                  idEvid: null,
                  nombreArchivo: null,
                  solucion: ''
                })
              }
            }
            this.evaFases.listaProblemas = problemas;
            this.fasesEvaluacionService.updateFaseEva(this.faseEva, this.evaFases).then(() => {
              const infoFaseEvaluacion = {
                idEvaluacion: this.idEvaluacion,
                fase: 'Fase 2'
              };
              this.estadoDeFase('Fase 1');
              //UPDATE CAMPO FASE EVALUACION
              this.evaluacionService.updateFaseEvaluacion(infoFaseEvaluacion).subscribe({
                next: () => {
                  this.toast.success("Fase 1 finalizada", "Mensaje de Confirmación");
                }
              });
            })
          } else {
            //NO ULTIMO: GUARDA LOS PROBLEMAS Y ACTUALIZA SU ESTADO
            //UPDATE INFO EN FIREBASE
            this.guardarProblemas().then(() => {
              this.estadoDeFase('Fase 1');
            });
          }
        }
      });
    } else {
      this.toast.warning("Debe agregar por lo menos un problema", "Mensaje de Advertencia");
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
        console.log(result);
        if (result == false) {
          this.evaFases.Fase1.expertoSt[this.expertPos] = false;
          this.guardarProblemas();
        } else {
          this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
        }
      });
    }
  }

  goBack() {
    this.guardarProblemas();
    this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
  }

}
