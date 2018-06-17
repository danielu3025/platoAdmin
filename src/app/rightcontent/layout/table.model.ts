import {Rectangle} from './grid/GridEvents.model';

export class Table {
  acceabilty = false;
  isConnectable = false;
  connectedNow = false;
  displayed = true;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  size: number;
  smoking = false;
  status = 'free';
  pLeft: number;
  pTop: number;
  pRight: number;
  pBottom: number;
  likes = 0;
}
