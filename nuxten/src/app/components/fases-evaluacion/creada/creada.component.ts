import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EvaluacionJS } from 'src/app/interfaces/Evaluaciones';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { WaitingComponent } from '../../dialog-alerts/waiting/waiting.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { TipoSitiosService } from 'src/app/services/gestionar-fases/tipo-sitios.service';

@Component({
  selector: 'nuxten-creada',
  templateUrl: './creada.component.html',
  styleUrls: ['./creada.component.scss']
})
export class CreadaComponent implements OnInit {

  state!: any;
  private subscription!: Subscription;
  private subscriptionEvafases!: Subscription;

  evaFases!: EvaluacionJS;
  userData!: ExpertoData;
  submitted = false;

  private faseEva!: any;
  private idEvaluacion!: any;
  private expertPos!: any;

  tiposSitios: any [] = [];

  constructor(
    private dialog: MatDialog,
    private route: Router,
    private fasesService: FasesService,
    private fasesEvaluacionService: FasesEvaluacionService,
    private routeInfo: ActivatedRoute,
    private evaluacionService: EvaluacionService,
    private tipoSitiosService: TipoSitiosService
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
    this.getTipoSitios();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionEvafases.unsubscribe();
  }

  //OBTENER LOS TIPOS SITOS
  getTipoSitios() {
    this.tipoSitiosService.getAllTipoSitios().subscribe( (tipos: any) => {
      this.tiposSitios = tipos.map( (tipos:any) => tipos.tipoSitio);      
    })
  }

  //OBTENER LA INFORMACION DE LA EVALUACION
  async getFaseEva() {
    this.subscriptionEvafases = this.fasesEvaluacionService.getFaseEva(this.faseEva).subscribe((fasesEva: any) => {
      this.evaFases = fasesEva;

      //verificar estado de la evaluacion
      if (this.evaFases.Creada.state == false) {
        //VERIFICAR EL NUMERO DE EXPERTOS ES MAYOR A 1
        if (this.evaFases.Expertos.length > 1) {
          // VERIFICAR EL ESTADO DEL RESTO DE LOS EXPERTOS
          if (this.expertStates(this.evaFases.Creada.expertoSt) == true) {
            //SE CAMBIAN EL ESTADO DE LOS DEMAS EXPERTOS
            if (this.evaFases.Creada.expertoSt[this.expertPos] == false) {
              this.firstToEnter(this.evaFases);
            }
          } else if (this.evaFases.Creada.expertoSt[this.expertPos] == true) {
            //VERIFICAR SI EL COMPONENTE WATING ESTA ABIERTO
            if (this.dialog.openDialogs.length == 0) {
              this.showWatingWindow(this.evaFases);
            }
          }
        };
      } else {
        this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
      }
    });
  }

  showWatingWindow(evaFases: EvaluacionJS) {
    const dialogAv = this.dialog.open(WaitingComponent, {
      data: {
        idFaseEva: this.faseEva,
        fase: 'Creada',
        botton: 0
      },
      disableClose: true
    });
    dialogAv.afterClosed().subscribe(result => {
      if (result == false && evaFases.Creada.state == false) {
        this.route.navigate(['/NUXTEN_PROJECT/inicio']);
      } else if (evaFases.Creada.state == true) {
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
      // console.log(evaFases.Creada.expertoSt);
    };
  }

  // METODO PARA VALIDAR LOS CAMPOS ANTES DE INCIAR LA EVALUACION
  iniciarEvaluacion() {
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
            //MODIFICAR LA EVALUACION PARA FINALIZAR FASE
            const infoEvaluacion = {
              idEvaluacion: this.idEvaluacion,
              nombreSitio: this.infoEvaForm.get('nombreSitio')?.value,
              urlSitio: this.infoEvaForm.get('urlVer')?.value,
              tipoSitio: this.infoEvaForm.get('tipoSitio')?.value
            }
            console.log(infoEvaluacion);
            this.evaluacionService.updateInfoEvaluacion(infoEvaluacion).subscribe({
              next: () => {
                this.evaFases.Creada.expertoSt[this.expertPos] = true;
                this.evaFases.Creada.state = true;
                //UPDATE INFO EN FIREBASE
                this.fasesEvaluacionService.updateFaseEva(this.faseEva, this.evaFases).then(() => {
                  const infoFaseEvaluacion = {
                    idEvaluacion: this.idEvaluacion,
                    fase: 'Fase 1'
                  }
                  //UPDATE CAMPO FASE EVALUACION
                  this.evaluacionService.updateFaseEvaluacion(infoFaseEvaluacion).subscribe({
                    next: () => {
                      //VERIFICAR ESTADO DE LA FASE
                      this.estadoDeFase();
                    }
                  });
                });
                console.log(this.evaFases.Creada);
              }
            });
          }
        });
      }
    } else {
      this.submitted = true;
      this.iniciarEvaluacion();
    }
  }

  estadoDeFase() {
    //ALERTA DE ESPERAR
    const dialogAv = this.dialog.open(WaitingComponent, {
      data: {
        idFaseEva: this.faseEva,
        fase: 'Creada'
      },
      disableClose: true
    });
    dialogAv.afterClosed().subscribe(result => {
      if (result == false) {
        //Cancelar
        console.log('Cancelado');
      } else {
        //Go to evaluacion
        this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
      }
    });
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
