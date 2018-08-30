import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Grocery } from '../rightcontent/menu/meal.model';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';
import { DbHelperService } from './db-helper.service';

@Injectable()
export class GroceryService {

  private functions;
  private updateGrocery;
  private deleteGrocery;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase, private dbHelper: DbHelperService) {
    this.functions = firebase.functions();
    this.updateGrocery = this.functions.httpsCallable('updateGrocery');
    this.deleteGrocery = this.functions.httpsCallable('deleteGrocery');
  }

  // get all grocery from rest
  getAll(restId: string): Observable<Grocery[]> {
    return this.afs.collection(this.dbHelper.getDbRoot()).doc(restId).collection<Grocery>('Grocery').valueChanges();
  }

  // get specific grocery from rest
  get(restId: string, grocery: string): Observable<Grocery> {
    return this.afs.collection(this.dbHelper.getDbRoot()).doc(restId).collection<Grocery>('Grocery')
      .doc<Grocery>(grocery).valueChanges();
  }

  // send data to server for update grocery
  update(restId: string, grocery: Grocery) {
    return this.updateGrocery({ restId, grocery });
  }

  // send data to server for delete grocery
  delete(restId: string, grocery: Grocery) {
    return this.deleteGrocery({ restId, grocery });
  }
}
