import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  logon(login: string, password: string) {
    this.appService.loginUser(login, password);
  }

}
