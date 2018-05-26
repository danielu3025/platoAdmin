import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class RestTypeService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  getAll(): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.doc('/Globals/restType').valueChanges()
        .subscribe((data: { types: string }) => {
          observer.next(data.types);
        });
    });
  }
}
