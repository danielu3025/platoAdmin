import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from '../table.model';
import { TableService } from '../../../services/table.service';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: '[appTableDetails]',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit {

  @Input() restId: string;
  @Input() table: Table;
  newTable: any = {};
  isMerged = false;
  inEditMode = false;

  @Output() connectTables: EventEmitter<{ movedId: string, connectedToId: string }> =
    new EventEmitter<{ movedId: string, connectedToId: string }>();
  connectableTables: string[] = [];

  constructor(private tablesService: TableService, private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.tablesService.getConnectableTables(this.restId, this.table.id).subscribe(x => this.connectableTables = x);
    this.isMerged = this.table.connectedNow;
    this.newTable.acceabilty = this.table.acceabilty;
    this.newTable.smoking = this.table.smoking;
    this.newTable.isConnectable = this.table.isConnectable;
  }

  // 
  onConnectTables(tableId: string) {
    this.connectTables.emit({ movedId: tableId, connectedToId: this.table.id });
  }

  disconnectMergedTable() {
    this.tablesService.disconnectMergedTable(this.restId, this.table)
      .then(x => this.alertsService.alert('disconnected'))
      .catch(x => {
        this.alertsService.alertError('Error disconnecting tables');
        console.log(x);
      });
  }

  edit() {
    this.inEditMode = true;
  }

  cancel() {
    this.inEditMode = false;
  }

  delete() {
    this.tablesService.delete(this.restId, this.table.id)
      .then(x => this.alertsService.alert('Table Deleted'))
      .catch(x => {
        console.log(x);
        if (x.code === 'aborted') {
          this.alertsService.alertError(x.message);
        } else {
          this.alertsService.alertError('Failed to delete table');
        }
      });
  }

  ok() {
    this.tablesService.update(this.restId, this.table.id, this.newTable)
      .then(x => this.alertsService.alert('Table Updated'))
      .catch(x => {
        console.log(x);
        this.alertsService.alertError('Failed updating table');
      });
  }

  yesOrNo(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}
