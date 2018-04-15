import { Component, OnInit } from '@angular/core';
import {Table} from "../table.model";
import {AngularFireList, AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs";
import {AngularFirestore} from "angularfire2/firestore";

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.css']
})

export class ManageTablesComponent implements OnInit {

  private path  = "/RestAlfa/kibutz-222/KitchenStation";
  restRoot  = "RestAlfa";
  resturantID = "kibutz-222";

  table: Table;
  tableID$: Observable<any[]>;
  tableOrdersID$: Observable<any[]>;
  tablesRef: AngularFireList<Worker> = null;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  this.tablesRef = db.list(this.path);
  }

  addTable(tableForm) {
    if(tableForm.valid){

      let pb = document.getElementById("txtpBottom") as HTMLInputElement;
      let pl = document.getElementById("txtpLeft") as HTMLInputElement;
      let pr = document.getElementById("txtpRight") as HTMLInputElement;
      let pt = document.getElementById("txtpTop") as HTMLInputElement;
      let ps = document.getElementById("txtSize") as HTMLInputElement;

      this.afs.collection(this.restRoot + "/" + this.resturantID + "/Tables").doc(this.table.id).set({
        id: this.table.id,
        acceabilty: Boolean(this.table.acceabilty),
        pBottom: parseInt(pb.value),
        pLeft: parseInt(pl.value),
        pRight: parseInt(pr.value),
        pTop: parseInt(pt.value),
        size: parseInt(ps.value),
        smoking: Boolean(this.table.smoking),
        status: String(this.table.status),
      });
      this.afs.collection(this.restRoot + "/" + this.resturantID + "/TablesOrders").doc(this.table.id).set({})
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
    } //else{
      //this.checkValidFields(tableForm);
    //}
    //this.table = new Table();
  }

  ngOnInit() {

    this.table = new Table();

    console.log("start");

    this.tableID$ =  this.afs.collection(this.restRoot).doc(this.resturantID).collection("Tables")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        });
    this.tableOrdersID$ =  this.afs.collection('RestAlfa').doc("kibutz-222").collection("TablesOrders")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        });
  }

}
