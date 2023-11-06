import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EvaluacionInfo, EvaluacionJS } from 'src/app/interfaces/Evaluaciones';
import { ExpertInFo, ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';

@Component({
  selector: 'nuxten-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {

  public navigateSubs!: Subscription;
  state: boolean = true;
  userData!: ExpertoData;
  evaFases!: EvaluacionJS;
  infoEvaluacion!: EvaluacionInfo;

  displayedColumns: string[] = ['expeto', 'id', 'correo'];
  dataSource: any[] = [];

  constructor(
    private route: Router,
    private userService: UserService,
    private evaluacionService: EvaluacionService,
    private fasesService: FasesService,
    private fasesEvaService: FasesEvaluacionService
  ) {
    this.emitir();
  }

  emitir() {
    // console.log(this.state)
    this.fasesService.emitirFase(this.state);
  }

  ngOnInit(): void {
    // OBTENER LOS DATOS DEL USUARIO DE LA COOKIE
    this.userData = this.userService.getUserData();

    //VERIFICA SI EL USUARIO ESTA EN UNA EVALUACION
    if (this.userData.idEvaluacion != null) {

      // OBTENER LOS DATOS DE LA EVALUACION
      this.getEvaluacion(this.userData.idEvaluacion);

      // REDIRECCIONAR SI EL ESTADO DE LA EVALUACION ES CREADA
      this.navigateSubs = this.route.events.pipe(
        filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event) => {
        if (event['url'] == '/NUXTEN_PROJECT/evaluacion') {
          if (this.evaFases.Creada.state == false) {
            this.route.navigate(['NUXTEN_PROJECT/evaluacion/Datos-evaluacion', this.infoEvaluacion.idFaEva, this.userData.idEvaluacion, this.getPos()]);
          } else if (this.state == false) {
            this.state = !this.state;
          }
        }
      });
    } else {
      this.state = false;
    }
  }

  ngOnDestroy() {
    this.navigateSubs?.unsubscribe();
  }

  //RETORNA LA FECHA EN 
  setDate(fecha: any) {
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
    const fechaCreacion = new Date(fecha);
    return fechaCreacion.toLocaleString('es-ES', opcionesFechaHora);
  }

  //OBTENER LA INFORMACION DE LA EVALUACION
  getEvaluacion(idEvaluacion: number) {
    this.evaluacionService.getEvaluacion(idEvaluacion).subscribe((evaluacion: EvaluacionInfo) => {
      this.infoEvaluacion = evaluacion;
      // OBTENER LOS EXPERTOS DE LA EVALUACION
      this.getExpertos(idEvaluacion);

      // OBTENER LA INFORMACION DE LAS FASES
      this.getEvaFases(this.infoEvaluacion.idFaEva);
    });
  }

  //CONSULTAR A LOS EXPERTOS DE LA EVALUACION MEDIANTE EL ID EVALUACION
  getExpertos(idEvaluacion: number) {
    this.evaluacionService.getUsuariosByEvaluacion(idEvaluacion).subscribe((expertos: any) => {
      this.dataSource = expertos;
    })
  }

  getPos(): any {
    for (let index = 0; index < this.evaFases.Expertos.length; index++) {
      if (this.evaFases.Expertos[index] == this.userData.idUser) {
        return index
      }
    }
  }

  //OBTENER LA INFORMACION DE LAS FASES DE LA EVALUACION
  getEvaFases(idFaseEva: any) {
    this.fasesEvaService.getFaseEva(idFaseEva).subscribe((faseEva: any) => {
      this.evaFases = faseEva;
      // console.log(this.evaFases);
      this.redirecTo(this.evaFases.Creada.state);
    });
  }

  redirecTo(state: boolean) {
    //VERIFICA QUE LA FASE ACTUAL SEA CREADA
    if (!state) {
      this.route.navigate(['NUXTEN_PROJECT/evaluacion/Datos-evaluacion', this.infoEvaluacion.idFaEva, this.userData.idEvaluacion, this.getPos()]);
      this.state = !this.state;
      this.emitir();
    }
  }

  goToFase(fase: number) {
    switch (fase) {
      case 1:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-1', this.userData.idUser, this.userData.idEvaluacion, this.getPos()]);
        break;
      case 2:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-2', this.userData.idUser, this.userData.idEvaluacion, this.getPos()]);
        break;
      case 3:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-3']);
        break;
      case 4:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-4']);
        break;
    }
  }
}
