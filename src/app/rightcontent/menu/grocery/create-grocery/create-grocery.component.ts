import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RawMaterial } from '../../../stock/stock.model';
import { Grocery } from '../../meal.model';
import { CookingTypesService } from '../../../../services/cooking-types.service';
import { RawMaterialService } from '../../../../services/raw-material.service';
import { DeleteGroceryService } from '../../../../services/delete-grocery.service';
import { UserInfoService } from '../../../../services/user-info.service';
import { UpdateGroceryService } from '../../../../services/update-grocery.service';
import { CreateGroceryService } from '../../../../services/create-grocery.service';
import { AlertsService } from '../../../../services/alerts.service';
import { GroceryService } from '../../../../services/grocery.service';
import { SpinningLoaderComponent } from '../../../../common/spinning-loader/spinning-loader.component';

@Component({
  selector: 'app-create-grocery',
  templateUrl: './create-grocery.component.html',
  styleUrls: ['./create-grocery.component.css']
})
export class CreateGroceryComponent implements OnInit {

  restId: string;

  rawMaterial: RawMaterial[] = [];
  rawMaterialAmount: number[] = [];
  rawMaterialSelected: boolean[] = [];
  grocery: Grocery = new Grocery();
  allGroceries: Grocery[];
  cookingTypes: string[] = [];
  @ViewChild(SpinningLoaderComponent) private spinner: SpinningLoaderComponent;

  constructor(private cookingTypesService: CookingTypesService, private rawMaterialService: RawMaterialService,
    private creatGroceryService: CreateGroceryService, private deleteGroceryService: DeleteGroceryService,
    private updateGroceryService: UpdateGroceryService, private userInfoService: UserInfoService,
    public alertsService: AlertsService, private groceryService: GroceryService) {
  }

  ngOnInit() {
    this.userInfoService.getSelectedRestId().subscribe(x => {
      this.restId = x;
      this.rawMaterialService.get(this.restId).subscribe(x => {
        this.rawMaterial = x;
        this.rawMaterial.forEach(m => {
          this.rawMaterialAmount.push(0);
          this.rawMaterialSelected.push(false);
        });
      });
      // get all groceries for rest
      this.groceryService.getAll(this.restId).subscribe(x => this.allGroceries = x);
    });
    this.cookingTypesService.getAll().subscribe(x => this.cookingTypes = x);
  }

  private resetFields() {
    this.grocery = new Grocery();
    for (let i = 0; i < this.rawMaterialSelected.length; i++) {
      this.rawMaterialSelected[i] = false;
      this.rawMaterialAmount[i] = 0;
    }
  }

  createGrocery() {

    this.spinner.show();
    // check if grocery is allready exsist
    if (this.allGroceries.find(x => x.name === this.grocery.name)) {
      this.alertsService.alertError(`Grocery ${this.grocery.name} already exists`);
      this.spinner.hide();
      return;
    }

    const rawMaterialForGrocery = {};
    for (let i = 0; i < this.rawMaterialSelected.length; i++) {
      if (this.rawMaterialSelected[i]) {
        rawMaterialForGrocery[this.rawMaterial[i].name] = this.rawMaterialAmount[i];
      }
    }

    // check valid form befor create a grocery
    if (!this.validateForm()) {
      this.alertsService.alertError('Please fill out all of the fields!');
      this.spinner.hide();
      return;
    }

    // send data to service for create a new grocery
    this.creatGroceryService.CreateGrocery(
      this.restId, this.grocery.name, this.grocery.cookingTime, this.grocery.cookingType, this.grocery.isEditable, rawMaterialForGrocery)
      .then(x => {
        this.spinner.hide();
        this.alertsService.alert(`Grocery ${this.grocery.name} Created`);
        this.resetFields();
      })
      .catch(e => {
        console.log(e);
        this.alertsService.alertError(`Error when creating grocery ${this.grocery.name}`);
        this.spinner.hide();
      });
  }

  // send data to service for delete grocery
  deleteGrocery() {
    this.deleteGroceryService.DeleteGrocery(this.restId, this.grocery.name);
  }

  // check valid form befor create a grocery
  private validateForm(): boolean {
    if (!(this.grocery.name && this.grocery.cookingTime && this.grocery.cookingType)) {
      return false;
    }
    if (!this.rawMaterialSelected.includes(true)) {
      return false;
    }

    for (let i = 0; i < this.rawMaterialSelected.length; i++) {
      if (!this.rawMaterialSelected[i]) {
        continue;
      }
      if (this.rawMaterialAmount[i] <= 0) {
        return false;
      }
    }

    return true;
  }
}
