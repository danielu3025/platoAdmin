import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import * as firebaseFunctions from 'firebase/functions';
import {Dish} from '../rightcontent/menu/meal.model';
import {environment} from '../../environments/environment';

@Injectable()
export class CreateDishService {

  private functions;
  private addDishFunction;


  constructor() {

    firebase.initializeApp(environment.config);
    this.functions = firebase.functions();
    this.addDishFunction = this.functions.httpsCallable('addDish');
  }

  CreateDish(restId: string, dish: Dish, groceries: string[], update: boolean = false) {

    const data = {
      restId,
      dish: {
        name: dish.name,
        description: dish.description,
        category: dish.category,
        status: 0,
        totalTime: dish.totalTime,
        pic: ''
      },
      groceries,
      update
    };

    return new Promise((resolve, reject) => {
      this.addDishFunction(data)
        .then(x => {
          resolve();
        })
        .catch(x => {
          reject({
            alreadyExists: x.code === 'already-exists',
            message: `${x.code}: ${x.message}`.toUpperCase()
          });
        });
    });
  }
}
