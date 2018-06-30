import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Rest, WorkingDay} from '../rest.model';
import * as $ from 'jquery';
import {RestService} from '../../../services/rest.service';
import {RestTypeService} from '../../../services/rest-type.service';
import {SubMenuService} from '../../../services/sub-menu.service';
import {isBoolean} from 'util';
import {UserInfo} from '../../../services/UserInfo.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-create-rest',
  templateUrl: './create-rest.component.html',
  styleUrls: ['./create-rest.component.css']
})
export class CreateRestComponent implements OnInit {

  rest: Rest = new Rest();
  image: any = null;
  types: string[];
  userInfo: UserInfo;
  subMenus: [{ value: string, isSelected: boolean }] = [({value: '', isSelected: false})];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private restService: RestService, private authService: AuthService, private restType: RestTypeService, private subMenu: SubMenuService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(x => {
      if (!x) {
        return;
      }
      this.authService.getUserInfo().subscribe(x => this.userInfo = x);
    });
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
    this.rest.workingDays[i].busyHourStart = this.rest.workingDays[i].startingHour;
    this.rest.workingDays[i].busyHourEnd = this.rest.workingDays[i].endHour;
  }

  createRest() {
    console.log(this.rest);
    this.restService.UploadRestImage(this.image)
      .then((imageUrl: string) => {
        this.rest.picture = imageUrl;
        this.restService.create(this.rest, this.subMenus.filter(x => x.isSelected).map(x => x.value), this.userInfo.fbId)
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
