import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class RawMaterialUnitService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  // get all units from Globals
  getAll(): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.doc('/Globals/Units').valueChanges()
        .subscribe((data: { units: string }) => {
          observer.next(data.units);
        });
    });
  }

}
