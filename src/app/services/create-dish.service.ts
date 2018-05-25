import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CreateDishService {

  constructor(private http: HttpClient) { }

  CreateDish(restId: string, name: string, description: string, totalTime: number, status: number = 0, category: string, grocery: object): void {
    this.http.post('https://us-central1-plato-9a79e.cloudfunctions.net/addDish',
      {
        data: {
          restId,
          grocery: {
            name: name,
            description: description,
            totalTime: totalTime,
            status: status,
            category: category,
            grocery
          }
        }
      }).toPromise()
      .then( X => {
      })
      .catch(X => {
      });
  }
}
