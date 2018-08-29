import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Meal } from '../rightcontent/menu/meal.model';
import * as firebase from 'firebase';
import { DbHelperService } from './db-helper.service';

@Injectable({ providedIn: 'root' })
export class MealService {

  private functions;
  private deleteMealFunction;
  private updateMealFunction;
  private deleteDishFromMealFunction;

  constructor(private afs: AngularFirestore, private dbHelper: DbHelperService) {
    this.functions = firebase.functions();
    this.deleteMealFunction = this.functions.httpsCallable('deleteMeal');
    this.updateMealFunction = this.functions.httpsCallable('updateMeal');
    this.deleteDishFromMealFunction = this.functions.httpsCallable('deleteDishFromMeal');
  }

  // get all meals from rest
  getAll(restId: string): Observable<Meal[]> {
    return this.afs.collection<Meal>(`/${this.dbHelper.getDbRoot()}/${restId}/Meals`).valueChanges();
  }

  // get all dish that contain in meal
  getDishesForMeal(restId: string, mealName: string): Observable<string[]> {
    return Observable.create((observer) => {
      this.afs.collection<{ id: string }>(`/${this.dbHelper.getDbRoot()}/${restId}/Meals/${mealName}/dishes`).valueChanges()
        .subscribe(dishes => {
          observer.next(dishes.map(x => x.id));
        });
    });
  }

  // send data to server for delete meal
  delete(restId: string, mealName: string): Promise<void> {
    return this.deleteMealFunction({ restId, mealName });
  }

  // send data to server for update meal
  update(restId: string, meal: Meal) {
    return this.updateMealFunction({ restId, meal });
  }

  // send data to server for delete dish that contains in meal
  deleteDishFromMeal(restId: string, mealName: string, dishName: string) {
    return this.deleteDishFromMealFunction({ restId, mealName, dishName });
  }
}
