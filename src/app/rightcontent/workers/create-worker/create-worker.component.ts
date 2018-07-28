import {Component, OnInit} from '@angular/core';
import {Worker} from '../worker.model';
import {AuthService} from '../../../services/auth.service';
import {UserInfoService} from '../../../services/user-info.service';
import {ErrorStateMatcher} from '@angular/material';
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
  passwordMatcher = new ValueMinLengthErrorMatcher(6);

  constructor(private authService: AuthService, private userInfoService: UserInfoService) {

  }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => this.restId = x);
  }

  createWorker() {
    this.authService.createWorker(this.restId, this.worker.role,
      this.worker.firstName, this.worker.lastName, this.worker.id, this.password)
      .then(x => alert('created'))
      .catch(e => {
        console.log(e);
        alert('Error when creating worker');
      });
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
