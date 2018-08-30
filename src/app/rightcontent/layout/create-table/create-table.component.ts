import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from '../table.model';
import { TableService } from '../../../services/table.service';
import { ConnectRectanglesEvent, Rectangle } from '../grid/GridEvents.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs/src/internal/Subscriber';
import { Observer } from 'rxjs/internal/types';
import { UserInfoService } from '../../../services/user-info.service';
import { StaticObjectsService } from '../../../services/static-objects.service';
import { AlertsService } from '../../../services/alerts.service';
import { SpinningLoaderComponent } from '../../../common/spinning-loader/spinning-loader.component';
import { NewGridObjectDetailsComponent } from '../new-grid-object-details/new-grid-object-details.component';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  gridWidth = 12;
  gridHeight = 12;

  restId: string;
  displayNewTableForm = false;
  tables: Table[];
  tableDetails: Table[];
  tablesRectangles: Rectangle[];
  tablesRectanglesObservable: Observable<Rectangle[]>;
  tablesRectanglesObserver: Observer<Rectangle[]>;

  newTable: Table = new Table();

  connectableFromId: string;
  connectableToId: string;
  connectableTables: Table[];
  connectableToTables: Table[];
  @ViewChild(NewGridObjectDetailsComponent) newObjectDialogComponent: NewGridObjectDetailsComponent;


  constructor(private tableService: TableService, private staticObjectsService: StaticObjectsService,
    private userInfoService: UserInfoService, private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.tablesRectanglesObservable = Observable.create(observer => {
      this.tablesRectanglesObserver = observer;
    });
    this.tablesRectanglesObservable.subscribe();

    // get all static object for rest (wall, wc, bar...)
    this.userInfoService.getSelectedRestId().subscribe(restId => {
      this.restId = restId;
      this.staticObjectsService.getAll(restId).subscribe(staticObjects => {

        // get all table for rest. if table display = true
        this.tableService.getAllTable(restId).subscribe(x => {
          this.tables = x.filter(x => x.displayed);
          this.tableDetails = x.filter(x => x.displayed);

          // show all tables that have display field = true in map.
          this.tablesRectangles = this.tables.map(x => new Rectangle(x.x, x.y, x.width, x.height, x.id, false));
          // show all static objects in map
          staticObjects.forEach(obj => this.tablesRectangles.push(new Rectangle(obj.x, obj.y, obj.width, obj.height, '', true)));
          this.tablesRectanglesObserver.next(this.tablesRectangles);

          // show all the number of tables can connect to other
          this.connectableTables = this.tables.filter(table => table.isConnectable);
        });
      });
    });

  }

  // create new table object
  addNewTable(e) {
    this.newTable = new Table();
    this.newTable.width = e.width;
    this.newTable.height = e.height;
    this.newTable.x = e.x;
    this.newTable.y = e.y;
    this.newTable.pLeft = e.x;
    this.newTable.pTop = e.y;
    this.newTable.pRight = e.x + e.width;
    this.newTable.pBottom = e.y + e.height;
    this.displayNewTableForm = true;
  }

  // cancel create table
  creationCanceled() {
    this.displayNewTableForm = false;
    this.tablesRectanglesObserver.next(this.tablesRectangles);
  }

  // send data to service for create new table
  createNewTable(table) {
    console.log(table);
    this.tableService.createTable(this.restId, table)
      .then(x => {
        this.displayNewTableForm = false;
        this.alertsService.alert(`table ${table.id} created`);
        this.newObjectDialogComponent.hideSpinner();
      })
      .catch(x => {
        this.displayNewTableForm = false;
        this.alertsService.alertError('error when uploading');
        console.log(x);
        this.newObjectDialogComponent.hideSpinner();
      });
  }

  // send data to service for create new static objects (bar, wall, wc)
  createNewStaticObject(e) {
    e.x = this.newTable.x;
    e.y = this.newTable.y;
    e.width = this.newTable.width;
    e.height = this.newTable.height;
    e.pBottom = this.newTable.pBottom;
    e.pTop = this.newTable.pTop;
    e.pRight = this.newTable.pRight;
    e.pLeft = this.newTable.pLeft;
    this.staticObjectsService.create(this.restId, e)
      .then(x => {
        this.displayNewTableForm = false;
        this.alertsService.alert('Static Object Created');
        this.newObjectDialogComponent.hideSpinner();
      })
      .catch(x => {
        this.displayNewTableForm = false;
        console.log(x);
        this.alertsService.alertError('Failed creating static object');
        this.newObjectDialogComponent.hideSpinner();
      });
  }

  // check if tables can connect and save tables id in connectablefrom and connectableToTables.
  connectableFromChanged(e) {
    const connectableFrom = this.connectableTables.filter(x => x.id === this.connectableFromId)[0];
    this.connectableToTables = this.connectableTables
      .filter(x =>
        x.id !== connectableFrom.id
        && connectableFrom.acceabilty == x.acceabilty
        && ((connectableFrom.height === x.height) || (connectableFrom.width === x.width)));
  }

  // send data to service to set a table as connectables
  setPossibleConnection() {
    this.tableService.setPossibleConnection(this.restId, this.connectableFromId, this.connectableToId)
      .then(x => this.alertsService.alert('possible connection set'))
      .catch(x => {
        this.alertsService.alertError('setting possible connection failed');
        console.log(x);
      });
  }

  // 
  connectTables(e) {
    // movedTable => table that moved to connect another table
    const movedTable = this.tables.find(x => x.id === e.movedId);
    // connectedToTable => the table that connected to him
    const connectedToTable = this.tables.find(x => x.id === e.connectedToId);

    // send data to service to check if two tables can connect
    this.tableService.validateTablesAreConnectable(this.restId, movedTable, connectedToTable)
      .then(x => {
        // if they can, send data to service to merge them
        this.tableService.mergeTables(this.restId, movedTable, connectedToTable)
          .then(x => {
            this.alertsService.alert('tables merged');
          })
          .catch(x => {
            this.alertsService.alertError('Error merging');
            console.log(x);
          });
      })
      .catch(x => {
        this.alertsService.alertError(x);
        console.log(x);
      });

  }

  // check if table moved and chanced location in the map
  tableIsMoving(e) {
    const movingRectIndex = this.tablesRectangles.findIndex(x => x.id === e.id);
    this.tablesRectangles[movingRectIndex] = e;
    this.tablesRectanglesObserver.next(this.tablesRectangles);
  }

  // check if moving table end and send data to service to update his new location
  tableFinishedMoving(e) {
    this.tableService.updateTableLocation(this.restId, e.id, e.x, e.y)
      .catch(x => {
        console.log(x);
        this.alertsService.alertError('Error updating table location');
      });
  }

  // send data to service to connect two tables
  movedRectangleConnected(e) {
    this.tableService.mergeMovedTables(this.restId, e.movedId, e.connectedToId)
      .then(() => this.alertsService.alert(`Table ${e.movedId} connected to ${e.connectedToId}`))
      .catch(x => {
        this.alertsService.alertError('error connecting tables');
        console.error(x);
      });
  }
}
