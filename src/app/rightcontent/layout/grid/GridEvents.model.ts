export class Rectangle {
  id: string = '';
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x, y, width, height, id) {
    this.id = id || '';
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
