import { Component, OnInit, Input } from '@angular/core';
import { Grocery } from '../../meal.model';
import { GroceryService } from '../../../../services/grocery.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: '[appGroceryItem]',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.css']
})
export class GroceryItemComponent implements OnInit {

  inEditMode = false;

  @Input() restId: string;
  @Input() grocery: Grocery;
  @Input() cookingTypes: string[];
  objectKeys = Object.keys;
  newGrocery: Grocery = new Grocery();

  constructor(private groceriesService: GroceryService, private alertsService: AlertsService) { }

  ngOnInit() {
  }

  edit() {
    this.newGrocery.cookingType = this.grocery.cookingType;
    this.newGrocery.cookingTime = this.grocery.cookingTime;
    this.newGrocery.rawMaterial = this.grocery.rawMaterial;
    this.newGrocery.name = this.grocery.name;
    this.newGrocery.isEditable = this.grocery.isEditable;
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

  ok() {
    this.newGrocery.isEditable = Boolean(this.newGrocery.isEditable);
    this.groceriesService.update(this.restId, this.newGrocery)
      .then(x => {
        this.alertsService.alert(`Grocery ${this.newGrocery.name} Updated`);
        this.inEditMode = false;
      })
      .catch(x => {
        console.log(x);
        this.alertsService.alertError(`Failed to update grocery ${this.newGrocery.name}`);
      });
  }

  delete() {
    if (confirm('Are You Sure You Want To Delete ' + this.grocery.name + '?')) {
      this.groceriesService.delete(this.restId, this.grocery)
        .then(x => this.alertsService.alert(`Grocery ${this.newGrocery.name} Deleted`))
        .catch(x => {
          console.log(x);
          this.alertsService.alertError(`Failed to delete grocery ${this.newGrocery.name}, ${x.message}`);
        });
    }
  }

  deleteRawMaterial(rawMaterial: string) {
    if (Object.keys(this.grocery.rawMaterial).length === 1) {
      this.alertsService.alertError('Grocery must have at least one raw material');
      return;
    }
    if (confirm('Are You Sure You Want To Delete ' + rawMaterial + '?')) {
      delete this.newGrocery.rawMaterial[rawMaterial];
      this.groceriesService.update(this.restId, this.newGrocery)
        .then(x => {
          this.alertsService.alert(`Raw Material ${this.newGrocery.rawMaterial[rawMaterial]} Deleted`);
        })
        .catch(x => {
          console.log(x);
          this.alertsService.alertError(`Failed to delete raw material ${this.newGrocery.rawMaterial[rawMaterial]}`);
        });
    }
  }
}
