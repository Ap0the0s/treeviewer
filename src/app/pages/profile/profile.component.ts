import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/Models';
import { AppService } from 'src/app/services/app.service';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userData: User | null;
  datepickerStart: Date | null;

  constructor(public appService: AppService, private toolsService: ToolsService, private userService: UserService) { 
    this.userData = userService.findUserById(this.userService.getToken());
    let birthdate = appService.getUser()?.birthdate;
    this.datepickerStart = birthdate ? new Date(birthdate) : null;
    console.log(this.datepickerStart);
  }

  ngOnInit(): void {
  }

  public saveUserData(...userData: string[]) {
    let [password, name, email, gender, birthdate ] = userData;
    let userInfo: User | null = this.userService.findUserById(this.userService.getToken());
    let userIdx: number = this.userService.findUserIndexById(this.userService.getToken());

    if(userInfo) {
      userInfo.password = password;
      userInfo.name = name;
      userInfo.email = email;
      userInfo.gender = +gender;
      userInfo.birthdate = birthdate;

      this.userService.updateUsersList(userInfo, userIdx);
      this.appService.setUser(userInfo);

      this.toolsService.showSnackBar('Your data was successfully saved', 'Ok');

    } else {
      this.toolsService.showSnackBar('User not found', 'Ok');
    }

  }

}
