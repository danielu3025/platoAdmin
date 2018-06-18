import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {UserInfoService} from '../../services/user-info.service';
import {AuthService} from '../../services/auth.service';
import {UserInfo} from '../../services/UserInfo.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  component: '';
  userInfo: UserInfo = new UserInfo('', '', '', '', '', []);

  constructor(private authService: AuthService) {
  }

  @ViewChild('topBar') topbar: ElementRef;


  ngOnInit() {
    this.authService.isLoggedIn().subscribe(x => {
      if (!x) {
        return;
      }
      this.authService.getUserInfo().subscribe(x => {
        this.userInfo = x;
      });
    });
  }


}
