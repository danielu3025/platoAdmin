import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridCell} from '../grid-cell/GridCell.model';
import {Rectangle} from './GridEvents.model';
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
    this.resetGridCells();
    this.rectanglesObservable.subscribe(x => {
      this.rectangles = x;
      this.markRectangles();
    });
    console.log(this.grid);
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

    this.selectGridCells();
    this.resetSelectionState();
  }

  private selectGridCells() {

    const rectangleInfo = {
      x: this.selectEnd.colIndex > this.selectStart.colIndex ? this.selectStart.colIndex : this.selectEnd.colIndex,
      y: this.selectEnd.rowIndex > this.selectStart.rowIndex ? this.selectStart.rowIndex : this.selectEnd.rowIndex,
      width: Math.abs(this.selectEnd.colIndex - this.selectStart.colIndex) + 1,
      height: Math.abs(this.selectEnd.rowIndex - this.selectStart.rowIndex) + 1
    };


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

  private resetGridCells() {
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = {};

      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = new GridCell();
      }
    }
  }

  private markRectangles() {
    this.rectangles.forEach(rect => {
      for (let row = rect.y; row < rect.y + rect.height; row++) {
        for (let col = rect.x; col < rect.x + rect.width; col++) {
          this.grid[row][col].isSelected = true;
        }
      }
    });
  }
}
