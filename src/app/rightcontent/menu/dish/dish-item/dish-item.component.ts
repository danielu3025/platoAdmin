import { Component, OnInit, Input } from '@angular/core';
import { Dish, Grocery } from '../../meal.model';
import { DishService } from '../../../../services/dish.service';

@Component({
  selector: '[appDishItem]',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {

  @Input() dish: Dish;
  @Input() restId: string;
  newDish: Dish = new Dish();
  groceries: string[];
  inEditMode = false;

  constructor(private dishService: DishService) { }

  ngOnInit() {
    this.dishService.getGroceryForDish(this.restId, this.dish.name)
      .subscribe(x => this.groceries = x);
  }

  edit() {
    this.newDish.name = this.dish.name;
    this.newDish.category = this.dish.category;
    this.newDish.isEditable = this.dish.isEditable;
    this.newDish.maxSecondsBeforeStartingMaking = this.dish.maxSecondsBeforeStartingMaking;
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

}
