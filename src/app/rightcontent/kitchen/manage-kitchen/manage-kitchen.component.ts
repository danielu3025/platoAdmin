import { Component, OnInit, Input } from '@angular/core';
import { KitchenStation } from '../kitchen.model';
import { KitchenStationService } from '../../../services/kitchen-station.service';
import { UserInfoService } from '../../../services/user-info.service';

@Component({
  selector: 'app-manage-kitchen',
  templateUrl: './manage-kitchen.component.html',
  styleUrls: ['./manage-kitchen.component.css']
})
export class ManageKitchenComponent implements OnInit {

  restId: string;
  kitchenStations: KitchenStation[];

  constructor(private kitchenStationService: KitchenStationService, private userInfoService: UserInfoService) { }

  ngOnInit() {
    console.log('restId', this.restId);
    this.userInfoService.getSelectedRestId().subscribe(x => {
      this.restId = x;
      this.kitchenStationService.getAll(this.restId).subscribe(x => this.kitchenStations = x);
    });
  }

}
