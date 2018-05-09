import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {KitchenStation} from '../rightcontent/kitchen/kitchen.model';

@Injectable()
export class KitchenStoreService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  getAll(resturantId: string): Observable<KitchenStation[]> {
    return this.afs.collection('RestAlfa').doc(resturantId).collection('KitchenStation')
      .snapshotChanges()
      .map(data => {
        return data.map(x => new KitchenStation(x.payload.doc.id, x.payload.doc.data().name));
      });
  }
}
