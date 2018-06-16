import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {Observable} from 'rxjs/internal/Observable';
import {Observer} from 'rxjs/internal/types';
import {LayoutPermissions} from './LayoutPermissions';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  permissions: LayoutPermissions[] = [];
  permissionsObservable: Observable<LayoutPermissions[]>;
  permissionsObserver: Observer<LayoutPermissions[]>;

  constructor(private authService: AuthService) {
    this.permissionsObservable = Observable.create(observer => this.permissionsObserver = observer);
    this.permissionsObservable.subscribe();
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(x => {
      if (!x) {
        return;
      }
      this.authService.getUserInfo().subscribe(x => {
        const role = x.role;
        if (role === 'host') {
          this.permissionsObserver.next([LayoutPermissions.connectingTables, LayoutPermissions.move]);
        } else if (role.indexOf('admin') > -1) {
          this.permissionsObserver.next([
            LayoutPermissions.creating,
            LayoutPermissions.delete,
            LayoutPermissions.move,
            LayoutPermissions.connectingTables,
            LayoutPermissions.settingConnectables
          ]);
        }
      });

    });
  }

}
