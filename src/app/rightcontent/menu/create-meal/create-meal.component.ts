import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Dish, Meal} from '../meal.model';
import {forEach} from '@angular/router/src/utils/collection';
import {CreateMealService} from '../../../services/create-meal.service';
import {SubMenuService} from '../../../services/sub-menu.service';
import {MealTypeService} from '../../../services/meal-type.service';
import {DishService} from '../../../services/dish.service';
import {RawMaterialForMealComponent} from './raw-material-for-meal/raw-material-for-meal.component';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css']
})
export class CreateMealComponent implements OnInit {

  @Input() restId: string;
  @ViewChildren('rawMaterials') rawMaterials: QueryList<RawMaterialForMealComponent>;
  subMenus: string[];
  mealTypes: string[] = [];
  dish: Dish[] = [];
  meal: Meal = new Meal();
  dishSelected: boolean[] = [];
  dishesForMeal = {};
  image: any = null;

  constructor(private createMealService: CreateMealService, private subMenuService: SubMenuService,
              private mealTypeService: MealTypeService, private dishService: DishService) {
  }

  ngOnInit() {
    this.subMenuService.getAll().subscribe(x => this.subMenus = x);
    this.mealTypeService.getAll().subscribe(x => this.mealTypes = x);
    this.dishService.getAll(this.restId).subscribe(x => {
      this.dish = x;
      this.dish.forEach(m => {
        this.dishSelected.push(false);
      });
    });
  }

  uploadImage(e) {
    this.image = e.target.files[0];
  }

  createMeal() {

    if(this.rawMaterials.length === 0) {
      alert('You need to select at least one dish!');
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
            alert('meal created successfully');
          })
          .catch(x => {
            alert('error when creating a meal');
            console.log(x);
          });

      });
  }
}

