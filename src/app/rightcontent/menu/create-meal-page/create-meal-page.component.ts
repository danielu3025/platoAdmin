import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../../services/user-info.service';

@Component({
  selector: 'app-create-meal-page',
  templateUrl: './create-meal-page.component.html',
  styleUrls: ['./create-meal-page.component.css']
})
export class CreateMealPageComponent implements OnInit {

  constructor(private userInfo: UserInfoService) {
  }

  ngOnInit() {
  }

}
