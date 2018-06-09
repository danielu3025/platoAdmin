import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Table} from '../table.model';
import {TableService} from '../../../services/table.service';

@Component({
  selector: 'app-new-table-details',
  templateUrl: './new-table-details.component.html',
  styleUrls: ['./new-table-details.component.css']
})
export class NewTableDetailsComponent implements OnInit {

  @Input() isDisplayed = false;
  @Input() table: Table;

  @Output() newTableCreated: EventEmitter<Table> = new EventEmitter<Table>();
  @Output() tableCreationCancled: EventEmitter<any> = new EventEmitter<any>();


  constructor() {
  }

  ngOnInit() {
  }

  createTable() {
    this.table.acceabilty = this.table.acceabilty.toString() === 'true';
    this.table.isConnectable = this.table.isConnectable.toString() === 'true';
    this.table.smoking = this.table.smoking.toString() === 'true';
    this.newTableCreated.emit(this.table);
  }

  cancel() {
    this.table = new Table();
    this.tableCreationCancled.emit();
  }
}
