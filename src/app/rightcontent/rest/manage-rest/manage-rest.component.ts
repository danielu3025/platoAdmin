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

  private path  = "/Rests";
  rest: Rest;
  // txtWorkerIdErrorClass:boolean = false;
  // txtWorkerFirstNameErrorClass:boolean = false;
  // txtWorkerLastNameErrorClass:boolean = false;
  // txtWorkerRoleErrorClass:boolean = false;
  restID$: Observable<any[]>;
  restRef: AngularFireList<Rest> = null;
  //workingDays: any[] = [];
  restList:any[] = [];

    // obj  = {
    //       Sunday : {
    //           'endHour': '',
    //           'startingHour': ''
    //       },
    //       Monday : {
    //           'endHour': '',
    //           'startingHour': ''
    //       },
    //       Tuesday : {
    //           'endHour': '',
    //           'startingHour': ''
    //       },
    //       Wednesday : {
    //           'endHour': '',
    //           'startingHour': ''
    //       },
    //       Thursday : {
    //           'endHour': '',
    //           'startingHour': ''
    //       },
    //       Friday : {
    //           'endHour': '',
    //           'startingHour': ''
    //       },
    //       Saturday : {
    //           'endHour': '',
    //           'startingHour': ''
    //       }
    //   };

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

      // setOpenningHour() {
      //      sunday: workingDay.Sunday,
      //      monday: workingDay.Munday,
      //      tuesday: workingDay.Tuesday,
      //      wednesday: workingDay.Wednesday,
      //      thursday: workingDay.Thursday,
      //      friday: workingDay.Friday,
      //      saturday: workingDay.Saturday
      //
      // }

    console.log("formUpdate-> ", restForm.valid);
    console.log("bind--> ", this.rest);

    if (restForm.valid) {
      this.afs.collection("Rests").doc(this.rest.id).set({
        accesability: this.rest.accesability,
        address: this.rest.address,
        location : this.rest.location,
        name: this.rest.name,
        phone: this.rest.phone,
        picture: this.rest.picture,
        rank : this.rest.rank,
        smoking: this.rest.smoking,
        restType: this.rest.restType

      }).then(function () {
            console.log("Document successfully written!");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
          });

            let num: number = 0;
            for (num = 0; num <= 6; num++) {
                this.afs.collection("/Rests/" + this.rest.id + "/WorkingDays/")
                    .doc(num.toLocaleString())
                    .set(this.workingDay[num]);

            // this.afs.collection("/Rests/" + this.rest.id + "/WorkingDays/")
            //     .doc("num").set(
            //     //WorkingDays[num],
            // );
        }
    }//else{
      //this.checkValidFields(restForm);
    //}


  // checkValidFields(restForm){
  //   if(restForm.controls.txtRestId.invalid){
  //     this.txtWorkerIdErrorClass = true;
  //   }else{
  //     this.txtWorkerIdErrorClass = false;
  //   }
  //
  //   if(restForm.controls.txtAccesability.invalid){
  //     this.txtWorkerFirstNameErrorClass = true;
  //   }else {
  //     this.txtWorkerFirstNameErrorClass = false;
  //   }
  //   if(restForm.controls.txtAddress.invalid) {
  //     this.txtWorkerLastNameErrorClass = true;
  //   }else {
  //     this.txtWorkerLastNameErrorClass = false;
  //   }
    // if(restForm.controls.txtLocationR.invalid){
    //   this.txtWorkerRoleErrorClass = true;
    // }else {
    //   this.txtWorkerRoleErrorClass = false;
    // }
    // if(restForm.controls.txtLocationL.invalid){
    //   this.txtWorkerRoleErrorClass = true;
    // }else {
    //   this.txtWorkerRoleErrorClass = false;
    // }
  }

  updateRest(restForm) {
    console.log("formUpdate-> ", restForm);
    this.afs.collection("Rests").doc(this.rest.id).set({
      accesability: this.rest.accesability,
      address: this.rest.address,
      location : this.rest.location,
      name: this.rest.name,
      phone: this.rest.phone,
      picture: this.rest.picture,
      rank : this.rest.rank,
      smoking: this.rest.smoking,
      restType: this.rest.restType,
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
    this.afs.collection("Rests").doc(restId).delete()
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
  }

  ngOnInit() {

    this.rest = new Rest();

    console.log("start");

    this.afs.collection('Rests')
        .snapshotChanges()
        .map(data => {
            return data.map(subData => {
                console.log("main-> ", subData.payload.doc.data());
                this.restList.push(subData.payload.doc.data());
                this.afs.collection('Rests/'+subData.payload.doc.id+"/WorkingDays").snapshotChanges()
                    .map(item => {
                        return item.map(result => ({id:subData.payload.doc.id, ...result.payload.doc.data()}))
                    }).subscribe(resultData => {
                       // this.workingDays = resultData;
                        console.log("working days--> ",resultData);
                })
            })
          //let x = data.map(data => ({id:data.payload.doc.id, ...data.payload.doc.data()}));
          //console.log(x);
          //return x;
        }).subscribe(mainObj => {

    })


  }

}
