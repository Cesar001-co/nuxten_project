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
// import { EvaluacionInfo } from 'src/app/interfaces/Evaluaciones';



@Component({
  selector: 'nuxten-gestionar-evaluaciones',
  templateUrl: './gestionar-evaluaciones.component.html',
  styleUrls: ['./gestionar-evaluaciones.component.scss']
})
export class GestionarEvaluacionesComponent implements OnInit {

  displayedColumns: string[] = ['Eval', 'Fecha', 'VerUrl', 'Fase', 'action'];
  dataSource!: MatTableDataSource<any>;
  lists: any = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  date = new Date();

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.setEvaluaciones();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setEvaluaciones() {
    this.lists = [
      {
        idEvaluacion: 1,
        nombreSitio: 'Facebook',
        urlVer: 'www.Facebook.com',
        tipoSitio: 'Red social',
        fecha: this.date.toISOString(),
        fase: 'Creada',
        idFaseEva: 1,
        idGrupo: 1
      }
    ];
    this.dataSource = new MatTableDataSource(this.lists);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.expertService.getExpertos().subscribe({
    //   next: (res) => {
    //     this.lists = res
    //     this.dataSource = new MatTableDataSource(this.lists);
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   error: (err) => {
    //     this.errorService.catchError(err.status);
    //     console.log(err);
    //   }
    // })
  }

  crearEvaluacion() {
    const dialog = this.dialog.open(CrearEvaluacionComponent);
    dialog.afterClosed().subscribe({
      next: () => {
        this.setEvaluaciones();
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
        this.deleteEvaluacion()
      }
    });
  }

  deleteEvaluacion() {
    //eliminar evaluacion
    this.toast.success("Evaluación eliminada con exito", "Mensaje de Confirmación");
    this.setEvaluaciones();
  }
}
