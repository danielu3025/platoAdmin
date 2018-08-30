import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DbHelperService {

  constructor() { }

  // get root of db
  getDbRoot(): string {
    return 'RestAlfa';
  }
}
