import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Grocery} from '../rightcontent/menu/meal.model';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class GroceryService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  getAll(restId: string): Observable<Grocery[]> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Grocery>('Grocery').valueChanges();
  }

  get(restId: string, grocery: string): Observable<Grocery> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Grocery>('Grocery')
      .doc<Grocery>(grocery).valueChanges();
  }
}
