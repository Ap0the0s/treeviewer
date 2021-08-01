import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  showSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

}
