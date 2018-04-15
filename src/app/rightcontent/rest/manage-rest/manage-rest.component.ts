import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Rest} from "../rest.model";

@Component({
  selector: 'app-manage-rest',
  templateUrl: './manage-rest.component.html',
  styleUrls: ['./manage-rest.component.css']
})
export class ManageRestComponent implements OnInit {

  private path  = "/RestAlfa/kibutz-222/KitchenStation";
  restRoot  = "RestAlfa";
  resturantID = "kibutz-222";

  rest: Rest;
  restID$: Observable<any[]>;
  restRef: AngularFireList<Rest> = null;
  workingDays: any[] = [];
  restList:any[] = [];
  subMenus: object[];
  subMenuG:any;
  selectedSubMenus: any[] = [];

    workingDay = [
        {
            "endHour": "22:45",
            "startingHour": "10:30"
        },
        {
            "endHour": "22:45",
            "startingHour": "10:30"
        },
        {
            "endHour": "22:45",
            "startingHour": "10:30"
        },
        {
            "endHour": "22:45",
            "startingHour": "10:30"
        },
        {
            "endHour": "22:45",
            "startingHour": "10:30"
        },
        {
            "endHour": "22:45",
            "startingHour": "10:30"
        },
        {
            "endHour": "22:45",
            "startingHour": "10:30"
        }
    ];

    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.restRef = db.list(this.path);
  }

  addRest(restForm) {

    //console.log("formUpdate-> ", restForm.valid);
    console.log("WD--> ", this.workingDay);

    if (restForm.valid) {
        let a;
        let s;

        let accObj = document.getElementById('txtAccesability') as HTMLSelectElement;
        if(accObj.value =='true'){
            a = true;
        }else{
            a = false;
        }

        let smokObj = document.getElementById('txtSmoking') as HTMLSelectElement;
        if(smokObj.value =='true'){
            s =  true;
        }else{
            s =  false;
        }

      this.afs.collection(this.restRoot).doc(this.resturantID).set({
        accesability: this.rest.accesability,
        address: a,
        location : this.rest.location,
        name: this.rest.name,
        phone: this.rest.phone,
        picture: this.rest.picture,
        rank : this.rest.rank,
        smoking: s,
         type: this.rest.type

      }).then(function () {
            console.log("Document successfully written!");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
          });

        let num: number = 0;
        for (let num = 0; num <= 6; num++) {
            this.afs.collection(this.restRoot + "/" + this.resturantID + "/WorkingDays/")
                .doc(num.toLocaleString())
                .set(this.workingDay[num]);
        }

        let submenusJson = {"list":this.selectedSubMenus} ;
        this.afs.collection(this.restRoot + "/" + this.resturantID + "/restGlobals/")
            .doc("subMenus").set(submenusJson);
    }

  }

  updateRest(restForm) {
    this.afs.collection(this.restRoot).doc(this.resturantID).set({
      accesability: this.rest.accesability,
      address: this.rest.address,
      location : this.rest.location,
      name: this.rest.name,
      phone: this.rest.phone,
      picture: this.rest.picture,
      rank : this.rest.rank,
      smoking: this.rest.smoking,
        type: this.rest.type,
    })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      let num:number = 0;
      for(num=0;num<=6;num++) {
          // this.afs.collection("/Restaurants/" + this.rest.id + "/WorkingDays/")
          //     .doc("num").set(
          //    // this.workingDay
          // );
      }
  }

  deleteRest(restId){
    this.afs.collection(this.restRoot).doc(restId).delete()
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
  }

    // add selected subMenus to array
    addSubMenus(id) {
        console.log("id-> ", id);
        this.selectedSubMenus.push(id);
    }

  ngOnInit() {
          this.rest = new Rest();
          console.log("start");
          this.afs.collection(this.restRoot)
              .snapshotChanges()
              .map(data => {
                  return data.map(subData => {
                      console.log("main-> ", subData.payload.doc.data());

                      this.restList.push({id:subData.payload.doc.id, ...subData.payload.doc.data()});
                      this.afs.collection(this.restRoot + "/" +subData.payload.doc.id + "/WorkingDays").snapshotChanges()
                          .map(item => {
                              this.workingDays.push(item.map(result => ({
                                  [subData.payload.doc.id]:{
                                      ...result.payload.doc.data()
                                  }
                              })))
                          }).subscribe()})
              }).subscribe(mainObj => {
              console.log("this.restList=> ", this.restList);
          });

      // get all subMenu from db
      this.afs.doc('Globals/SubMenus').valueChanges()
          .subscribe(data =>{
              this.subMenuG = data;
          });
      }

}
