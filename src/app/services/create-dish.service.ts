import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import * as firebaseFunctions from 'firebase/functions';
import {Dish} from '../rightcontent/menu/meal.model';
import {environment} from '../../environments/environment';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class CreateDishService {

  private functions;
  private addDishFunction;


  constructor(private storage: AngularFireStorage) {

    this.functions = firebase.functions();
    this.addDishFunction = this.functions.httpsCallable('addDish');
  }

  // upload image for dish
  UploadDishImage(restId: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      const ref = this.storage.ref(`/dishesPics/${id}`);
      ref.put(file)
        .then(x => {
          ref.getDownloadURL().subscribe(url => {
            resolve(url);
          });
        })
        .catch(reject);
    });
  }

  // send data to server for a new meal
  CreateDish(restId: string, dish: Dish, groceries: string[], update: boolean = false) {

    const data = {
      restId,
      dish: {
        name: dish.name,
        description: dish.description,
        category: dish.category,
        status: 0,
        totalTime: dish.totalTime,
        pic: dish.pic,
        maxSecondsBeforeStartingMaking: dish.maxSecondsBeforeStartingMaking
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
          // reject if the dish is already exsists
          reject({
            alreadyExists: x.code === 'already-exists',
            message: `${x.code}: ${x.message}`.toUpperCase()
          });
        });
    });
  }
}
