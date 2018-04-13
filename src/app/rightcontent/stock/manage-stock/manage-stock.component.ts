import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {AngularFireList, AngularFireDatabase} from "angularfire2/database";
import {RawMaterial} from "../stock.model";
import {Validators, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})

export class ManageStockComponent implements OnInit {
    private path  = "/Restaurants/Mozes-333";

    test:any;
    rawMaterial: RawMaterial;
    rawMaterial$: Observable<any[]>;
    // units$: Observable<any>;
    rawMaterialRef: AngularFireList<RawMaterial> = null;
    units:any;

    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
        this.rawMaterialRef = db.list(this.path);
    }

  addRawMaterial(RawMaterialForm) {
    console.log("formUpdate-> ", RawMaterialForm.valid);
    console.log("bind--> ",this.rawMaterial);

      if(RawMaterialForm.valid){
      this.afs.collection("/Restaurants/Mozes-333/WarehouseStock").doc(this.rawMaterial.id).set({
        name: this.rawMaterial.name,
        amount: this.rawMaterial.amount,
        redLine: this.rawMaterial.redLine,
        type: this.rawMaterial.type,
        //units: this.rawMaterial.units
      })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
    } //else{
      //this.checkValidFields(RawMaterialForm);
    //}
  }
  //
  // checkValidFields(workerForm){
  //   if(workerForm.controls.txtId.invalid){
  //     this.txtWorkerIdErrorClass = true;
  //   }else{
  //     this.txtWorkerIdErrorClass = false;
  //   }
  //
  //   if(workerForm.controls.txtFirstName.invalid){
  //     this.txtWorkerFirstNameErrorClass = true;
  //   }else {
  //     this.txtWorkerFirstNameErrorClass = false;
  //   }
  //   if(workerForm.controls.txtLastName.invalid) {
  //     this.txtWorkerLastNameErrorClass = true;
  //   }else {
  //     this.txtWorkerLastNameErrorClass = false;
  //   }
  //   if(workerForm.controls.txtRole.invalid){
  //     this.txtWorkerRoleErrorClass = true;
  //   }else {
  //     this.txtWorkerRoleErrorClass = false;
  //   }
  // }
  //
  updateRawMaterial(RawMaterialForm) {
    console.log("formUpdate-> ", RawMaterialForm);
    this.afs.collection("/Restaurants/Mozes-333/WarehouseStock").doc(this.rawMaterial.id).set({
        name: this.rawMaterial.name,
        amount: this.rawMaterial.amount,
        redLine: this.rawMaterial.redLine,
        type: this.rawMaterial.type,
        // units: this.rawMaterial.units
    })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
  }

  deleteRawMaterial(RawMaterialId){
    this.afs.collection("/Restaurants/Mozes-333/WarehouseStock").doc(RawMaterialId).delete()
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
  }

  ngOnInit(){

       this.rawMaterial = new RawMaterial;

      console.log("start");

      this.afs.collection('Globals').doc("Units").valueChanges()
          .subscribe(data =>
          {
              this.test = data;
          });

      this.rawMaterial$ =  this.afs.collection('Restaurants').doc("Mozes-333").collection("WarehouseStock")
          .snapshotChanges()
          .map(data => {
              return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
          });

      this.afs.doc('Globals/Units').valueChanges()
          .subscribe(data =>{
              this.units = data;
              let x : Object = data;
          });

      }

}




