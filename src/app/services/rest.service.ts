import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {RawMaterial} from '../rightcontent/stock/stock.model';
import {Rest} from '../rightcontent/rest/rest.model';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {AngularFireStorage} from 'angularfire2/storage';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class RestService {

  private functions;
  private addRestFunction;

  constructor(private storage: AngularFireStorage) {
    this.functions = firebase.functions();
    this.addRestFunction = this.functions.httpsCallable('addRest');
  }

  get(restId: string): Observable<Rest[]> {
    return null;
  }

  create(rest: Rest, subMenus: string[]) {
    rest.subMenus = subMenus;
    return new Promise((resolve, reject) => {
      this.addRestFunction(rest).then(resolve).catch(reject);
    });
  }

  UploadRestImage(file: any) {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      const ref = this.storage.ref(`/restPics/${id}`);
      ref.put(file)
        .then(x => {
          ref.getDownloadURL().subscribe(url => {
            resolve(url);
          });
        })
        .catch(reject);
    });
  }
}
