import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Problema } from 'src/app/interfaces/Evaluaciones';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { AgregarProblemaComponent } from '../agregar-problema/agregar-problema.component';
import { Principio, listaPrincipios } from '../../../interfaces/Principios';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { Subscription } from 'rxjs';

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

  dataSource!: MatTableDataSource<Problema>;
  problemas: Problema[] = [
    {
      defProb: '11111111111111111111111111111111111111111111111111111111111111111111111',
      expProb: '11111111111111111111111111111111111111111111111111111111111111111111111',
      principios: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10']
    }
  ]
  principios: Principio [] = listaPrincipios;

  displayedColumns: string[] = ['heuristica', 'nombre', 'descripcion'];
  displayedColumnsProblemas: string[] = ['def', 'des', 'principios', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private route: Router,
    private fasesService: FasesService
  ) {
    this.subscription = this.fasesService.state$.subscribe(state => {
      this.state = state;
    });
    if (this.state == true) {
      this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
    }
  }

  ngOnInit(): void {
    this.getUserProblemas();
    this.dataSource = new MatTableDataSource(this.problemas);
    // console.log('userId: ', this.routeInfo.snapshot.paramMap.get('id'));
    // console.log('evaluacion: ', this.routeInfo.snapshot.paramMap.get('evaluacion'));
  }

  ngOnDestroy() {
    //GUARDAR DATOS PROBLEMAS DE LA EVALUACION DEL EVALUADOR
    this.subscription.unsubscribe();
  }

  getUserProblemas() {
    //VERIFICA SI EL USUARIO HA AGREGADO PROBLEMAS EN EL EVALUACION
    
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
