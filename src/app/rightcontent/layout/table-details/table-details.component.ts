import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';
import { AlertsService } from '../../../services/alerts.service';

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

  constructor(private tablesService: TableService, private alertsService: AlertsService) {
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
    this.tablesService.disconnectMergedTable(this.restId, this.table)
      .then(x => alert('disconnected'))
      .catch(x => {
        alert('Error disconnecting tables');
        console.log(x);
      });
  }
}
