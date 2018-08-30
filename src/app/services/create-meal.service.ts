import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Meal} from '../rightcontent/menu/meal.model';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class CreateMealService {
  private functions;
  private addMealFunction;

  constructor(private storage: AngularFireStorage) {
    this.functions = firebase.functions();
    this.addMealFunction = this.functions.httpsCallable('addMeal');
  }

  // send data to server for a new meal
  CreateMeal(restId: string, meal: Meal, dishes: string[], rawMaterials) {
    const data = {
      restId,
      meal,
      dishes,
      rawMaterials
    };
    return new Promise((resolve, reject) => {
      this.addMealFunction(data)
        .then(resolve)
        .catch(reject);
    });
  }

  // upload image for meal
  UploadMealImage(restId: string, file: File) {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      const ref = this.storage.ref(`/mealsPics/${id}`);
      ref.put(file)
        .then(x => {
          ref.getDownloadURL().subscribe(url => {
            resolve(url);
          });
        })
        .catch(reject);
    });
  }

}
