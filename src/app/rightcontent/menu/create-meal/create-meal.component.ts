import {Component, Input, OnInit} from '@angular/core';
import {Dish, Meal} from '../meal.model';
import {forEach} from '@angular/router/src/utils/collection';
import {CreateMealService} from '../../../services/create-meal.service';
import {SubMenuService} from '../../../services/sub-menu.service';
import {MealTypeService} from '../../../services/meal-type.service';
import {DishService} from '../../../services/dish.service';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  @Input() restId: string;
  subMenus: string[];
  mealTypes: string[] = [];
  dish: Dish[] = [];
  meal: Meal = new Meal();
  dishSelected: boolean[] = [];

  constructor(private createMealService: CreateMealService, private subMenuService: SubMenuService,
              private mealTypeService: MealTypeService, private dishService: DishService) {
  }

  ngOnInit() {
    this.subMenuService.getAll().subscribe(x => this.subMenus = x);
    this.mealTypeService.getAll().subscribe(x => this.mealTypes = x);
    this.dishService.get(this.restId).subscribe(x => {
      this.dish = x;
      this.dish.forEach(m => {
        this.dishSelected.push(false);
      });
    });
  }

  createMeal() {
    const dishForMeal = {};
    for (let i = 0; i < this.dishSelected.length; i++) {
      if (this.dishSelected[i]) {
        dishForMeal[this.dish[i].name] = this.dish[i].name;
      }
    }

    this.createMealService.CreateMeal(
      this.restId, this.meal.dairy, this.meal.name, this.meal.description,
      this.meal.price, this.meal.subMenus, this.meal.vegan, this.meal.glotenFree,
      this.meal.mealType);
  }
}

