import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'OCCT Angular Material Tree viewer';
  sidenavStatus = false;
  userName: string | null | undefined;

  constructor(public appService: AppService) {
    this.userName = appService.getUser()?.name ? appService.getUser()?.name : appService.getUser()?.login;
  }

  toogleSidenav() {
    this.sidenavStatus = !this.sidenavStatus;
  }

}
