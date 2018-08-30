import { Component, OnInit, Input } from '@angular/core';
import { Dish, Grocery } from '../../meal.model';
import { DishService } from '../../../../services/dish.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: '[appDishItem]',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {

  @Input() dish: Dish;
  @Input() restId: string;
  @Input() categories: string[];
  newDish: any = {};
  groceries: string[];
  inEditMode = false;

  constructor(private dishService: DishService, private alertsService: AlertsService) { }

  ngOnInit() {
    this.dishService.getGroceryForDish(this.restId, this.dish.name)
      .subscribe(x => this.groceries = x);
  }

  // func edit dish
  edit() {
    this.newDish.name = this.dish.name;
    this.newDish.category = this.dish.category;
    this.newDish.isEditable = this.dish.isEditable ? true : false;
    this.newDish.maxSecondsBeforeStartingMaking = this.dish.maxSecondsBeforeStartingMaking;
    this.inEditMode = true;
  }

  // func cancel edit
  cancel() {
    this.inEditMode = false;
  }

  // send data to service for delete dish
  delete() {
    if (!confirm(`Are you sure you want to delete ${this.dish.name}?`)) {
      return;
    }

    this.dishService.delete(this.restId, this.dish)
      .then(x => this.alertsService.alert(`Dish ${this.dish.name} deleted successfully`))
      .catch(x => {
        this.alertsService.alertError(`Error when deleting dish ${this.dish.name}` + x.message, 5000);
        console.log(x);
      });
  }

  // send data to service for updating dish
  ok() {
    this.newDish.isEditable = this.newDish.isEditable === 'true' ? true : false;
    this.dishService.update(this.restId, this.newDish)
      .then(x => {
        this.alertsService.alert(`Dish ${this.newDish.name} updated`);
        this.inEditMode = false;
      })
      .catch(x => {
        this.alertsService.alertError(`Error when updating dish ${this.newDish.name}`);
        console.log(x);
      });
  }

  // send data to service for delete grocery from dish
  deleteGrocery(groceryName: string) {
    // check if dish contain more than one grocery, if not, cant delete grocery
    if (this.groceries.length === 1) {
      this.alertsService.alertError('Dish must contain at least 1 grocery');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${groceryName} from ${this.dish.name}?`)) {
      return;
    }

    this.dishService.deleteGroceryFromDish(this.restId, this.dish.name, groceryName)
      .then(x => {
        this.alertsService.alert(`Grocery ${groceryName} deleted from dish ${this.dish.name}`);
      }).catch(x => {
        console.log(x);
        this.alertsService.alertError(`Failed to delete grocery ${groceryName} from dish ${this.dish.name}`);
      });
  }
}
