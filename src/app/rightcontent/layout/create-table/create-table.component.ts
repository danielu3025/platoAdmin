import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';
import {Rectangle} from '../grid/GridEvents.model';
import {Observable} from 'rxjs/internal/Observable';
import {Subscriber} from 'rxjs/src/internal/Subscriber';
import {Observer} from 'rxjs/internal/types';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  @Input() restId: string;
  displayNewTableForm = false;
  tables: Table[];
  tablesRectangels: Rectangle[];
  tablesRectangelsObservable: Observable<Rectangle[]>;
  tablesRectangelsObserver: Observer<Rectangle[]>;
  newTable: Table = new Table();

  connectableFromId: string;
  connectableToId: string;
  connectableTables: Table[];
  connectableToTables: Table[];

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.tablesRectangelsObservable = Observable.create(observer => {
      this.tablesRectangelsObserver = observer;
    });
    this.tablesRectangelsObservable.subscribe();

    this.tableService.getAllTable(this.restId).subscribe(x => {
      this.tables = x;
      this.tablesRectangels = this.tables.map(x => new Rectangle(x.x, x.y, x.width, x.height));
      this.tablesRectangelsObserver.next(this.tablesRectangels);

      this.connectableTables = this.tables.filter(table => table.isConnectable);
    });
  }

  addNewTable(e) {
    this.newTable = new Table();
    this.newTable.width = e.width;
    this.newTable.height = e.height;
    this.newTable.x = e.x;
    this.newTable.y = e.y;
    this.newTable.size = e.width * e.height * 2;
    this.displayNewTableForm = true;
  }

  tableCreationCanceled() {
    this.displayNewTableForm = false;
  }

  createNewTable(table) {
    console.log(table);
    this.displayNewTableForm = false;
    this.tableService.createTable(this.restId, table)
      .then(x => alert('table created'))
      .catch(x => {
        alert('error when uploading');
        console.log(x);
      });
  }

  connectableFromChanged(e) {
    const connectableFrom = this.connectableTables.filter(x => x.id === this.connectableFromId)[0];
    this.connectableToTables = this.connectableTables
      .filter(x => x.id != this.connectableFromId && connectableFrom.acceabilty === x.acceabilty);
  }
}
