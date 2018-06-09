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
  @Input() connectRectangles: Observable<ConnectRectanglesEvent>;

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
      this.markRectangles(this.grid, this.rectangles);
    });

    this.connectRectangles.subscribe(connectRects => {

      const newRectangles = this.rectangles.map(x => x);
      newRectangles.splice(newRectangles.findIndex(x => x.id === connectRects.rect1.id), 1);
      newRectangles.splice(newRectangles.findIndex(x => x.id === connectRects.rect2.id), 1);

      const mergedRectangle = this.getNewRectangle(connectRects.rect1, connectRects.rect2);
      if (mergedRectangle === null) {
        connectRects.reject('Cannot connect rectangles! Height or Width must be equal!');
      }

      const newGrid = this.createEmptyGridObject();
      this.markRectangles(newGrid, newRectangles);
      if (this.willRectangleWontOverrideOtherRectangles(newGrid, mergedRectangle)) {
        connectRects.reject('New table will override existing tables');
        return;
      }

      newRectangles.push(mergedRectangle);
      this.markRectangles(newGrid, newRectangles);
      this.rectangles = newRectangles;
      this.grid = newGrid;
      connectRects.resolve();


    });

    console.log(this.grid);
  }

  private getNewRectangle(rect1: Rectangle, rect2: Rectangle): Rectangle {
    const id = `${rect1.id}+${rect2.id}`;
    if (rect1.width === rect2.width) {
      const x = rect1.x;
      const y = rect1.y;
      const width = rect1.width;
      const height = rect1.height + rect2.height;
      return new Rectangle(x, y, width, height, id);
    } else if (rect1.height === rect2.height) {
      const x = rect1.x;
      const y = rect1.y;
      const height = rect1.height;
      const width = rect1.width + rect2.width;
      return new Rectangle(x, y, width, height, id);
    }

    return null;
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
      height: Math.abs(this.selectEnd.rowIndex - this.selectStart.rowIndex) + 1,
      id: ''
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
