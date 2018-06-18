import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';
import {ConnectRectanglesEvent, Rectangle} from '../grid/GridEvents.model';
import {Observable} from 'rxjs/internal/Observable';
import {Subscriber} from 'rxjs/src/internal/Subscriber';
import {Observer} from 'rxjs/internal/types';
import {UserInfoService} from '../../../services/user-info.service';
import {LayoutPermissions} from '../LayoutPermissions';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  @Input() permissionsObservable: Observable<LayoutPermissions[]>;

  gridWidth = 12;
  gridHeight = 12;

  restId: string;
  displayNewTableForm = false;
  tables: Table[];
  tablesRectangles: Rectangle[];
  tablesRectanglesObservable: Observable<Rectangle[]>;
  tablesRectanglesObserver: Observer<Rectangle[]>;

  newTable: Table = new Table();

  connectableFromId: string;
  connectableToId: string;
  connectableTables: Table[];
  connectableToTables: Table[];

  constructor(private tableService: TableService, private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.permissionsObservable.subscribe(x => {
      console.log(x);
    });
    this.tablesRectanglesObservable = Observable.create(observer => {
      this.tablesRectanglesObserver = observer;
    });
    this.tablesRectanglesObservable.subscribe();

    this.userInfoService.getSelectedRestId().subscribe(restId => {
      this.restId = restId;
      this.tableService.getAllTable(restId).subscribe(x => {
        this.tables = x.filter(x => x.displayed);
        this.tablesRectangles = this.tables.map(x => new Rectangle(x.x, x.y, x.width, x.height, x.id));
        this.tablesRectanglesObserver.next(this.tablesRectangles);

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
    this.tablesRectanglesObserver.next(this.tablesRectangles);
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
    const movedTable = this.tables.find(x => x.id === e.movedId);
    const connectedToTable = this.tables.find(x => x.id === e.connectedToId);

    this.tableService.validateTablesAreConnectable(this.restId, movedTable, connectedToTable)
      .then(x => {
        this.tableService.mergeTables(this.restId, movedTable, connectedToTable)
          .then(x => {
            alert('merged');
          })
          .catch(x => {
            alert('Error merging');
            console.log(x);
          });
      })
      .catch(x => {
        alert(x);
        console.log(x);
      });

  }

  // disConnectTables(e) {
  //   const movedTable = this.tables.find(x => x.id === e.movedId);
  //   const connectedToTable = this.tables.find(x => x.id === e.connectedToId);
  //
  //   this.tableService.validateTablesAreConnectable(this.restId, movedTable, connectedToTable)
  //     .then(x => {
  //       this.tableService.disconnectMergedTable(this.restId, movedTable, connectedToTable)
  //         .then(x => {
  //           alert('merged');
  //         })
  //         .catch(x => {
  //           alert('Error merging');
  //           console.log(x);
  //         });
  //     })
  //     .catch(x => {
  //       alert(x);
  //       console.log(x);
  //     });
  //
  // }

  tableIsMoving(e) {
    const movingRectIndex = this.tablesRectangles.findIndex(x => x.id === e.id);
    this.tablesRectangles[movingRectIndex] = e;
    this.tablesRectanglesObserver.next(this.tablesRectangles);
  }

  tableFinishedMoving(e) {
    this.tableService.updateTableLocation(this.restId, e.id, e.x, e.y)
      .then(() => {
        alert('Table location updated');
      }).catch(x => {
      console.log(x);
      alert('Error updating table location');
    });
  }

  movedRectangleConnected(e) {
    this.tableService.mergeMovedTables(this.restId, e.movedId, e.connectedToId)
      .then(() => alert(`Table ${e.movedId} connected to ${e.connectedToId}`))
      .catch(x => {
        alert('error connecting tables');
        console.error(x);
      });
  }
}
