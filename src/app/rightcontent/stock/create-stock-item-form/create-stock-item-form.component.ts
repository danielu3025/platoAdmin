import {Component, OnInit} from '@angular/core';
import {RawMaterial} from '../stock.model';
import {UserInfoService} from '../../../services/user-info.service';
import {RawMaterialService} from '../../../services/raw-material.service';
import {RawMaterialUnitService} from '../../../services/raw-material-unit.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-create-stock-item-form',
  templateUrl: './create-stock-item-form.component.html',
  styleUrls: ['./create-stock-item-form.component.css']
})
export class CreateStockItemFormComponent implements OnInit {

  resturantID = '';
  rawMaterial: RawMaterial = new RawMaterial();
  units: string[];

  constructor(private unitService: RawMaterialUnitService, private rawMaterialService: RawMaterialService,
              private userInfoService: UserInfoService, private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.unitService.getAll().subscribe(x => this.units = x);
    this.userInfoService.getSelectedRestId().subscribe(x => this.resturantID = x);
  }

  create() {
    this.rawMaterialService.createRawMaterial(this.resturantID, this.rawMaterial)
      .then(x => this.alertsService.alert(`Raw Material ${this.rawMaterial.name} Created`))
      .catch(x => {
        this.alertsService.alertError(`Error creating raw material ${this.rawMaterial.name}`);
        console.log(x);
      });
  }
}
