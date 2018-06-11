import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  restId = '';

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.restId = this.userInfoService.getSelectedRestId().restId;
    this.userInfoService.getSelectedRestId().restIdObservable.subscribe(x => this.restId = x);
  }

}
