import { Component, OnInit, Input } from '@angular/core';
import { Meal, Dish } from '../../meal.model';
import { MealService } from '../../../../services/meal.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: '[appMealItem]',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent implements OnInit {

  @Input() restId: string;
  @Input() meal: Meal;
  @Input() subMenus: string[];
  @Input() mealTypes: string[];

  inEditMode = false;
  newMeal: any = {};
  dishes: string[];

  constructor(private mealsService: MealService, private alertsService: AlertsService) { }

  ngOnInit() {
    this.mealsService.getDishesForMeal(this.restId, this.meal.name).subscribe(x => this.dishes = x);
    this.newMeal.name = this.meal.name;
    this.newMeal.subMenus = this.meal.subMenus;
    this.newMeal.dairy = this.meal.dairy;
    this.newMeal.vegan = this.meal.vegan;
    this.newMeal.glotenFree = this.meal.glotenFree;
    this.newMeal.mealType = this.meal.mealType;
    this.newMeal.price = this.meal.price;
  }

  edit() {
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

  delete() {
    if (!confirm(`Are you sure you want to delete ${this.meal.name}?`)) {
      return;
    }

    this.mealsService.delete(this.restId, this.meal.name)
      .then(x => this.alertsService.alert(`Meal ${this.meal.name} deleted`))
      .catch(x => {
        console.log(x);
        this.alertsService.alertError(`Failed to delete meal ${this.meal.name}`);
      });
  }

  ok() {
    this.newMeal.dairy = this.getBoolean(this.newMeal.dairy);
    this.newMeal.vegan = this.getBoolean(this.newMeal.vegan);
    this.newMeal.glotenFree = this.getBoolean(this.newMeal.glotenFree);

    this.mealsService.update(this.restId, this.newMeal)
      .then(x => this.alertsService.alert(`Meal ${this.newMeal.name} Updated`))
      .catch(x => {
        console.log(x);
        this.alertsService.alertError(`failed to update meal ${this.newMeal.name}`);
      });
  }

  deleteDishFromMeal(dish: string) {
    if (this.dishes.length <= 1) {
      this.alertsService.alertError(`Meal must have at least 1 dish`);
      return;
    }

    if (!confirm(`Are you sure you want to delete dish ${dish} from ${this.meal.name}?`)) {
      return;
    }

    this.mealsService.deleteDishFromMeal(this.restId, this.meal.name, dish)
      .then(x => this.alertsService.alert(`Deleted dish ${dish} from ${this.meal.name}`))
      .catch(x => {
        console.log(x);
        this.alertsService.alertError(`Failed to delete dish ${dish} from meal ${this.meal.name}`);
      });
  }

  yesOrNo(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

  getBoolean(value: string): boolean {
    return value === 'true' ? true : false;
  }
}
