import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {User} from 'firebase';
import {UserInfo} from './UserInfo.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Worker} from '../rightcontent/workers/worker.model';

@Injectable()
export class AuthService {

  private user: Observable<User>;
  private userDetails: User = null;
  private functions;
  private createWorkerFunction;

  constructor(private _firebaseAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.functions = firebase.functions();
    this.createWorkerFunction = this.functions.httpsCallable('createWorker');
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  createWorker(restId, role, firstName, lastName, id, password) {
    return this.createWorkerFunction({
      restId,
      worker: {role, firstName, lastName, id, password}
    });
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then(resolve)
        .catch(reject);
    });
  }

  isLoggedIn(): Observable<boolean> {
    return Observable.create(observer => {
      this.user.subscribe(
        (user) => {
          if (user) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        }
      );
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this._firebaseAuth.auth.signOut()
        .then(resolve)
        .catch(reject);
    });
  }

  getUserInfo(): Observable<UserInfo> {
    return Observable.create((observer) => {
      const email = this.userDetails.email;

      this.afs.collection<UserInfo>('/GlobWorkers', ref => ref.where('email', '==', email)).snapshotChanges().subscribe(x => {
        const id = x[0].payload.doc.id;
        const data = x[0].payload.doc.data();
        this.afs.collection(`/GlobWorkers/${id}/Rest`).valueChanges().subscribe(rest => {
          const rests = rest.map(x => Object.keys(x)[0]);
          const userInfo = new UserInfo(id, data.email, data.name, data.role, data.lastSelectedRest, rests);
          observer.next(userInfo);
        });
      });
    });
  };
}
