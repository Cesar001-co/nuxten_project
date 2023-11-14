import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { ErrorCatchService } from 'src/app/services/errors/error-catch.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';

@Component({
  selector: 'nuxten-consultar-evaluacion',
  templateUrl: './consultar-evaluacion.component.html',
  styleUrls: ['./consultar-evaluacion.component.scss']
})
export class ConsultarEvaluacionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'expeto', 'num', 'correo'];
  dataSource: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConsultarEvaluacionComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private evaluacionService: EvaluacionService,
    private toast: ToastrService,
    private errorService: ErrorCatchService,
    private fasesEvaService: FasesEvaluacionService
  ) {

  }

  ngOnInit(): void {
    this.getExpertos(this.data.idEvaluacion);
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

  //CONSULTAR A LOS EXPERTOS DE LA EVALUACION MEDIANTE EL ID EVALUACION
  getExpertos(idEvaluacion: number) {
    this.evaluacionService.getUsuariosByEvaluacion(idEvaluacion).subscribe( (expertos: any) => {
      this.dataSource = expertos;
      console.log(this.dataSource);
      
    })
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

  //ELIMINAR EVALUACION
  deleteEvaluacion() {
    const idFaseEva = this.data.idFaEva;
    this.evaluacionService.deleteEvaluacion(this.data.idEvaluacion).subscribe({
      // next: () => {
      //   //ELIMINAR LA INFORMACION DE LA EVALUACION DE FIREBASE
      //   this.fasesEvaService.deleteFaseEva(idFaseEva).then(()=>{
      //     this.toast.success("Evaluación eliminada con exito", "Mensaje de Confirmación");
      //     this.goBack();
      //   });
      // },
      // error: (err) => {
      //   this.errorService.catchError(err.status);
      //   console.log(err);
      // }
      error: (err) => {
        //ELIMINAR LA INFORMACION DE LA EVALUACION DE FIREBASE
        this.fasesEvaService.deleteFaseEva(idFaseEva).then(()=>{
          this.toast.success("Evaluación eliminada con exito", "Mensaje de Confirmación");
          this.goBack();
        });
      }
    });
  }

  goBack() {
    this.dialogRef.close();
  }

  numeroContacto(numeroContacto: any) {
    return `(${numeroContacto.slice(0, 3)})-${numeroContacto.slice(3, 6)}-${numeroContacto.slice(6)}`
  }
}
