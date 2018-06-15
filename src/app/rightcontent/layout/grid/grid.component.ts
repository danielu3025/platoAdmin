import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridCell} from '../grid-cell/GridCell.model';
import {ConnectRectanglesEvent, Rectangle} from './GridEvents.model';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() cols: number;
  @Input() rows: number;
  @Input() cellWidth = 50;
  @Input() cellHeight = 50;
  @Input() rectanglesObservable: Observable<Rectangle[]>;

  rectangles: Rectangle[];

  @Output() rectangleCreated: EventEmitter<Rectangle> = new EventEmitter<Rectangle>();
  @Output() rectangleDeleted: EventEmitter<Rectangle> = new EventEmitter<Rectangle>();

  grid = {};

  objectKeys = Object.keys;

  selectStart: { rowIndex: number, colIndex: number } = null;
  private selectEnd: { rowIndex: number, colIndex: number } = null;
  private isDeleteEvent = false;

  constructor() {
  }

  ngOnInit() {
    this.grid = this.createEmptyGridObject();
    this.rectanglesObservable.subscribe(x => {
      this.rectangles = x;
      this.grid = this.createEmptyGridObject();
      this.markRectangles(this.grid, this.rectangles);
    });
  }

  selectionStarted(x, y, event) {

    if (event.button === 2) {
      this.isDeleteEvent = true;
    }

    this.selectStart = {
      rowIndex: parseInt(y),
      colIndex: parseInt(x)
    };
  }

  selectionEnded(x, y) {
    this.selectEnd = {
      rowIndex: parseInt(y),
      colIndex: parseInt(x)
    };

    if (this.willRectangleWontOverrideOtherRectangles(this.grid, this.getRectangleInfoFromSelectionStartAndEnd())) {
      alert('New Table Will Override Existing Tables!');
      return;
    }

    this.selectGridCells();
    this.resetSelectionState();
  }

  private getRectangleInfoFromSelectionStartAndEnd() {
    return {
      x: this.selectEnd.colIndex > this.selectStart.colIndex ? this.selectStart.colIndex : this.selectEnd.colIndex,
      y: this.selectEnd.rowIndex > this.selectStart.rowIndex ? this.selectStart.rowIndex : this.selectEnd.rowIndex,
      width: Math.abs(this.selectEnd.colIndex - this.selectStart.colIndex) + 1,
      height: Math.abs(this.selectEnd.rowIndex - this.selectStart.rowIndex) + 1,
      id: ''
    };

  }

  private selectGridCells() {
    const rectangleInfo = this.getRectangleInfoFromSelectionStartAndEnd();

    for (let row = rectangleInfo.y; row < rectangleInfo.y + rectangleInfo.height; row++) {
      for (let col = rectangleInfo.x; col < rectangleInfo.x + rectangleInfo.width; col++) {
        this.grid[row][col].isSelected = !this.isDeleteEvent;
      }
    }

    if (!this.isDeleteEvent) {
      this.rectangleCreated.emit(rectangleInfo);
    } else {
      this.rectangleDeleted.emit(rectangleInfo);
    }
  }

  private resetSelectionState() {
    this.isDeleteEvent = false;
    this.selectStart = null;
    this.selectEnd = null;
  }

  private createEmptyGridObject() {
    const grid = {};
    for (let row = 0; row < this.rows; row++) {
      grid[row] = {};

      for (let col = 0; col < this.cols; col++) {
        grid[row][col] = new GridCell();
      }
    }

    return grid;
  }

  private markRectangles(grid, rectangles) {
    rectangles.forEach(rect => {
      for (let row = rect.y; row < rect.y + rect.height; row++) {
        for (let col = rect.x; col < rect.x + rect.width; col++) {
          grid[row][col].isSelected = true;
          if (rect.id.length > 0) {
            grid[row][col].id = rect.id;
          }
        }
      }
    });
  }

  private willRectangleWontOverrideOtherRectangles(grid, rect: Rectangle): boolean {
    for (let row = rect.y; row < rect.y + rect.height; row++) {
      for (let col = rect.x; col < rect.x + rect.width; col++) {
        if (grid[row][col].isSelected) {
          return true;
        }
      }
    }

    return false;
  }
}
