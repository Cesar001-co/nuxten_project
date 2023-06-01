import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvaluacionInfo } from 'src/app/interfaces/Evaluaciones';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';

@Component({
  selector: 'nuxten-consultar-evaluacion',
  templateUrl: './consultar-evaluacion.component.html',
  styleUrls: ['./consultar-evaluacion.component.scss']
})
export class ConsultarEvaluacionComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<ConsultarEvaluacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EvaluacionInfo,
    private expertoService: ExpertoService
  ) {

  }

  ngOnInit(): void {
    console.log(this.data);
  }

  getExpertos(expertos: Array<any>) {
    for (let index = 0; index < expertos.length; index++) {
      // this.expertoService.
    }
  }

  eliminar() {
    //eliminar evaluacion
  }

  goBack() {
    this.dialogRef.close();
  }
}
