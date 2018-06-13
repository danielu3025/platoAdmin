import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {KitchenStation} from '../rightcontent/kitchen/kitchen.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {Grocery} from '../rightcontent/menu/meal.model';

@Injectable()
export class KitchenStoreService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  getAll(restId: string): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.collection(`/RestAlfa/${restId}/kitchenStation`).valueChanges()
        .subscribe(x => {
          observer.next(x.map((y: { name: string }) => y.name));
        });
    });
  }
}
