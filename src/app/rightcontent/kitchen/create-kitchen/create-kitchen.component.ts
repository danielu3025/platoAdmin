import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { KitchenStation } from '../kitchen.model';
import { KitchenStationService } from '../../../services/kitchen-station.service';
import { AlertsService } from '../../../services/alerts.service';
import { SpinningLoaderComponent } from '../../../common/spinning-loader/spinning-loader.component';

@Component({
  selector: 'app-create-kitchen',
  templateUrl: './create-kitchen.component.html',
  styleUrls: ['./create-kitchen.component.css']
})
export class CreateKitchenComponent implements OnInit {

  @Input() restId: string;
  @ViewChild(SpinningLoaderComponent) spinner: SpinningLoaderComponent;
  kitchenStation: KitchenStation = new KitchenStation();

  constructor(private kitchenStationService: KitchenStationService, private alertsService: AlertsService) {
  }

  ngOnInit() {
  }

  private resetFields() {
    this.kitchenStation = new KitchenStation();
  }

  create() {

    this.spinner.show();
    // check validation befor create kitchen station
    if (this.kitchenStation.id === '' || this.kitchenStation.name === '') {
      this.alertsService.alertError('Fill all fields before submitting');
      this.spinner.hide();
      return;
    }

    // send data to service for create kitchen station
    this.kitchenStationService.create(this.restId, this.kitchenStation)
      .then(x => {
        this.alertsService.alert('Kitchen Station Created');
        this.spinner.hide();
        this.resetFields();
      })
      .catch(x => {
        console.log(x);
        this.alertsService.alertError('Failed to create kitchen station');
        this.spinner.hide();
      });
  }

}
