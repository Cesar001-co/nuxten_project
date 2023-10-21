import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EvaluacionInfo } from 'src/app/interfaces/Evaluaciones';
import { AdvertenciaComponent } from '../../dialog-alerts/advertencia/advertencia.component';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { WaitingComponent } from '../../dialog-alerts/waiting/waiting.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';

@Component({
  selector: 'nuxten-creada',
  templateUrl: './creada.component.html',
  styleUrls: ['./creada.component.scss']
})
export class CreadaComponent {

  state!: any;
  private subscription!: Subscription;

  infoEvaluacion!: EvaluacionInfo;
  userData!: ExpertoData;
  submitted = false;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private route: Router,
    private fasesService: FasesService
  ) {
    this.subscription = this.fasesService.state$.subscribe(state => {
      this.state = state;
    });
    if (this.state == true) {
      this.route.navigate(['/NUXTEN_PROJECT/evaluacion']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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

  infoEvaForm = new FormGroup({
    nombreSitio: new FormControl('', Validators.required),
    urlVer: new FormControl('', Validators.required),
    tipoSitio: new FormControl('', Validators.required)
  });

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

  //
  estadoDeFase() {
    //esperando alert
    const dialogAv = this.dialog.open(WaitingComponent, {
      disableClose: true
    })
    dialogAv.afterClosed().subscribe(result => {
      if (result == false ) {
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
