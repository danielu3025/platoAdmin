import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { RawMaterialForMealComponent } from './raw-material-for-meal/raw-material-for-meal.component';
import { Dish, Meal } from '../../meal.model';
import { CreateMealService } from '../../../../services/create-meal.service';
import { SubMenuService } from '../../../../services/sub-menu.service';
import { DishService } from '../../../../services/dish.service';
import { MealTypeService } from '../../../../services/meal-type.service';
import { UserInfoService } from '../../../../services/user-info.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  restId: string;
  @ViewChildren('rawMaterials') rawMaterials: QueryList<RawMaterialForMealComponent>;
  subMenus: string[];
  mealTypes: string[] = [];
  dish: Dish[] = [];
  meal: Meal = new Meal();
  dishSelected: boolean[] = [];
  dishesForMeal = {};
  image: File = null;
  picText = 'Choose File';

  constructor(private createMealService: CreateMealService, private subMenuService: SubMenuService,
    private mealTypeService: MealTypeService, private dishService: DishService,
    private userInfoService: UserInfoService, private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => {
      this.restId = x;
      this.dishService.getAll(this.restId).subscribe(x => {
        this.dish = x;
        this.dish.forEach(m => {
          this.dishSelected.push(false);
        });
      });
    });
    this.subMenuService.getAll().subscribe(x => this.subMenus = x);
    this.mealTypeService.getAll().subscribe(x => this.mealTypes = x);
  }

  uploadImage(e) {
    this.image = e.target.files[0];
    const name = this.image.name;
    if (name.length >= 10) {
      this.picText = `${name.substr(0, 10)}...`;
    } else {
      this.picText = name;
    }
  }

  validateNewMeal(): boolean {
    if (!this.meal.name || !this.meal.description || !this.meal.price || !this.image) {
      return false;
    }

    return true;
  }

  createMeal() {

    if (this.rawMaterials.length === 0) {
      this.alertsService.alertError('You need to select at least one dish!');
      return;
    }

    if (!this.validateNewMeal()) {
      this.alertsService.alertError('You must fill all of the fields!');
      return;
    }

    this.createMealService.UploadMealImage(this.restId, this.image)
      .then((imageUrl: string) => {
        this.meal.pic = imageUrl;
        const rawMaterials = {};
        this.rawMaterials.forEach(x => {
          Object.keys(x.rawMaterials).forEach(rawMaterial => {
            rawMaterials[rawMaterial] = x.rawMaterials[rawMaterial];
          });
        });

        const dishes: string[] = this.rawMaterials.map(x => x.dishName);
        this.createMealService.CreateMeal(this.restId, this.meal, dishes, rawMaterials)
          .then(x => {
            this.alertsService.alert(`meal ${this.meal.name} created successfully`);
          })
          .catch(x => {
            this.alertsService.alertError(`error when creating meal ${this.meal.name}`);
            console.log(x);
          });

      });
  }
}

