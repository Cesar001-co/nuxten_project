import { Component, EventEmitter, Output } from '@angular/core';
import { navbarDataAdm, navbarDataExp } from './nav-data';
import { SideNavToggle } from 'src/app/interfaces/SideNavToggle';
import { UserService } from 'src/app/services/auth/user.service';
import { UserExperto } from 'src/app/interfaces/Experto';

@Component({
  selector: 'nuxten-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent {
  collapsed = false;
  navData: any;
  userInfo: UserExperto = {
    idUser: 0,
    nombres: '',
    apellidos: '',
    numero: 0,
    rol: 'Experto',
    email: '',
    password: '',
    idEvaluacion: ''
  };

  constructor(
    private userService: UserService
  ) {
    this.getUserData();
  }

  openSlide() {
    this.collapsed = !this.collapsed;
  }

  closeSlide() {
    this.collapsed = false;
  }

  signOut() {
    this.userService.logOut();
  }

  getUserData() {
    //user epx
    // this.userInfo.idUser = 1002963019;
    // this.userInfo.nombres = 'Cesar';
    // this.userInfo.apellidos = 'Rodriguez';
    // this.userInfo.numero = 3112426884;
    // this.userInfo.rol = 'Experto';
    // this.userInfo.email = 'crodriguez@gmail.com';
    // this.userInfo.idEvaluacion = 'Sin evaluación';

    //user admin
    this.userInfo.idUser = 271844213;
    this.userInfo.nombres = 'Leider';
    this.userInfo.apellidos = 'Hernandez';
    this.userInfo.numero = 3112426884;
    this.userInfo.rol = 'Admin';
    this.userInfo.email = 'crodriguez@gmail.com';
    this.userInfo.idEvaluacion = 'Sin evaluación';

    if (this.userInfo.rol.match('Experto')) {
      this.navData = navbarDataExp;
    } else {
      this.navData = navbarDataAdm;
    }
  }
}
