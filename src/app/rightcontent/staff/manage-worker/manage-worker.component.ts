import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {Worker} from '../staff.model';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-manage-worker',
  templateUrl: './manage-worker.component.html',
  styleUrls: ['./manage-worker.component.css']
})

export class ManageWorkerComponent implements OnInit {

  private path = '/RestAlfa/mozes-333/KitchenStation';
  restRoot = 'RestAlfa';
  resturantID = 'mozes-333';

  worker: Worker;
  txtWorkerIdErrorClass = false;
  txtWorkerFirstNameErrorClass = false;
  txtWorkerLastNameErrorClass = false;
  txtWorkerRoleErrorClass = false;
  workerID$: Observable<any[]>;
  workersRef: AngularFireList<Worker> = null;


  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.workersRef = db.list(this.path);
  }

  addWorker(workerForm) {
    console.log('formUpdate-> ', workerForm.valid);
    console.log('bind--> ', this.worker);


    if (workerForm.valid) {
      this.afs.collection(this.restRoot + '/' + this.resturantID + '/Workers').doc(this.worker.id).set({
        firstName: this.worker.firstName,
        lastName: this.worker.lastName,
        role: this.worker.role
      })
        .then(function () {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    } else {
      this.checkValidFields(workerForm);
    }
  }

  checkValidFields(workerForm) {
    if (workerForm.controls.txtId.invalid) {
      this.txtWorkerIdErrorClass = true;
    } else {
      this.txtWorkerIdErrorClass = false;
    }

    if (workerForm.controls.txtFirstName.invalid) {
      this.txtWorkerFirstNameErrorClass = true;
    } else {
      this.txtWorkerFirstNameErrorClass = false;
    }
    if (workerForm.controls.txtLastName.invalid) {
      this.txtWorkerLastNameErrorClass = true;
    } else {
      this.txtWorkerLastNameErrorClass = false;
    }
    if (workerForm.controls.txtRole.invalid) {
      this.txtWorkerRoleErrorClass = true;
    } else {
      this.txtWorkerRoleErrorClass = false;
    }
  }

  updateWorker(workerForm) {
    console.log('formUpdate-> ', workerForm);
    this.afs.collection(this.restRoot + '/' + this.resturantID + '/Workers').doc(this.worker.id).set({
      firstName: this.worker.firstName,
      lastName: this.worker.lastName,
      role: this.worker.role
    })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  deleteWorker(workerId) {
    this.afs.collection(this.restRoot + '/' + this.resturantID + '/Workers').doc(workerId).delete()
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  ngOnInit() {

    this.worker = new Worker();

    console.log('start');

    this.workerID$ = this.afs.collection(this.restRoot).doc(this.resturantID).collection('Workers')
      .snapshotChanges().pipe(
        map(data => {
          return data.map(x => ({id: x.payload.doc.id, ...x.payload.doc.data()}));
        }));
  }

}



