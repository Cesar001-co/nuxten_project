import { Component, EventEmitter, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { SideNavToggle } from 'src/app/interfaces/SideNavToggle';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'nuxten-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss']
})
export class SlideMenuComponent {


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  usData = {
    routeLink: 'user/1234',
    name: 'Cesar Rodriguez',
    prof: 'Experto',
    icon: 'person'
  };

  constructor(
    private userService: UserService
    ) {

  }

  openSlide() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSlide() {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  signOut() {
    this.userService.logOut();
  }
}
