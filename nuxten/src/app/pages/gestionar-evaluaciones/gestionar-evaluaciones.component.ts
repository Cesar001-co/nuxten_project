import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdvertenciaComponent } from 'src/app/components/dialog-alerts/advertencia/advertencia.component';
import { ConsultarEvaluacionComponent } from 'src/app/components/gestionar-evaluaciones/consultar-evaluacion/consultar-evaluacion.component';
import { CrearEvaluacionComponent } from 'src/app/components/gestionar-evaluaciones/crear-evaluacion/crear-evaluacion.component';
import { EvaluacionInfo } from 'src/app/interfaces/Evaluaciones';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';



@Component({
  selector: 'nuxten-gestionar-evaluaciones',
  templateUrl: './gestionar-evaluaciones.component.html',
  styleUrls: ['./gestionar-evaluaciones.component.scss']
})
export class GestionarEvaluacionesComponent implements OnInit {

  displayedColumns: string[] = ['Eval', 'Fecha', 'VerUrl', 'Fase', 'action'];
  dataSource!: MatTableDataSource<any>;
  listaEvaluaciones: EvaluacionInfo[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  date = new Date();

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private errorService: ErrorCatchService,
    private evaluacionService: EvaluacionService,
    private fasesEvaService: FasesEvaluacionService
  ) {
    this.setEvaluaciones();
  }

  ngOnInit(): void {
    this.setEvaluaciones();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // CONSULTAR & ENVIAR EVALUACIONES A LA TABLA
  setEvaluaciones() {
    this.evaluacionService.getAllEvaluaciones().subscribe({
      next: (evaluaciones) => {
        this.listaEvaluaciones = evaluaciones;
        if (this.listaEvaluaciones.length != 0) {
          //CAMBIAR EL FORMATO DE LA FECHA DE CREACION
          const opcionesFechaHora: any = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          };
          this.listaEvaluaciones.map((evaluacion: any) => {
            const fechaCreacion = new Date(evaluacion.fechaCreacion)
            evaluacion.fechaCreacion = fechaCreacion.toLocaleString('es-ES', opcionesFechaHora);
          });

          this.dataSource = new MatTableDataSource(this.listaEvaluaciones);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (err) => {
        this.errorService.catchError(err.status);
        console.log(err);
      }
    })
  }

  crearEvaluacion() {
    const dialog = this.dialog.open(CrearEvaluacionComponent);
    dialog.afterClosed().subscribe({
      next: () => {
        this.setEvaluaciones();
      },
      error: (err) => {
        this.errorService.catchError(err.status);
        console.log(err);
      }
    })
  }

  consultarEvaluacion(evaInfo: any) {
    const dialog = this.dialog.open(ConsultarEvaluacionComponent, {
      data: evaInfo
    });
    dialog.afterClosed().subscribe({
      next: () => {
        this.setEvaluaciones();
      }
    })
  }

  eliminar(EvData: EvaluacionInfo) {
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 7, name: EvData.idEvaluacion },
      disableClose: true
    })
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteEvaluacion(EvData);
      }
    });
  }

  //ELIMINAR EVALUACION
  deleteEvaluacion(EvData: EvaluacionInfo) {
    this.evaluacionService.deleteEvaluacion(EvData.idEvaluacion).subscribe({
      error: (err) => {
        //ELIMINAR LA INFORMACION DE LA EVALUACION DE FIREBASE
        this.fasesEvaService.deleteFaseEva(EvData.idFaEva).then(() => {
          this.toast.success("Evaluación eliminada con exito", "Mensaje de Confirmación");
          this.setEvaluaciones();
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
