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
  private path  = "/Restaurants/Mozes-333";

  table: Table;
  tableID$: Observable<any[]>;
  tableOrdersID$: Observable<any[]>;
  tablesRef: AngularFireList<Worker> = null;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  this.tablesRef = db.list(this.path);
  }

  addTable(tableForm) {
    console.log("formUpdate-> ", tableForm.valid);
    console.log("bind--> ",this.table);

    if(tableForm.valid){
      this.afs.collection("Restaurants/Mozes-333/Tables").doc(this.table.id).set({
        acceabilty: this.table.acceabilty,
        pBottom: this.table.pBottom,
        pLeft: this.table.pLeft,
        pRight: this.table.pRight,
        pTop: this.table.pTop,
        size: this.table.size,
        smoking: this.table.smoking,
        status: this.table.status,
        //amount: this.table.amount
      });
      this.afs.collection("Restaurants/Mozes-333/TablesOrders").doc(this.table.id).set({})
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
    } //else{
      //this.checkValidFields(tableForm);
    //}
  }

  ngOnInit() {

    this.table = new Table();

    console.log("start");

    this.tableID$ =  this.afs.collection('Restaurants').doc("Mozes-333").collection("Tables")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        });
    this.tableOrdersID$ =  this.afs.collection('Restaurants').doc("Mozes-333").collection("TablesOrders")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        });
  }

}
