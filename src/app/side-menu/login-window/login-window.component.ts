import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  username = '';
  password = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.signInWithEmailAndPassword(this.username, this.password);
  }

}
