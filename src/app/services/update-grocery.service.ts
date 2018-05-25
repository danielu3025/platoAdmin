import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UpdateGroceryService {

  constructor(private http: HttpClient) { }

  UpdateGrocery(restId: string, groName: string, cookingTime: number, cookingType: string, rawMaterial: object) {
    this.http.post('https://us-central1-plato-9a79e.cloudfunctions.net/updateGrocery',
      {
        data: {
          restId,
          grocery: {
            name: groName,
            cookingTime: cookingTime,
            cookingType: cookingType,
            rawMaterial
          }
        }
      }).toPromise()
      .then(x => {
        console.log('grocery was deleted');
      })
      .catch(x => {
        console.log('eror');
      });
  }

}
