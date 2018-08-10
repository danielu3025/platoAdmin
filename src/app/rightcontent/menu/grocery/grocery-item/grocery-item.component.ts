import { Component, OnInit, Input } from '@angular/core';
import { Grocery } from '../../meal.model';

@Component({
  selector: '[appGroceryItem]',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.css']
})
export class GroceryItemComponent implements OnInit {

  inEditMode = false;

  @Input() grocery: Grocery;
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

}
