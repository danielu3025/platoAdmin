import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';
import {ConnectRectanglesEvent, Rectangle} from '../grid/GridEvents.model';
import {Observable} from 'rxjs/internal/Observable';
import {Subscriber} from 'rxjs/src/internal/Subscriber';
import {Observer} from 'rxjs/internal/types';
import {UserInfoService} from '../../../services/user-info.service';
import {StaticObjectsService} from '../../../services/static-objects.service';

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

  constructor(private tableService: TableService, private staticObjectsService: StaticObjectsService,
              private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.tablesRectanglesObservable = Observable.create(observer => {
      this.tablesRectanglesObserver = observer;
    });
    this.tablesRectanglesObservable.subscribe();

    this.userInfoService.getSelectedRestId().subscribe(restId => {
      this.restId = restId;
      this.staticObjectsService.getAll(restId).subscribe(staticObjects => {

        this.tableService.getAllTable(restId).subscribe(x => {
          this.tables = x.filter(x => x.displayed);
          this.tableDetails = x.filter(x => x.displayed);
          const allConnectedTables = x.filter(x => x.connectedNow);
          allConnectedTables.forEach(connectedTable => {
            const connectedToId = Object.keys(connectedTable.connectedTo).find(x => connectedTable.connectedTo[x]).split('table')[1];
            const connectedToTable = x.find(t => t.id === connectedToId);
            this.tables.push(connectedToTable);
          });

          this.tablesRectangles = this.tables.map(x => new Rectangle(x.x, x.y, x.width, x.height, x.id, false));
          staticObjects.forEach(obj => this.tablesRectangles.push(new Rectangle(obj.x, obj.y, obj.width, obj.height, '', true)));
          this.tablesRectanglesObserver.next(this.tablesRectangles);

          this.connectableTables = this.tables.filter(table => table.isConnectable);
        });
      });
    });

  }

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

  creationCanceled() {
    this.displayNewTableForm = false;
    this.tablesRectanglesObserver.next(this.tablesRectangles);
  }

  createNewTable(table) {
    console.log(table);
    this.tableService.createTable(this.restId, table)
      .then(x => {
        this.displayNewTableForm = false;
        alert('table created');
      })
      .catch(x => {
        this.displayNewTableForm = false;
        alert('error when uploading');
        console.log(x);
      });
  }

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
        alert('Static Object Created');
      })
      .catch(x => {
        this.displayNewTableForm = false;
        console.log(x);
        alert('Failed creating static object');
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

  tableIsMoving(e) {
    const movingRectIndex = this.tablesRectangles.findIndex(x => x.id === e.id);
    this.tablesRectangles[movingRectIndex] = e;
    this.tablesRectanglesObserver.next(this.tablesRectangles);
  }

  tableFinishedMoving(e) {
    this.tableService.updateTableLocation(this.restId, e.id, e.x, e.y)
      .catch(x => {
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
