import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EvaluacionInfo, EvaluacionJS } from 'src/app/interfaces/Evaluaciones';
import { ExpertInFo, ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';
import { EvaluacionService } from 'src/app/services/gestionar-evaluaciones/evaluacion.service';

@Component({
  selector: 'nuxten-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {

  public subscriber!: Subscription;
  state!: boolean;
  userData!: ExpertoData;
  evaFases!: EvaluacionJS;
  infoEvaluacion!: EvaluacionInfo;

  displayedColumns: string[] = ['expeto', 'id', 'correo', 'numero'];
  dataSource: ExpertInFo[] = [];

  constructor(
    private route: Router,
    private userService: UserService,
    private evaluacionService: EvaluacionService
  ) {

  }

  ngOnInit(): void {
    
    this.subscriber = this.route.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if ( event['url'] == '/NUXTEN_PROJECT/evaluacion' && this.evaFases.Creada.state) {
        this.state = !this.state
      } else if (this.evaFases.Creada.state == false) {
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/creada']);
      }
    });

    this.userData = this.userService.getUserData();
    this.getEvaluacion(this.userData.idEvaluacion);
    this.getExpertos(this.infoEvaluacion.idGrupo);
    this.getEvaFases();
    this.redirecTo();
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

  getEvaluacion(idEvaluacion: number) {
    //consular evaluacion
    this.infoEvaluacion = {
      idEvaluacion: 1,
      nombreSitio: 'Facebook',
      urlVer: 'www.Facebook.com',
      tipoSitio: 'Red social',
      fecha: '2023-06-02T03:09:23.459Z',
      fase: 'Fase 1',
      idFaseEva: 1,
      idGrupo: 1
    }
  }

  getExpertos(idGrupo: number) {
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
        idUser: 100234422,
        nombres: 'Jesus',
        apellidos: 'Roa',
        numero: '3112426884',
        email: 'jesusroa@unimayor.edu.co',
      }
    ]
  }

  getEvaFases() {
    // this.evaFases = JSON.parse(this.evaluacionService.generateDefaultFase([1, 2, 1002963019]));
    this.evaFases = JSON.parse(this.evaluacionService.generateDefaultFase(this.dataSource.map(val => val.idUser)));

    this.evaFases.Creada.state = true;
    this.evaFases.Fase1.state = true;

    console.log(this.evaFases)
  }

  //Verifica si la fase actual esta en creada
  redirecTo() {
    if (this.userData.idEvaluacion != null) {
      //fase: creada
      if (!this.evaFases.Creada.state) {
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/creada']);
      } else {
        this.state = true;
      }
    }
  }

  goToFase(fase: number) {
    switch (fase) {
      case 1:
        this.state = !this.state;
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-1']);
        break;
      case 2:
        this.state = !this.state;
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-2']);
        break;
      case 3:
        this.state = !this.state;
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-3']);
        break;
      case 4:
        this.state = !this.state;
        this.route.navigate(['NUXTEN_PROJECT/evaluacion/Fase-4']);
        break;
    }
  }
}
