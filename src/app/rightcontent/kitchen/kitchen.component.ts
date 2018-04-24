import { Component, OnInit } from '@angular/core';
import {AngularFireList, AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs";
import {AngularFirestore} from "angularfire2/firestore";
import {KitchenStation} from "./kitchen.model";
import {Global} from "../../globals.model";

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  private path  = "/RestAlfa/mozes-333/KitchenStation";
  private restRoot  = "RestAlfa";
  private resturantID = "mozes-333";


  kitchenStation : KitchenStation;
  kitchenStation$: Observable<any[]>;
  kitchenStationRef: AngularFireList<Worker> = null;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.kitchenStationRef = db.list(this.path);
  }

  addKitchenStation(KitchenStationForm) {
    console.log("formUpdate-> ", KitchenStationForm.valid);
    console.log("bind--> ",this.kitchenStation);

    if(KitchenStationForm.valid){
      this.afs.collection(this.restRoot + "/" + this.resturantID + "/KitchenStation/").doc(this.kitchenStation.id).set({
        name: this.kitchenStation.name,
      }).then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
    }
  }

  updateKitchenStation(restForm) {
    console.log("formUpdate-> ", restForm);
    this.afs.collection(this.restRoot + "/" + this.resturantID + "/KitchenStation/").doc(this.kitchenStation.id).set({
      name: this.kitchenStation.name,
    })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }

  deleteKitchenStation(kitchenStationId){
    this.afs.collection(this.restRoot + "/" + this.resturantID + "/KitchenStation/").doc(kitchenStationId).delete()
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
  }

  ngOnInit() {
    this.kitchenStation = new KitchenStation();

    console.log("start");

    this.kitchenStation$ =  this.afs.collection(this.restRoot).doc(this.resturantID).collection("KitchenStation")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        });
  }

}
