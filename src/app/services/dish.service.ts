import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Dish} from '../rightcontent/menu/meal.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class DishService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  get(restId: string): Observable<Dish[]> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Dish>('Dishes').valueChanges();
  }

}
