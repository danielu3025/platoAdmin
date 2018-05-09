import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Rest} from '../rest.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-manage-rest',
  templateUrl: './manage-rest.component.html',
  styleUrls: ['./manage-rest.component.css']
})
export class ManageRestComponent implements OnInit {

  private path  = '/RestAlfa/mozes-333/KitchenStation';
  restRoot  = 'RestAlfa';
  resturantID = 'mozes-333';

  rest: Rest;
  restID$: Observable<any[]>;
  restRef: AngularFireList<Rest> = null;
  workingDays: any[] = [];
  restList: any[] = [];
  subMenus: object[];
  subMenuG: any;
  restTypeG: any;
  selectedSubMenus: any[] = [];
  selectedRestTypes: any[] = [];

    workingDay = [
        {
            'endHour': '22:45',
            'startingHour': '10:30'
        },
        {
            'endHour': '22:45',
            'startingHour': '10:30'
        },
        {
            'endHour': '22:45',
            'startingHour': '10:30'
        },
        {
            'endHour': '22:45',
            'startingHour': '10:30'
        },
        {
            'endHour': '22:45',
            'startingHour': '10:30'
        },
        {
            'endHour': '22:45',
            'startingHour': '10:30'
        },
        {
            'endHour': '22:45',
            'startingHour': '10:30'
        }
    ];

    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.restRef = db.list(this.path);
  }

  // add rest to db
  addRest(restForm) {

    console.log('WD--> ', this.workingDay);

    if (restForm.valid) {
        let a;
        let s;

        const accObj = document.getElementById('txtAccesability') as HTMLSelectElement;
        if (accObj.value === 'true') {
            a = true;
        } else {
            a = false;
        }

        const smokObj = document.getElementById('txtSmoking') as HTMLSelectElement;
        if (smokObj.value === 'true') {
            s =  true;
        } else {
            s =  false;
        }

      this.afs.collection(this.restRoot).doc(this.rest.id).set({
        accesability: a,
        address: this.rest.address,
        location : this.rest.location,
        name: this.rest.name,
        phone: this.rest.phone,
        picture: this.rest.picture,
        rank : this.rest.rank,
        smoking: s,
        type: this.rest.type

      }).then(function () {
            console.log('Document successfully written!');
            alert('restaurant successfully written');
        }).catch(function (error) {
            console.error('Error writing document: ', error);
      });

        // add working days to the rest
        let num: number = 0;
        for (let num = 0; num <= 6; num++) {
            this.afs.collection(this.restRoot + '/' + this.rest.id + '/WorkingDays/')
                .doc(num.toLocaleString())
                .set(this.workingDay[num]);
        }

        const submenusJson = {'list': this.selectedSubMenus} ;
        this.afs.collection(this.restRoot + '/' + this.rest.id  + '/restGlobals/')
            .doc('subMenus').set(submenusJson);
    }

  }

  // update rest in db
  updateRest(restForm) {
      let a;
      let s;

      const accObj = document.getElementById('txtAccesability') as HTMLSelectElement;
      if (accObj.value === 'true') {
          a = true;
      } else {
          a = false;
      }

      const smokObj = document.getElementById('txtSmoking') as HTMLSelectElement;
      if (smokObj.value === 'true') {
          s =  true;
      } else {
          s =  false;
      }

    this.afs.collection(this.restRoot).doc(this.rest.id).set({
        accesability: a,
        address: this.rest.address,
        location : this.rest.location,
        name: this.rest.name,
        phone: this.rest.phone,
        picture: this.rest.picture,
        rank : this.rest.rank,
        smoking: s,
        type: this.rest.type
    }).then(function () {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });

    const num: number = 0;
    for (let num = 0; num <= 6; num++) {
         this.afs.collection(this.restRoot + '/' + this.rest.id + '/WorkingDays/')
             .doc(num.toLocaleString())
             .set(this.workingDay[num]);
    }

    const submenusJson = {'list': this.selectedSubMenus} ;
    this.afs.collection(this.restRoot + '/' + this.rest.id  + '/restGlobals/')
          .doc('subMenus').set(submenusJson);
    }

    // delete rest from db
  deleteRest(restId) {
    this.afs.collection(this.restRoot).doc(restId).delete()
        .then(function () {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
  }

    // add selected subMenus to array
    addSubMenus(id) {
        console.log('id-> ', id);
        this.selectedSubMenus.push(id);
    }

    // get all working days of rest from db
    getWorkingDaysByRestId(restId) {
        $('#' + restId).toggle('slow');
        console.log(restId);
        this.workingDays = [];
        this.afs.collection(this.restRoot + '/' + restId + '/WorkingDays').snapshotChanges()
        .map(item => {
            const x = item;
            return (item.map(result => ({

                [result.payload.doc.id]: {
                    ...result.payload.doc.data()
                }
            })));
        }).subscribe(data => {
            this.workingDays.push(data);
        });
    }

  ngOnInit() {
      this.rest = new Rest();

      // get all rests from db
      this.restID$ = this.afs.collection(this.restRoot)
          .snapshotChanges()
          .map(data => {
              return data.map(subData => ({id: subData.payload.doc.id, ...subData.payload.doc.data()}));

          });

      // get all subMenu from db
      this.afs.doc('Globals/SubMenus').valueChanges()
          .subscribe(data => {
              this.subMenuG = data;
          });

      // get all restTypes from db
      this.afs.doc('Globals/restType').valueChanges()
          .subscribe(data => {
              this.restTypeG = data;
          });

      }


}
