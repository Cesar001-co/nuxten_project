import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EvaluacionInfo, EvaluacionJS } from 'src/app/interfaces/Evaluaciones';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { WaitingComponent } from '../../dialog-alerts/waiting/waiting.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';

@Component({
  selector: 'nuxten-creada',
  templateUrl: './creada.component.html',
  styleUrls: ['./creada.component.scss']
})
export class CreadaComponent implements OnInit {

  state!: any;
  private subscription!: Subscription;

  // infoEvaluacion!: EvaluacionInfo;
  evaFases!: EvaluacionJS;
  userData!: ExpertoData;
  submitted = false;

  private faseEva!: any;
  private idEvaluacion!: any;
  private expertPos!: any;

  tiposSitios = [
    'Noticias y revistas',
    'Entretenimiento',
    'Red social',
    'Comercio electrónico',
    'Blog',
    'Personal o portafolio',
    'Educativo',
    'Gubernamental'
  ]

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private fasesService: FasesService,
    private fasesEvaluacionService: FasesEvaluacionService,
    private routeInfo: ActivatedRoute
  ) {
    this.subscription = this.fasesService.state$.subscribe(state => {
      this.state = state;
    });
    if (this.state == true) {
      this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
    }
  }

  infoEvaForm = new FormGroup({
    nombreSitio: new FormControl('', Validators.required),
    urlVer: new FormControl('', Validators.required),
    tipoSitio: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    // OBTENER LOS DATOS ENVIADOS POR EL LINK
    this.faseEva = this.routeInfo.snapshot.paramMap.get('faseEva');
    this.idEvaluacion = this.routeInfo.snapshot.paramMap.get('evaluacion');
    this.expertPos = this.routeInfo.snapshot.paramMap.get('pos');

    this.getFaseEva();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //OBTENER LA INFORMACION DE LA EVALUACION
  async getFaseEva() {
    this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;

      //VERIFICAR EL NUMERO DE EXPERTOS ES MAYOR A 1
      if (this.evaFases.Expertos.length > 1) {
        // VERIFICAR EL ESTADO DEL RESTO DE LOS EXPERTOS
        if (this.expertStates(this.evaFases.Creada.expertoSt) == true) {
          //SE CAMBIAN EL ESTADO DE LOS DEMAS EXPERTOS
          if (this.evaFases.Creada.expertoSt[this.expertPos] == false) {
            this.firstToEnter(this.evaFases);
          }
        } else if (this.evaFases.Creada.expertoSt[this.expertPos] == true) {
          console.log('MOSTRAR VENTANA CAMBIO DE FASE');
          //VERIFICAR SI EL COMPONENTE WATING ESTA ABIERTO
          if (this.dialog.openDialogs.length == 0) {
            this.showWatingWindow(this.evaFases);
          }
        }
      };
    });
  }

  showWatingWindow(evaFases: EvaluacionJS) {
    const dialogAv = this.dialog.open(WaitingComponent, {
      data: { 
        idFaseEva: this.faseEva,
        fase: 'Creada'
      },
      disableClose: true
    });
    dialogAv.afterClosed().subscribe(result => {
      if (result == false && evaFases.Creada.state == false) {
        this.route.navigate(['/NUXTEN_PROJECT/inicio']);
      } else if (evaFases.Creada.state == true) {
        //FASE FINALIZADA
        this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
      }
    });
  }

  expertStates(expertoSt: any): boolean {
    let state = false;
    for (let index = 0; index < expertoSt.length; index++) {
      if (this.expertPos != index) {
        if (expertoSt[index] == false) {
          state = true;
        } else {
          state = false;
        }
      }
    };
    return state
  }

  // METODO PARA CAMBIAR EL ESTADO DE LOS DEMAS EXPERTOS
  // PARA SOLO DEJAR A UN EXPETO EDITAR 
  firstToEnter(evaFases: EvaluacionJS) {
    if (!evaFases.Creada.expertoSt[this.expertPos]) {
      // CAMBIAR EL ESTADO DE LOS DEMAS
      for (let index = 0; index < evaFases.Creada.expertoSt.length; index++) {
        if (this.expertPos != index) {
          evaFases.Creada.expertoSt[index] = true;
        }
      }
      //ACTUALIZAR LA INFORMACION DE LA EVALUACION
      this.fasesEvaluacionService.updateFaseEva(this.faseEva, this.evaFases);
      console.log(evaFases.Creada.expertoSt);
    };
  }

  //CHECKAR EL ESTADO DEL EXPERTO


  // METODO PARA VALIDAR LOS CAMPOS ANTES DE INCIAR LA EVALUACION
  inicarEva() {
    if (this.submitted == true) {
      if (this.infoEvaForm.invalid) {
        let nombreSitiotxtField = document.getElementById('nombreSitio');
        let urlVertxtField = document.getElementById('urlVer');
        let tipoSitiotxtField = document.getElementById('tipoSitio');

        if (this.infoEvaForm.get('nombreSitio')?.invalid) {
          nombreSitiotxtField?.classList.add('error');
        }
        if (this.infoEvaForm.get('urlVer')?.invalid) {
          urlVertxtField?.classList.add('error');
        }
        if (this.infoEvaForm.get('tipoSitio')?.invalid) {
          tipoSitiotxtField?.classList.add('error');
        }
      } else {
        // GENERAR ADVERTENCIA
        const dialogAv = this.dialog.open(AdvertenciaComponent, {
          data: { selected: 8 },
          disableClose: true
        })
        dialogAv.afterClosed().subscribe(result => {
          if (result == true) {
            //VERIFICAR ESTADO DE LA FASE
            this.estadoDeFase();
          }
        });
      }
    } else {
      this.submitted = true;
      this.inicarEva();
    }
  }

  estadoDeFase() {
    //ALERTA DE ESPERAR
    const dialogAv = this.dialog.open(WaitingComponent, {
      disableClose: true
    });
    dialogAv.afterClosed().subscribe(result => {
      if (result == false) {
        //Cancelar
        console.log('Cancelado');
      } else {
        //Go to evaluacion
        console.log('to evaluacion');
      }
    });
    //verifica

    //envia a evaluacion  
    console.log(this.infoEvaForm.value);
  }

  onChange(id: any, form: FormGroup) {
    let textField = document.getElementById(id);
    if (this.submitted == true) {
      if (form.get(id)?.invalid) {
        textField?.classList.add('error');
      } else {
        textField?.classList.remove('error');
      }
    }
  }
}
