import { Component, OnInit } from '@angular/core';
import { Meal } from '../../meal.model';
import { MealService } from '../../../../services/meal.service';
import { UserInfoService } from '../../../../services/user-info.service';
import { SubMenuService } from '../../../../services/sub-menu.service';
import { MealTypeService } from '../../../../services/meal-type.service';

@Component({
  selector: 'app-manage-meals',
  templateUrl: './manage-meals.component.html',
  styleUrls: ['./manage-meals.component.css']
})
export class ManageMealsComponent implements OnInit {

  meals: Meal[];
  restId: string;
  subMenus: string[];
  mealTypes: string[];

  constructor(private userInfoService: UserInfoService, private mealsService: MealService,
    private subMenusService: SubMenuService, private mealTypesService: MealTypeService) {
  }

  // get all meals, sub menus and meal types from rest
  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => {
      this.restId = x;
      this.mealsService.getAll(this.restId).subscribe(x => this.meals = x);
    });
    this.subMenusService.getAll().subscribe(x => this.subMenus = x);
    this.mealTypesService.getAll().subscribe(x => this.mealTypes = x);
  }

}
