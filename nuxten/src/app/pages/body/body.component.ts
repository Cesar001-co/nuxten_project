import { Component, Input } from '@angular/core';

@Component({
  selector: 'nuxten-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 786) {
      // styleClass = 'body-trimed'
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      // styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
