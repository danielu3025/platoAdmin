import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {AngularFireList, AngularFireDatabase} from "angularfire2/database";
//import {Worker} from "../staff.model";

@Component({
  selector: 'app-show-all-staff-form',
  templateUrl: './show-all-staff-form.component.html',
  styleUrls: ['./show-all-staff-form.component.css']
})

export class staffmodel {

}

export class ShowAllStaffFormComponent implements OnInit {

  restID$: Observable<any[]>;
  workersRef: AngularFireList<Worker> = null;
  private path  = "/Rests/RestID/Workers";

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.workersRef = db.list(this.path);
  }



  ngOnInit() {

    console.log("start");
    //let w = new Worker();
    //this.workersRef.push(w);
    //this.db.database;
    this.restID$ =  this.afs.collection('Rests').doc("RestID").collection("Workers").valueChanges();
  }

}

// export class Worker{
//   firstName: String = "maya";
//   lastName: String = "yosef";
//   role: String = "waiter";

//}

