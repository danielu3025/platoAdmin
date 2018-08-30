import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from '../../table.model';
import { TableService } from '../../../../services/table.service';
import { Observable } from 'rxjs/internal/Observable';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-new-table-details',
  templateUrl: './new-table-details.component.html',
  styleUrls: ['./new-table-details.component.css']
})
export class NewTableDetailsComponent implements OnInit {

  @Input() table: Table;
  @Input() creationCanceledEvent: Observable<any>;

  @Output() newTableCreated: EventEmitter<Table> = new EventEmitter<Table>();

  size = '';

  constructor(private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.creationCanceledEvent.subscribe(x => {
      this.table = new Table();
    });
  }

  createTable() {

    if (!this.table.id) {
      this.alertsService.alertError('Please Enter An Id');
      return;
    }

    this.table.acceabilty = this.table.acceabilty.toString() === 'true';
    this.table.isConnectable = this.table.isConnectable.toString() === 'true';
    this.table.smoking = this.table.smoking.toString() === 'true';
    this.table.size = this.table.width * this.table.height * 2;
    this.newTableCreated.emit(this.table);

    this.size = '';
  }
}
