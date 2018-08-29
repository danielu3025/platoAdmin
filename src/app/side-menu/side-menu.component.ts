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
    // check if the user id loggedin
    this.authService.isLoggedIn().subscribe(x => {
      this.isLoggedIn = x;
      if (this.isLoggedIn) {
        // get the data of user is loggedin
        this.authService.getUserInfo().subscribe(x => {
          this.userInfo = x;
          this.isAdmin = false;
          this.isHost = false;
          // check if the user that loggedin is admin or super admin and set isAdmin
          if (this.userInfo.role.toLowerCase() === 'admin' || this.userInfo.role.toLowerCase() === 'superAdmin') {
            this.isAdmin = true;
            // check if the user that loggedin is host and set isHost
          } else if (this.userInfo.role.toLowerCase() === 'host') {
            this.isHost = true;
          }
        });
      }
    });
  }

  // logout user from the system
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
