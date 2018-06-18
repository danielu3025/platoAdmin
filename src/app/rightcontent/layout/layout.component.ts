import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {Observable} from 'rxjs/internal/Observable';
import {Observer} from 'rxjs/internal/types';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

}
