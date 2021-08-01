import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/Models';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storageService: StorageService, private toolsService: ToolsService) { }

  public isAuthenticated(): boolean {
    return this.storageService.check('current_user');
  }

  loginUser(login: string, password: string): User | null {
    let user: User | null = null;

    if(this.storageService.check('users')) {
      const users: User[] = JSON.parse(this.storageService.get('users'));
      let founded_user = users.find(f => f.login == login);

      if (founded_user) {
        if(founded_user.password == password) {
          user = founded_user;
          this.setToken(founded_user.uuid);
        } else {
          this.toolsService.showSnackBar('Wrong password, please try again', 'Ok');
        }
      } else {
        user = this.registerNewUser(login, password);
        this.setToken(user.uuid);
      }      
    } else {
      this.storageService.set('users', JSON.stringify([]));
      this.loginUser(login, password);
    }

    return user;
  }

  registerNewUser(...authData: string[]): User {

    const [login, password] = authData;
    
    const USER: User = {
      uuid: this.generateUniqueId(),
      login: login,
      password: password,
      name: null,
      gender: null,
      birthdate: null,
      email: null
    }

    let users: User[] = JSON.parse(this.storageService.get('users'));
    users.push(USER);

    this.storageService.set('users', JSON.stringify(users));

    return USER;

  }

  logoutUser() {
    this.storageService.remove('current_user');
  }

  getToken(): string {
    return this.storageService.get('current_user');
  }

  setToken(token: string) {
    this.storageService.set('current_user', token);
  }

  findUserById(uuid: string): User | null {
    const users: User[] = JSON.parse(this.storageService.get('users'));
    let user = users.find(f => f.uuid == uuid);

    return user || null;
  }

  findUserIndexById(uuid: string): number {
    const users: User[] = JSON.parse(this.storageService.get('users'));
    const userIdx: number = users.findIndex(f => f.uuid = uuid);
    return userIdx;
  }

  getAllUsers(): User[] {
    return JSON.parse(this.storageService.get('users'));
  }

  updateUsersList(user: User, idx: number) {
    const users: User[] = this.getAllUsers();
    users.splice(idx, 1, user);
    this.storageService.set('users', JSON.stringify(users));
  }

  private generateUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

}
