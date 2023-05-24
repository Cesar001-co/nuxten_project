import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserExperto } from 'src/app/interfaces/Experto';
// import { SideNavToggle } from 'src/app/interfaces/SideNavToggle';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'nuxten-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  // userID! :any;

  constructor(
    private route: Router,
    private readonly userService: UserService
  ) {

  }
  ngOnInit(): void {
    // this.userService.sUsID$.subscribe(userid => this.userID = userid);
    // this.userVerifi();

  }

  // userVerifi( ) {
  //   if (this.userID == '') {
  //     //enviar a la interfaz error
  //     console.log('y el user?');
  //   } else {
  //     this.route.navigate(['nuxten/inicio']);
  //   }
  // }

}
