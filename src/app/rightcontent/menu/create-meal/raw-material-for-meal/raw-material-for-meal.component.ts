import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../meal.model';
import {DishService} from '../../../../services/dish.service';
import {RawMaterial} from '../../../stock/stock.model';
import {GroceryService} from '../../../../services/grocery.service';

@Component({
  selector: 'app-raw-material-for-meal',
  templateUrl: './raw-material-for-meal.component.html',
  styleUrls: ['./raw-material-for-meal.component.css']
})
export class RawMaterialForMealComponent implements OnInit {

  @Input() dishName: string;
  @Input() restId: string;
  dish: object;
  groceries: object = {};
  rawMaterials: RawMaterial[];

  constructor(private dishService: DishService, private groceryService: GroceryService) {
  }

  ngOnInit() {
    this.dishService.get(this.restId, this.dishName).subscribe(x => {
      this.dish = x;
    });

    this.dishService.getGroceryForDish(this.restId, this.dishName).subscribe(data => {
      data.forEach(grocery => {
        this.groceries[grocery] = {};
        this.groceryService.get(this.restId, grocery).subscribe(x => {
          this.groceries[grocery] = x;
        });
      });
    });
  }

}
