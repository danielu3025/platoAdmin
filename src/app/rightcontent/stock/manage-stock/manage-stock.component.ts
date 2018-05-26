import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {RawMaterial} from '../stock.model';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})

export class ManageStockComponent implements OnInit {

  private path = '/RestAlfa/mozes-333/KitchenStation';
  restRoot = 'RestAlfa';
  resturantID = 'mozes-333';

  test: any;
  rawMaterial: RawMaterial;
  rawMaterial$: Observable<any[]>;
  // units$: Observable<any>;
  rawMaterialRef: AngularFireList<RawMaterial> = null;
  units: any;
  unitG: any;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.rawMaterialRef = db.list(this.path);
  }

  addRawMaterial(RawMaterialForm) {
    console.log('formUpdate-> ', RawMaterialForm.valid);
    console.log('bind--> ', this.rawMaterial);

    const amount = document.getElementById('txtAmount') as HTMLInputElement;

    const newRaw = {
      'name': this.rawMaterial.name,
      'amount': parseInt(amount.value),
      'type': this.rawMaterial.type,
      'unit': this.rawMaterial.units
    };

    const valueJson = {'value': newRaw};

    if (RawMaterialForm.valid) {
      this.afs.collection(this.restRoot + '/' + this.resturantID + '/WarehouseStock').doc(this.rawMaterial.id).set(valueJson)
        .then(function () {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    }
  }

  updateRawMaterial(RawMaterialForm) {
    const amount = document.getElementById('txtAmount') as HTMLInputElement;

    const newRaw = {
      'name': this.rawMaterial.name,
      'amount': parseInt(amount.value),
      'type': this.rawMaterial.type,
      'unit': this.rawMaterial.units
    };

    const valueJson = {'value': newRaw};

    console.log('formUpdate-> ', RawMaterialForm);
    this.afs.collection(this.restRoot + '/' + this.resturantID + '/WarehouseStock').doc(this.rawMaterial.id).set({valueJson})
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  deleteRawMaterial(RawMaterialName) {
    this.afs.collection(this.restRoot + '/' + this.resturantID + '/WarehouseStock').doc(RawMaterialName).delete()
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  ngOnInit() {

    this.rawMaterial = new RawMaterial;
    this.afs.collection('Globals').doc('Units').valueChanges()
      .subscribe(data => {
        this.unitG = data;
      });

    this.rawMaterial$ = this.afs.collection(this.restRoot).doc(this.resturantID).collection('WarehouseStock')
      .snapshotChanges().pipe(
        map(data => {
          return data.map(x => ({id: x.payload.doc.id, ...x.payload.doc.data()}));
        }));

    //   this.afs.doc('Globals/Units').valueChanges()
    //       .subscribe(data =>{
    //           this.units = data;
    //           let x : Object = data;
    //       });

  }

}




