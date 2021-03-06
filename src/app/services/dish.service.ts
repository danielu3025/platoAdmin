import { Injectable } from '@angular/core';
import { Dish } from '../rightcontent/menu/meal.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';
import { DbHelperService } from './db-helper.service';

@Injectable()
export class DishService {

  private functions;
  private deleteDishFunction;
  private updateDishFunction;
  private deleteGroceryFromDishFunction;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private dbHelper: DbHelperService) {
    this.functions = firebase.functions();
    this.deleteDishFunction = this.functions.httpsCallable('deleteDish');
    this.updateDishFunction = this.functions.httpsCallable('updateDish');
    this.deleteGroceryFromDishFunction = this.functions.httpsCallable('deleteGroceryFromDish');
  }

  // get all dish from rest
  getAll(restId: string): Observable<Dish[]> {
    return this.afs.collection(this.dbHelper.getDbRoot()).doc(restId).collection<Dish>('Dishes').valueChanges();
  }

  // get specific dish from rest
  get(restId: string, dish: string): Observable<Dish> {
    return this.afs.collection(this.dbHelper.getDbRoot()).doc(restId).collection<Dish>('Dishes').doc<Dish>(dish).valueChanges();
  }

  // get all grocery that contain in dish
  getGroceryForDish(restId: string, dish: string): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.collection(this.dbHelper.getDbRoot()).doc(restId).collection<Dish>('Dishes').doc(dish)
        .collection('grocery').valueChanges()
        .subscribe((data: [{ id: string }]) => {
          observer.next(data.map(x => x.id));
        });
    });
  }

  // send data to server for delete dish
  delete(restId: string, dish: Dish) {
    return this.deleteDishFunction({ restId, dish });
  }

  // send data to server for update dish
  update(restId: string, dish: Dish) {
    return this.updateDishFunction({ restId, dish });
  }

  // send data to server delete grocery that contains in dish
  deleteGroceryFromDish(restId: string, dishName: string, groceryName: string) {
    return this.deleteGroceryFromDishFunction({ restId, dishName, groceryName });
  }
}
