import {Component, Input, OnInit} from '@angular/core';
import {Dish, Grocery} from '../meal.model';
import {GroceryService} from '../../../services/grocery.service';
import {CreateDishService} from '../../../services/create-dish.service';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {

  @Input() restId: string;

  grocery: Grocery[] = [];
  dish: Dish = new Dish();
  grocerySelected: boolean[] = [];
  categories: string[] = [];

  constructor(private categoryService: CategoryService, private groceryService: GroceryService,
              private createDishService: CreateDishService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(x => this.categories = x);
    this.groceryService.get(this.restId).subscribe(x => {
      this.grocery = x;
      this.grocery.forEach(m => {
        this.grocerySelected.push(false);
      });
    });
  }

  createDish() {
    const groceryForDish = [];
    for (let i = 0; i < this.grocerySelected.length; i++) {
      if (this.grocerySelected[i]) {
        groceryForDish.push(this.grocery[i].name);
      }
    }

    this.createDishService.CreateDish(this.restId, this.dish, groceryForDish)
      .then(x => {
        alert('dish created');
      })
      .catch(e => {
        if (e.alreadyExists) {
          if (confirm('Dish exists, do you want to update it?')) {
            this.createDishService.CreateDish(this.restId, this.dish, groceryForDish, true)
              .then(x => {
                alert('dish updated');
              })
              .catch(x => {
                alert(x.message);
              });
          } else {
            alert('no dish created');
          }
        } else {
          alert(e.message);
        }
      });
  }

}
