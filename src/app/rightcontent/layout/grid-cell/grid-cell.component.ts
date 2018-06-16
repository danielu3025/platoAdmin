import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridCell} from './GridCell.model';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent implements OnInit {

  @Input() cellInfo: GridCell;

  @Output() onMouseDown: EventEmitter<{ event: MouseEvent, cell: GridCell }> = new EventEmitter<{ event: MouseEvent, cell: GridCell }>();
  @Output() onMouseUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMouseEnter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onMouseDownEvent(e) {
    e.preventDefault();
    this.onMouseDown.emit({event: e, cell: this.cellInfo});
  }

  onMouseUpEvent() {
    this.onMouseUp.emit();
  }

  onMouseEnterEvent() {
    this.onMouseEnter.emit();
  }

  contextMenuEvent() {
    return false;
  }
}
