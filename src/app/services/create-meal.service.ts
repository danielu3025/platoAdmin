import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CreateMealService {

  constructor(private http: HttpClient) { }

  CreateMeal(restId: string, dairy: boolean, name: string, description: string, price: number, subMenus: string,
                vegan: boolean, glotenFree: boolean, mealType: string): void {
    this.http.post('https://us-central1-plato-9a79e.cloudfunctions.net/addMeal',
      {
        data: {
          restId,
          meal: {
            dairy: dairy,
            name: name,
            description: description,
            price: price,
            subMenus: subMenus,
            vegan: vegan,
            glotenFree: glotenFree,
            mealType: mealType,
          }
        }
      }).toPromise()
      .then( X => {
      })
      .catch(X => {
      });
  }

}
