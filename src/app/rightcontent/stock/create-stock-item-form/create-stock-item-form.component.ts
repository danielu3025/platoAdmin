import {Component, OnInit} from '@angular/core';
import {RawMaterial} from '../stock.model';
import {UserInfoService} from '../../../services/user-info.service';
import {RawMaterialService} from '../../../services/raw-material.service';
import {RawMaterialUnitService} from '../../../services/raw-material-unit.service';

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
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.unitService.getAll().subscribe(x => this.units = x);
    this.userInfoService.getSelectedRestId().subscribe(x => this.resturantID = x);
  }

  create() {
    this.rawMaterialService.createRawMaterial(this.resturantID, this.rawMaterial)
      .then(x => alert('Raw Material Created'))
      .catch(x => {
        alert('Error creating raw material');
        console.log(x);
      });
  }
}
