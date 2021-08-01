import { Injectable } from '@angular/core';
import { User } from '../models/Models';
import { ToolsService } from './tools.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private user: User | null;

  constructor(private userService: UserService, private toolsSerice: ToolsService) { 
    this.user = null;
    this.setCurrentUser();
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  setCurrentUser(): User | null {
    let user: User | null = null;

    if (this.isAuthenticated()) {
      const token = this.userService.getToken();

      let user = this.userService.findUserById(token);
      
      if(user != null) {
        delete user.password;
        this.user = user;
      }
    }
    return user;
  }

  loginUser(login: string, password: string) {
    const user: User | null = this.userService.loginUser(login, password);
    if(user != null) {
      this.user = user;
      this.toolsSerice.redirect('/');
    }
  }

  logoutUser() {
    this.userService.logoutUser();
    this.user = null;
    this.toolsSerice.redirect('/login');
  }

  public isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

}
