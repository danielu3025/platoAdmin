import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AlertsService {

  constructor(public snackBar: MatSnackBar) {
  }

  alert(message: string, duration: number = 1500) {
    this.snackBar.open(message, null, {
      duration,
      panelClass: 'plato-alert'
    });
  }

  alertError(message: string, duration: number = 1500) {
    this.snackBar.open(message, null, {
      duration,
      panelClass: 'plato-alert-error'
    });
  }
}
