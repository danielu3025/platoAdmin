import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {StaticObject} from '../rightcontent/layout/new-grid-object-details/new-static-object-details/StaticObject.model';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class StaticObjectsService {

  private functions;
  private createStaticObjectFunction;

  constructor(private afs: AngularFirestore) {
    this.functions = firebase.functions();
    this.createStaticObjectFunction = this.functions.httpsCallable('createStaticObject');
  }

  getAll(restId: string): Observable<StaticObject[]> {
    return this.afs.collection<StaticObject>(`/RestAlfa/${restId}/StaticObjects`).valueChanges();
  }

  create(restId: string, staticObject: StaticObject) {
    return this.createStaticObjectFunction({restId, staticObject});
  }

}
