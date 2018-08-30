import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Worker } from '../worker.model';
import { AuthService } from '../../../services/auth.service';
import { UserInfoService } from '../../../services/user-info.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AlertsService } from '../../../services/alerts.service';
import { WorkersService } from '../../../services/workers.service';
import { SpinningLoaderComponent } from '../../../common/spinning-loader/spinning-loader.component';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {

  worker: Worker = new Worker();
  password: string;
  restId: string;
  pic: File;
  picText = 'Choose File';
  idMatcher = new ValueLengthErrorStateMatcher(9);
  passwordMatcher = new PasswordErrorMatcher(6);

  @ViewChild('userId') userId: ElementRef;
  @ViewChild('passwordRef') passwordElement: ElementRef;
  @ViewChild(SpinningLoaderComponent) spinner: SpinningLoaderComponent;

  constructor(private authService: AuthService, private workersService: WorkersService,
    private userInfoService: UserInfoService, private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => this.restId = x);
  }

  private resetFields() {
    this.worker = new Worker();
    this.pic = null;
    this.picText = 'Choose File';
  }

  createWorker() {

    this.spinner.show();
    if (!this.isNewWorkerValid()) {
      this.alertsService.alertError('Make sure all fields are correct!');
      this.spinner.hide();
      return;
    }

    this.workersService.uploadWorkerImage(this.pic)
      .then(picUrl => {
        this.authService.createWorker(this.restId, this.worker.role,
          this.worker.firstName, this.worker.lastName, this.worker.id, this.password, picUrl)
          .then(x => {
            this.alertsService.alert('Worker Created');
            this.spinner.hide();
            this.resetFields();
          })
          .catch(e => {
            console.log(e);
            this.alertsService.alertError('Error when creating worker');
            this.spinner.hide();
          });
      }).catch(x => {
        console.log(x);
        this.alertsService.alertError('Failed uploading worker\'s pic');
        this.spinner.hide();
      });
  }

  uploadImage(e: any) {
    this.pic = e.target.files[0];
    const name = this.pic.name;
    if (name.length >= 10) {
      this.picText = `${name.substr(0, 10)}...`;
    } else {
      this.picText = name;
    }
  }
  private isNewWorkerValid(): boolean {
    if (this.worker.firstName && this.worker.lastName && this.worker.role && this.pic) {
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
