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

  delete() {
    if (confirm(`Are You Sure You Want To Delete '${this.rawMaterial.name}'?`)) {
      this.rawMaterialService.preCheckBeforeDeletingRawMaterial(this.restId, this.rawMaterial.name)
        .then((x: { data: { mealsAboutToDelete: string[] } }) => {
          if (confirm(`If You Delete ${this.rawMaterial.name} You Will Also Delete ${x.data.mealsAboutToDelete.join(', ')},
           Are You Sure?`)) {
            this.rawMaterialService.deleteRawMaterial(this.restId, this.rawMaterial.name)
              .then(x => {
                alert('Raw Material Deleted Successfully');
              })
              .catch(x => {
                console.log(x);
                alert('Error deleting raw material');
              });
          }
        })
        .catch(x => {
          console.log(x);
          alert('Error deleting raw material');
        });
    }
  }
}
