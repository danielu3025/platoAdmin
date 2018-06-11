import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(x => this.isLoggedIn = x);
  }

  logout() {
    this.authService.logout()
      .then(x => {
        alert('logged out');
        this.router.navigate(['login']);
      })
      .catch(x => {
        alert('failed logging out');
        console.log(x);
      });
  }

}
