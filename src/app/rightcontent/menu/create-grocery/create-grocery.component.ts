import {Component, Input, OnInit} from '@angular/core';
import {Grocery} from '../meal.model';
import {CookingTypesService} from '../../../services/cooking-types.service';
import {RawMaterialService} from '../../../services/raw-material.service';
import {RawMaterial} from '../../stock/stock.model';
import {CreateGroceryService} from '../../../services/create-grocery.service';

@Component({
  selector: 'app-create-grocery',
  templateUrl: './create-grocery.component.html',
  styleUrls: ['./create-grocery.component.css']
})
export class CreateGroceryComponent implements OnInit {

  @Input() restId: string;

  rawMaterial: RawMaterial[] = [];
  rawMaterialAmount: number[] = [];
  rawMaterialSelected: boolean[] = [];
  grocery: Grocery = new Grocery();
  cookingTypes: string[] = [];

  constructor(private cookingTypesService: CookingTypesService,
              private rawMaterialService: RawMaterialService, private creatGroceryService: CreateGroceryService ) {
  }

  ngOnInit() {
    this.cookingTypesService.getAll().subscribe(x => this.cookingTypes = x);
    this.rawMaterialService.get(this.restId).subscribe(x => {
      this.rawMaterial = x;
      this.rawMaterial.forEach(m => {
        this.rawMaterialAmount.push(0);
        this.rawMaterialSelected.push(false);
      });
    });
  }

  createGrocery() {
    this.creatGroceryService.CreateGrocery(
      this.restId, this.grocery.name, this.grocery.cookingTime, this.grocery.cookingType,
      this.rawMaterialSelected);
  }
}
