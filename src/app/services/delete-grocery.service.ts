import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DeleteGroceryService {

  constructor(private http: HttpClient) { }

  // send data to server for delete meal
  DeleteGrocery(restId: string, groName: string) {
    this.http.post('https://us-central1-plato-9a79e.cloudfunctions.net/deleteGrocery',
      {
        data: {
          restId,
          name: groName
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
