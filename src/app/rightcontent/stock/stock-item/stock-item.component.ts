import {Component, Input, OnInit} from '@angular/core';
import {RawMaterial} from '../stock.model';
import {RawMaterialUnitService} from '../../../services/raw-material-unit.service';
import {RawMaterialService} from '../../../services/raw-material.service';
import { AlertsService } from '../../../services/alerts.service';

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

  constructor(private unitService: RawMaterialUnitService, private rawMaterialService: RawMaterialService,
  private alertsService: AlertsService) {
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
        this.alertsService.alertError(`Error updating raw material ${this.rawMaterial.name}`);
        console.log(x);
      });
  }

  delete() {
    if (confirm(`Are You Sure You Want To Delete '${this.rawMaterial.name}'?`)) {
      this.rawMaterialService.preCheckBeforeDeletingRawMaterial(this.restId, this.rawMaterial.name)
        .then((x: { data: { mealsAboutToDelete: string[] } }) => {
          if (x.data.mealsAboutToDelete.length > 0) {
            if (!confirm(`If You Delete ${this.rawMaterial.name} You Will Also Delete ${x.data.mealsAboutToDelete.join(', ')},
           Are You Sure?`)) {
              return;
            }
          }

          this.rawMaterialService.deleteRawMaterial(this.restId, this.rawMaterial.name)
            .then(x => {
              this.alertsService.alert(`Raw Material ${this.rawMaterial.name} Deleted Successfully`);
            })
            .catch(x => {
              this.alertsService.alertError(`Error deleting raw material ${this.rawMaterial.name}`);
            });
        })
        .catch(x => {
          console.log(x);
          this.alertsService.alertError(`Error deleting raw material ${this.rawMaterial.name}`);
        });
    }
  }
}
