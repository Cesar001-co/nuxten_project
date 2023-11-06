import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvaluacionJS } from 'src/app/interfaces/Evaluaciones';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';

@Component({
  selector: 'nuxten-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {

  desicion = false;
  evaFases!: EvaluacionJS;
  numDeExpertos = 0;
  checkedExpertos = 0;


  constructor(
    public dialogRef: MatDialogRef<WaitingComponent>,
    private fasesEvaluacionService: FasesEvaluacionService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    
  }

  ngOnInit() {
    //OBTENER LOS DATOS DE FASE EVALUACION
    this.getFaseEva();
  }

  async getFaseEva() {
    this.fasesEvaluacionService.getFaseEva(this.data.idFaseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;
      //OBTENER EL NUMERO DE EXPERTOS EN LA EVALUACION
      this.numDeExpertos = this.evaFases.Expertos.length;

      //OBTENER EL NUMERO DE EXPERTOS QUE FINALIZARON LA FASE
      switch (this.data.fase) {
        case 'Creada':
          console.log('FASE ', this.data.fase);
          this.checkedExpertos = this.checkedStateExpertos(this.evaFases.Creada.expertoSt);
          break;
        case 'Fase 1':
          this.checkedExpertos = this.checkedStateExpertos(this.evaFases.Fase1.expertoSt);
          console.log('FASE ', this.data.fase);
          break;
        case 'Fase 2':
          console.log('FASE ', this.data.fase);
          break;
        case 'Fase 3':
          console.log('FASE ', this.data.fase);
          break;
        case 'Fase 4':
          console.log('FASE ', this.data.fase);
          break;
      }

      if (this.checkedExpertos == this.numDeExpertos) {
        setTimeout(()=> {this.cerrrar()}, 2500);
      }
    });
  }

  checkedStateExpertos(fase: any): number {
    let cont = 0
    for (let index = 0; index < fase.length; index++) {
      if (fase[index] == true) {
        cont++;
      }
    }
    return cont
  }

  cerrrar() {
    this.dialogRef.close();
  }
}
