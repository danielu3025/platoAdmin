import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit {

  @Input() restId: string;
  @Input() table: Table;
  isMerged = false;

  @Output() connectTables: EventEmitter<{ movedId: string, connectedToId: string }> =
    new EventEmitter<{ movedId: string, connectedToId: string }>();
  connectableTables: string[] = [];
  movedTableConnectedNow: Object = {};
  KeytableConnectedTo: string[] = [] ;
  keyTable: string;
  tableId: string;
  connectFlag: boolean;

  constructor(private tablesService: TableService) {
  }

  ngOnInit() {
    this.tablesService.getConnectableTables(this.restId, this.table.id).subscribe(x => this.connectableTables = x);
    this.isMerged = this.table.connectedNow;
  }

  onConnectTables(tableId: string) {
    console.log('isMerged', this.isMerged);
    this.connectTables.emit({movedId: tableId, connectedToId: this.table.id});
  }

  disconnectMergedTable() {
    this.movedTableConnectedNow = this.table.connectedTo;
    this.KeytableConnectedTo = Object.keys(this.movedTableConnectedNow);
    for (let i = 0; i < this.KeytableConnectedTo.length; i++) {
      this.keyTable = Object.keys(this.KeytableConnectedTo)[i];
      this.tableId = this.KeytableConnectedTo[i].substring(5 , 7);
      this.connectFlag = this.movedTableConnectedNow[Object.keys(this.movedTableConnectedNow)[i]];
    }
    this.tablesService.disconnectMergedTable(this.restId, this.table, this.tableId)
      .then(x => alert('disconnected'))
      .catch(x => {
        alert('Error disconnecting tables');
        console.log(x);
      });
  }
}
