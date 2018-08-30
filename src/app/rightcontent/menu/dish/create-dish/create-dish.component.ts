import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Grocery, Dish } from '../../meal.model';
import { GroceryService } from '../../../../services/grocery.service';
import { UserInfoService } from '../../../../services/user-info.service';
import { CreateDishService } from '../../../../services/create-dish.service';
import { CategoryService } from '../../../../services/category.service';
import { AlertsService } from '../../../../services/alerts.service';
import { DishService } from '../../../../services/dish.service';
import { SpinningLoaderComponent } from '../../../../common/spinning-loader/spinning-loader.component';

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
  @ViewChild(SpinningLoaderComponent) private spinner: SpinningLoaderComponent;

  constructor(private categoryService: CategoryService, private groceryService: GroceryService,
    private createDishService: CreateDishService, private userInfoService: UserInfoService,
    private alertsService: AlertsService, private dishService: DishService) {
  }

  // get all dishes from rest and their grocery
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
    // get all category for rest
    this.categoryService.getAll().subscribe(x => this.categories = x);
  }

  // uploade image to dish
  uploadImage(e: any) {
    this.pic = e.target.files[0];
    const name = this.pic.name;
    if (name.length >= 10) {
      this.picText = `${name.substr(0, 10)}...`;
    } else {
      this.picText = name;
    }
  }

  private resetFields() {
    this.dish = new Dish();
    for (let i = 0; i < this.grocerySelected.length; i++) {
      this.grocerySelected[i] = false;
    }
    this.pic = null;
    this.picText = 'Choose File';
  }

  createDish() {

    this.spinner.show();
    // check if dish is allready exsist
    if (this.dishes.find(x => x.name === this.dish.name)) {
      this.alertsService.alertError(`Dish ${this.dish.name} already exists`);
      this.spinner.hide();
      return;
    }

    const groceryForDish = [];
    this.dish.totalTime = 0;
    for (let i = 0; i < this.grocerySelected.length; i++) {
      if (this.grocerySelected[i]) {
        groceryForDish.push(this.grocery[i].name);
        // Calculates the time it takes to prepare a dish of the amount of time it takes to prepare groceries
        this.dish.totalTime += this.grocery[i].cookingTime;
      }
    }

    // check if one grocery at least is marked
    if (!this.validateNewDish() || groceryForDish.length < 1) {
      this.alertsService.alertError('Not all fields were filled');
      this.spinner.hide();
      return;
    }

    // send data to service for create a new dish
    this.createDishService.UploadDishImage(this.restId, this.pic)
      .then(x => {
        this.dish.pic = x;
        this.createDishService.CreateDish(this.restId, this.dish, groceryForDish)
          .then(x => {
            this.alertsService.alert(`dish ${this.dish.name} created`);
            this.spinner.hide();
            this.resetFields();
          })
          .catch(e => {
            // check if user want to update dish because its already exsist
            if (e.alreadyExists) {
              if (confirm('Dish exists, do you want to update it?')) {
                this.createDishService.CreateDish(this.restId, this.dish, groceryForDish, true)
                  .then(x => {
                    this.alertsService.alert(`dish ${this.dish.name} updated`);
                    this.spinner.hide();
                  })
                  .catch(x => {
                    this.alertsService.alertError(x.message);
                    this.spinner.hide();
                  });
              } else {
                this.alertsService.alertError('no dish created');
                this.spinner.hide();
              }
            } else {
              this.alertsService.alertError(e.message);
              this.spinner.hide();
            }
          });
      });
  }

  // check valid form befor create a dish
  private validateNewDish(): boolean {
    if (!this.dish.name || !this.dish.description || !this.dish.maxSecondsBeforeStartingMaking
      || !this.dish.category || this.dish.isEditable === undefined || !this.pic) {
      return false;
    }

    return true;
  }

}
