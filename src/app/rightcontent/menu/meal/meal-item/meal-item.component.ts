import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../meal.model';
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
}
