import { Component, OnInit } from '@angular/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {RawMaterial} from '../../stock/stock.model';
import * as _ from 'lodash';
import {Grocery, Dish, Meal} from '../meal.model';
import {forEach} from '@angular/router/src/utils/collection';
import {log} from 'util';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  private path  = '/RestAlfa/mozes-333/KitchenStation';
  restRoot  = 'RestAlfa';
  resturantID = 'mozes-333';

  selectedRawMaterial: any[] = [];
  selectedGrocery: any[] = [];
  selectedDish: any[] = [];
  rawMaterial: Object[];
  rawMaterialRef: AngularFireList<RawMaterial> = null;
  gro: Grocery = new Grocery();
  dish: Dish = new Dish();
  meal: Meal = new Meal();
  cookingTypeG: any;
  categoryG: any;
  subMenuG: any;
  mealTypeG: any;
  raw: RawMaterial = new RawMaterial();
  grocery: Object[];
  dishes: Object[];
  rawMaterialToMeal: Object[];
  dishesToGroceries: Object[];

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.rawMaterialRef = db.list(this.path);
    this.rawMaterialToMeal = [];
    this.selectedRawMaterial = [];
    this.dishesToGroceries = [];
  }

    addGrocery(fRawMaterial) {
        console.log('this.gro--> ', this.gro);
        console.log('selectedRawMaterial--> ', this.selectedRawMaterial);
        const obj = [];
        const json: any = {};

        this.selectedRawMaterial.forEach((item) => {
             const keyy = (Object.keys(item))[0];
             console.log('key-->' , keyy);
             const val = parseInt(item[keyy], 10);
             console.log('val-->' , val);
             json[keyy] = val;
        });

        if (fRawMaterial.valid) {
            const ct = document.getElementById('txtCookingTime') as HTMLInputElement;
            this.afs.collection(this.restRoot + '/' + this.resturantID + '/Grocery/').doc(this.gro.name).set({
                name: this.gro.name,
                cookingTime: parseInt(ct.value),
                cookingType: this.gro.cookingType,
                rawMaterial : json
            })
            .then(function () {
                console.log('Document successfully written!');

            })
            .catch(function (error) {
                console.error('Error writing document: ', error);
            });

        }
    }

    // add dish to db
    addDish(fDish) {
        if (fDish.valid) {
            this.afs.collection(this.restRoot + '/' + this.resturantID + '/Dishes').doc(this.dish.name).set({
                name: this.dish.name,
                description: this.dish.description,
                totalTime: this.dish.totalTime,
                status: 0,
                category: this.dish.category,
            })
            .then(function () {
                console.log('Document successfully written!');
            })
            .catch(function (error) {
                console.error('Error writing document: ', error);
            });
            console.log(this.selectedGrocery);
            this.selectedGrocery.forEach(item => {
                console.log('item->' , item);
                console.log('dish', this.dish.name);
                console.log('item', item[Object.keys(item)[0]]);
                const groObj = {'id': item[Object.keys(item)[0]]};
                console.log('groObj->', groObj.id);
                this.afs.collection(this.restRoot + '/' + this.resturantID + '/Dishes/' + this.dish.name + '/' + 'grocery')
                .doc(item[Object.keys(item)[0]]).set(groObj)
                .then(function () {
                    console.log('Document successfully written!');
                })
                .catch(function (error) {
                    console.error('Error writing document: ', error);
                });
            });
        }
    }

    // add meal to db
    addMeal(fMeal) {
        console.log('meal--> ', this.meal);
        console.log('selectedDish--> ', this.selectedDish);

        let v;
        let d;
        let g;

        const vegObj = document.getElementById('drpIsVegi') as HTMLSelectElement;
        if (vegObj.value == 'true') {
            v = true;
        } else {
            v = false;
        }

        const dairObj = document.getElementById('drpIsDairy') as HTMLSelectElement;
        if (dairObj.value == 'true') {
            d =  true;
        } else {
            d =  false;
        }

        const glotenObj = document.getElementById('drpIsGlotenFree') as HTMLSelectElement;
        if (glotenObj.value == 'true') {
            g = true;
        } else {
            g =  false;
        }

        if (fMeal.valid) {
            const pm = document.getElementById('txtPrice') as HTMLInputElement;
            this.afs.collection(this.restRoot + '/' + this.resturantID + '/Meals').doc(this.meal.name).set({
                name: this.meal.name,
                description: this.meal.description,
                dairy: d ,
                price: parseInt(pm.value),
                subMenus: this.meal.subMenus,
                vegan: v,
                glotenFree: g,
                displayed: true,
                mealType: this.meal.mealType
            })
            .then(function () {
                console.log('Document successfully written!');
            })
            .catch(function (error) {
                 console.error('Error writing document: ', error);
            });
            this.selectedDish.forEach((item) => {
                console.log('item->>>', item);
                const dishObj = {'id': item[Object.keys(item)[0]]};
                console.log('dishObj->>', dishObj);
                console.log('item[Object.keys(item)[0]]', item[Object.keys(item)[0]]);
                this.afs.collection(this.restRoot + '/' + this.resturantID + '/Meals/' + this.meal.name + '/dishes')
                    .doc(item[Object.keys(item)[0]]).set(dishObj)
                    .then(function () {
                        console.log('Document successfully written!');
                        alert('Meal successfully added');
                    })
                    .catch(function (error) {
                        console.error('Error writing document: ', error);
                    });
            });
            this.rawMaterialToMeal.forEach(rawMat => {
                const inputRedLine = document.getElementById(rawMat['id'] + 'inp2') as HTMLInputElement;
                const inpRedLine =  inputRedLine.value;
                const checkBoximportance = document.getElementById(rawMat['id'] + 'check') as any;
                const CBImportance =  checkBoximportance.checked;
                console.log('CBImportance-> ', CBImportance);
                this.afs.doc(this.restRoot + '/' + this.resturantID + '/WarehouseStock/' + rawMat['id'])
                    .collection('Meals').doc(this.meal.name)
                    .set({'redLine' : inpRedLine, 'importance' : CBImportance, 'menu' : true});
                });
            }

    }

  ngOnInit() {

    // get all RawMaterial from db
     this.afs.collection(this.restRoot).doc(this.resturantID).collection('WarehouseStock')
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id: data.payload.doc.id, ...data.payload.doc.data()}));
        })
        .subscribe(data => {
             this.rawMaterial = data;
             console.log('maltreats::', this.rawMaterial);
        });

    // get all CookingType from db
     this.afs.doc('Globals/CookingType').valueChanges()
          .subscribe(data => {
              this.cookingTypeG = data;
          });

      // get all categories from db
      this.afs.doc('Globals/Category').valueChanges()
          .subscribe(data => {
              this.categoryG = data;
          });

      // get all subMenu from db
      this.afs.doc('Globals/SubMenus').valueChanges()
          .subscribe(data => {
              this.subMenuG = data;
          });

    // get all mealTypes from db
      this.afs.doc('Globals/mealTypes').valueChanges()
      .subscribe(data => {
          this.mealTypeG = data;
      });

     //get all Grocery from db
      this.afs.collection(this.restRoot + '/' + this.resturantID + '/Grocery')
          .snapshotChanges()
          .map(grocery => {
              return grocery.map(grocery => ({id: grocery.payload.doc.id, ...grocery.payload.doc.data()}));
          })
          .subscribe( grocery => {
              this.grocery = grocery;
              console.log('nana- >',  this.grocery);
          });

      //get all dishes from db
      this.afs.collection(this.restRoot + '/' + this.resturantID + '/Dishes')
          .snapshotChanges()
          .map(dish => {
              return dish.map(dish => ({id: dish.payload.doc.id, ...dish.payload.doc.data()}));
          })
          .subscribe( dish => {
              this.dishes = dish;
              console.log('dishes- >',  this.dishes);
          });

  }

    // add selected rawMaterials to object and parsing to int
    addToGrocery(id) {

         this.rawMaterial.forEach((item) => {
             if (item['id'] == id) {
                 const idRawMa = item['id'] + '_rawMa';
                 const checkBoxRaw = document.getElementById(idRawMa) as HTMLInputElement;
                 const CBIRaw =  checkBoxRaw.checked;
                 console.log('checkbox: ' , CBIRaw);
                 if (CBIRaw) {
                    let test = 0;
                     const input = document.getElementById(item['id'] + 'inp1') as HTMLInputElement;
                     const inp1val = input.value;
                     for (let i = 0; i < this.selectedRawMaterial.length; i++ ) {
                         console.log(Object.keys(this.selectedRawMaterial[i])[0]);
                         if (Object.keys(this.selectedRawMaterial[i])[0] === id) {
                             //updating checked rawMaterial input
                             this.selectedRawMaterial[i][id] = inp1val;
                             test = 1;
                             break;
                         }
                     }
                     console.log('inp1val-< ', inp1val);
                     if (test == 0) {
                         const content = {[item['id']]: parseInt(inp1val)};
                         //adding checked rawMaterial
                         this.selectedRawMaterial.push(content);
                     }

                     console.log('rawMaterialList->>', this.selectedRawMaterial);
                 } else {
                     for (let i = 0; i < this.selectedRawMaterial.length; i++ ) {
                         console.log(Object.keys(this.selectedRawMaterial[i])[0]);
                         if (Object.keys(this.selectedRawMaterial[i])[0] === id) {
                             //deleting false checked rawMaterial
                            this.selectedRawMaterial.splice(i, 1);
                         }
                     }
                 }
             }
         });
    }

    // add selected groceries to object
    addToDish(id) {
        this.grocery.forEach((item) => {
            if (item['id'] == id) {
                const idGroc = item['id'] + '_grocery';
                console.log('id-> ', id);
                const checkBoxGro = document.getElementById(idGroc) as HTMLInputElement;
                const CBIGro =  checkBoxGro.checked;
                console.log('checkbox: ' , CBIGro);
                if (CBIGro) {
                    let test = 0;
                     const input = document.getElementById(item['id'] + 'inp3') as HTMLInputElement;
                     const inp1val = input.value;
                     for (let i = 0; i < this.selectedGrocery.length; i++ ) {
                         console.log(Object.keys(this.selectedGrocery[i])[0]);
                         if (Object.keys(this.selectedGrocery[i])[0] === id) {
                             //updating checked rawMaterial input
                             this.selectedGrocery[i][id] = inp1val;
                             test = 1;
                             break;
                         }
                     }
                     console.log('inp1val-< ', inp1val);
                     if (test == 0) {
                         console.log('item:' , item);
                         const content = {[item['id']]: inp1val};
                         //adding checked rawMaterial
                         this.selectedGrocery.push(content);
                     }
                } else {
                    console.log('selectedgrocery:' , this.selectedGrocery);
                    for (let i = 0; i < this.selectedGrocery.length; i++ ) {
                        console.log(Object.keys(this.selectedGrocery[i])[0]);
                        if (Object.keys(this.selectedGrocery[i])[0] === id) {
                            //deleting false checked rawMaterial
                           this.selectedGrocery.splice(i, 1);
                        }
                    }
                 }
                 console.log('rawMaterialList->>', this.selectedGrocery);
            }
        });
    }

    // add selected dishes to object
    addToMeal(id) {
        console.log('id-> ', id);
        console.log('dish-> ', this.dishes);
        this.dishes.forEach((item) => {
            if (item['id'] == id) {
                const idDish = item['id'] + '_dish';
                console.log('id-> ', id);
                const checkBoxDish = document.getElementById(idDish) as HTMLInputElement;
                const CBIDish =  checkBoxDish.checked;
                console.log('checkbox: ' , CBIDish);
                if (CBIDish) {
                     let test = 0;
                     const input = document.getElementById(item['id'] + 'inp1') as HTMLInputElement;
                     const inp1val = input.value;
                     for (let i = 0; i < this.selectedDish.length; i++ ) {
                         console.log(Object.keys(this.selectedDish[i])[0]);
                         if (Object.keys(this.selectedDish[i])[0] === id) {
                             //updating checked rawMaterial input
                             this.selectedDish[i][id] = inp1val;
                             test = 1;
                             break;
                         }
                     }
                     console.log('inp1val-< ', inp1val);
                     if (test == 0) {
                         const content = {[item['id']]: inp1val};
                         //adding checked rawMaterial
                         this.selectedDish.push(content);
                         this.afs.collection(this.restRoot + '/' + this.resturantID + '/' + 'Dishes/' + id + '/grocery')
                         .snapshotChanges()
                         .subscribe(data => {
                             const grocery = [];
                             data.forEach(docs => {
                                 this.afs.doc(this.restRoot + '/' + this.resturantID + '/' + 'Grocery/' + docs.payload.doc.data().id)
                                     .snapshotChanges()
                                     .subscribe(groc => {
                                         this.rawMaterialToMeal.push({'id' : Object.keys(groc.payload.data().rawMaterial)[0]});
                                         this.dishesToGroceries.push({id: item['id'], content: Object.keys(groc.payload.data().rawMaterial)[0]});
                                     });
                             });

                             console.log(this.rawMaterialToMeal);
                            });
                        }
                    } else {
                        console.log('selectedDish:' , this.selectedDish);
                        for (let i = 0; i < this.selectedDish.length; i++ ) {
                            console.log(Object.keys(this.selectedDish[i])[0]);
                            if (Object.keys(this.selectedDish[i])[0] === id) {
                                for (let k = 0; k < this.dishesToGroceries.length; k++) {
                                    if (this.dishesToGroceries[k]['id'] == id) {
                                        this.dishesToGroceries.forEach(grocerysAfterSplice => {
                                            this.dishesToGroceries.splice(k, 1);
                                            console.log('dishesToGroceries=>' , this.dishesToGroceries);
                                        });
                                    }
                                }
                                this.rawMaterialToMeal = [];
                                console.log('this.rawMaterialToMeal->>', this.rawMaterialToMeal);
                                this.dishesToGroceries.forEach(grocerysAfter => {
                                    this.rawMaterialToMeal.push({id: grocerysAfter['content']});
                                });
                                console.log(this.dishesToGroceries);
                                //deleting false checked rawMaterial
                               this.selectedDish.splice(i, 1);
                               console.log('selectedDish->>', this.selectedDish);
                            }
                        }
                     }
                     console.log('selectedDish->>', this.selectedDish);
                    }
                });
            }
}

