import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
// import {Worker} from "../staff.model";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFirestore} from "angularfire2/firestore";
import {FormGroup, FormControl, Validators} from "@angular/forms";
//import {Observable} from "rxjs";
//
@Component({
  selector: 'app-create-staff-form',
  templateUrl: './create-staff-form.component.html',
  styleUrls: ['./create-staff-form.component.css']
})
//
// export interface Worker { firstName: string; lastName: string; role: string;}
//



export class CreateStaffFormComponent {
  @ViewChild('txtWorkerid') txtWorkerid: ElementRef;
  @ViewChild('txtWorkerFirstName') txtWorkerFirstName: ElementRef;
  @ViewChild('txtWorkerLastName') txtWorkerLastName: ElementRef;
  @ViewChild('txtWorkerRole') txtWorkerRole: ElementRef;

  workerId: string = this.txtWorkerid.nativeElement.value;
  workerFirstName: string = this.txtWorkerFirstName.nativeElement.value;
  workerLastName: string = this.txtWorkerLastName.nativeElement.value;
  workerRole: string = this.txtWorkerid.nativeElement.value;

  newWorkerForm : FormGroup;

//   workers$:  Observable<any[]>;
  workersRef: AngularFireList<Worker> = null;
//   constructor(public afs: AngularFirestore, db: AngularFirestore) {
//     this.workersRef = db.list(this.path);
//   }

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    //this.workersRef = db.list(this.path);

  }


  addWorker() {


    this.afs.collection("Rests/RestID/Workers").doc(this.workerId).set({
      firstName: this.workerFirstName,
      lastName: this.workerLastName,
      role: this.workerRole
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });


    // todo: update function is like "set"

    // todo: remove to delete function
    this.afs.collection("Rests/RestID/Workers").doc("barman").delete()
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
  }

  validateWorkerFields(){
    let flag = true;

  }

  ngOnInit() {
    this.newWorkerForm = new FormGroup({
      txtWorkerid: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]")
      ])
    });

  }

}
