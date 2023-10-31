import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EvaluacionInfo } from 'src/app/interfaces/Evaluaciones';
import { ExpertInFo } from 'src/app/interfaces/Experto';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'nuxten-consultar-evaluacion',
  templateUrl: './consultar-evaluacion.component.html',
  styleUrls: ['./consultar-evaluacion.component.scss']
})
export class ConsultarEvaluacionComponent implements OnInit {

  displayedColumns: string[] = ['expeto', 'id', 'correo', 'numero'];
  dataSource: ExpertInFo[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConsultarEvaluacionComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private expertoService: ExpertoService,
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.setExpertos(this.data.idGrupo);
  }

  changeDataFormat() {
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
    const fechaCreacion = new Date(this.data.fechaCreacion)
    this.data.fechaCreacion = fechaCreacion.toLocaleString('es-ES', opcionesFechaHora);
  }

  setExpertos(idGrupo: number) {
    //consular expertos by idGRupo
    this.dataSource = [
      {
        idUser: 1002963019,
        nombres: 'Cesar',
        apellidos: 'Rodriguez',
        numero: '3112426884',
        email: 'crodriguez@unimayor.edu.co',
      },
      {
        idUser: 27187443,
        nombres: 'Leider',
        apellidos: 'Sebastian',
        numero: '3112426884',
        email: 'lshernandez@unimayor.edu.co',
      },
      {
        idUser: 27187443,
        nombres: 'Leider',
        apellidos: 'Sebastian',
        numero: '3112426884',
        email: 'lshernandez@unimayor.edu.co',
      }
    ]
  }

  eliminar() {
    const dialogAv = this.dialog.open(AdvertenciaComponent, {
      data: { selected: 7, name: this.data.idEvaluacion },
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
    this.goBack();
  }

  goBack() {
    this.dialogRef.close();
  }
}
