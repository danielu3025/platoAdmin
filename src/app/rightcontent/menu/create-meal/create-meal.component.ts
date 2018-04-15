import { Component, OnInit } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {RawMaterial} from "../../stock/stock.model";
import * as _ from 'lodash';
import {Grocery, Dish, Meal} from "../meal.model";
import {forEach} from "@angular/router/src/utils/collection";
import {log} from "util";

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  private path  = "/RestAlfa/kibutz-222/KitchenStation";
  restRoot  = "RestAlfa";
  resturantID = "kibutz-222";

  selectedRawMaterial: any[] =[];
  selectedGrocery: any[] =[];
  selectedDish: any[] =[];
  rawMaterial: Object[];
  rawMaterialRef: AngularFireList<RawMaterial> = null;
  gro: Grocery = new Grocery();
  dish: Dish = new Dish();
  meal: Meal = new Meal();
  cookingTypeG:any;
  categoryG:any;
  subMenuG:any;
  raw: RawMaterial = new RawMaterial();
  grocery: Object[];
  dishes: Object[];

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.rawMaterialRef = db.list(this.path);
  }


    addGrocery(fRawMaterial) {
        //console.log("formUpdate-> ", fRawMaterial.valid);
        console.log("this.gro--> ", this.gro);
        console.log("selectedRawMaterial--> ", this.selectedRawMaterial);
        let obj = [];
        let json:any ={};

        this.selectedRawMaterial.forEach((item)=>{
             let keyy =(Object.keys(item))[0];
             console.log("key-->" , keyy);
             let val = parseInt(item[keyy], 10);
             console.log("val-->" , val);
             json[keyy]=val;
        });

        if(fRawMaterial.valid) {
            let ct = document.getElementById("txtCookingTime") as HTMLInputElement;
            this.afs.collection(this.restRoot + "/" + this.resturantID + "/Grocery/").doc(this.gro.name).set({
                name:this.gro.name,
                cookingTime: parseInt(ct.value),
                cookingType: this.gro.cookingType,
                rawMaterial :json
            })
            .then(function () {
                console.log("Document successfully written!");

            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

        }
    }

    addDish(fDish) {
        console.log("bind--> ", this.gro);
        console.log("selectedGrocery--> ", this.selectedGrocery);

        if(fDish.valid) {

            this.afs.collection(this.restRoot + "/" + this.resturantID + "/Dishes").doc(this.dish.name).set({
                name:this.dish.name,
                description: this.dish.description,
                totalTime: this.dish.totalTime,
                status: 0,
                category: this.dish.category,
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
            this.selectedGrocery.forEach((item) => {
                let groObj = {"id":item.id};
                this.afs.collection(this.restRoot + "/" + this.resturantID + "/Dishes/"+this.dish.name+"/grocery").doc(item.id)
                    .set(groObj)
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            })

        }
    }

    addMeal(fMeal) {
        console.log("meal--> ", this.meal);
        console.log("selectedDish--> ", this.selectedDish);

        let v;
        let d;
        let g;

        let vegObj = document.getElementById('drpIsVegi') as HTMLSelectElement;
        if(vegObj.value =='true'){
            v = true;
        }else{
            v = false;
        }

        let dairObj = document.getElementById('drpIsDairy') as HTMLSelectElement;
        if(dairObj.value =='true'){
            d =  true;
        }else{
            d =  false;
        }

        let glotenObj = document.getElementById('drpIsGlotenFree') as HTMLSelectElement;
        if(glotenObj.value =='true'){
            g = true;
        }else{
            g =  false;
        }

        if(fMeal.valid) {

            let pm = document.getElementById("txtPrice") as HTMLInputElement;

            this.afs.collection(this.restRoot + "/" + this.resturantID + "/Meals").doc(this.meal.name).set({
                name:this.meal.name,
                description: this.meal.description,
                dairy:d ,
                price: parseInt(pm.value),
                subMenus: this.meal.subMenus,
                vegan: v,
                glotenFree:g,
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                 console.error("Error writing document: ", error);
            });

            this.selectedDish.forEach((item) => {
                console.log("item->>>", item);
                let tempobj = {"id":item.id};
                this.afs.collection(this.restRoot + "/" + this.resturantID + "/Meals/" + this.meal.name + "/dishes")
                    .doc(item.name).set(tempobj)
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            })
        }
    }

  ngOnInit() {

    console.log("start");

    // get all RawMaterial from db
     this.afs.collection(this.restRoot).doc(this.resturantID).collection("WarehouseStock")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        })
        .subscribe(data => {
             this.rawMaterial = data;
             console.log("maltreats::", this.rawMaterial);
            // rawMaterialJson = JSON.stringify(rawMaterial);
            // console.log("ssdsd- >", this.rawMaterial);
        });

    // get all CookingType from db
     this.afs.doc('Globals/CookingType').valueChanges()
          .subscribe(data =>{
              this.cookingTypeG = data;
          });

      // get all categories from db
      this.afs.doc('Globals/Category').valueChanges()
          .subscribe(data =>{
              this.categoryG = data;
          });

     //get all Grocery from db
      this.afs.collection(this.restRoot + "/" + this.resturantID + "/Grocery")
          .snapshotChanges()
          .map(grocery => {
              return grocery.map(grocery => ({id:grocery.payload.doc.id, ...grocery.payload.doc.data()}));
          })
          .subscribe( grocery => {
              this.grocery = grocery;
              console.log("nana- >",  this.grocery)
          });

      //get all dishes from db
      this.afs.collection(this.restRoot + "/" + this.resturantID + "/Dishes")
          .snapshotChanges()
          .map(dish => {
              return dish.map(dish => ({id:dish.payload.doc.id, ...dish.payload.doc.data()}));
          })
          .subscribe( dish => {
              this.dishes = dish;
              console.log("dishes- >",  this.dishes)
          });

  }

    // add selected rawMaterials to object and parsing to int
    addToGrocery(id) {
        this.selectedRawMaterial = [];
         this.rawMaterial.forEach((item) => {

            console.log(item["id"], id);
             if(item["id"] == id){

                 console.log(item);
                 console.log((item["id"]+'inp1').toLocaleString());
                 let input = document.getElementById(item["id"]+'inp1') as HTMLInputElement;
                 let inp1val =  input.value;
                 console.log("inp1val-< ", inp1val);
                 // if(inp1val == ""){
                 //     alert("please insert amount first");
                 // }
                 // else {
                    let content = {[item["id"]]:parseInt(inp1val) };
                     this.selectedRawMaterial.push(content);
                     console.log("rawMaterialList->>" ,this.selectedRawMaterial);

             }
         })
    }

    // add selected groceries to object
    addToDish(id) {
        console.log("id-> ", id);
        console.log("groc-> ", this.grocery);
        this.grocery.forEach((item) => {
            if(item["id"] == id){
                this.selectedGrocery.push(item);
            }
        });
    }

    // add selected dishes to object
    addToMeal(id) {
        console.log("id-> ", id);
        console.log("dish-> ", this.dishes);
        this.dishes.forEach((item) => {
            if(item["id"] == id){
                this.selectedDish.push(item);
            }
        });
    }
}
