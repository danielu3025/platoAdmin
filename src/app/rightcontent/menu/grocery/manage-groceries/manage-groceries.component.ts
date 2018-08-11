import { Component, OnInit, Input } from '@angular/core';
import { GroceryService } from '../../../../services/grocery.service';
import { Grocery } from '../../meal.model';
import { UserInfoService } from '../../../../services/user-info.service';
import { CookingTypesService } from '../../../../services/cooking-types.service';

@Component({
  selector: 'app-manage-groceries',
  templateUrl: './manage-groceries.component.html',
  styleUrls: ['./manage-groceries.component.css']
})
export class ManageGroceriesComponent implements OnInit {

  groceries: Grocery[];
  cookingTypes: string[];
  restId: string;
  objectKeys = Object.keys;

  constructor(private groceriesService: GroceryService, private userInfoService: UserInfoService,
    private cookingTypesService: CookingTypesService) { }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(restId => {
      this.restId = restId;
      this.groceriesService.getAll(restId).subscribe(x => {
        this.groceries = x;
      });
    });
    this.cookingTypesService.getAll().subscribe(x => this.cookingTypes = x);
  }

}
