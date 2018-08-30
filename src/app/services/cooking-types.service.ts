import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class CookingTypesService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  // function get all cooking Type for rest from Globals
  getAll(): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.doc('Globals/CookingType').valueChanges()
        .subscribe((data: {types: string}) => {
          observer.next(data.types);
        });
    });
  }
}
