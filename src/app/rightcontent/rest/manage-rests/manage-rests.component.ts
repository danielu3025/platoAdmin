import {Component, OnInit} from '@angular/core';
import {UserInfo} from '../../../services/UserInfo.model';
import {AuthService} from '../../../services/auth.service';
import {UserInfoService} from '../../../services/user-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-rests',
  templateUrl: './manage-rests.component.html',
  styleUrls: ['./manage-rests.component.css']
})
export class ManageRestsComponent implements OnInit {

  selectedRest = '';
  userInfo: UserInfo = new UserInfo('', '', '', []);

  constructor(private authService: AuthService, private userInfoService: UserInfoService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(x => {
      if (!x) {
        return;
      }
      this.authService.getUserInfo().subscribe(x => {
        this.userInfo = x;
      });
    });

    this.selectedRest = this.userInfoService.getSelectedRestId().restId;
    this.userInfoService.getSelectedRestId().restIdObservable.subscribe(x => {
      this.selectedRest = x;
    });
  }

  createNewRest() {
    this.router.navigate(['createNewRest']);
  }

  selectRest(rest) {
    this.userInfoService.setRestId(rest);
  }
}
