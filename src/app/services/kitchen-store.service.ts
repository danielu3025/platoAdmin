import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {KitchenStation} from '../rightcontent/kitchen/kitchen.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class KitchenStoreService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private http: HttpClient) { }

  get(restId: string): Observable<KitchenStation[]> {
    return this.afs.collection('RestAlfa' + restId + 'KitchenStation')
      .snapshotChanges()
      .map(data => {

        return data.map(data => {
          const value = data.payload.doc.data().value;

          const kitchenStation: KitchenStation = {
            id: data.payload.doc.id,
            name: value.name,
          };

          return kitchenStation;
        });
      });
  }

  CreateKitchenStation(restId: string, id: string, name: string): void {
    this.http.post('https://us-central1-plato-9a79e.cloudfunctions.net/addGrocery',
      {
        data: {
          restId,
          grocery: {
            id: id,
            name: name,
          }
        }
      }).toPromise()
      .then( X => {
      })
      .catch(X => {
      });
  }

  // getAll(resturantId: string): Observable<KitchenStation[]> {
  //   return this.afs.collection('RestAlfa').doc(resturantId).collection('KitchenStation')
  //     .snapshotChanges()
  //     .map(data => {
  //       return data.map(x => new KitchenStation(x.payload.doc.id, x.payload.doc.data().name));
  //     });
  // }
  //
  // deleteKitchenStation(resturantId: string, kitchenStationId: string): void {
  //   this.afs.collection('RestAlfa' + '/' + resturantId + '/KitchenStation/').doc(kitchenStationId).delete()
  //     .catch(function (error) {
  //       console.error('Error writing document: ', error);
  //     });
  // }
}
