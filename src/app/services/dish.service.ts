import {Injectable} from '@angular/core';
import {Dish} from '../rightcontent/menu/meal.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class DishService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  getAll(restId: string): Observable<Dish[]> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Dish>('Dishes').valueChanges();
  }

  get(restId: string, dish: string): Observable<Dish> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Dish>('Dishes').doc<Dish>(dish).valueChanges();
  }

  getGroceryForDish(restId: string, dish: string): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.collection('RestAlfa').doc(restId).collection<Dish>('Dishes').doc(dish)
        .collection('grocery').valueChanges()
        .subscribe((data: [{ id: string }]) => {
          observer.next(data.map(x => x.id));
        });
    });
  }
}
