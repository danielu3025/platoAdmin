import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.signInWithEmailAndPassword(this.username, this.password)
      .then(x => this.router.navigate(['manageRests']));
  }

}
