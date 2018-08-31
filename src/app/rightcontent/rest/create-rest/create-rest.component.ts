import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Rest, WorkingDay, RankingAlerts } from '../rest.model';
import * as $ from 'jquery';
import { RestService } from '../../../services/rest.service';
import { RestTypeService } from '../../../services/rest-type.service';
import { SubMenuService } from '../../../services/sub-menu.service';
import { isBoolean } from 'util';
import { UserInfo } from '../../../services/UserInfo.model';
import { AuthService } from '../../../services/auth.service';
import { AlertsService } from '../../../services/alerts.service';
import { Router } from '@angular/router';
import { SpinningLoaderComponent } from '../../../common/spinning-loader/spinning-loader.component';

@Component({
  selector: 'app-create-rest',
  templateUrl: './create-rest.component.html',
  styleUrls: ['./create-rest.component.css']
})
export class CreateRestComponent implements OnInit {

  @Input() restName: string;
  @ViewChild(SpinningLoaderComponent) spinner: SpinningLoaderComponent;

  rest: Rest = new Rest();
  ranking = new RankingAlerts();
  inEditMode = false;
  types: string[];
  userInfo: UserInfo;
  subMenus: [{ value: string, isSelected: boolean }] = [({ value: '', isSelected: false })];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  image: File;
  imageText = 'Choose File';

  constructor(private restService: RestService, private authService: AuthService, private router: Router,
    private restType: RestTypeService, private subMenuService: SubMenuService, private alertsService: AlertsService) {
  }

  // get all rest, working days, rest ranking alerts, sub menus and rest type
  ngOnInit() {
    for (let i = 0; i < 7; i++) {
      this.rest.workingDays.push(new WorkingDay());
    }
    this.authService.isLoggedIn().subscribe(x => {
      if (!x) {
        return;
      }
      this.authService.getUserInfo().subscribe(x => this.userInfo = x);
    });
    this.restType.getAll().subscribe(x => this.types = x);
    this.subMenuService.getAll().subscribe(x => {
      this.subMenus.splice(0, 1);
      x.forEach(value => this.subMenus.push({ value, isSelected: false }));
      this.restName = this.router.parseUrl(this.router.url).queryParamMap.get('rest');
      if (this.restName) {
        this.inEditMode = true;
        this.restService.get(this.restName).subscribe(rest => {
          rest.workingDays = [];
          for (let i = 0; i < 7; i++) {
            rest.workingDays.push(new WorkingDay());
          }
          this.rest = rest;
          this.restService.getRestSubMenus(this.restName).subscribe(this.setSelectedSubMenus.bind(this));
          this.restService.getRestWorkingHours(this.restName).subscribe(x => this.rest.workingDays = x);
          this.restService.getRestRankingAlerts(this.restName).subscribe(x => this.ranking = x);
        });
      }
    });
  }

  private resetFields() {
    this.rest = new Rest();
    for (let i = 0; i < 7; i++) {
      this.rest.workingDays.push(new WorkingDay());
    }
    this.subMenus.forEach(x => x.isSelected = false);
  }

  private setSelectedSubMenus(subMenus: string[]) {
    this.subMenus.filter(x => subMenus.find(a => a === x.value)).forEach(x => x.isSelected = true);
  }

  // uploade image for rest
  uploadImage(e) {
    this.image = e.target.files[0];
    const name = this.image.name;
    if (name.length >= 10) {
      this.imageText = `${name.substr(0, 10)}...`;
    } else {
      this.imageText = name;
    }
  }

  // return all days that are busy
  areThereBusyHours() {
    return this.rest.workingDays.find(x => x.isBusy);
  }

  insertAllDayBusyHours(i) {
    this.rest.workingDays[i].busyHourStart = this.rest.workingDays[i].startingHour;
    this.rest.workingDays[i].busyHourEnd = this.rest.workingDays[i].endHour;
  }

  // check form before create new rest
  validateNewRest(): boolean {
    if (this.subMenus.filter(x => x.isSelected).length === 0) {
      return false;
    }

    if (!this.rest.id || !this.rest.name || !this.rest.address || !this.rest.phone || !this.image) {
      return false;
    }
    return true;
  }

  // send data to service for create new rest
  createRest() {

    if (!this.validateNewRest()) {
      this.alertsService.alertError('You must fill all the fields before creating rest');
      return;
    }

    console.log(this.rest);
    this.spinner.show();
    this.restService.UploadRestImage(this.image)
      .then((imageUrl: string) => {
        this.rest.picture = imageUrl;
        this.restService.create(this.rest, this.subMenus.filter(x => x.isSelected).map(x => x.value), this.userInfo.fbId, this.ranking)
          .then(x => {
            this.alertsService.alert(`Restaurant ${this.rest.name} Created`);
            this.spinner.hide();
            this.resetFields();
          })
          .catch(x => {
            this.alertsService.alertError(`Error when creating restaurant ${this.rest.name}`);
            console.log(x);
            this.spinner.hide();
          });
      })
      .catch(x => {
        this.alertsService.alertError('Error when uploading restaurant image');
        this.spinner.hide();
      });
  }

  // send data to service for update rest
  updateRest() {
    this.spinner.show();
    if (this.image) {
      this.restService.UploadRestImage(this.image)
        .then((imageUrl: string) => {
          this.rest.picture = imageUrl;
          this.restService.update(this.restName, this.subMenus.filter(x => x.isSelected).map(x => x.value),
            this.rest, this.ranking)
            .then(x => {
              this.alertsService.alert('Rest Updated Successfully');
              this.spinner.hide();
            })
            .catch(x => {
              console.log(x);
              this.alertsService.alertError('Failed Updating Rest');
              this.spinner.hide();
            });
        })
        .catch(x => {
          console.log(x);
          this.alertsService.alertError('Failed to update image');
          this.spinner.hide();
        });
    } else {
      delete this.rest.picture;
      this.restService.update(this.restName, this.subMenus.filter(x => x.isSelected).map(x => x.value),
        this.rest, this.ranking)
        .then(x => {
          this.alertsService.alert('Rest Updated Successfully');
          this.spinner.hide();
        })
        .catch(x => {
          console.log(x);
          this.alertsService.alertError('Failed Updating Rest');
          this.spinner.hide();
        });
    }
  }

  // set the location in the map
  markerChanged(e) {
    this.rest.location.longitude = e.coords.lng;
    this.rest.location.latitude = e.coords.lat;
  }
}
