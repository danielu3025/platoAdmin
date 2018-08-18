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

  edit() {
    this.newDish.name = this.dish.name;
    this.newDish.category = this.dish.category;
    this.newDish.isEditable = this.dish.isEditable ? true : false;
    this.newDish.maxSecondsBeforeStartingMaking = this.dish.maxSecondsBeforeStartingMaking;
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

  delete() {
    if (!confirm(`Are you sure you want to delete ${this.dish.name}?`)) {
      return;
    }

    this.dishService.delete(this.restId, this.dish)
      .then(x => this.alertsService.alert(`Dish deleted successfully`))
      .catch(x => {
        this.alertsService.alertError('Error when deleting dish.' + x.message, 5000);
        console.log(x);
      });
  }

  ok() {
    this.newDish.isEditable = this.newDish.isEditable === 'true' ? true : false;
    this.dishService.update(this.restId, this.newDish)
      .then(x => {
        this.alertsService.alert('Dish updated');
        this.inEditMode = false;
      })
      .catch(x => {
        this.alertsService.alertError('Error when updating dish');
        console.log(x);
      });
  }

  deleteGrocery(groceryName: string) {
    if (this.groceries.length === 1) {
      this.alertsService.alertError('Dish must contain at least 1 grocery');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${groceryName} from ${this.dish.name}?`)) {
      return;
    }

    this.dishService.deleteGroceryFromDish(this.restId, this.dish.name, groceryName)
      .then(x => {
        this.alertsService.alert('Grocery deleted from dish');
      }).catch(x => {
        console.log(x);
        this.alertsService.alertError('Failed to delete grocery from dish');
      });
  }
}
