import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'nuxten-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  show: boolean = false;

  constructor (
    private _router: Router
  ) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.show = true
      } else if (event instanceof NavigationEnd) {
        this.show = false
      }
    })
  }


}
