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
  isMerged: boolean = false;

  @Output() connectTables: EventEmitter<{ table1: string, table2: string }> = new EventEmitter<{ table1: string, table2: string }>();

  connectableTables: string[] = [];

  constructor(private tablesService: TableService) {
  }

  ngOnInit() {
    this.tablesService.getConnectableTables(this.restId, this.table.id).subscribe(x => this.connectableTables = x);
    this.isMerged = this.table.id.includes('+');
  }

  onConnectTables(tableId: string) {
    this.connectTables.emit({table1: this.table.id, table2: tableId});
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
