import {Component, Input, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {RawMaterial} from '../stock.model';
import {Validators, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {RawMaterialUnitService} from '../../../services/raw-material-unit.service';
import {RawMaterialService} from '../../../services/raw-material.service';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})

export class ManageStockComponent implements OnInit {

  resturantID = 'mozes-333';
  rawMaterial: RawMaterial = new RawMaterial();
  units: string[];
  rawMaterials: RawMaterial[] = [];

  constructor(private unitService: RawMaterialUnitService, private rawMaterialService: RawMaterialService) {}

  ngOnInit() {
    this.unitService.getAll().subscribe(x => this.units = x);
    // this.rawMaterialService.get(this.resturantID).subscribe(x => this.rawMaterials = x);
  }
}




