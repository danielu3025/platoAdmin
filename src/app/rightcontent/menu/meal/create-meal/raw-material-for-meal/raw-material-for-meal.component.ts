import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { DishService } from '../../../../../services/dish.service';
import { GroceryService } from '../../../../../services/grocery.service';

@Component({
  selector: 'app-raw-material-for-meal',
  templateUrl: './raw-material-for-meal.component.html',
  styleUrls: ['./raw-material-for-meal.component.css']
})
export class RawMaterialForMealComponent implements OnInit, AfterViewInit {

  @Input() dishName: string;
  @Input() restId: string;
  dish: object;
  groceries: object = {};
  rawMaterials = {};
  objectKeys = Object.keys;

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
          Object.keys(x.rawMaterial).forEach(rawMaterial => {
            this.rawMaterials[rawMaterial] = {
              isImportant: false,
              redLine: 0
            };
          });
        });
      });

      console.log(this.groceries);
    });
  }

  ngAfterViewInit(): void {
  }

  onRedLineChange($event, model) {
    if (model.redLine < 0) {
      alert('Redline must be 0 or greater!');
      model.redLine = 0;
    }
  }
}
