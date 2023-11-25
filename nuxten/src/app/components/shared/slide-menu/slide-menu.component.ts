import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarDataAdm, navbarDataExp } from './nav-data';
// import { SideNavToggle } from 'src/app/interfaces/SideNavToggle';
import { UserService } from 'src/app/services/auth/user.service';
import { ExpertoData } from 'src/app/interfaces/Experto';

@Component({
  selector: 'nuxten-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent implements OnInit {
  collapsed = false;
  navData: any;
  userData!: ExpertoData;

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.getUserData();
  }

  openSlide() {
    this.collapsed = !this.collapsed;
  }

  closeSlide() {
    this.collapsed = false;
  }

  signOut() {
    console.log('cerrar');
    this.userService.logOut();
  }

  getUserData() {
    this.userService.getUserData().subscribe((userData: ExpertoData) => {
      this.userData = userData;

      if (this.userData.rol.match('Experto')) {
        this.navData = navbarDataExp;
      } else {
        this.navData = navbarDataAdm;
      }
    });
  }
}
