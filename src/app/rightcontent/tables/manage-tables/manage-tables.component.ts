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
  pb:HTMLInputElement;
  pl:HTMLInputElement;
  pr:HTMLInputElement;
  pt:HTMLInputElement;
  ps:HTMLInputElement;
  restTableList:any[];

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  this.tablesRef = db.list(this.path);
  }

  //add table to db
  addTable(tableForm) {
    if(tableForm.valid){

      this.pb = document.getElementById("txtpBottom") as HTMLInputElement;
      this.pl = document.getElementById("txtpLeft") as HTMLInputElement;
      this.pr = document.getElementById("txtpRight") as HTMLInputElement;
      this.pt = document.getElementById("txtpTop") as HTMLInputElement;
      this.ps = document.getElementById("txtSize") as HTMLInputElement;

      if(this.validTable(parseInt(this.pl.value), parseInt(this.pr.value))) {

        this.afs.collection(this.restRoot + "/" + this.resturantID + "/Tables").doc(this.table.id).set({
          id: this.table.id,
          acceabilty: Boolean(this.table.acceabilty),
          pBottom: parseInt(this.pb.value),
          pLeft: parseInt(this.pl.value),
          pRight: parseInt(this.pr.value),
          pTop: parseInt(this.pt.value),
          size: parseInt(this.ps.value),
          smoking: Boolean(this.table.smoking),
          status: String(this.table.status),
        });
        this.afs.collection(this.restRoot + "/" + this.resturantID + "/TablesOrders").doc(this.table.id).set({})
            .then(function () {
              console.log("Tble successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing table: ", error);
            });
      }
      else {
        console.log("draw failed");
      }
    }
  }

  // update exists table
  updateTable(tableForm) {
    if(tableForm.valid){

      this.pb = document.getElementById("txtpBottom") as HTMLInputElement;
      this.pl = document.getElementById("txtpLeft") as HTMLInputElement;
      this.pr = document.getElementById("txtpRight") as HTMLInputElement;
      this.pt = document.getElementById("txtpTop") as HTMLInputElement;
      this.ps = document.getElementById("txtSize") as HTMLInputElement;

      if(this.validTable(parseInt(this.pl.value), parseInt(this.pr.value))) {

        this.afs.collection(this.restRoot + "/" + this.resturantID + "/Tables").doc(this.table.id).set({
          id: this.table.id,
          acceabilty: Boolean(this.table.acceabilty),
          pBottom: parseInt(this.pb.value),
          pLeft: parseInt(this.pl.value),
          pRight: parseInt(this.pr.value),
          pTop: parseInt(this.pt.value),
          size: parseInt(this.ps.value),
          smoking: Boolean(this.table.smoking),
          status: String(this.table.status),
        });
        this.afs.collection(this.restRoot + "/" + this.resturantID + "/TablesOrders").doc(this.table.id).set({})
            .then(function () {
              console.log("Table successfully update!");
            })
            .catch(function (error) {
              console.error("Could not update table: ", error);
            });
      }
      else {
        console.log("draw failed");
      }
    }
  }


  // delete table from db
  deleteTable(restId){
    this.afs.collection(this.restRoot + "/" + this.resturantID + "/" + "Tables").doc(this.table.id).delete()
        .then(function () {
          console.log("Table successfully deleted!");
        })
        .catch(function (error) {
          console.error("Could not delete table: ", error);
        });
    this.afs.collection(this.restRoot + "/" + this.resturantID + "/" + "TablesOrders").doc(this.table.id).delete()
        .then(function () {
          console.log("Ttable oreder successfully deleted!");
        })
  }

  // a function that checks if table can be drawn
  public validTable(x, y) : boolean {
    let flag: boolean = false;

    for(let i=0; i< this.restTableList.length;i++){
      console.log(this.restTableList[i]);
      if (x >= this.restTableList[i].pLeft) {
        if (y >= this.restTableList[i].pTop) {
          if (x <= this.restTableList[i].pRight) {
            if (y <= this.restTableList[i].pBottom) {
              flag = true;
            }
          }
        }

      }
    }
    return flag;
  }

  // get all tables from db
  getTables(){
    this.afs.collection(this.restRoot).doc(this.resturantID).collection("Tables")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        }).subscribe(tableList => {
      this.restTableList = tableList;
      console.log("this.restTableList=> ", this.restTableList.length);
    });
  }

  ngOnInit() {

    this.table = new Table();

    console.log("start");

    // get all tables from db and print to the screen
    this.tableID$ =  this.afs.collection(this.restRoot).doc(this.resturantID).collection("Tables")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        });

    // open tableOrder when new table is added to db
    this.tableOrdersID$ =  this.afs.collection(this.restRoot).doc(this.resturantID).collection("TablesOrders")
        .snapshotChanges()
        .map(data => {
          return data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
        });

    this.getTables();
  }

}
