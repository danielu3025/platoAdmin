import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserInfo} from '../services/UserInfo.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  isLoggedIn = false;
  isHost = false;
  isAdmin = false;
  userInfo: UserInfo;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(x => {
      this.isLoggedIn = x;
      if (this.isLoggedIn) {
        this.authService.getUserInfo().subscribe(x => {
          this.userInfo = x;
          this.isAdmin = false;
          this.isHost = false;
          if (this.userInfo.role === 'admin' || this.userInfo.role === 'superAdmin') {
            this.isAdmin = true;
          } else if (this.userInfo.role === 'host') {
            this.isHost = true;
          }
        });
      }
    });
  }

  logout() {
    this.authService.logout()
      .then(x => {
        alert('logged out');
        this.isLoggedIn = false;
        this.router.navigate(['login']);
      })
      .catch(x => {
        alert('failed logging out');
        console.log(x);
      });
  }

}
