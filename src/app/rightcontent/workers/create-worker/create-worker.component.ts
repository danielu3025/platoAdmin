import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Worker} from '../worker.model';
import {AuthService} from '../../../services/auth.service';
import {UserInfoService} from '../../../services/user-info.service';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {

  worker: Worker = new Worker();
  password: string;
  restId: string;

  idMatcher = new ValueLengthErrorStateMatcher(9);
  passwordMatcher = new PasswordErrorMatcher(6);

  @ViewChild('userId') userId: ElementRef;
  @ViewChild('passwordRef') passwordElement: ElementRef;

  constructor(private authService: AuthService, private userInfoService: UserInfoService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => this.restId = x);
  }

  createWorker() {

    if (!this.isNewWorkerValid()) {
      this.snackBar.open('Make sure all fields are correct!', null, {
        duration: 1500,
        panelClass: 'plato-alert-error'
      });
      return;
    }

    this.authService.createWorker(this.restId, this.worker.role,
      this.worker.firstName, this.worker.lastName, this.worker.id, this.password)
      .then(x => this.snackBar.open('Worker Created', null, {
        duration: 1500,
        panelClass: 'plato-alert'
      }))
      .catch(e => {
        console.log(e);
        this.snackBar.open('Error when creating worker', null, {
          duration: 1500,
          panelClass: 'plato-alert-error'
        });
      });
  }

  private isNewWorkerValid(): boolean {
    if (this.worker.firstName && this.worker.lastName && this.worker.role) {
      if (this.idMatcher.isErrorState(this.userId.nativeElement as any, null)) {
        return false;
      }

      if (this.passwordMatcher.isErrorState(this.passwordElement.nativeElement as any, null)) {
        return false;
      }

      return true;
    }

    return false;
  }
}

export class ValueLengthErrorStateMatcher implements ErrorStateMatcher {

  private _length: number;

  constructor(length: number) {
    this._length = length;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    if (!control) {
      return false;
    }
    if (!control.value) {
      return false;
    }

    return control.value.toString().length !== this._length;
  }
}

export class ValueMinLengthErrorMatcher implements ErrorStateMatcher {

  private _length: number;

  constructor(length: number) {
    this._length = length;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    if (!control) {
      return false;
    }
    if (!control.value) {
      return false;
    }

    return control.value.toString().length < this._length;
  }
}


export class PasswordErrorMatcher implements ErrorStateMatcher {

  private _length: number;

  constructor(length: number) {
    this._length = length;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    if (!control) {
      return false;
    }
    if (!control.value) {
      return false;
    }

    const value = control.value.toString();
    if (value.length < this._length) {
      return true;
    }

    const lowercaseLetters = /[a-z]/g;
    const uppercaseLetters = /[A-Z]/g;
    const digits = /[0-9]/g;

    if (value.match(lowercaseLetters) && value.match(uppercaseLetters) && value.match(digits)) {
      return false;
    }

    return true;
  }
}
