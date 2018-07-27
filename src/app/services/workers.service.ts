import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {Worker} from '../rightcontent/workers/worker.model';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class WorkersService {

  private functions;
  private updateWorkerFunction;


  constructor(private afs: AngularFirestore) {
    this.functions = firebase.functions();
    this.updateWorkerFunction = this.functions.httpsCallable('updateWorker');
  }

  getAll(restId: string): Observable<Worker[]> {
    return this.afs.collection<Worker>(`/RestAlfa/${restId}/Workers`).valueChanges();
  }

  updateWorker(restId: string, oldEmail: string, name: string, role: string) {
    return this.updateWorkerFunction({restId, worker: {name, role, oldEmail}});
  }
}
