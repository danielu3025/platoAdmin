import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridCell} from './GridCell.model';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent implements OnInit {

  @Input() cellInfo: GridCell;

  @Output() onMouseDown: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() onMouseUp: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onMouseDownEvent(e) {
    e.preventDefault();
    this.onMouseDown.emit(e);
  }

  onMouseUpEvent() {
    this.onMouseUp.emit();
  }

  contextMenuEvent() {
    return false;
  }
}
