import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { StaticObject } from '../rightcontent/layout/new-grid-object-details/new-static-object-details/StaticObject.model';
import * as firebase from 'firebase';
import { DbHelperService } from './db-helper.service';

@Injectable({ providedIn: 'root' })
export class StaticObjectsService {

  private functions;
  private createStaticObjectFunction;

  constructor(private afs: AngularFirestore, private dbHelper: DbHelperService) {
    this.functions = firebase.functions();
    this.createStaticObjectFunction = this.functions.httpsCallable('createStaticObject');
  }

  // get all static object from rest
  getAll(restId: string): Observable<StaticObject[]> {
    return this.afs.collection<StaticObject>(`/${this.dbHelper.getDbRoot()}/${restId}/StaticObjects`).valueChanges();
  }

  // send data to srever for create a new static object(bar, wc, wall...)
  create(restId: string, staticObject: StaticObject) {
    return this.createStaticObjectFunction({ restId, staticObject });
  }

}
