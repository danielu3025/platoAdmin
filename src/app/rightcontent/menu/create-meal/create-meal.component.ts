import { Component, OnInit } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {RawMaterial} from "../../stock/stock.model";
import * as _ from 'lodash';
import {Grocery} from "../meal.model";

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  private path  = "/Restaurants/Mozes-333";
  selectedRawMaterial: any[] =[];
  rawMaterial: Object[];
  rawMaterialRef: AngularFireList<RawMaterial> = null;
  gro: Grocery = new Grocery();

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.rawMaterialRef = db.list(this.path);
  }

    addGrocery(fRawMaterial) {
        //console.log("formUpdate-> ", fRawMaterial.valid);
        console.log("bind--> ", this.gro);
        console.log("bind--> ", this.selectedRawMaterial);
        let obj = [];
        this.selectedRawMaterial.forEach((item) => {
            obj.push({[item.id] : item.value.amount});
        });


        if(fRawMaterial.valid) {
            this.afs.collection("/Rests/Mozes-333/Grocery").doc(this.gro.name).set({
                cookingTime: this.gro.cookingTime,
                cookingType: this.gro.cookingType,
                rawMaterial : {}
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

            // this.afs.collection("/Rests/Mozes-333/Grocery").doc(this.gro.name).collection("rawMaterial").set({
            //     cookingTime: this.gro.cookingTime,
            //     cookingType: this.gro.cookingType
            // })
            //     .then(function () {
            //         console.log("Document successfully written!");
            //     })
            //     .catch(function (error) {
            //         console.error("Error writing document: ", error);
            //     });

        }
        // } //else{
    }

  ngOnInit() {

    console.log("start");

    this.afs.collection('Restaurants').doc("Mozes-333").collection("WarehouseStock")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        })
        .subscribe(data => {

            this.rawMaterial = data;
            console.log("ssdsd- >", this.rawMaterial);
        });
  }

    addToGrocery(id) {
      // console.log(this.rawMaterial);
         this.rawMaterial.forEach((item) => {
             if(item["id"] == id){
                 this.selectedRawMaterial.push(item);
                 console.log(this.selectedRawMaterial);
             }
         })


    }
}
