import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { RawMaterial } from '../rightcontent/stock/stock.model';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';
import { DbHelperService } from './db-helper.service';

@Injectable()
export class RawMaterialService {

  private functions;
  private addRawMaterialFunction;
  private deleteRawMaterialFunction;
  private preCheckForDeletingRawMaterialFunction;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private dbHelper: DbHelperService) {
    this.functions = firebase.functions();
    this.addRawMaterialFunction = this.functions.httpsCallable('addRawMaterial');
    this.deleteRawMaterialFunction = this.functions.httpsCallable('deleteRawMaterial');
    this.preCheckForDeletingRawMaterialFunction = this.functions.httpsCallable('preCheckForDeletingRawMaterial');
  }

  // get all raw material from rest
  get(restId: string): Observable<RawMaterial[]> {
    return Observable.create(observer => {
      this.afs.collection<{ value: RawMaterial }>(`/${this.dbHelper.getDbRoot()}/${restId}/WarehouseStock`).valueChanges()
        .subscribe(x => {
          observer.next(x.map(x => x.value));
        });
    });
  }

  // send data to server for create a new raw material
  createRawMaterial(restId: string, rawMaterial: RawMaterial) {
    return this.addRawMaterialFunction({ restId, rawMaterial });
  }

  // send data to server for cheack if it's ok to delete raw material
  // if it's important to meal it's neccesary to delete meal also
  preCheckBeforeDeletingRawMaterial(restId: string, name: string) {
    return this.preCheckForDeletingRawMaterialFunction({ restId, name });
  }

  // send data to srever for delete raw material
  deleteRawMaterial(restId: string, name: string) {
    return this.deleteRawMaterialFunction({ restId, name });
  }
}
