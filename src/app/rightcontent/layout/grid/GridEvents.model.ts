export class Rectangle {
  id: '';
  x: number;
  y: number;
  width: number;
  height: number;
  isStatic = false;

  constructor(x, y, width, height, id, isStatic) {
    this.id = id || '';
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isStatic = isStatic;
  }
}

export class ConnectRectanglesEvent {
  rect1: Rectangle;
  rect2: Rectangle;
  resolve;
  reject;

  constructor(rect1, rect2, resolve, reject) {
    this.rect1 = rect1;
    this.rect2 = rect2;
    this.resolve = resolve;
    this.reject = reject;
  }
}
