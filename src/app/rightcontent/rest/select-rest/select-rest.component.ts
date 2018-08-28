import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../../services/UserInfo.model';
import { AuthService } from '../../../services/auth.service';
import { UserInfoService } from '../../../services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-rests',
  templateUrl: './select-rest.component.html',
  styleUrls: ['./select-rest.component.css']
})
export class SelectRestComponent implements OnInit {

  selectedRest = '';
  restToEdit = '';
  userInfo: UserInfo = new UserInfo('', '', '', '', '', []);

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

    this.userInfoService.getSelectedRestId().subscribe(x => this.selectedRest = x);
  }

  createNewRest() {
    this.router.navigate(['createNewRest']);
  }

  selectRest(rest) {
    this.userInfoService.setRestId(rest)
      .then(x => {
        this.router.navigate(['createMeal']);
      });
  }

  mouseEnteredRest(restName: string) {
    this.restToEdit = restName;
  }

  mouseLeftRest() {
    this.restToEdit = '';
  }

  editRest(e: Event, restName: string) {
    e.stopPropagation();
    this.router.navigate(['createNewRest'], { queryParams: { rest: restName } });
  }
}
