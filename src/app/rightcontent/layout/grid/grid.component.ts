import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridCell } from '../grid-cell/GridCell.model';
import { ConnectRectanglesEvent, Rectangle } from './GridEvents.model';
import { Observable } from 'rxjs/internal/Observable';
import { AlertsService } from '../../../services/alerts.service';

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
  @Output() rectangleIsMoving: EventEmitter<Rectangle> = new EventEmitter<Rectangle>();
  @Output() rectangleFinishedMoving: EventEmitter<Rectangle> = new EventEmitter<Rectangle>();
  @Output() movedRectangleConnected: EventEmitter<{ movedId: string, connectedToId: string }> =
    new EventEmitter<{ movedId: string, connectedToId: string }>();

  grid = {};

  objectKeys = Object.keys;

  selectStart: { rowIndex: number, colIndex: number } = null;
  private selectEnd: { rowIndex: number, colIndex: number } = null;
  private isDeleteEvent = false;
  private rectMoveStarted = false;
  private movedRectId: string = null;

  constructor(private alertsService: AlertsService) {
  }

  // show tables on the grid map
  ngOnInit() {
    this.grid = this.createEmptyGridObject();
    this.rectanglesObservable.subscribe(x => {
      this.rectangles = x;
      const grid = this.createEmptyGridObject();
      this.markRectangles(grid, this.rectangles);
      this.grid = grid;
    });
  }

  // check if user mark a table
  selectionStarted(x, y, e) {

    this.resetSelectionState();

    if (e.event.button === 2) {
      // Currently no delete
      // this.isDeleteEvent = true;
    }

    if (this.grid[y][x].isSelected) {
      this.rectMoveStarted = true;
      this.movedRectId = e.cell.id;
    }

    // take a point when user start marking
    this.selectStart = {
      rowIndex: parseInt(y, 10),
      colIndex: parseInt(x, 10)
    };
  }

  // take a point when user end marking
  selectionEnded(x, y) {
    this.selectEnd = {
      rowIndex: parseInt(y, 10),
      colIndex: parseInt(x, 10)
    };

    // if table moved, reset map 
    if (this.rectMoveStarted) {
      this.resetSelectionState();
      this.rectangleFinishedMoving.emit(this.rectangles.find(x => x.id === this.movedRectId));
      this.checkIfMovedRectangleConnectedToOtherRectangle();
      return;
    }

    if (!this.rectMoveStarted
      && this.willRectangleWontOverrideOtherRectangles(this.grid, this.getRectangleInfoFromSelectionStartAndEnd())) {
      this.alertsService.alertError('New Table Will Override Existing Tables!');
      return;
    }

    if (!this.rectMoveStarted) {
      this.selectGridCells();
    }
  }

  // check if moved table are connect to another table
  private checkIfMovedRectangleConnectedToOtherRectangle() {
    const movedRectangle = this.rectangles.find(x => x.id === this.movedRectId);
    const movedRow = movedRectangle.y;
    const movedCol = movedRectangle.x;

    // Checking Left Side
    for (let row = movedRow; row < movedRow + movedRectangle.height; row++) {
      const col = movedCol - 1;
      if (this.grid[row] && this.grid[row][col] && this.grid[row][col].isSelected) {
        this.movedRectangleConnected.emit({ movedId: movedRectangle.id, connectedToId: this.grid[row][col].id });
        return;
      }
    }

    // Checking Right Side
    for (let row = movedRow; row < movedRow + movedRectangle.height; row++) {
      const col = movedCol + movedRectangle.width;
      if (this.grid[row] && this.grid[row][col] && this.grid[row][col].isSelected) {
        this.movedRectangleConnected.emit({ movedId: movedRectangle.id, connectedToId: this.grid[row][col].id });
        return;
      }
    }

    // Checking Top
    for (let col = movedCol; col < movedCol + movedRectangle.width; col++) {
      const row = movedRow - 1;
      if (this.grid[row] && this.grid[row][col] && this.grid[row][col].isSelected) {
        this.movedRectangleConnected.emit({ movedId: movedRectangle.id, connectedToId: this.grid[row][col].id });
        return;
      }
    }

    // Checking Bottom
    for (let col = movedCol; col < movedCol + movedRectangle.width; col++) {
      const row = movedRow + movedRectangle.height;
      if (this.grid[row] && this.grid[row][col] && this.grid[row][col].isSelected) {
        this.movedRectangleConnected.emit({ movedId: movedRectangle.id, connectedToId: this.grid[row][col].id });
        return;
      }
    }
  }

  // Util function to calculate rectangle info
  private getRectangleInfoFromSelectionStartAndEnd(): Rectangle {
    return {
      x: this.selectEnd.colIndex > this.selectStart.colIndex ? this.selectStart.colIndex : this.selectEnd.colIndex,
      y: this.selectEnd.rowIndex > this.selectStart.rowIndex ? this.selectStart.rowIndex : this.selectEnd.rowIndex,
      width: Math.abs(this.selectEnd.colIndex - this.selectStart.colIndex) + 1,
      height: Math.abs(this.selectEnd.rowIndex - this.selectStart.rowIndex) + 1,
      id: '',
      isStatic: false
    };

  }

  // Emit event that cell were selected(identify whether delete or create)
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

  // Reset state
  private resetSelectionState() {
    this.isDeleteEvent = false;
    this.rectMoveStarted = false;
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
          grid[row][col].isStatic = rect.isStatic;
          if (rect.id.length > 0) {
            grid[row][col].id = rect.id;
          }
        }
      }
    });
  }

  private willRectangleWontOverrideOtherRectangles(grid, rect: Rectangle): boolean {

    if ((rect.y + rect.height > this.rows) || (rect.x + rect.width > this.cols)) {
      return true;
    }

    for (let row = rect.y; row < rect.y + rect.height; row++) {
      for (let col = rect.x; col < rect.x + rect.width; col++) {
        if (grid[row][col].isSelected) {
          return true;
        }
      }
    }

    return false;
  }

  // Event handler for mouse movement
  mouseMoved(colIndex: string, rowIndex: string) {

    if (!this.rectMoveStarted) {
      return;
    }

    const movingRectangle = this.rectangles.find(x => x.id === this.movedRectId);
    movingRectangle.x = parseInt(colIndex, 10);
    movingRectangle.y = parseInt(rowIndex, 10);

    const grid = this.createEmptyGridObject();
    const rectangles = this.rectangles.filter(x => x.id !== this.movedRectId);
    this.markRectangles(grid, rectangles);
    if (this.willRectangleWontOverrideOtherRectangles(grid, movingRectangle)) {
      return;
    }

    this.rectangleIsMoving.emit(movingRectangle);
  }
}
