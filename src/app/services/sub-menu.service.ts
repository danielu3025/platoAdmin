import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class SubMenuService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  // get all sub menus from Globals
  getAll(): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.doc('/Globals/SubMenus').valueChanges()
        .subscribe((data: { list: string[] }) => {
          observer.next(data.list);
        });
    });
  }
}
