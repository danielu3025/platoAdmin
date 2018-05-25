import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Grocery} from '../rightcontent/menu/meal.model';

@Injectable()
export class GroceryService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  get(restId: string): Observable<Grocery[]> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Grocery>('Grocery').valueChanges();
  }
}
