import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'nuxten-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  userData!: ExpertoData

  constructor(
    private userService: UserService,
    private _ac: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this._ac.snapshot.data['userData'].subscribe((userData: ExpertoData) => {
      this.userData = userData;
    });
  }

  ngOnDestroy(): void {
    this.userService.closeSesion();
  }
}
