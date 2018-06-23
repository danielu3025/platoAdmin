import {Component, Input, OnInit} from '@angular/core';
import {RawMaterial} from '../stock.model';
import {RawMaterialUnitService} from '../../../services/raw-material-unit.service';
import {RawMaterialService} from '../../../services/raw-material.service';

@Component({
  selector: '[appStockItem]',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css'],
})
export class StockItemComponent implements OnInit {

  @Input() rawMaterial: RawMaterial;
  @Input() restId: string;

  inEditMode = false;
  units: string[] = [];

  constructor(private unitService: RawMaterialUnitService, private rawMaterialService: RawMaterialService) {
  }

  ngOnInit() {
    this.unitService.getAll().subscribe(x => this.units = x);
  }

  edit() {
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

  ok() {
    this.rawMaterialService.createRawMaterial(this.restId, this.rawMaterial)
      .then(x => {
        this.inEditMode = false;
      })
      .catch(x => {
        alert('Error updating');
        console.log(x);
      });
  }
}
