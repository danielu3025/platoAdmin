import { Component, Input, OnInit } from '@angular/core';
import { Grocery, Dish } from '../../meal.model';
import { GroceryService } from '../../../../services/grocery.service';
import { UserInfoService } from '../../../../services/user-info.service';
import { CreateDishService } from '../../../../services/create-dish.service';
import { CategoryService } from '../../../../services/category.service';
import { AlertsService } from '../../../../services/alerts.service';
import { DishService } from '../../../../services/dish.service';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {

  restId: string;

  grocery: Grocery[] = [];
  dishes: Dish[];
  dish: Dish = new Dish();
  grocerySelected: boolean[] = [];
  categories: string[] = [];
  pic: File;
  picText = 'Choose File';

  constructor(private categoryService: CategoryService, private groceryService: GroceryService,
    private createDishService: CreateDishService, private userInfoService: UserInfoService,
    private alertsService: AlertsService, private dishService: DishService) {
  }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => {
      this.restId = x;
      this.groceryService.getAll(this.restId).subscribe(x => {
        this.grocery = x;
        this.grocery.forEach(m => {
          this.grocerySelected.push(false);
        });
      });
      this.dishService.getAll(this.restId).subscribe(x => this.dishes = x);
    });
    this.categoryService.getAll().subscribe(x => this.categories = x);
  }

  uploadImage(e: any) {
    this.pic = e.target.files[0];
    const name = this.pic.name;
    if (name.length >= 10) {
      this.picText = `${name.substr(0, 10)}...`;
    } else {
      this.picText = name;
    }
  }

  createDish() {

    if (this.dishes.find(x => x.name === this.dish.name)) {
      this.alertsService.alertError('Dish already exists');
      return;
    }

    const groceryForDish = [];
    this.dish.totalTime = 0;
    for (let i = 0; i < this.grocerySelected.length; i++) {
      if (this.grocerySelected[i]) {
        groceryForDish.push(this.grocery[i].name);
        this.dish.totalTime += this.grocery[i].cookingTime;
      }
    }

    if (!this.validateNewDish() || groceryForDish.length < 1) {
      this.alertsService.alertError('Not all fields were filled');
      return;
    }

    this.createDishService.UploadDishImage(this.restId, this.pic)
      .then(x => {
        this.dish.pic = x;
        this.createDishService.CreateDish(this.restId, this.dish, groceryForDish)
          .then(x => {
            this.alertsService.alert('dish created');
          })
          .catch(e => {
            if (e.alreadyExists) {
              if (confirm('Dish exists, do you want to update it?')) {
                this.createDishService.CreateDish(this.restId, this.dish, groceryForDish, true)
                  .then(x => {
                    this.alertsService.alert('dish updated');
                  })
                  .catch(x => {
                    this.alertsService.alertError(x.message);
                  });
              } else {
                this.alertsService.alertError('no dish created');
              }
            } else {
              this.alertsService.alertError(e.message);
            }
          });
      });
  }

  private validateNewDish(): boolean {
    if (!this.dish.name || !this.dish.description || !this.dish.maxSecondsBeforeStartingMaking
      || !this.dish.category || this.dish.isEditable === undefined || !this.pic) {
      return false;
    }

    return true;
  }

}
