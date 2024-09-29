import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EvaluacionInfo, EvaluacionJS } from 'src/app/interfaces/Evaluaciones';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';
import { FasesService } from 'src/app/services/gestionar-evaluaciones/fases.service';
import { ExpertoService } from 'src/app/services/gestionar-experto/experto.service';
import { FasesEvaluacionService } from 'src/app/services/gestionar-fases/fases-evaluacion.service';

@Component({
  selector: 'nuxten-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {

  public navigateSubs!: Subscription;
  private subscriptionEvafases!: Subscription;

  state: boolean = true;
  userData!: ExpertoData;
  evaFases!: EvaluacionJS;
  infoEvaluacion: EvaluacionInfo = {
    idEvaluacion: 0,
    nombreSitio: '',
    urlSitio: '',
    tipoSitio: '',
    fechaCreacion: null,
    fase: 'Creada',
    idFaEva: '',
    idGrupo: 0
  };

  displayedColumns: string[] = ['expeto', 'num', 'correo'];
  dataSource: any[] = [];

  constructor(
    private route: Router,
    private userService: UserService,
    private evaluacionService: EvaluacionService,
    private fasesService: FasesService,
    private fasesEvaService: FasesEvaluacionService,
    private expertoService: ExpertoService
  ) {
    this.emitir();
  }

  emitir() {
    this.fasesService.emitirFase(this.state);
  }

  ngOnInit(): void {
    // OBTENER LOS DATOS DEL USUARIO DE LA COOKIE
    this.userService.getUserData().subscribe((userData: ExpertoData) => {
      this.userData = userData;
      
      this.expertoService.getExpertoIdEvaluacion(userData.idUser).subscribe((evaluacion: any) => {
        //VERIFICA SI EL USUARIO ESTA EN UNA EVALUACION
        if (evaluacion != null) {
          // OBTENER LOS DATOS DE LA EVALUACION
          this.getEvaluacion(evaluacion);
        } else {
          this.state = false;
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.subscriptionEvafases!) {
      this.navigateSubs.unsubscribe();
      this.subscriptionEvafases.unsubscribe();
    }
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
    this.subscriptionEvafases = this.fasesEvaService.getFaseEva(idFaseEva).subscribe((faseEva: any) => {
      this.evaFases = faseEva;

      // RECARGAR LA PAGINA EN CASO DE CAMBIOS DE FASE
      this.navigateSubs = this.route.events.pipe(
        filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event) => {
        if (event['url'] == '/nuxten/evaluacion') {
          // REDIRECCIONAR SI EL ESTADO DE LA EVALUACION ES CREADA
          try {
            if (this.evaFases.Creada.state == false) {
              this.route.navigate(['nuxten/evaluacion/Datos-evaluacion', this.infoEvaluacion.idFaEva, this.infoEvaluacion.idEvaluacion, this.getPos()]);
            } else if (this.state == false) {
              this.state = !this.state;
            }

            if (this.evaFases.Creada.state == true && this.infoEvaluacion.fase == 'Creada') {
              this.expertoService.getExpertoIdEvaluacion(this.userData.idUser).subscribe((idEvaluacion: any) => {
                // OBTENER LOS DATOS DE LA EVALUACION
                this.evaluacionService.getEvaluacion(idEvaluacion).subscribe((evaluacion: EvaluacionInfo) => {
                  this.infoEvaluacion = evaluacion;
                  this.infoEvaluacion.fase = 'Fase 1';
                });
              });
              this.infoEvaluacion.fase = 'Fase 1';
            } else if (this.evaFases.Fase1.state == true && this.infoEvaluacion.fase == 'Fase 1') {
              this.infoEvaluacion.fase = 'Fase 2';
            } else if (this.evaFases.Fase2.state == true && this.infoEvaluacion.fase == 'Fase 2') {
              this.infoEvaluacion.fase = 'Fase 3';
            } else if (this.evaFases.Fase3.state == true && this.infoEvaluacion.fase == 'Fase 3') {
              this.infoEvaluacion.fase = 'Fase 4';
            } else if (this.evaFases.Fase4.state == true) {
              this.evaFases = null;
              this.route.navigate(['nuxten/lista-de-evaluaciones']);
            }
          } catch (error) {
            console.log('Error: No existe evaluación');
          }
        } else {
          this.state = false
        }
      });
      this.redirecTo(this.evaFases.Creada.state);
    });
  }

  redirecTo(state: boolean) {
    //VERIFICA QUE LA FASE ACTUAL SEA CREADA
    if (!state) {
      this.route.navigate(['nuxten/evaluacion/Datos-evaluacion', this.infoEvaluacion.idFaEva, this.infoEvaluacion.idEvaluacion, this.getPos()]);
      this.state = !this.state;
      this.emitir();
    }
  }

  //ESTADO DEL BOTON
  buttonState(fase: any): boolean {
    if (this.infoEvaluacion.fase.match(fase)) {
      return true
    } else {
      return false
    }
  }

  goToFase(fase: number) {
    switch (fase) {
      case 1:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['nuxten/evaluacion/Fase-1', this.infoEvaluacion.idFaEva, this.infoEvaluacion.idEvaluacion, this.getPos()]);
        break;
      case 2:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['nuxten/evaluacion/Fase-2', this.infoEvaluacion.idFaEva, this.infoEvaluacion.idEvaluacion, this.getPos()]);
        break;
      case 3:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['nuxten/evaluacion/Fase-3', this.infoEvaluacion.idFaEva, this.infoEvaluacion.idEvaluacion, this.getPos()]);
        break;
      case 4:
        this.state = !this.state;
        this.emitir();
        this.route.navigate(['nuxten/evaluacion/Fase-4', this.infoEvaluacion.idFaEva, this.infoEvaluacion.idEvaluacion, this.getPos()]);
        break;
    }
  }

  //FORMATO AL NUMERO DE TELEFONO
  numeroContacto(numeroContacto: any) {
    return `(${numeroContacto.slice(0, 3)})-${numeroContacto.slice(3, 6)}-${numeroContacto.slice(6)}`
  }
}
