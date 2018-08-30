import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CreateGroceryService {

  constructor(private http: HttpClient) {
  }

  // send data to server for a new grocry
  CreateGrocery(restId: string, groName: string, cookingTime: number, cookingType: string, isEditable: boolean, rawMaterial: object) {
    return this.http.post('https://us-central1-plato-9a79e.cloudfunctions.net/addGrocery',
      {
        data: {
          restId,
          grocery: {
            name: groName,
            cookingTime: cookingTime,
            cookingType: cookingType,
            isEditable,
            rawMaterial
          }
        }
      }).toPromise();
  }
}
