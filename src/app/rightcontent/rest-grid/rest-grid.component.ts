import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';

const GRID_SIZE = 12;
@Component({
  selector: 'app-rest-grid',
  templateUrl: './rest-grid.component.html',
  styleUrls: ['./rest-grid.component.css']
})
export class RestGridComponent implements OnInit {
  @Input() tables: any[];
  restWidth: number = GRID_SIZE;
  restHeight: number = GRID_SIZE;
  gridRepeater: any[];

  constructor() {
    this.gridRepeater = new Array(this.restWidth * this.restHeight);
  }

  tableGridStyle(table: any) {
    const [x, y, w, h] = [
      parseInt(table.pLeft, 10) + 1,
      parseInt(table.pTop, 10) + 1,
      parseInt(table.pRight, 10) + 1,
      parseInt(table.pBottom, 10) + 1,
    ];

    return {
      'grid-column': x + ' / ' + w,
      'grid-row': y + ' / ' + h
    };
  }

  ngOnInit() {
    this.tables = (this.tables || []);
  }

}
