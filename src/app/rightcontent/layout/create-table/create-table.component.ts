import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  @Input() restId: string;
  table: Table;

  constructor(private tableService: TableService) {
    this.table = new Table();
  }

  ngOnInit() {
  }

  createTable() {
    debugger;
    this.tableService.createTable(this.restId, this.table);
  }

}
