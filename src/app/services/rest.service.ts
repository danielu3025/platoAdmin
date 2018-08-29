import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { RawMaterial } from '../rightcontent/stock/stock.model';
import { Rest, WorkingDay, RankingAlerts } from '../rightcontent/rest/rest.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { DbHelperService } from './db-helper.service';

@Injectable({ providedIn: 'root' })
export class RestService {

  private functions;
  private addRestFunction;
  private updateRestFunction;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private dbHelper: DbHelperService) {
    this.functions = firebase.functions();
    this.addRestFunction = this.functions.httpsCallable('addRest');
    this.updateRestFunction = this.functions.httpsCallable('updateRest');
  }

  // get all rest from db
  get(restId: string): Observable<Rest> {
    return this.afs.doc<Rest>(`/${this.dbHelper.getDbRoot()}/${restId}`).valueChanges();
  }

  // get all sub menus from rest
  getRestSubMenus(restId: string): Observable<string[]> {
    return Observable.create(observer => {
      this.afs.doc(`/${this.dbHelper.getDbRoot()}/${restId}/restGlobals/subMenus`).valueChanges()
        .subscribe((data: { list: string[] }) => {
          observer.next(data.list);
        });
    });
  }

  // get all working hours and day for rest
  getRestWorkingHours(restId: string): Observable<WorkingDay[]> {
    return this.afs.collection<WorkingDay>(`/${this.dbHelper.getDbRoot()}/${restId}/WorkingDays`).valueChanges();
  }

  // get ranking alrets/notification for rest
  getRestRankingAlerts(restId: string): Observable<RankingAlerts> {
    return this.afs.doc<RankingAlerts>(`/${this.dbHelper.getDbRoot()}/${restId}/restGlobals/rankingAlerts`).valueChanges();
  }

  // send data to srever for create a new rest
  create(rest: Rest, subMenus: string[], fbId: string, ranking: RankingAlerts) {
    rest.subMenus = subMenus;
    const data = { rest, fbId, ranking };
    return new Promise((resolve, reject) => {
      this.addRestFunction(data).then(resolve).catch(reject);
    });
  }

  // send data to srever for update rest
  update(restId: string, subMenus: string[], rest: Rest, ranking: RankingAlerts) {
    return this.updateRestFunction({ restId, subMenus, rest, ranking });
  }

  // upload imange for rest
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
