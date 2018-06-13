import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';
import {ConnectRectanglesEvent, Rectangle} from '../grid/GridEvents.model';
import {Observable} from 'rxjs/internal/Observable';
import {Subscriber} from 'rxjs/src/internal/Subscriber';
import {Observer} from 'rxjs/internal/types';
import {UserInfoService} from '../../../services/user-info.service';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  gridWidth = 10;
  gridHeight = 10;

  restId: string;
  displayNewTableForm = false;
  tables: Table[];
  tablesRectangels: Rectangle[];
  tablesRectangelsObservable: Observable<Rectangle[]>;
  tablesRectangelsObserver: Observer<Rectangle[]>;

  connectRectangelsObservable: Observable<ConnectRectanglesEvent>;
  connectRectangelsObserver: Observer<ConnectRectanglesEvent>;

  newTable: Table = new Table();

  connectableFromId: string;
  connectableToId: string;
  connectableTables: Table[];
  connectableToTables: Table[];

  constructor(private tableService: TableService, private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.tablesRectangelsObservable = Observable.create(observer => {
      this.tablesRectangelsObserver = observer;
    });
    this.tablesRectangelsObservable.subscribe();

    this.connectRectangelsObservable = Observable.create(observer => this.connectRectangelsObserver = observer);
    this.connectRectangelsObservable.subscribe();

    this.userInfoService.getSelectedRestId().subscribe(restId => {
      this.restId = restId;
      this.tableService.getAllTable(restId).subscribe(x => {
        this.tables = x.filter(x => x.displayed);
        this.tablesRectangels = this.tables.map(x => new Rectangle(x.x, x.y, x.width, x.height, x.id));
        this.tablesRectangelsObserver.next(this.tablesRectangels);

        this.connectableTables = this.tables.filter(table => table.isConnectable);
      });
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
    this.newTable.pLeft = e.x;
    this.newTable.pTop = e.y;
    this.newTable.pRight = e.x + e.width;
    this.newTable.pBottom = e.y + e.height;
  }

  tableCreationCanceled() {
    this.displayNewTableForm = false;
    this.tablesRectangelsObserver.next(this.tablesRectangels);
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
      .filter(x =>
        x.id !== connectableFrom.id
        && connectableFrom.acceabilty == x.acceabilty
        && ((connectableFrom.height === x.height) || (connectableFrom.width === x.width)));
  }

  setPossibleConnection() {
    this.tableService.setPossibleConnection(this.restId, this.connectableFromId, this.connectableToId)
      .then(x => alert('possible connection set'))
      .catch(x => {
        alert('setting possible connection failed');
        console.log(x);
      });
  }

  connectTables(e) {
    const table1 = this.tables.filter(x => x.id === e.table1)[0];
    const table2 = this.tables.filter(x => x.id === e.table2)[0];

    this.tableService.mergeTables(this.restId, table1, table2)
      .then();


    // this.validateTablesAreConnectable(table1, table2)
    //   .then(() => {
    //     const errorMerging = msg => alert(msg);
    //     const successMerging = (mergedRect: Rectangle) => {
    //       const mergedTable = new Table();
    //       mergedTable.id = mergedRect.id;
    //       mergedTable.x = mergedRect.x;
    //       mergedTable.y = mergedRect.y;
    //       mergedTable.width = mergedRect.width;
    //       mergedTable.height = mergedRect.height;
    //       mergedTable.size = mergedTable.width * mergedTable.height * 2;
    //       mergedTable.smoking = table1.smoking && table2.smoking;
    //       mergedTable.acceabilty = table1.acceabilty;
    //       mergedTable.isConnectable = false;
    //       mergedTable.pTop = mergedTable.y;
    //       mergedTable.pLeft = mergedTable.x;
    //       mergedTable.pRight = mergedTable.x + mergedTable.width;
    //       mergedTable.pBottom = mergedTable.y + mergedTable.height;
    //
    //       this.tableService.createMergedTable(this.restId, mergedTable, table1, table2)
    //         .then(x => alert('merged successfully'))
    //         .catch(x => {
    //           alert(x);
    //           console.log(x);
    //         });
    //     };
    //
    //     const connectRectangles = new ConnectRectanglesEvent(this.getRectangle(table1), this.getRectangle(table2),
    //       successMerging, errorMerging);
    //     this.connectRectangelsObserver.next(connectRectangles);
    //   })
    //   .catch(alert);
  }

  private getRectangle(table: Table) {
    return new Rectangle(table.x, table.y, table.width, table.height, table.id);
  }

  private validateTablesAreConnectable(table1: Table, table2: Table) {
    return new Promise(((resolve, reject) => {
      if (table1.width === table2.width) {
        if (table1.y + table1.height + table2.height > this.gridHeight) {
          reject('Can\'t connect tables, height will overflow');
        }
        resolve();
      } else if (table1.height === table2.height) {
        if (table1.x + table1.width + table2.width > this.gridWidth) {
          reject('Can\'t connect tables, width will overflow');
        }
        resolve();
      }
    }));
  }
}
