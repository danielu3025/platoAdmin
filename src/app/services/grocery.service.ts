import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Grocery } from '../rightcontent/menu/meal.model';
import { Observable } from 'rxjs/internal/Observable';
import * as firebase from 'firebase';

@Injectable()
export class GroceryService {

  private functions;
  private updateGrocery;
  private deleteGrocery;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.functions = firebase.functions();
    this.updateGrocery = this.functions.httpsCallable('updateGrocery');
    this.deleteGrocery = this.functions.httpsCallable('deleteGrocery');
  }

  getAll(restId: string): Observable<Grocery[]> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Grocery>('Grocery').valueChanges();
  }

  get(restId: string, grocery: string): Observable<Grocery> {
    return this.afs.collection('RestAlfa').doc(restId).collection<Grocery>('Grocery')
      .doc<Grocery>(grocery).valueChanges();
  }

  update(restId: string, grocery: Grocery) {
    return this.updateGrocery({ restId, grocery });
  }

  delete(restId: string, grocery: Grocery) {
    return this.deleteGrocery({ restId, grocery });
  }
}
