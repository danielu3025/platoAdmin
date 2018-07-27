import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {RawMaterial} from '../rightcontent/stock/stock.model';
import {Observable} from 'rxjs/internal/Observable';
import * as firebase from 'firebase';

@Injectable()
export class RawMaterialService {

  private functions;
  private addRawMaterialFunction;
  private deleteRawMaterialFunction;
  private preCheckForDeletingRawMaterialFunction;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.functions = firebase.functions();
    this.addRawMaterialFunction = this.functions.httpsCallable('addRawMaterial');
    this.deleteRawMaterialFunction = this.functions.httpsCallable('deleteRawMaterial');
    this.preCheckForDeletingRawMaterialFunction = this.functions.httpsCallable('preCheckForDeletingRawMaterial');
  }

  get(restId: string): Observable<RawMaterial[]> {
    return Observable.create(observer => {
      this.afs.collection<{ value: RawMaterial }>(`/RestAlfa/${restId}/WarehouseStock`).valueChanges()
        .subscribe(x => {
          observer.next(x.map(x => x.value));
        });
    });
  }

  createRawMaterial(restId: string, rawMaterial: RawMaterial) {
    return this.addRawMaterialFunction({restId, rawMaterial});
  }

  preCheckBeforeDeletingRawMaterial(restId: string, name: string) {
    return this.preCheckForDeletingRawMaterialFunction({restId, name});
  }

  deleteRawMaterial(restId: string, name: string) {
    return this.deleteRawMaterialFunction({restId, name});
  }
}
