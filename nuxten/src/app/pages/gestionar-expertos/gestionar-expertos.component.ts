import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AdvertenciaComponent } from 'src/app/components/dialog-alerts/advertencia/advertencia.component';
import { AgregarExpertoComponent } from 'src/app/components/gestionar-expertos/agregar-experto/agregar-experto.component';
import { ModificarExpertoComponent } from 'src/app/components/gestionar-expertos/modificar-experto/modificar-experto.component';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';

@Component({
  selector: 'nuxten-gestionar-expertos',
  templateUrl: './gestionar-expertos.component.html',
  styleUrls: ['./gestionar-expertos.component.scss']
})
export class GestionarExpertosComponent implements OnInit {

  displayedColumns: string[] = ['Identificación', 'Nombres', 'Correo', 'Evaluación', 'action'];
  dataSource!: MatTableDataSource<any>;
  lists: any = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sortedData: any[] = [];

  constructor(
    private dialog: MatDialog,
    private expertService: ExpertoService,
    private errorService: ErrorCatchService,
    private toast: ToastrService
  ) {
    this.setExpertos();
  }
  ngOnInit(): void {
    this.setExpertos();
  }

  setExpertos() {
    this.expertService.getExpertos().subscribe({
      next: (res) => {
        this.lists = res
        this.dataSource = new MatTableDataSource(this.lists);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.errorService.catchError(err.status);
        console.log(err);
      }
    })
  }

  agregarExperto() {
    const dialog = this.dialog.open(AgregarExpertoComponent);
    dialog.afterClosed().subscribe({
      next: () => {
        this.setExpertos();
      }
    })
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

  modifyExperto(expInfo: any) {
    const dialog = this.dialog.open(ModificarExpertoComponent, {
      data: expInfo
    });
    dialog.afterClosed().subscribe({
      next: () => {
        this.setExpertos();
      }
    })
  }

  //ELIMINAR EXPERTO
  deleteExperto(experto: any, nombre: string) {
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 1, name: nombre },
      disableClose: true
    })
    dialogAv.afterClosed().subscribe(result => {
      if (result == true) {
        //DETECTA SI EL EXPERTO SE ENCUENTRA O NO EN UNA EVALUACION
        if (experto.idEvaluacion == null) {
          this.expertService.deleteExperto(experto.idUser).subscribe({
            next: () => {
              this.toast.success("Experto eliminado con exito", "Mensaje de Confirmación");
              this.setExpertos();
            },
            error: (err) => {
              this.errorService.catchError(err.status);
              console.log(err);
            }
          });
        } else {
          this.toast.error("El experto se encuentra esta en la Evaluacion "+experto.idEvaluacion+"", "Mensaje de Informacion");
        }
      }
    })
  }
}
