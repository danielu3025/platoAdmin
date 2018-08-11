import { Component, Input, OnInit } from '@angular/core';
import { RawMaterial } from '../../../stock/stock.model';
import { Grocery } from '../../meal.model';
import { CookingTypesService } from '../../../../services/cooking-types.service';
import { RawMaterialService } from '../../../../services/raw-material.service';
import { DeleteGroceryService } from '../../../../services/delete-grocery.service';
import { UserInfoService } from '../../../../services/user-info.service';
import { UpdateGroceryService } from '../../../../services/update-grocery.service';
import { CreateGroceryService } from '../../../../services/create-grocery.service';
import { AlertsService } from '../../../../services/alerts.service';

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
  cookingTypes: string[] = [];

  constructor(private cookingTypesService: CookingTypesService, private rawMaterialService: RawMaterialService,
    private creatGroceryService: CreateGroceryService, private deleteGroceryService: DeleteGroceryService,
    private updateGroceryService: UpdateGroceryService, private userInfoService: UserInfoService,
    public alertsService: AlertsService) {
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
    });
    this.cookingTypesService.getAll().subscribe(x => this.cookingTypes = x);
  }

  createGrocery() {
    const rawMaterialForGrocery = {};
    for (let i = 0; i < this.rawMaterialSelected.length; i++) {
      if (this.rawMaterialSelected[i]) {
        rawMaterialForGrocery[this.rawMaterial[i].name] = this.rawMaterialAmount[i];
      }
    }

    if (!this.validateForm()) {
      this.alertsService.alertError('Please fill out all of the fields!');
      return;
    }

    this.creatGroceryService.CreateGrocery(
      this.restId, this.grocery.name, this.grocery.cookingTime, this.grocery.cookingType, this.grocery.isEditable, rawMaterialForGrocery)
      .then(x => {
        this.alertsService.alert('Grocery Created');
      })
      .catch(e => {
        console.log(e);
        this.alertsService.alertError('Error when creating grocery');
      });
  }

  deleteGrocery() {
    this.deleteGroceryService.DeleteGrocery(this.restId, this.grocery.name);
  }

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
