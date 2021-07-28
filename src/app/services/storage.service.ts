import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string): any {
    return localStorage.getItem(key);
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, value); //new Date(+ new Date() + 3600 * 1000) for expire
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  check(key: string): boolean {
    const value = this.get(key);
    return !(value == undefined || value == null || value == '');
  }
  
}
