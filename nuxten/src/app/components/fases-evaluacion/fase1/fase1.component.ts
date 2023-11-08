import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionJS, Problema } from 'src/app/interfaces/Evaluaciones';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { AgregarProblemaComponent } from '../agregar-problema/agregar-problema.component';
import { Principio, listaPrincipios } from '../../../interfaces/Principios';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { Subscription } from 'rxjs';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';

// interface principio {
//   heuristica: string,
//   nombre: string,
//   descripcion: string
// }

@Component({
  selector: 'nuxten-fase1',
  templateUrl: './fase1.component.html',
  styleUrls: ['./fase1.component.scss']
})

export class Fase1Component implements OnInit {

  state!: any;
  private subscription!: Subscription;

  evaFases!: EvaluacionJS;

  private faseEva!: any;
  private idEvaluacion!: any;
  private expertPos!: any;

  dataSource!: MatTableDataSource<Problema>;
  problemas: Problema[] = []
  principios: Principio[] = listaPrincipios;

  displayedColumns: string[] = ['heuristica', 'nombre', 'descripcion'];
  displayedColumnsProblemas: string[] = ['def', 'des', 'principios', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private route: Router,
    private fasesService: FasesService,
    private routeInfo: ActivatedRoute,
    private fasesEvaluacionService: FasesEvaluacionService
  ) {
    this.subscription = this.fasesService.state$.subscribe(state => {
      this.state = state;
    });
    if (this.state == true) {
      this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
    }
  }

  ngOnInit(): void {
    // OBTENER LOS DATOS ENVIADOS POR EL LINK
    this.faseEva = this.routeInfo.snapshot.paramMap.get('faseEva');
    this.idEvaluacion = this.routeInfo.snapshot.paramMap.get('evaluacion');
    this.expertPos = this.routeInfo.snapshot.paramMap.get('pos');

    this.getFaseEva();
  }

  ngOnDestroy() {
    //GUARDAR DATOS PROBLEMAS DE LA EVALUACION DEL EVALUADOR
    this.subscription.unsubscribe();
  }

  //OBTENER LA INFORMACION DE LA EVALUACION
  async getFaseEva() {
    this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;

      console.log(this.evaFases)
      //VERIFICAR EL ESTADO DE LA FASE
      if (this.evaFases.Fase1.state == false) {
        //ENVIAR LOS PROBLEMAS QUE ESTEN REGISTRADOS
        this.getUserProblemas();
      } else {
        this.goBack();
      }
    });
  }

  getUserProblemas() {
    const a = [
      [
        {
          defProb: '1',
          expProb: '2',
          principios: ['H1']
        },
        {
          defProb: '1',
          expProb: '2',
          principios: ['H1']
        }
      ],
      [],
      []
    ];
    console.log(a);
    // console.log(this.evaFases.Fase1.problemas[this.expertPos].problemas);
    // this.problemas = this.evaFases.Fase1.problemas[this.expertPos];
    // this.evaFases.Fase1.problemas[this.expertPos] = [
    //   {
    //     defProb: '1',
    //     expProb: '2',
    //     principios: ['H1']
    //   }
    // ]
    // console.log(this.evaFases.Fase1.problemas[this.expertPos].length)
    this.dataSource = new MatTableDataSource(this.problemas);
  }

  //AGREGAR UN PROBLEMA A LA LISTA DE PROBLEMAS  
  agregarProblema() {
    const dialogPr = this.dialog.open(AgregarProblemaComponent, {
      disableClose: true
    });
    dialogPr.afterClosed().subscribe(problema => {
      if (problema) {
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

  goBack() {
    this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
  }

}
