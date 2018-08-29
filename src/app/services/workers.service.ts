import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Worker } from '../rightcontent/workers/worker.model';
import * as firebase from 'firebase';
import { DbHelperService } from './db-helper.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({ providedIn: 'root' })
export class WorkersService {

  private functions;
  private updateWorkerFunction;
  private deleteWorkerFunction;

  constructor(private afs: AngularFirestore, private dbHelper: DbHelperService, private storage: AngularFireStorage) {
    this.functions = firebase.functions();
    this.updateWorkerFunction = this.functions.httpsCallable('updateWorker');
    this.deleteWorkerFunction = this.functions.httpsCallable('deleteWorker');
  }

  getAll(restId: string): Observable<Worker[]> {
    return this.afs.collection<Worker>(`/${this.dbHelper.getDbRoot()}/${restId}/Workers`).valueChanges();
  }

  updateWorker(restId: string, oldEmail: string, name: string, role: string) {
    return this.updateWorkerFunction({ restId, worker: { name, role, oldEmail } });
  }

  deleteWorker(restId: string, email: string) {
    return this.deleteWorkerFunction({ restId, email });
  }

  uploadWorkerImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      const ref = this.storage.ref(`/workersPics/${id}`);
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
}
