import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  getAll(): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.doc('Globals/Category').valueChanges()
        .subscribe((data: {list: string[]}) => {
          observer.next(data.list);
        });
    });
  }

}
