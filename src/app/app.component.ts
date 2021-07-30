import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'OCCT Angular Material Tree viewer';
  sidenavStatus = false;

  toogleSidenav() {
    this.sidenavStatus = !this.sidenavStatus;
  }

}
