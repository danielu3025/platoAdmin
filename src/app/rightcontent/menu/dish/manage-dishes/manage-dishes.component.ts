import { Component, OnInit } from '@angular/core';
import { Dish } from '../../meal.model';
import { DishService } from '../../../../services/dish.service';
import { UserInfo } from '../../../../services/UserInfo.model';
import { UserInfoService } from '../../../../services/user-info.service';

@Component({
  selector: 'app-manage-dishes',
  templateUrl: './manage-dishes.component.html',
  styleUrls: ['./manage-dishes.component.css']
})
export class ManageDishesComponent implements OnInit {

  dishes: Dish[];
  restId: string;

  constructor(private userInfoService: UserInfoService, private dishesService: DishService) { }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(restId => {
      this.restId = restId;
      this.dishesService.getAll(restId).subscribe(x => this.dishes = x);
    });
  }

}
