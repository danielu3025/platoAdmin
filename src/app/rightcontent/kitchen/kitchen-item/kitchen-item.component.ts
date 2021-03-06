import { Component, OnInit, Input } from '@angular/core';
import { KitchenStation } from '../kitchen.model';
import { AlertsService } from '../../../services/alerts.service';
import { KitchenStationService } from '../../../services/kitchen-station.service';

@Component({
  selector: '[appKitchenItem]',
  templateUrl: './kitchen-item.component.html',
  styleUrls: ['./kitchen-item.component.css']
})
export class KitchenItemComponent implements OnInit {

  @Input() item: KitchenStation;
  @Input() restId: string;
  inEditMode = false;
  newKitchenStation: KitchenStation = new KitchenStation();

  constructor(private alertsService: AlertsService, private kitchenStationService: KitchenStationService) { }

  ngOnInit() {
    this.newKitchenStation.id = this.item.id;
    this.newKitchenStation.name = this.item.name;
  }

  // func edit kitchen station
  edit() {
    this.inEditMode = true;
  }

  // func to cancel edit kitchen station
  cancel() {
    this.inEditMode = false;
  }

  // func to save edit kitchen station. send data to service for updating kitchen station
  ok() {
    this.kitchenStationService.create(this.restId, this.newKitchenStation)
      .then(x => this.alertsService.alert('Kitchen Station Updatedt'))
      .catch(x => {
        console.log(x);
        this.alertsService.alertError('Failed to update kitchen station');
      });
  }

  delete() {
    if (!confirm('Are you sure you want to delete ' + this.item.name + '?')) {
      return;
    }

    // send data to service to delete kitchen station
    this.kitchenStationService.delete(this.restId, this.item.id)
      .then(x => this.alertsService.alert('Kitchen Station Deleted'))
      .catch(x => {
        console.log(x);
        this.alertsService.alertError('Failed to delete kitchen station');
      });
  }

}
