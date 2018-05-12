import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class CookingTypesService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  getAll(): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.doc('Globals/CookingType').valueChanges()
        .subscribe(data => {
          observer.next(data.types);
        });
    });
  }
}
