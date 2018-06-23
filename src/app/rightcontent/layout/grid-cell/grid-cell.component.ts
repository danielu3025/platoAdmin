import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {GridCell} from './GridCell.model';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent implements OnInit, OnChanges {

  @Input() cellInfo: GridCell;

  @Output() onMouseDown: EventEmitter<{ event: MouseEvent, cell: GridCell }> = new EventEmitter<{ event: MouseEvent, cell: GridCell }>();
  @Output() onMouseUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMouseEnter: EventEmitter<any> = new EventEmitter<any>();

  cellColor: string;

  constructor() {
  }

  ngOnInit() {
  }

  onMouseDownEvent(e) {
    e.preventDefault();
    if (this.cellInfo.isStatic) {
      return;
    }
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

  ngOnChanges(changes: any): void {
    if (this.cellInfo.isStatic) {
      this.cellColor = '#000000';
    } else {
      this.cellColor = this.cellInfo.isSelected ? this.cellInfo.colorWhenSelected : this.cellInfo.color;
    }
  }
}
