import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../../services/user-info.service';

@Component({
  selector: 'app-create-meal-page',
  templateUrl: './create-meal-page.component.html',
  styleUrls: ['./create-meal-page.component.css']
})
export class CreateMealPageComponent implements OnInit {

  resturantID = '';

  constructor(private userInfo: UserInfoService) {
  }

  ngOnInit() {
    debugger;
    this.resturantID = this.userInfo.getSelectedRestId().restId;
    this.userInfo.getSelectedRestId().restIdObservable.subscribe(x => this.resturantID = x);
  }

}
