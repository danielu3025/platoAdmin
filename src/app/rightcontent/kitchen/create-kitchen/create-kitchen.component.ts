import { Component, OnInit, Input } from '@angular/core';
import { KitchenStation } from '../kitchen.model';
import { KitchenStationService } from '../../../services/kitchen-station.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-create-kitchen',
  templateUrl: './create-kitchen.component.html',
  styleUrls: ['./create-kitchen.component.css']
})
export class CreateKitchenComponent implements OnInit {

  @Input() restId: string;

  kitchenStation: KitchenStation = new KitchenStation();

  constructor(private kitchenStationService: KitchenStationService, private alertsService: AlertsService) {
  }

  ngOnInit() {
  }

  create() {

    if (this.kitchenStation.id === '' || this.kitchenStation.name === '') {
      this.alertsService.alertError('Fill all fields before submitting');
      return;
    }

    this.kitchenStationService.create(this.restId, this.kitchenStation)
      .then(x => this.alertsService.alert('Kitchen Station Created'))
      .catch(x => {
        console.log(x);
        this.alertsService.alertError('Failed to create kitchen station');
      });
  }

}
