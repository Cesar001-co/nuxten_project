import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'nuxten-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  userData!: ExpertoData
  
  constructor(
    private route: Router,
    private userService: UserService
  ) {

  }
  
  ngOnInit(): void {
    this.userData = this.userService.getUserData();
  }

  ngOnDestroy(): void {
    this.userService.closeSesion();
  }
}
