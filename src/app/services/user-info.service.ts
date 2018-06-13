import {Injectable} from '@angular/core';
import {Observer} from 'rxjs/internal/types';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from './auth.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {UserInfo} from './UserInfo.model';

@Injectable({providedIn: 'root'})
export class UserInfoService {

  private userInfo: UserInfo;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.authService.isLoggedIn().subscribe(x => {
      if (!x) {
        return;
      }
      this.authService.getUserInfo().subscribe(x => this.userInfo = x);
    });
  }

  getSelectedRestId(): Observable<string> {

    return Observable.create(observer => {
      this.authService.isLoggedIn().subscribe(x => {
        if (!x) {
          return;
        }
        this.authService.getUserInfo().subscribe(x => {
          observer.next(x.lastSelectedRest);
        });
      });
    });
  }

  setRestId(rest: string) {
    this.afs.doc(`/GlobWorkers/${this.userInfo.fbId}`).update({lastSelectedRest: rest})
      .catch(e => {
        alert('failed setting last selected rest');
        console.log(e);
      });
  }
}
