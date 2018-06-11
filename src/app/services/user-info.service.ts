import {Injectable} from '@angular/core';
import {Observer} from 'rxjs/internal/types';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class UserInfoService {

  private selectedRestId = '';
  private readonly selectedRestIdObservable: Observable<string>;
  private selectedRestIdObserver: Observer<string>;

  constructor() {
    this.selectedRestIdObservable = Observable.create(observer => {
      this.selectedRestIdObserver = observer;
    });
  }

  getSelectedRestId(): ({ restId: string, restIdObservable: Observable<string> }) {
    return {
      restId: this.selectedRestId,
      restIdObservable: this.selectedRestIdObservable
    };
  }

  setRestId(rest: string) {
    this.selectedRestId = rest;
    this.selectedRestIdObserver.next(rest);
  }
}
