import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Meal } from '../rightcontent/menu/meal.model';
import * as firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class MealService {

  private functions;
  private deleteMealFunction;
  private updateMealFunction;
  private deleteDishFromMealFunction;

  constructor(private afs: AngularFirestore) {
    this.functions = firebase.functions();
    this.deleteMealFunction = this.functions.httpsCallable('deleteMeal');
    this.updateMealFunction = this.functions.httpsCallable('updateMeal');
    this.deleteDishFromMealFunction = this.functions.httpsCallable('deleteDishFromMeal');
  }

  getAll(restId: string): Observable<Meal[]> {
    return this.afs.collection<Meal>(`/RestAlfa/${restId}/Meals`).valueChanges();
  }

  getDishesForMeal(restId: string, mealName: string): Observable<string[]> {
    return Observable.create((observer) => {
      this.afs.collection<{ id: string }>(`/RestAlfa/${restId}/Meals/${mealName}/dishes`).valueChanges()
        .subscribe(dishes => {
          observer.next(dishes.map(x => x.id));
        });
    });
  }

  delete(restId: string, mealName: string): Promise<void> {
    return this.deleteMealFunction({ restId, mealName });
  }

  update(restId: string, meal: Meal) {
    return this.updateMealFunction({ restId, meal });
  }

  deleteDishFromMeal(restId: string, mealName: string, dishName: string) {
    return this.deleteDishFromMealFunction({ restId, mealName, dishName });
  }
}
