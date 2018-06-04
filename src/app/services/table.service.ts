import {Injectable} from '@angular/core';
import {Table} from '../rightcontent/layout/table.model';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class TableService {

  private functions;
  private addTableFunction;

  constructor() {
  }

  createTable(restId: string, table: Table) {
    this.functions = firebase.functions();
    this.addTableFunction = this.functions.httpsCallable('addTable');
  }
}
