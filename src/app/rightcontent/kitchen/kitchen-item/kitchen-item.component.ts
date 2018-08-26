import { Component, OnInit, Input } from '@angular/core';
import { KitchenStation } from '../kitchen.model';

@Component({
  selector: '[appKitchenItem]',
  templateUrl: './kitchen-item.component.html',
  styleUrls: ['./kitchen-item.component.css']
})
export class KitchenItemComponent implements OnInit {

  @Input() item: KitchenStation;
  inEditMode = false;
  newKitchenStation: KitchenStation = new KitchenStation();

  constructor() { }

  ngOnInit() {
    this.newKitchenStation.id = this.item.id;
    this.newKitchenStation.name = this.item.name;
  }

  edit() {
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

}
