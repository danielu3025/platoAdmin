import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Rest, WorkingDay} from '../rest.model';
import * as $ from 'jquery';
import {RestService} from '../../../services/rest.service';
import {RestTypeService} from '../../../services/rest-type.service';
import {SubMenuService} from '../../../services/sub-menu.service';
import {isBoolean} from 'util';

@Component({
  selector: 'app-manage-rest',
  templateUrl: './manage-rest.component.html',
  styleUrls: ['./manage-rest.component.css']
})
export class ManageRestComponent implements OnInit {

  rest: Rest = new Rest();
  image: any = null;
  types: string[];
  subMenus: [{value: string, isSelected: boolean}] = [({value: '', isSelected: false})];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private restService: RestService, private restType: RestTypeService, private subMenu: SubMenuService) {
  }

  ngOnInit() {
    this.restType.getAll().subscribe(x => this.types = x);
    this.subMenu.getAll().subscribe(x => {
      this.subMenus.splice(0, 1);
      x.forEach(value => this.subMenus.push({value, isSelected: false}));
    });
    for (let i = 0; i < 7; i++) {
      this.rest.workingDays.push(new WorkingDay());
    }
  }

  uploadImage(e) {
    this.image = e.target.files[0];
  }

  areThereBusyHours() {
    return this.rest.workingDays.find(x => x.isBusy);
  }

  insertAllDayBusyHours(i) {
    this.rest.workingDays[i].busyHourStart = this.rest.workingDays[i].startingTime;
    this.rest.workingDays[i].busyHourEnd = this.rest.workingDays[i].endTime;
  }

  createRest() {
    console.log(this.rest);
    this.restService.UploadRestImage(this.image)
      .then((imageUrl: string) => {
        this.rest.picture = imageUrl;
        this.restService.create(this.rest, this.subMenus.filter(x => x.isSelected).map(x => x.value))
          .then(x => alert('Restaurant Created'))
          .catch(x => {
            alert('Error when creating restaurant');
            console.log(x);
          });
      })
      .catch(x => {
        alert('Error when uploading restaurant image');
        console.log(x);
      });
  }

  markerChanged(e) {
    this.rest.location.longitude = e.coords.lng;
    this.rest.location.latitude = e.coords.lat;
  }
}
