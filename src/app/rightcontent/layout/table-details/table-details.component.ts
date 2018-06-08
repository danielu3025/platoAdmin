import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../table.model';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent implements OnInit {

  @Input() table: Table;

  constructor() { }

  ngOnInit() {
  }

}
