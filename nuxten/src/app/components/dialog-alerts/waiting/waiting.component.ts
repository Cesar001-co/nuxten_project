import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  buttonMes = '';

  private subscriptionEvafases!: Subscription;
  
  constructor(
    public dialogRef: MatDialogRef<WaitingComponent>,
    private fasesEvaluacionService: FasesEvaluacionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: Router
  ) {
    
  }

  ngOnInit() {
    //OBTENER LOS DATOS DE FASE EVALUACION
    this.getFaseEva();

    // VERFICAR MENSAJE BOTON
    switch (this.data.botton) {
      case 0:
        this.buttonMes = 'Regresar Inicio';
        break;
      default:
        this.buttonMes = 'Cancelar';
        break;
    }
  }

  ngOnDestroy() {
    this.subscriptionEvafases.unsubscribe();
  }

  async getFaseEva() {
    this.subscriptionEvafases = this.fasesEvaluacionService.getFaseEva(this.data.idFaseEva).subscribe((fasesEva: any) => {
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
          this.checkedExpertos = this.checkedStateExpertos(this.evaFases.Fase2.expertoSt);
          console.log('FASE ', this.data.fase);
          break;
        case 'Fase 3':
          this.checkedExpertos = this.checkedStateExpertos(this.evaFases.Fase3.expertoSt);
          console.log('FASE ', this.data.fase);
          break;
        case 'Fase 4':
          this.checkedExpertos = this.checkedStateExpertos(this.evaFases.Fase4.expertoSt);
          console.log('FASE ', this.data.fase);
          break;
      }

      if (this.checkedExpertos == this.numDeExpertos) {
        setTimeout(()=> {
          this.cerrrar();
        }, 2000);

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
