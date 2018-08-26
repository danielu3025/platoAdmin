import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { KitchenStation } from '../rightcontent/kitchen/kitchen.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Grocery } from '../rightcontent/menu/meal.model';
import * as firebase from 'firebase';


@Injectable()
export class KitchenStationService {

  private functions;
  private addKitchenStationFunction;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.functions = firebase.functions();
    this.addKitchenStationFunction = this.functions.httpsCallable('addKitchenStation');
  }

  getAll(restId: string): Observable<KitchenStation[]> {
    return this.afs.collection<KitchenStation>(`/RestAlfa/${restId}/KitchenStation`).valueChanges();
  }

  create(restId: string, kitchenStation: KitchenStation) {
    return this.addKitchenStationFunction({restId, kitchenStation});
  }
}
