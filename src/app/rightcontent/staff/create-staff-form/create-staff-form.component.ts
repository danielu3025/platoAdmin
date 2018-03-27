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

export class CreateStaffFormComponent {
    newWorkerForm : FormGroup;
    txtWorkeridErrorClass:string = "";

//   workers$:  Observable<any[]>;
     workersRef: AngularFireList<Worker> = null;
//   constructor(public afs: AngularFirestore, db: AngularFirestore) {
//     this.workersRef = db.list(this.path);
//   }

    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
        //this.workersRef = db.list(this.path);
  }

  addWorker() {

      if(newWorkerForm.valid){
          this.afs.collection("Rests/RestID/Workers").doc(newWorkerForm.value.txtWorkerid).set({
              firstName: newWorkerForm.value.txtWorkerFirstName,
              lastName: newWorkerForm.value.txtWorkerLastName,
              role: newWorkerForm.value.txtWorkerRole
          })
              .then(function () {
                  console.log("Document successfully written!");
              })
              .catch(function (error) {
                  console.error("Error writing document: ", error);
              });
      }else{
          this.checkValidFields(newWorkerForm);
      }
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

  // updateWorker() {
  //    this.afs.collection("Rests/RestID/Workers").doc(this.workerId).set({
  //      firstName: this.workerFirstName,
  //      lastName: this.workerLastName,
  //      role: this.workerRole
  //    })
  //        .then(function () {
  //         console.log("Document successfully written!");
  //        })
  //       .catch(function (error) {
  //         console.error("Error writing document: ", error);
  //       });
  // }
  //
  // deleteWorker() {
  //   this.afs.collection("Rests/RestID/Workers").doc(this.workerId).delete()
  //       .then(function () {
  //         console.log("Document successfully written!");
  //       })
  //       .catch(function (error) {
  //         console.error("Error writing document: ", error);
  //       });
  // }

    checkValidFields(newWorkerForm){
        if(newWorkerForm.controls.txtWorkerid.invalid){
            this.txtWorkeridErrorClass = "error";
        }
    }

    ngOnInit() {
        this.newWorkerForm = new FormGroup({
            txtWorkerid: new FormControl('', [
                Validators.required
            ]),
            txtWorkerFirstName: new FormControl('', [
                Validators.required
            ]),
            txtWorkerLastName: new FormControl('', [
                Validators.required
            ]),
            txtWorkerRole: new FormControl('', [
                Validators.required
            ])
        });

    }

}

