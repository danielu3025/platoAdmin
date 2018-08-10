import { Component, OnInit, Input } from '@angular/core';
import { GroceryService } from '../../../../services/grocery.service';
import { Grocery } from '../../meal.model';
import { UserInfoService } from '../../../../services/user-info.service';

@Component({
  selector: 'app-manage-groceries',
  templateUrl: './manage-groceries.component.html',
  styleUrls: ['./manage-groceries.component.css']
})
export class ManageGroceriesComponent implements OnInit {

  groceries: Grocery[];
  objectKeys = Object.keys;

  constructor(private groceriesService: GroceryService, private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(restId => {
      this.groceriesService.getAll(restId).subscribe(x => {
        this.groceries = x;
      });
    });
  }

}
