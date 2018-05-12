import {Component, Input, OnInit} from '@angular/core';
import {Grocery} from '../meal.model';
import {CookingTypesService} from '../../../services/cooking-types.service';
import Any = jasmine.Any;
import {RawMaterialService} from '../../../services/raw-material.service';
import {RawMaterial} from '../../stock/stock.model';

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
              private rawMaterialService: RawMaterialService) {
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
    debugger;
  }
}
